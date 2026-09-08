'use client';

import React from 'react';

interface AtmosphericHorizonProps {
  label?: string;
  sublabel?: string;
  chapter?: string;
  waypoint?: string;
  coordinates?: string;
}

export default function AtmosphericHorizon({
  label = 'CONTINUOUS FREIGHT CORRIDOR',
  sublabel = 'ORBITAL TELEMETRY LINKED // LEVEL 4 HIGHWAY',
  chapter = '01',
  waypoint = 'USA',
  coordinates = '38.8951° N  77.0364° W',
}: AtmosphericHorizonProps) {
  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none py-4 bg-transparent">
      {/* Outer Horizon Panoramic Stage */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: Atmospheric Curve SVG (Exact reproduction of the reference curve) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Deep Space Radial Dome Gradient */}
            <radialGradient
              id={`spaceDome-${chapter}`}
              cx="50%"
              cy="-15%"
              r="75%"
              fx="50%"
              fy="-15%"
            >
              <stop offset="0%" stopColor="#02040a" />
              <stop offset="28%" stopColor="#060e24" />
              <stop offset="48%" stopColor="#0d2463" />
              <stop offset="68%" stopColor="#1e40af" />
              <stop offset="82%" stopColor="#38bdf8" />
              <stop offset="94%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#ffffff" />
            </radialGradient>

            {/* Intense Atmospheric Rim Glow */}
            <radialGradient
              id={`rimGlow-${chapter}`}
              cx="50%"
              cy="0%"
              r="85%"
              fx="50%"
              fy="0%"
            >
              <stop offset="0%" stopColor="#030712" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#0a1b4d" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#1d4ed8" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="92%" stopColor="#e0f2fe" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Linear Light Bleed to pure white at bottom */}
            <linearGradient
              id={`fadeToWhite-${chapter}`}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="95%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            {/* Filter for atmospheric blur */}
            <filter id={`atmoBlur-${chapter}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="18" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Space Background Arc */}
          <rect width="1440" height="420" fill="#ffffff" />

          {/* Curved Horizon Body (Dipping downward gracefully across center) */}
          <path
            d="M -100 -50 L 1540 -50 L 1540 80 Q 720 250 -100 80 Z"
            fill={`url(#spaceDome-${chapter})`}
          />

          {/* Atmospheric Glow Diffusion Ring */}
          <path
            d="M -100 -50 L 1540 -50 L 1540 120 Q 720 310 -100 120 Z"
            fill={`url(#rimGlow-${chapter})`}
            style={{ mixBlendMode: 'screen', opacity: 0.85 }}
          />

          {/* Bottom Bleed to Page Surface */}
          <rect width="1440" height="420" fill={`url(#fadeToWhite-${chapter})`} />
        </svg>

        {/* Layer 2: Subtle Atmospheric Mist Overlay */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 55% at 50% 35%, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.18) 45%, rgba(255, 255, 255, 0) 80%)',
            filter: 'blur(35px)',
          }}
        />

        {/* Layer 3: Left Coordinate / Satellite Ping Node (Exact match to reference) */}
        <div className="absolute left-[8%] sm:left-[14%] md:left-[22%] lg:left-[28%] top-[46%] sm:top-[48%] md:top-[52%] -translate-y-1/2 flex items-center gap-3 pointer-events-auto z-20">
          {/* Amber Telemetry Pinpoint */}
          <div className="relative flex items-center justify-center w-7 h-7">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 duration-1000" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b]" />
            <div className="absolute w-7 h-7 rounded-full border border-amber-500/35" />
          </div>

          {/* Coordinate Readout */}
          <div className="flex flex-col select-none">
            <span className="font-mono text-[0.68rem] text-slate-800 font-semibold tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              {waypoint}
            </span>
            <span className="font-mono text-[0.58rem] text-slate-600 font-medium tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              {coordinates}
            </span>
          </div>
        </div>

        {/* Layer 4: Right Vertical Award / Verified Artery Ribbon (From reference) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center pointer-events-auto z-20">
          <div className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-3 py-6 shadow-md transition-all flex items-center justify-center rounded-l-sm cursor-default">
            <span 
              className="font-mono text-[0.62rem] font-medium tracking-[0.22em] uppercase text-white whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              LOGILANE // ARTERY {chapter}
            </span>
          </div>
        </div>

        {/* Layer 5: Center Architectural Chapter Marker Badge */}
        <div className="relative z-20 flex flex-col items-center text-center mt-20 sm:mt-24 md:mt-32 px-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.06)] rounded-full mb-2.5 transition-transform hover:scale-105">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shadow-[0_0_6px_#2563EB]" />
            <span className="font-mono text-[0.68rem] text-slate-800 font-medium tracking-widest uppercase">
              CHAPTER {chapter} // {label}
            </span>
          </div>
          <span className="font-mono text-[0.62rem] text-slate-500 uppercase tracking-widest">
            {sublabel}
          </span>
        </div>

      </div>
    </div>
  );
}
