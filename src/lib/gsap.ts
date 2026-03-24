/**
 * GSAP Global Configuration
 *
 * Central import point for GSAP + plugins across the entire project.
 * Always import `gsap` from this file, not directly from "gsap".
 *
 * 📱 Mobile Analogy: Like a singleton AnimationFactory that pre-configures
 * an AnimationController with all required TickerProviders registered.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

// Register all plugins once, globally.
// Must run client-side — safe because this file is only imported
// from "use client" components or providers.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP };
