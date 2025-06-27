'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Typography } from '@mui/material';

function Earth() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState<string | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/earthmap1.jpg',
      (tex) => setTexture(tex),
      undefined,
      (err) => {
        console.error('Texture load error:', err);
        setError('Failed to load earth texture.');
      }
    );
  }, []);

    useFrame((_, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += (Math.PI * 2 / 40) * delta; // 1 rotation every 40s (slowed down)
      }
    });

  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3.2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

interface RotatingEarthProps {
  size?: number;
}

export default function RotatingEarth({ size = 600 }: RotatingEarthProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        maxWidth: '100%',
        maxHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 'auto',
      }}
    >
      <Canvas camera={{ position: [0, 0, 6] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </Box>
  );
}
