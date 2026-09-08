'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE_MILESTONES } from '../lib/constants';
import AtmosphericHorizon from './AtmosphericHorizon';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="process" className="relative bg-[#FFFFFF] py-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
      {/* Chapter Break 02: Signature Atmospheric Horizon Divider */}
      <AtmosphericHorizon
        chapter="02"
        label="EXECUTION LIFECYCLE"
        sublabel="PRECISION INGRESS TO DOCK ALLOCATION PROTOCOL"
        waypoint="LAX ↔ PHX"
        coordinates="34.0522° N  118.2437° W"
      />

      <div className="max-w-5xl mx-auto pt-16">
        {/* Section Header with Generous Whitespace */}
        <div className="max-w-2xl mb-24">
          <div className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-3">
            Autonomous Freight Protocol
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#0F172A] uppercase tracking-tight leading-tight mb-4">
            Corridor Execution <br />
            <span className="text-slate-400 font-extralight">Lifecycle.</span>
          </h2>
          <p className="font-display font-light text-xs sm:text-sm text-[#475569] leading-relaxed">
            From algorithmic payload calibration at gate ingress to millimeter-accurate dock insertion at terminal egress.
          </p>
        </div>

        {/* Timeline Container with Sticky Laser Line */}
        <div ref={containerRef} className="relative">
          {/* Background Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />

          {/* Active Filling Laser Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-[#B3122E] shadow-[0_0_12px_rgba(37,99,235,0.4)] -translate-x-1/2 origin-top"
          />

          {/* Milestone Items */}
          <div className="space-y-20 md:space-y-28">
            {TIMELINE_MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.code}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 md:gap-16 pl-12 md:pl-0`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-[#2563EB] shadow-md z-10">
                    <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-1/2">
                    <div className="clean-panel p-6 sm:p-8 rounded-sm bg-white border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                        <span className="font-mono text-xs text-[#0F172A] font-semibold tracking-wider">
                          {milestone.phase}
                        </span>
                        <span className="font-mono text-[0.65rem] text-[#64748B] tracking-wider uppercase">
                          {milestone.subtitle}
                        </span>
                      </div>

                      <h3 className="font-display font-light text-xl sm:text-2xl text-[#0F172A] uppercase mb-3 leading-snug">
                        {milestone.title}
                      </h3>

                      <p className="font-display font-light text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                        {milestone.description}
                      </p>

                      {/* Telemetry Metrics */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/80 p-3 rounded-sm mb-4">
                        {milestone.telemetry.map((item, tIdx) => (
                          <div key={tIdx} className="text-left">
                            <div className="font-mono text-[0.55rem] text-[#64748B] uppercase tracking-wider truncate">
                              {item.label}
                            </div>
                            <div className="font-display font-normal text-xs sm:text-sm text-[#0F172A] truncate">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Manifest Verification */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {milestone.manifestItems.map((mItem, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" />
                            <span className="font-display font-light text-xs text-[#475569]">
                              {mItem}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
