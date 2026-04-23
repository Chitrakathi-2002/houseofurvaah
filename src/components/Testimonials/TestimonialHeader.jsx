import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from './reviewData';

gsap.registerPlugin(ScrollTrigger);

const StatBlock = ({ value, label, isFirst = false }) => {
  const numberRef = useRef(null);

  useLayoutEffect(() => {
    const target = parseFloat(value);
    const isDecimal = value.toString().includes('.');

    gsap.to(numberRef.current, {
      innerText: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: numberRef.current,
        start: 'top 85%',
        once: true
      },
      onUpdate: function() {
        let val = parseFloat(this.targets()[0].innerText);
        if (isDecimal) {
          this.targets()[0].innerText = val.toFixed(1) + (label.includes('Rating') ? ' ★' : '');
        } else {
          this.targets()[0].innerText = Math.floor(val) + (label.includes('Reviews') && !label.includes('5-Star') ? '+' : (label.includes('Pct') || label.includes('5-Star') || label.includes('Repeat') ? '%' : ''));
        }
      }
    });
  }, [value, label]);

  return (
    <div className="flex flex-col items-center text-center px-8 relative">
      {!isFirst && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gold/20" />
      )}
      <span 
        ref={numberRef}
        className="font-display text-4xl md:text-5xl font-bold text-gold mb-2"
      >
        0
      </span>
      <span className="font-body text-[10px] md:text-[12px] text-ivory/50 uppercase tracking-[2px]">
        {label}
      </span>
    </div>
  );
};

const TestimonialHeader = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pre-label entrance
      gsap.from('.testi-pre', {
        y: -10,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testi-pre',
          start: 'top 85%'
        }
      });

      // Heading line reveal
      const lines = gsap.utils.toArray('.testi-line');
      lines.forEach((line, i) => {
        gsap.from(line.querySelector('.word-reveal'), {
          y: '115%',
          duration: 1,
          delay: i * 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%'
          }
        });
      });

      // Subtext fade
      gsap.from('.testi-sub', {
        opacity: 0,
        y: 15,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testi-sub',
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-16 px-6 text-center relative z-10">
      <p className="testi-pre font-body text-[11px] tracking-[4px] text-gold uppercase mb-6">
        ✦ REAL CUSTOMERS · REAL JOY ✦
      </p>

      <div className="testi-heading mb-8">
        <h2 className="testi-line overflow-hidden mb-1">
          <span className="word-reveal block font-display text-5xl md:text-7xl text-ivory font-bold">
            Loved by
          </span>
        </h2>
        <h2 className="testi-line overflow-hidden">
          <span className="word-reveal block font-display text-5xl md:text-7xl text-gold font-bold">
            1,289+ Families
          </span>
        </h2>
      </div>

      <p className="testi-sub font-body text-ivory/55 text-sm md:text-base max-w-[520px] mx-auto mb-16 leading-relaxed">
        From first sarees to wedding trousseaux — our customers keep coming back for the timeless elegance of Urvaah.
      </p>

      {/* Stats Counters */}
      <div className="flex flex-wrap justify-center gap-y-10 md:gap-x-4 max-w-5xl mx-auto">
        <StatBlock value={STATS.totalReviews} label="Verified Reviews" isFirst={true} />
        <StatBlock value={STATS.averageRating} label="Average Rating" />
        <StatBlock value={STATS.fiveStarPct} label="5-Star Reviews" />
        <StatBlock value={STATS.repeatCustomerPct} label="Repeat Customers" />
      </div>
    </div>
  );
};

export default TestimonialHeader;
