"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useRef, useState } from "react";
import { setDummyAuthSession } from "@/app/(auth)/_actions/set-dummy-auth-session";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AuthMode, UserRole } from "./auth-role-types";

interface AuthRoleFormProps {
  mode: AuthMode;
  role: UserRole;
}

interface RoleMeta {
  roleTitle: string;
  roleLabel: string;
  summary: string;
  journey: string[];
  visualSrc: string;
  visualAlt: string;
  dashboardHref: string;
}

const ROLE_META: Record<UserRole, RoleMeta> = {
  umkm: {
    roleTitle: "UMKM",
    roleLabel: "BRAND OPERATOR FLOW",
    summary: "Masuk ke workspace UMKM untuk setup campaign, AI brief, dan monitoring ROI terintegrasi.",
    journey: ["Campaign planning", "Budget & escrow control", "Performance insights"],
    visualSrc: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    visualAlt: "Pemilik UMKM memantau dashboard campaign",
    dashboardHref: "/dashboard/umkm",
  },
  kreator: {
    roleTitle: "KREATOR",
    roleLabel: "CONTENT CREATOR FLOW",
    summary: "Masuk ke workspace kreator untuk menerima brief, submit konten, dan memantau performa campaign.",
    journey: ["Portfolio visibility", "Deliverable tracking", "Earnings growth"],
    visualSrc: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200",
    visualAlt: "Konten kreator mengevaluasi performa konten",
    dashboardHref: "/dashboard/creator",
  },
};

