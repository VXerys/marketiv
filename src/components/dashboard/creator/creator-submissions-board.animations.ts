import { gsap } from "@/lib/gsap";

export function animateCreatorSubmissionsBoard(root: HTMLElement) {
  const select = gsap.utils.selector(root);

  gsap
    .timeline({ defaults: { ease: "power2.out" } })
    .from(select(".creator-submissions-head"), { autoAlpha: 0, y: 22, duration: 0.42 })
    .from(select(".creator-submissions-kpi"), { autoAlpha: 0, y: 14, stagger: 0.07, duration: 0.3 }, "-=0.2")
    .from(select(".creator-submissions-row"), { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.24 }, "-=0.14");
}
