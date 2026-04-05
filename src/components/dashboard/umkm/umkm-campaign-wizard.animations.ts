import { gsap } from "@/lib/gsap";

export function animateUmkmCampaignWizard(root: HTMLElement) {
  const select = gsap.utils.selector(root);
  const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

  timeline
    .from(select(".umkm-campaign-head"), { autoAlpha: 0, y: 22, duration: 0.42 })
    .from(select(".umkm-campaign-stat"), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.28 }, "-=0.22")
    .from(select(".umkm-campaign-step"), { autoAlpha: 0, y: 18, stagger: 0.07, duration: 0.34 }, "-=0.2")
    .from(select(".umkm-campaign-panel"), { autoAlpha: 0, y: 14, duration: 0.28 }, "-=0.14")
    .from(select(".umkm-campaign-note"), { autoAlpha: 0, y: 12, duration: 0.3 }, "-=0.15")
    .from(select(".umkm-created-card"), { autoAlpha: 0, y: 10, stagger: 0.06, duration: 0.25 }, "-=0.12");
}

export function animateUmkmCampaignStepChange(root: HTMLElement, progress: number) {
  const select = gsap.utils.selector(root);

  gsap.fromTo(select(".umkm-campaign-panel"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out" });

  gsap.fromTo(
    select(".umkm-campaign-progress"),
    { scaleX: 0.22 },
    { scaleX: progress, duration: 0.45, ease: "power3.out", transformOrigin: "left center" }
  );
}
