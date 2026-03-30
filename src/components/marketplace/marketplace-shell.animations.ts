import { gsap, ScrollTrigger } from "@/lib/gsap";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";

export function animateMarketplaceIntro(section: HTMLElement | null): void {
  if (!section) {
    return;
  }

  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: createSectionScrollTrigger(section),
    })
    .from(".mp-eyebrow", { y: 12, opacity: 0, duration: 0.35 })
    .from(".mp-heading-line", { yPercent: 105, opacity: 0, duration: 0.62, stagger: 0.08 }, "-=0.05")
    .from(".mp-description", { y: 14, opacity: 0, duration: 0.45 }, "-=0.25")
    .from(".mp-controls", { y: 16, opacity: 0, duration: 0.45 }, "-=0.2");
}

export function animateMarketplaceCards(section: HTMLElement | null): void {
  if (!section) {
    return;
  }

  const cards = gsap.utils.toArray<HTMLElement>(".mp-card", section);

  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          end: "bottom 65%",
          markers: false,
          once: true,
        },
      }
    );
  });

  ScrollTrigger.refresh();
}