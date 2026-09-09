'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Trigger reveal sequence when video reaches 4.8s (or ends)
    const triggerReveal = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      // Freeze video on final frame
      video.pause();
      setIsRevealed(true);

      // Notify global navigation to smoothly fade in
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hero-video-ended'));
      }

      // Animate text rising from behind the truck
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, ease: 'power3.out' }
        );
      }

      // Animate road CTA buttons capsule
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' }
        );
      }
    };

    const handleTimeUpdate = () => {
      // Trim point: 4.8s ensures the truck is frozen in center before any watermark
      if (video.currentTime >= 4.8) {
        triggerReveal();
      }
    };

    const handleEnded = () => {
      triggerReveal();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Attempt video playback
    video.play().catch(() => {
      // If autoplay is blocked by browser policies, reveal after a short delay
      setTimeout(triggerReveal, 2000);
    });

    // Safety fallback: reveal UI after 5s max
    const fallbackTimer = setTimeout(triggerReveal, 5000);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Smooth fade and upward drift as user scrolls past hero
      gsap.to('.hero-scroll-container', {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full h-screen min-h-[640px] max-h-[1440px] overflow-hidden select-none bg-[#0c141c]"
    >
      <div className="hero-scroll-container relative w-full h-full">
        {/* ── LAYER 0: Background Cinematic Video (Exact 16:9 Cropped Framing matching user reference, Non-looping, Freezes on End) ── */}
        <video
          ref={videoRef}
          src="/videos/hero-truck-cropped.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* ── LAYER 10: "Digital Logistic" Typography (Positioned in Sky Behind the Truck) ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none pt-[8vh] sm:pt-[10vh] md:pt-[12vh] lg:pt-[14vh] px-4">
          <h1
            ref={titleRef}
            className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] text-white tracking-[-0.04em] uppercase text-center leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            Digital Logistic
          </h1>
        </div>

        {/* ── LAYER 20: Truck + Road Foreground Occlusion Layer (Matching 16:9 Cropped Cutout) ── */}
        {/* When active, the truck body sits IN FRONT of the text, visually placing the letters BEHIND the truck */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-truck-foreground-cropped.png"
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 z-20 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500 ease-out ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* ── LAYER 30: Road Foreground CTA Buttons Capsule (Matching Reference Layout) ── */}
        <div
          ref={ctaRef}
          className="absolute bottom-10 sm:bottom-14 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center opacity-0 pointer-events-auto"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl">
            <a
              href="#terminal"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-[#0F172A] text-white font-display text-xs sm:text-sm font-semibold tracking-[-0.5px] hover:bg-slate-800 transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>Get Instant Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#awards"
              className="inline-flex items-center px-6 sm:px-8 py-3 rounded-full bg-white text-[#0F172A] font-display text-xs sm:text-sm font-semibold tracking-[-0.5px] hover:bg-slate-100 transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>View Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
