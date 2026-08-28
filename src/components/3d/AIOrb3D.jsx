import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function OrbMesh({ color = "#2F9BF4", speed = 4 }) {
  const orbRef = useRef();

  useFrame((state, delta) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Sphere ref={orbRef} args={[1, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        distort={0.45}
        speed={speed}
        roughness={0.1}
        metalness={0.5}
        emissive="#1677D2"
        emissiveIntensity={0.8}
      />
    </Sphere>
  );
}

export const AIOrb3D = ({ size = "w-16 h-16", color, speed }) => {
  return (
    <div className={`relative ${size} inline-block`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00F0FF" />
        <OrbMesh color={color} speed={speed} />
      </Canvas>
    </div>
  );
};

export default AIOrb3D;
