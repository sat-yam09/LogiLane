'use client';

import React from 'react';
import TextReveal from './TextReveal';

export default function Footer() {
  return (
    <footer className="bg-[#090D16] border-t border-slate-800/80 text-slate-300 pt-16 pb-14 px-6 sm:px-12 md:px-16 lg:px-24 font-display font-normal text-xs select-none">
      <div className="max-w-7xl mx-auto">
        {/* Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-slate-800/80">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-sm shadow-sm">
                <span className="font-mono text-[0.7rem] font-bold">L8</span>
              </div>
              <TextReveal as="span" delay={0.1} className="font-display font-semibold text-base text-white uppercase tracking-[-1px]">
                LOGILANE
              </TextReveal>
            </div>
            <p className="font-display font-normal text-xs text-slate-400 leading-relaxed max-w-sm mb-6 tracking-[-0.3px]">
              Autonomous Heavy Freight Logistics & Class-8 Motorway Corridor Architecture. Purpose-built for 24/7 continuous commercial velocity.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Corridors
            </div>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#terminal" className="hover:text-white transition-colors">ORD ↔ DFW Spine</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">LAX ↔ PHX Gateway</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">SEA ↔ SLC Mountain</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">ATL ↔ MIA Coastal</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Hardware
            </div>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#awards" className="hover:text-white transition-colors">Titan-8 Prime Mover</a></li>
              <li><a href="#awards" className="hover:text-white transition-colors">Solid-State LiDAR Array</a></li>
              <li><a href="#awards" className="hover:text-white transition-colors">Platoon Aerodynamics</a></li>
              <li><a href="#awards" className="hover:text-white transition-colors">Cryo-Pod Telemetry</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Compliance
            </div>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#terminal" className="hover:text-white transition-colors">DOT / FMVSS Level 4</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">Kingpin Sensor Spec</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">Zero-Fatigue Safety</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">Carrier Agreement</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Meta Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.7rem] text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} LOGILANE FLEET SYSTEMS CORP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY PROTOCOL</span>
            <span className="hover:text-white cursor-pointer transition-colors">TERMS OF INGRESS</span>
            <span className="hover:text-white cursor-pointer transition-colors">SECURITY DISCLOSURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
