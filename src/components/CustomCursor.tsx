'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on desktop with fine pointer (mouse) and wide screen
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let currentBadgeText = '';

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      // Check for custom hover data attributes
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], button, a, input, select');

      if (interactiveEl) {
        const cursorMode = interactiveEl.getAttribute('data-cursor');
        if (cursorMode === 'drag') {
          ringRef.current?.classList.add('drag-mode');
          currentBadgeText = 'DRAG';
        } else if (cursorMode === 'view') {
          ringRef.current?.classList.add('hover-active');
          currentBadgeText = 'VIEW';
        } else if (cursorMode === 'dispatch') {
          ringRef.current?.classList.add('hover-active');
          currentBadgeText = 'DISPATCH';
        } else {
          ringRef.current?.classList.add('hover-active');
          currentBadgeText = '';
        }

        if (badgeRef.current) {
          badgeRef.current.textContent = currentBadgeText;
          badgeRef.current.style.opacity = currentBadgeText ? '1' : '0';
        }
      } else {
        ringRef.current?.classList.remove('hover-active', 'drag-mode');
        if (badgeRef.current) {
          badgeRef.current.style.opacity = '0';
        }
      }
    };

    // Smooth Lerp animation loop for lagging trail ring
    let animationId: number;
    const render = () => {
      // Lerp easing (0.16 factor for weighted industrial feel)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate(${ringX + 28}px, ${ringY - 14}px)`;
      }

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={badgeRef} className="cursor-badge" />
    </div>
  );
}
