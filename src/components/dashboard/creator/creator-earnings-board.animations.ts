import { gsap } from "@/lib/gsap";

export function animateCreatorEarningsBoard(root: HTMLElement) {
  const select = gsap.utils.selector(root);

  gsap
    .timeline({ defaults: { ease: "power2.out" } })
    .from(select(".creator-earnings-head"), { autoAlpha: 0, y: 22, duration: 0.42 })
    .from(select(".creator-earnings-kpi"), { autoAlpha: 0, y: 14, stagger: 0.07, duration: 0.3 }, "-=0.2")
    .from(select(".creator-earnings-row"), { autoAlpha: 0, y: 8, stagger: 0.04, duration: 0.22 }, "-=0.14");
}
