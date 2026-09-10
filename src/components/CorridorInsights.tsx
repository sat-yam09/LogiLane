'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 840;
const FRAME_PATH = (idx: number) =>
  `/corridor-frames/frame_${String(idx).padStart(4, '0')}.webp`;

export interface ScrollyStop {
  id: string;
  stepNumber: string;
  frame: number;
  badge: string;
  title: string;
  subtitle: string;
  telemetry: string;
}

export const PINNED_STOPS: ScrollyStop[] = [
  {
    id: 'overland-artery',
    stepNumber: '01',
    frame: 55,
    badge: 'STAGE 01 // OVERLAND ARTERY',
    title: 'Transcontinental Corridor',
    subtitle: 'Level-4 autonomous highway freight operating at continuous cruising telemetry across arid arterial routes.',
    telemetry: 'LAT 37.0042° N // LON 110.1735° W — ELEV 1,580M',
  },
  {
    id: 'terminal-hub',
    stepNumber: '02',
    frame: 160,
    badge: 'STAGE 02 // LOGISTICS TERMINAL',
    title: 'Intermodal Yard Ingress',
    subtitle: 'High-throughput cross-dock staging, automated bay assignment, and synchronized ground vehicle positioning.',
    telemetry: 'GRID LOGI-NORTH BAY 14 // ACTIVE CARRIERS: 48',
  },
  {
    id: 'gantry-lift',
    stepNumber: '03',
    frame: 320,
    badge: 'STAGE 03 // GANTRY ORCHESTRATION',
    title: 'Precision Heavy Lift',
    subtitle: 'Rail-mounted automated gantry cranes transferring container units with millimetric pneumatic locking.',
    telemetry: 'PAYLOAD GL-9924-X // TARE: 2.28 TN // GROSS: 30.4 TN',
  },
  {
    id: 'deepwater-seaport',
    stepNumber: '04',
    frame: 440,
    badge: 'STAGE 04 // MARITIME GATEWAY',
    title: 'Deepwater Mega-Port',
    subtitle: 'Panoramic ship-to-shore gantry cranes orchestrating deep-draft container staging along international berths.',
    telemetry: 'BERTH 07-EAST // QUAYSIDE CRANES: 12 SYNCHRONIZED',
  },
  {
    id: 'oceanic-transit',
    stepNumber: '05',
    frame: 720,
    badge: 'STAGE 05 // OCEANIC TRANSIT',
    title: 'The Leviathan Carrier',
    subtitle: 'Heavy ocean container vessels carving trans-pacific lanes, engineered for extreme conditions and cargo integrity.',
    telemetry: 'VESSEL: THE LEVIATHAN // SPEED: 21.4 KTS // HEADING: 268°',
  },
  {
    id: 'continental-horizon',
    stepNumber: '06',
    frame: 839,
    badge: 'STAGE 06 // GLOBAL HORIZON',
    title: 'End-to-End Velocity',
    subtitle: 'Unbroken arterial visibility connecting intercontinental origin ports directly to inner manufacturing corridors.',
    telemetry: 'STATUS: CORRIDOR TRAVERSED // ALL CARGO LOGGED',
  },
];

