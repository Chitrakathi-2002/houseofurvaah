import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MegaMenu = ({ isOpen }) => {
  const categories = [
    {
      title: "Fabric",
      items: ["Organza", "Satin Silk", "Mysore Silk", "Chiffon", "Georgette"]
    },
    {
      title: "Weave",
      items: ["Banarasi", "Kanjivaram", "Chanderi", "Paithani", "Kalamkari"]
    },
    {
      title: "Occasion",
      items: ["Wedding", "Festive", "Party Wear", "Daily Wear", "Office Wear"]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-[#0A0A0F]/97 border-t border-white/10 border-b border-gold/20 shadow-2xl overflow-hidden backdrop-blur-md"
        >
          <div className="container mx-auto px-6 py-12 grid grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx}>
                <h3 className="font-display text-gold text-lg mb-6 tracking-wide">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-ivory/70 hover:text-gold transition-colors font-body text-sm tracking-wide block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="flex flex-col items-center justify-center border-l border-white/5 pl-8">
              <div className="relative group">
                <div 
                  className="w-48 h-64 rounded-xl overflow-hidden relative shadow-2xl"
                  style={{
                    background: 'linear-gradient(160deg, #6B1F2A 0%, #C9A84C 50%, #1D6B4F 100%)',
                    animation: 'fabricShimmer 4s ease infinite',
                    backgroundSize: '200% 200%'
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    <div 
                      className="w-32 h-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
                      style={{ 
                        animation: 'rotateYLoop 8s linear infinite',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Decorative 3D card content */}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gold font-display text-center italic">Luxury Silks</p>
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes rotateYLoop {
              from { transform: rotateY(0deg); }
              to { transform: rotateY(360deg); }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
