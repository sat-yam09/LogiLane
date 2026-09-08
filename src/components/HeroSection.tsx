'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from './TextReveal';

export default function HeroSection() {
  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden select-none bg-[#FFFFFF]">
      {/* High-Definition Full Canyon & Truck Picture - 100% HD & Crystal Clear */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-truck-canyon.jpg"
          alt="Autonomous Heavy Freight Transport in Canyon"
          className="w-full h-full object-cover object-[center_38%] md:object-center filter contrast-[1.03] brightness-[1.0] scale-100"
        />
        {/* Targeted soft feathered light halo strictly behind the text on the left — leaves the truck, road, and canyon in full crystal-clear HD */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 65% 60% at 20% 42%, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.45) 45%, rgba(255, 255, 255, 0) 80%)'
          }}
        />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-3xl my-auto pt-4 flex flex-col items-start text-left">
        {/* Headline with SplitText Kinetic Line & Word Mask Reveal */}
        <TextReveal
          as="h1"
          className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] text-[#0F172A] tracking-[-1px] leading-[1.08] mb-5"
          delay={0.25}
          duration={1}
          stagger={0.06}
          highlightWords={['velocity']}
          highlightColor="#263EFF"
        >
          Digital logistics, Flawless velocity.
        </TextReveal>

        {/* Subtitle with SplitText Reveal */}
        <TextReveal
          as="p"
          className="font-display font-normal text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-xl mb-8 tracking-[-0.5px]"
          delay={0.65}
          duration={0.9}
          stagger={0.02}
        >
          Autonomous heavy freight corridors, precision intermodal supply chains, and zero-dwell commercial transport.
        </TextReveal>

        {/* Action Buttons (Clean & Minimal) */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <a
            href="#terminal"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0F172A] text-white font-display text-sm font-medium tracking-[-0.5px] hover:bg-[#263EFF] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Get Instant Quote</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </a>

          <a
            href="#awards"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/90 backdrop-blur-sm text-[#0F172A] border border-slate-300 font-display text-sm font-medium tracking-[-0.5px] hover:bg-white hover:border-slate-400 transition-all duration-300 shadow-2xs"
          >
            <span>View Services</span>
          </a>
        </div>
      </div>
    </section>
  );
}
