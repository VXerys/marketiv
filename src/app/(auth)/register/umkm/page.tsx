import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthRoleForm } from "../../_components/auth-role-form";

export const metadata: Metadata = buildMetadata({
  title: "Daftar UMKM",
  description: "Daftar sebagai UMKM untuk memulai campaign terstruktur dengan AI brief, escrow, dan analytics di Marketiv.",
  path: "/register/umkm",
  keywords: ["register umkm", "daftar umkm", "campaign marketiv"],
  noIndex: true,
});

export default function RegisterUmkmPage() {
  return <AuthRoleForm mode="register" role="umkm" />;
}
