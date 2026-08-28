import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CoreMesh({ mousePos }) {
  const meshRef = useRef();
  const outerWireframeRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.y -= delta * 0.2;
      outerWireframeRef.current.rotation.z += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Central Distorted AI Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1}>
          <MeshDistortMaterial
            color="#2F9BF4"
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.2}
            metalness={0.8}
            emissive="#1677D2"
            emissiveIntensity={0.6}
          />
        </Sphere>
      </Float>

      {/* Outer Wireframe Structure */}
      <mesh ref={outerWireframeRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00F0FF" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Orbiting Particle Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[3, 0.03, 16, 100]} />
          <meshBasicMaterial color="#2F9BF4" opacity={0.6} transparent />
        </mesh>
      </group>

      {/* Data Nodes */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3.2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.4;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00F0FF" />
          </mesh>
        );
      })}
    </group>
  );
}

export const AnalyticsCore3D = ({ className = "h-[450px] w-full" }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#2F9BF4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00F0FF" />
        <CoreMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
};

export default AnalyticsCore3D;
