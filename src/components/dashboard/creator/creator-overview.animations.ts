import { gsap } from "@/lib/gsap";

export function animateCreatorOverview(root: HTMLElement) {
  const select = gsap.utils.selector(root);
  const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

  timeline
    .from(select(".creator-overview-head"), { autoAlpha: 0, y: 24, duration: 0.42 })
    .from(select(".creator-overview-kpi"), { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.3 }, "-=0.2")
    .from(select(".creator-overview-block"), { autoAlpha: 0, y: 12, stagger: 0.05, duration: 0.28 }, "-=0.15");

  const cards = gsap.utils.toArray<HTMLElement>(".creator-hover-card", root);
  const handlers = cards.map((card) => {
    const enter = () => gsap.to(card, { y: -3, duration: 0.2, ease: "power2.out" });
    const leave = () => gsap.to(card, { y: 0, duration: 0.2, ease: "power2.out" });

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    return { card, enter, leave };
  });

  return () => {
    handlers.forEach(({ card, enter, leave }) => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    });
  };
}
