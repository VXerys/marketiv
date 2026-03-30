import Link from "next/link";

interface DashboardTabLockProps {
  title: string;
  description: string;
  hints: string[];
}

export function DashboardTabLock({ title, description, hints }: DashboardTabLockProps) {
  return (
    <section className="-m-6 md:-m-8">
      <div className="relative min-h-[calc(100dvh-12rem)] w-full overflow-hidden border-y border-border bg-surface/45 md:min-h-[calc(100dvh-9rem)] md:border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--foreground)/0.08),transparent_50%),radial-gradient(circle_at_80%_75%,hsl(var(--foreground)/0.06),transparent_45%)]" />
        <div className="relative mx-auto flex min-h-[inherit] w-full max-w-4xl items-center justify-center px-5 py-8 md:px-8 md:py-10">
          <div className="w-full border border-border-strong bg-background/92 p-6 backdrop-blur-sm md:p-9">
            <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">AKSES TERBATAS</p>
            <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted md:text-base">{description}</p>

            <ul className="mt-5 space-y-2 text-sm text-foreground-muted">
              {hints.map((hint) => (
                <li key={hint} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                  <span>{hint}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login/umkm"
                className="inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-5 py-3 font-label text-[10px] tracking-[0.16em] text-background transition-opacity hover:opacity-90"
              >
                LOGIN UMKM
              </Link>
              <Link
                href="/register/umkm"
                className="inline-flex min-h-11 items-center justify-center border border-border-strong px-5 py-3 font-label text-[10px] tracking-[0.16em] text-foreground transition-colors hover:bg-surface"
              >
                DAFTAR AKUN
              </Link>
              <Link
                href="/dashboard/umkm"
                className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 font-label text-[10px] tracking-[0.16em] text-foreground-muted transition-colors hover:text-foreground"
              >
                KEMBALI KE OVERVIEW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
