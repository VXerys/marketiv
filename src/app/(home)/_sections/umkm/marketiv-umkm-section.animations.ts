import { gsap } from "@/lib/gsap";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";

export function animateUmkmSection(section: HTMLElement | null): void {
  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: createSectionScrollTrigger(section),
    })
    .from(".umkm-table-eyebrow", { y: 16, opacity: 0, duration: 0.35 })
    .from(".umkm-table-shell", { y: 22, opacity: 0, duration: 0.55 }, "-=0.15")
    .from(".umkm-ai-brief", { y: 14, opacity: 0, duration: 0.4 }, "-=0.22")
    .from(".umkm-edition-eyebrow", { y: 12, opacity: 0, duration: 0.3 }, "-=0.25")
    .from(
      ".umkm-title-line",
      { yPercent: 102, opacity: 0, duration: 0.6, stagger: 0.08 },
      "-=0.1"
    )
    .from(".umkm-feature", { y: 18, opacity: 0, duration: 0.45, stagger: 0.1 }, "-=0.18")
    .from(".umkm-cta", { y: 12, opacity: 0, duration: 0.35 }, "-=0.15");
}
