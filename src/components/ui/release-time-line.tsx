"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock3, Rocket, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReleaseTimelineStatus = "completed" | "in-progress" | "planned";

export interface ReleaseTimelineImage {
  src: string;
  alt: string;
}

export interface ReleaseTimelineItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  dateLabel: string;
  status: ReleaseTimelineStatus;
  image?: ReleaseTimelineImage;
  icon?: LucideIcon;
  highlights?: string[];
  cta?: {
    label: string;
    href: string;
  };
}

export interface ReleaseTimeLineProps {
  label: string;
  title: string;
  subtitle: string;
  items: ReleaseTimelineItem[];
  className?: string;
}

function getStatusPresentation(status: ReleaseTimelineStatus): {
  icon: typeof CheckCircle2;
  label: string;
  className: string;
} {
  if (status === "completed") {
    return {
      icon: CheckCircle2,
      label: "COMPLETED",
      className: "border-emerald-600/35 bg-emerald-500/10 text-emerald-700",
    };
  }

  if (status === "in-progress") {
    return {
      icon: Clock3,
      label: "IN PROGRESS",
      className: "border-amber-600/35 bg-amber-500/10 text-amber-700",
    };
  }

  return {
    icon: Rocket,
    label: "PLANNED",
    className: "border-border-strong/45 bg-surface/55 text-foreground-muted",
  };
}

export function ReleaseTimeLine({ label, title, subtitle, items, className }: ReleaseTimeLineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sentinelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const frameRef = useRef<number | null>(null);
  const firstItemId = items[0]?.id ?? "";
  const [activeItemId, setActiveItemId] = useState<string>(firstItemId);
  const resolvedActiveItemId = items.some((item) => item.id === activeItemId)
    ? activeItemId
    : firstItemId;

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) {
          return;
        }

        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextStepId = visibleEntries[0].target.getAttribute("data-step-id");

        if (!nextStepId) {
          return;
        }

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = window.requestAnimationFrame(() => {
          setActiveItemId((current) => (current === nextStepId ? current : nextStepId));
        });
      },
      {
        root: null,
        rootMargin: "-18% 0px -44% 0px",
        threshold: [0.2, 0.4, 0.65],
      }
    );

    const observedNodes = items
      .map((item) => sentinelRefs.current[item.id])
      .filter((node): node is HTMLDivElement => node !== null);

    observedNodes.forEach((node) => observer.observe(node));

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      observer.disconnect();
    };
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className={cn("w-full max-w-full overflow-x-hidden border-b border-border", className)}
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 py-16 md:px-10 md:py-32">
        <header className="max-w-3xl">
          <p className="font-label text-[10px] tracking-[0.24em] text-foreground-subtle">{label}</p>
          <h2 className="mt-3 font-heading text-2xl leading-[0.94] tracking-[-0.03em] text-foreground md:text-3xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-body-sm leading-relaxed text-foreground-muted">{subtitle}</p>
        </header>

        <ol className="mt-10 space-y-10 md:mt-16 md:space-y-24">
          {items.map((item) => {
            const status = getStatusPresentation(item.status);
            const EntryIcon = item.icon ?? status.icon;
            const isActive = resolvedActiveItemId === item.id;

            return (
              <li key={item.id} className="relative">
                <div className="flex flex-col gap-4 md:gap-8 lg:flex-row">
                  <aside className="w-full shrink-0 md:w-64">
                    <div
                      className={cn(
                        "border p-4 transition-[border-color,background-color,transform] duration-300 ease-quart-out md:p-5",
                        isActive
                          ? "border-border-strong/45 bg-surface/65"
                          : "border-border bg-surface/30 motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface/55"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex size-8 items-center justify-center border border-border bg-background text-foreground">
                          <EntryIcon className="size-4" aria-hidden="true" />
                        </span>
                        <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">{item.phase}</p>
                      </div>
                      <h3 className="mt-3 font-heading text-[1.35rem] leading-[0.95] tracking-[-0.02em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-label text-[9px] tracking-[0.18em] text-foreground-subtle">
                        {item.dateLabel}
                      </p>
                    </div>
                  </aside>

                  <article
                    className={cn(
                      "min-w-0 flex-1 border bg-background p-4 transition-[border-color,background-color,transform] duration-300 ease-quart-out md:p-6",
                      isActive
                        ? "border-border-strong/45 bg-surface/20"
                        : "border-border motion-safe:hover:border-border-strong/35 motion-safe:hover:bg-surface/15"
                    )}
                  >
                    <div className="relative h-48 overflow-hidden border border-border bg-surface/35 md:h-72">
                      {item.image ? (
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 52vw"
                          className="object-cover grayscale"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-4 text-center">
                          <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">
                            PREVIEW TIMELINE
                          </p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                    </div>

                    <div className="mt-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 border px-2 py-1 font-label text-[8px] tracking-[0.16em]",
                          status.className
                        )}
                      >
                        <EntryIcon className="size-3" aria-hidden="true" />
                        {status.label}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.description}</p>
                    </div>

                    {item.highlights && item.highlights.length > 0 ? (
                      <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2.5">
                            <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                            <span className="break-words">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.cta ? (
                      <Link
                        href={item.cta.href}
                        className="mt-5 inline-flex min-h-11 w-full items-center justify-center border border-border-strong/45 bg-background/90 px-4 py-2.5 text-center font-label text-[10px] tracking-[0.16em] text-foreground transition-[transform,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/65 motion-safe:hover:bg-surface sm:w-auto"
                      >
                        {item.cta.label}
                      </Link>
                    ) : null}
                  </article>
                </div>

                <div
                  ref={(node) => {
                    sentinelRefs.current[item.id] = node;
                  }}
                  data-step-id={item.id}
                  aria-hidden="true"
                  className="timeline-sentinel pointer-events-none absolute inset-x-0 top-[52%] h-px"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
