'use client';

import React from 'react';

export default function StatsSection() {
  const stats = [
    {
      id: 'on-time',
      value: '99.98%',
      label: 'On-Time Autonomous Transit',
      sublabel: 'OVER 140,000 DISPATCH RUNS ACROSS NATIONAL FREIGHT ARTERIES'
    },
    {
      id: 'miles',
      value: '42.5M+',
      label: 'Autonomous Miles Logged',
      sublabel: 'CONTINUOUS LEVEL 4 HIGHWAY TRANSIT'
    },
    {
      id: 'drag',
      value: '-34%',
      label: 'Aerodynamic Drag & Energy Reduction',
      sublabel: 'ACTIVE PLATOON COUPLING VS STANDARD CLASS-8 DIESEL'
    },
    {
      id: 'dwell',
      value: '< 14s',
      label: 'Average Terminal Dock Turnaround',
      sublabel: 'AUTOMATED KINGPIN DECOUPLING AND DOCK ALLOCATION'
    }
  ];

  return (
    <section className="relative bg-[#F8FAFC] py-32 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden border-t border-b border-slate-200/80">
      {/* Subtle Sky Blue Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="clean-panel p-8 sm:p-12 rounded-sm text-left flex flex-col justify-between bg-white border border-slate-200 shadow-sm"
            >
              <div>
                <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-6 font-medium">
                  BENCHMARK 0{index + 1}
                </div>

                <div className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight mb-4">
                  {stat.value}
                </div>

                <div className="font-display font-normal text-base sm:text-lg text-[#0F172A] mb-3">
                  {stat.label}
                </div>
              </div>

              <div className="font-mono text-xs text-slate-600 font-medium uppercase tracking-wider pt-6 border-t border-slate-100 mt-6">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
