'use client';

import React, { useState } from 'react';
import { FLEET_SPECS } from '../lib/constants';
import AtmosphericHorizon from './AtmosphericHorizon';

export default function FleetSpecsMatrix() {
  const [activeConfig, setActiveConfig] = useState<'titan8' | 'cryo' | 'tandem'>('titan8');

  const configs = [
    {
      id: 'titan8',
      name: 'Titan-8 Autonomous Tractor',
      tag: 'CLASS-8 HEAVY PRIME MOVER',
      gvw: '80,000 LBS GVWR',
      range: '650 MILES',
      efficiency: '1.92 KWH/MI',
    },
    {
      id: 'cryo',
      name: 'Titan-8 Cryo-Reefer Rig',
      tag: 'COLD-CHAIN HERMETIC SPEC',
      gvw: '78,500 LBS GVWR',
      range: '580 MILES',
      efficiency: '2.14 KWH/MI',
    },
    {
      id: 'tandem',
      name: 'Titan-8 Aero Tandem Platoon',
      tag: 'DUAL TRAILER HIGHWAY HAUL',
      gvw: '120,000 LBS GCWR',
      range: '520 MILES',
      efficiency: '1.64 KWH/MI PER TUBE',
    }
  ];

  return (
    <section id="specs" className="relative bg-[#FFFFFF] py-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
      {/* Chapter Break 03: Signature Atmospheric Horizon Divider */}
      <AtmosphericHorizon
        chapter="03"
        label="ENGINEERING BENCHMARKS"
        sublabel="TITAN-8 POWERTRAIN & PERCEPTION MATRIX"
        waypoint="SEA ↔ SLC"
        coordinates="47.6062° N  122.3321° W"
      />

      <div className="max-w-7xl mx-auto pt-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-3">
              Hardware & Perception
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#0F172A] uppercase tracking-tight leading-tight">
              Titan-8 Platform <br />
              <span className="text-slate-400 font-extralight">Architecture.</span>
            </h2>
          </div>

          {/* Config Selector */}
          <div className="flex items-center bg-slate-100 border border-slate-200 p-1 rounded-sm shadow-2xs">
            {configs.map((cfg) => (
              <button
                key={cfg.id}
                onClick={() => setActiveConfig(cfg.id as any)}
                className={`px-4 py-2 font-display text-xs uppercase tracking-wider rounded-sm transition-all ${
                  activeConfig === cfg.id
                    ? 'bg-white text-[#0F172A] border border-slate-200 font-normal shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A] font-light'
                }`}
                data-cursor="view"
              >
                {cfg.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Config Banner */}
        {(() => {
          const current = configs.find(c => c.id === activeConfig)!;
          return (
            <div className="clean-panel p-6 sm:p-8 mb-12 flex flex-wrap items-center justify-between gap-6 bg-white border border-slate-200">
              <div>
                <div className="font-mono text-xs text-[#64748B] tracking-wider uppercase mb-1">
                  {current.tag}
                </div>
                <div className="font-display font-normal text-xl sm:text-2xl text-[#0F172A]">
                  {current.name}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                <div className="bg-slate-50 px-4 py-2 border border-slate-200 rounded-sm">
                  <span className="text-[#64748B] mr-2">PAYLOAD:</span>
                  <span className="text-[#0F172A] font-medium">{current.gvw}</span>
                </div>
                <div className="bg-slate-50 px-4 py-2 border border-slate-200 rounded-sm">
                  <span className="text-[#64748B] mr-2">RANGE:</span>
                  <span className="text-[#0F172A] font-medium">{current.range}</span>
                </div>
                <div className="bg-slate-50 px-4 py-2 border border-slate-200 rounded-sm">
                  <span className="text-[#64748B] mr-2">EFFICIENCY:</span>
                  <span className="text-[#0F172A] font-medium">{current.efficiency}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Engineering Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FLEET_SPECS.map((group, index) => (
            <div key={group.category} className="clean-panel p-6 sm:p-8 rounded-sm bg-white border border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <span className="font-mono text-xs text-[#2563EB] font-semibold">
                  0{index + 1}
                </span>
                <h3 className="font-display font-normal text-sm text-[#0F172A] tracking-wider uppercase">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-4">
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="font-mono text-[0.65rem] text-[#64748B] uppercase tracking-wider mb-1">
                      {item.name}
                    </div>
                    <div className="font-display font-normal text-xs sm:text-sm text-[#0F172A]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
