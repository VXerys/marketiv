import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Masuk Dashboard",
  description:
    "Akses dashboard Marketiv untuk mengelola campaign UMKM, brief berbasis AI, status escrow, dan performa kreator real-time.",
  path: "/login",
  keywords: [
    "login marketiv",
    "dashboard campaign UMKM",
    "monitoring escrow marketing",
    "manajemen kreator mikro",
  ],
  noIndex: true,
});

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <h1 className="font-heading text-5xl tracking-tight">Masuk ke Dashboard Marketiv</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Gunakan akunmu untuk memantau campaign, views tervalidasi, dan progres kolaborasi UMKM dengan kreator mikro dalam satu
        workspace.
      </p>
    </main>
  );
}
