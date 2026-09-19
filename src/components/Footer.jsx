import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    label: 'તાજા ઘટકો',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Leaf */}
        <path d="M11 20A7 7 0 0 1 4 13C4 8 8 3 13 3c4 0 7 3 7 7 0 5-5 10-9 10Z" />
        <path d="M13 3c-1 4-3 7-7 9" />
      </svg>
    ),
  },
  {
    label: 'સ્વચ્છતા સાથે',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Shield */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'અસલી સ્વાદ',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Flame */}
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    label: 'ગુજરાતનો પ્રેમ',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Heart */}
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const brandWordmarkRef = useRef(null);
  const productVisualRef = useRef(null);
  const emotionQuoteRef = useRef(null);
  const heritageSkylineRef = useRef(null);
  const valuesRef = useRef(null);
  const darkColsRef = useRef(null);
  const dividerRef = useRef(null);

  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            brandWordmarkRef.current,
            productVisualRef.current,
            emotionQuoteRef.current,
            heritageSkylineRef.current,
            valuesRef.current,
            darkColsRef.current,
            dividerRef.current,
          ],
          { opacity: 1, y: 0, scaleX: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Brand Wordmark fades & lifts slightly
      if (brandWordmarkRef.current) {
        tl.fromTo(
          brandWordmarkRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0
        );
      }

      // 2. Product image fades in
      if (productVisualRef.current) {
        tl.fromTo(
          productVisualRef.current,
          { opacity: 0, scale: 0.96, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: 'power3.out' },
          0.1
        );
      }

      // 3. Emotional quote
      if (emotionQuoteRef.current) {
        tl.fromTo(
          emotionQuoteRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.2
        );
      }

      // 4. Heritage line-art appears
      if (heritageSkylineRef.current) {
        tl.fromTo(
          heritageSkylineRef.current,
          { opacity: 0, y: 8 },
          { opacity: 0.22, y: 0, duration: 0.85, ease: 'power3.out' },
          0.25
        );
      }

      // 5. Value icons stagger softly
      if (valuesRef.current) {
        tl.fromTo(
          valuesRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.3
        );
      }

      // 6. Dark footer columns fade upward
      if (darkColsRef.current) {
        tl.fromTo(
          darkColsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.38
        );
      }

      // 7. Divider grows left-to-right
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.85, ease: 'power2.out' },
          0.45
        );
      }
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer
      id="site-footer"
      ref={footerRef}
      className="relative w-full overflow-hidden select-none"
      aria-label="ગજાનંદ ફૂટર"
    >
      {/* ========================================================= */}
      {/* 1. LIGHT BRAND STORY AREA (#F7E8CF)                       */}
      {/* ========================================================= */}
      <div className="relative w-full bg-[#F7E8CF] text-[#1A0A04] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 overflow-hidden">
        
        {/* Subtle Parchment Texture Background Overlay (<5% intensity) */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/parchment-texture.webp')`,
          }}
          aria-hidden="true"
        />

        {/* Ambient Warm Glow */}
        <div
          className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-[#D96814]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Heritage Skyline Illustration across Light Area (Inline SVG) */}
        <div
          ref={heritageSkylineRef}
          className="absolute bottom-4 left-0 right-0 w-full overflow-hidden pointer-events-none text-[#8F3418] opacity-[0.22] will-change-transform"
          aria-hidden="true"
        >
          <svg
            className="w-full min-w-[1200px] h-20 stroke-current fill-none"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            strokeWidth="1.2"
          >
            {/* Architectural Arches & Bridges */}
            <path d="M0 80 L60 80 C80 50, 120 50, 140 80" />
            <path d="M140 80 C160 40, 220 40, 240 80" />
            <path d="M240 80 L320 80" />
            <path d="M320 80 C340 30, 400 30, 420 80" />
            {/* Heritage Spire / Chhatri */}
            <path d="M480 80 L480 45 L500 25 L520 45 L520 80" />
            <path d="M500 25 L500 12" />
            <circle cx="500" cy="10" r="2.5" />
            {/* Bridge Span */}
            <path d="M560 80 C620 45, 740 45, 800 80" />
            <line x1="560" y1="58" x2="800" y2="58" strokeDasharray="3 3" />
            {/* Street Cart & Gateway */}
            <path d="M900 80 L900 35 C900 20, 960 20, 960 35 L960 80" />
            <path d="M1040 80 L1040 50 L1100 50 L1100 80" />
            <circle cx="1055" cy="72" r="7" />
            <circle cx="1085" cy="72" r="7" />
            {/* Far Spire */}
            <path d="M1200 80 C1220 40, 1280 40, 1300 80" />
            <path d="M1360 80 L1360 45 L1380 25 L1400 45 L1400 80" />
          </svg>
        </div>

        {/* Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Area: Dominant Brand Heading, Tagline & Value Row */}
            <div
              ref={brandWordmarkRef}
              className="lg:col-span-7 flex flex-col justify-center will-change-transform"
            >
              {/* Brand Heading */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D96814] shadow-[0_0_8px_#D96814]" />
                  <span className="font-['Syne',sans-serif] text-xs font-bold tracking-[0.25em] text-[#8F3418] uppercase">
                    EST. 1998 • GUJARAT
                  </span>
                </div>

                <h2 className="font-['Noto_Serif_Gujarati',serif] font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] tracking-tight leading-[1.05] text-[#1A0A04]">
                  ગજાનંદ <br />
                  <span className="text-[#8F3418]">વડાપાવ</span>
                </h2>
              </div>

              {/* Tagline & Handwritten Accent */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                <p className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg text-[#2A130A] font-bold">
                  ગુજરાતની ગલીઓનો અસલી સ્વાદ
                </p>

                <p className="font-serif italic text-sm sm:text-base text-[#8F3418]/85">
                  “Same Street Taste Everywhere.”
                </p>
              </div>

              {/* Value Row (4 values with thin inline SVG icons) */}
              <div
                ref={valuesRef}
                className="mt-8 pt-6 border-t border-[#8F3418]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 will-change-transform"
              >
                {VALUES.map((val) => (
                  <div key={val.label} className="flex items-center gap-2 text-[#2A130A]">
                    <div className="p-1.5 rounded-lg bg-[#8F3418]/10 border border-[#8F3418]/20 text-[#8F3418] flex-shrink-0">
                      {val.icon}
                    </div>
                    <span className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-semibold text-[#1A0A04]">
                      {val.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Area: Vada Pav Product Visual & Emotional Quote */}
            <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center">
              
              {/* Product Presentation (No Card, Seamlessly Grounded) */}
              <div
                ref={productVisualRef}
                className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/3] flex items-center justify-center will-change-transform"
              >
                <div className="absolute inset-x-8 bottom-4 h-14 rounded-full bg-[#2A130A]/20 blur-xl pointer-events-none" />
                
                <img
                  src="/assets/gajanand-footer-vadapav.webp"
                  alt="ગજાનંદ વડાપાવ"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full h-full object-contain object-center drop-shadow-[0_15px_30px_rgba(42,19,10,0.22)]"
                />
              </div>

              {/* Small Gujarati Emotion Quote near Product */}
              <div
                ref={emotionQuoteRef}
                className="mt-3 text-center lg:text-right will-change-transform"
              >
                <p className="font-['Noto_Serif_Gujarati',serif] font-bold text-sm sm:text-base text-[#1A0A04] leading-snug">
                  “વડાપાવ એ માત્ર નાસ્તો નથી, <br className="hidden sm:inline" />
                  <span className="text-[#8F3418]">એ એક લાગણી છે.</span>”
                </p>
                <div className="w-12 h-[1.5px] bg-[#D96814] mx-auto lg:ml-auto lg:mr-0 mt-2" />
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. TORN-PAPER BOUNDARY (Organic SVG Transition)           */}
      {/* ========================================================= */}
      <div className="relative w-full h-6 sm:h-8 -mt-1 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          className="w-full h-full fill-[#120B07]"
          viewBox="0 0 1440 30"
          preserveAspectRatio="none"
        >
          <path d="M0,30 L1440,30 L1440,10 C1380,24 1320,8 1260,22 C1200,10 1140,25 1080,12 C1020,24 960,9 900,23 C840,11 780,26 720,10 C660,24 600,12 540,25 C480,9 420,24 360,11 C300,25 240,10 180,24 C120,9 60,22 0,12 Z" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 3. DARK FUNCTIONAL FOOTER AREA (#120B07)                  */}
      {/* ========================================================= */}
      <div className="relative w-full bg-[#120B07] text-[#F7E8CF] pt-10 sm:pt-14 pb-10">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* 4 Desktop Columns */}
          <div
            ref={darkColsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 will-change-transform"
          >
            
            {/* COLUMN 1 — QUICK LINKS (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-start">
              <h3 className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-bold tracking-widest text-[#C98B5B] uppercase mb-4">
                ઝડપી લિંક્સ
              </h3>
              
              <nav className="flex flex-col gap-2.5" aria-label="Footer Quick Links">
                <a
                  href="#brand-story"
                  onClick={(e) => scrollToSection(e, 'brand-story')}
                  className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm text-[#F7E8CF]/80 hover:text-[#D96814] w-fit"
                >
                  અમારી કહાની
                </a>
                <a
                  href="#ingredients"
                  onClick={(e) => scrollToSection(e, 'ingredients')}
                  className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm text-[#F7E8CF]/80 hover:text-[#D96814] w-fit"
                >
                  ઘટકો
                </a>
                <a
                  href="#order-cta"
                  onClick={(e) => scrollToSection(e, 'order-cta')}
                  className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm text-[#F7E8CF]/80 hover:text-[#D96814] w-fit"
                >
                  ઓર્ડર કરો
                </a>
                <a
                  href="#locations"
                  onClick={(e) => scrollToSection(e, 'locations')}
                  className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm text-[#F7E8CF]/80 hover:text-[#D96814] w-fit"
                >
                  સ્ટોર શોધો
                </a>
              </nav>
            </div>

            {/* COLUMN 2 — OUR LOCATIONS (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-start">
              <h3 className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-bold tracking-widest text-[#C98B5B] uppercase mb-4">
                અમારા સ્થાનો
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D96814]" />
                  <span className="font-['Noto_Serif_Gujarati',serif] text-sm font-bold text-[#F7E8CF]">
                    આણંદ
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E98224]" />
                  <span className="font-['Noto_Serif_Gujarati',serif] text-sm font-bold text-[#F7E8CF]">
                    પેટલાદ
                  </span>
                </div>

                <span className="text-xs font-['Noto_Sans_Gujarati',sans-serif] text-[#C98B5B] mt-1">
                  ગુજરાત
                </span>
              </div>
            </div>

            {/* COLUMN 3 — GET IN TOUCH (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-start">
              <h3 className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-bold tracking-widest text-[#C98B5B] uppercase mb-4">
                સંપર્ક
              </h3>

              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-sm text-[#F7E8CF]/75 leading-relaxed">
                સંપર્ક વિગતો ટૂંક સમયમાં
              </p>
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs text-[#C98B5B] mt-1">
                આણંદ અને પેટલાદ • ગુજરાત
              </p>
            </div>

            {/* COLUMN 4 — STAY CONNECTED & SOCIALS (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-start">
              <h3 className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-bold tracking-widest text-[#C98B5B] uppercase mb-2">
                અમારી સાથે જોડાયેલા રહો
              </h3>

              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs text-[#F7E8CF]/70 leading-relaxed mb-3">
                નવા સ્ટોર, ખાસ ઓફર અને અપડેટ માટે.
              </p>

              {/* Newsletter UI */}
              <form onSubmit={handleNewsletterSubmit} className="flex items-center mb-4">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="તમારું ઈમેઈલ..."
                  className="w-full bg-[#1A0D07] border border-[#F7E8CF]/20 rounded-l-lg px-3 py-2 text-xs text-[#F7E8CF] placeholder-[#F7E8CF]/40 focus:outline-none focus:border-[#D96814]"
                  aria-label="ઈમેઈલ દાખલ કરો"
                />
                <button
                  type="submit"
                  className="group bg-[#D96814] hover:bg-[#E98224] text-[#120B07] px-3.5 py-2 rounded-r-lg font-bold text-xs transition-all duration-[160ms] cursor-pointer"
                  aria-label="સબસ્ક્રાઇબ કરો"
                >
                  <span className="inline-block transition-transform duration-[160ms] group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>

              {/* Social Icon Buttons (Accessible, Safe Placeholders) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg border border-[#F7E8CF]/20 hover:border-[#D96814] hover:text-[#D96814] flex items-center justify-center text-xs text-[#F7E8CF]/70 transition-all duration-[160ms] hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg border border-[#F7E8CF]/20 hover:border-[#D96814] hover:text-[#D96814] flex items-center justify-center text-xs text-[#F7E8CF]/70 transition-all duration-[160ms] hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.8">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg border border-[#F7E8CF]/20 hover:border-[#D96814] hover:text-[#D96814] flex items-center justify-center text-xs text-[#F7E8CF]/70 transition-all duration-[160ms] hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.8">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg border border-[#F7E8CF]/20 hover:border-[#D96814] hover:text-[#D96814] flex items-center justify-center text-xs text-[#F7E8CF]/70 transition-all duration-[160ms] hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.8">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Animated Divider Line */}
          <div ref={dividerRef} className="w-full h-[1px] bg-[#F7E8CF]/12 will-change-transform" />

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F7E8CF]/60 font-['Noto_Sans_Gujarati',sans-serif]">
            <div>
              <p>© 2026 ગજાનંદ. સર્વાધિકાર સુરક્ષિત.</p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#C98B5B]">
              <span>ગુજરાતમાં પ્રેમથી બનાવેલું</span>
              <span className="text-[#D96814]" aria-hidden="true">♥</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
