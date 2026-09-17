import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  {
    num: '01',
    name: 'પાવ',
    english: 'Soft Pav',
    desc: 'નરમ, હળવો અને હળવેથી શેકેલો.',
    icon: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 stroke-current fill-none transition-transform duration-200"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Soft rounded bun silhouette */}
        <path d="M12 40 C12 24, 20 16, 32 16 C44 16, 52 24, 52 40 C52 44, 48 46, 32 46 C16 46, 12 44, 12 40 Z" />
        {/* Bun central split / softness crease */}
        <path d="M32 18 V 44" strokeDasharray="3 2" opacity="0.6" />
        {/* Gentle steam / glaze warmth */}
        <path d="M22 11 C22 9, 24 7, 24 5" opacity="0.5" strokeWidth="1" />
        <path d="M32 10 C32 8, 34 6, 34 4" opacity="0.5" strokeWidth="1" />
        <path d="M42 11 C42 9, 44 7, 44 5" opacity="0.5" strokeWidth="1" />
        {/* Base shadow baseline */}
        <ellipse cx="32" cy="50" rx="20" ry="2.5" opacity="0.25" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'બટાકા વડો',
    english: 'Bataka Vado',
    desc: 'બહારથી કરકરો, અંદરથી નરમ અને મસાલેદાર.',
    icon: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 stroke-current fill-none transition-transform duration-200"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Crisp golden vada sphere */}
        <circle cx="32" cy="32" r="17" />
        {/* Besan batter crisp texture crinkles */}
        <path d="M22 28 C26 24, 30 26, 34 22" opacity="0.65" />
        <path d="M25 38 C29 35, 36 39, 41 34" opacity="0.65" />
        <circle cx="36" cy="27" r="1" fill="currentColor" opacity="0.7" />
        <circle cx="28" cy="34" r="1" fill="currentColor" opacity="0.7" />
        {/* Mustard seed & spice seasoning dots */}
        <circle cx="24" cy="25" r="0.8" fill="currentColor" opacity="0.5" />
        <circle cx="39" cy="38" r="0.8" fill="currentColor" opacity="0.5" />
        {/* Golden halo radiance */}
        <circle cx="32" cy="32" r="21" strokeDasharray="2 3" opacity="0.3" strokeWidth="0.8" />
        <ellipse cx="32" cy="53" rx="15" ry="2" opacity="0.2" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'લીલી ચટણી',
    english: 'Fresh Chutney',
    desc: 'ધાણા, મરચાં અને તાજી હર્બલ તીખાશ.',
    icon: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 stroke-current fill-none transition-transform duration-200"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Clay serving bowl */}
        <path d="M14 30 C14 44, 22 49, 32 49 C42 49, 50 44, 50 30 Z" />
        <line x1="12" y1="30" x2="52" y2="30" />
        {/* Fresh coriander leaf motif sprouting */}
        <path d="M32 30 C32 20, 24 16, 22 14 C28 14, 32 18, 32 24 C32 18, 36 14, 42 14 C40 16, 32 20, 32 30" fill="none" />
        <circle cx="32" cy="15" r="1.5" fill="currentColor" opacity="0.7" />
        {/* Bowl foot base */}
        <line x1="26" y1="49" x2="38" y2="49" strokeWidth="2" />
        <ellipse cx="32" cy="53" rx="16" ry="2" opacity="0.2" />
      </svg>
    ),
  },
  {
    num: '04',
    name: 'લસણ મસાલો',
    english: 'Dry Garlic Masala',
    desc: 'મસાલેદાર, સુગંધિત અને સ્વાદમાં જોરદાર.',
    icon: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 stroke-current fill-none transition-transform duration-200"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Whole garlic clove / pod silhouette */}
        <path d="M32 14 C32 14, 18 26, 18 36 C18 44, 24 48, 32 48 C40 48, 46 44, 46 36 C46 26, 32 14, 32 14 Z" />
        {/* Clove segmentation lines */}
        <path d="M26 46 C23 40, 24 30, 32 16" opacity="0.6" />
        <path d="M38 46 C41 40, 40 30, 32 16" opacity="0.6" />
        {/* Masala spice sprinkle dots */}
        <circle cx="15" cy="22" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="49" cy="24" r="1.2" fill="currentColor" opacity="0.6" />
        <circle cx="48" cy="34" r="0.8" fill="currentColor" opacity="0.5" />
        <circle cx="16" cy="36" r="0.9" fill="currentColor" opacity="0.5" />
        {/* Spire tip */}
        <line x1="32" y1="14" x2="32" y2="8" strokeWidth="1.2" />
        <ellipse cx="32" cy="52" rx="14" ry="2" opacity="0.2" />
      </svg>
    ),
  },
  {
    num: '05',
    name: 'લીલું મરચું',
    english: 'Fried Green Chilli',
    desc: 'અંતમાં મળતી ખરો ગુજરાતી તીખાશનો સ્પર્શ.',
    icon: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 stroke-current fill-none transition-transform duration-200"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Graceful curved green chilli silhouette */}
        <path d="M20 18 C28 22, 42 26, 44 38 C45 46, 38 52, 30 52 C26 52, 22 48, 24 44 C26 38, 38 34, 20 18 Z" />
        {/* Chilli stem */}
        <path d="M20 18 C18 16, 14 14, 12 15 C13 18, 16 19, 18 19" strokeWidth="1.2" />
        <line x1="12" y1="15" x2="8" y2="12" strokeWidth="1.2" />
        {/* Blister frying marks */}
        <path d="M30 32 C34 33, 36 36, 38 40" strokeDasharray="2 2" opacity="0.6" />
        <circle cx="34" cy="46" r="0.9" fill="currentColor" opacity="0.6" />
        <ellipse cx="30" cy="54" rx="16" ry="2" opacity="0.2" />
      </svg>
    ),
  },
];

