import { gsap } from "@/lib/gsap";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";

export function animateCreatorSection(section: HTMLElement | null): void {
  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: createSectionScrollTrigger(section),
    })
    .from(".creator-eyebrow", { y: 14, opacity: 0, duration: 0.35 })
    .from(
      ".creator-title-line",
      { yPercent: 105, opacity: 0, duration: 0.6, stagger: 0.09 },
      "-=0.05"
    )
    .from(".creator-intro", { y: 18, opacity: 0, duration: 0.45 }, "-=0.2")
    .from(
      ".creator-feature",
      { y: 20, opacity: 0, duration: 0.45, stagger: 0.1 },
      "-=0.2"
    )
    .from(".creator-cta", { y: 14, opacity: 0, duration: 0.35 }, "-=0.15")
    .from(".creator-visual", { scale: 0.97, opacity: 0, duration: 0.55 }, "-=0.25")
    .from(".creator-metric-card", { x: 24, opacity: 0, duration: 0.45 }, "-=0.2");
}
