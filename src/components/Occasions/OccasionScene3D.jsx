import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FabricSilhouette = ({ color }) => {
  const meshRef = useRef();
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0.18 }
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave1 = sin(pos.y * 2.0 + uTime * 0.8) * 0.08;
        float wave2 = sin(pos.x * 3.0 + uTime * 1.2) * 0.04;
        float wave3 = cos(pos.y * 4.0 + uTime * 0.5) * 0.03;
        pos.x += wave1 + wave2;
        pos.z += wave3;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        float alpha = uOpacity * (1.0 - smoothstep(0.4, 0.5, abs(vUv.x - 0.5)));
        gl_FragColor = vec4(uColor, alpha);
      }
    `
  }), [color]);

  useFrame((state) => {
    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[2.5, 0, -1]} rotation={[0, -0.3, 0.05]}>
      <planeGeometry args={[2.5, 4.5, 30, 60]} />
      <shaderMaterial args={[shaderArgs]} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

const SecondaryObjects = ({ geometry, color }) => {
  const groupRef = useRef();
  const positions = [[-3,2,1],[3,-1,0.5],[-2,-2,2],[2,2,-1],[0,-3,1],[-4,0,0],[4,1,-0.5]];
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const offset = i * 0.5;
      const speed = 0.5 + i * 0.1;
      child.position.x += Math.sin(time * speed + offset) * 0.005;
      child.position.y += Math.cos(time * speed + offset) * 0.005;
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    });
  });

  const getGeometry = (type) => {
    switch(type) {
      case 'sphere': return <sphereGeometry args={[0.3, 32, 32]} />;
      case 'icosahedron': return <icosahedronGeometry args={[0.3, 1]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[0.3]} />;
      default: return <sphereGeometry args={[0.2, 16, 16]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          {getGeometry(geometry)}
          <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

const ParticleSystem = ({ count, color }) => {
  const pointsRef = useRef();
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= 0.002;
      if (pos[i * 3 + 1] < -6) pos[i * 3 + 1] = 6;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.012} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const OccasionScene3D = ({ scene3D }) => {
  const primaryRef = useRef();

  useFrame((state) => {
    if (primaryRef.current) {
      primaryRef.current.rotation.x += 0.003;
      primaryRef.current.rotation.y += 0.005;
    }
  });

  const renderPrimary = () => {
    const props = { color: scene3D.primaryColor, metalness: 0.85, roughness: 0.12, transparent: true, opacity: 0.55 };
    switch(scene3D.primaryGeometry) {
      case 'torus': return (
        <mesh ref={primaryRef}>
          <torusGeometry args={[1.8, 0.06, 16, 120]} />
          <meshPhysicalMaterial {...props} />
        </mesh>
      );
      case 'torusKnot': return (
        <mesh ref={primaryRef}>
          <torusKnotGeometry args={[1.2, 0.04, 200, 16, 3, 7]} />
          <meshPhysicalMaterial {...props} />
        </mesh>
      );
      case 'octahedron': return (
        <mesh ref={primaryRef}>
          <octahedronGeometry args={[1.6]} />
          <meshPhysicalMaterial {...props} />
        </mesh>
      );
      default: return null;
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} color={scene3D.ambientColor} />
      <pointLight position={[3, 3, 4]} color={scene3D.pointLightColor} intensity={3} />
      <pointLight position={[-4, -2, 2]} color="#ffffff" intensity={0.5} />
      
      {renderPrimary()}
      <SecondaryObjects geometry={scene3D.secondaryGeometry} color={scene3D.secondaryColor} />
      <ParticleSystem count={scene3D.particleCount} color={scene3D.particleColor} />
      <FabricSilhouette color={scene3D.primaryColor} />
    </>
  );
};

export default OccasionScene3D;
