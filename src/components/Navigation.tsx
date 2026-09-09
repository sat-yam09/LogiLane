'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function Navigation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const isAnimatingRef = useRef(false);
  const isOpenRef = useRef(false);

  // Link items according to the logistics platform theme
  const links = ['About', 'Corridors', 'Services', 'Simulator', 'Hardware', 'Terminal'];

  useEffect(() => {
    const handleVideoEnded = () => {
      setNavVisible(true);
    };

    window.addEventListener('hero-video-ended', handleVideoEnded);

    // Safety fallback: reveal nav after 5.2s in case video is blocked or skipped
    const fallbackTimer = setTimeout(() => {
      setNavVisible(true);
    }, 5200);

    return () => {
      window.removeEventListener('hero-video-ended', handleVideoEnded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let animationFrameId: number;

    // State for mouse pan and highlighter lerp
    let currentX = 0;
    let targetX = 0;
    let currentHighlighterX = 0;
    let targetHighlighterX = 0;
    let currentHighlighterWidth = 0;
    let targetHighlighterWidth = 0;

    const overlay = root.querySelector('.menu-overlay') as HTMLElement;
    const content = root.querySelector('.menu-content') as HTMLElement;
    const linksWrapper = root.querySelector('.menu-links-wrapper') as HTMLElement;
    const highlighter = root.querySelector('.link-highlighter') as HTMLElement | null;
    const linkEls = Array.from(root.querySelectorAll('.menu-link')) as HTMLElement[];

    if (!overlay || !linksWrapper) return;

    const isDesktop = window.innerWidth >= 1000;

    // 1. Initial setup of character positions (hover copy starts down 110%)
    linkEls.forEach((linkEl) => {
      const spans = linkEl.querySelectorAll('a > span');
      if (spans.length >= 2) {
        const hoverChars = spans[1].querySelectorAll('.char');
        gsap.set(hoverChars, { y: '110%' });
      }
    });

    // Set initial closed states
    gsap.set(overlay, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      pointerEvents: 'none',
      visibility: 'hidden',
    });
    gsap.set(content, { y: '50%', opacity: 0.25 });
    gsap.set(
      linkEls.map((l) => l.querySelector('a')),
      { y: '150%' }
    );
    if (highlighter) {
      gsap.set(highlighter, { y: '150%' });
    }

    // Measure highlighter to first link if present
    const firstLink = linkEls[0];
    if (firstLink && highlighter) {
      const firstSpan = firstLink.querySelector('a > span') as HTMLElement;
      if (firstSpan) {
        const w = firstSpan.offsetWidth || 280;
        highlighter.style.width = `${w}px`;
        currentHighlighterWidth = targetHighlighterWidth = w;

        const firstRect = firstLink.getBoundingClientRect();
        const wrapperRect = linksWrapper.getBoundingClientRect();
        const initX = firstRect.left - wrapperRect.left;
        currentHighlighterX = targetHighlighterX = initX;
      }
    }

    // Hover per-character swap handlers
    if (isDesktop) {
      linkEls.forEach((linkEl) => {
        const anchor = linkEl.querySelector('a');
        if (!anchor) return;
        const spans = anchor.querySelectorAll(':scope > span');
        const visibleSpan = spans[0];
        const hoverSpan = spans[1];

        linkEl.addEventListener('mouseenter', () => {
          if (!isOpenRef.current) return;
          const visChars = visibleSpan?.querySelectorAll('.char');
          const hovChars = hoverSpan?.querySelectorAll('.char');
          if (visChars && hovChars) {
            gsap.to(visChars, { y: '-110%', stagger: 0.03, duration: 0.5, ease: 'expo.inOut', overwrite: 'auto' });
            gsap.to(hovChars, { y: '0%', stagger: 0.03, duration: 0.5, ease: 'expo.inOut', overwrite: 'auto' });
          }

          // Update highlighter target
          const linkRect = linkEl.getBoundingClientRect();
          const wrapRect = linksWrapper.getBoundingClientRect();
          targetHighlighterX = linkRect.left - wrapRect.left;
          targetHighlighterWidth = (visibleSpan as HTMLElement)?.offsetWidth || 200;
        });

        linkEl.addEventListener('mouseleave', () => {
          if (!isOpenRef.current) return;
          const visChars = visibleSpan?.querySelectorAll('.char');
          const hovChars = hoverSpan?.querySelectorAll('.char');
          if (visChars && hovChars) {
            gsap.to(hovChars, { y: '110%', stagger: 0.03, duration: 0.5, ease: 'expo.inOut', overwrite: 'auto' });
            gsap.to(visChars, { y: '0%', stagger: 0.03, duration: 0.5, ease: 'expo.inOut', overwrite: 'auto' });
          }
        });
      });

      // Reset highlighter on wrapper leave
      linksWrapper.addEventListener('mouseleave', () => {
        if (!firstLink) return;
        const firstSpan = firstLink.querySelector('a > span') as HTMLElement;
        const linkRect = firstLink.getBoundingClientRect();
        const wrapRect = linksWrapper.getBoundingClientRect();
        targetHighlighterX = linkRect.left - wrapRect.left;
        targetHighlighterWidth = firstSpan?.offsetWidth || 200;
      });

      // Mouse-driven horizontal pan across central 50%
      overlay.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isOpenRef.current) return;
        const vpWidth = window.innerWidth;
        const wrapperWidth = linksWrapper.scrollWidth || linksWrapper.offsetWidth;
        const maxMoveLeft = 0;
        const maxMoveRight = Math.min(0, vpWidth - wrapperWidth - 60);

        const sensitivityRange = vpWidth * 0.5;
        const startX = (vpWidth - sensitivityRange) / 2;
        const endX = startX + sensitivityRange;

        let pct = 0;
        if (e.clientX <= startX) pct = 0;
        else if (e.clientX >= endX) pct = 1;
        else pct = (e.clientX - startX) / sensitivityRange;

        targetX = maxMoveLeft + pct * (maxMoveRight - maxMoveLeft);
      });
    }

    // Efficient lerp loop that ONLY runs when menu is actively open
    const lerpLoop = () => {
      if (!isOpenRef.current) return;
      currentX += (targetX - currentX) * 0.08;
      currentHighlighterX += (targetHighlighterX - currentHighlighterX) * 0.08;
      currentHighlighterWidth += (targetHighlighterWidth - currentHighlighterWidth) * 0.08;

      gsap.set(linksWrapper, { x: currentX });
      if (highlighter) {
        gsap.set(highlighter, {
          x: currentHighlighterX,
          width: currentHighlighterWidth,
        });
      }

      if (isOpenRef.current) {
        animationFrameId = requestAnimationFrame(lerpLoop);
      }
    };

    (root as any)._startLerp = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(lerpLoop);
    };
    (root as any)._stopLerp = () => {
      cancelAnimationFrame(animationFrameId);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleToggle = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const root = rootRef.current;
    if (!root) return;

    const overlay = root.querySelector('.menu-overlay') as HTMLElement;
    const content = root.querySelector('.menu-content') as HTMLElement;
    const linksWrapper = root.querySelector('.menu-links-wrapper') as HTMLElement;
    const highlighter = root.querySelector('.link-highlighter') as HTMLElement | null;
    const anchors = Array.from(root.querySelectorAll('.menu-link a')) as HTMLElement[];

    if (!isOpenRef.current) {
      // OPEN SEQUENCE
      gsap.set(overlay, { pointerEvents: 'auto', visibility: 'visible' });
      gsap.to(overlay, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        duration: 1.25,
        ease: 'expo.out',
        onComplete: () => {
          gsap.set(root.querySelectorAll('.menu-link'), { overflow: 'visible' });
          isOpenRef.current = true;
          isAnimatingRef.current = false;
          setIsOpen(true);
          (root as any)._startLerp?.();
        },
      });

      gsap.to(content, { y: '0%', opacity: 1, duration: 1.5, ease: 'expo.out' });
      gsap.to(anchors, { y: '0%', duration: 1.25, stagger: 0.1, delay: 0.25, ease: 'expo.out' });
      if (highlighter) {
        gsap.to(highlighter, { y: '0%', duration: 1, delay: 1, ease: 'expo.out' });
      }
    } else {
      // CLOSE SEQUENCE
      gsap.to(anchors, { y: '-200%', duration: 1.25, ease: 'expo.out' });
      gsap.to(content, { y: '-100%', opacity: 0.25, duration: 1.25, ease: 'expo.out' });
      gsap.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.25,
        ease: 'expo.out',
        onComplete: () => {
          gsap.set(overlay, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            pointerEvents: 'none',
            visibility: 'hidden',
          });
          gsap.set(anchors, { y: '150%' });
          if (highlighter) {
            gsap.set(highlighter, { y: '150%' });
          }
          gsap.set(content, { y: '50%', opacity: 0.25 });
          gsap.set(root.querySelectorAll('.menu-link'), { overflow: 'hidden' });
          gsap.set(linksWrapper, { x: 0 });

          isOpenRef.current = false;
          isAnimatingRef.current = false;
          setIsOpen(false);
          (root as any)._stopLerp?.();
        },
      });
    }
  };

  return (
    <div ref={rootRef} className="select-none">
      {/* Fixed Top Bar with smooth fade-in after video completes */}
      <nav className={`fixed top-0 left-0 w-full px-6 sm:px-12 py-6 flex justify-between items-center z-[9999] text-white nav-bar transition-all duration-1000 ease-out ${navVisible ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
        {/* Left Side: Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-sm font-mono text-xs font-bold shadow-xs">
            L8
          </div>
          <a
            href="#"
            className="font-display font-medium text-lg tracking-[-1px] text-white uppercase text-decoration-none"
          >
            LOGILANE
          </a>
        </div>

        {/* Right Side: CTA Button + Menu Toggle */}
        <div className="flex items-center gap-8 sm:gap-12">
          <a
            href="#terminal"
            className="hidden sm:inline-block px-5 py-2 rounded-full border border-white/40 font-display font-medium text-xs uppercase tracking-[-0.5px] text-white hover:bg-white hover:text-black transition-all"
          >
            Get Started
          </a>

          {/* Menu Toggle */}
          <button
            onClick={handleToggle}
            className="nav-toggle font-display font-medium text-sm sm:text-base uppercase tracking-[-1px] cursor-pointer bg-transparent border-none text-white hover:opacity-75 transition-opacity flex items-center gap-2"
            aria-label="Toggle Menu"
          >
            <p>{isOpen ? 'Close' : 'Menu'}</p>
          </button>
        </div>
      </nav>

      {/* Full-Screen Dark Overlay with Animated Clip-Path */}
      <div className="menu-overlay">
        {/* Meta Content (Two Columns + Center Logistics Cinematic Frame) */}
        <div className="menu-content">
          <div className="menu-col">
            <p>
              Logilane Autonomous Artery
              <br />
              Corridor Ingress 01
              <br />
              Chicago ↔ Dallas Spine
              <br />
              Vol. 2026 // Class-8
              <br />
              dispatch@logilane.io
              <br />
              +1 (800) 582-7490
            </p>
          </div>

          {/* Center Logistics Image from folder */}
          <div className="hidden md:flex flex-col items-center justify-center pointer-events-auto">
            <div className="relative w-72 sm:w-80 md:w-96 lg:w-[480px] xl:w-[540px] h-44 sm:h-52 md:h-60 lg:h-68 rounded-md overflow-hidden border border-white/20 shadow-2xl group bg-neutral-900">
              <Image
                src="/images/logistics/truck-highway.jpg"
                alt="LogiLane Autonomous Logistics Corridor"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                sizes="(max-width: 1024px) 380px, 540px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90 uppercase tracking-widest pointer-events-none">
                <span className="font-semibold tracking-wider">CORRIDOR 01 // FREIGHT ARTERY</span>
                <span className="text-white/60">AUTONOMOUS L4</span>
              </div>
            </div>
          </div>

          <div className="menu-col">
            <p>
              Autonomous Freight Network
              <br />
              V2V Platoon Coupling
              <br />
              Level 4 Transport
              <br />
              FMVSS / DOT Compliant
              <br />
              Ref: L8-ORD-DFW
              <br />
              All Systems Operational
            </p>
          </div>
        </div>

        {/* Oversized Anton Links Row with Per-Character Roll */}
        <div className="menu-links-wrapper gap-20 sm:gap-24 lg:gap-32">
          {links.map((item, idx) => (
            <div key={idx} className="menu-link">
              <a
                href={
                  item === 'About'
                    ? '#about'
                    : item === 'Corridors'
                    ? '#'
                    : item === 'Services'
                    ? '#awards'
                    : item === 'Simulator'
                    ? '#simulator'
                    : item === 'Hardware'
                    ? '#specs'
                    : item === 'Terminal'
                    ? '#terminal'
                    : '#'
                }
                onClick={handleToggle}
              >
                <span>
                  {item.split('').map((char, cIdx) => (
                    <span key={cIdx} className="char">
                      {char}
                    </span>
                  ))}
                </span>
                <span>
                  {item.split('').map((char, cIdx) => (
                    <span key={cIdx} className="char">
                      {char}
                    </span>
                  ))}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
