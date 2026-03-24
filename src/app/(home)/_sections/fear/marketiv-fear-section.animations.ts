import { gsap } from "@/lib/gsap";

export function animateFearSection(section: HTMLElement | null): void {
  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        markers: false,
      },
    })
    .from(".fear-label", { y: 16, opacity: 0, duration: 0.4 })
    .from(
      ".fear-heading-line",
      { yPercent: 105, opacity: 0, duration: 0.6, stagger: 0.08 },
      "-=0.15"
    )
    .from(
      ".fear-divider",
      { scaleX: 0, duration: 0.45, transformOrigin: "left center" },
      "-=0.25"
    )
    .from(".fear-card", { y: 24, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.15");
}
