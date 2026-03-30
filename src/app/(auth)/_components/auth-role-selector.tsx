"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AuthMode, UserRole } from "./auth-role-types";

interface AuthRoleSelectorProps {
  mode: AuthMode;
}

interface RoleConfig {
  role: UserRole;
  title: string;
  label: string;
  description: string;
  bullets: string[];
}

const ROLE_CONFIGS: RoleConfig[] = [
  {
    role: "umkm",
    title: "Sisi UMKM",
    label: "BRAND OPERATOR",
    description: "Kelola campaign, kontrol budget, dan evaluasi ROI dengan workflow terstruktur.",
    bullets: ["Setup campaign", "AI brief", "Escrow aman"],
  },
  {
    role: "kreator",
    title: "Sisi Kreator",
    label: "CONTENT CREATOR",
    description: "Terima brief siap eksekusi, kirim konten, dan pantau performa untuk repeat campaign.",
    bullets: ["Portfolio profile", "Deliverable tracking", "Earnings insights"],
  },
];

function getHref(mode: AuthMode, role: UserRole): string {
  return `/${mode}/${role}`;
}

export function AuthRoleSelector({ mode }: AuthRoleSelectorProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

      timeline
        .from(".auth-role-head", { autoAlpha: 0, y: 26, duration: 0.45 })
        .from(".auth-role-subtitle", { autoAlpha: 0, y: 22, duration: 0.4 }, "-=0.22")
        .from(".auth-role-card", { autoAlpha: 0, y: 26, duration: 0.5, stagger: 0.1 }, "-=0.12")
        .from(".auth-role-footer", { autoAlpha: 0, y: 18, duration: 0.35 }, "-=0.15");

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

  const isLogin = mode === "login";

  return (
    <main ref={rootRef} className="landing-light min-h-screen bg-background px-5 py-20 text-foreground md:px-10 lg:flex lg:h-screen lg:items-center lg:overflow-hidden lg:py-0">
      <section className="mx-auto w-full max-w-[1200px] border border-border bg-surface/25 p-6 md:p-9 lg:max-h-[calc(100dvh-2rem)] lg:overflow-y-auto no-scrollbar lg:pb-8">
        <p className="auth-role-head font-label text-[10px] tracking-[0.24em] text-foreground-subtle">{isLogin ? "LOGIN ROLE" : "REGISTER ROLE"}</p>
        <h1 className="auth-role-head mt-3 font-heading text-[clamp(2.2rem,6vw,5.6rem)] leading-[0.88] tracking-[-0.04em]">
          {isLogin ? "Pilih Role untuk Masuk" : "Pilih Role untuk Daftar"}
        </h1>
        <p className="auth-role-subtitle mt-4 max-w-3xl text-body-sm leading-relaxed text-foreground-muted">
          {isLogin
            ? "Pilih jalur masuk berdasarkan peranmu agar dashboard, form, dan alur kerja langsung sesuai kebutuhan."
            : "Pilih jalur pendaftaran sesuai peran agar setup akun awal dan data profil langsung relevan untuk fitur yang kamu butuhkan."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-6">
          {ROLE_CONFIGS.map((roleConfig) => (
            <article key={roleConfig.role} className="auth-role-card border border-border bg-background p-5 md:p-6">
              <p className="font-label text-[10px] tracking-[0.22em] text-foreground-subtle">{roleConfig.label}</p>
              <h2 className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.7rem)] leading-[0.92] tracking-[-0.03em]">{roleConfig.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{roleConfig.description}</p>

              <ul className="mt-5 space-y-2 text-sm text-foreground-muted">
                {roleConfig.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={getHref(mode, roleConfig.role)}
                className="auth-btn mt-6 inline-flex min-h-11 w-full items-center justify-between border border-foreground bg-foreground px-4 py-3 font-label text-[10px] tracking-[0.2em] text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isLogin ? `MASUK ${roleConfig.role === "umkm" ? "UMKM" : "KREATOR"}` : `DAFTAR ${roleConfig.role === "umkm" ? "UMKM" : "KREATOR"}`}
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="auth-role-footer mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-5 lg:mt-6">
          <Link
            href="/"
            className="auth-btn inline-flex min-h-11 items-center justify-center border border-border px-4 py-2.5 font-label text-[10px] tracking-[0.2em] text-foreground transition-colors hover:bg-surface/60"
          >
            KEMBALI KE LANDING
          </Link>
          <Link
            href={isLogin ? "/register" : "/login"}
            className="auth-btn inline-flex min-h-11 items-center justify-center border border-border px-4 py-2.5 font-label text-[10px] tracking-[0.2em] text-foreground-subtle transition-colors hover:text-foreground"
          >
            {isLogin ? "BELUM PUNYA AKUN? DAFTAR" : "SUDAH PUNYA AKUN? LOGIN"}
          </Link>
        </div>
      </section>
    </main>
  );
}
