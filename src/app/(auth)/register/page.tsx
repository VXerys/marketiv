import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Daftar Akun Marketiv",
  description:
    "Buat akun Marketiv untuk mulai campaign UMKM dengan AI brief generator, escrow aman, dan kolaborasi kreator mikro terverifikasi.",
  path: "/register",
  keywords: [
    "daftar marketiv",
    "platform campaign UMKM",
    "kreator mikro indonesia",
    "escrow pemasaran digital",
  ],
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <h1 className="font-heading text-5xl tracking-tight">Daftar dan Mulai Campaign Lebih Cerdas</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Pilih peran sebagai UMKM atau kreator, lalu aktifkan alur kerja berbasis data untuk mengeksekusi campaign yang terukur.
      </p>
    </main>
  );
}
