import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CursorSpotlight = ({ spotlightColor, accentColor }) => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX - 40,
          y: e.clientY - 40,
          duration: 0.08,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {/* Spotlight Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: `radial-gradient(600px circle at var(--sx) var(--sy), ${spotlightColor}, transparent 70%)`,
          transition: 'background 0.05s linear'
        }}
      />
      
      {/* Glow Ring tracker */}
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full border-[1.5px] pointer-events-none z-[20] shadow-[0_0_20px_rgba(var(--accent-rgb),0.4),inset_0_0_20px_rgba(var(--accent-rgb),0.1)]"
        style={{
          borderColor: `${accentColor}99`,
          '--accent-rgb': accentColor // This needs conversion but we can use static for now or pass rgb
        }}
      />
    </>
  );
};

export default CursorSpotlight;
