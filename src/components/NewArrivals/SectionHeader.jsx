import React, { useRef, useEffect, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

const DecorativeLotus = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.6, 0.15, 100, 16, 3, 7]} />
      <meshPhysicalMaterial 
        color="#C9A84C" 
        metalness={0.9} 
        roughness={0.1} 
        emissive="#C9A84C"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const SectionHeader = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Element 1: Pre-label
      gsap.from('.pre-label', {
        y: -10,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pre-label',
          start: 'top 85%',
        }
      });

      // Element 2: Main Heading Character Animation
      const chars = headingRef.current.querySelectorAll('.char');
      gsap.from(chars, {
        y: '110%',
        opacity: 0,
        stagger: 0.035,
        duration: 0.65,
        ease: 'power4.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        }
      });

      // Element 3: Decorative Divider
      gsap.from('.divider-line', {
        scaleX: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.divider-container',
          start: 'top 90%',
        }
      });

      // Element 4: Sub-label
      gsap.from('.sub-label', {
        opacity: 0,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
          trigger: '.sub-label',
          start: 'top 90%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headingText = "New Arrivals";

  return (
    <div ref={containerRef} className="relative w-full pt-20 pb-12 text-center overflow-hidden">
      <p className="pre-label font-body text-[11px] tracking-[4px] text-gold uppercase mb-4">
        ✦ FRESH FROM THE LOOM ✦
      </p>
      
      <div className="relative inline-block px-12">
        <h2 
          ref={headingRef} 
          className="arrivals-heading font-display text-5xl md:text-7xl text-ivory font-bold overflow-hidden"
        >
          {headingText.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>

        {/* 3D Decorative Lotus */}
        <div className="absolute -top-10 -right-20 w-[200px] h-[200px] hidden md:block z-[-1]">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <DecorativeLotus />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="divider-container relative mt-6 h-px w-full max-w-lg mx-auto flex justify-center">
        <div className="divider-line w-full h-full" style={{ 
          background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
          transformOrigin: 'center'
        }} />
      </div>

      <p className="sub-label font-body text-sm text-ivory/60 mt-6 tracking-wide">
        540+ Handcrafted Pieces · Free Gift Packaging · COD Available
      </p>
    </div>
  );
};

export default SectionHeader;
