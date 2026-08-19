"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Line,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(
      count * 3
    );

    for (let i = 0; i < count; i++) {
      const radius =
        2.1 + Math.random() * 1.5;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      positions[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      positions[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      positions[i * 3 + 2] =
        radius *
        Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const time =
      state.clock.getElapsedTime();

    ref.current.rotation.y =
      time * 0.025;

    ref.current.rotation.x =
      Math.sin(time * 0.12) * 0.035;
  });

  return (
    <Points
      ref={ref}
      positions={particles}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color="#d8dcff"
        size={0.014}
        sizeAttenuation
        depthWrite={false}
        opacity={0.48}
      />
    </Points>
  );
}

function CoreSphere() {
  const outerRef =
    useRef<THREE.Mesh>(null);

  const innerRef =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time =
      state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.y =
        time * 0.08;

      outerRef.current.rotation.z =
        time * 0.04;
    }

    if (innerRef.current) {
      const pulse =
        1 +
        Math.sin(time * 1.1) *
          0.025;

      innerRef.current.scale.setScalar(
        pulse
      );
    }
  });

  return (
    <group>
      <mesh ref={innerRef}>
        <icosahedronGeometry
          args={[1.12, 4]}
        />

        <meshStandardMaterial
          color="#e8e9ee"
          roughness={0.22}
          metalness={0.82}
        />
      </mesh>

      <mesh ref={outerRef}>
        <icosahedronGeometry
          args={[1.48, 2]}
        />

        <meshBasicMaterial
          color="#b9bdd1"
          wireframe
          transparent
          opacity={0.19}
        />
      </mesh>

      <mesh scale={1.75}>
        <sphereGeometry
          args={[1, 20, 20]}
        />

        <meshBasicMaterial
          color="#9198ff"
          transparent
          opacity={0.018}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Orbit({
  rotation,
  radius,
}: {
  rotation: [number, number, number];
  radius: number;
}) {
  const ref = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    const result: THREE.Vector3[] = [];
    const segments = 72;

    for (let i = 0; i <= segments; i++) {
      const angle =
        (i / segments) *
        Math.PI *
        2;

      result.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        )
      );
    }

    return result;
  }, [radius]);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.z +=
      0.00045;
  });

  return (
    <Line
      ref={ref}
      points={points}
      rotation={rotation}
      color="#c9ccdf"
      transparent
      opacity={0.19}
      lineWidth={0.6}
    />
  );
}

function CoreSystem() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={1.7}
      />

      <pointLight
        position={[-3, -2, 2]}
        intensity={3.5}
        distance={8}
        color="#747bff"
      />

      <pointLight
        position={[3, 2, -2]}
        intensity={1.5}
        distance={7}
      />

      <CoreSphere />

      <Orbit
        radius={2}
        rotation={[0.8, 0.2, 0.3]}
      />

      <Orbit
        radius={2.45}
        rotation={[1.4, 0.5, -0.2]}
      />

      <Orbit
        radius={2.9}
        rotation={[0.3, 1.1, 0.7]}
      />

      <ParticleField />
    </>
  );
}

export default function CoreScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 40,
      }}
      dpr={1}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      }}
    >
      <CoreSystem />
    </Canvas>
  );
}