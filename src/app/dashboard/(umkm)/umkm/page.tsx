import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard UMKM | Marketiv",
  description: "Workspace UMKM untuk order, pengeluaran, dan performa campaign.",
};

export default function UmkmDashboardPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Dashboard UMKM</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">Halaman ini adalah scaffold awal untuk workspace UMKM.</p>
    </div>
  );
}
