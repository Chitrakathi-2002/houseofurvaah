import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCardFlip from './ProductCardFlip';
import { LayoutGrid, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ComparisonGrid = ({ products }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-20 bg-black/40 backdrop-blur-xl">
      <div className="mb-12 text-center">
        <h2 className="font-display text-4xl text-gold mb-2">Seasonal Lookbook</h2>
        <p className="text-ivory/40 text-[10px] tracking-[4px] uppercase">Compare & Select Your Masterpiece</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {products.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-[2px] border border-white/5"
          >
            <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
              <p className="text-ivory text-[10px] font-bold truncate">{product.name}</p>
              <p className="text-gold text-xs font-display">₹{product.salePrice.toLocaleString()}</p>
              <button className="mt-2 text-[8px] text-white/60 flex items-center gap-1 hover:text-gold transition-colors">
                View Details <ArrowUpRight size={10} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HorizontalScrollTrack = ({ products }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bgTextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFinalView, setIsFinalView] = useState(false);

  // We add +1 for the final comparison panel
  const totalSteps = products.length + 1;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.product-card-wrapper');
      if (cards.length === 0) return;

      // MUCH SLOWER SCROLL: 300% height per item
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: `+=${totalSteps * 250}%`, 
          scrub: 1.5, // Even smoother
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const rawIndex = self.progress * (totalSteps - 1);
            const index = Math.min(Math.floor(rawIndex), products.length - 1);
            setActiveIndex(index);
            
            // Check if we are in the final comparison zone
            setIsFinalView(self.progress > 0.92);
          },
        }
      });

      // Animate the track translation
      // The track now contains cards + 1 final panel
      tl.to(trackRef.current, {
        xPercent: -100 * (totalSteps - 1),
        ease: 'none'
      });

      // Background Text Parallax (Opposite direction)
      gsap.to(bgTextRef.current, {
        x: -800,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Cinematic Card Animations (Depth & Detail focus)
      cards.forEach((card, i) => {
        // Entrance: Zoom from far and blur
        gsap.fromTo(card, 
          { 
            scale: 0.5, 
            opacity: 0,
            z: -1000,
            rotateX: 20,
            filter: 'blur(20px)'
          },
          {
            scale: 1,
            opacity: 1,
            z: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `${(i / totalSteps) * 250}% top`,
              end: () => `${((i + 0.4) / totalSteps) * 250}% top`,
              scrub: true,
            }
          }
        );
        
        // Detailed Stay: Card remains focused for a while
        // Exit: Move away
        gsap.to(card, {
          scale: 0.5,
          opacity: 0,
          z: -1000,
          rotateX: -20,
          filter: 'blur(20px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `${((i + 0.6) / totalSteps) * 250}% top`,
            end: () => `${((i + 1) / totalSteps) * 250}% top`,
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#0A0A0F] overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* Editorial Background Typography */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0 select-none opacity-[0.02]"
      >
        <span className="font-display text-[50rem] font-black text-ivory tracking-tighter">
          HERITAGE
        </span>
      </div>

      {/* Dynamic Background Aura */}
      <div 
        className="absolute w-[900px] h-[900px] rounded-full blur-[200px] opacity-10 pointer-events-none transition-all duration-1000"
        style={{
          backgroundColor: products[activeIndex]?.gradientColors[0] || '#C9A84C',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Main Track Container */}
      <div className="relative w-full h-full perspective-2000 z-10">
        <div 
          ref={trackRef} 
          className="flex flex-row items-center h-full will-change-transform"
          style={{ width: `${totalSteps * 100}%` }}
        >
          {/* Individual Product Panels */}
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className="product-card-wrapper w-screen h-full flex items-center justify-center shrink-0 p-20"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="max-w-[500px] w-full h-[650px]">
                <ProductCardFlip 
                  product={product} 
                  isFocused={activeIndex === idx && !isFinalView} 
                />
              </div>
            </div>
          ))}

          {/* FINAL COMPARISON PANEL */}
          <div className="final-panel-wrapper w-screen h-full shrink-0">
            <ComparisonGrid products={products} />
          </div>
        </div>
      </div>

      {/* Sophisticated UI Overlays */}
      <AnimatePresence>
        {!isFinalView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 left-0 w-full px-12 md:px-20 flex items-end justify-between z-20 pointer-events-none"
          >
            {/* Step Indicator */}
            <div className="flex flex-col">
              <span className="text-gold text-[10px] font-body tracking-[6px] uppercase font-bold mb-1 opacity-60">
                Craftsmanship Vol. 02
              </span>
              <div className="flex items-baseline gap-4">
                <span className="text-ivory text-9xl font-display font-black leading-none">
                  0{activeIndex + 1}
                </span>
                <span className="text-gold/40 text-2xl font-display italic">
                  / 0{products.length}
                </span>
              </div>
            </div>

            {/* Scroll Navigation Guide */}
            <div className="flex flex-col items-end gap-6 w-[400px]">
              <div className="flex flex-col items-end text-right">
                <p className="text-ivory text-sm font-bold tracking-widest uppercase mb-1">
                  {products[activeIndex]?.name}
                </p>
                <p className="text-gold/60 text-[10px] tracking-[4px] uppercase">
                  Explore the Details
                </p>
              </div>

              <div className="w-full flex flex-col gap-3 pointer-events-auto">
                <div className="flex justify-between text-[9px] text-gold/40 tracking-widest uppercase">
                  <span>Scroll to transition</span>
                  <span>{Math.round(scrollProgress * 100)}%</span>
                </div>
                <div className="w-full h-px bg-white/10 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gold"
                    animate={{ scaleX: scrollProgress }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    style={{ width: '100%', transformOrigin: 'left' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 { perspective: 2000px; }
      `}} />
    </div>
  );
};

export default HorizontalScrollTrack;
