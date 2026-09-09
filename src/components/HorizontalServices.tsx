'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_DATA } from '../lib/constants';
import AtmosphericHorizon from './AtmosphericHorizon';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const totalWidth = section.scrollWidth;
    const viewportWidth = window.innerWidth;
    const distanceToScroll = totalWidth - viewportWidth + 140;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        x: -distanceToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${distanceToScroll * 1.3}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * SERVICES_DATA.length),
              SERVICES_DATA.length - 1
            );
            setActiveCardIndex(index);
          },
        },
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="services" className="relative bg-[#FFFFFF] overflow-hidden">
      {/* Chapter Break 01: Signature Atmospheric Horizon Divider */}
      <AtmosphericHorizon
        chapter="01"
        label="AUTONOMOUS SERVICES"
        sublabel="COMMERCIAL FREIGHT ARTERIES // CONTINUOUS TRANSIT"
        waypoint="ORD ↔ DFW"
        coordinates="41.8781° N  87.6298° W"
      />

      {/* Pinning Trigger Wrapper */}
      <div ref={triggerRef} className="relative w-full h-screen flex flex-col justify-center overflow-hidden py-16">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-3">
              Corridor Freight Architecture
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#0F172A] uppercase tracking-tight leading-tight">
              Commercial Freight <br />
              <span className="text-slate-400 font-extralight">Deployments.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#64748B] uppercase tracking-wider">
            [SCROLL TO EXPLORE CAPABILITIES]
          </p>
        </div>

        {/* Horizontal Track */}
        <div 
          ref={sectionRef} 
          className="flex items-stretch gap-8 px-6 sm:px-12 md:px-16 lg:px-24 w-max cursor-grab active:cursor-grabbing"
          data-cursor="drag"
        >
          {SERVICES_DATA.map((service, index) => {
            const isFocus = index === activeCardIndex;

            return (
              <div
                key={service.id}
                className={`clean-panel w-[320px] sm:w-[380px] md:w-[460px] p-8 md:p-10 flex flex-col justify-between rounded-sm flex-shrink-0 transition-all duration-500 ${
                  isFocus
                    ? 'opacity-100 border-slate-400 shadow-md bg-white scale-[1.01]'
                    : 'opacity-60 border-slate-200 bg-slate-50/70 hover:opacity-90 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <span className="font-mono text-xs text-[#0F172A] font-semibold tracking-widest">
                      {service.code}
                    </span>
                    <span className="font-mono text-[0.68rem] text-[#64748B] tracking-wider uppercase">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-display font-light text-2xl md:text-3xl text-[#0F172A] uppercase mb-4 leading-snug">
                    {service.title}
                  </h3>

                  <p className="font-display font-light text-xs md:text-sm text-[#475569] leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {service.specs.map((spec, sIndex) => (
                      <div key={sIndex} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="font-display font-light text-xs text-[#475569]">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric */}
                <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[0.62rem] text-[#64748B] uppercase tracking-wider mb-1">
                      {service.metricLabel}
                    </div>
                    <div className="font-display font-light text-3xl text-[#0F172A]">
                      {service.metric}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:border-[#B3122E] transition-colors shadow-2xs">
                    <ArrowUpRight className="w-4 h-4 text-[#475569]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
