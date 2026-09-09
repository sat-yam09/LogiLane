'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Send, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function DispatchTerminal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    carrierName: '',
    dotNumber: '',
    email: '',
    corridor: 'Chicago (ORD) ↔ Dallas (DFW)',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        carrierName: '',
        dotNumber: '',
        email: '',
        corridor: 'Chicago (ORD) ↔ Dallas (DFW)',
        notes: '',
      });
    }, 5000);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const map = root.querySelector('.map') as HTMLElement;
    const dot = root.querySelector('.dot') as HTMLElement;
    const path = root.querySelector('.path') as SVGPathElement;
    const pov = root.querySelector('.pov') as HTMLElement;
    const povG = root.querySelector('.pov g') as HTMLElement;
    const section = root.querySelector('#s') as HTMLElement;

    if (!map || !dot || !path || !pov || !povG || !section) return;

    // Measure total length of SVG path for 100% reliable stroke-draw animation
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Setup quickTo for smooth camera tracking (exact same as CodePen myOVZYO)
    const xTo = gsap.quickTo(povG, 'x', { duration: 1, ease: 'expo' });
    const yTo = gsap.quickTo(povG, 'y', { duration: 1, ease: 'expo' });

    // GSAP ScrollTrigger timeline matching CodePen myOVZYO
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: map,
        scrub: 1,
      },
      onUpdate: () => {
        xTo(-Number(gsap.getProperty(dot, 'x')));
        yTo(-Number(gsap.getProperty(dot, 'y')));
      },
    })
      .to(dot, { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5] }, immediateRender: true, ease: 'none' }, 0)
      .to(path, { strokeDashoffset: 0, ease: 'none' }, 0)
      .fromTo(pov, { x: 750, y: 750, scale: 2 }, { scale: 4, ease: 'sine.inOut', duration: 0.15, yoyo: true, repeat: 1, repeatDelay: 0.2 }, 0);

    // Initial camera alignment to dot position
    gsap.set(povG, {
      x: -Number(gsap.getProperty(dot, 'x')),
      y: -Number(gsap.getProperty(dot, 'y')),
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <div ref={rootRef} id="terminal" className="relative w-full bg-[#FFFFFF]">
      <section id="s" className="codepen-split-map relative w-full min-h-[200vh] bg-[#FFFFFF]">
        {/* Left Side: Pinned Interactive SVG Map (Exact CodePen Architecture) */}
        <svg
          className="map absolute left-0 top-0 z-[99] w-full lg:w-1/2 h-screen select-none"
          viewBox="0 0 1500 1500"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g className="pov">
            <g stroke="#223e6b" strokeLinecap="round" strokeLinejoin="round">
              <image href="/images/chs_map.jpg" width="1500" height="1500" />
              <path
                className="path"
                strokeWidth="4"
                d="m741.6 937 18-52 2-28 1.7-25-25.7 3.7-1-24-41 8.3-36.7 4.4-51.3 5.3 10.3 19.7 2.7 26.3 98.7-13.2-3-35"
              />
              <circle className="dot-start" r="4" fill="#fff" strokeWidth="2.4" cx="741.6" cy="937" />
              <circle className="dot" r="4" fill="#fff" strokeWidth="2.4" />
            </g>
          </g>
        </svg>

        {/* Right Side: Scrollable Contact & Ingress Section (100% Poppins Typography) */}
        <div className="info relative left-0 lg:left-1/2 w-full lg:w-[45%] p-6 sm:p-10 lg:p-14 text-[#0F172A]">
          
          {/* Section Heading in Poppins SemiBold */}
          <div className="font-mono text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
            LOGILANE // FREIGHT ARTERIAL TERMINAL
          </div>

          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-[#0F172A] uppercase tracking-[-1px] leading-tight mb-6">
            Carrier Ingress & Corridor Access.
          </h1>

          {/* Schedule / Hours Meta */}
          <h4 className="font-display font-medium text-sm sm:text-base text-slate-800 flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-[#223e6b] fill-current shrink-0" viewBox="0 0 448 512">
              <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" />
            </svg>
            <span>24/7 Operations Desk — Active Slot Allocation (US Central Time)</span>
          </h4>

          {/* Location Meta */}
          <h4 className="font-display font-medium text-sm sm:text-base text-slate-800 flex items-center gap-2 mb-6">
            <svg className="w-4 h-4 text-[#223e6b] fill-current shrink-0" viewBox="0 0 384 512">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
            </svg>
            <span>Autonomous Freight Hub: O&apos;Hare Complex // Terminal B, Chicago IL</span>
          </h4>

          {/* Narrative Body Copy in Poppins Regular (400) */}
          <p className="font-display font-normal text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
            Onboard your fleet to Logilane Autonomous Freight Arteries. Gain real-time slot reservation, V2V platoon coupling, and automated dock authorization across our national highway corridors.
          </p>

          <p className="font-display font-normal text-sm sm:text-base text-slate-700 leading-relaxed mb-8">
            As your commercial freight partners, Logilane is on the frontline building dedicated Level 4 motorway infrastructure, automated kingpin decoupling, and zero-dwell terminal access.
          </p>

          {/* Shaded Box (CodePen style in #223e6b with crisp white Poppins text) */}
          <div className="shaded bg-[#223e6b] text-white p-6 sm:p-7 rounded-xl shadow-md mb-10">
            <h3 className="font-display font-semibold text-sm uppercase tracking-[-0.5px] text-white mb-4">
              DISPATCH SCHEDULE & CONTACT HOTLINE:
            </h3>
            <ul className="space-y-4 font-display text-sm text-slate-100">
              <li>
                <b className="font-semibold text-white">24/7 Operations Desk:</b> +1 (800) 582-7490 (Direct Hotline)
              </li>
              <li>
                <b className="font-semibold text-white">Ingress Telemetry:</b> dispatch@logilane.io (Encrypted Channel)
              </li>
              <li>
                <b className="font-semibold text-white">08:00 - 10:00 AM:</b> Kingpin Telemetry Sensor Inspection & Dock Allocation
              </li>
              <li>
                <b className="font-semibold text-white">10:00 - 12:00 PM:</b> Automated EDI / API Key Pair Deployment
              </li>
              <li>
                <b className="font-semibold text-white">12:00 - 04:00 PM:</b> V2V Platoon Coupling on Interstate Arteries
              </li>
            </ul>
          </div>

          {/* Carrier Contact & Ingress Request Form */}
          <div className="mb-10 bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 rounded-xl shadow-2xs">
            <h3 className="font-display font-semibold text-lg text-[#0F172A] uppercase tracking-[-0.5px] mb-2">
              Request Corridor Access Keys
            </h3>
            <p className="font-display font-normal text-xs sm:text-sm text-slate-600 mb-6 tracking-[-0.3px]">
              Enter your fleet credentials to receive automated corridor authorization and API ingress keys.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-lg text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-3" />
                <h4 className="font-display font-semibold text-xl text-[#0F172A] mb-2 tracking-[-0.5px]">
                  Ingress Request Transmitted
                </h4>
                <p className="font-display font-normal text-xs text-slate-600 max-w-sm tracking-[-0.3px]">
                  Key pair request queued for automated safety compliance review. A fleet operations engineer will connect within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-medium text-xs text-[#0F172A] uppercase tracking-[-0.5px] mb-1.5">
                      Carrier Entity:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Apex Freight LLC"
                      value={formData.carrierName}
                      onChange={(e) => setFormData({ ...formData, carrierName: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#223e6b] rounded-md px-3.5 py-3 font-display font-normal text-xs sm:text-sm text-[#0F172A] outline-none transition-colors shadow-2xs tracking-[-0.3px]"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-medium text-xs text-[#0F172A] uppercase tracking-[-0.5px] mb-1.5">
                      USDOT Number:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="USDOT-984210"
                      value={formData.dotNumber}
                      onChange={(e) => setFormData({ ...formData, dotNumber: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#223e6b] rounded-md px-3.5 py-3 font-display font-normal text-xs sm:text-sm text-[#0F172A] outline-none transition-colors shadow-2xs tracking-[-0.3px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-medium text-xs text-[#0F172A] uppercase tracking-[-0.5px] mb-1.5">
                      Enterprise Email:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dispatch@carrier.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#223e6b] rounded-md px-3.5 py-3 font-display font-normal text-xs sm:text-sm text-[#0F172A] outline-none transition-colors shadow-2xs tracking-[-0.3px]"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-medium text-xs text-[#0F172A] uppercase tracking-[-0.5px] mb-1.5">
                      Primary Corridor:
                    </label>
                    <select
                      value={formData.corridor}
                      onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#223e6b] rounded-md px-3.5 py-3 font-display font-normal text-xs sm:text-sm text-[#0F172A] outline-none transition-colors shadow-2xs cursor-pointer tracking-[-0.3px]"
                    >
                      <option value="Chicago (ORD) ↔ Dallas (DFW)">Chicago (ORD) ↔ Dallas (DFW)</option>
                      <option value="Los Angeles (LAX) ↔ Phoenix (PHX)">Los Angeles (LAX) ↔ Phoenix (PHX)</option>
                      <option value="Seattle (SEA) ↔ Salt Lake (SLC)">Seattle (SEA) ↔ Salt Lake (SLC)</option>
                      <option value="Atlanta (ATL) ↔ Miami (MIA)">Atlanta (ATL) ↔ Miami (MIA)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-medium text-xs text-[#0F172A] uppercase tracking-[-0.5px] mb-1.5">
                    Fleet Tonnage / Trailer Specification:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specify trailer types (Dry Van, Reefer) and estimated volume..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#223e6b] rounded-md px-3.5 py-2.5 font-display font-normal text-xs sm:text-sm text-[#0F172A] outline-none transition-colors resize-none shadow-2xs tracking-[-0.3px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-md bg-[#223e6b] hover:bg-[#1a3055] text-white font-display font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer tracking-[-0.5px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ingress Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
