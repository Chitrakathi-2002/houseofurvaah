import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useSpotlight } from './useSpotlight';
import OccasionScene3D from './OccasionScene3D';
import ParallaxPetals from './ParallaxPetals';
import CursorSpotlight from './CursorSpotlight';
import OccasionProductPreview from './OccasionProductPreview';

const OccasionPanel = ({ occasion, index, activeIndex, scrollProgress }) => {
  const panelRef = useRef(null);
  useSpotlight(panelRef);

  const isActive = activeIndex === index;

  return (
    <div 
      ref={panelRef}
      className="occasion-panel relative w-full h-screen overflow-hidden"
      style={{ 
        backgroundColor: occasion.bgBase,
        '--accent': occasion.accentColor,
        '--accent-light': occasion.accentLight
      }}
    >
      {/* LAYER 1: 3D Scene (Far Back) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {isActive && (
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <OccasionScene3D scene3D={occasion.scene3D} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* LAYER 2: Silk Pattern (Only visible through spotlight) */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='${encodeURIComponent(occasion.accentColor)}' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* LAYER 3: Parallax Petals */}
      <ParallaxPetals 
        petalColors={occasion.petalColors} 
        petalCount={occasion.petalCount} 
        scrollProgress={scrollProgress} 
      />

      {/* LAYER 4: Dark Overlay with CSS Mask Spotlight reveal */}
      <div 
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          backgroundColor: occasion.overlayColor,
          maskImage: 'radial-gradient(500px circle at var(--sx) var(--sy), transparent 0%, transparent 35%, black 65%)',
          WebkitMaskImage: 'radial-gradient(500px circle at var(--sx) var(--sy), transparent 0%, transparent 35%, black 65%)'
        }}
      />

      {/* LAYER 5: Spotlight Gradient + Glow Ring */}
      <CursorSpotlight 
        spotlightColor={occasion.spotlightColor} 
        accentColor={occasion.accentColor} 
      />

      {/* LAYER 10: Foreground Content */}
      <div className="absolute inset-0 z-[10] flex flex-col lg:flex-row items-center justify-between px-12 md:px-24 py-20 pointer-events-none">
        {/* Left Column */}
        <div className="w-full lg:w-[55%] space-y-6 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            className="font-body text-[11px] tracking-[3px] text-gold uppercase"
          >
            0{index + 1} / 04
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="inline-block px-5 py-1.5 rounded-full border text-[12px] tracking-[4px] uppercase"
            style={{ borderColor: `${occasion.accentColor}66`, backgroundColor: `${occasion.accentColor}26`, color: occasion.accentColor }}
          >
            {occasion.label}
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: '110%' }}
              animate={isActive ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              className="font-display text-6xl md:text-8xl font-bold leading-[0.95] text-ivory"
              style={{ color: occasion.accentLight }}
            >
              {occasion.headline}
            </motion.h2>
          </div>

          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="font-accent italic text-2xl md:text-3xl text-ivory/75"
          >
            {occasion.subhead}
          </motion.h3>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-ivory/60 text-sm md:text-base max-w-md leading-relaxed whitespace-pre-line"
          >
            {occasion.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-6"
          >
            {[
              `${occasion.productCount}+ Pieces`,
              'Free Shipping',
              'COD Available'
            ].map((stat, i) => (
              <React.Fragment key={i}>
                <span className="text-[11px] font-body uppercase tracking-wider" style={{ color: occasion.accentColor }}>{stat}</span>
                {i < 2 && <div className="w-px h-3 bg-white/10" />}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="h-[52px] px-10 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 shimmer-effect"
            style={{ backgroundColor: occasion.accentColor, color: '#0a0a0f' }}
          >
            {occasion.cta}
          </motion.button>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[40%] h-[400px] pointer-events-auto">
          <OccasionProductPreview products={occasion.products} accentColor={occasion.accentColor} />
        </div>
      </div>

      {/* Navigation Dots (Absolute Bottom) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[20]">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className={`h-2 rounded-full transition-all duration-500 ${activeIndex === dot ? 'w-8' : 'w-2 bg-white/20'}`}
              style={{ backgroundColor: activeIndex === dot ? occasion.accentColor : undefined }}
            />
          ))}
        </div>
        {index < 3 && (
          <div className="flex flex-col items-center text-ivory/40 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest mb-1">Scroll to {['Mehendi', 'Sangeet', 'Reception', ''][index]}</span>
            <div className="w-1.5 h-1.5 border-r border-b border-ivory/40 rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OccasionPanel;
