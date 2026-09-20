import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    label: 'તાજા ઘટકો',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Leaf */}
        <path d="M11 20A7 7 0 0 1 4 13C4 8 8 3 13 3c4 0 7 3 7 7 0 5-5 10-9 10Z" />
        <path d="M13 3c-1 4-3 7-7 9" />
      </svg>
    ),
  },
  {
    label: 'સ્વચ્છતા સાથે',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Shield / Check */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'અસલી સ્વાદ',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Flame / Spice */}
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    label: 'ગુજરાતનો પ્રેમ',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Heart */}
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

export default function OrderCTA() {
  const sectionRef = useRef(null);
  const topMetaRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const secondaryCopyRef = useRef(null);
  const buttonsRef = useRef(null);
  const valuesRef = useRef(null);
  const productWrapRef = useRef(null);
  const handwrittenRef = useRef(null);
  const heritageArtRef = useRef(null);
  const stampRef = useRef(null);
  const steamRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            topMetaRef.current,
            headingLine1Ref.current,
            headingLine2Ref.current,
            paragraphRef.current,
            secondaryCopyRef.current,
            buttonsRef.current,
            valuesRef.current,
            productWrapRef.current,
            handwrittenRef.current,
            heritageArtRef.current,
            stampRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // Master entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Section index "04 / ORDER NOW"
      if (topMetaRef.current) {
        tl.fromTo(
          topMetaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0
        );
      }

      // 2. Headline line-by-line reveal
      if (headingLine1Ref.current) {
        tl.fromTo(
          headingLine1Ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.08
        );
      }

      if (headingLine2Ref.current) {
        tl.fromTo(
          headingLine2Ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.16
        );
      }

      // 3. Supporting copy follows
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.24
        );
      }

      if (secondaryCopyRef.current) {
        tl.fromTo(
          secondaryCopyRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.30
        );
      }

      // 4. CTA group
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.36
        );
      }

      // 5. Value row stagger upward
      if (valuesRef.current) {
        tl.fromTo(
          valuesRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.42
        );
      }

      // 6. Product image: opacity 0 -> 1, y 28 -> 0, scale 0.96 -> 1
      if (productWrapRef.current) {
        tl.fromTo(
          productWrapRef.current,
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.18
        );
      }

      // 7. Handwritten phrase fade in
      if (handwrittenRef.current) {
        tl.fromTo(
          handwrittenRef.current,
          { opacity: 0, y: 8 },
          { opacity: 0.75, y: 0, duration: 0.8, ease: 'power2.out' },
          0.44
        );
      }

      // 8. Heritage illustration & stamp fade in last
      if (heritageArtRef.current) {
        tl.fromTo(
          heritageArtRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.22, y: 0, duration: 0.85, ease: 'power3.out' },
          0.48
        );
      }

      if (stampRef.current) {
        tl.fromTo(
          stampRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 0.35, scale: 1, duration: 0.8, ease: 'power2.out' },
          0.52
        );
      }

      // Subtle ambient steam slow upward drift
      if (steamRef.current) {
        gsap.to(steamRef.current, {
          y: -8,
          opacity: 0.45,
          repeat: -1,
          yoyo: true,
          duration: 3.5,
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
      className="relative w-full min-h-screen lg:min-h-[105vh] bg-[#120B07] text-[#F7E8CF] overflow-hidden flex flex-col justify-between"
      aria-label="ગજાનંદ ઓર્ડર કરો — તાજું અને ગરમાગરમ"
    >
      {/* Barely Visible CSS Paper / Grain Texture (<8% intensity) */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F7E8CF 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Shop Signage in Far Upper-Right Background (Dim / Blurred DOM/CSS) */}
      <div
        className="hidden xl:block absolute top-12 right-16 pointer-events-none select-none opacity-[0.05] blur-[1.5px]"
        aria-hidden="true"
      >
        <span className="font-['Noto_Serif_Gujarati',serif] font-black text-7xl xl:text-8xl tracking-widest text-[#F7E8CF]">
          ગજાનંદ વડાપાવ
        </span>
      </div>

      {/* Atmospheric Soft Dark-Orange Glow behind the Product */}
      <div
        className="absolute top-1/3 right-1/4 w-[540px] h-[540px] rounded-full bg-[#D96814]/12 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-12 w-96 h-96 rounded-full bg-[#1A0D07]/80 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* MAIN CONTAINER: 42-45% / 55-58% ASYMMETRIC SPREAD         */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ========================================================= */}
          {/* LEFT ZONE: Left Content Area (42–45% visual width)        */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">

            {/* Top Meta: 04 / ORDER NOW */}
            <div
              ref={topMetaRef}
              className="flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#D96814]/15 border border-[#D96814]/30">
                <span className="font-['Syne',sans-serif] text-xs font-black tracking-widest text-[#F2A321]">
                  04
                </span>
                <span className="w-1 h-1 rounded-full bg-[#D96814]" />
                <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#F7E8CF]/80 uppercase">
                  ORDER NOW
                </span>
              </div>
              <div className="h-[1px] w-20 bg-[#D96814]/30" />
            </div>

            {/* Main Headline (Noto Serif Gujarati with generous scale and no matra clipping) */}
            <h2 className="font-['Noto_Serif_Gujarati',serif] font-black text-5xl sm:text-6xl md:text-6xl lg:text-[4rem] xl:text-[4.25rem] tracking-tight leading-[1.18] overflow-visible">
              <span
                ref={headingLine1Ref}
                className="block text-[#F7E8CF] will-change-transform"
              >
                ગજાનંદનો સ્વાદ
              </span>
              <span
                ref={headingLine2Ref}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F2A321] via-[#E98224] to-[#D96814] will-change-transform mt-1"
              >
                હવે તમારા સુધી!
              </span>
            </h2>

            {/* Primary Supporting Copy */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg md:text-xl text-[#F7E8CF]/90 font-normal leading-relaxed mt-5 sm:mt-6 max-w-md will-change-transform"
            >
              ગુજરાતની ગલીઓનો અસલી સ્વાદ, હવે એક ક્લિક દૂર.
            </p>

            {/* Quieter Secondary Supporting Line */}
            <p
              ref={secondaryCopyRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm text-[#C98B5B] font-medium tracking-wide mt-2.5 will-change-transform"
            >
              તાજું બનાવેલું • ગરમ પીરસેલું • પ્રેમથી તૈયાર
            </p>

            {/* CTA Group: Aligned horizontally on Desktop, stacked on Mobile */}
            <div
              ref={buttonsRef}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4.5 will-change-transform"
            >
              {/* Primary CTA Button */}
              <button
                id="cta-order-btn"
                onClick={scrollToLocations}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#D96814] text-[#120B07] font-['Noto_Sans_Gujarati',sans-serif] font-bold text-base sm:text-lg tracking-wide transition-all duration-[170ms] ease-out hover:bg-[#E98224] hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A321] cursor-pointer"
                aria-label="હવે ઓર્ડર કરો"
              >
                <span>હવે ઓર્ડર કરો</span>
                <svg
                  className="w-4 h-4 transition-transform duration-[170ms] ease-out group-hover:translate-x-1 text-[#120B07]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Secondary CTA Button */}
              <button
                id="cta-store-locator-btn"
                onClick={scrollToLocations}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-[#F7E8CF]/35 bg-transparent text-[#F7E8CF] font-['Noto_Sans_Gujarati',sans-serif] font-medium text-base sm:text-lg tracking-wide transition-all duration-[170ms] ease-out hover:border-[#D96814] hover:text-[#F2A321] hover:bg-[#D96814]/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A321] cursor-pointer"
                aria-label="અમારા સ્ટોર શોધો"
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
                <span>અમારા સ્ટોર શોધો</span>
              </button>
            </div>

            {/* Micro Value Row: Single row on Desktop, 2x2 grid on Mobile */}
            <div
              ref={valuesRef}
              className="mt-10 sm:mt-12 pt-6 border-t border-[#F7E8CF]/12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 will-change-transform"
            >
              {VALUES.map((val) => (
                <div key={val.label} className="flex items-center gap-2 text-[#F7E8CF]">
                  <div className="p-1.5 rounded-lg bg-[#D96814]/15 border border-[#D96814]/30 text-[#F2A321] flex-shrink-0">
                    {val.icon}
                  </div>
                  <span className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-[13px] font-medium text-[#F7E8CF]/90">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT ZONE: Product Visual (55–58% visual width)          */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end">

            {/* Handwritten Accent near the product */}
            <div
              ref={handwrittenRef}
              className="absolute -top-6 sm:-top-8 right-4 sm:right-10 z-20 pointer-events-none select-none will-change-transform opacity-75"
            >
              <p className="font-serif italic text-base sm:text-lg text-[#C98B5B] tracking-wide drop-shadow-md">
                “Same Street Taste. <br />
                <span className="text-[#F7E8CF] font-normal">Bigger Happiness.</span>”
              </p>
            </div>

            {/* Primary Product Visual Container (Grounded & Dominant) */}
            <div
              ref={productWrapRef}
              className="relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] aspect-square flex items-center justify-center will-change-transform"
            >
              {/* Soft Saffron Radial Halo behind Product */}
              <div
                className="absolute inset-10 rounded-full bg-gradient-to-tr from-[#D96814]/22 via-[#F2A321]/15 to-transparent blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Ground Shadow beneath Product */}
              <div
                className="absolute inset-x-12 bottom-6 h-20 rounded-full bg-black/75 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* 2-3 Subtle CSS/SVG Steam Wisps above Vada Pav */}
              <div
                ref={steamRef}
                className="absolute top-10 inset-x-0 mx-auto w-32 h-20 opacity-35 pointer-events-none flex justify-center gap-4 text-[#F7E8CF]"
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

              {/* Dominant Product Asset (No Card Wrapper / Transparent Background) */}
              <img
                src="/assets/gajanand-order-vadapav.webp"
                alt="ગજાનંદ વડાપાવ — લીલી ચટણી, બટાકા વડા અને મસાલા સાથે"
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-full object-contain object-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
              />

              {/* Subtle Circular Heritage Stamp in Lower-Right */}
              <div
                ref={stampRef}
                className="hidden sm:block absolute bottom-2 right-4 z-20 pointer-events-none select-none will-change-transform"
                aria-hidden="true"
              >
                <div className="w-20 h-20 text-[#D96814]/70">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1.4">
                    <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="38" />
                    <path id="orderSealPath" d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
                    <text className="text-[7.5px] tracking-[0.2em] uppercase fill-current font-semibold">
                      <textPath href="#orderSealPath" startOffset="0%">
                        TRADITIONAL TASTE • GUJARAT •
                      </textPath>
                    </text>
                    <circle cx="50" cy="50" r="4" fill="currentColor" />
                  </svg>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* LOWER-LEFT HERITAGE LINE ART & NOTE                       */}
      {/* ========================================================= */}
      <div
        ref={heritageArtRef}
        className="relative w-full overflow-hidden border-t border-[#D96814]/15 py-3 pointer-events-none select-none will-change-transform"
        aria-hidden="true"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[11px] sm:text-xs text-[#C98B5B]/70">
          {/* Left: Street food cart / stall line art icon */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.4">
              <path d="M4 22h24M8 22v-8h16v8M6 14h20l-2-6H8l-2 6zM11 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            <span className="font-['Noto_Sans_Gujarati',sans-serif]">
              અસલી ગુજરાતી સ્ટ્રીટ ફૂડ સંસ્કૃતિ
            </span>
          </div>

          {/* Right: Heritage note */}
          <div className="font-['Syne',sans-serif] tracking-widest uppercase text-[10px]">
            ANAND & PETLAD • GUJARAT
          </div>
        </div>
      </div>

    </section>
  );
}
