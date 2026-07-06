'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/product.glb');

  useEffect(() => {
    if (!groupRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
        .to(groupRef.current!.rotation, { y: Math.PI * 2, x: 0.4, ease: 'none' }, 0)
        .to(groupRef.current!.position, { x: 1.5, y: -0.2, ease: 'none' }, 0.25)
        .to(groupRef.current!.scale, { x: 1.25, y: 1.25, z: 1.25, ease: 'none' }, 0.4)
        .to(groupRef.current!.position, { x: -1.4, y: 0.2, ease: 'none' }, 0.65)
        .to(groupRef.current!.rotation, { y: Math.PI * 4, x: 0.8, ease: 'none' }, 0.65)
        .to(groupRef.current!.scale, { x: 0.9, y: 0.9, z: 0.9, ease: 'none' }, 0.9);
    });

    return () => ctx.revert();
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef} scale={1}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload('/models/product.glb');