"use client";

import Link from "next/link";

interface SiteErrorAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface SiteErrorTemplateProps {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights?: ReadonlyArray<string>;
  contextLabel?: string;
  reference?: string;
  retryLabel?: string;
  onRetry?: () => void;
  actions?: ReadonlyArray<SiteErrorAction>;
}

function actionClassName(variant: SiteErrorAction["variant"]): string {
  if (variant === "primary") {
    return "border-foreground bg-foreground text-background motion-safe:hover:opacity-90";
  }

  return "border-border-strong/45 bg-background text-foreground motion-safe:hover:border-foreground/65";
}

export function SiteErrorTemplate({
  code,
  eyebrow,
  title,
  description,
  highlights = [],
  contextLabel,
  reference,
  retryLabel,
  onRetry,
  actions = [],
}: SiteErrorTemplateProps) {
  return (
    <main className="landing-light min-h-screen border-y border-border bg-background text-foreground">
      <section className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="relative overflow-hidden border border-border bg-surface">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,0,0,0.08),transparent_38%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.07),transparent_36%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:54px_54px] opacity-35" />
          </div>

          <div className="relative z-10 bg-background/72 px-5 py-8 backdrop-blur-[1.5px] md:px-8 md:py-10 lg:grid lg:grid-cols-[minmax(0,1.2fr)_320px] lg:gap-8">
            <div>
              <p className="font-label text-[10px] tracking-[0.24em] text-foreground-subtle">{eyebrow}</p>
              <h1 className="mt-3 font-heading text-[clamp(2rem,4.8vw,4.2rem)] leading-[0.9] tracking-[-0.04em]">{title}</h1>

              <p className="mt-4 max-w-[760px] text-body-sm leading-relaxed text-foreground-muted">{description}</p>

              {contextLabel ? (
                <p className="mt-3 font-label text-[10px] tracking-[0.18em] text-foreground-subtle">KONTEKS: {contextLabel}</p>
              ) : null}

              <div className="mt-5 border-t border-border pt-4">
                <p className="font-label text-[10px] tracking-[0.18em] text-foreground-subtle">VALIDASI CEPAT</p>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-foreground-muted">
                  {highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-[8px] inline-block size-[5px] bg-foreground" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="mt-6 border border-border bg-background/95 p-4 lg:mt-0">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <p className="font-label text-[10px] tracking-[0.18em] text-foreground-subtle">ERROR SNAPSHOT</p>
                <p className="font-heading text-3xl leading-none tracking-[-0.03em]">{code}</p>
              </div>

              {reference ? (
                <p className="mt-3 text-[12px] leading-relaxed text-foreground-subtle">Reference: {reference}</p>
              ) : null}

              <div className="mt-4 grid gap-2.5">
                {onRetry ? (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex min-h-11 w-full items-center justify-center border border-foreground bg-accent px-4 py-3 font-label text-[10px] tracking-[0.18em] text-accent-foreground transition-[opacity,transform] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90"
                  >
                    {retryLabel ?? "COBA LAGI"}
                  </button>
                ) : null}

                {actions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={`inline-flex min-h-11 w-full items-center justify-center border px-4 py-3 font-label text-[10px] tracking-[0.18em] transition-[opacity,transform,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 ${actionClassName(action.variant)}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
