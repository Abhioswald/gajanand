import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    label: 'વધતા સ્ટોર',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'વધતો પરિવાર',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'અસલી સ્વાદ',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    label: 'સંપૂર્ણ ગુજરાતમાં',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const LOCATIONS = [
  {
    name: 'આણંદ',
    tag: 'મુખ્ય સ્થાન',
    isPrimary: true,
    desc: 'વિદ્યાનગર રોડ • જૂનું બસ સ્ટેન્ડ',
  },
  {
    name: 'પેટલાદ',
    tag: 'તમારી નજીક',
    isPrimary: false,
    desc: 'સ્ટેશન રોડ • મુખ્ય બજાર',
  },
  {
    name: 'બીજા શહેરો',
    tag: 'જલ્દી વધુ સ્થળોએ',
    isUpcoming: true,
    desc: 'અમદાવાદ, વડોદરા, સુરત ટૂંક સમયમાં',
  },
];

export default function LocationsSection() {
  const sectionRef = useRef(null);
  const topMetaRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const handwrittenRef = useRef(null);
  const searchRef = useRef(null);
  const mapWrapRef = useRef(null);
  const anandPinRef = useRef(null);
  const petladPinRef = useRef(null);
  const routeLineRef = useRef(null);
  const locationListRef = useRef(null);
  const stallImageRef = useRef(null);
  const valuesRef = useRef(null);
  const heritageLineRef = useRef(null);
  const stampRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            topMetaRef.current,
            headingRef.current,
            paragraphRef.current,
            handwrittenRef.current,
            searchRef.current,
            mapWrapRef.current,
            anandPinRef.current,
            petladPinRef.current,
            routeLineRef.current,
            locationListRef.current,
            stallImageRef.current,
            valuesRef.current,
            heritageLineRef.current,
            stampRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
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

      // 1. 05 / OUR LOCATIONS fades in
      if (topMetaRef.current) {
        tl.fromTo(
          topMetaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0
        );
      }

      // 2. Gujarati heading reveals upward
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.08
        );
      }

      // 3. Supporting copy follows
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.16
        );
      }

      // 4. Handwritten accent fades in
      if (handwrittenRef.current) {
        tl.fromTo(
          handwrittenRef.current,
          { opacity: 0, y: 8 },
          { opacity: 0.85, y: 0, duration: 0.75, ease: 'power2.out' },
          0.22
        );
      }

      // 5. Search UI reveals
      if (searchRef.current) {
        tl.fromTo(
          searchRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.28
        );
      }

      // 6. Map image fades/rises slightly
      if (mapWrapRef.current) {
        tl.fromTo(
          mapWrapRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.32
        );
      }

      // 7. Anand marker reveals first
      if (anandPinRef.current) {
        tl.fromTo(
          anandPinRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          0.42
        );
      }

      // 8. Petlad marker follows
      if (petladPinRef.current) {
        tl.fromTo(
          petladPinRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          0.50
        );
      }

      // 9. Route connector line draws softly
      if (routeLineRef.current) {
        const length = routeLineRef.current.getTotalLength ? routeLineRef.current.getTotalLength() : 120;
        gsap.set(routeLineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          routeLineRef.current,
          { strokeDashoffset: 0, duration: 0.75, ease: 'power2.out' },
          0.56
        );
      }

      // 10. Location list reveals
      if (locationListRef.current) {
        tl.fromTo(
          locationListRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.48
        );
      }

      // 11. Stall lifestyle image reveals with clip-path from right
      if (stallImageRef.current) {
        tl.fromTo(
          stallImageRef.current,
          { opacity: 0, clipPath: 'inset(0% 0% 0% 25%)' },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.out' },
          0.20
        );
      }

      // 12. Value row fades in
      if (valuesRef.current) {
        tl.fromTo(
          valuesRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.54
        );
      }

      // 13. Heritage line-art and stamp appear last
      if (heritageLineRef.current) {
        tl.fromTo(
          heritageLineRef.current,
          { opacity: 0, y: 8 },
          { opacity: 0.25, y: 0, duration: 0.85, ease: 'power3.out' },
          0.58
        );
      }

      if (stampRef.current) {
        tl.fromTo(
          stampRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 0.35, scale: 1, duration: 0.8, ease: 'power2.out' },
          0.62
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative w-full min-h-screen lg:min-h-[110vh] bg-[#F7E8CF] text-[#2A130A] overflow-hidden flex flex-col justify-between select-none"
      aria-label="ગજાનંદ લોકેશન્સ — આણંદ અને પેટલાદ"
    >
      {/* Subtle Warm Parchment Texture Overlay (< 6% intensity) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#8F3418 1px, transparent 1px), radial-gradient(#2A130A 1px, #F7E8CF 1px)`,
          backgroundSize: '24px 24px, 48px 48px',
          backgroundPosition: '0 0, 24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Warm Saffron & Sandstone Ambient Radiance */}
      <div
        className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#D96814]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-1/3 w-80 h-80 rounded-full bg-[#C98B5B]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* MAIN CONTAINER: 45 / 55 ASYMMETRIC LIGHT EDITORIAL SPREAD */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT ZONE: Location Discovery & Map (45% visual width)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            
            {/* Top Meta: 05 / OUR LOCATIONS */}
            <div
              ref={topMetaRef}
              className="flex items-center gap-3.5 mb-5 sm:mb-6 will-change-transform"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#8F3418]/10 border border-[#8F3418]/25">
                <span className="font-['Syne',sans-serif] text-xs font-black tracking-widest text-[#8F3418]">
                  05
                </span>
                <span className="w-1 h-1 rounded-full bg-[#8F3418]" />
                <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#8F3418] uppercase">
                  OUR LOCATIONS
                </span>
              </div>
              <div className="h-[1px] w-20 bg-[#8F3418]/25" />
            </div>

            {/* Main Gujarati Display Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-black text-5xl sm:text-6xl md:text-5xl xl:text-6xl tracking-tight leading-[1.12] text-[#1A0A04] will-change-transform"
            >
              ગજાનંદ હવે <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D96814] via-[#E98224] to-[#F2A321]">
                તમારા શહેરમાં!
              </span>
            </h2>

            {/* Supporting Copy & Handwritten Accent */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-4 sm:mt-5">
              <p
                ref={paragraphRef}
                className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg text-[#2A130A]/90 font-normal leading-relaxed max-w-sm will-change-transform"
              >
                જ્યાં પણ હો, ગજાનંદનો અસલી સ્વાદ હવે વધુ નજીક.
              </p>

              <div
                ref={handwrittenRef}
                className="hidden sm:block font-serif italic text-sm text-[#8F3418]/80 will-change-transform flex-shrink-0"
              >
                “Same Street Taste. Everywhere.”
              </div>
            </div>

            {/* Clean Location Search Bar UI */}
            <form
              ref={searchRef}
              onSubmit={handleSearchSubmit}
              className="mt-6 sm:mt-7 relative flex items-center w-full max-w-md bg-[#F3DFC2]/70 border border-[#8F3418]/30 rounded-xl p-1.5 focus-within:border-[#D96814] focus-within:ring-2 focus-within:ring-[#D96814]/20 transition-all will-change-transform"
            >
              <div className="pl-3 pr-2 text-[#8F3418]" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="તમારું શહેર શોધો..."
                className="w-full bg-transparent font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#1A0A04] placeholder-[#2A130A]/50 focus:outline-none px-2 py-1.5"
                aria-label="તમારું શહેર શોધો"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#D96814] hover:bg-[#E98224] text-[#120B07] font-['Noto_Sans_Gujarati',sans-serif] font-bold text-sm tracking-wide transition-all duration-[170ms] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex-shrink-0"
              >
                શોધો
              </button>
            </form>

            {/* Map Visual & Locations Section */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
              
              {/* Stylized Gujarat Map Silhouette with Anand & Petlad Markers */}
              <div
                ref={mapWrapRef}
                className="relative w-full sm:w-56 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-2 will-change-transform flex-shrink-0"
              >
                {/* Gujarat Map Raster Asset as Background */}
                <img
                  src="/assets/gajanand-gujarat-map.webp"
                  alt="ગુજરાત નકશો — આણંદ અને પેટલાદ સ્થાન સાથે"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain object-center opacity-85 mix-blend-multiply"
                />

                {/* Interactive SVG Overlay with Anand (Saffron) and Petlad (Warm Orange) Markers */}
                <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full select-none" fill="none">
                  {/* Route connector line between Anand and Petlad */}
                  <path
                    ref={routeLineRef}
                    d="M125 95 L112 112"
                    stroke="#D96814"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* 1. ANAND (Primary Location - Stronger Saffron Marker) */}
                  <g ref={anandPinRef} className="will-change-transform cursor-pointer">
                    <circle cx="125" cy="95" r="14" fill="#D96814" opacity="0.2" />
                    <circle cx="125" cy="95" r="7" fill="#D96814" stroke="#F7E8CF" strokeWidth="1.8" />
                    <circle cx="125" cy="95" r="2.5" fill="#120B07" />
                    
                    {/* Floating Label */}
                    <rect x="135" y="86" width="34" height="17" rx="4" fill="#120B07" opacity="0.92" />
                    <text x="152" y="98" fill="#F7E8CF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Serif Gujarati', serif">
                      આણંદ
                    </text>
                  </g>

                  {/* 2. PETLAD (Secondary Location - Warm Orange Marker) */}
                  <g ref={petladPinRef} className="will-change-transform cursor-pointer">
                    <circle cx="112" cy="112" r="11" fill="#E98224" opacity="0.22" />
                    <circle cx="112" cy="112" r="5.5" fill="#E98224" stroke="#F7E8CF" strokeWidth="1.5" />
                    <circle cx="112" cy="112" r="2" fill="#120B07" />
                    
                    {/* Floating Label */}
                    <rect x="70" y="104" width="38" height="16" rx="4" fill="#2A130A" opacity="0.88" />
                    <text x="89" y="115" fill="#F7E8CF" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Serif Gujarati', serif">
                      પેટલાદ
                    </text>
                  </g>
                </svg>
              </div>

              {/* Clean Editorial Location List */}
              <div
                ref={locationListRef}
                className="flex-1 flex flex-col justify-center gap-3 w-full will-change-transform"
              >
                {LOCATIONS.map((loc) => (
                  <div
                    key={loc.name}
                    className="group flex items-center justify-between py-2 border-b border-[#8F3418]/15 last:border-b-0 cursor-default transition-all duration-[170ms]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${loc.isPrimary ? 'bg-[#D96814]' : loc.isUpcoming ? 'bg-[#8F3418]/40' : 'bg-[#E98224]'}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Noto_Serif_Gujarati',serif] font-bold text-base sm:text-lg text-[#1A0A04] group-hover:text-[#D96814] transition-colors">
                            {loc.name}
                          </h3>
                          <span className={`text-[10px] font-['Noto_Sans_Gujarati',sans-serif] font-semibold px-2 py-0.5 rounded-full ${
                            loc.isPrimary
                              ? 'bg-[#D96814]/15 text-[#D96814]'
                              : loc.isUpcoming
                              ? 'bg-[#2A130A]/10 text-[#2A130A]/70'
                              : 'bg-[#E98224]/15 text-[#E98224]'
                          }`}>
                            {loc.tag}
                          </span>
                        </div>
                        <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs text-[#2A130A]/75 mt-0.5">
                          {loc.desc}
                        </p>
                      </div>
                    </div>

                    <span className="text-[#8F3418] transition-transform duration-[170ms] ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom-Left Value Row (Single row on desktop, 2x2 on mobile) */}
            <div
              ref={valuesRef}
              className="mt-8 pt-6 border-t border-[#8F3418]/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 will-change-transform"
            >
              {VALUES.map((val) => (
                <div key={val.label} className="flex items-center gap-2 text-[#2A130A]">
                  <div className="p-1.5 rounded-lg bg-[#D96814]/10 border border-[#D96814]/25 text-[#D96814] flex-shrink-0">
                    {val.icon}
                  </div>
                  <span className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-semibold text-[#1A0A04]">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT ZONE: Lifestyle Stall Image (55% visual width)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
            
            {/* Lifestyle Stall Presentation Container */}
            <div
              ref={stallImageRef}
              className="relative w-full max-w-[540px] lg:max-w-[620px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-[#2A130A]/15 border border-[#8F3418]/15 will-change-transform"
            >
              {/* Stall Lifestyle Image */}
              <img
                src="/assets/gajanand-location-stall.webp"
                alt="ગજાનંદ વડાપાવ સ્ટોલ ગુજરાતમાં"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center will-change-transform"
              />

              {/* Soft Cream Edge Fade where image meets content */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7E8CF] via-[#F7E8CF]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A130A]/50 via-transparent to-transparent pointer-events-none" />

              {/* Discreet Stall Location Badge in Lower Corner */}
              <div className="absolute bottom-5 left-6 z-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#120B07]/85 border border-[#F2A321]/30 backdrop-blur-md text-[#F7E8CF]">
                <span className="w-2 h-2 rounded-full bg-[#D96814] animate-pulse" />
                <span className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm font-bold">
                  ગજાનંદ • આણંદ & પેટલાદ
                </span>
                <span className="text-[10px] tracking-wider text-[#C98B5B] uppercase font-semibold">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Optional Subtle Heritage Stamp in Lower Right */}
            <div
              ref={stampRef}
              className="hidden 2xl:block absolute -bottom-4 -right-6 z-20 pointer-events-none select-none will-change-transform"
              aria-hidden="true"
            >
              <div className="w-18 h-18 text-[#8F3418]/40">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1.4">
                  <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="38" />
                  <path id="locSealPath" d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
                  <text className="text-[7.5px] tracking-[0.2em] uppercase fill-current font-semibold">
                    <textPath href="#locSealPath" startOffset="0%">
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

      {/* ========================================================= */}
      {/* FAINT BOTTOM ARCHITECTURAL LINE-ART STRIP                 */}
      {/* ========================================================= */}
      <div
        ref={heritageLineRef}
        className="relative w-full overflow-hidden border-t border-[#8F3418]/15 py-3 pointer-events-none select-none will-change-transform"
        aria-hidden="true"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[11px] sm:text-xs text-[#8F3418]/70">
          {/* Left: Street food stall silhouette icon */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.4">
              <path d="M4 22h24M8 22v-8h16v8M6 14h20l-2-6H8l-2 6zM11 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            <span className="font-['Noto_Sans_Gujarati',sans-serif]">
              ગુજરાતની સ્વાદિષ્ટ પરંપરા • ઘરેલુ મસાલા અને તાજગી
            </span>
          </div>

          {/* Right: Heritage note */}
          <div className="font-['Syne',sans-serif] tracking-widest uppercase text-[10px]">
            ANAND • PETLAD • GUJARAT
          </div>
        </div>
      </div>

    </section>
  );
}
