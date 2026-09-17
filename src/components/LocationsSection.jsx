import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LocationsSection() {
  const sectionRef = useRef(null);
  const topTransitionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const mapContainerRef = useRef(null);
  const lifestyleImageRef = useRef(null);
  const mapOutlineRef = useRef(null);
  const anandMarkerRef = useRef(null);
  const petladMarkerRef = useRef(null);
  const connectPathRef = useRef(null);
  const chipsRef = useRef(null);

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
            mapContainerRef.current,
            lifestyleImageRef.current,
            mapOutlineRef.current,
            anandMarkerRef.current,
            petladMarkerRef.current,
            connectPathRef.current,
            chipsRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      const isMobile = window.innerWidth < 768;
      const yDist = isMobile ? 14 : 20;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Top curved transition gently enters
      if (topTransitionRef.current) {
        tl.fromTo(
          topTransitionRef.current,
          { y: 15, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0
        );
      }

      // 1. Eyebrow
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: yDist * 0.75 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.05
        );
      }

      // 2. Heading
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: yDist * 1.2 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          0.12
        );
      }

      // 3. Paragraph
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: yDist },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.22
        );
      }

      // 4. Buttons
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: yDist * 0.8 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
          0.3
        );
      }

      // 5. Chips
      if (chipsRef.current) {
        tl.fromTo(
          chipsRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.38
        );
      }

      // 6. Map Container (subtle fade & slide)
      if (mapContainerRef.current) {
        tl.fromTo(
          mapContainerRef.current,
          { opacity: 0, x: isMobile ? 12 : 24 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' },
          0.15
        );
      }

      // 7. Gujarat Outline fade in
      if (mapOutlineRef.current) {
        tl.fromTo(
          mapOutlineRef.current,
          { opacity: 0 },
          { opacity: 0.45, duration: 0.8, ease: 'power2.out' },
          0.25
        );
      }

      // 8. Primary Anand Pin (scale 0.92 -> 1 only once, no bounce)
      if (anandMarkerRef.current) {
        tl.fromTo(
          anandMarkerRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          0.35
        );
      }

      // 9. Petlad Pin follows (scale 0.92 -> 1 only once)
      if (petladMarkerRef.current) {
        tl.fromTo(
          petladMarkerRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          0.45
        );
      }

      // 10. Route line draws softly between them
      if (connectPathRef.current) {
        const length = connectPathRef.current.getTotalLength ? connectPathRef.current.getTotalLength() : 350;
        gsap.set(connectPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          connectPathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: 'power2.out',
          },
          0.52
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#E8C39E] text-[#2A130A] overflow-hidden flex flex-col justify-center select-none"
      aria-label="તમારી નજીક ગજાનંદ સ્ટોર - આણંદ અને પેટલાદ"
    >
      {/* Top Transition from Dark OrderCTA (#120B07) into Warm Sandstone (#E8C39E) */}
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

      {/* Gujarat Detail: Faint Bandhani dots & sandstone texture */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2A130A 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Ambient warm highlights */}
      <div
        className="absolute top-1/3 left-10 w-[450px] h-[450px] rounded-full bg-[#F7E8CF]/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#D96814]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 md:py-44 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Location Copy & Actions (45%) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#2A130A]/10 border border-[#2A130A]/20 backdrop-blur-sm mb-6 sm:mb-8 w-fit will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-[#D96814]" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm font-bold tracking-widest text-[#2A130A] uppercase">
                તમારી નજીક ગજાનંદ
              </p>
            </div>

            {/* Main Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] tracking-tight leading-[1.15] text-[#1A0A04] will-change-transform"
            >
              સ્વાદ હવે
              <span className="block text-[#D96814] mt-1 sm:mt-2">
                દૂર નથી.
              </span>
            </h2>

            {/* Supporting Text */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg md:text-xl text-[#2A130A]/85 font-normal leading-relaxed sm:leading-relaxed mt-6 sm:mt-8 max-w-xl will-change-transform"
            >
              તમારી નજીકના ગજાનંદ સ્ટોર પર આવો અને ગરમાગરમ સ્વાદનો આનંદ માણો.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 will-change-transform"
            >
              {/* Primary CTA */}
              <button
                id="location-find-store-btn"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D96814] text-[#120B07] font-['Noto_Sans_Gujarati',sans-serif] font-bold text-base sm:text-lg tracking-wide transition-all duration-[170ms] hover:bg-[#E98224] hover:shadow-[0_0_25px_rgba(217,104,20,0.45)] hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A130A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8C39E] cursor-pointer"
                aria-label="સ્ટોર શોધો"
              >
                <span>સ્ટોર શોધો</span>
                <svg
                  className="w-4 h-4 transition-transform duration-[170ms] group-hover:translate-x-1"
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
                id="location-directions-btn"
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#2A130A]/40 text-[#2A130A] font-['Noto_Sans_Gujarati',sans-serif] font-semibold text-base sm:text-lg tracking-wide transition-all duration-[170ms] hover:border-[#D96814] hover:text-[#D96814] hover:bg-[#D96814]/10 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A130A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8C39E] cursor-pointer"
                aria-label="દિશા મેળવો"
              >
                <svg
                  className="w-4 h-4 text-[#D96814]"
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
                <span>દિશા મેળવો</span>
              </button>
            </div>

            {/* Prominent Hub Highlights (Anand & Petlad) + Regional References */}
            <div
              ref={chipsRef}
              className="mt-10 pt-6 border-t border-[#2A130A]/15 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-xs sm:text-sm font-['Noto_Sans_Gujarati',sans-serif] will-change-transform"
            >
              <span className="font-bold text-[#D96814] flex items-center gap-1.5 bg-[#D96814]/10 px-3 py-1 rounded-full border border-[#D96814]/20 transition-all duration-[160ms] hover:bg-[#D96814]/20 hover:scale-[1.04] cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96814] animate-pulse transition-transform duration-[160ms] group-hover:scale-110" />
                આણંદ
              </span>
              <span className="font-bold text-[#D96814] flex items-center gap-1.5 bg-[#D96814]/10 px-3 py-1 rounded-full border border-[#D96814]/20 transition-all duration-[160ms] hover:bg-[#D96814]/20 hover:scale-[1.04] cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96814] transition-transform duration-[160ms]" />
                પેટલાદ
              </span>
              <span className="text-[#2A130A]/60 transition-colors duration-[160ms] hover:text-[#D96814]">• અમદાવાદ</span>
              <span className="text-[#2A130A]/60 transition-colors duration-[160ms] hover:text-[#D96814]">• વડોદરા</span>
              <span className="text-[#2A130A]/60 transition-colors duration-[160ms] hover:text-[#D96814]">• સુરત</span>
              <span className="text-[#2A130A]/60 transition-colors duration-[160ms] hover:text-[#D96814]">• રાજકોટ</span>
            </div>

          </div>

          {/* Right Column: Regional Lifestyle Atmosphere & Stylized Gujarat Map (55%) */}
          <div
            ref={mapContainerRef}
            className="lg:col-span-6 flex items-center justify-center will-change-transform"
          >
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] aspect-square rounded-3xl overflow-hidden p-6 sm:p-8 flex items-center justify-center border border-[#2A130A]/20 bg-[#2A130A]/20 shadow-2xl shadow-[#2A130A]/20">
              
              {/* Regional Lifestyle WebP Image */}
              <img
                ref={lifestyleImageRef}
                src="/assets/gajanand-gujarat-location.webp"
                alt="ગુજરાત સ્ટ્રીટ ફૂડ સંસ્કૃતિ અને વાતાવરણ"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform opacity-25 mix-blend-luminosity filter contrast-125 img-hover-subtle"
              />

              {/* Warm Sandstone & Saffron Atmosphere Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7E8CF]/90 via-[#E8C39E]/85 to-[#2A130A]/90 pointer-events-none" />
              <div className="absolute inset-0 bg-[#D96814]/15 mix-blend-color pointer-events-none" />

              {/* Outer Decorative Concentric Rings & Stepwell Framing */}
              <div className="absolute inset-4 rounded-2xl border border-[#2A130A]/15 pointer-events-none z-10" />
              <div className="absolute inset-8 rounded-full border border-[#2A130A]/10 border-dashed pointer-events-none z-10" />

              {/* Stylized Gujarat Map Silhouette & Prominent Anand/Petlad Hubs SVG */}
              <svg
                viewBox="0 0 400 400"
                className="relative z-10 w-full h-full text-[#2A130A] select-none"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Compass & Axis Lines */}
                <line x1="200" y1="30" x2="200" y2="370" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
                <line x1="30" y1="200" x2="370" y2="200" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
                
                {/* Stepwell Inverted Geometry Framing in Corners */}
                <path d="M40 40 L70 70 V100" strokeWidth="1" opacity="0.3" />
                <path d="M360 40 L330 70 V100" strokeWidth="1" opacity="0.3" />
                <path d="M40 360 L70 330 V300" strokeWidth="1" opacity="0.3" />
                <path d="M360 360 L330 330 V300" strokeWidth="1" opacity="0.3" />

                {/* Minimal Gujarat Territorial Contour Silhouette */}
                <path
                  ref={mapOutlineRef}
                  d="M100 120 
                     C120 100, 170 90, 200 100
                     C230 110, 255 130, 260 160
                     C265 190, 275 220, 285 245
                     C295 270, 305 310, 290 330
                     C275 350, 250 335, 235 305
                     C220 275, 205 265, 185 265
                     C165 265, 140 280, 120 275
                     C100 270, 85 250, 90 220
                     C95 190, 120 180, 135 170
                     C150 160, 140 140, 100 120 Z"
                  strokeWidth="1.5"
                  opacity="0.45"
                />

                {/* Secondary Inset Regional Flow Line */}
                <path
                  d="M125 140 
                     C140 125, 180 118, 205 125
                     C230 132, 245 150, 250 175
                     C255 200, 265 230, 275 255
                     C265 285, 245 285, 230 260
                     C215 235, 195 235, 175 240
                     C155 245, 135 240, 125 215
                     C115 190, 130 170, 140 160 Z"
                  strokeWidth="0.8"
                  strokeDasharray="4 2"
                  opacity="0.25"
                />

                {/* Regional Charotar Highlight Ring (Anand - Petlad Zone) */}
                <ellipse cx="232" cy="198" rx="42" ry="32" fill="#D96814" opacity="0.08" />
                <ellipse cx="232" cy="198" rx="42" ry="32" stroke="#D96814" strokeWidth="0.9" strokeDasharray="3 2" opacity="0.35" />

                {/* Thin Elegant Connector Route Line between Anand, Petlad and network */}
                <path
                  ref={connectPathRef}
                  d="M195 145 L240 185 L220 215 L255 240 L270 295"
                  strokeWidth="2"
                  stroke="#D96814"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* Direct Anand ↔ Petlad Connecting Beam */}
                <line x1="240" y1="185" x2="220" y2="215" strokeWidth="2.5" stroke="#D96814" strokeLinecap="round" />

                {/* Subtle Decorative City Nodes (Low Contrast) */}
                {/* 1. Ahmedabad Node */}
                <circle cx="195" cy="145" r="3" fill="#2A130A" opacity="0.35" />
                <text x="180" y="136" fill="#2A130A" fontSize="10" fontWeight="500" opacity="0.45" textAnchor="end" fontFamily="'Noto Sans Gujarati', sans-serif">
                  અમદાવાદ
                </text>

                {/* 2. Vadodara Node */}
                <circle cx="255" cy="240" r="3" fill="#2A130A" opacity="0.35" />
                <text x="265" y="244" fill="#2A130A" fontSize="10" fontWeight="500" opacity="0.45" fontFamily="'Noto Sans Gujarati', sans-serif">
                  વડોદરા
                </text>

                {/* 3. Surat Node */}
                <circle cx="270" cy="295" r="3" fill="#2A130A" opacity="0.35" />
                <text x="280" y="300" fill="#2A130A" fontSize="10" fontWeight="500" opacity="0.45" fontFamily="'Noto Sans Gujarati', sans-serif">
                  સુરત
                </text>

                {/* 4. Rajkot Node */}
                <circle cx="150" cy="215" r="3" fill="#2A130A" opacity="0.35" />
                <text x="105" y="220" fill="#2A130A" fontSize="10" fontWeight="500" opacity="0.45" fontFamily="'Noto Sans Gujarati', sans-serif">
                  રાજકોટ
                </text>

                {/* ======================================================== */}
                {/* PROMINENT LOCATION 1: આણંદ (PRIMARY HIGHLIGHTED HUB)   */}
                {/* ======================================================== */}
                <g ref={anandMarkerRef} className="will-change-transform">
                  {/* Outer Pulsing Aura */}
                  <circle cx="240" cy="185" r="22" fill="#D96814" opacity="0.16" />
                  <circle cx="240" cy="185" r="14" fill="#D96814" opacity="0.3" />
                  
                  {/* Primary Saffron Pin */}
                  <circle cx="240" cy="185" r="8.5" fill="#D96814" stroke="#F7E8CF" strokeWidth="2.5" />
                  <circle cx="240" cy="185" r="3" fill="#120B07" />
                  
                  {/* Pin Top Beacon */}
                  <line x1="240" y1="160" x2="240" y2="173" strokeWidth="1.5" stroke="#D96814" strokeDasharray="2 1" />
                  
                  {/* Bold Anand Label */}
                  <rect x="254" y="172" width="48" height="22" rx="6" fill="#120B07" opacity="0.9" />
                  <text x="278" y="187" fill="#F7E8CF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Serif Gujarati', serif">
                    આણંદ
                  </text>
                </g>

                {/* ======================================================== */}
                {/* PROMINENT LOCATION 2: પેટલાદ (SECONDARY HIGHLIGHTED HUB) */}
                {/* ======================================================== */}
                <g ref={petladMarkerRef} className="will-change-transform">
                  {/* Aura Ring */}
                  <circle cx="220" cy="215" r="16" fill="#D96814" opacity="0.14" />
                  <circle cx="220" cy="215" r="11" fill="#D96814" opacity="0.25" />
                  
                  {/* Secondary Saffron Pin */}
                  <circle cx="220" cy="215" r="7" fill="#D96814" stroke="#F7E8CF" strokeWidth="2" />
                  <circle cx="220" cy="215" r="2.5" fill="#120B07" />
                  
                  {/* Bold Petlad Label */}
                  <rect x="156" y="204" width="54" height="20" rx="5" fill="#2A130A" opacity="0.88" />
                  <text x="183" y="218" fill="#F7E8CF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Serif Gujarati', serif">
                    પેટલાદ
                  </text>
                </g>
              </svg>

              {/* Floating Regional Badge: આણંદ • પેટલાદ */}
              <div className="absolute bottom-5 left-6 z-20 px-4 py-2.5 rounded-full bg-[#2A130A]/92 border border-[#D96814]/40 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D96814] animate-pulse" />
                <span className="font-['Noto_Serif_Gujarati',serif] text-xs font-bold text-[#F7E8CF]">
                  આણંદ • પેટલાદ
                </span>
                <span className="text-[10px] text-[#C98B5B] font-['Noto_Sans_Gujarati',sans-serif]">
                  • તમારી નજીકનો સ્વાદ
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
