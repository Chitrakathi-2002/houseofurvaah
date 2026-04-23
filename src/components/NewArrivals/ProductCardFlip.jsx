import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star, ArrowRight, Expand } from 'lucide-react';

const ProductCardFlip = ({ product, isFocused }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  return (
    <div 
      className="relative w-full h-[600px] cursor-none select-none"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 40, 
          damping: 12, 
          mass: 1 
        }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2px] overflow-hidden group shadow-2xl"
          style={{ 
            background: `linear-gradient(135deg, ${product.gradientColors[0]}44, ${product.gradientColors[1]}22)`,
            border: '1px solid rgba(201, 168, 76, 0.2)'
          }}
        >
          {/* Glassmorphic Border */}
          <div className="absolute inset-0 border-[8px] border-black/10 z-10 pointer-events-none"></div>
          
          {/* Product Image */}
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            animate={{ scale: isFocused ? 1.05 : 1 }}
          />

          {/* Luxury Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20"></div>

          {/* Front Content */}
          <div className="absolute inset-x-0 bottom-0 p-8 z-30 transform transition-transform duration-500">
            <motion.div
              initial={false}
              animate={{ y: isFlipped ? 50 : 0, opacity: isFlipped ? 0 : 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {product.badge && (
                  <span className="bg-gold text-black text-[9px] font-bold px-3 py-1 tracking-[2px] uppercase rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}
                <span className="text-ivory/60 text-[10px] tracking-[3px] uppercase font-medium">
                  {product.category}
                </span>
              </div>
              
              <h3 className="text-ivory text-2xl font-display font-bold leading-tight mb-4 max-w-[90%]">
                {product.name}
              </h3>
              
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-ivory/40 text-[10px] line-through tracking-widest">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-gold text-2xl font-display font-black">
                    ₹{product.salePrice.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-gold/80 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <Star size={10} fill="#C9A84C" />
                  <span className="text-[10px] font-bold tracking-tighter">{product.rating}</span>
                  <span className="text-[8px] opacity-40">({product.reviewCount})</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none"></div>
        </div>

        {/* BACK SIDE (Details) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2px] overflow-hidden p-10 flex flex-col justify-between"
          style={{ 
            transform: 'rotateY(180deg)',
            background: '#0F0F14',
            border: '1px solid rgba(201, 168, 76, 0.4)'
          }}
        >
          {/* Inner Border Decor */}
          <div className="absolute inset-4 border border-gold/10 pointer-events-none"></div>

          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-gold text-[9px] tracking-[5px] uppercase font-bold mb-2">Heritage Certificate</h4>
                <div className="w-16 h-[1px] bg-gold/30"></div>
              </div>
              <div className="text-gold/20 text-[8px] tracking-widest uppercase rotate-90 origin-right translate-y-4">
                Authenticity Guaranteed
              </div>
            </div>

            <div className="space-y-6 mt-4">
              {[
                { label: 'Primary Fabric', val: product.fabric },
                { label: 'Artisanal Weave', val: product.weave },
                { label: 'Recommended Occasion', val: product.occasion },
                { label: 'Origin', val: 'Varanasi, Uttar Pradesh' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col group/item">
                  <span className="text-ivory/20 text-[8px] uppercase tracking-[3px] mb-1 group-hover/item:text-gold/40 transition-colors">{item.label}</span>
                  <span className="text-ivory font-display text-sm tracking-widest font-light">{item.val}</span>
                  <div className="w-full h-[1px] bg-white/5 mt-2"></div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="text-[8px] border border-white/5 px-4 py-1.5 text-ivory/40 rounded-none hover:border-gold/30 hover:text-gold transition-all duration-300 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 z-10">
            <button className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-5 rounded-none transition-all duration-500 flex items-center justify-center gap-4 group/btn overflow-hidden relative">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <ShoppingBag size={16} />
              <span className="text-[10px] tracking-[3px] uppercase">Enquire Now</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button className="w-full bg-white/5 hover:bg-white/10 text-ivory/60 hover:text-ivory font-medium py-3 text-[9px] tracking-[4px] uppercase transition-all duration-300 border border-white/5">
              Product Story
            </button>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}} />
    </div>
  );
};

export default ProductCardFlip;
