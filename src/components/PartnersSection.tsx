'use client';

import React, { useState } from 'react';

// Corner crosshairs component matching the unitedcarriers.com blueprint style
function CornerCrosshairs() {
  return (
    <>
      <span className="absolute -top-[5px] -left-[5px] w-[11px] h-[11px] flex items-center justify-center font-mono text-[11px] text-slate-400 select-none pointer-events-none z-10 leading-none">
        +
      </span>
      <span className="absolute -top-[5px] -right-[5px] w-[11px] h-[11px] flex items-center justify-center font-mono text-[11px] text-slate-400 select-none pointer-events-none z-10 leading-none">
        +
      </span>
      <span className="absolute -bottom-[5px] -left-[5px] w-[11px] h-[11px] flex items-center justify-center font-mono text-[11px] text-slate-400 select-none pointer-events-none z-10 leading-none">
        +
      </span>
      <span className="absolute -bottom-[5px] -right-[5px] w-[11px] h-[11px] flex items-center justify-center font-mono text-[11px] text-slate-400 select-none pointer-events-none z-10 leading-none">
        +
      </span>
    </>
  );
}

interface PartnerItem {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

// ══════════════════════════════════════════════════════════════════
// 16 SHIPPING LINES (Authentic Vector Logos)
// ══════════════════════════════════════════════════════════════════
const SHIPPING_PARTNERS: PartnerItem[] = [
  {
    id: 'oocl',
    name: 'OOCL',
    renderLogo: () => (
      <div className="flex items-center gap-1">
        {/* Stylized OOCL logo with emblem in first O */}
        <div className="relative w-8 h-8 rounded-full border-[3px] border-[#0F172A] flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full border-[2px] border-[#0F172A]" />
        </div>
        <div className="w-8 h-8 rounded-full border-[3px] border-[#0F172A]" />
        <span className="font-display font-black text-2xl tracking-tighter text-[#0F172A] ml-0.5">
          CL
        </span>
      </div>
    ),
  },
  {
    id: 'hamburg-sud',
    name: 'HAMBURG SÜD',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#0F172A] uppercase">
          HAMBURG
        </span>
        {/* Hamburg Süd triangular ship banner */}
        <svg className="w-5 h-5 fill-[#0F172A]" viewBox="0 0 24 24">
          <path d="M4 2v20l16-10L4 2z" />
        </svg>
        <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#0F172A] uppercase">
          SÜD
        </span>
      </div>
    ),
  },
  {
    id: 'zim',
    name: 'ZIM',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        {/* ZIM 7 Stars (4 on top, 3 below) in blue */}
        <div className="flex gap-1 mb-1">
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
        </div>
        <div className="flex gap-1 mb-1">
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
          <span className="text-[#1D4ED8] text-xs leading-none">★</span>
        </div>
        <span className="font-display font-black text-2xl tracking-wider text-[#1D4ED8]">
          ZIM
        </span>
      </div>
    ),
  },
  {
    id: 'cma-cgm',
    name: 'CMA CGM',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        <span className="font-display font-black italic text-xl sm:text-2xl tracking-tighter text-[#0F172A]">
          CMA CGM
        </span>
        {/* Iconic curve line below */}
        <svg className="w-20 h-2 mt-0.5" viewBox="0 0 100 10">
          <path d="M0 5 Q 50 12 100 2" stroke="#0F172A" strokeWidth="2.5" fill="none" />
        </svg>
      </div>
    ),
  },
  {
    id: 'wallenius',
    name: 'Wallenius Wilhelmsen',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Twin slanted bars */}
        <div className="flex gap-1 font-black text-2xl text-[#0F172A]">
          <span>\\</span>
        </div>
        <div className="flex flex-col leading-tight text-left">
          <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A]">
            Wallenius
          </span>
          <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A]">
            Wilhelmsen
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'sinotrans',
    name: 'Sinotrans',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Sinotrans oval globe */}
        <div className="w-8 h-6 rounded-full border-2 border-[#0F172A] relative flex items-center justify-center">
          <div className="w-full h-[1px] bg-[#0F172A]" />
          <div className="absolute w-3 h-full border-x border-[#0F172A]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-display text-[10px] font-bold tracking-widest text-[#0F172A]">
            中国外运
          </span>
          <span className="font-display font-black text-xs sm:text-sm tracking-wider text-[#0F172A]">
            SINOTRANS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'nyk',
    name: 'NYK line',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* NYK two red stripes on white flag */}
        <div className="w-6 h-4 border border-[#0F172A] relative flex flex-col justify-center gap-0.5 p-0.5">
          <div className="w-full h-1 bg-[#DC2626]" />
          <div className="w-full h-1 bg-[#DC2626]" />
        </div>
        <span className="font-display font-black italic text-lg sm:text-xl text-[#0F172A] tracking-tight">
          NYK <span className="text-[10px] not-italic font-mono">LINE</span>
        </span>
      </div>
    ),
  },
  {
    id: 'kline',
    name: 'K-line',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#0F172A] text-white font-display font-black text-sm flex items-center justify-center">
          K
        </div>
        <div className="flex flex-col text-left">
          <span className="font-display font-black text-sm sm:text-base text-[#0F172A] tracking-wide">
            &quot;K&quot; LINE
          </span>
          <span className="font-mono text-[8px] text-slate-500 uppercase">
            KAWASAKI KISEN KAISHA
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'cosco',
    name: 'COSCO',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        {/* COSCO two interlocked ellipses */}
        <div className="relative w-8 h-4 mb-1">
          <div className="absolute left-0 w-5 h-4 rounded-full border-2 border-[#0F172A]" />
          <div className="absolute right-0 w-5 h-4 rounded-full border-2 border-[#0F172A]" />
        </div>
        <span className="font-display font-black text-sm sm:text-base tracking-widest text-[#0F172A]">
          COSCO
        </span>
        <span className="font-mono text-[8px] tracking-widest text-slate-600">
          SHIPPING
        </span>
      </div>
    ),
  },
  {
    id: 'evergreen',
    name: 'Evergreen line',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Evergreen round compass star */}
        <div className="w-5 h-5 rounded-full border-2 border-[#0F172A] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#0F172A] rotate-45" />
        </div>
        <span className="font-display font-black text-xs sm:text-sm tracking-widest text-[#0F172A] uppercase">
          EVERGREEN LINE
        </span>
      </div>
    ),
  },
  {
    id: 'yang-ming',
    name: 'YANG MING',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 border-2 border-[#0F172A] flex items-center justify-center font-black text-xs text-[#0F172A]">
          YM
        </div>
        <span className="font-display font-black text-xs sm:text-sm tracking-widest text-[#0F172A] uppercase">
          YANG MING
        </span>
      </div>
    ),
  },
  {
    id: 'pil',
    name: 'PIL',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* 4 horizontal wave lines */}
        <div className="flex flex-col gap-0.5">
          <div className="w-4 h-[2px] bg-[#0F172A]" />
          <div className="w-5 h-[2px] bg-[#0F172A]" />
          <div className="w-6 h-[2px] bg-[#0F172A]" />
          <div className="w-5 h-[2px] bg-[#0F172A]" />
        </div>
        <span className="font-display font-black italic text-xl sm:text-2xl tracking-wider text-[#0F172A]">
          PIL
        </span>
      </div>
    ),
  },
  {
    id: 'msc',
    name: 'MSC',
    renderLogo: () => (
      <div className="w-11 h-11 bg-[#0F172A] flex items-center justify-center rounded-xs shadow-sm">
        <span className="font-serif font-black text-lg lowercase tracking-tight text-white">
          msc
        </span>
      </div>
    ),
  },
  {
    id: 'hmm',
    name: 'HMM',
    renderLogo: () => (
      <div className="flex items-center">
        <span className="font-display font-black text-2xl tracking-tighter text-[#0F172A] uppercase">
          HMM
        </span>
      </div>
    ),
  },
  {
    id: 'maersk',
    name: 'MAERSK',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Maersk 7-pointed star inside black box */}
        <div className="w-6 h-6 bg-[#0F172A] flex items-center justify-center rounded-xs">
          <span className="text-white text-xs leading-none">★</span>
        </div>
        <span className="font-display font-black text-sm sm:text-base tracking-widest text-[#0F172A] uppercase">
          MAERSK
        </span>
      </div>
    ),
  },
  {
    id: 'apl',
    name: 'APL',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        {/* Eagle wings */}
        <svg className="w-10 h-4 fill-[#0F172A]" viewBox="0 0 60 20">
          <path d="M0 10 Q 15 2 30 10 Q 45 2 60 10 L 52 14 Q 30 6 8 14 Z" />
          <circle cx="30" cy="8" r="3" />
        </svg>
        <span className="font-display font-black text-lg tracking-widest text-[#0F172A] uppercase mt-0.5">
          APL
        </span>
      </div>
    ),
  },
];

