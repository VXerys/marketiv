import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pengaturan Akun",
  description:
    "Kelola profil akun, preferensi akses, dan detail identitas bisnis untuk pengalaman kolaborasi yang lebih aman.",
  path: "/dashboard/account",
  keywords: ["pengaturan akun", "profil marketiv", "keamanan akun", "preferensi dashboard"],
  noIndex: true,
});

export default function AccountPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Pengaturan Akun</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Perbarui data profil dan preferensi akun agar workflow campaign tetap aman, rapi, dan mudah dikelola.
      </p>
    </div>
  );
}
