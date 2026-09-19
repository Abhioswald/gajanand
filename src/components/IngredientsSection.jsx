import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENT_CALLOUTS = [
  {
    num: '01',
    name: 'પાવ',
    desc: 'મુલાયમ, તાજું અને હળવેથી શેકેલું.',
    side: 'left',
    topPercent: '14%',
  },
  {
    num: '02',
    name: 'બટાકા વડો',
    desc: 'ખાસ મસાલા સાથે બનાવેલો કરકરો અને નરમ વડો.',
    side: 'left',
    topPercent: '48%',
  },
  {
    num: '03',
    name: 'લીલી ચટણી',
    desc: 'તાજા ધાણા, મરચાં અને મસાલાનો તાજો સ્વાદ.',
    side: 'left',
    topPercent: '80%',
  },
  {
    num: '04',
    name: 'ડુંગળી',
    desc: 'તાજી અને કરકરી લાલ ડુંગળી.',
    side: 'right',
    topPercent: '18%',
  },
  {
    num: '05',
    name: 'લસણ મસાલો',
    desc: 'તીખો, સુગંધિત અને ગજાનંદની ખાસ ઓળખ.',
    side: 'right',
    topPercent: '52%',
  },
  {
    num: '06',
    name: 'લીલું મરચું',
    desc: 'સ્વાદને પૂર્ણ કરતી એક ખાસ સાથી.',
    side: 'right',
    topPercent: '84%',
  },
];

const VALUE_ITEMS = [
  {
    label: 'FRESH INGREDIENTS',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Leaf icon */}
        <path d="M11 20A7 7 0 0 1 4 13C4 8 8 3 13 3c4 0 7 3 7 7 0 5-5 10-9 10Z" />
        <path d="M13 3c-1 4-3 7-7 9" />
      </svg>
    ),
  },
  {
    label: 'AUTHENTIC SPICES',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Spice mortar/seed motif */}
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <circle cx="12" cy="12" r="8" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    label: 'TRADITIONAL RECIPE',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Steaming bowl */}
        <path d="M4 11h16a8 8 0 0 1-16 0Z" />
        <path d="M8 7c0-2 1-3 1-4" />
        <path d="M12 7c0-2 1-3 1-4" />
        <path d="M16 7c0-2 1-3 1-4" />
      </svg>
    ),
  },
  {
    label: 'PURE LOVE',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Heart icon */}
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

