import React from 'react';
import { motion } from 'framer-motion';

const FilterTabs = ({ activeTab, onChange }) => {
  const tabs = ['All', 'Sarees', "Men's Kurta", 'Couple Sets'];

  return (
    <div className="w-full flex justify-center py-12 relative z-20">
      <div className="flex items-center gap-10 md:gap-20 border-b border-white/5 px-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className="relative py-6 group transition-colors duration-500"
            >
              <span className={`
                text-[11px] font-body font-bold tracking-[5px] uppercase transition-all duration-500
                ${isActive ? 'text-gold' : 'text-ivory/30 group-hover:text-ivory/60'}
              `}>
                {tab}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gold"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Decorative Accent for active */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] text-gold"
                >
                  ✦
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterTabs;
