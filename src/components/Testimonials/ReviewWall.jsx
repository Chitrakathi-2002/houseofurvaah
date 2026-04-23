import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOSAIC_REVIEWS } from './reviewData';
import ReviewMosaicCard from './ReviewMosaicCard';

const ReviewWall = () => {
  const [displayCount, setDisplayCount] = useState(12);
  const visibleReviews = MOSAIC_REVIEWS.slice(0, displayCount);

  return (
    <div className="review-mosaic-container relative">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 px-4 md:px-0">
        <AnimatePresence>
          {visibleReviews.map((review, idx) => (
            <ReviewMosaicCard key={review.id} review={review} index={idx} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {displayCount < MOSAIC_REVIEWS.length && (
        <div className="flex justify-center mt-12 pb-20">
          <button 
            onClick={() => setDisplayCount(prev => prev + 4)}
            className="group relative px-8 py-4 border border-gold/40 rounded-full overflow-hidden transition-all hover:border-gold"
          >
            <span className="relative z-10 font-body text-[13px] text-gold tracking-[2px] uppercase">
              Load More Reviews (1,277 more)
            </span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="absolute inset-0 z-20 flex items-center justify-center font-body text-[13px] text-dark tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Reveal the Joy
            </span>
          </button>
        </div>
      )}

      {/* Particle Burst Pattern Background */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full fill-gold">
          {[...Array(50)].map((_, i) => (
            <circle 
              key={i} 
              cx={Math.random() * 800} 
              cy={Math.random() * 400} 
              r={Math.random() * 2} 
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ReviewWall;
