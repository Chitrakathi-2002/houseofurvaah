import React, { Suspense } from 'react';
import TestimonialHeader from './TestimonialHeader';
import ReviewTicker from './ReviewTicker';
import DepthCarousel from './DepthCarousel';
import StarOrbScene from './StarOrbScene';
import ReviewWall from './ReviewWall';

const TestimonialsSection = () => {
  return (
    <section 
      id="testimonials" 
      className="relative bg-[#0A0A0F] overflow-hidden"
      style={{
        paddingBottom: '120px',
      }}
    >
      {/* Universal Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      <TestimonialHeader />
      
      <ReviewTicker />

      <div className="py-20 relative z-10">
        <DepthCarousel />
      </div>

      <div className="py-10 mb-16 relative z-10">
        <Suspense fallback={<div className="h-[280px] w-full bg-black/20 animate-pulse" />}>
          <StarOrbScene />
        </Suspense>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative z-10">
        <ReviewWall />
      </div>

      {/* Aesthetic Side Decorative Text */}
      <div className="absolute left-10 top-1/2 -rotate-90 origin-left pointer-events-none opacity-10 hidden xl:block">
        <span className="font-body text-[10px] tracking-[10px] text-gold uppercase whitespace-nowrap">
          HOUSE OF URVAAH · TESTIMONIALS · LUXURY SERVICE
        </span>
      </div>
      <div className="absolute right-10 top-1/3 rotate-90 origin-right pointer-events-none opacity-10 hidden xl:block">
        <span className="font-body text-[10px] tracking-[10px] text-gold uppercase whitespace-nowrap">
          ESTABLISHED 2025 · HANDCRAFTED JOY
        </span>
      </div>
    </section>
  );
};

export default TestimonialsSection;