export default function IngredientsSection() {
  const sectionRef = useRef(null);
  const topMetaRef = useRef(null);
  const handwrittenAccentRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const productVisualRef = useRef(null);
  const calloutRefs = useRef([]);
  const connectorRefs = useRef([]);
  const sideDetailRef = useRef(null);
  const bottomStripRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            topMetaRef.current,
            handwrittenAccentRef.current,
            headingRef.current,
            subHeadingRef.current,
            paragraphRef.current,
            ctaRef.current,
            productVisualRef.current,
            sideDetailRef.current,
            bottomStripRef.current,
            ...calloutRefs.current,
            ...connectorRefs.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            scaleX: 1,
          }
        );
        return;
      }

      // Master entrance timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. 03 / OUR INGREDIENTS reveal
      if (topMetaRef.current) {
        tl.fromTo(
          topMetaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0
        );
      }

      // 2. Handwritten phrase fades in
      if (handwrittenAccentRef.current) {
        tl.fromTo(
          handwrittenAccentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.9, y: 0, duration: 0.75, ease: 'power2.out' },
          0.06
        );
      }

      // 3. Gujarati heading reveals upward
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.1
        );
      }

      // 4. Subheading & Body copy follow
      if (subHeadingRef.current) {
        tl.fromTo(
          subHeadingRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.18
        );
      }

      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.24
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0.30
        );
      }

      // 5. Main Exploded Product fades/rises: y 25 -> 0, scale 0.97 -> 1, opacity 0 -> 1
      if (productVisualRef.current) {
        tl.fromTo(
          productVisualRef.current,
          { opacity: 0, y: 25, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: 'power3.out' },
          0.16
        );
      }

      // 6. Connector lines draw outward (scaleX: 0 -> 1)
      if (connectorRefs.current.length > 0) {
        tl.fromTo(
          connectorRefs.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.55, duration: 0.75, stagger: 0.05, ease: 'power2.out' },
          0.35
        );
      }

      // 7. Callouts reveal sequentially
      if (calloutRefs.current.length > 0) {
        tl.fromTo(
          calloutRefs.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out' },
          0.38
        );
      }

      // Right-side micro detail
      if (sideDetailRef.current) {
        tl.fromTo(
          sideDetailRef.current,
          { opacity: 0, x: 10 },
          { opacity: 0.65, x: 0, duration: 0.85, ease: 'power2.out' },
          0.4
        );
      }

      // 8. Dark heritage strip rises slightly
      if (bottomStripRef.current) {
        tl.fromTo(
          bottomStripRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.45
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollToOrder = () => {
    const target = document.getElementById('order-cta') || document.getElementById('locations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="relative w-full min-h-screen lg:min-h-[118vh] bg-[#F7E8CF] text-[#1A0A04] overflow-hidden flex flex-col justify-between select-none"
      aria-label="ગજાનંદ સ્વાદની અંદરની વાત — ઘટકોની ઓળખ"
    >
      {/* Background Texture: Parchment Texture Overlay (14% Opacity) */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/parchment-texture.webp')`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Warm Saffron & Sandstone Ambient Radiance */}
      <div
        className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-[#D96814]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-24 left-10 w-80 h-80 rounded-full bg-[#C98B5B]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* MAIN EDITORIAL SPREAD CONTAINER                          */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 flex-1 flex flex-col justify-between">
        
        {/* Top Header Row: 03 / OUR INGREDIENTS + Handwritten Accent */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 lg:mb-10">
          
          {/* Top-Left Section Index Tag */}
          <div ref={topMetaRef} className="flex items-center gap-3.5 will-change-transform">
            <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#8F3418]/10 border border-[#8F3418]/20">
              <span className="font-['Syne',sans-serif] text-xs font-black tracking-widest text-[#8F3418]">
                03
              </span>
              <span className="w-1 h-1 rounded-full bg-[#8F3418]" />
              <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#8F3418] uppercase">
                OUR INGREDIENTS
              </span>
            </div>
            <div className="h-[1px] w-16 sm:w-24 bg-[#8F3418]/25" />
          </div>

          {/* Top-Right: Decorative Handwritten Accent Phrase */}
          <div
            ref={handwrittenAccentRef}
            className="flex items-center gap-2 text-left sm:text-right will-change-transform"
          >
            <p className="font-serif italic text-sm sm:text-base text-[#8F3418] tracking-wide leading-tight">
              “Simple Ingredients. <br className="hidden sm:inline" />
              <span className="font-semibold text-[#D96814]">Extraordinary Taste.</span>”
            </p>
          </div>

        </div>

        {/* Core Layout Grid: Left Text Block + Center/Right Exploded Product Anatomy Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8 items-center flex-1 my-auto">
          
          {/* ========================================================= */}
          {/* LEFT ZONE: Dominant Gujarati Typography & Story           */}
          {/* ========================================================= */}
          <div className="md:col-span-5 lg:col-span-4 xl:col-span-4 flex flex-col justify-center">
            
            {/* Main Display Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-black text-5xl sm:text-6xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.08] text-[#1A0A04] will-change-transform"
            >
              સ્વાદની
              <span className="block text-[#8F3418] mt-1">
                અસલી ઓળખ
              </span>
            </h2>

            {/* Supporting Headline */}
            <p
              ref={subHeadingRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] font-bold text-lg sm:text-xl text-[#2A130A] mt-4 sm:mt-5 leading-snug will-change-transform"
            >
              દરેક ઘટક, એક ખાસ કારણથી. સાથે મળીને બને છે ગજાનંદ વડાપાવનો અનોખો સ્વાદ.
            </p>

            {/* Fine Editorial Rule */}
            <div className="w-16 h-[1.5px] bg-[#8F3418]/30 my-5 sm:my-6" />

            {/* Additional Story Paragraph */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#2A130A]/85 font-normal leading-relaxed max-w-md will-change-transform"
            >
              તાજા, શુદ્ધ અને ગુણવત્તાવાળા ઘટકોનું સુમેળ, ગુજરાતની પરંપરાગત સ્વાદ સાથે — એ જ છે ગજાનંદ વડાપાવની ઓળખ.
            </p>

            {/* Editorial Link CTA */}
            <div ref={ctaRef} className="mt-7 sm:mt-8 will-change-transform">
              <button
                onClick={handleScrollToOrder}
                className="group relative inline-flex items-center gap-2.5 font-['Noto_Sans_Gujarati',sans-serif] font-bold text-base sm:text-lg text-[#1A0A04] hover:text-[#8F3418] transition-colors duration-[170ms] link-underline-grow cursor-pointer"
                aria-label="અમારા ઘટકો જાણો"
              >
                <span>અમારા ઘટકો જાણો</span>
                <span className="text-[#8F3418] transition-transform duration-[170ms] ease-out group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </div>

          </div>

          {/* ========================================================= */}
          {/* CENTER & RIGHT ZONE: Desktop Exploded Visual & Callouts    */}
          {/* ========================================================= */}
          <div className="hidden md:flex md:col-span-7 lg:col-span-8 xl:col-span-8 relative items-center justify-center min-h-[460px] lg:min-h-[540px] xl:min-h-[580px]">
            
            {/* Desktop Left-Side Callouts (01, 02, 03) */}
            <div className="flex absolute left-0 top-0 bottom-0 w-[30%] lg:w-[28%] flex-col justify-between py-6 z-20 pointer-events-auto">
              {INGREDIENT_CALLOUTS.slice(0, 3).map((item, idx) => (
                <div
                  key={item.num}
                  ref={(el) => {
                    if (el) calloutRefs.current[idx] = el;
                  }}
                  className="group relative flex flex-col text-right cursor-default will-change-transform transition-all duration-[170ms] hover:-translate-x-1"
                >
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="font-['Syne',sans-serif] text-xs font-black tracking-wider text-[#8F3418] group-hover:text-[#D96814] transition-colors duration-[170ms]">
                      {item.num}
                    </span>
                    <h3 className="font-['Noto_Serif_Gujarati',serif] font-bold text-base lg:text-lg text-[#1A0A04] group-hover:text-[#8F3418] transition-colors duration-[170ms]">
                      {item.name}
                    </h3>
                  </div>
                  <p className="font-['Noto_Sans_Gujarati',sans-serif] text-[11px] lg:text-xs text-[#2A130A]/80 font-normal leading-relaxed">
                    {item.desc}
                  </p>

                  {/* 1px Dark Brown Connector Line to Center Product */}
                  <div
                    ref={(el) => {
                      if (el) connectorRefs.current[idx] = el;
                    }}
                    className="hidden xl:block absolute right-[-40px] top-4 w-9 h-[1px] bg-[#2A130A]/50 group-hover:bg-[#D96814] group-hover:w-11 transition-all duration-[170ms] origin-left"
                  >
                    <span className="absolute right-0 top-[-2px] w-1.5 h-1.5 rounded-full bg-[#2A130A] group-hover:bg-[#D96814] transition-colors duration-[170ms]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Central Exploded Vada Pav Visual (Desktop) */}
            <div
              ref={productVisualRef}
              className="relative w-full max-w-[300px] lg:max-w-[380px] xl:max-w-[440px] aspect-[4/5] flex items-center justify-center will-change-transform z-10"
            >
              {/* Subtle Warm Shadow / Ambient Glow Underneath */}
              <div
                className="absolute inset-x-8 bottom-6 h-20 rounded-full bg-[#2A130A]/20 blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#D96814]/15 via-[#F2A321]/10 to-transparent blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Exploded Ingredients Image with Transparent Background */}
              <img
                src="/assets/gajanand-ingredients-exploded.webp"
                alt="ગજાનંદ વડાપાઉં ઘટકોનું એક્સપ્લોડેડ એનાટોમી — પાવ, ડુંગળી, બટાકા વડો, લસણ મસાલો, લીલી ચટણી અને લીલું મરચું"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-center drop-shadow-[0_15px_30px_rgba(42,19,10,0.18)]"
              />
            </div>

            {/* Desktop Right-Side Callouts (04, 05, 06) */}
            <div className="flex absolute right-0 top-0 bottom-0 w-[30%] lg:w-[28%] flex-col justify-between py-6 z-20 pointer-events-auto">
              {INGREDIENT_CALLOUTS.slice(3, 6).map((item, idx) => (
                <div
                  key={item.num}
                  ref={(el) => {
                    if (el) calloutRefs.current[idx + 3] = el;
                  }}
                  className="group relative flex flex-col text-left cursor-default will-change-transform transition-all duration-[170ms] hover:translate-x-1"
                >
                  {/* 1px Dark Brown Connector Line from Center Product */}
                  <div
                    ref={(el) => {
                      if (el) connectorRefs.current[idx + 3] = el;
                    }}
                    className="hidden xl:block absolute left-[-40px] top-4 w-9 h-[1px] bg-[#2A130A]/50 group-hover:bg-[#D96814] group-hover:w-11 transition-all duration-[170ms] origin-right"
                  >
                    <span className="absolute left-0 top-[-2px] w-1.5 h-1.5 rounded-full bg-[#2A130A] group-hover:bg-[#D96814] transition-colors duration-[170ms]" />
                  </div>

                  <div className="flex items-center justify-start gap-2 mb-1">
                    <h3 className="font-['Noto_Serif_Gujarati',serif] font-bold text-base lg:text-lg text-[#1A0A04] group-hover:text-[#8F3418] transition-colors duration-[170ms]">
                      {item.name}
                    </h3>
                    <span className="font-['Syne',sans-serif] text-xs font-black tracking-wider text-[#8F3418] group-hover:text-[#D96814] transition-colors duration-[170ms]">
                      {item.num}
                    </span>
                  </div>
                  <p className="font-['Noto_Sans_Gujarati',sans-serif] text-[11px] lg:text-xs text-[#2A130A]/80 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right-Side Micro Detail: Vertical Handwritten Phrase + Heritage Seal */}
            <div
              ref={sideDetailRef}
              className="hidden 2xl:flex absolute -right-14 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none select-none will-change-transform"
              aria-hidden="true"
            >
              {/* Circular Heritage Seal SVG */}
              <div className="w-16 h-16 opacity-30 text-[#8F3418]">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="38" />
                  <path id="sealTextPath" d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
                  <text className="text-[7.5px] tracking-[0.2em] uppercase fill-current font-semibold">
                    <textPath href="#sealTextPath" startOffset="0%">
                      TRADITIONAL TASTE • GUJARAT •
                    </textPath>
                  </text>
                  <circle cx="50" cy="50" r="4" fill="currentColor" />
                </svg>
              </div>

              {/* Vertical Handwritten Phrase */}
              <div className="writing-mode-vertical origin-center rotate-180 font-serif italic text-xs tracking-widest text-[#8F3418]/70 uppercase">
                Fresh • Authentic • Gujarati
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* MOBILE PRODUCT VIEW (< 768px)                             */}
          {/* ========================================================= */}
          <div className="flex md:hidden flex-col items-center justify-center w-full my-4">
            <div className="w-full relative flex items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-[#2A130A]/15 blur-xl pointer-events-none" />
              <img
                src="/assets/gajanand-ingredients.webp"
                alt="ગજાનંદ અસલી વડાપાવ"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = 'true';
                    e.currentTarget.src = '/assets/gajanand-ingredients-exploded.webp';
                  }
                }}
                className="block w-[85%] max-w-[420px] h-auto mx-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

        </div>

        {/* Mobile & Tablet Vertical Callout List (< 768px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-[#8F3418]/15 md:hidden">
          {INGREDIENT_CALLOUTS.map((item) => (
            <div key={item.num} className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-['Syne',sans-serif] text-xs font-black text-[#8F3418]">
                  {item.num}
                </span>
                <h3 className="font-['Noto_Serif_Gujarati',serif] font-bold text-base text-[#1A0A04]">
                  {item.name}
                </h3>
              </div>
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs text-[#2A130A]/85 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================= */}
      {/* BOTTOM HERITAGE STRIP (Dark Deep Brown-Black + Torn Edge) */}
      {/* ========================================================= */}
      <div
        ref={bottomStripRef}
        className="relative w-full bg-[#120B07] text-[#F7E8CF] z-20 will-change-transform mt-6"
      >
        {/* Irregular Torn-Paper Top Boundary Silhouette */}
        <div
          className="absolute -top-4 sm:-top-5 left-0 w-full h-5 sm:h-6 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full fill-[#120B07]"
            viewBox="0 0 1440 30"
            preserveAspectRatio="none"
          >
            <path d="M0,30 L1440,30 L1440,10 C1380,24 1320,8 1260,22 C1200,10 1140,25 1080,12 C1020,24 960,9 900,23 C840,11 780,26 720,10 C660,24 600,12 540,25 C480,9 420,24 360,11 C300,25 240,10 180,24 C120,9 60,22 0,12 Z" />
          </svg>
        </div>

        {/* Inner Content Grid with Values & Heritage Descriptor */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Far Left: Subtle Heritage Cart Silhouette Icon & Note */}
          <div className="hidden xl:flex items-center gap-3 text-[#C98B5B]/80" aria-hidden="true">
            <svg viewBox="0 0 32 32" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5">
              <path d="M4 22h24M8 22v-8h16v8M6 14h20l-2-6H8l-2 6zM11 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            <span className="font-['Noto_Sans_Gujarati',sans-serif] text-xs">
              સ્વાદનો વારસો
            </span>
          </div>

          {/* 4 Value Items with Saffron Line Accents */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
            {VALUE_ITEMS.map((val) => (
              <div key={val.label} className="flex items-center gap-2.5 text-[#D96814]">
                <div className="p-1.5 rounded-full bg-[#D96814]/10 border border-[#D96814]/25 flex-shrink-0">
                  {val.icon}
                </div>
                <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#F7E8CF]/90 uppercase">
                  {val.label}
                </span>
              </div>
            ))}
          </div>

          {/* Far Right: Editorial Legacy Stamp */}
          <div className="text-center lg:text-right border-t lg:border-t-0 border-[#D96814]/20 pt-3 lg:pt-0 w-full lg:w-auto">
            <p className="font-['Syne',sans-serif] text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#C98B5B] uppercase">
              MORE THAN A SNACK • A LEGACY
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
