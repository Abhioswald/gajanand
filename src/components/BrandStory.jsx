import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef(null);
  const indexRef = useRef(null);
  const headingRef = useRef(null);
  const secondaryRef = useRef(null);
  const quoteRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const metaSideRef = useRef(null);
  const visualWrapRef = useRef(null);
  const imageRef = useRef(null);
  const handwrittenRef = useRef(null);
  const bottomStripRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            indexRef.current,
            headingRef.current,
            secondaryRef.current,
            quoteRef.current,
            paragraphRef.current,
            ctaRef.current,
            metaSideRef.current,
            visualWrapRef.current,
            imageRef.current,
            handwrittenRef.current,
            bottomStripRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }
        );
        return;
      }

      // Master ScrollTrigger timeline for Section 02 entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Index & "02 / OUR STORY" tag fade & lift
      if (indexRef.current) {
        tl.fromTo(
          indexRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0
        );
      }

      // 2. Large Gujarati Heading "ગજાનંદ." reveals upward
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.08
        );
      }

      // 3. Secondary Gujarati line follows
      if (secondaryRef.current) {
        tl.fromTo(
          secondaryRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.16
        );
      }

      // 4. Supporting quote & story paragraph
      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.24
        );
      }

      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.32
        );
      }

      // 5. CTA Button fades in
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0.40
        );
      }

      // 6. Vertical decorative metadata
      if (metaSideRef.current) {
        tl.fromTo(
          metaSideRef.current,
          { opacity: 0, x: -10 },
          { opacity: 0.75, x: 0, duration: 0.85, ease: 'power2.out' },
          0.20
        );
      }

      // 7. Right-side visual reveals with subtle opposing movement (x: 20 -> 0) & scale
      if (visualWrapRef.current) {
        tl.fromTo(
          visualWrapRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1.05, ease: 'power3.out' },
          0.12
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.04 },
          { scale: 1, duration: 1.2, ease: 'power2.out' },
          0.12
        );
      }

      // 8. Handwritten cursive legacy phrase
      if (handwrittenRef.current) {
        tl.fromTo(
          handwrittenRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.45
        );
      }

      // 9. Bottom heritage strip rises slightly into place
      if (bottomStripRef.current) {
        tl.fromTo(
          bottomStripRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0.35
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollToIngredients = () => {
    const target = document.getElementById('ingredients');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brand-story"
      ref={sectionRef}
      className="relative w-full min-h-screen lg:min-h-[110vh] bg-[#120B07] text-[#1F110B] overflow-hidden flex flex-col justify-between"
      aria-label="Brand Story: ગજાનંદ વારસાગાથા અને પેટલાદ ધરોહર"
    >
      {/* Main Two-Zone Spread (Parchment Left + Cinematic Petlad Right) */}
      <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-full">
        
        {/* ========================================================= */}
        {/* LEFT ZONE: Warm Parchment Editorial Heritage Layout       */}
        {/* ========================================================= */}
        <div className="relative lg:col-span-6 xl:col-span-6 bg-[#F5EDE0] text-[#1F110B] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Authentic Parchment Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.045] pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(#8F3418 1px, transparent 1px), radial-gradient(#2A130A 1px, #F5EDE0 1px)`,
              backgroundSize: '20px 20px, 40px 40px',
              backgroundPosition: '0 0, 20px 20px',
            }}
            aria-hidden="true"
          />

          {/* Warm Sandstone Ambient Glow on Parchment */}
          <div
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#D96814]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-[#C98B5B]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Subtle Vertical Decorative Metadata Gutter (Desktop) */}
          <div
            ref={metaSideRef}
            className="hidden xl:flex absolute left-4 bottom-28 origin-bottom-left -rotate-90 items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#8F3418]/60 font-semibold pointer-events-none select-none"
            aria-hidden="true"
          >
            <span>PETLAD</span>
            <span className="w-1 h-1 rounded-full bg-[#8F3418]/50" />
            <span>GUJARAT</span>
            <span className="w-1 h-1 rounded-full bg-[#8F3418]/50" />
            <span>AUTHENTIC HERITAGE</span>
          </div>

          {/* Core Parchment Content Container */}
          <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full flex flex-col justify-center my-auto">
            
            {/* 02 / OUR STORY Index & Editorial Tag */}
            <div
              ref={indexRef}
              className="flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#8F3418]/10 border border-[#8F3418]/20">
                <span className="font-['Syne',sans-serif] text-xs font-black tracking-widest text-[#8F3418]">
                  02
                </span>
                <span className="w-1 h-1 rounded-full bg-[#8F3418]" />
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#8F3418] uppercase">
                  OUR STORY
                </span>
              </div>
              <div className="h-[1px] flex-1 max-w-[80px] bg-[#8F3418]/25" />
            </div>

            {/* Oversized Brand Heading */}
            <h2
              ref={headingRef}
              className="font-['Noto_Serif_Gujarati',serif] font-black text-5xl sm:text-6xl md:text-7xl xl:text-[4.75rem] tracking-tight leading-[1.05] text-[#1F110B] will-change-transform"
            >
              ગજાનંદ.
            </h2>

            {/* Secondary Gujarati Line */}
            <p
              ref={secondaryRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] font-bold text-2xl sm:text-3xl md:text-[2.15rem] text-[#8F3418] mt-3 sm:mt-4 leading-snug tracking-tight will-change-transform"
            >
              સ્વાદ જે યાદ રહી જાય.
            </p>

            {/* Fine Editorial Rule Line */}
            <div className="w-16 h-[1.5px] bg-[#8F3418]/35 my-6 sm:my-7" />

            {/* Supporting Story Quote */}
            <blockquote
              ref={quoteRef}
              className="font-['Noto_Serif_Gujarati',serif] font-bold text-lg sm:text-xl md:text-[1.3rem] text-[#2A130A] leading-relaxed tracking-wide will-change-transform"
            >
              એક સાદી વાનગી નહીં, પરંતુ ગુજરાતની સ્મૃતિ, સંસ્કૃતિ અને સ્વાદની વારસાગાથા.
            </blockquote>

            {/* Extended Paragraph on Petlad / Gujarat Roots */}
            <p
              ref={paragraphRef}
              className="font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base md:text-[1.05rem] text-[#2A130A]/85 font-normal leading-relaxed mt-4 sm:mt-5 max-w-lg will-change-transform"
            >
              પેટલાદની ઐતિહાસિક ધરતી પરથી શરૂ થયેલી આ સફર આજે દરેક ગુજરાતીના દિલમાં વસી છે. અસલી ગુજરાતી રેસિપી, ચટપટી લસણની ચટણી, સુગંધિત દેશી મસાલા અને ગરમાગરમ પાઉંનો એ અનોખો મેળાવડો — જ્યાં સ્વાદ માત્ર ભૂખ સંતોષતો નથી, પરંતુ ગૌરવશાળી પરંપરાને જીવંત રાખે છે.
            </p>

            {/* Interactive Editorial CTA */}
            <div ref={ctaRef} className="mt-8 sm:mt-10 flex items-center gap-4 will-change-transform">
              <button
                onClick={handleScrollToIngredients}
                className="group relative inline-flex items-center gap-3.5 px-7 py-3.5 rounded-full bg-[#2A130A] text-[#F5EDE0] hover:bg-[#8F3418] font-medium text-sm sm:text-base tracking-wide transition-all duration-[180ms] ease-out hover:shadow-xl hover:shadow-[#2A130A]/20 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8F3418] cursor-pointer"
                aria-label="અમારી સફર જાણો"
              >
                <span className="font-['Noto_Sans_Gujarati',sans-serif] font-semibold">અમારી સફર જાણો</span>
                <svg
                  className="w-4 h-4 transition-transform duration-[180ms] ease-out group-hover:translate-x-1.5 text-[#F2A321]"
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

          {/* Editorial Bottom Metadata on Parchment */}
          <div className="relative z-10 pt-8 mt-8 border-t border-[#8F3418]/15 flex items-center justify-between text-[11px] sm:text-xs text-[#8F3418]/75 font-medium">
            <span className="font-['Noto_Sans_Gujarati',sans-serif]">
              મૂળ સ્થાન: પેટલાદ, ગુજરાત
            </span>
            <span className="font-['Syne',sans-serif] tracking-wider uppercase font-semibold">
              EST. HERITAGE
            </span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* TORN PAPER DIVIDER (Organic SVG boundary)                 */}
        {/* ========================================================= */}
        
        {/* Vertical Torn Edge for Desktop (Lg+) */}
        <div
          className="hidden lg:block absolute top-0 bottom-0 left-[50%] -translate-x-[1px] w-8 h-full z-20 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="h-full w-full fill-[#F5EDE0]"
            viewBox="0 0 30 1000"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L18,0 C12,50 25,100 15,150 C28,200 10,250 22,300 C8,350 26,400 14,450 C28,500 12,550 24,600 C8,650 26,700 15,750 C27,800 11,850 23,900 C10,950 25,980 18,1000 L0,1000 Z" />
          </svg>
        </div>

        {/* Horizontal Torn Edge for Mobile/Tablet Stack */}
        <div
          className="block lg:hidden relative w-full h-8 -mt-4 -mb-4 z-20 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full fill-[#F5EDE0]"
            viewBox="0 0 1000 30"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L1000,0 L1000,12 C950,22 900,8 850,24 C800,10 750,26 700,12 C650,25 600,9 550,23 C500,11 450,25 400,10 C350,24 300,12 250,26 C200,9 150,23 100,11 C50,25 20,15 0,18 Z" />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* RIGHT ZONE: Petlad Street & Heritage Vada Pav Visual     */}
        {/* ========================================================= */}
        <div
          ref={visualWrapRef}
          className="relative lg:col-span-6 xl:col-span-6 min-h-[460px] sm:min-h-[540px] lg:min-h-full bg-[#1A0E08] overflow-hidden flex flex-col justify-between will-change-transform"
        >
          {/* Main Embedded Visual (Petlad Heritage & Foreground Vada Pav) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              ref={imageRef}
              src="/assets/gajanand-petlad-story.webp"
              alt="પેટલાદમાં ગજાનંદ વડાપાઉં સ્ટોલ અને ગરમાગરમ સ્વાદની વારસાગાથા"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center will-change-transform"
            />

            {/* Cinematic Golden Hour Lighting & Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B07] via-[#120B07]/25 to-[#120B07]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#120B07]/60 pointer-events-none" />
            <div className="absolute inset-0 bg-[#D96814]/15 mix-blend-color pointer-events-none" />
          </div>

          {/* Top-Right Heritage Visual Cue Badge */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex justify-end">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#120B07]/80 border border-[#F2A321]/30 backdrop-blur-md shadow-lg shadow-black/50">
              <span className="w-2 h-2 rounded-full bg-[#F2A321] animate-pulse" />
              <span className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm font-bold text-[#F7E8CF] tracking-wide">
                પેટલાદ • મૂળ સ્વાદ
              </span>
              <span className="text-[10px] tracking-widest text-[#C98B5B] uppercase font-semibold">
                ORIGIN
              </span>
            </div>
          </div>

          {/* Bottom Handwritten Phrase Overlay ("More Than A Snack. A Legacy.") */}
          <div
            ref={handwrittenRef}
            className="relative z-10 p-6 sm:p-8 lg:p-12 mt-auto will-change-transform"
          >
            <div className="max-w-md">
              <p className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl text-[#F7E8CF] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight">
                “More Than A Snack. <br />
                <span className="text-[#F2A321]">A Legacy.</span>”
              </p>
              <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm text-[#F7E8CF]/80 font-medium tracking-wider mt-2.5 drop-shadow">
                ગરમાગરમ સ્વાદ, ગુજરાતનો વિશ્વાસ.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* BOTTOM HERITAGE STRIP (Dark brown/black with line art)   */}
      {/* ========================================================= */}
      <div
        ref={bottomStripRef}
        className="relative w-full bg-[#120B07] text-[#C98B5B] overflow-hidden z-20 border-t border-[#D96814]/20 will-change-transform"
      >
        {/* Subtle Heritage Line-Art SVG of Petlad / Gujarat Street Architecture */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="w-full min-w-[1200px] h-20 text-[#D96814] stroke-current fill-none"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            strokeWidth="1.2"
          >
            {/* Heritage Spire & Chhatri Silhouette 1 */}
            <path d="M40 80 L40 45 L55 30 L70 45 L70 80" />
            <path d="M55 30 L55 15" />
            <circle cx="55" cy="12" r="2.5" />

            {/* Jharokha Arch 1 */}
            <path d="M100 80 L100 40 C100 30, 130 30, 130 40 L130 80" />
            <path d="M105 80 L105 45 C105 38, 125 38, 125 45 L125 80" />

            {/* Street Cart Silhouette */}
            <path d="M180 80 L180 50 L240 50 L240 80" />
            <line x1="170" y1="50" x2="250" y2="50" />
            <circle cx="195" cy="72" r="8" />
            <circle cx="225" cy="72" r="8" />
            <line x1="175" y1="42" x2="245" y2="42" strokeDasharray="3 3" />

            {/* Central Gujarati Heritage Pavilion (Chhatri Dome) */}
            <path d="M400 80 L400 48 C400 25, 460 25, 460 48 L460 80" />
            <path d="M380 48 L480 48" />
            <path d="M430 25 L430 8" />
            <circle cx="430" cy="5" r="3" />
            <path d="M415 80 L415 55 C415 45, 445 45, 445 55 L445 80" />

            {/* Repeated Pol Heritage Gateways */}
            <path d="M700 80 L700 35 C700 20, 760 20, 760 35 L760 80" />
            <path d="M710 80 L710 42 C710 30, 750 30, 750 42 L750 80" />
            <path d="M685 35 L775 35" />

            {/* Street Vendor Stall 2 */}
            <path d="M920 80 L920 52 L980 52 L980 80" />
            <path d="M910 52 L990 40 L910 40 Z" />
            <circle cx="935" cy="74" r="6" />
            <circle cx="965" cy="74" r="6" />

            {/* Heritage Spire & Chhatri Silhouette 2 */}
            <path d="M1200 80 L1200 45 L1215 30 L1230 45 L1230 80" />
            <path d="M1215 30 L1215 15" />
            <circle cx="1215" cy="12" r="2.5" />

            <path d="M1320 80 L1320 40 C1320 30, 1360 30, 1360 40 L1360 80" />
          </svg>
        </div>

        {/* Heritage Strip Content & Descriptor */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D96814]" />
            <p className="font-['Noto_Sans_Gujarati',sans-serif] text-xs sm:text-sm font-medium tracking-wide text-[#F7E8CF]/85">
              ગુજરાતી ધરોહર • પેટલાદથી આણંદ • અસલી વડાપાઉંની પરંપરા
            </p>
          </div>

          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] tracking-[0.2em] text-[#C98B5B]/80 uppercase font-semibold">
            <span>AUTHENTIC TASTE</span>
            <span>•</span>
            <span>GUJARAT HERITAGE</span>
          </div>
        </div>
      </div>

    </section>
  );
}
