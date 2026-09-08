'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create('hop', '.8, 0, .3, 1');
  } catch (e) {
    // ignore if already registered
  }
}

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    const initAnimation = () => {
      if (cancelled) return;

      const isMobile = window.innerWidth <= 1000;

      const ctx = gsap.context(() => {
        // Initial setup for character spans to avoid any overlap
        gsap.set('.preloader .intro-title .char span', { y: '-100%' });
        gsap.set('.preloader .outro-title .char span', { y: '100%' });
        gsap.set('.tag p .word', { y: '-100%' });

        // Pre-position split-overlay
        gsap.set(
          ['.split-overlay .intro-title .first-char span', '.split-overlay .outro-title .char span'],
          { y: '0%' }
        );
        gsap.set('.split-overlay .intro-title .first-char', {
          x: isMobile ? '7.5rem' : '18rem',
          y: isMobile ? '-1rem' : '-2.75rem',
          fontWeight: '900',
          scale: 0.75,
        });
        gsap.set('.split-overlay .outro-title .char', {
          x: isMobile ? '-3rem' : '-8rem',
          fontSize: isMobile ? '6rem' : '14rem',
          fontWeight: '500',
        });

        // Build Timeline with Snappy 1.5x Speed
        const tl = gsap.timeline({
          defaults: { ease: 'hop' },
          onComplete: () => {
            gsap.to(root, {
              opacity: 0,
              duration: 0.5,
              delay: 0.2,
              ease: 'power2.out',
              onComplete: () => {
                setIsActive(false);
              },
            });
          },
        });

        tl.timeScale(2.4);

        // 1. Tags in
        const tags = root.querySelectorAll('.tag');
        tags.forEach((tag, i) => {
          tl.to(
            tag.querySelectorAll('p .word'),
            { y: '0%', duration: 0.75 },
            0.5 + i * 0.1
          );
        });

        // 2. Intro title in
        tl.to(
          '.preloader .intro-title .char span',
          { y: '0%', duration: 0.75, stagger: 0.05 },
          0.5
        );

        // 3. Intro title out (except first char)
        tl.to(
          '.preloader .intro-title .char:not(.first-char) span',
          { y: '100%', duration: 0.75, stagger: 0.05 },
          2
        );

        // 4. Outro "8" in
        tl.to(
          '.preloader .outro-title .char span',
          { y: '0%', duration: 0.75, stagger: 0.075 },
          2.5
        );

        // 5. Slide together
        tl.to(
          '.preloader .intro-title .first-char',
          { x: isMobile ? '9rem' : '21.25rem', duration: 1 },
          3.5
        );
        tl.to(
          '.preloader .outro-title .char',
          { x: isMobile ? '-3rem' : '-8rem', duration: 1 },
          3.5
        );

        // 6. Morph into logo lockup
        tl.to(
          '.preloader .intro-title .first-char',
          {
            x: isMobile ? '7.5rem' : '18rem',
            y: isMobile ? '-1rem' : '-2.75rem',
            fontWeight: '900',
            scale: 0.75,
            duration: 0.75,
          },
          4.5
        );
        tl.to(
          '.preloader .outro-title .char',
          {
            x: isMobile ? '-3rem' : '-8rem',
            fontSize: isMobile ? '6rem' : '14rem',
            fontWeight: '500',
            duration: 0.75,
            onComplete: () => {
              gsap.set('.preloader', {
                clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              });
              gsap.set('.split-overlay', {
                clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
              });
            },
          },
          4.5
        );

        // 7. Letterbox slit opens onto the underlying real hero layout
        tl.to('.preloader', { y: '-2.5%', duration: 0.8 }, 5);
        tl.to('.split-overlay', { y: '2.5%', duration: 0.8 }, 5);

        // 8. Tags out
        tags.forEach((tag, i) => {
          tl.to(
            tag.querySelectorAll('p .word'),
            { y: '100%', duration: 0.75 },
            5.5 + i * 0.1
          );
        });

        // 9. The split - panels part, unveiling the underlying real hero section
        tl.to(
          ['.preloader', '.split-overlay'],
          {
            y: (i: number) => (i === 0 ? '-100%' : '100%'),
            duration: 1,
            ease: 'hop',
          },
          6
        );
      }, root);

      return () => {
        ctx.revert();
      };
    };

    const failSafeTimer = setTimeout(() => {
      setIsActive(false);
    }, 3800);

    let cleanupFn: (() => void) | undefined;
    cleanupFn = initAnimation();

    return () => {
      cancelled = true;
      clearTimeout(failSafeTimer);
      if (cleanupFn) cleanupFn();
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 w-full h-full z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* Top Preloader Screen */}
      <div className="preloader">
        <div className="intro-title">
          <h1>
            <span className="char first-char"><span>L</span></span>
            <span className="char"><span>O</span></span>
            <span className="char"><span>G</span></span>
            <span className="char"><span>I</span></span>
            <span className="char"><span>L</span></span>
            <span className="char"><span>A</span></span>
            <span className="char"><span>N</span></span>
            <span className="char"><span>E</span></span>
          </h1>
        </div>
        <div className="outro-title">
          <h1>
            <span className="char"><span>8</span></span>
          </h1>
        </div>
      </div>

      {/* Split Overlay Screen (Duplicate for Split-Screen Effect) */}
      <div className="split-overlay">
        <div className="intro-title">
          <h1>
            <span className="char first-char"><span>L</span></span>
            <span className="char"><span>O</span></span>
            <span className="char"><span>G</span></span>
            <span className="char"><span>I</span></span>
            <span className="char"><span>L</span></span>
            <span className="char"><span>A</span></span>
            <span className="char"><span>N</span></span>
            <span className="char"><span>E</span></span>
          </h1>
        </div>
        <div className="outro-title">
          <h1>
            <span className="char"><span>8</span></span>
          </h1>
        </div>
      </div>

      {/* Tags Overlay */}
      <div className="tags-overlay">
        <div className="tag tag-1">
          <p><span className="word">Autonomous</span> <span className="word">Artery</span></p>
        </div>
        <div className="tag tag-2">
          <p><span className="word">Class-8</span> <span className="word">Heavy</span> <span className="word">Haul</span></p>
        </div>
        <div className="tag tag-3">
          <p><span className="word">Precision</span> <span className="word">Velocity</span></p>
        </div>
      </div>
    </div>
  );
}
