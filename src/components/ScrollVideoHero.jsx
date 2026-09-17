import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3DAccents from './three/Hero3DAccents';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Helper to detect iOS devices (including iPadOS desktop user-agent via touch detection)
const isIOSDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

export default function ScrollVideoHero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const wordmarkRef = useRef(null);
  const introTextRef = useRef(null);
  const outroTextRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionPreference);

    return () => mediaQuery.removeEventListener('change', handleMotionPreference);
  }, []);

  // iOS Safari decoder initialization & media readiness management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Programmatic properties
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const isIOS = isIOSDevice();

    // 2. One-time user interaction unlock for iOS WebKit video decoder
    let isUnlocked = false;
    const unlockVideo = async () => {
      if (isUnlocked || !videoRef.current) return;
      isUnlocked = true;

      const v = videoRef.current;
      v.muted = true;
      try {
        await v.play();
        v.pause();
        if (v.currentTime === 0) {
          v.currentTime = 0.01;
        }
      } catch (error) {
        console.debug('iOS video unlock deferred', error);
      }

      ['touchstart', 'pointerdown', 'click'].forEach((evt) => {
        window.removeEventListener(evt, unlockVideo);
      });
    };

    ['touchstart', 'pointerdown', 'click'].forEach((evt) => {
      window.addEventListener(evt, unlockVideo, { passive: true, once: true });
    });

    // 3. Media readiness checks
    const checkReadiness = () => {
      if (video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0) {
        setIsVideoReady(true);
        if (isIOS) {
          try {
            if (video.currentTime === 0) {
              video.currentTime = 0.01;
            }
          } catch {}
        }
      }
    };

    if (video.readyState >= 2) {
      checkReadiness();
    }

    video.addEventListener('loadedmetadata', checkReadiness);
    video.addEventListener('loadeddata', checkReadiness);
    video.addEventListener('canplay', checkReadiness);

    // Initial preload kick
    video.load();

    return () => {
      ['touchstart', 'pointerdown', 'click'].forEach((evt) => {
        window.removeEventListener(evt, unlockVideo);
      });
      video.removeEventListener('loadedmetadata', checkReadiness);
      video.removeEventListener('loadeddata', checkReadiness);
      video.removeEventListener('canplay', checkReadiness);
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      if (wordmarkRef.current) gsap.set(wordmarkRef.current, { opacity: 1, y: 0 });
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId;
    const targetTime = { value: 0 };
    const isIOS = isIOSDevice();
    const threshold = isIOS ? 0.02 : 0.008;
    const seekFactor = isIOS ? 0.15 : 0.12;

    // Create GSAP Context for proper cleanup
    const ctx = gsap.context(() => {
      // Initial Wordmark Soft Entrance
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        );
      }

      // 1. Smooth rAF lerp loop for video scrubbing without overloading currentTime
      const updateVideo = () => {
        const video = videoRef.current;
        if (
          video &&
          video.duration &&
          Number.isFinite(video.duration) &&
          video.readyState >= 2
        ) {
          const diff = targetTime.value - video.currentTime;
          // Avoid seeking if Safari is already in the middle of a seek operation
          if (Math.abs(diff) > threshold && !video.seeking) {
            video.currentTime += diff * seekFactor;
          }
        }
        rafId = requestAnimationFrame(updateVideo);
      };

      // 2. Main scrub timeline linked to container scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const video = videoRef.current;
            if (video && video.duration && Number.isFinite(video.duration)) {
              targetTime.value = self.progress * video.duration;
            }
          },
        },
      });

      // 3. Initial Hero Content Animation (fades out completely by ~38% scroll)
      if (introTextRef.current) {
        tl.to(
          introTextRef.current,
          {
            opacity: 0,
            y: -30,
            filter: 'blur(4px)',
            ease: 'power2.inOut',
            duration: 0.38,
          },
          0
        );
      }

      // 4. Scroll indicator fades out rapidly near top (0 to 12% scroll)
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 15,
            ease: 'power1.out',
            duration: 0.12,
          },
          0
        );
      }

      // 5. Final Label Reveal (emerges around 72% to 95% scroll)
      if (outroTextRef.current) {
        tl.fromTo(
          outroTextRef.current,
          {
            opacity: 0,
            y: 35,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power3.out',
            duration: 0.22,
          },
          0.72
        );
      }

      // Start the smoothed frame loop
      updateVideo();
    }, containerRef);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      ctx.revert(); // Clean up all GSAP timelines and ScrollTriggers
    };
  }, [isReducedMotion]);

  // Smooth scroll handler for CTA
  const handleCtaClick = () => {
    const target = document.getElementById('brand-story');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (containerRef.current) {
      const targetScroll = containerRef.current.offsetTop + window.innerHeight * 1.5;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[350vh] md:h-[400vh] bg-[#120B07] select-none"
      aria-label="ગજાનંદ Vada Pav Hero Presentation"
    >
      {/* Pinned Sticky 100vh Hero Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-between"
      >
        {/* Background Media Wrapper */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#120B07]">
          {/* Static Poster Image underneath video (Guarantees zero black rectangle) */}
          <img
            src="/assets/vada-pav-poster.jpg"
            alt="ગરમાગરમ વડાપાઉં"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            aria-hidden="true"
          />

          {/* Video element above poster */}
          <video
            ref={videoRef}
            muted
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            poster="/assets/vada-pav-poster.jpg"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500 ease-out will-change-transform ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source
              src="/assets/vada-pav-scroll-optimized.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Selective 3D Foreground Spice & Chilli Accents */}
        <Hero3DAccents isReducedMotion={isReducedMotion} />

        {/* Gujarat Cinematic Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#120B07] via-transparent to-[#120B07]/70" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#120B07]/92 via-[#120B07]/50 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 pointer-events-none cinematic-vignette opacity-75" />

        {/* Ambient Warm Sandstone & Saffron Glow */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#D96814]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div 
          className="absolute top-1/2 -right-32 w-80 h-80 bg-[#C98B5B]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between h-full py-10 md:py-14">
          
          {/* Top Bar / Brand Wordmark Badge */}
          <div className="flex items-center justify-between">
            <div ref={wordmarkRef} className="flex items-center gap-3.5 will-change-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D96814] shadow-[0_0_12px_#D96814] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-['Noto_Serif_Gujarati',serif] text-lg sm:text-xl font-bold tracking-wide text-[#F7E8CF] leading-tight">
                  ગજાનંદ
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#C98B5B] uppercase font-semibold">
                  GAJANAND • GUJARAT
                </span>
              </div>
            </div>

            {/* Subtle Gujarat Heritage Coordinate / Descriptor */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C98B5B]/20 bg-[#120B07]/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2A321]" />
              <span className="font-sans text-[11px] font-medium tracking-[0.15em] text-[#C98B5B]">
                અસલી સ્ટ્રીટ ફૂડ
              </span>
            </div>
          </div>

          {/* Left-Center Main Hero Typography */}
          <div 
            ref={introTextRef}
            className="max-w-xl lg:max-w-2xl text-left my-auto will-change-transform"
          >
            {/* Eyebrow in Gujarati */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A130A]/80 border border-[#D96814]/30 backdrop-blur-md mb-4 sm:mb-6 shadow-lg shadow-black/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2A321]" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm font-semibold tracking-wider text-[#F2A321]">
                ગુજરાતની સ્વાદ પરંપરા
              </p>
            </div>

            {/* Brand Wordmark Display Heading */}
            <h1 className="font-['Noto_Serif_Gujarati',serif] font-extrabold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[1.1] text-[#F7E8CF]">
              ગજાનંદ
            </h1>

            {/* Secondary Headline */}
            <p className="font-['Noto_Sans_Gujarati',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F7E8CF] via-[#F2A321] to-[#D96814] mt-2 sm:mt-3 leading-snug">
              ગુજરાતનો સ્વાદ. દરેક બાઇટમાં.
            </p>

            {/* Supporting Text */}
            <p className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg md:text-xl text-[#F7E8CF]/85 font-normal tracking-wide mt-4 sm:mt-5 leading-relaxed max-w-lg">
              ગરમ, મસાલેદાર અને દિલથી બનાવેલું.
            </p>

            {/* Interactive Call to Action */}
            <div className="mt-8 sm:mt-10 flex items-center gap-4">
              <button
                id="hero-cta-btn"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D96814] to-[#E98224] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-[170ms] ease-out hover:shadow-[0_0_25px_rgba(217,104,20,0.55)] hover:-translate-y-[2px] hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A321] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120B07] cursor-pointer"
                aria-label="અમારી કહાની જુઓ"
              >
                <span className="font-['Noto_Sans_Gujarati',sans-serif] font-medium">અમારી કહાની જુઓ</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-[170ms] ease-out group-hover:translate-x-1.5 text-[#F7E8CF]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Outro Reveal Label (Appears near final scroll progress) */}
          <div
            ref={outroTextRef}
            className="absolute inset-x-0 bottom-16 sm:bottom-20 mx-auto w-fit text-center pointer-events-none opacity-0 will-change-transform z-20 px-6"
            aria-live="polite"
          >
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#120B07]/85 border border-[#F2A321]/40 backdrop-blur-xl shadow-2xl shadow-black/80">
              <span className="w-2 h-2 rounded-full bg-[#D96814] animate-ping" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] font-bold text-sm sm:text-base md:text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F7E8CF] via-[#F2A321] to-[#E98224]">
                ગુજરાતની ધરોહર • અસલી સ્વાદ
              </p>
            </div>
          </div>

          {/* Bottom Scroll Indicator (Fades out as user scrolls) */}
          <div 
            ref={scrollIndicatorRef}
            className="flex items-center justify-between text-xs tracking-[0.15em] text-[#C98B5B] font-medium"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-8 rounded-full border border-[#C98B5B]/50 flex items-start justify-center p-1">
                <div className="w-1.5 h-2 rounded-full bg-[#F2A321] animate-scroll-bob" />
              </div>
              <span className="font-['Noto_Sans_Gujarati',sans-serif] text-xs text-[#F7E8CF]/80">
                અનુભવ માટે સ્ક્રોલ કરો
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#C98B5B]/80 uppercase tracking-widest">
              <span>01 / ધરોહર</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
