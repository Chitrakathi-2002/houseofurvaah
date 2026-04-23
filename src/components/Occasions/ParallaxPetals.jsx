import React, { useMemo } from 'react';

const ParallaxPetals = ({ petalColors, petalCount, scrollProgress }) => {
  const petals = useMemo(() => {
    return Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 6,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      left: Math.random() * 100,
      top: Math.random() * 120 - 10,
      speed: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * 360,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4
    }));
  }, [petalColors, petalCount]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
      {petals.map((p) => {
        const parallaxY = scrollProgress * p.speed * 120;
        return (
          <div
            key={p.id}
            className="absolute transition-transform duration-100 ease-out"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.4}px`,
              backgroundColor: p.color,
              opacity: Math.random() * 0.3 + 0.25,
              borderRadius: '60% 40% 60% 40% / 40% 60% 40% 60%',
              transform: `translateY(${parallaxY}px) rotate(${p.rotation + scrollProgress * 50}deg)`,
              animation: `petalDrift ${p.duration}s ease-in-out ${p.delay}s infinite`
            }}
          />
        );
      })}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes petalDrift {
          0%   { transform: translateY(0px) rotate(0deg); }
          33%  { transform: translateY(-12px) rotate(8deg); }
          66%  { transform: translateY(6px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
    </div>
  );
};

export default ParallaxPetals;