export function AuthRoleForm({ mode, role }: AuthRoleFormProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roleMeta = ROLE_META[role];

  const headline = useMemo(() => {
    if (mode === "login") {
      return `Masuk Sebagai ${roleMeta.roleTitle}`;
    }

    return `Daftar Sebagai ${roleMeta.roleTitle}`;
  }, [mode, roleMeta.roleTitle]);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

      timeline
        .from(".auth-form-left", { autoAlpha: 0, y: 28, duration: 0.48 })
        .from(".auth-form-right", { autoAlpha: 0, y: 24, duration: 0.46 }, "-=0.24")
        .from(".auth-field", { autoAlpha: 0, y: 14, duration: 0.34, stagger: 0.06 }, "-=0.2")
        .from(".auth-submit", { autoAlpha: 0, y: 14, duration: 0.3 }, "-=0.15");

      const buttons = gsap.utils.toArray<HTMLElement>(".auth-btn", rootRef.current);
      const handlers = buttons.map((button) => {
        const enter = () => gsap.to(button, { y: -2, duration: 0.2, ease: "power2.out" });
        const leave = () => gsap.to(button, { y: 0, duration: 0.2, ease: "power2.out" });

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);

        return { button, enter, leave };
      });

      return () => {
        handlers.forEach(({ button, enter, leave }) => {
          button.removeEventListener("mouseenter", enter);
          button.removeEventListener("mouseleave", leave);
        });
      };
    },
    { scope: rootRef }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      if (typeof email !== "string" || typeof password !== "string") {
        throw new Error("Data login tidak valid.");
      }

      const result = await setDummyAuthSession({
        email,
        password,
        role,
      });

      router.push(result.redirectTo, { scroll: true });
      router.refresh();
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await setDummyAuthSession({
        email: `${role}-google@marketiv.local`,
        password: "google-oauth-dummy",
        role,
      });

      router.push(result.redirectTo, { scroll: true });
      router.refresh();
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={rootRef} className="landing-light min-h-screen bg-background px-5 py-20 text-foreground md:px-10 lg:flex lg:h-screen lg:items-center lg:overflow-hidden lg:py-0">
      <section className="mx-auto grid w-full max-w-[1200px] gap-5 border border-border bg-surface/20 p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:p-8 lg:max-h-[calc(100dvh-2rem)] lg:min-h-0 lg:overflow-hidden">
        <aside className="auth-form-left border border-border bg-background p-5 lg:h-full lg:min-h-0 lg:overflow-y-auto no-scrollbar lg:pb-7">
          <div className="auth-field relative mb-5 min-h-[220px] overflow-hidden border border-border bg-foreground">
            <Image
              src={roleMeta.visualSrc}
              alt={roleMeta.visualAlt}
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              className="object-cover grayscale"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/82 via-foreground/35 to-foreground/72" />

            <div className="absolute bottom-0 left-0 right-0 border-t border-background/30 bg-foreground/70 px-3 py-2.5 backdrop-blur-sm">
              <p className="font-label text-[9px] tracking-[0.2em] text-background/78">{roleMeta.roleLabel}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-background/92">Flow siap dipakai untuk onboarding cepat dan terukur.</p>
            </div>
          </div>

          <p className="font-label text-[10px] tracking-[0.24em] text-foreground-subtle">{roleMeta.roleLabel}</p>
          <h1 className="mt-3 font-heading text-[clamp(2rem,4.5vw,4.4rem)] leading-[0.9] tracking-[-0.04em]">{headline}</h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{roleMeta.summary}</p>

          <div className="mt-6 border-t border-border pt-5">
            <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">ALUR CEPAT</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
              {roleMeta.journey.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="auth-form-right border border-border bg-background p-5 md:p-6 lg:h-full lg:min-h-0 lg:overflow-y-auto no-scrollbar lg:pb-7">
          <p className="font-label text-[10px] tracking-[0.24em] text-foreground-subtle">{mode === "login" ? "LOGIN" : "REGISTER"}</p>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            {mode === "register" && (
              <label className="auth-field block">
                <span className="mb-1.5 block text-xs text-foreground-subtle">Nama Lengkap</span>
                <input
                  type="text"
                  required
                  className="w-full border border-border bg-surface/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-border-strong/45"
                  placeholder={role === "umkm" ? "Nama pemilik brand" : "Nama kreator"}
                />
              </label>
            )}

            {mode === "register" && (
              <label className="auth-field block">
                <span className="mb-1.5 block text-xs text-foreground-subtle">{role === "umkm" ? "Nama Brand / Toko" : "Nama Channel / Handle"}</span>
                <input
                  type="text"
                  required
                  className="w-full border border-border bg-surface/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-border-strong/45"
                  placeholder={role === "umkm" ? "Contoh: Dapur Nusantara" : "Contoh: @kreatif.id"}
                />
              </label>
            )}

            <label className="auth-field block">
              <span className="mb-1.5 block text-xs text-foreground-subtle">Email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-border bg-surface/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-border-strong/45"
                placeholder="nama@email.com"
              />
            </label>

            <label className="auth-field block">
              <span className="mb-1.5 block text-xs text-foreground-subtle">Password</span>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full border border-border bg-surface/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-border-strong/45"
                placeholder="Minimal 8 karakter"
              />
            </label>

            {mode === "login" && (
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="auth-btn auth-field inline-flex min-h-11 w-full items-center justify-center gap-2.5 border border-border px-4 py-3 font-label text-[10px] tracking-[0.2em] text-foreground transition-colors hover:bg-surface/55 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span aria-hidden="true" className="inline-flex size-4 items-center justify-center">
                  <svg viewBox="0 0 24 24" className="size-4" focusable="false" aria-hidden="true">
                    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.9-4.2 2.9-7.2 0-.7-.1-1.3-.2-2H12z" />
                    <path fill="#34A853" d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.1-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.3-4H3.5v2.5C5.1 19.9 8.3 22 12 22z" />
                    <path fill="#FBBC05" d="M6.7 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.5H3.5A10 10 0 0 0 2.4 12c0 1.6.4 3.2 1.1 4.5L6.7 14z" />
                    <path fill="#4285F4" d="M12 6.1c1.4 0 2.6.5 3.6 1.4l2.7-2.7C16.8 3.3 14.6 2.4 12 2.4 8.3 2.4 5.1 4.5 3.5 7.5L6.7 10c.7-2.3 2.8-3.9 5.3-3.9z" />
                  </svg>
                </span>
                LANJUT DENGAN GOOGLE
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="auth-btn auth-submit inline-flex min-h-11 w-full items-center justify-between border border-foreground bg-foreground px-4 py-3 font-label text-[10px] tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "MEMPROSES..." : mode === "login" ? "MASUK KE DASHBOARD" : "LANJUT BUAT AKUN"}
              <span aria-hidden="true">-&gt;</span>
            </button>
          </form>

          {mode === "login" && (
            <p className="mt-4 border-t border-border pt-4 text-xs text-foreground-subtle">
              Belum punya akun?
              <Link href="/register" className="auth-btn ml-1.5 text-foreground underline underline-offset-4">
                Daftar sekarang
              </Link>
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <Link
              href={mode === "login" ? `/${mode}/${role === "umkm" ? "kreator" : "umkm"}` : `/${mode}/${role === "umkm" ? "kreator" : "umkm"}`}
              className="auth-btn inline-flex min-h-10 items-center justify-center border border-border px-3 py-2 font-label text-[9px] tracking-[0.18em] text-foreground-subtle transition-colors hover:text-foreground"
            >
              PINDAH KE {role === "umkm" ? "KREATOR" : "UMKM"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
