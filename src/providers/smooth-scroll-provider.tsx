"use client";

/**
 * SmoothScrollProvider
 *
 * Initializes Lenis for smooth scrolling and synchronizes its RAF loop
 * with GSAP's ticker — critical for preventing scroll jitter on
 * ScrollTrigger-driven animations.
 *
 * 📱 Mobile Analogy: Like a custom ScrollPhysics + AnimationController
 * wired to a Ticker in Flutter, ensuring smooth, frame-synchronized scroll.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with Elegant Brutalist feel:
    // - lerp 0.1 → fluid, weighted momentum (not too fast)
    // - duration 1.2 → comfortable travel distance per scroll
    // - easing → cubic ease-out for a refined deceleration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis RAF with GSAP ticker.
    // This is the critical bridge — without it, ScrollTrigger and
    // Lenis run on separate animation frames, causing jitter.
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for precise sync

    // Tell ScrollTrigger to use Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      // Cleanup: prevent memory leaks on unmount
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
