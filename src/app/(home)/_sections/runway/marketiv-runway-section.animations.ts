import { gsap } from "@/lib/gsap";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";

export function animateRunwaySection(section: HTMLElement | null): void {
  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: createSectionScrollTrigger(section),
    })
    .from(".runway-eyebrow", { y: 14, opacity: 0, duration: 0.35 })
    .from(".runway-title", { yPercent: 102, opacity: 0, duration: 0.65 }, "-=0.1")
    .from(
      ".runway-divider",
      { scaleX: 0, transformOrigin: "left center", duration: 0.45 },
      "-=0.25"
    )
    .from(".runway-card", { y: 24, opacity: 0, duration: 0.5, stagger: 0.09 }, "-=0.2")
    .from(".runway-ticker-shell", { y: 8, opacity: 0, duration: 0.35 }, "-=0.18");

  gsap.to(".runway-ticker-track", {
    xPercent: -34,
    ease: "none",
    scrollTrigger: createSectionScrollTrigger(section, {
      start: "top bottom",
      end: "bottom top",
      scrub: 0.85,
    }),
  });
}
