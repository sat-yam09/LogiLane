'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Cpu, Zap, Shield, Truck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  {
    id: 'ch-01',
    step: '01',
    category: 'AUTONOMOUS HIGHWAY ARTERIES',
    headline: 'Engineered for the unattended continental highway.',
    body: 'LogiLane replaces traditional driver shifts with continuous, Level 4 autonomous Class-8 freight transport. Through multi-spectral LIDAR and millimetric radar telemetry, our heavy prime movers navigate transcontinental corridors day and night without human fatigue, unblocking national supply chain bottlenecks.',
    stats: { label: 'TOTAL AUTONOMOUS SHIPMENTS', value: '1842910', sub: 'VERIFIED DISPATCHES ACROSS MIDWEST & GULF ARTERIES' },
    featureA: { icon: 'cpu', text: 'Neural Path Planner & Edge Compute' },
    featureB: { icon: 'zap', text: 'Multi-Spectral LIDAR Array' },
  },
  {
    id: 'ch-02',
    step: '02',
    category: 'V2V DYNAMIC PLATOONING',
    headline: 'Aerodynamic interlocking reduces drag by 38.4%.',
    body: 'Harnessing low-latency vehicle-to-vehicle microwave links, LogiLane tractors synchronize into tight aerodynamic formations separated by less than 0.8 seconds. Dynamic slipstream draft coupling drastically curbs fuel consumption while optimizing lane capacity across interstate freight arteries.',
    stats: { label: 'AUTONOMOUS CORRIDOR MILES', value: '48620000', sub: 'ZERO DRIVER DISENGAGEMENTS ACROSS 14 HIGHWAY STATES' },
    featureA: { icon: 'truck', text: 'V2V Microwave Mesh Coupling' },
    featureB: { icon: 'zap', text: 'Active Thermal Aerodynamics' },
  },
  {
    id: 'ch-03',
    step: '03',
    category: 'ZERO-DWELL TERMINAL INGRESS',
    headline: 'Precision logistics docking under 12 seconds.',
    body: 'Human-dependent freight terminals suffer hours of idling and bottlenecked dwell times. LogiLane facilities feature automated kingpin decoupling, robotic yard spotters, and high-frequency dispatch orchestration that turn incoming trailers around in under 12 seconds with surgical precision.',
    stats: { label: 'DISPATCH ON-TIME VELOCITY', value: '99.98', sub: 'FMVSS & US-DOT COMMERCIAL SAFETY COMPLIANT' },
    featureA: { icon: 'shield', text: 'ISO 26262 ASIL-D Certified' },
    featureB: { icon: 'zap', text: 'Automated Kingpin Decoupling' },
  },
];

const BG_WORDS = [
  { text: 'AUTONOMOUS', style: { top: '8%', left: '-6%' } as React.CSSProperties, direction: -1 },
  { text: 'FREIGHT',    style: { top: '34%', right: '-8%' } as React.CSSProperties, direction: 1 },
  { text: 'CORRIDOR',   style: { top: '58%', left: '-4%' } as React.CSSProperties, direction: -1 },
  { text: 'DISPATCH',   style: { top: '82%', right: '-6%' } as React.CSSProperties, direction: 1 },
];

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

const FeatureIcon = ({ type }: { type: string }) => {
  const cls = 'w-4 h-4 text-[#2563EB] shrink-0';
  switch (type) {
    case 'cpu':    return <Cpu className={cls} />;
    case 'truck':  return <Truck className={cls} />;
    case 'shield': return <Shield className={cls} />;
    default:       return <Zap className={cls} />;
  }
};

/**
 * initCopy — the Greyloom-style masked line reveal system.
 *
 * 1. Splits the container (or each direct child if data-copy-wrapper) into lines
 *    with SplitText mask: "lines" (overflow-hidden wrappers).
 * 2. Transfers text-indent to paddingLeft on the first split line.
 * 3. Sets every line to y: "100%" (hidden below its mask).
 * 4. Animates to y: "0%" with power4.out, duration 1, stagger 0.1,
 *    triggered once when the container crosses 75% of the viewport.
 *
 * Returns the SplitText instances for cleanup.
 */
