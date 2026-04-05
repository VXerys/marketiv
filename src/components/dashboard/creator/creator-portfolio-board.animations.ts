import { gsap } from "@/lib/gsap";

export function animateCreatorPortfolioBoard(root: HTMLElement) {
  const select = gsap.utils.selector(root);

  gsap
    .timeline({ defaults: { ease: "power2.out" } })
    .from(select(".creator-portfolio-head"), { autoAlpha: 0, y: 22, duration: 0.42 })
    .from(select(".creator-portfolio-card"), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.28 }, "-=0.2");
}