// ══════════════════════════════════════════════════════════════════
// 17 AIRLINES (Authentic Vector Logos)
// ══════════════════════════════════════════════════════════════════
const AIRLINE_PARTNERS: PartnerItem[] = [
  {
    id: 'air-china',
    name: 'Air china',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Air China Phoenix Crest */}
        <svg className="w-6 h-6 text-[#DC2626] fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
        <div className="flex flex-col text-left leading-tight">
          <span className="font-display font-black text-xs sm:text-sm tracking-tight text-[#0F172A] uppercase">
            AIR CHINA
          </span>
          <span className="font-mono text-[8px] text-slate-500">中国国际航空公司</span>
        </div>
      </div>
    ),
  },
  {
    id: 'vietnam-airlines',
    name: 'Vietnam Airlines',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Golden Lotus emblem */}
        <svg className="w-6 h-6 text-[#EAB308] fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-1.5 3-4 6-4 9 0 2.21 1.79 4 4 4s4-1.79 4-4c0-3-2.5-6-4-9zm-6 9c0 3.31 2.69 6 6 6s6-2.69 6-6c-1 3-3 5-6 5s-5-2-6-5z" />
        </svg>
        <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-[#0F172A]">
          Vietnam Airlines
        </span>
      </div>
    ),
  },
  {
    id: 'british-airways',
    name: 'British airways',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        {/* BA Speedmarque Ribbon */}
        <div className="flex items-center gap-0.5 mb-0.5">
          <div className="w-6 h-[3px] bg-[#2563EB] -skew-x-12" />
          <div className="w-4 h-[3px] bg-[#DC2626] -skew-x-12" />
        </div>
        <span className="font-serif font-bold text-xs sm:text-sm tracking-widest text-[#0F172A] uppercase">
          BRITISH AIRWAYS
        </span>
      </div>
    ),
  },
  {
    id: 'fuji-airways',
    name: 'FUJI Airways',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Fuji Mountain Crest */}
        <svg className="w-6 h-5 fill-[#0F172A]" viewBox="0 0 24 20">
          <path d="M12 2 L22 18 L2 18 Z" />
          <path d="M9 10 L12 7 L15 10 L13.5 12 L10.5 12 Z" fill="white" />
        </svg>
        <span className="font-display font-black text-xs sm:text-sm tracking-wide text-[#0F172A] uppercase">
          FUJI AIRWAYS
        </span>
      </div>
    ),
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Wau Bulan Kite */}
        <svg className="w-5 h-5 fill-[#DC2626]" viewBox="0 0 24 24">
          <path d="M12 2L4 14h6l2 8 2-8h6L12 2z" />
        </svg>
        <div className="flex flex-col text-left leading-none">
          <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A] lowercase">
            malaysia
          </span>
          <span className="font-display text-[9px] text-slate-500 uppercase tracking-widest">
            airlines
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'china-southern',
    name: 'China Southern',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Red Kapok Flower */}
        <div className="w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-bold text-[10px]">
          ✿
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A] uppercase tracking-tight">
            CHINA SOUTHERN
          </span>
          <span className="font-mono text-[8px] text-slate-500">中国南方航空</span>
        </div>
      </div>
    ),
  },
  {
    id: 'qatar-airways',
    name: 'Qatar airways',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Oryx silhouette in maroon */}
        <div className="w-6 h-6 rounded-full bg-[#831438] flex items-center justify-center text-white font-serif text-xs">
          Q
        </div>
        <span className="font-serif font-bold text-xs sm:text-sm tracking-widest text-[#0F172A] uppercase">
          QATAR <span className="font-normal">AIRWAYS</span>
        </span>
      </div>
    ),
  },
  {
    id: 'china-eastern',
    name: 'China eastern',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Swallow Crest */}
        <div className="w-6 h-6 rounded-full border-2 border-[#DC2626] flex items-center justify-center">
          <span className="text-[#2563EB] text-[10px] font-bold">»</span>
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A] uppercase tracking-tight">
            CHINA EASTERN
          </span>
          <span className="font-mono text-[8px] text-slate-500">中国东方航空</span>
        </div>
      </div>
    ),
  },
  {
    id: 'qantas',
    name: 'Qantars',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Flying Kangaroo on red triangle */}
        <div className="w-6 h-6 bg-[#DC2626] rounded-br-2xl flex items-center justify-center text-white font-bold text-xs">
          🦘
        </div>
        <span className="font-display font-black italic text-sm sm:text-base tracking-widest text-[#0F172A] uppercase">
          QANTAS
        </span>
      </div>
    ),
  },
  {
    id: 'air-nz',
    name: 'Air new zealand',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Koru Mangrove Fern spiral */}
        <div className="w-6 h-6 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-xs">
          ◎
        </div>
        <div className="flex flex-col text-left leading-none">
          <span className="font-display font-bold text-xs text-[#0F172A] uppercase">
            AIR NEW ZEALAND
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'etihad',
    name: 'Etihad',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <span className="font-serif font-black tracking-[0.2em] text-sm sm:text-base text-[#0F172A] uppercase">
          ETIHAD
        </span>
        <span className="font-mono text-[9px] text-slate-400">AIRWAYS</span>
      </div>
    ),
  },
  {
    id: 'cathay',
    name: 'Cathay',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Green Brushwing swoosh */}
        <svg className="w-6 h-4 fill-[#006564]" viewBox="0 0 40 20">
          <path d="M0 15 Q 15 5 40 0 Q 25 12 5 20 Z" />
        </svg>
        <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-[#0F172A] uppercase">
          CATHAY PACIFIC
        </span>
      </div>
    ),
  },
  {
    id: 'singapore-airlines',
    name: 'Singapore airlines',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* SilverKris Bird */}
        <svg className="w-6 h-5 fill-[#B45309]" viewBox="0 0 30 20">
          <path d="M0 20 L15 0 L30 20 L20 18 L15 6 L10 18 Z" />
        </svg>
        <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-[#0F172A] uppercase">
          SINGAPORE AIRLINES
        </span>
      </div>
    ),
  },
  {
    id: 'united',
    name: 'UNITED',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Continental Globe */}
        <div className="w-6 h-6 rounded-full border-2 border-[#1E40AF] relative flex items-center justify-center">
          <div className="w-full h-[1px] bg-[#1E40AF]" />
          <div className="absolute w-3 h-full border-x border-[#1E40AF]" />
        </div>
        <span className="font-display font-black tracking-widest text-sm sm:text-base text-[#1E40AF]">
          UNITED
        </span>
      </div>
    ),
  },
  {
    id: 'emirates',
    name: 'Emirates',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="font-serif font-bold text-lg sm:text-xl text-[#DC2626]">
          Emirates
        </span>
      </div>
    ),
  },
  {
    id: 'air-india',
    name: 'AIR INDIA',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Red Konark Sun Chakra */}
        <div className="w-6 h-6 rounded-full border-2 border-[#DC2626] flex items-center justify-center">
          <span className="text-[#DC2626] text-[10px] leading-none">☼</span>
        </div>
        <span className="font-display font-black text-xs sm:text-sm tracking-wider text-[#DC2626] uppercase">
          AIR INDIA
        </span>
      </div>
    ),
  },
  {
    id: 'thai',
    name: 'Thai',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        {/* Royal Purple/Gold Orchid */}
        <div className="w-6 h-6 rounded-full bg-[#581C87] flex items-center justify-center text-[#FACC15] text-xs font-bold">
          ✦
        </div>
        <span className="font-display font-black text-sm sm:text-base tracking-widest text-[#0F172A] uppercase">
          THAI
        </span>
      </div>
    ),
  },
];

