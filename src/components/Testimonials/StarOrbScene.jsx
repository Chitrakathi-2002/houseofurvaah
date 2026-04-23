import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RatingOrb = ({ position, delay, index }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index * 1.2) * 0.1;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
    }
  });

  React.useEffect(() => {
    gsap.from(meshRef.current.position, {
      y: -5,
      duration: 1.5,
      delay: delay,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.star-scene-container',
        start: 'top 80%',
      }
    });
    
    gsap.from(meshRef.current.material, {
      opacity: 0,
      duration: 0.8,
      delay: delay,
      scrollTrigger: {
        trigger: '.star-scene-container',
        start: 'top 80%',
      }
    });
  }, [delay, position]);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshPhysicalMaterial 
        color="#C9A84C"
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1.5}
        transparent
      />
    </mesh>
  );
};

const RatingText = () => {
  return (
    <group position={[-1.5, 0, 0]}>
      <Text
        font="/fonts/PlayfairDisplay-Bold.ttf" // Fallback to default if not found
        fontSize={1.8}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
      >
        4.9
      </Text>
      <Text
        fontSize={0.3}
        color="#F5EDD6"
        opacity={0.5}
        position={[0, -1.2, 0]}
        anchorX="center"
        anchorY="middle"
        transparent
      >
        out of 5  ·  1,289 reviews
      </Text>
    </group>
  );
};

const StarOrbScene = () => {
  const orbPositions = [
    [1.5, -0.4, 0],
    [2.8, 0, 0],
    [4.1, 0.4, 0],
    [5.4, 0, 0],
    [6.7, -0.4, 0]
  ];

  return (
    <div className="star-scene-container w-full h-[320px] relative overflow-hidden bg-black/20">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6B1F2A" />
        <spotLight position={[0, 5, 5]} angle={0.15} penumbra={1} intensity={2} color="#F5EDD6" />

        <RatingText />
        
        {orbPositions.map((pos, i) => (
          <RatingOrb key={i} index={i} position={pos} delay={0.2 + i * 0.1} />
        ))}

        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>

      {/* Rating Breakdown Overlay */}
      <div className="absolute bottom-8 right-12 hidden md:block w-64 space-y-2">
        {[
          { star: 5, pct: 94 },
          { star: 4, pct: 4 },
          { star: 3, pct: 1 },
          { star: 2, pct: 0 },
          { star: 1, pct: 1 }
        ].map((item, i) => (
          <div key={item.star} className="flex items-center gap-3">
            <span className="text-gold text-[10px] w-4">{item.star}★</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${item.star === 5 ? 'bg-gold' : 'bg-gold/40'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
              />
            </div>
            <span className="text-ivory/40 text-[10px] w-6">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarOrbScene;
