import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const topTransitionRef = useRef(null);
  const wordmarkRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            topTransitionRef.current,
            wordmarkRef.current,
            col1Ref.current,
            col2Ref.current,
            col3Ref.current,
            dividerRef.current,
          ],
          { opacity: 1, y: 0, scaleX: 1 }
        );
        return;
      }

      const isMobile = window.innerWidth < 768;
      const yDist = isMobile ? 12 : 16;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
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

      // Wordmark
      if (wordmarkRef.current) {
        tl.fromTo(
          wordmarkRef.current,
          { opacity: 0, y: yDist },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
          0.08
        );
      }

      // Columns stagger
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current].filter(Boolean);
      if (cols.length > 0) {
        tl.fromTo(
          cols,
          { opacity: 0, y: yDist },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          0.12
        );
      }

      // Divider line grows from left to right
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.85, ease: 'power2.out' },
          0.2
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

  return (
    <footer
      id="site-footer"
      ref={footerRef}
      className="relative w-full bg-[#120B07] text-[#F7E8CF] overflow-hidden select-none"
      aria-label="ગજાનંદ ફૂટર"
    >
      {/* Top Transition from Warm Sandstone (#E8C39E) into Deep Dark Footer (#120B07) */}
      <div
        ref={topTransitionRef}
        className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10 -translate-y-[1px] will-change-transform"
        aria-hidden="true"
      >
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-28 text-[#E8C39E] fill-current"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 C1080,110 360,110 0,40 Z" />
        </svg>
      </div>

      {/* Gujarat Detail: Faint Bandhani micro-dot accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F7E8CF 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Ambient subtle warm glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#D96814]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Footer Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-12">
        
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          
          {/* Column 1: Brand Identity & Statement (lg:col-span-6) */}
          <div ref={col1Ref} className="lg:col-span-6 flex flex-col justify-start will-change-transform">
            <div ref={wordmarkRef} className="flex items-center gap-3 mb-3 will-change-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D96814] shadow-[0_0_10px_#D96814]" />
              <h3 className="font-['Noto_Serif_Gujarati',serif] text-3xl sm:text-4xl font-extrabold text-[#F7E8CF] tracking-tight leading-none">
                ગજાનંદ
              </h3>
            </div>
            
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#C98B5B] uppercase mb-4">
              GAJANAND • GUJARAT
            </p>

            <p className="font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#F7E8CF]/65 font-normal leading-relaxed max-w-sm">
              ગુજરાતનો સ્વાદ. દરેક બાઇટમાં.
            </p>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div ref={col2Ref} className="lg:col-span-3 flex flex-col justify-start will-change-transform">
            <h4 className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-bold tracking-widest text-[#C98B5B] uppercase mb-5">
              ઝડપી લિંક્સ
            </h4>
            
            <nav className="flex flex-col gap-3" aria-label="Footer Quick Links">
              <a
                href="#brand-story"
                onClick={(e) => scrollToSection(e, 'brand-story')}
                className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#F7E8CF]/75 hover:text-[#D96814] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D96814] rounded"
              >
                અમારી કહાની
              </a>
              <a
                href="#ingredients"
                onClick={(e) => scrollToSection(e, 'ingredients')}
                className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#F7E8CF]/75 hover:text-[#D96814] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D96814] rounded"
              >
                સ્વાદ
              </a>
              <a
                href="#locations"
                onClick={(e) => scrollToSection(e, 'locations')}
                className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#F7E8CF]/75 hover:text-[#D96814] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D96814] rounded"
              >
                સ્ટોર શોધો
              </a>
              <a
                href="#order-cta"
                onClick={(e) => scrollToSection(e, 'order-cta')}
                className="link-underline-grow font-['Noto_Sans_Gujarati',sans-serif] text-sm sm:text-base text-[#F7E8CF]/75 hover:text-[#D96814] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D96814] rounded"
              >
                ઓર્ડર કરો
              </a>
            </nav>
          </div>

          {/* Column 3: Locations Area (lg:col-span-3) */}
          <div ref={col3Ref} className="lg:col-span-3 flex flex-col justify-start will-change-transform">
            <h4 className="font-['Noto_Sans_Gujarati',sans-serif] text-xs font-bold tracking-widest text-[#C98B5B] uppercase mb-5">
              મુખ્ય કેન્દ્રો
            </h4>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96814] transition-transform duration-[160ms] group-hover:scale-125" />
                <span className="font-['Noto_Serif_Gujarati',serif] text-base font-bold text-[#F7E8CF] transition-colors duration-[160ms] group-hover:text-[#F2A321]">
                  આણંદ
                </span>
              </div>
              
              <div className="flex items-center gap-2 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96814] transition-transform duration-[160ms] group-hover:scale-125" />
                <span className="font-['Noto_Serif_Gujarati',serif] text-base font-bold text-[#F7E8CF] transition-colors duration-[160ms] group-hover:text-[#F2A321]">
                  પેટલાદ
                </span>
              </div>

              <span className="text-xs font-['Noto_Sans_Gujarati',sans-serif] text-[#C98B5B]/80 mt-1">
                ગુજરાત
              </span>
            </div>
          </div>

        </div>

        {/* Animated Divider Line */}
        <div ref={dividerRef} className="w-full h-[1px] bg-[#F7E8CF]/10 will-change-transform" />

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#F7E8CF]/60 font-['Noto_Sans_Gujarati',sans-serif]">
          <div>
            <p>© 2026 ગજાનંદ. સર્વાધિકાર સુરક્ષિત.</p>
          </div>

          <div className="flex items-center gap-2">
            <span>ગુજરાતમાં પ્રેમથી બનાવેલું</span>
            <span className="text-[#D96814] text-xs" aria-hidden="true">♥</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
