import React, { useRef, useState, useEffect } from 'react';
import { useMagneticCursor } from '../Cursor/useMagneticCursor';

const ParticleBurst = () => {
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useMagneticCursor(buttonRef);

  const createParticles = (x, y) => {
    const colors = ['#C9A84C', '#f0d080', '#E8B4B8', '#6B1F2A'];
    const count = 80;
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
    
    if (!animationRef.current) {
      animate();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.alpha -= p.decay;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      if (p.alpha <= 0) {
        particlesRef.current.splice(index, 1);
      }
    });

    if (particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  };

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full py-20 flex flex-col items-center justify-center bg-[#0A0A0F] relative">
      <canvas 
        ref={canvasRef}
        width={400}
        height={200}
        className="absolute z-50 pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="group relative h-[54px] px-10 border-[1.5px] border-gold text-gold font-body text-[15px] tracking-[1px] rounded-sm transition-all duration-300 hover:bg-gold hover:text-dark flex items-center gap-3 overflow-hidden"
      >
        <span>Explore All 540 Pieces</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </button>
    </div>
  );
};

export default ParticleBurst;
