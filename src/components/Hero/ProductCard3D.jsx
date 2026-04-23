import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';

const ProductCard3D = () => {
  const cardRef = useRef(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate rotation (-12 to 12 degrees)
    const rX = ((mouseY / height) - 0.5) * -24;
    const rY = ((mouseX / width) - 0.5) * 24;

    x.set(rY);
    y.set(rX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full lg:w-[40%] flex items-center justify-center z-10 perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[340px] h-[460px] bg-white/5 border border-gold/35 rounded-[24px] backdrop-blur-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] group animate-float cursor-pointer overflow-hidden"
      >
        {/* Shimmer Bar */}
        <div className="absolute top-4 left-0 w-full flex justify-center z-20">
          <div className="bg-maroon px-4 py-1 rounded-full border border-gold/20 flex items-center gap-2 overflow-hidden relative">
            <span className="text-gold text-[10px] font-bold tracking-widest uppercase">New Arrival</span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </div>
        </div>

        {/* Product Image Placeholder with Fabric Flow */}
        <div 
          className="absolute inset-[15px] bottom-[100px] rounded-[18px] fabric-flow overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #6B1F2A 0%, #C9A84C 50%, #1D6B4F 100%)',
          }}
        >
          {/* Heart Button */}
          <motion.button 
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart size={18} />
          </motion.button>

          {/* Quick View */}
          <div className="absolute bottom-4 left-0 w-full px-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
            <button className="bg-ivory text-dark font-body font-bold text-xs px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gold transition-colors shadow-lg">
              <Eye size={14} />
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 w-full p-6 space-y-2 translate-z-20">
          <h3 className="font-display text-ivory text-lg">Venetian Maroon Kanjivaram</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gold font-bold">Rs. 3,599</span>
              <span className="text-gray-400 text-sm line-through">Rs. 7,198</span>
            </div>
            <div className="text-ivory/60 text-[13px] font-body">
              ⭐ 4.9 (86)
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard3D;
