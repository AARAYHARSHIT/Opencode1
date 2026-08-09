"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { motion } from "motion/react";
import * as THREE from "three";

function CodeBracketMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((_state: { clock: THREE.Clock }, delta: number) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshPhysicalMaterial
          color="#fb923c"
          metalness={0.3}
          roughness={0.2}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#facc15"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshPhysicalMaterial
          color="#f97316"
          metalness={0.5}
          roughness={0.1}
          emissive="#fb923c"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const mix = Math.random();
      col[i * 3] = 0.9 + mix * 0.1;
      col[i * 3 + 1] = 0.5 + mix * 0.4;
      col[i * 3 + 2] = 0.1 + mix * 0.2;
    }
    return col;
  }, []);

  useFrame((_state: { clock: THREE.Clock }, delta: number) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="relative w-full h-64 xs:h-80 lg:h-96">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <pointLight position={[-4, -3, -4]} intensity={1.5} color="#fb923c" />
        <pointLight position={[4, -3, 3]} intensity={1.2} color="#facc15" />
        <pointLight position={[0, 4, 0]} intensity={0.6} color="#f97316" />
        <CodeBracketMesh />
        <FloatingParticles />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Html
          wrapperClass="absolute inset-0 pointer-events-none"
          prepend
          center
          fullscreen
          distanceFactor={10}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center px-4"
          >
            <p className="text-caption text-palette-neutral-500 font-medium">
              60-Day Coding Challenge
            </p>
          </motion.div>
        </Html>
      </Canvas>
    </div>
  );
}
