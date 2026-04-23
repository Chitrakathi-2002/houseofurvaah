import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OCCASIONS } from './occasionData';
import OccasionPanel from './OccasionPanel';

gsap.registerPlugin(ScrollTrigger);

const OccasionsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.occasion-panel');
      
      panels.forEach((panel, i) => {
        // Pin each panel
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          snap: {
            snapTo: 1,
            duration: 0.5,
            ease: 'power2.inOut',
            delay: 0.1
          },
          onEnter: () => setActiveIndex(i),
          onLeaveBack: () => setActiveIndex(i - 1),
          onUpdate: (self) => {
            setProgressValues(prev => {
              const newVals = [...prev];
              newVals[i] = self.progress;
              return newVals;
            });
          }
        });

        // Wipe transitions
        if (i < panels.length - 1) {
          const nextPanel = panels[i + 1];
          // Alternate wipe directions for dynamic feel
          const directions = [
            'inset(100% 0% 0% 0%)', // Down
            'inset(0% 0% 0% 100%)', // Left
            'inset(0% 100% 0% 0%)', // Right
          ];
          
          gsap.set(nextPanel, { clipPath: directions[i % 3] });

          ScrollTrigger.create({
            trigger: panel,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: self => {
              const pct = (1 - self.progress) * 100;
              if (i % 3 === 0) nextPanel.style.clipPath = `inset(${pct}% 0% 0% 0%)`;
              else if (i % 3 === 1) nextPanel.style.clipPath = `inset(0% 0% 0% ${pct}%)`;
              else nextPanel.style.clipPath = `inset(0% ${pct}% 0% 0%)`;
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0F]">
      {/* Section Header */}
      <div className="w-full text-center py-24 px-6 z-10 relative bg-[#0A0A0F]">
        <p className="font-body text-[11px] tracking-[4px] text-gold uppercase mb-4 animate-pulse">
          ✦ DRESS FOR EVERY RITUAL ✦
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-ivory font-bold mb-6">
          Shop by Occasion
        </h2>
        <p className="font-body text-ivory/50 max-w-lg mx-auto">
          From Haldi mornings to Reception nights — find your perfect look for every ceremony.
        </p>
      </div>

      {/* Pinned Panels Container */}
      <div ref={containerRef} className="panels-container">
        {OCCASIONS.map((occasion, idx) => (
          <OccasionPanel 
            key={occasion.id} 
            occasion={occasion} 
            index={idx} 
            activeIndex={activeIndex}
            scrollProgress={progressValues[idx]}
          />
        ))}
      </div>
    </section>
  );
};

export default OccasionsSection;
