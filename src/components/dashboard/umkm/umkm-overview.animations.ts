import { gsap } from "@/lib/gsap";

export function animateUmkmOverview(root: HTMLElement) {
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .from(".umkm-overview-head", { y: 24, autoAlpha: 0, duration: 0.45 })
    .from(".umkm-overview-kpi", { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.36 }, "-=0.2")
    .from(".umkm-overview-action", { y: 14, autoAlpha: 0, stagger: 0.07, duration: 0.32 }, "-=0.2")
    .from(".umkm-overview-row", { y: 12, autoAlpha: 0, stagger: 0.06, duration: 0.3 }, "-=0.15");

  const cards = gsap.utils.toArray<HTMLElement>(".umkm-hover-card", root);
  const handlers = cards.map((card) => {
    const enter = () => gsap.to(card, { y: -3, duration: 0.2, ease: "power2.out" });
    const leave = () => gsap.to(card, { y: 0, duration: 0.2, ease: "power2.out" });

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    gsap.set(card, { transformOrigin: "center" });

    return { card, enter, leave };
  });

  return () => {
    handlers.forEach(({ card, enter, leave }) => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    });
  };
}
