'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    eyebrow: 'Scene 01',
    title: '첫 화면에서 제품의 존재감을 각인시킵니다',
    desc: '고급 랜딩페이지는 정보를 많이 보여주기보다, 첫인상에서 제품의 무게감과 브랜드 분위기를 강하게 전달합니다.',
    align: 'left',
  },
  {
    eyebrow: 'Scene 02',
    title: '스크롤 흐름에 맞춰 제품을 탐색합니다',
    desc: '사용자가 아래로 이동할수록 제품은 회전하고, 크기와 위치가 바뀌며 쇼룸 안에서 제품을 둘러보는 듯한 경험을 제공합니다.',
    align: 'right',
  },
  {
    eyebrow: 'Scene 03',
    title: '기능 설명도 시각적인 흐름 안에 배치합니다',
    desc: '단순한 기능 나열 대신, 핵심 장점만 짧게 보여주고 나머지는 인터랙션과 장면 전환으로 설득력을 높입니다.',
    align: 'left',
  },
  {
    eyebrow: 'Scene 04',
    title: '마지막에는 명확한 행동을 유도합니다',
    desc: '브랜드 소개, 제품 탐색, 기능 이해가 끝난 뒤 문의하기·구매하기·상담 신청 같은 전환 버튼으로 연결합니다.',
    align: 'center',
  },
];

export default function ScrollSections() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scroll-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 90, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 76%',
              end: 'bottom 35%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 bg-transparent text-white">
      {sections.map((item, index) => {
        const isRight = item.align === 'right';
        const isCenter = item.align === 'center';

        return (
          <div
            key={item.eyebrow}
            className="relative flex min-h-screen items-center overflow-hidden px-8"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/65 to-black/90" />

            <div
              className={`scroll-card relative z-10 mx-auto w-full max-w-6xl ${
                isCenter
                  ? 'text-center'
                  : isRight
                  ? 'flex justify-end text-right'
                  : 'text-left'
              }`}
            >
              <div className={isCenter ? 'mx-auto max-w-3xl' : 'max-w-xl'}>
                <p className="text-sm uppercase tracking-[0.45em] text-[#c9a45c]">
                  {item.eyebrow}
                </p>

                <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
                  {item.title}
                </h2>

                <p className="mt-6 text-base leading-8 text-white/60 md:text-lg">
                  {item.desc}
                </p>

                {index === 3 && (
                  <div className="mt-10 flex justify-center gap-4">
                    <button className="rounded-full bg-[#c9a45c] px-7 py-4 text-sm font-bold text-black">
                      프로젝트 문의하기
                    </button>
                    <button className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white">
                      포트폴리오 보기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}