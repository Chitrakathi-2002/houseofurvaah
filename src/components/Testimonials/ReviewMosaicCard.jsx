import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

const ReviewMosaicCard = ({ review, index }) => {
  return (
    <motion.div
      className="mosaic-card break-inside-avoid mb-6 rounded-2xl border border-gold/20 p-6 relative overflow-hidden group transition-all duration-500"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: (index % 4) * 0.1 + Math.floor(index / 4) * 0.15,
        ease: 'easeOut'
      }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(8px)'
      }}
    >
      {/* Shimmer Sweep Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 1, delay: 1.5 + index * 0.05, ease: 'easeInOut' }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] border border-gold/20"
          style={{ backgroundColor: `${review.avatarColor}22`, color: review.avatarColor }}
        >
          {review.avatarInitials}
        </div>
        <div className="flex-1">
          <h4 className="text-ivory text-[13px] font-bold flex items-center gap-1.5 leading-none">
            {review.name}
            {review.verified && <CheckCircle2 size={10} className="text-[#2D9B6E]" />}
          </h4>
          <div className="flex gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                fill={i < review.rating ? "#C9A84C" : "none"} 
                stroke={i < review.rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="font-display italic text-ivory text-sm leading-relaxed mb-4">
        "{review.shortQuote}"
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <span className="text-gold/50 text-[9px] uppercase tracking-wider font-bold">
          {review.product.split(' ').slice(0, 3).join(' ')}
        </span>
        <span className="text-ivory/20 text-[9px]">
          {review.date}
        </span>
      </div>

      {/* Hover Highlight Overlay */}
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ReviewMosaicCard;
