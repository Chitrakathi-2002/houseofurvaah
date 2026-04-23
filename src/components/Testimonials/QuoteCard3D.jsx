import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

const QuoteCard3D = ({ review, isActive, offset }) => {
  const cardRef = useRef(null);
  
  // Mouse tilt logic for active card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // 3D positioning based on offset
  const absOff = Math.abs(offset);
  const cardTransform = {
    x: offset * 340,
    z: -absOff * 250,
    rotateY: offset * 25,
    scale: 1 - absOff * 0.15,
    opacity: 1 - absOff * 0.35,
    filter: `blur(${absOff * 4}px)`,
    zIndex: 10 - absOff,
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[480px] cursor-pointer"
      initial={false}
      animate={{
        ...cardTransform,
        rotateX: isActive ? rotateX.get() : 0,
        rotateY: isActive ? rotateY.get() : cardTransform.rotateY,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 30,
        mass: 0.8
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-gold/20 shadow-2xl transition-shadow duration-500"
           style={{
             background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
             backdropFilter: 'blur(12px)',
             boxShadow: isActive ? '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.2)' : 'none'
           }}>
        
        {/* Quote Decoration */}
        <span className="absolute top-4 left-6 font-display text-[120px] text-gold/15 pointer-events-none select-none">
          “
        </span>

        <div className="relative z-10 h-full p-8 flex flex-col pt-20">
          {/* Star Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star 
                  size={18} 
                  fill={i < review.rating ? "#C9A84C" : "none"} 
                  stroke={i < review.rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}
                  className={i < review.rating ? "drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]" : ""}
                />
              </motion.div>
            ))}
          </div>

          {/* Review Text */}
          <div className="flex-1 overflow-hidden relative">
            <p className="font-display italic text-ivory text-xl leading-[1.8] text-balance">
              {review.fullReview}
            </p>
            {/* Bottom fade for overflow */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0A0A0F]/50 to-transparent pointer-events-none" />
          </div>

          <div className="w-10 h-px bg-gold/30 my-6 mx-auto" />

          {/* Product Badge */}
          <div className="self-center px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-8 max-w-full">
            <span className="text-gold text-[9px] uppercase tracking-[2px] font-bold truncate block">
              {review.product}
            </span>
          </div>

          {/* Reviewer Info */}
          <div className="flex items-center gap-4 border-t border-white/5 pt-6">
            <div 
              className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: `${review.avatarColor}33`, color: review.avatarColor }}
            >
              {review.avatarInitials}
            </div>
            <div className="flex-1">
              <h4 className="text-ivory text-[15px] font-bold leading-tight flex items-center gap-2">
                {review.name}
                {review.verified && (
                  <CheckCircle2 size={12} className="text-[#2D9B6E]" />
                )}
              </h4>
              <p className="text-ivory/40 text-[12px] mt-0.5">{review.location}</p>
            </div>
            <span className="text-ivory/20 text-[10px] uppercase tracking-tighter">
              {review.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteCard3D;
