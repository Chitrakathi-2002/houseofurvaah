import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroText = () => {
  const containerRef = useRef();
  const badgeRef = useRef();
  const headlineRef = useRef();
  const subtextRef = useRef();
  const ctaRef = useRef();
  const trustRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(badgeRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Headline stagger
      const words = headlineRef.current.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.12, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // Subtext fade
      gsap.fromTo(subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power2.out' }
      );

      // CTA buttons slide
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power2.out' }
      );

      // Trust badges fade
      gsap.fromTo(trustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2, ease: 'power1.inOut' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = [
    { text: "Where Tradition", color: "text-ivory", font: "font-display" },
    { text: "Breathes in", color: "text-gold", font: "font-display" },
    { text: "Every Thread", color: "text-ivory", font: "font-accent italic" }
  ];

  return (
    <div ref={containerRef} className="w-full lg:w-[60%] flex flex-col justify-center gap-8 z-10">
      {/* Badge */}
      <div ref={badgeRef} className="flex items-center gap-2">
        <div className="px-3 py-1 border border-gold/40 rounded-full">
          <span className="text-gold text-[10px] tracking-[0.2em] font-body uppercase">
            ✦ NEW COLLECTION 2025 ✦
          </span>
        </div>
      </div>

      {/* Headline */}
      <div ref={headlineRef} className="space-y-2">
        {headline.map((line, idx) => (
          <h1 key={idx} className={`${line.font} ${line.color} text-5xl md:text-7xl leading-tight overflow-hidden`}>
            {line.text.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="word inline-block mr-4">{word}</span>
            ))}
          </h1>
        ))}
      </div>

      {/* Subtext */}
      <p ref={subtextRef} className="font-body text-ivory/75 text-base md:text-lg max-w-[480px] leading-relaxed">
        Handcrafted sarees, kurtas & ethnic wear for your most precious moments. 
        Explore India's finest weaves — Kanjivaram, Banarasi, Kalamkari & more.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-wrap gap-4 mt-4">
        <button className="h-[52px] px-8 bg-gold text-dark font-body font-bold text-sm uppercase tracking-wider rounded-sm transition-transform hover:scale-[1.04] active:scale-[0.98] shimmer-effect">
          Explore Collection →
        </button>
        <button className="h-[52px] px-8 border border-gold text-gold font-body font-bold text-sm uppercase tracking-wider rounded-sm transition-all duration-300 hover:bg-gold hover:text-dark">
          Our Story ↗
        </button>
      </div>

      {/* Trust Badges */}
      <div ref={trustRef} className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8">
        {[
          "🌟 1289+ Reviews",
          "✈ Free Shipping",
          "🎁 Gift Packaging",
          "↩ Easy Returns"
        ].map((badge, idx) => (
          <span key={idx} className="text-gold font-body text-[13px] tracking-wide whitespace-nowrap">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroText;