function initCopy(container: HTMLElement): { revert: () => void }[] {
  const delay = parseFloat(container.dataset.copyDelay || '0');
  const isWrapper = container.hasAttribute('data-copy-wrapper');

  const targets: HTMLElement[] = isWrapper
    ? (Array.from(container.children) as HTMLElement[])
    : [container];

  const splits: { revert: () => void }[] = [];
  const allLines: Element[] = [];

  targets.forEach((element) => {
    // Capture text-indent before splitting
    const textIndent = getComputedStyle(element).textIndent;

    const split = SplitText.create(element, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'line line++',
      lineThreshold: 0.1,
    });
    splits.push(split);

    // Transfer text-indent to first split line's paddingLeft
    if (textIndent && textIndent !== '0px' && split.lines.length > 0) {
      (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
      element.style.textIndent = '0';
    }

    allLines.push(...split.lines);
  });

  // Initial state: all lines hidden below their masks
  gsap.set(allLines, { y: '100%' });

  // The reveal: one gsap.to per container, scroll-triggered once
  gsap.to(allLines, {
    y: '0%',
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
    delay,
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      once: true,
    },
  });

  return splits;
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function AboutSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const imageColRef   = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const gradientRef   = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section    = sectionRef.current;
    const imageCol   = imageColRef.current;
    const contentCol = contentColRef.current;
    const imageInner = imageInnerRef.current;
    const gradient   = gradientRef.current;
    if (!section || !imageCol || !contentCol) return;

    /* ── Respect prefers-reduced-motion ─────────────────────────── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let cancelled = false;
    const splits: { revert: () => void }[] = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {

      /* ═════════════════════════════════════════════════════════
         LAYER 1 — Ambient Gradient Evolution (scrubbed)
         ═════════════════════════════════════════════════════════ */
      if (gradient) {
        gsap.fromTo(gradient,
          { opacity: 0, scale: 0.7, x: 100 },
          {
            opacity: 1, scale: 1.35, x: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          }
        );
      }

      /* ═════════════════════════════════════════════════════════
         LAYER 2 — Background Typography Parallax (desktop)
         ═════════════════════════════════════════════════════════ */
      mm.add('(min-width: 1024px)', () => {
        section.querySelectorAll<HTMLElement>('.about-bg-word').forEach((el) => {
          const dir   = parseFloat(el.dataset.dir || '1');
          const speed = parseFloat(el.dataset.speed || '120');
          gsap.fromTo(el,
            { x: dir * speed },
            {
              x: dir * -speed,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        });
      });

      /* ═════════════════════════════════════════════════════════
         LAYER 4 — Pin Image + Scroll-Driven Parallax
         ═════════════════════════════════════════════════════════ */
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: contentCol,
          start: 'top 100',
          end: 'bottom bottom',
          pin: imageCol,
          pinSpacing: false,
        });

        if (imageInner) {
          gsap.fromTo(imageInner,
            { scale: 1.06, y: 24, rotate: 0.5 },
            {
              scale: 1, y: -14, rotate: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: contentCol,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
      });

      mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
        if (imageInner) {
          gsap.fromTo(imageInner,
            { scale: 1.03, y: 16 },
            {
              scale: 1, y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: imageCol,
                start: 'top 85%',
                end: 'bottom 15%',
                scrub: 0.6,
              },
            }
          );
        }
      });

      /* ═════════════════════════════════════════════════════════
         NON-TEXT REVEALS — chapter meta, stat cards, feature pills
         Simple fade-up animations, not the masked text system.
         ═════════════════════════════════════════════════════════ */
      CHAPTERS.forEach((_, index) => {
        const chEl = document.getElementById(`about-chapter-${index}`);
        if (!chEl) return;

        // Chapter meta tag — fade up
        const meta = chEl.querySelector('.chapter-meta');
        if (meta) {
          gsap.from(meta, {
            y: 20, opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: chEl, start: 'top 84%', once: true },
          });
        }

        // Stat card — fade up
        const stat = chEl.querySelector('.stat-card');
        if (stat) {
          gsap.from(stat, {
            y: 35, opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: stat, start: 'top 88%', once: true },
          });
        }

        // Feature pills — staggered fade
        const pills = chEl.querySelectorAll('.feature-pill');
        if (pills.length) {
          gsap.from(pills, {
            y: 12, opacity: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: pills[0], start: 'top 92%', once: true },
          });
        }
      });

      /* ═════════════════════════════════════════════════════════
         ROLLING ODOMETER COUNTERS
         ═════════════════════════════════════════════════════════ */
      section.querySelectorAll('.rolling-number-val').forEach((el) => {
        const raw = el.getAttribute('data-value') || '0';
        const isPercent = raw.includes('.');
        const numericVal = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const obj = { val: 0 };

        gsap.to(obj, {
          val: numericVal,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = isPercent
              ? `${obj.val.toFixed(2)}%`
              : Math.floor(obj.val).toLocaleString() + '+';
          },
        });
      });

    }, section);

    /* ═══════════════════════════════════════════════════════════
       LAYER 3 + 5 — Masked Line-by-Line Text Reveal
       Deferred until document.fonts.ready so SplitText computes
       correct line breaks. Uses ctx.add() to attribute the
       ScrollTriggers to the context for proper cleanup.
       ═══════════════════════════════════════════════════════════ */
    document.fonts.ready.then(() => {
      if (cancelled) return;

      ctx.add(() => {
        section.querySelectorAll<HTMLElement>('[data-copy]').forEach((container) => {
          splits.push(...initCopy(container));
        });
      });
    });

    /* ── Cleanup ────────────────────────────────────────────────
       Order matters: ctx.revert() kills ScrollTriggers + tweens
       BEFORE splits.revert() collapses the mask wrapper DOM nodes.
       ────────────────────────────────────────────────────────── */
    return () => {
      cancelled = true;
      ctx.revert();
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  }, []);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <section
      id="about"
      ref={sectionRef}
      data-no-reveal
      className="relative w-full bg-[#121212] border-t border-white/10"
    >
      {/* ── Layer 0: Architectural grid ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* ── Layer 1: Ambient evolving gradient ─────────────────── */}
      <div
        ref={gradientRef}
        className="absolute -top-[15%] -right-[10%] w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] pointer-events-none rounded-full opacity-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.04) 45%, transparent 70%)',
          filter: 'blur(70px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* ── Layer 2: Background typography (desktop only) ──────── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        {BG_WORDS.map((w, i) => (
          <span
            key={w.text}
            className="about-bg-word absolute font-display font-extrabold uppercase text-[#ffffff] whitespace-nowrap leading-none"
            data-dir={String(w.direction)}
            data-speed={String(100 + i * 35)}
            style={{
              ...w.style,
              fontSize: 'clamp(6rem, 14vw, 16rem)',
              opacity: 0.04,
              willChange: 'transform',
            }}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* ── Layer 3: Section Header ────────────────────────────── */}
      <div className="max-w-7xl mx-auto pt-24 sm:pt-32 pb-14 sm:pb-20 px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-widest text-[#2563EB] uppercase">
                COMPANY ARCHITECTURE // LEVEL 4 FREIGHT
              </span>
            </div>
            <h2
              data-copy
              className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#ffffff] tracking-[-1px] uppercase"
            >
              About LogiLane
            </h2>
          </div>
          <div
            data-copy
            className="font-mono text-xs text-white/50 max-w-xs uppercase leading-relaxed"
          >
            AUTONOMOUS HEAVY COMMERCIAL TRANSIT // DECENTRALIZED CORRIDORS // FOUNDED 2026
          </div>
        </div>
      </div>

      {/* ── Layer 4 + 5: Pinned Layout ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start relative">

          {/* LEFT — Pinned Image with scroll-driven parallax ────── */}
          <div ref={imageColRef} className="w-full lg:w-[42%] shrink-0 pb-10 lg:pb-0 lg:pt-4">
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <div
                ref={imageInnerRef}
                className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]"
                style={{ willChange: 'transform' }}
              >
                <Image
                  src="/images/logistics/dry-port-dock.jpg"
                  alt="LogiLane autonomous freight dry-port dock facility"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Caption bar */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between font-mono text-[11px] text-white/80 tracking-wider uppercase z-10">
                <span>DRY-PORT TERMINAL // DOCK 04</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9dfc11] animate-pulse" />
                  OPERATIONAL
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Scrolling Chapters ─────────────────────────── */}
          <div ref={contentColRef} className="lg:w-[58%] space-y-24 sm:space-y-32 pb-24 sm:pb-32">
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                id={`about-chapter-${index}`}
                className="scroll-mt-28 flex flex-col"
              >
                {/* Meta tag — fade-up (not masked reveal) */}
                <div className="chapter-meta flex items-center gap-3 mb-5">
                  <span className="font-mono text-[11px] font-bold text-[#121212] bg-[#ffffff] px-2.5 py-1 rounded-sm tracking-wider">
                    {chapter.step}
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-[#2563EB] uppercase">
                    {chapter.category}
                  </span>
                </div>

                {/* Heading — masked line-by-line reveal via data-copy */}
                <h3
                  data-copy
                  className="chapter-heading font-display font-bold text-2xl sm:text-3xl lg:text-[2.6rem] text-[#ffffff] tracking-[-0.5px] leading-[1.18] mb-6"
                >
                  {chapter.headline}
                </h3>

                {/* Body — masked line-by-line reveal via data-copy */}
                <p
                  data-copy
                  className="chapter-body font-display text-base sm:text-lg lg:text-xl text-[#ffffff] leading-[1.75] font-normal mb-10"
                >
                  {chapter.body}
                </p>

                {/* Stat Card + Rolling Counter — fade-up */}
                <div className="stat-card p-6 sm:p-8 bg-[#1a1a1a] border border-white/10 rounded-md hover:border-[#2563EB]/40 transition-colors mb-6">
                  <div className="font-mono text-[11px] font-semibold text-[#2563EB] tracking-widest uppercase mb-2">
                    {chapter.stats.label}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className="rolling-number-val font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#ffffff] tracking-tight"
                      data-value={chapter.stats.value}
                    >
                      0
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-white/50 uppercase tracking-wide">
                    {chapter.stats.sub}
                  </div>
                </div>

                {/* Feature Pills — staggered fade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-white/10 font-mono text-xs text-white/60">
                  <div className="feature-pill flex items-center gap-2">
                    <FeatureIcon type={chapter.featureA.icon} />
                    <span>{chapter.featureA.text}</span>
                  </div>
                  <div className="feature-pill flex items-center gap-2">
                    <FeatureIcon type={chapter.featureB.icon} />
                    <span>{chapter.featureB.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
