'use client';

import React, { useState } from 'react';
import { CORRIDOR_ROUTES } from '../lib/constants';
import AtmosphericHorizon from './AtmosphericHorizon';
import { Clock, Leaf, FileText, Check, ArrowRight } from 'lucide-react';

export default function RouteSimulator() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(CORRIDOR_ROUTES[0].id);
  const [payloadTonnage, setPayloadTonnage] = useState<number>(64000);
  const [manifestGenerated, setManifestGenerated] = useState<boolean>(false);

  const currentRoute = CORRIDOR_ROUTES.find((r) => r.id === selectedRouteId) || CORRIDOR_ROUTES[0];
  const timeSavedHours = (currentRoute.dieselHours - currentRoute.autonomousHours).toFixed(1);

  const handleGenerateManifest = () => {
    setManifestGenerated(true);
    setTimeout(() => {
      setManifestGenerated(false);
    }, 6000);
  };

  return (
    <section id="simulator" className="relative bg-[#FFFFFF] py-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
      {/* Chapter Break 04: Signature Atmospheric Horizon Divider */}
      <AtmosphericHorizon
        chapter="04"
        label="CORRIDOR DISPATCH SIMULATOR"
        sublabel="REAL-TIME INTERSTATE FREIGHT ENVELOPE CALCULATION"
        waypoint="ATL ↔ MIA"
        coordinates="33.7490° N  84.3880° W"
      />

      <div className="max-w-7xl mx-auto pt-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-3">
            Interstate Dispatch Envelope
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-[#0F172A] uppercase tracking-tight leading-tight mb-4">
            Simulate Freight <br />
            <span className="text-[#263EFF] font-medium">Transit Velocity.</span>
          </h2>
          <p className="font-display font-normal text-sm md:text-base text-slate-700 leading-relaxed">
            Select a verified autonomous corridor to calculate continuous transit velocity, carbon offsets, and regulatory safety compliance.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Route Selection */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs text-[#64748B] uppercase tracking-wider mb-2">
              SELECT FREIGHT ARTERY:
            </div>

            {CORRIDOR_ROUTES.map((route) => {
              const isSelected = route.id === selectedRouteId;

              return (
                <button
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`w-full text-left p-5 rounded-sm border transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#2563EB] shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                  data-cursor="view"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#0F172A] font-semibold">
                      <span>{route.originCode}</span>
                      <ArrowRight className="w-3 h-3 text-[#2563EB]" />
                      <span>{route.destCode}</span>
                    </div>
                    <span className="font-mono text-[0.62rem] text-[#2563EB] font-medium uppercase px-2 py-0.5 bg-blue-100/70 rounded-xs">
                      {route.corridorStatus}
                    </span>
                  </div>

                  <div className="font-display font-normal text-base text-[#0F172A] mb-1">
                    {route.origin.split(' ')[0]} to {route.destination.split(' ')[0]}
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[0.68rem] text-[#64748B]">
                    <span>{route.distanceMiles} MILES</span>
                    <span>•</span>
                    <span className="text-[#0F172A] font-medium">{route.autonomousHours} HRS AUTONOMOUS</span>
                  </div>
                </button>
              );
            })}

            {/* Payload Slider */}
            <div className="clean-panel p-5 rounded-sm mt-6 bg-white border border-slate-200">
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="text-[#64748B] uppercase">PAYLOAD WEIGHT:</span>
                <span className="text-[#0F172A] font-semibold">{payloadTonnage.toLocaleString()} LBS</span>
              </div>
              <input
                type="range"
                min="20000"
                max="80000"
                step="2000"
                value={payloadTonnage}
                onChange={(e) => setPayloadTonnage(Number(e.target.value))}
                className="w-full accent-[#2563EB] bg-slate-200 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[0.62rem] text-[#64748B] mt-2">
                <span>20,000 LBS (EMPTY)</span>
                <span>80,000 LBS (MAX GVWR)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Telemetry Readout */}
          <div className="lg:col-span-7">
            <div className="clean-panel p-8 sm:p-10 rounded-sm h-full flex flex-col justify-between bg-white border border-slate-200 shadow-sm">
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-5 mb-8 gap-2">
                  <div>
                    <span className="font-mono text-[0.62rem] text-[#64748B] uppercase tracking-wider block mb-1">
                      CORRIDOR PROFILE
                    </span>
                    <h3 className="font-display font-light text-2xl text-[#0F172A]">
                      {currentRoute.origin} → {currentRoute.destination}
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-[#2563EB] bg-blue-50 px-3.5 py-1.5 border border-blue-200 rounded-sm font-medium">
                    PLATOON SYNC: {currentRoute.platoonEfficiency}
                  </div>
                </div>

                {/* Transit Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm">
                    <div className="flex items-center gap-1.5 font-mono text-[0.62rem] text-[#0F172A] uppercase mb-2 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>AUTONOMOUS</span>
                    </div>
                    <div className="font-display font-light text-3xl text-[#0F172A]">
                      {currentRoute.autonomousHours} <span className="text-xs font-mono text-[#64748B]">HRS</span>
                    </div>
                    <div className="font-mono text-[0.62rem] text-[#64748B] mt-1.5">
                      NON-STOP CRUISE
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm">
                    <div className="flex items-center gap-1.5 font-mono text-[0.62rem] text-[#64748B] uppercase mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>DIESEL</span>
                    </div>
                    <div className="font-display font-light text-3xl text-[#64748B]">
                      {currentRoute.dieselHours} <span className="text-xs font-mono text-[#94A3B8]">HRS</span>
                    </div>
                    <div className="font-mono text-[0.62rem] text-[#94A3B8] mt-1.5">
                      MANDATED REST
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200 p-5 rounded-sm">
                    <div className="flex items-center gap-1.5 font-mono text-[0.62rem] text-emerald-700 uppercase mb-2 font-semibold">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>CARBON OFFSET</span>
                    </div>
                    <div className="font-display font-light text-3xl text-emerald-700">
                      -{currentRoute.co2SavedKg} <span className="text-xs font-mono text-emerald-600">KG</span>
                    </div>
                    <div className="font-mono text-[0.62rem] text-emerald-600 mt-1.5">
                      NET REDUCTION
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3 font-mono text-xs border-t border-slate-100 pt-6 mb-8">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span>TRANSIT VELOCITY SAVINGS:</span>
                    <span className="text-[#0F172A] font-semibold">+{timeSavedHours} HOURS FASTER</span>
                  </div>
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span>PROJECTED ENERGY CONSUMPTION:</span>
                    <span className="text-[#0F172A] font-semibold">
                      {((currentRoute.distanceMiles * 1.92 * (payloadTonnage / 80000))).toFixed(0)} KWH TOTAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {manifestGenerated ? (
                  <div className="bg-slate-50 border border-slate-300 p-5 rounded-sm font-mono text-xs text-[#0F172A]">
                    <div className="flex items-center gap-2 text-[#0F172A] mb-2 font-medium">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>CRYPTOGRAPHIC MANIFEST HASH GENERATED:</span>
                    </div>
                    <div className="text-[0.68rem] text-slate-700 break-all bg-white p-2.5 rounded-sm border border-slate-200 font-mono shadow-2xs">
                      0x8f2a99d4c810bb73e9140fa923019cf88219ae08891d440c9927b8e19c00bdf1 • {currentRoute.originCode}-{currentRoute.destCode}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateManifest}
                    className="btn-magnetic w-full"
                    data-cursor="dispatch"
                  >
                    <FileText className="w-4 h-4 text-[#B3122E]" />
                    <span>Generate Digital Route Manifest</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
