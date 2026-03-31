import { gsap } from "@/lib/gsap";

export function animateUmkmAnalyticsBoard(root: HTMLElement) {
  const select = gsap.utils.selector(root);
  const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

  timeline
    .from(select(".umkm-analytics-head"), { autoAlpha: 0, y: 22, duration: 0.4 })
    .from(select(".umkm-analytics-top-card"), { autoAlpha: 0, y: 16, stagger: 0.07, duration: 0.3 }, "-=0.2")
    .from(select(".umkm-analytics-overview"), { autoAlpha: 0, y: 14, duration: 0.28 }, "-=0.15")
    .from(select(".umkm-analytics-chart-block"), { autoAlpha: 0, y: 8, stagger: 0.06, duration: 0.26 }, "-=0.16")
    .from(select(".umkm-analytics-bottom"), { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.28 }, "-=0.14")
    .from(select(".umkm-analytics-transaction-row"), { autoAlpha: 0, y: 8, stagger: 0.035, duration: 0.22 }, "-=0.12");
}

export function animateUmkmAnalyticsPeriodChange(root: HTMLElement) {
  const select = gsap.utils.selector(root);
  const charts = select(".umkm-analytics-chart-block");

  gsap.killTweensOf(charts);
  gsap.fromTo(charts, { autoAlpha: 0.5, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.05, ease: "power2.out" });
}
