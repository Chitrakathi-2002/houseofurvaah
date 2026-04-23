import React from 'react';
import { motion } from 'framer-motion';

const OccasionProductPreview = ({ products, accentColor }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center group">
      {products.map((product, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 + idx * 0.1, duration: 0.6, ease: 'backOut' }}
          className="occasion-mini-card absolute w-[130px] h-[180px] bg-black/50 border border-gold/30 rounded-[14px] overflow-hidden backdrop-blur-[6px] shadow-2xl transition-all duration-400 hover:scale-110 hover:z-20 hover:border-gold"
          style={{
            transform: `
              rotate(${idx === 0 ? -4 : idx === 1 ? 0 : 4}deg) 
              translateY(${idx === 1 ? -20 : 0}px)
            `,
            zIndex: idx === 1 ? 10 : 5
          }}
        >
          {/* Card Image Area */}
          <div 
            className="h-[70%] silk-shimmer"
            style={{
              background: `linear-gradient(145deg, ${product.gradient[0]}, ${product.gradient[1]}, ${product.gradient[2]})`,
              backgroundSize: '400% 400%',
              animation: 'silkShimmer 5s ease infinite'
            }}
          />
          
          {/* Card Info */}
          <div className="h-[30%] p-2 flex flex-col justify-center bg-gradient-to-b from-black/20 to-black/60">
            <h4 className="text-[10px] font-body text-ivory/90 leading-tight line-clamp-1 mb-1">
              {product.name}
            </h4>
            <p className="text-[12px] font-body font-bold" style={{ color: accentColor }}>
              {product.price}
            </p>
          </div>

          {/* Hover Tooltip */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
            <div className="bg-ivory text-dark text-[9px] font-bold px-3 py-1 rounded-full">
              Shop Now →
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OccasionProductPreview;
