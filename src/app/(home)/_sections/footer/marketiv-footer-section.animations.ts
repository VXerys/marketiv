import { gsap } from "@/lib/gsap";

export function animateFooterSection(section: HTMLElement | null): void {
  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        markers: false,
      },
    })
    .from(".footer-top-line", { scaleX: 0, duration: 0.45, transformOrigin: "left center" })
    .from(
      ".footer-title-line",
      { yPercent: 102, opacity: 0, duration: 0.68, stagger: 0.08 },
      "-=0.18"
    )
    .from(".footer-cta", { y: 16, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.2")
    .from(".footer-brand-stack", { yPercent: 18, opacity: 0, duration: 0.52 }, "-=0.16")
    .from(
      ".footer-main-divider",
      { scaleX: 0, duration: 0.45, transformOrigin: "left center" },
      "-=0.15"
    )
    .from(".footer-column", { y: 18, opacity: 0, duration: 0.45, stagger: 0.09 }, "-=0.15")
    .from(".footer-legal", { y: 10, opacity: 0, duration: 0.35 }, "-=0.15");
}
