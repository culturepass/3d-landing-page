'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ProductModel from './ProductModel';

gsap.registerPlugin(ScrollTrigger);

export default function Hero3D() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero 텍스트 사라짐
      if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '30% top',
            scrub: true,
          },
        });
      }

      // 헤더도 같이 사라짐
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          opacity: 0,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '25% top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-black text-white">

      {/* 배경 효과 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.18),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06]
        [background-image:
        linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),
        linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
        [background-size:80px_80px]" />

      {/* Header */}
      <header
        ref={headerRef}
        className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-10 py-7"
      >
        <div className="text-sm font-bold tracking-[0.4em] uppercase">
          AI PRACTICE
        </div>

        <nav className="hidden md:flex gap-10 text-sm text-white/60">
          <a href="#">Showcase</a>
          <a href="#">Story</a>
          <a href="#">Feature</a>
          <a href="#">Contact</a>
        </nav>

        <button className="rounded-full border border-white/20 px-5 py-2 text-sm">
          Start
        </button>
      </header>

      {/* Hero Text */}
      <div
        ref={heroTextRef}
        className="absolute left-10 top-1/2 z-20 max-w-2xl -translate-y-1/2"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#c9a45c]">
          PREMIUM PRODUCT
        </p>

        <h1 className="text-6xl font-bold leading-tight md:text-7xl">
          Premium 3D
          <br />
          Product Showcase
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
          스크롤과 함께 제품이 회전하고 이동하는
          인터랙티브 랜딩페이지 데모입니다.
        </p>
      </div>

      {/* Canvas */}
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[3, 3, 5]}
          intensity={2.5}
        />
        <pointLight
          position={[-3, -2, 4]}
          intensity={1.5}
        />

        <Environment preset="city" />

        <ProductModel />
      </Canvas>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-sm tracking-[0.3em] text-white/40 uppercase">
        Scroll Down
      </div>

    </section>
  );
}