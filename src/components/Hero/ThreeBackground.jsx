import React, { Suspense, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import FabricRibbons from './FabricRibbons';
import GoldParticles from './GoldParticles';
import MandalaTorus from './MandalaTorus';

const SceneContent = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle camera sway
    state.camera.position.x = Math.sin(t * 0.3) * 0.5;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#f0d080" intensity={2} />
      <pointLight position={[-5, -3, 2]} color="#6B1F2A" intensity={1} />
      
      <FabricRibbons />
      <GoldParticles />
      <MandalaTorus />
      
      <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} />
    </>
  );
};

const ThreeBackground = memo(() => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, #1a0f02 0%, #0a0a0f 60%, #0d0507 100%)',
          zIndex: -1
        }}
      />
    </div>
  );
});

export default ThreeBackground;
