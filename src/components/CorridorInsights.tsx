'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CorridorInsights() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const centerRuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Main content staggered reveal on scroll
      if (contentRef.current) {
        const reveals = contentRef.current.querySelectorAll('.corridor-reveal');
        reveals.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }

      // Center rule expansion on scroll
      if (centerRuleRef.current) {
        gsap.fromTo(
          centerRuleRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: centerRuleRef.current,
              start: 'top 90%',
              once: true,
            },
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
      className="relative w-full bg-[#FFFFFF] text-[#0F172A] py-28 sm:py-36 lg:py-44 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden border-t border-slate-200"
    >
      {/* ── SECTION CONTENT (CLEAN WHITE THEME) ── */}
      <div ref={contentRef} className="max-w-5xl mx-auto relative z-20 text-center">
        {/* Mono Label */}
        <div className="corridor-reveal flex items-center justify-center gap-2 mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-slate-400" />
          <span className="font-mono text-xs font-medium tracking-widest text-slate-500 uppercase">
            NEXT // CORRIDOR INSIGHTS
          </span>
        </div>

        {/* Section Title */}
        <h2 className="corridor-reveal font-display font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#0F172A] tracking-[-1px] uppercase mb-6">
          Corridor Insights.
        </h2>

        {/* Animated Horizontal Rule */}
        <div className="flex justify-center mb-8">
          <div
            ref={centerRuleRef}
            className="h-[2px] w-32 bg-[#0F172A] origin-center"
          />
        </div>

        {/* Description */}
        <p className="corridor-reveal font-display text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
          Real-time corridor intelligence, route optimization analytics, and national freight artery performance — synchronized across Level 4 autonomous highway networks.
        </p>

        <span className="corridor-reveal inline-block font-mono text-[11px] text-slate-500 tracking-widest uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
          SYSTEM ACTIVE // LIVE TELEMETRY STREAM
        </span>
      </div>
    </section>
  );
}
