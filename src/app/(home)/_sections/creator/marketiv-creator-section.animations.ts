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
    .from(".creator-ui-orb", { scale: 0.82, opacity: 0, duration: 0.42 }, "-=0.26")
    .from(
      ".creator-ui-tag",
      { y: 14, opacity: 0, duration: 0.34, stagger: 0.08 },
      "-=0.24"
    )
    .from(
      ".creator-ui-card",
      { y: 18, opacity: 0, duration: 0.4, stagger: 0.09 },
      "-=0.25"
    )
    .from(".creator-metric-card", { x: 24, opacity: 0, duration: 0.45 }, "-=0.2");

  if (section && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const floatCards = section.querySelectorAll<HTMLElement>(".creator-ui-float");

    if (floatCards.length > 0) {
      gsap.to(floatCards, {
        y: -6,
        duration: 2.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "center",
        },
      });
    }

    const floatingTags = section.querySelectorAll<HTMLElement>(".creator-ui-tag-float");

    if (floatingTags.length > 0) {
      floatingTags.forEach((tag) => {
        const floatDistance = gsap.utils.random(10, 15);
        const floatDuration = gsap.utils.random(2.8, 4.1);
        const randomDelay = gsap.utils.random(0, 1.2);

        gsap.to(tag, {
          y: -floatDistance,
          duration: floatDuration,
          delay: randomDelay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }
  }
}
