import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MandalaTorus = () => {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.z += 0.001;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z -= 0.002;
    }
  });

  return (
    <group position={[5, 0, -5]}>
      {/* Outer Torus */}
      <mesh ref={outerRef}>
        <torusGeometry args={[3, 0.015, 16, 100]} />
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Inner Torus */}
      <mesh ref={innerRef}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.3} />
      </mesh>

      {/* Decorative center sphere */}
      <mesh>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" />
      </mesh>
    </group>
  );
};

export default MandalaTorus;
