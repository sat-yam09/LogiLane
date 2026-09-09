'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextReveal from './TextReveal';

interface AwardItem {
  name: string;
  type: string;
  project: string;
  label: string;
  image: string;
}

const AWARDS_DATA: AwardItem[] = [
  { name: 'Class-8 Prime Mover Artery', type: 'Highway Transit', project: 'Titan-8 Autonomous Tractor', label: 'Fleet 01', image: '/images/logistics/truck-highway.jpg' },
  { name: 'Automated High-Bay Hub', type: 'Robotic Facility', project: 'ORD Mega Distribution', label: 'Warehouse', image: '/images/logistics/warehouse-automation.jpg' },
  { name: 'Deepwater Container Link', type: 'Port Terminal', project: 'Pacific Intermodal Pier', label: 'Maritime', image: '/images/logistics/port-containers.jpg' },
  { name: 'Expedited Air Cargo Artery', type: 'Global Freight', project: 'Trans-Corridor SkyBridge', label: 'Air Wing', image: '/images/logistics/cargo-plane.jpg' },
  { name: 'Aerodynamic Platoon Sync', type: 'V2V Convoy', project: 'Chicago ↔ Dallas Spine', label: 'Corridor', image: '/images/logistics/platoon-trucks.jpg' },
  { name: 'Cryo-Chain Cold Storage', type: 'Biopharma Spec', project: 'Hermetic Temp Sentinel', label: 'Cryo-Rig', image: '/images/logistics/cold-chain-reefer.jpg' },
  { name: 'Intermodal Railhead Drayage', type: 'Dry Port Link', project: 'Heavy Gantry Straddle', label: 'Rail Sync', image: '/images/logistics/intermodal-crane.jpg' },
  { name: 'Corridor Operations Center', type: 'Dispatch Core', project: 'Autonomous Ingress Gate', label: 'Terminal', image: '/images/logistics/futuristic-cockpit.jpg' },
  { name: 'Continuous Night-Haul Artery', type: 'Zero-Downtime', project: 'Interstate 80 Corridor', label: '24/7 Run', image: '/images/logistics/night-freight.jpg' },
  { name: 'Robotic Micro-Fulfillment', type: 'Automated AGV', project: 'Urban Last-Mile Hub', label: 'Depot', image: '/images/logistics/distribution-center.jpg' },
  { name: 'Last-Mile Electric Pod', type: 'Zero-Emission', project: 'Clean Fleet Delivery', label: 'Impact', image: '/images/logistics/last-mile-van.jpg' },
  { name: 'Automated Conveyor AGVs', type: 'Fulfillment Core', project: 'High-Speed Packet Sorter', label: 'Velocity', image: '/images/logistics/drone-sorting.jpg' },
  { name: 'Transpacific Container Sync', type: 'Ocean Freight', project: 'Heavy TEU Carrier Link', label: 'Port Link', image: '/images/logistics/maritime-ship.jpg' },
  { name: 'Millimeter Bay Alignment', type: 'Dock Telemetry', project: 'Automated Kingpin Lock', label: 'Docking', image: '/images/logistics/dry-port-dock.jpg' },
  { name: 'Titan Prime Chassis Architecture', type: 'Hardware Core', project: 'Tri-Motor 850HP Platform', label: 'Powertrain', image: '/images/logistics/heavy-prime-mover.jpg' },
  { name: 'Smart Pallet RFID Matrix', type: 'Sensor Mesh', project: 'Live Temperature & Inertia', label: 'Telemetry', image: '/images/logistics/pallet-automation.jpg' },
  { name: 'National Autonomous Corridor Spine', type: 'Federal Level 4', project: 'Logilane Network Core', label: 'Verified', image: '/images/logistics/corridor-dispatch.jpg' },
];

