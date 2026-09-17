import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef(null);
  const topTransitionRef = useRef(null);
  const contentRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const secondaryRef = useRef(null);
  const visualRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Immediate reveal for reduced motion
        gsap.set(
          [
            topTransitionRef.current,
            eyebrowRef.current,
            headingRef.current,
            paragraphRef.current,
            secondaryRef.current,
            visualRef.current,
            imageRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
          }
        );
        return;
      }

      // Master timeline for Section 2 entrance triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      // 0. Curved transition gently rises
      if (topTransitionRef.current) {
        tl.fromTo(
          topTransitionRef.current,
          { y: 15, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
          0
        );
      }

      // 1. Eyebrow appears first
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.05
        );
      }

      // 2. Heading follows
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.14
        );
      }

      // 3. Supporting paragraph follows 120ms later
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.26
        );
      }

      // 4. Secondary tagline & accent line last
      if (secondaryRef.current) {
        tl.fromTo(
          secondaryRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.38
        );
      }

      // 5. Gujarat heritage image reveals from right using clipped mask (x: 24 -> 0, scale: 1.04 -> 1)
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { 
            opacity: 0, 
            x: 24,
            clipPath: 'inset(0% 0% 0% 100%)' 
          },
          { 
            opacity: 1, 
            x: 0, 
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.25, 
            ease: 'power3.out' 
          },
          0.18
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.04 },
          { scale: 1, duration: 1.25, ease: 'power3.out' },
          0.18
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="brand-story"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#D96814] text-[#2A130A] overflow-hidden flex flex-col justify-center select-none"
      aria-label="Brand Story: ગુજરાતી સ્વાદની ઓળખ"
    >
      {/* Top Cinematic Transition from Dark Hero (#120B07) into Warm Saffron Canvas */}
      <div 
        ref={topTransitionRef}
        className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10 -translate-y-[1px] will-change-transform"
        aria-hidden="true"
      >
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-28 text-[#120B07] fill-current"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 C1080,110 360,110 0,40 Z" />
        </svg>
      </div>

      {/* Ambient warm glow layers for rich editorial depth */}
      <div 
        className="absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full bg-[#F2A321]/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 left-0 w-[420px] h-[420px] rounded-full bg-[#2A130A]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Bandhani / Pol Textile dot matrix accent in the background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#2A130A 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px'
        }}
        aria-hidden="true"
      />

      {/* Main Content Layout */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 md:py-44 my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div 
              ref={eyebrowRef} 
              className="flex items-center gap-3 mb-6 sm:mb-8 will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-[#2A130A]" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm font-bold tracking-widest text-[#2A130A] uppercase">
                ગુજરાતી સ્વાદની ઓળખ
              </p>
            </div>

            {/* Main Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.25rem] tracking-tight leading-[1.18] text-[#1A0A04] will-change-transform"
            >
              ગજાનંદ.
              <span className="block text-[#2A130A] font-bold mt-1 sm:mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.75rem]">
                સ્વાદ જે યાદ રહી જાય.
              </span>
            </h2>

            {/* Supporting Paragraph */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl text-[#2A130A]/90 font-normal leading-relaxed sm:leading-relaxed mt-6 sm:mt-8 max-w-2xl will-change-transform"
            >
              ગુજરાતની ગલીઓ, પરંપરાગત મસાલા અને ગરમાગરમ સ્ટ્રીટ ફૂડની યાદોથી પ્રેરિત, ગજાનંદ એક સરળ નાસ્તાને યાદગાર અનુભવ બનાવે છે.
            </p>

            {/* Secondary Line with bespoke Gujarat craft divider */}
            <div
              ref={secondaryRef}
              className="mt-8 sm:mt-12 pt-6 border-t border-[#2A130A]/20 flex items-center gap-4 will-change-transform"
            >
              <span className="w-6 h-[1.5px] bg-[#2A130A]/50 flex-shrink-0" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base font-semibold tracking-wide text-[#2A130A]/90">
                સરળ સામગ્રી. ખરો સ્વાદ.
              </p>
            </div>

          </div>

          {/* Right Column: Gujarat Pol Heritage Atmosphere */}
          <div 
            ref={visualRef}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end will-change-transform mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-3xl sm:rounded-[2rem] overflow-hidden border border-[#2A130A]/20 bg-[#2A130A]/5 shadow-2xl shadow-[#2A130A]/25 group">
              
              {/* Subtle Pol Jharokha Framing Border & Warm Saffron Corner Accents */}
              <div className="absolute inset-3 rounded-2xl sm:rounded-[1.5rem] border border-[#F7E8CF]/25 pointer-events-none z-10" />

              {/* Heritage WebP Image with subtle desktop hover */}
              <img
                ref={imageRef}
                src="/assets/gajanand-heritage.webp"
                alt="ગુજરાત અમદાવાદ પોળ સ્થાપત્ય અને ધરોહર"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center will-change-transform img-hover-subtle"
              />

              {/* Cinematic Warm Golden Hour Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A130A]/80 via-[#2A130A]/10 to-transparent pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-[#D96814]/10 mix-blend-color pointer-events-none z-10" />

              {/* Authentic Heritage Descriptor Badge */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-[#F7E8CF]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2A321] shadow-[0_0_8px_#F2A321]" />
                  <span className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm font-bold tracking-wide">
                    અમદાવાદ • પોળ સંસ્કૃતિ
                  </span>
                </div>
                <span className="font-sans text-[10px] tracking-widest text-[#F7E8CF]/60 uppercase">
                  ધરોહર
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
