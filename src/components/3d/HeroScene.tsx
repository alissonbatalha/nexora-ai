"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Sphere,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.08;
      coreRef.current.rotation.x =
        Math.sin(time * 0.25) * 0.05;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -time * 0.05;
      wireRef.current.rotation.z = time * 0.025;
    }
  });

  return (
    <group>
      <Sphere
        ref={coreRef}
        args={[1.45, 40, 40]}
      >
        <meshStandardMaterial
          color="#d8dae0"
          roughness={0.28}
          metalness={0.8}
        />
      </Sphere>

      <Sphere
        ref={wireRef}
        args={[1.63, 24, 24]}
      >
        <meshBasicMaterial
          color="#abb0c2"
          wireframe
          transparent
          opacity={0.14}
        />
      </Sphere>

      <Sphere args={[1.2, 20, 20]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.025}
        />
      </Sphere>
    </group>
  );
}

function OrbitalRing({
  rotation,
  scale = 1,
}: {
  rotation: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.z += 0.0007;
  });

  return (
    <mesh
      ref={ref}
      rotation={rotation}
      scale={scale}
    >
      <torusGeometry
        args={[2.15, 0.006, 6, 96]}
      />

      <meshBasicMaterial
        color="#aeb4c7"
        transparent
        opacity={0.22}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <directionalLight
        position={[4, 5, 4]}
        intensity={1.7}
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={3}
        distance={9}
        color="#8589ff"
      />

      <Float
        speed={0.8}
        rotationIntensity={0.08}
        floatIntensity={0.18}
      >
        <Core />

        <OrbitalRing
          rotation={[0.8, 0.2, 0.4]}
        />

        <OrbitalRing
          rotation={[1.8, 0.7, -0.2]}
          scale={0.82}
        />

        <OrbitalRing
          rotation={[0.2, 1.3, 0.8]}
          scale={1.08}
        />
      </Float>

      <Sparkles
        count={55}
        scale={[7, 7, 7]}
        size={0.9}
        speed={0.08}
        opacity={0.26}
        color="#d7d9ff"
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={1}
        camera={{
          position: [0, 0, 6],
          fov: 42,
        }}
        frameloop="always"
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}