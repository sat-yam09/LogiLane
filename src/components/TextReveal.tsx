'use client';

import React, { useLayoutEffect, useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface TextRevealProps {
  children: React.ReactNode; // plain text (or lightly inline-formatted) — SplitText operates on the text nodes
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger "start" position, e.g. 'top 85%' */
  start?: string;
  /** Words to keep in `highlightColor`, matched case-insensitively, punctuation-stripped */
  highlightWords?: string[];
  highlightColor?: string;
  /** Adds a subtle blur-in on top of the mask reveal. Turn off on perf-sensitive mobile views if needed. */
  blur?: boolean;
}

export default function TextReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.06,
  ease = 'expo.out',
  start = 'top 85%',
  highlightWords = [],
  highlightColor = '#263EFF',
  blur = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const normalizedHighlights = highlightWords.map((w) => w.toLowerCase());

    // SplitText.create wraps each line in an overflow-hidden mask div and
    // splits words inside it — this is what makes multi-line reveals work
    // correctly (each line animates independently instead of one flat
    // column-wipe across the whole block).
    const split = SplitText.create(el, {
      type: 'lines,words',
      mask: 'lines',
      autoSplit: true, // re-splits cleanly on resize / webfont load
      onSplit(self) {
        if (normalizedHighlights.length) {
          self.words.forEach((word) => {
            const clean = (word.textContent || '')
              .toLowerCase()
              .replace(/[.,!?;:()'"]/g, '');
            if (normalizedHighlights.includes(clean)) {
              (word as HTMLElement).style.color = highlightColor;
            }
          });
        }

        if (prefersReduced) {
          gsap.set(self.words, { opacity: 1, yPercent: 0, filter: 'none' });
          return gsap.timeline();
        }

        // Returning the animation here lets SplitText auto-manage/replay it
        // correctly if autoSplit re-splits the text later.
        return gsap.from(self.words, {
          yPercent: 115,
          opacity: 0,
          filter: blur ? 'blur(8px)' : 'none',
          duration,
          delay,
          ease,
          stagger: { each: stagger, from: 'start' },
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
      },
    });

    // Restores the original single text node on unmount — prevents leftover
    // wrapper divs if this component mounts/unmounts repeatedly.
    return () => split.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, duration, stagger, ease, start, highlightColor, blur]);

  return (
    <Component ref={containerRef} className={className} data-reveal="true">
      {children}
    </Component>
  );
}