export default function CorridorInsights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  // Tracks which frame indices have already had an Image() dispatched,
  // so the keyframe preloader (step 2) and the batch loader (step 3)
  // never issue a duplicate request for the same frame.
  const dispatchedRef = useRef<Set<number>>(new Set());
  const playheadRef = useRef<{ frame: number }>({ frame: PINNED_STOPS[0].frame });
  const currentStopRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const isPinnedRef = useRef<boolean>(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const targetStopIndexRef = useRef<number>(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isTextRevealed, setIsTextRevealed] = useState<boolean>(true);

  // High-performance canvas drawer with DPR scaling and cover aspect ratio
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
    const img = imagesRef.current[clampedIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover math: scale image to fill canvas while preserving aspect ratio
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.drawImage(img, 0, 0, iw, ih, sx, sy, sw, sh);
    }
  }, []);

  // Update canvas internal dimensions to match viewport and devicePixelRatio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    renderFrame(playheadRef.current.frame);
  }, [renderFrame]);

  // Detect prefers-reduced-motion once, and keep it live if the user toggles it mid-session
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Frame preloader engine
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const markDispatched = (idx: number) => dispatchedRef.current.add(idx);
    const alreadyDispatched = (idx: number) => dispatchedRef.current.has(idx);

    // Step 1: Preload Frame 55 (Stage 1 start) immediately
    const firstStopImg = new Image();
    markDispatched(PINNED_STOPS[0].frame);
    firstStopImg.src = FRAME_PATH(PINNED_STOPS[0].frame);
    firstStopImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[PINNED_STOPS[0].frame] = firstStopImg;
      handleResize();
      renderFrame(PINNED_STOPS[0].frame);
    };

    // Step 2: Preload all pinned stop keyframes with high priority
    PINNED_STOPS.forEach((stop) => {
      if (alreadyDispatched(stop.frame)) return;
      markDispatched(stop.frame);
      const stopImg = new Image();
      stopImg.src = FRAME_PATH(stop.frame);
      stopImg.onload = () => {
        if (!isCancelled) {
          imagesRef.current[stop.frame] = stopImg;
        }
      };
    });

    // Step 3: Concurrently preload all remaining frames
    const loadRemainingFrames = async () => {
      const BATCH_SIZE = 16;
      for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batchPromises = [];

        for (let j = i; j < i + BATCH_SIZE && j < TOTAL_FRAMES; j++) {
          if (imagesRef.current[j] || alreadyDispatched(j)) {
            if (imagesRef.current[j]) loadedCount++;
            continue;
          }
          markDispatched(j);

          const promise = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = FRAME_PATH(j);
            img.onload = () => {
              if (!isCancelled) {
                imagesRef.current[j] = img;
                loadedCount++;
                const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
                setLoadProgress(progress);
                if (progress >= 100) {
                  setIsLoaded(true);
                }
              }
              resolve();
            };
            img.onerror = () => {
              if (!isCancelled) {
                loadedCount++;
                const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
                setLoadProgress(progress);
                if (progress >= 100) setIsLoaded(true);
              }
              resolve();
            };
          });

          batchPromises.push(promise);
        }

        await Promise.all(batchPromises);
      }
    };

    loadRemainingFrames();

    window.addEventListener('resize', handleResize);
    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, renderFrame]);

  // Transition controller: plays video slowly and continuously to target stop, then halts
  const goToStop = useCallback((targetIndex: number) => {
    if (isTransitioningRef.current) return;
    if (targetIndex < 0 || targetIndex >= PINNED_STOPS.length) return;
    if (targetIndex === currentStopRef.current) return;

    const targetFrame = PINNED_STOPS[targetIndex].frame;
    const trigger = scrollTriggerRef.current;

    // Respect prefers-reduced-motion: jump instantly instead of a 3.2s scrub,
    // and skip the smooth-scroll animation too.
    if (prefersReducedMotionRef.current) {
      isTransitioningRef.current = true;
      setActiveStopIndex(targetIndex);
      currentStopRef.current = targetIndex;
      playheadRef.current.frame = targetFrame;
      renderFrame(targetFrame);

      if (trigger) {
        const totalDistance = trigger.end - trigger.start;
        const targetScrollY = trigger.start + (targetIndex / (PINNED_STOPS.length - 1)) * totalDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
      }

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 50);
      return;
    }

    isTransitioningRef.current = true;
    setIsPlaying(true);
    setIsTextRevealed(false);
    targetStopIndexRef.current = targetIndex;

    // Smoothly synchronize page scroll position with the current stop
    if (trigger) {
      const totalDistance = trigger.end - trigger.start;
      const targetScrollY = trigger.start + (targetIndex / (PINNED_STOPS.length - 1)) * totalDistance;

      const lenis = typeof window !== 'undefined' ? (window as any).__lenis : null;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetScrollY, { duration: 3.2 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    }

    // Play video smoothly and continuously to targetFrame over 3.2 seconds
    gsap.killTweensOf(playheadRef.current);
    gsap.to(playheadRef.current, {
      frame: targetFrame,
      duration: 3.2, // Continuous slow playback between keyframes
      ease: 'power1.inOut',
      onUpdate: () => {
        const current = Math.round(playheadRef.current.frame);
        renderFrame(current);
      },
      onComplete: () => {
        // ONLY AFTER video has fully stopped on the target keyframe:
        currentStopRef.current = targetIndex;
        playheadRef.current.frame = targetFrame;
        renderFrame(targetFrame);
        // Switch text to the new stage and reveal it smoothly
        setActiveStopIndex(targetIndex);
        setIsPlaying(false);
        setTimeout(() => {
          setIsTextRevealed(true);
        }, 80);

        // Generous debounce before accepting the next scroll trigger
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 350);
      },
    });
  }, [renderFrame]);

  // Setup ScrollTrigger Pinning and Scroll Position Sync.
  // NOTE: this effect intentionally depends only on [renderFrame] — it must
  // NOT depend on `isPlaying`. Recreating the ScrollTrigger on every
  // play/stop toggle would revert() (unpin) and rebuild the pin mid-tween,
  // fighting the GSAP scrub and the smooth-scroll animation for the same
  // frames. `isTransitioningRef` (a ref, not state) already gives onUpdate
  // everything it needs to ignore scroll-driven updates during a transition,
  // without ever needing to tear the trigger down.
  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    if (!container || !pinned) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinned,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          isPinnedRef.current = true;
        },
        onLeave: () => {
          isPinnedRef.current = false;
        },
        onEnterBack: () => {
          isPinnedRef.current = true;
        },
        onLeaveBack: () => {
          isPinnedRef.current = false;
        },
        onUpdate: (self) => {
          // If user navigates via scrollbar directly without triggering wheel listener
          if (!isTransitioningRef.current) {
            const closest = Math.round(self.progress * (PINNED_STOPS.length - 1));
            if (closest !== currentStopRef.current) {
              currentStopRef.current = closest;
              setActiveStopIndex(closest);
              playheadRef.current.frame = PINNED_STOPS[closest].frame;
              renderFrame(PINNED_STOPS[closest].frame);
            }
          }
        },
      });

      scrollTriggerRef.current = st;
    }, container);

    return () => ctx.revert();
  }, [renderFrame]);

  // Scroll Gesture & Wheel Interceptor: Triggers continuous slow playback between stops
  useEffect(() => {
    let lastWheelTime = 0;

    const isTypingTarget = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
    };

    const onWheel = (e: WheelEvent) => {
      // Only capture when the section is actively pinned in viewport
      if (!isPinnedRef.current) return;

      const now = Date.now();
      if (now - lastWheelTime < 180) return; // Prevent micro jitter

      const delta = e.deltaY;
      if (Math.abs(delta) < 25) return; // Small deadzone

      // Absorb wheel events while video is already playing continuously to target stop
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Scroll Down -> Play slowly to NEXT frame
      if (delta > 0) {
        if (currentStopRef.current < PINNED_STOPS.length - 1) {
          e.preventDefault();
          lastWheelTime = now;
          goToStop(currentStopRef.current + 1);
        }
        // At last stop (06), native scroll continues down to next section
      }
      // Scroll Up -> Play slowly backwards to PREVIOUS frame
      else if (delta < 0) {
        if (currentStopRef.current > 0) {
          e.preventDefault();
          lastWheelTime = now;
          goToStop(currentStopRef.current - 1);
        }
        // At first stop (01), native scroll continues up to previous section
      }
    };

    // Mobile touch handling
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isPinnedRef.current) return;

      if (isTransitioningRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;

      if (Math.abs(diff) > 40) {
        if (diff > 0 && currentStopRef.current < PINNED_STOPS.length - 1) {
          if (e.cancelable) e.preventDefault();
          goToStop(currentStopRef.current + 1);
          touchStartY = currentY;
        } else if (diff < 0 && currentStopRef.current > 0) {
          if (e.cancelable) e.preventDefault();
          goToStop(currentStopRef.current - 1);
          touchStartY = currentY;
        }
      }
    };

    // Keyboard navigation (ArrowDown / ArrowUp) — ignored while the user is
    // typing in a form field anywhere on the page.
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isPinnedRef.current) return;
      if (isTypingTarget()) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentStopRef.current < PINNED_STOPS.length - 1) {
          e.preventDefault();
          goToStop(currentStopRef.current + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentStopRef.current > 0) {
          e.preventDefault();
          goToStop(currentStopRef.current - 1);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goToStop]);

  const activeStop = PINNED_STOPS[activeStopIndex];

  return (
    <section
      id="corridor-insights"
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#0A0A0C] select-none"
    >
      {/* ── PINNED 100VH FULLSCREEN CANVAS CONTAINER ── */}
      <div
        ref={pinnedRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#07090E]"
      >
        {/* Apple-style Canvas Image Scrubber */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
          style={{ willChange: 'transform' }}
        />

        {/* Subtle Cinematic Vignette & Depth Shadow */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/75 via-black/20 to-black/50" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />

        {/* ── PRELOADER PROGRESS BAR ── */}
        <div
          className={`absolute top-8 right-8 z-40 flex items-center gap-3 transition-opacity duration-700 pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
              BUFFERING CORRIDOR REEL
            </span>
            <span className="font-mono text-xs font-semibold text-white">
              {loadProgress}%
            </span>
          </div>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B3122E] transition-all duration-150 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>

        {/* ── PINNED KEYFRAME SCROLLYTELLING HOLD OVERLAY WITH KINETIC TEXT REVEAL ── */}
        <div
          key={activeStop.id}
          className={`absolute inset-0 z-30 pointer-events-none flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 max-w-5xl transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <div className="space-y-5">
            {/* Expressive Title Slot with Word-by-Word Mask Reveal */}
            <h2
              className="font-manrope text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-white tracking-[-0.03em] uppercase leading-[0.95] drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex flex-wrap gap-x-[0.28em] gap-y-1"
              style={{ fontWeight: 370 }}
            >
              {activeStop.title.split(' ').map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block overflow-hidden py-1">
                  <span
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isTextRevealed
                        ? 'translate-y-0 filter blur-none opacity-100'
                        : 'translate-y-[120%] filter blur-[6px] opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${wordIdx * 90 + 50}ms`,
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Subtitle / Copy Slot with Cascade Reveal */}
            <p
              className="font-manrope text-base sm:text-xl lg:text-2xl text-slate-200/90 max-w-2xl leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex flex-wrap gap-x-[0.24em] gap-y-0.5"
              style={{ fontWeight: 350 }}
            >
              {activeStop.subtitle.split(' ').map((word, wordIdx) => {
                const titleWordCount = activeStop.title.split(' ').length;
                const titleDelay = titleWordCount * 90 + 140;
                return (
                  <span key={wordIdx} className="inline-block overflow-hidden py-0.5">
                    <span
                      className={`inline-block transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isTextRevealed
                          ? 'translate-y-0 filter blur-none opacity-100'
                          : 'translate-y-[115%] filter blur-[4px] opacity-0'
                      }`}
                      style={{
                        transitionDelay: `${titleDelay + wordIdx * 20}ms`,
                        willChange: 'transform, opacity, filter',
                      }}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* ── INTERACTIVE STAGE STEPPER (RIGHT SIDE) ── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
          {/* Quick Nav Up Button */}
          <button
            onClick={() => goToStop(activeStopIndex - 1)}
            disabled={activeStopIndex === 0 || isPlaying}
            aria-label="Previous Stage"
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 cursor-pointer"
          >
            <ChevronUp size={16} />
          </button>

          {/* Stage Number Pills */}
          {PINNED_STOPS.map((stop, i) => {
            const isActive = activeStopIndex === i;
            return (
              <button
                key={stop.id}
                onClick={() => goToStop(i)}
                disabled={isPlaying}
                className="flex items-center gap-2.5 justify-end group cursor-pointer focus:outline-none py-1"
                aria-label={`Go to ${stop.title}`}
              >
                <span
                  className={`font-manrope text-[11px] tracking-wider transition-all duration-300 ${
                    isActive ? 'text-white opacity-100' : 'text-white/30 group-hover:text-white/70'
                  }`}
                  style={{ fontWeight: isActive ? 600 : 360 }}
                >
                  {stop.stepNumber}
                </span>
                <div
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-7 bg-[#B3122E] shadow-[0_0_12px_#B3122E]'
                      : 'h-2 bg-white/25 group-hover:bg-white/50'
                  }`}
                />
              </button>
            );
          })}

          {/* Quick Nav Down Button */}
          <button
            onClick={() => goToStop(activeStopIndex + 1)}
            disabled={activeStopIndex === PINNED_STOPS.length - 1 || isPlaying}
            aria-label="Next Stage"
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 cursor-pointer"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