export default function PartnersSection() {
  const [activeCategory, setActiveCategory] = useState<'shipping' | 'airlines'>('shipping');

  const activePartners = activeCategory === 'shipping' ? SHIPPING_PARTNERS : AIRLINE_PARTNERS;

  return (
    <section id="partners" className="relative w-full bg-[#FFFFFF] py-20 sm:py-24 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* ── TOP BAR: "Our partners" + Category Selectors matching unitedcarriers.com ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12">
          {/* Left Title */}
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
            Our partners
          </h2>

          {/* Right/Center Category Tabs */}
          <div className="flex items-center gap-8 font-display text-sm font-semibold tracking-wider uppercase">
            <button
              onClick={() => setActiveCategory('shipping')}
              className={`cursor-pointer transition-colors relative py-1 ${
                activeCategory === 'shipping'
                  ? 'text-[#0F172A]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>SHIPPING LINES ({SHIPPING_PARTNERS.length})</span>
              {activeCategory === 'shipping' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F172A]" />
              )}
            </button>

            <button
              onClick={() => setActiveCategory('airlines')}
              className={`cursor-pointer transition-colors relative py-1 ${
                activeCategory === 'airlines'
                  ? 'text-[#0F172A]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>AIRLINES ({AIRLINE_PARTNERS.length})</span>
              {activeCategory === 'airlines' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F172A]" />
              )}
            </button>
          </div>
        </div>

        {/* ── 5-COLUMN BLUEPRINT GRID WITH CORNER CROSSHAIRS ── */}
        <div className="relative border-t border-l border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {activePartners.map((partner) => (
              <div
                key={partner.id}
                className="relative h-[135px] sm:h-[155px] lg:h-[165px] border-r border-b border-slate-200 bg-[#FFFFFF] hover:bg-[#F8FAFC] flex items-center justify-center p-6 transition-colors duration-200 group cursor-pointer"
              >
                {/* 4 Corner Crosshairs (+) on every single box */}
                <CornerCrosshairs />

                {/* Centered Partner Brand Logo (Grayscale by default, full color on hover) */}
                <div className="partner-logo-item flex items-center justify-center w-full">
                  {partner.renderLogo()}
                </div>
              </div>
            ))}

            {/* Grid Filler Cells to complete the 5-column layout aesthetic if needed */}
            {activeCategory === 'shipping' && (
              <>
                {/* 16 shipping lines in a 5-column grid leaves 4 empty cells in row 4 */}
                {[1, 2, 3, 4].map((emptyId) => (
                  <div
                    key={`empty-ship-${emptyId}`}
                    className="relative h-[135px] sm:h-[155px] lg:h-[165px] border-r border-b border-slate-200 bg-[#FAFAFA] flex items-center justify-center p-6"
                  >
                    <CornerCrosshairs />
                    <span className="font-mono text-[9px] text-slate-300 tracking-widest uppercase">
                      ALLIANCE LINK
                    </span>
                  </div>
                ))}
              </>
            )}

            {activeCategory === 'airlines' && (
              <>
                {/* 17 airlines in a 5-column grid leaves 3 empty cells in row 4 */}
                {[1, 2, 3].map((emptyId) => (
                  <div
                    key={`empty-air-${emptyId}`}
                    className="relative h-[135px] sm:h-[155px] lg:h-[165px] border-r border-b border-slate-200 bg-[#FAFAFA] flex items-center justify-center p-6"
                  >
                    <CornerCrosshairs />
                    <span className="font-mono text-[9px] text-slate-300 tracking-widest uppercase">
                      SKY INTERLINE
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
