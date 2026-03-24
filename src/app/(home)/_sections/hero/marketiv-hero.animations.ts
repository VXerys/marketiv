import { gsap, ScrollTrigger } from "@/lib/gsap";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";

export function animateHeroSection(section: HTMLElement | null): void {
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .from(".hero-nav-item", { y: -18, opacity: 0, duration: 0.45, stagger: 0.05 })
    .from(".hero-season", { y: 18, opacity: 0, duration: 0.4 }, "-=0.2")
    .from(
      ".hero-title-line",
      { yPercent: 105, opacity: 0, duration: 0.7, stagger: 0.1 },
      "-=0.15"
    )
    .from(".hero-card", { y: 26, opacity: 0, duration: 0.55, stagger: 0.1 }, "-=0.45")
    .from(".hero-cta", { y: 12, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.25");

  gsap.from(".hero-title-wrap", {
    scale: 1.04,
    opacity: 0.88,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: createSectionScrollTrigger(section, {
      start: "top top",
      end: "bottom top",
      scrub: true,
    }),
  });

  if (!section) {
    return;
  }

  const navbarStateTimeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
  });

  navbarStateTimeline
    .to(
      ".hero-navbar-bg",
      {
        autoAlpha: 0.96,
        duration: 0.3,
      },
      0
    )
    .to(
      ".hero-navbar-divider",
      {
        autoAlpha: 1,
        duration: 0.24,
      },
      0
    );

  if (window.scrollY > 8) {
    navbarStateTimeline.progress(1);
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top+=8 top",
    end: "bottom top",
    onEnter: () => navbarStateTimeline.play(),
    onEnterBack: () => navbarStateTimeline.play(),
    onLeaveBack: () => navbarStateTimeline.reverse(),
  });
}