export default function ServicesAwardList() {
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const preview = previewRef.current;
    if (!root || !preview) return;

    // Detect touch screen device to prevent hover fighting touch scroll
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Preload all 17 high-definition images into browser memory for 0ms hover latency
    AWARDS_DATA.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });

    let activeAward: HTMLElement | null = null;
    let lastMousePos = { x: 0, y: 0 };
    let ticking = false;
    let cancelled = false;

    const rows = Array.from(root.querySelectorAll('.award')) as HTMLElement[];
    const listEl = root.querySelector('.awards-list') as HTMLElement;
    if (!listEl) return;

    let cachedListRect = listEl.getBoundingClientRect();
    const updateRect = () => {
      if (!listEl) return;
      cachedListRect = listEl.getBoundingClientRect();
    };

    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    // Helper to smoothly remove preview images
    const removePreviewImage = (img: HTMLElement) => {
      gsap.to(img, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (img.parentNode) {
            img.parentNode.removeChild(img);
          }
        },
      });
    };

    const animatePreview = () => {
      if (!preview || isTouch) return;
      const isInside =
        lastMousePos.x >= cachedListRect.left &&
        lastMousePos.x <= cachedListRect.right &&
        lastMousePos.y >= cachedListRect.top &&
        lastMousePos.y <= cachedListRect.bottom;

      if (!isInside) {
        preview.classList.remove('is-active');
        const imgs = Array.from(preview.querySelectorAll('img'));
        imgs.forEach(removePreviewImage);
      } else {
        preview.classList.add('is-active');
      }
    };

    // Row hover listeners
    rows.forEach((row, index) => {
      row.setAttribute('data-pos', 'TOP');

      const onEnter = (e: MouseEvent) => {
        if (isTouch) return;
        activeAward = row;
        const rect = row.getBoundingClientRect();
        const enterFromTop = e.clientY < rect.top + rect.height / 2;
        const currentPos = row.getAttribute('data-pos') || 'TOP';

        if (enterFromTop || currentPos === 'BOTTOM') {
          row.setAttribute('data-pos', 'MIDDLE');
          const wrapper = row.querySelector('.award-wrapper');
          if (wrapper) {
            gsap.to(wrapper, { y: -80, duration: 0.35, ease: 'power2.out' });
          }
        }

        // Spawn high-definition local logistics preview image
        const img = document.createElement('img');
        img.src = AWARDS_DATA[index].image;
        img.alt = AWARDS_DATA[index].project;
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.willChange = 'transform, opacity';
        img.style.zIndex = `${Date.now()}`;
        img.style.transform = 'scale(0.85)';
        img.style.opacity = '0';

        preview.appendChild(img);

        // Keep at most 2 stacked images in DOM to maintain maximum FPS
        const existingImgs = Array.from(preview.querySelectorAll('img'));
        if (existingImgs.length > 2) {
          for (let i = 0; i < existingImgs.length - 2; i++) {
            existingImgs[i].remove();
          }
        }

        gsap.to(img, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
      };

      const onLeave = (e: MouseEvent) => {
        if (isTouch) return;
        if (activeAward === row) {
          activeAward = null;
        }
        const rect = row.getBoundingClientRect();
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;
        const targetY = leavingFromTop ? -160 : 0;
        row.setAttribute('data-pos', leavingFromTop ? 'TOP' : 'BOTTOM');

        const wrapper = row.querySelector('.award-wrapper');
        if (wrapper) {
          gsap.to(wrapper, { y: targetY, duration: 0.35, ease: 'power2.out' });
        }
      };

      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    // Throttled mousemove via requestAnimationFrame for zero-lag performance
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      lastMousePos = { x: e.clientX, y: e.clientY };

      if (!ticking && !cancelled) {
        requestAnimationFrame(() => {
          animatePreview();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onListEnter = () => {
      if (!isTouch) preview.classList.add('is-active');
    };

    const onListLeave = () => {
      if (preview) {
        preview.classList.remove('is-active');
        const imgs = Array.from(preview.querySelectorAll('img'));
        imgs.forEach(removePreviewImage);
      }
    };

    listEl.addEventListener('mouseenter', onListEnter);
    listEl.addEventListener('mouseleave', onListLeave);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('mousemove', onMouseMove);
      listEl.removeEventListener('mouseenter', onListEnter);
      listEl.removeEventListener('mouseleave', onListLeave);
      if (preview) {
        preview.classList.remove('is-active');
        preview.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="awards" ref={rootRef} className="awards-section relative bg-[#121212] text-[#FFFFFF] py-20 border-t border-white/10">
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <TextReveal as="div" delay={0.1} className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">
              Recognition & Commercial Deployments
            </TextReveal>
            <TextReveal as="h2" delay={0.2} className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-[#FFFFFF] uppercase tracking-tight">
              Services & Awards.
            </TextReveal>
          </div>
          <p className="font-mono text-xs text-slate-400 uppercase tracking-wider">
            [HOVER TO INSPECT HIGH-DEFINITION ASSETS]
          </p>
        </div>
      </div>

      {/* 17 Interactive Award Rows with Local High-Definition Assets */}
      <div className="awards-list">
        {AWARDS_DATA.map((item, index) => (
          <div key={index} className="award select-none cursor-pointer">
            <div className="award-wrapper">
              {/* Panel 1: Default (Name / Type) */}
              <div className="award-name">
                <h1 className="truncate pr-4 text-white">{item.name}</h1>
                <h1 className="text-right text-slate-400 font-mono text-sm sm:text-base font-normal">
                  {item.type}
                </h1>
              </div>

              {/* Panel 2: Inverted (Project / Label) */}
              <div className="award-project">
                <h1 className="truncate pr-4 text-[#FFFFFF]">{item.project}</h1>
                <h1 className="text-right font-mono text-base sm:text-lg font-medium tracking-wider uppercase text-[#38BDF8] shrink-0">
                  {item.label}
                </h1>
              </div>

              {/* Panel 3: Duplicated (Name / Type - Resting Position) */}
              <div className="award-name">
                <h1 className="truncate pr-4 text-white">{item.name}</h1>
                <h1 className="text-right text-slate-400 font-mono text-sm sm:text-base font-normal">
                  {item.type}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom-Right Preview Box for Stacked High-Definition Images */}
      <div ref={previewRef} className="award-preview hidden md:block" />
    </section>
  );
}
