'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CorridorInsights() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Fade-in + slide-up the heading and content on scroll */
      const elements = section.querySelectorAll('.corridor-reveal');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      /* Horizontal rule width animation */
      const rule = section.querySelector('.corridor-rule');
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: rule, start: 'top 90%', once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="corridor-insights"
      ref={sectionRef}
      className="relative w-full bg-[#F8FAFC] py-32 sm:py-44 lg:py-56 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden border-t border-slate-200/80"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Mono Label */}
        <div className="corridor-reveal flex items-center justify-center gap-2 mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2563EB]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2563EB] uppercase">
            NEXT // CORRIDOR INSIGHTS
          </span>
        </div>

        {/* Section Title */}
        <h2 className="corridor-reveal font-display font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#0F172A] tracking-[-1px] uppercase mb-6">
          Corridor Insights
        </h2>

        {/* Animated Horizontal Rule */}
        <div className="flex justify-center mb-8">
          <div
            className="corridor-rule h-[2px] w-32 bg-[#2563EB] origin-left"
            style={{ transformOrigin: 'center' }}
          />
        </div>

        {/* Placeholder Description */}
        <p className="corridor-reveal font-display text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-4">
          Real-time corridor intelligence, route optimization analytics, and national freight artery performance — coming into view.
        </p>

        <span className="corridor-reveal inline-block font-mono text-[11px] text-slate-400 tracking-widest uppercase">
          INTERACTIVE CONTENT LOADING
        </span>
      </div>
    </section>
  );
}
