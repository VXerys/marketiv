"use client";

interface UmkmDashboardErrorProps {
  error: Error;
  reset: () => void;
}

export default function UmkmDashboardError({ error, reset }: UmkmDashboardErrorProps) {
  return (
    <section className="umkm-panel border border-border p-6 md:p-8">
      <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">DASHBOARD ERROR</p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight">Terjadi gangguan saat memuat dashboard UMKM</h1>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{error.message || "Silakan coba lagi dalam beberapa saat."}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-5 py-3 font-label text-[10px] tracking-[0.16em] text-background transition-opacity hover:opacity-90"
      >
        COBA LAGI
      </button>
    </section>
  );
}
