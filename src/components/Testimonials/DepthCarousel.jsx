import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FEATURED_REVIEWS } from './reviewData';
import QuoteCard3D from './QuoteCard3D';

const DepthCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  
  const total = FEATURED_REVIEWS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Determine which cards to render based on active index
  // We want to show cards at offset -2, -1, 0, 1, 2
  const visibleIndices = [-2, -1, 0, 1, 2].map(offset => {
    return (activeIndex + offset + total) % total;
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[640px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />

      {/* Cards Stage */}
      <div className="relative w-full h-full perspective-2000" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence initial={false}>
          {FEATURED_REVIEWS.map((review, idx) => {
            // Find relative offset
            let offset = idx - activeIndex;
            // Handle wrap-around
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            
            // Only render if within visible range
            if (Math.abs(offset) > 2) return null;

            return (
              <QuoteCard3D 
                key={review.id} 
                review={review} 
                isActive={idx === activeIndex} 
                offset={offset}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full px-12 md:px-24 flex justify-between pointer-events-none z-30">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 rounded-full border border-gold/30 bg-black/40 backdrop-blur-md flex items-center justify-center pointer-events-auto hover:bg-gold/10 hover:border-gold transition-all active:scale-95"
          aria-label="Previous review"
        >
          <ChevronLeft className="text-gold" size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-full border border-gold/30 bg-black/40 backdrop-blur-md flex items-center justify-center pointer-events-auto hover:bg-gold/10 hover:border-gold transition-all active:scale-95"
          aria-label="Next review"
        >
          <ChevronRight className="text-gold" size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {FEATURED_REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="group py-4 px-1"
          >
            <motion.div
              className="h-1.5 rounded-full bg-gold/20 relative overflow-hidden"
              animate={{ 
                width: i === activeIndex ? 32 : 8,
                backgroundColor: i === activeIndex ? '#C9A84C' : 'rgba(201,168,76,0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {i === activeIndex && (
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.div>
          </button>
        ))}
      </div>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite">
        Now showing review by {FEATURED_REVIEWS[activeIndex].name}
      </div>
    </div>
  );
};

export default DepthCarousel;
