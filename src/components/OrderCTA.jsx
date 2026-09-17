import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductPlate3D from './three/ProductPlate3D';

gsap.registerPlugin(ScrollTrigger);

export default function OrderCTA() {
  const sectionRef = useRef(null);
  const topTransitionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const imageContainerRef = useRef(null);
  const steamRef = useRef(null);

  const [imgSrc, setImgSrc] = useState('/assets/gajanand-final-vadapav.webp');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            topTransitionRef.current,
            eyebrowRef.current,
            headingRef.current,
            paragraphRef.current,
            buttonsRef.current,
            badgeRef.current,
            imageContainerRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // 0. Curved transition gently settles
      if (topTransitionRef.current) {
        tl.fromTo(
          topTransitionRef.current,
          { y: 15, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
          0
        );
      }

      // 1. Eyebrow fade & lift
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.05
        );
      }

      // 2. Heading rises gently
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.12
        );
      }

      // 3. Supporting copy follows
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.22
        );
      }

      // 4. CTA Buttons reveal
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.32
        );
      }

      // 5. Optional microcopy badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.40
        );
      }

      // 6. Food product presentation scales in gently with upward shift (scale 0.95 -> 1, y: 24 -> 0, opacity: 0 -> 1)
      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, y: 24, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.2
        );
      }

      // 7. Subtle ambient steam opacity & drift loop
      if (steamRef.current) {
        gsap.to(steamRef.current, {
          y: -8,
          opacity: 0.65,
          repeat: -1,
          yoyo: true,
          duration: 2.8,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToLocations = (e) => {
    e.preventDefault();
    const target = document.getElementById('locations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="order-cta"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#120B07] text-[#F7E8CF] overflow-hidden flex flex-col justify-center select-none"
      aria-label="ગજાનંદ ઓર્ડર કરો"
    >
      {/* Top Transition from Cream Section (#F7E8CF) into Dark Canvas (#120B07) */}
      <div
        ref={topTransitionRef}
        className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10 -translate-y-[1px] will-change-transform"
        aria-hidden="true"
      >
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-28 text-[#F7E8CF] fill-current"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 C1080,110 360,110 0,40 Z" />
        </svg>
      </div>

      {/* Gujarat Detail: Faint Carved Arch & Stepwell Geometric Accent (under 8% opacity) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F7E8CF 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Cinematic Ambient Atmosphere & Warm Rim Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D96814]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#2A130A]/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 md:py-44 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Conversion Copy & Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#2A130A]/90 border border-[#D96814]/30 backdrop-blur-sm mb-6 sm:mb-8 w-fit will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-[#D96814] animate-pulse" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm font-bold tracking-wider text-[#F2A321]">
                હવે સ્વાદ માણવાનો સમય
              </p>
            </div>

            {/* Main Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] tracking-tight leading-[1.14] text-[#F7E8CF] will-change-transform"
            >
              ગરમ. તાજું.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F7E8CF] via-[#F2A321] to-[#D96814] mt-1 sm:mt-2">
                ગજાનંદ.
              </span>
            </h2>

            {/* Supporting Text */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg md:text-xl text-[#F7E8CF]/80 font-normal leading-relaxed sm:leading-relaxed mt-6 sm:mt-8 max-w-xl will-change-transform"
            >
              કરકરો વડો, નરમ પાવ, મસાલેદાર ચટણી અને ગરમાગરમ સ્વાદ — એક બાઇટ અને વાત પૂરી.
            </p>

            {/* Dual CTA Buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 will-change-transform"
            >
              {/* Primary CTA */}
              <button
                id="cta-order-btn"
                onClick={scrollToLocations}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D96814] text-[#120B07] font-['Noto_Sans_Gujarati',sans-serif] font-bold text-base sm:text-lg tracking-wide transition-all duration-[170ms] ease-out hover:bg-[#E98224] hover:shadow-[0_0_25px_rgba(217,104,20,0.5)] hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A321] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120B07] cursor-pointer"
                aria-label="ઓર્ડર કરો"
              >
                <span>ઓર્ડર કરો</span>
                <svg
                  className="w-4 h-4 transition-transform duration-[170ms] ease-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Secondary CTA */}
              <button
                id="cta-store-locator-btn"
                onClick={scrollToLocations}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#F7E8CF]/40 text-[#F7E8CF] font-['Noto_Sans_Gujarati',sans-serif] font-medium text-base sm:text-lg tracking-wide transition-all duration-[170ms] ease-out hover:border-[#D96814] hover:text-[#F2A321] hover:bg-[#D96814]/10 hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A321] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120B07] cursor-pointer"
                aria-label="નજીકનું સ્ટોર શોધો"
              >
                <svg
                  className="w-4 h-4 text-[#C98B5B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>નજીકનું સ્ટોર શોધો</span>
              </button>
            </div>

            {/* Optional Microcopy Badge */}
            <div
              ref={badgeRef}
              className="mt-8 flex items-center gap-2.5 text-xs sm:text-sm text-[#C98B5B] font-['Noto_Sans_Gujarati',sans-serif] will-change-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#496A3D]" />
              <span>તાજું બનાવેલું • ગરમ પીરસેલું</span>
            </div>

          </div>

          {/* Right Column: Appetizing Food Presentation */}
          <div
            ref={imageContainerRef}
            className="lg:col-span-6 flex items-center justify-center will-change-transform"
          >
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[540px] aspect-square rounded-3xl overflow-hidden flex items-center justify-center p-6 border border-[#F7E8CF]/10 bg-gradient-to-b from-[#2A130A]/40 to-[#120B07]/80 shadow-2xl shadow-black/90">
              
              {/* Selective 3D Earthen Brass Plate & Soft Shadow Pedestal */}
              <ProductPlate3D />

              {/* Background Circular Thali / Sandstone Platter Glow */}
              <div className="absolute inset-8 rounded-full border border-[#D96814]/20 bg-gradient-to-tr from-[#120B07] via-[#2A130A]/50 to-[#D96814]/10 pointer-events-none" />
              
              {/* Outer Ring Detail */}
              <div className="absolute inset-12 rounded-full border border-[#C98B5B]/15 border-dashed pointer-events-none" />

              {/* Rising Steam Effect */}
              <div
                ref={steamRef}
                className="absolute top-10 inset-x-0 mx-auto w-32 h-20 opacity-40 pointer-events-none flex justify-center gap-4 text-[#F7E8CF]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 48" className="w-4 h-12 stroke-current fill-none" strokeWidth="1.2">
                  <path d="M12 44 C6 36, 18 28, 12 20 C6 12, 18 4, 12 0" />
                </svg>
                <svg viewBox="0 0 24 48" className="w-4 h-12 stroke-current fill-none -translate-y-2" strokeWidth="1.2">
                  <path d="M12 44 C18 36, 6 28, 12 20 C18 12, 6 4, 12 0" />
                </svg>
                <svg viewBox="0 0 24 48" className="w-4 h-12 stroke-current fill-none" strokeWidth="1.2">
                  <path d="M12 44 C6 36, 18 28, 12 20 C6 12, 18 4, 12 0" />
                </svg>
              </div>

              {/* Food Presentation Image with Graceful Poster Fallback */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src={imgSrc}
                  onError={() => setImgSrc('/assets/vada-pav-poster.jpg')}
                  alt="ગરમાગરમ ગજાનંદ વડાપાઉં"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center rounded-2xl filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                />

                {/* Soft Warm Rim Light Gradient Overlay on Food */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-[#120B07]/80 via-transparent to-transparent" />
                
                {/* Floating Authentic Quality Seal */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#120B07]/90 border border-[#F2A321]/40 backdrop-blur-md flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#D96814] animate-ping" />
                  <span className="font-['Noto_Serif_Gujarati',serif] text-xs font-bold text-[#F7E8CF]">
                    અસલી સ્વાદ
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
