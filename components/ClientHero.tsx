'use client';

import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => <section className="h-screen w-full bg-black" />,
});

export default function ClientHero() {
  return <Hero3D />;
}
