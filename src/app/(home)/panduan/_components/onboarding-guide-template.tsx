"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createSectionScrollTrigger } from "@/lib/animations/scroll-configs";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GuideStep {
  id: string;
  title: string;
  objective: string;
  description: string;
  checklist: string[];
  counterpartyLabel: string;
  counterpartyChecklist: string[];
  image: {
    src: string;
    alt: string;
    badge: string;
  };
}

interface OnboardingGuideTemplateProps {
  audienceLabel: string;
  heroTag: string;
  title: string;
  subtitle: string;
  keyPillars: string[];
  steps: GuideStep[];
  primaryCta: {
    label: string;
    href: string;
  };
}

const NAV_SHELL_CLASS = "bg-surface/45 border-border-strong/35";
const NAV_ITEM_ACTIVE_CLASS = "border-foreground/45 bg-surface/75 text-foreground";
const NAV_ITEM_INACTIVE_CLASS =
  "border-border bg-background text-foreground-muted motion-safe:hover:border-border-strong/45 motion-safe:hover:bg-surface/45 motion-safe:hover:text-foreground";

export function OnboardingGuideTemplate({
  audienceLabel,
  heroTag,
  title,
  subtitle,
  keyPillars,
  steps,
  primaryCta,
}: OnboardingGuideTemplateProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id ?? "");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const activeStepIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeStepId)
  );
  const activeStep = steps[activeStepIndex] ?? steps[0];

  const handleStepJump = (stepId: string) => {
    const target = stepRefs.current[stepId];

    if (!target) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const mobileNavHeight = mobileNavRef.current?.offsetHeight ?? 84;
    const offsetY = isMobile ? mobileNavHeight + 12 : 104;

    setActiveStepId(stepId);
    setIsMobileNavOpen(false);

    gsap.to(window, {
      duration: 0.95,
      ease: "power2.inOut",
      scrollTo: {
        y: target,
        offsetY,
        autoKill: true,
      },
    });
  };

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!mobileNavRef.current?.contains(target)) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileNavOpen]);

  useGSAP(
    () => {
      const root = containerRef.current;

      if (!root) {
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stepCards = gsap.utils.toArray<HTMLElement>(".guide-step-card", root);
      const stepTriggers: ScrollTrigger[] = [];

      stepCards.forEach((card) => {
        const stepId = card.dataset.stepId;

        if (!stepId) {
          return;
        }

        const activeTrigger = ScrollTrigger.create({
          ...createSectionScrollTrigger(card, {
            start: "top 44%",
            end: "bottom 44%",
          }),
          onEnter: () => setActiveStepId(stepId),
          onEnterBack: () => setActiveStepId(stepId),
        });

        stepTriggers.push(activeTrigger);

        if (!prefersReducedMotion) {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 34,
              scale: 0.985,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.82,
              ease: "power2.out",
              scrollTrigger: createSectionScrollTrigger(card, {
                start: "top 82%",
                end: "top 46%",
                toggleActions: "play none none reverse",
              }),
            }
          );

          const heading = card.querySelector(".guide-step-title");
          const objective = card.querySelector(".guide-step-objective");
          const visual = card.querySelector(".guide-step-visual");

          gsap.fromTo(
            [heading, objective, visual],
            {
              y: 22,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              ease: "power2.out",
              duration: 0.64,
              stagger: 0.08,
              scrollTrigger: createSectionScrollTrigger(card, {
                start: "top 78%",
                end: "top 46%",
                toggleActions: "play none none reverse",
              }),
            }
          );
        }
      });

      if (!prefersReducedMotion) {
        gsap.fromTo(
          [".guide-hero-copy", ".guide-pillar-shell"],
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: createSectionScrollTrigger(root, {
              start: "top 92%",
              end: "top 65%",
              once: true,
            }),
          }
        );

        gsap.fromTo(
          ".guide-nav-button",
          {
            autoAlpha: 0,
            y: 16,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: createSectionScrollTrigger(root, {
              start: "top 86%",
              end: "top 62%",
              once: true,
            }),
          }
        );
      }

      return () => {
        stepTriggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [steps] }
  );

  return (
    <main ref={containerRef} className="landing-light min-h-screen overflow-x-clip bg-background text-foreground">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-[1320px] px-5 pb-12 pt-24 md:px-10 md:pb-16 md:pt-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
            <div className="guide-hero-copy">
              <p className="font-label text-[10px] tracking-[0.26em] text-foreground-subtle">{audienceLabel}</p>
              <h1 className="mt-4 font-heading text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.88] tracking-[-0.04em]">
                <span className="block">{title}</span>
                <span className="block text-foreground-subtle">{heroTag}</span>
              </h1>
              <p className="mt-6 max-w-3xl text-body-lg leading-relaxed text-foreground-muted">{subtitle}</p>
            </div>

            <div
              className={`guide-pillar-shell group border p-5 transition-[transform,border-color,background-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface/55 ${NAV_SHELL_CLASS}`}
            >
              <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">ALUR INTI</p>
              <ul className="mt-4 space-y-2.5 text-sm text-foreground-muted">
                {keyPillars.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[6px] inline-block size-1.5 bg-foreground transition-transform duration-300 ease-quart-out motion-safe:group-hover:scale-125"
                    />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className="mx-auto grid w-full max-w-[1320px] gap-0 py-8 md:px-10 md:py-12 lg:grid-cols-[220px_minmax(0,1fr)]"
          style={{
            paddingLeft: "max(env(safe-area-inset-left), 1.25rem)",
            paddingRight: "max(env(safe-area-inset-right), 1.25rem)",
          }}
        >
          <aside
            className={`hidden border p-5 transition-[background-color,border-color] duration-300 ease-quart-out motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface/45 lg:sticky lg:top-28 lg:block lg:h-fit ${NAV_SHELL_CLASS}`}
          >
            <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">STEP NAV</p>
            <ol className="mt-4 space-y-3 text-sm text-foreground-muted">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className="flex items-start gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => handleStepJump(step.id)}
                    aria-current={activeStepId === step.id ? "step" : undefined}
                    className={`guide-nav-button inline-flex min-h-14 w-full items-start gap-3 border px-2 py-2 text-left transition-[transform,background-color,border-color,color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      activeStepId === step.id
                        ? NAV_ITEM_ACTIVE_CLASS
                        : NAV_ITEM_INACTIVE_CLASS
                    }`}
                  >
                    <span className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">{step.id}</span>
                    <span className="break-words">{step.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div
            ref={mobileNavRef}
            className={`lg:hidden sticky top-0 z-20 border border-b-0 p-5 backdrop-blur transition-[background-color,border-color] duration-300 ease-quart-out ${NAV_SHELL_CLASS}`}
            style={{ top: "env(safe-area-inset-top)" }}
          >
            <div className="relative min-h-11 pr-14">
              <div className="min-w-0 max-w-[calc(100%-3.75rem)]">
                <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">STEP NAV</p>
                <div className="mt-1 flex items-center gap-2.5">
                  <span className="inline-flex min-h-6 min-w-14 items-center justify-center border border-border bg-background px-2 font-label text-[9px] tracking-[0.16em] text-foreground">
                    STEP {activeStep?.id}
                  </span>
                  <p className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm text-foreground-muted">{activeStep?.title}</p>
                </div>
              </div>

              <button
                type="button"
                aria-label={isMobileNavOpen ? "Tutup menu step" : "Buka menu step"}
                aria-expanded={isMobileNavOpen}
                aria-controls="guide-mobile-step-menu"
                onClick={() => setIsMobileNavOpen((current) => !current)}
                className="absolute right-0 top-0 inline-flex size-11 shrink-0 items-center justify-center border border-border bg-background/70 transition-[transform,border-color,background-color] duration-300 ease-quart-out motion-safe:hover:border-border-strong/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="relative block h-4 w-5">
                  <span
                    className={`absolute left-0 top-0 h-px w-5 bg-foreground transition-transform duration-300 ease-quart-out ${
                      isMobileNavOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-px w-5 bg-foreground transition-opacity duration-300 ease-quart-out ${
                      isMobileNavOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[14px] h-px w-5 bg-foreground transition-transform duration-300 ease-quart-out ${
                      isMobileNavOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

            <div
              id="guide-mobile-step-menu"
              className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] duration-300 ease-quart-out ${
                isMobileNavOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ol className="space-y-2.5 border-t border-border pt-3">
                  {steps.map((step) => (
                    <li key={step.id} className="min-w-0">
                      <button
                        type="button"
                        onClick={() => handleStepJump(step.id)}
                        aria-current={activeStepId === step.id ? "step" : undefined}
                        className={`guide-nav-button inline-flex min-h-14 w-full items-start gap-2.5 border px-3 py-2.5 text-left transition-[transform,background-color,border-color,color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          activeStepId === step.id
                            ? NAV_ITEM_ACTIVE_CLASS
                            : NAV_ITEM_INACTIVE_CLASS
                        }`}
                      >
                        <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">{step.id}</p>
                        <p className="mt-1 break-words text-sm leading-snug">{step.title}</p>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="border border-border border-t-0 lg:border-l-0 lg:border-t">
            {steps.map((step, index) => (
              <article
                key={step.id}
                id={`step-${step.id}`}
                data-step-id={step.id}
                ref={(node) => {
                  stepRefs.current[step.id] = node;
                }}
                className={`guide-step-card group/article grid gap-6 border-b border-border p-5 transition-[transform,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong/30 motion-safe:hover:bg-surface/15 md:gap-8 md:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] ${
                  activeStepId === step.id ? "bg-surface/20" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">STEP {step.id}</p>
                  <h2 className="guide-step-title mt-3 break-words font-heading text-[clamp(1.62rem,3.3vw,2.8rem)] leading-[0.94] tracking-[-0.025em]">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-body-sm leading-relaxed text-foreground-muted">{step.description}</p>

                  <div className="guide-step-objective mt-6 border border-border bg-surface/30 p-4 transition-[border-color,background-color] duration-300 ease-quart-out motion-safe:group-hover/article:border-border-strong/35 motion-safe:group-hover/article:bg-surface/55">
                    <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">TUJUAN STEP</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{step.objective}</p>

                    <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
                      {step.checklist.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                          <span className="break-words">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t border-border pt-4">
                      <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">POV {step.counterpartyLabel}</p>
                      <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                        {step.counterpartyChecklist.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                            <span className="break-words">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="guide-step-visual relative min-h-[260px] overflow-hidden border border-border bg-foreground text-background sm:min-h-[300px] md:min-h-[340px]">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover grayscale transition-transform duration-500 ease-quart-out motion-safe:group-hover/article:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/82 via-foreground/48 to-foreground/72 transition-opacity duration-500 ease-quart-out motion-safe:group-hover/article:opacity-85" />

                  <div className="absolute bottom-0 left-0 right-0 border-t border-background/30 bg-foreground/70 px-4 py-3 backdrop-blur-sm transition-transform duration-400 ease-quart-out motion-safe:group-hover/article:translate-y-[-2px]">
                    <p className="font-label text-[10px] tracking-[0.2em] text-background/80">{step.image.badge}</p>
                    <p className="mt-1 text-sm text-background/92">Ganti visual ini dengan screenshot final saat fitur sudah siap.</p>
                  </div>
                </div>
              </article>
            ))}

            <div className="border-border bg-surface/20 p-5 md:p-7">
              <div className="flex flex-col gap-4 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">
                  Semua step di atas dirancang untuk membantu onboarding lebih cepat. Setelah screenshot final tersedia, cukup ganti URL gambar
                  di data step agar tampilan langsung ikut ter-update.
                </p>
                <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center lg:w-auto">
                  <Link
                    href="/"
                    className="inline-flex min-h-11 w-full items-center justify-center border border-border px-4 py-3 text-center font-label text-[10px] leading-tight tracking-[0.2em] text-foreground transition-[transform,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                  >
                    KEMBALI KE LANDING
                  </Link>
                  <Link
                    href={primaryCta.href}
                    className="inline-flex min-h-11 w-full items-center justify-center border border-foreground bg-foreground px-4 py-3 text-center font-label text-[10px] leading-tight tracking-[0.2em] text-background transition-[transform,opacity] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                  >
                    {primaryCta.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
