"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import * as THREE from "three";

export function Scene3D() {
  return (
    <div className="relative w-full h-64 xs:h-80 lg:h-96">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Mesh />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
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
          <p className="text-caption text-palette-neutral-500 dark:text-palette-neutral-400">
            Optional 3D Accent
          </p>
        </motion.div>
      </Html>
    </div>
  );
}

function Mesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_state: { clock: THREE.Clock }, delta: number) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          metalness={0.1}
          roughness={0.3}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.3, 0.15, 64, 8]} />
        <meshBasicMaterial
          color="#d946ef"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}