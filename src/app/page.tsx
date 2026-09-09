'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CorridorInsights from '@/components/CorridorInsights';
import ServicesAwardList from '@/components/ServicesAwardList';
import PartnersSection from '@/components/PartnersSection';
import DispatchTerminal from '@/components/DispatchTerminal';

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFFFFF]">
      {/* 03 Hero Section with High-Definition Side-Faced Truck & 11x Layout */}
      <HeroSection />

      {/* 03.5 About Section: Sticky Imagery, Word-by-Word Text Reveal & Rolling Shipment Telemetry */}
      <AboutSection />

      {/* 03.6 Corridor Insights — Placeholder Interactive Section */}
      <CorridorInsights />

      {/* 04 Services Corridor: Award List Hover (Direction-aware flip + stacked corner preview) */}
      <ServicesAwardList />

      {/* 04.5 Global Carrier Alliances & Partners (Airlines + Shipping Lines) */}
      <PartnersSection />

      {/* Carrier Ingress & Terminal Access Console */}
      <DispatchTerminal />
    </div>
  );
}
