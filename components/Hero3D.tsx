'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ProductModel() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/product.glb');

  useEffect(() => {
    if (!modelRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
      .to(modelRef.current.rotation, { y: Math.PI * 2, x: Math.PI * 0.5, ease: 'none' }, 0)
      .to(modelRef.current.position, { x: 1.8, y: -0.2, ease: 'none' }, 0.2)
      .to(modelRef.current.scale, { x: 1.4, y: 1.4, z: 1.4, ease: 'none' }, 0.35)
      .to(modelRef.current.position, { x: -1.8, y: 0.3, ease: 'none' }, 0.6)
      .to(modelRef.current.rotation, { y: Math.PI * 4, x: Math.PI * 1, ease: 'none' }, 0.6)
      .to(modelRef.current.scale, { x: 0.9, y: 0.9, z: 0.9, ease: 'none' }, 0.85);
  }, []);

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += 0.001;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.2}
      position={[0, -0.2, 0]}
      rotation={[0.2, 0.4, 0]}
    />
  );
}

export default function Hero3D() {
  return (
    <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.22),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:80px_80px]" />

      <header className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-8 py-6">
        <div className="text-sm font-bold uppercase tracking-[0.35em]">
          AI Practice
        </div>

        <nav className="hidden gap-8 text-sm text-white/60 md:flex">
          <a href="#" className="hover:text-white">Showcase</a>
          <a href="#" className="hover:text-white">Story</a>
          <a href="#" className="hover:text-white">Feature</a>
          <a href="#" className="hover:text-white">Contact</a>
        </nav>

        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80">
          Start
        </button>
      </header>

      <div className="absolute left-8 top-32 z-10">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">
          3D Landing Practice
        </p>
        <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight md:text-7xl">
          Premium 3D Product Showcase
        </h1>
        <p className="mt-5 max-w-md text-white/60">
          실제 GLB 3D 모델을 적용한 인터랙티브 랜딩페이지입니다.
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 5]} intensity={2.5} />
        <pointLight position={[-3, -2, 4]} intensity={1.8} />
        <Environment preset="city" />
        <ProductModel />
      </Canvas>

      <div className="absolute bottom-8 left-8 z-10 text-sm text-white/40">
        Scroll to explore
      </div>
    </section>
  );
}