export default function IngredientsSection() {
  const sectionRef = useRef(null);
  const topTransitionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageContainerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

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
            imageContainerRef.current,
            lineRef.current,
            ...cardsRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scaleX: 1,
          }
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

      // 0. Top curved transition gently settles into view
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

      // 2. Heading moves upward
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 28 },
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

      // 4. Central exploded ingredients image gently rises into view: scale 0.96 -> 1, y: 20 -> 0, opacity: 0 -> 1
      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
          0.25
        );
      }

      // 5. Horizontal connector line grows from left to right
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.0, ease: 'power2.out' },
          0.34
        );
      }

      // 6. Sequential ingredient item reveal (slight stagger)
      if (cardsRef.current.length > 0) {
        tl.fromTo(
          cardsRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.40
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F7E8CF] text-[#2A130A] overflow-hidden flex flex-col justify-center select-none"
      aria-label="ગજાનંદ સ્વાદની અંદરની વાત"
    >
      {/* Top Saffron Flow Transition from BrandStory (#D96814) into Cream Canvas (#F7E8CF) */}
      <div
        ref={topTransitionRef}
        className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10 -translate-y-[1px] will-change-transform"
        aria-hidden="true"
      >
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-28 text-[#D96814] fill-current"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 C1080,110 360,110 0,40 Z" />
        </svg>
      </div>

      {/* Subtle Bandhani micro-dot texture in warm cream */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2A130A 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Ambient warm radiance */}
      <div
        className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-[#E98224]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-0 w-[450px] h-[450px] rounded-full bg-[#C98B5B]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 md:py-44 my-auto">
        
        {/* Intro Block: Eyebrow, Heading, Supporting Paragraph & Central Exploded Ingredients Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 sm:mb-16 lg:mb-20">
          
          {/* Left Column: Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-5 sm:mb-6 will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-[#D96814]" />
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm font-bold tracking-widest text-[#D96814] uppercase">
                સ્વાદની અંદરની વાત
              </p>
            </div>

            {/* Main Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] tracking-tight leading-[1.18] text-[#1A0A04] will-change-transform"
            >
              સરળ સામગ્રી.
              <span className="block text-[#D96814] mt-1 sm:mt-2">
                જોરદાર સ્વાદ.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-base sm:text-lg md:text-xl text-[#2A130A]/85 font-normal leading-relaxed sm:leading-relaxed mt-6 max-w-2xl will-change-transform"
            >
              દરેક સ્તર પોતાનો સ્વાદ લાવે છે — નરમ પાવ, કરકરો મસાલેદાર બટાકા વડો, તાજી લીલી ચટણી, લસણનો મસાલો અને લીલા મરચાની તીખાશ.
            </p>
          </div>

          {/* Right Column: Exploded Vada Pav Composition Supporting Image */}
          <div
            ref={imageContainerRef}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end will-change-transform"
          >
            <div className="relative w-full max-w-[420px] lg:max-w-none aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl sm:rounded-[2rem] overflow-hidden border border-[#2A130A]/15 bg-gradient-to-br from-[#F7E8CF] via-[#F0DDC0] to-[#E5CCA8] shadow-xl shadow-[#2A130A]/10 p-2 group">
              
              {/* Inner framing outline */}
              <div className="absolute inset-2.5 rounded-2xl sm:rounded-[1.5rem] border border-[#2A130A]/10 pointer-events-none z-10" />

              {/* Exploded Vada Pav Composition Image with subtle desktop hover */}
              <img
                src="/assets/gajanand-ingredients.webp"
                alt="ગજાનંદ વડાપાઉંની સામગ્રી - પાવ, બટાકા વડો, લીલી ચટણી, લસણ મસાલો અને લીલું મરચું"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center rounded-2xl sm:rounded-[1.5rem] img-hover-subtle"
              />

              {/* Soft Warm Lighting Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A130A]/40 via-transparent to-transparent pointer-events-none z-10" />

              {/* Floating Layer Detail Tag */}
              <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-[#2A130A]/85 border border-[#D96814]/30 backdrop-blur-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96814]" />
                <span className="font-['Noto_Serif_Gujarati',serif] text-xs font-bold text-[#F7E8CF]">
                  ૫ સ્વાદિષ્ટ સ્તરો
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Horizontal Connector Baseline (Visible on Desktop / Large Tablet) */}
        <div
          ref={lineRef}
          className="hidden lg:block w-full h-[1.5px] bg-gradient-to-r from-[#D96814]/30 via-[#2A130A]/20 to-[#D96814]/30 mb-8 will-change-transform"
          aria-hidden="true"
        />

        {/* 5-Item Ingredient Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-6">
          {INGREDIENTS.map((item, index) => (
            <div
              key={item.num}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col justify-between pt-2 pb-6 lg:pb-2 border-b lg:border-b-0 border-[#2A130A]/15 last:border-b-0 will-change-transform cursor-default"
            >
              {/* Top Row: Index Badge & Gujarati Subtitle */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['Syne',sans-serif] text-xs font-extrabold tracking-widest text-[#2A130A]/50 group-hover:text-[#D96814] transition-colors duration-[170ms]">
                    {item.num}
                  </span>
                  <span className="font-sans text-[10px] tracking-wider font-semibold text-[#C98B5B] uppercase opacity-75">
                    {item.english}
                  </span>
                </div>

                {/* Minimalist SVG Illustration Container */}
                <div className="mb-5 flex items-center justify-start text-[#2A130A]/85 group-hover:text-[#D96814] transition-colors duration-[170ms]">
                  <div className="p-2 rounded-xl bg-[#2A130A]/[0.03] border border-[#2A130A]/10 group-hover:border-[#D96814]/30 transition-colors duration-[170ms]">
                    <div className="group-hover:-translate-y-1 transition-transform duration-[170ms] ease-out">
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Gujarati Ingredient Name */}
                <h3 className="font-['Noto_Serif_Gujarati',serif] font-bold text-xl sm:text-2xl text-[#1A0A04] group-hover:text-[#D96814] transition-colors duration-[170ms] mb-2 leading-snug">
                  {item.name}
                </h3>

                {/* One-Line Description */}
                <p className="font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#2A130A]/75 group-hover:text-[#2A130A] font-normal leading-relaxed transition-colors duration-[170ms]">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Accent Indicator on Hover */}
              <div className="mt-5 w-8 h-[2px] bg-[#2A130A]/15 group-hover:bg-[#D96814] group-hover:w-14 transition-all duration-[170ms] ease-out" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
