import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Ribbon = ({ color, position, speed, offset }) => {
  const meshRef = useRef();
  
  // Create geometry with more vertices for smooth undulating
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 6, 16, 32), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Undulate on Z axis based on Y position and time
      positions[i + 2] = Math.sin(y * 0.5 + time * speed + offset) * 0.3;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow drift
    meshRef.current.position.y -= 0.003;
    if (meshRef.current.position.y < -10) meshRef.current.position.y = 10;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0.2, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshPhysicalMaterial 
        color={color}
        metalness={0.3}
        roughness={0.1}
        transparent={true}
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FabricRibbons = () => {
  const ribbons = [
    { color: '#C9A84C', position: [-4, 2, -2], speed: 1.5, offset: 0 },
    { color: '#6B1F2A', position: [2, 5, -3], speed: 1.2, offset: 2 },
    { color: '#E8B4B8', position: [-2, 8, -4], speed: 1.8, offset: 4 },
    { color: '#C9A84C', position: [4, 0, -5], speed: 1.0, offset: 1 },
    { color: '#6B1F2A', position: [-5, -5, -3], speed: 1.4, offset: 3 },
  ];

  return (
    <>
      {ribbons.map((r, i) => (
        <Ribbon key={i} {...r} />
      ))}
    </>
  );
};

export default FabricRibbons;
