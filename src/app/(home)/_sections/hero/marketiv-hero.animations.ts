import { gsap } from "@/lib/gsap";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";
import { heroNavbarMotionConfig } from "./marketiv-hero.data";

type HeroAnimationCleanup = () => void;

export function animateHeroSection(section: HTMLElement | null): HeroAnimationCleanup {
  if (!section) {
    return () => undefined;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  if (!prefersReducedMotion) {
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
  }

  const navShell = section.querySelector<HTMLElement>(".hero-nav-shell");

  if (navShell) {
    gsap.to(navShell, {
      scale: heroNavbarMotionConfig.shrinkScale,
      y: heroNavbarMotionConfig.translateY,
      boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
      backdropFilter: `blur(${heroNavbarMotionConfig.blurPx}px)`,
      ease: "none",
      scrollTrigger: createSectionScrollTrigger(section, {
        start: "top top",
        end: `+=${heroNavbarMotionConfig.scrollDistance}`,
        scrub: true,
      }),
    });
  }

  const navTrack = section.querySelector<HTMLElement>(".hero-nav-track");
  const navIndicator = section.querySelector<HTMLElement>(".hero-nav-indicator");
  const navLinks = Array.from(section.querySelectorAll<HTMLAnchorElement>(".hero-nav-link"));

  if (!navTrack || !navIndicator || navLinks.length === 0 || prefersReducedMotion) {
    return () => undefined;
  }

  const moveIndicator = (element: HTMLAnchorElement): void => {
    const trackRect = navTrack.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    gsap.to(navIndicator, {
      x: itemRect.left - trackRect.left,
      width: itemRect.width,
      opacity: 1,
      duration: heroNavbarMotionConfig.hoverDuration,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const hideIndicator = (): void => {
    gsap.to(navIndicator, {
      opacity: 0,
      duration: heroNavbarMotionConfig.hoverFadeDuration,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const detachFns: Array<() => void> = [];

  navLinks.forEach((link) => {
    const handleEnter = () => moveIndicator(link);
    const handleFocus = () => moveIndicator(link);

    link.addEventListener("mouseenter", handleEnter);
    link.addEventListener("focus", handleFocus);

    detachFns.push(() => link.removeEventListener("mouseenter", handleEnter));
    detachFns.push(() => link.removeEventListener("focus", handleFocus));
  });

  navTrack.addEventListener("mouseleave", hideIndicator);
  detachFns.push(() => navTrack.removeEventListener("mouseleave", hideIndicator));

  return () => {
    detachFns.forEach((detach) => detach());
  };
}
