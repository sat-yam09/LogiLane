'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function GlobalTextReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Elements to automatically register for the electric blue reveal wipe
    const selector = `
      h1:not(.preloader h1):not(.split-overlay h1):not(.card h1):not([data-reveal="true"]):not([data-no-reveal]):not([data-reveal="true"] h1):not([data-no-reveal] h1),
      h2:not([data-reveal="true"]):not([data-no-reveal]):not([data-reveal="true"] h2):not([data-no-reveal] h2),
      h3:not([data-reveal="true"]):not([data-no-reveal]):not([data-reveal="true"] h3):not([data-no-reveal] h3),
      .section-headline,
      .reveal-auto
    `;

    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.dataset.revealed === 'true') return;
            el.dataset.revealed = 'true';
            observer.unobserve(el);

            // Wrap text or apply horizontal clip-path mask wipe with electric blue laser
            el.style.position = 'relative';
            el.style.display = el.style.display || 'inline-block';
            el.style.clipPath = 'inset(0 100% 0 0)';
            el.style.willChange = 'clip-path';

            // Create laser line
            const laser = document.createElement('div');
            laser.className = 'reveal-laser-line';
            laser.style.opacity = '1';
            el.appendChild(laser);

            const progress = { val: 0 };
            const index = Array.from(elements).indexOf(el);
            const staggerDelay = (index % 3) * 0.12;

            gsap.to(progress, {
              val: 100,
              duration: 0.85,
              delay: staggerDelay,
              ease: 'power3.inOut',
              onUpdate: () => {
                const p = progress.val;
                laser.style.left = `${p}%`;
                el.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
              },
              onComplete: () => {
                el.style.clipPath = 'inset(0 0% 0 0)';
                gsap.to(laser, {
                  opacity: 0,
                  duration: 0.25,
                  onComplete: () => {
                    laser.remove();
                  },
                });
              },
            });
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
