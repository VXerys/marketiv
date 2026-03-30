import { gsap } from "@/lib/gsap";

export function animateUmkmOrdersBoard(root: HTMLElement) {
  const select = gsap.utils.selector(root);
  const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

  timeline
    .from(select(".umkm-orders-head"), { autoAlpha: 0, y: 22, duration: 0.42 })
    .from(select(".umkm-orders-kpi"), { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.33 }, "-=0.2")
    .from(select(".umkm-orders-table"), { autoAlpha: 0, y: 12, duration: 0.3 }, "-=0.15")
    .from(select(".umkm-orders-row"), { autoAlpha: 0, y: 8, stagger: 0.04, duration: 0.22 }, "-=0.15");
}
