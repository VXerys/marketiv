import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthRoleSelector } from "../_components/auth-role-selector";

export const metadata: Metadata = buildMetadata({
  title: "Pilih Role Login",
  description:
    "Pilih role login sebagai UMKM atau Kreator untuk masuk ke alur dashboard yang sesuai di Marketiv.",
  path: "/login",
  keywords: [
    "login marketiv",
    "login umkm",
    "login kreator",
    "auth role based",
  ],
  noIndex: true,
});

export default function LoginPage() {
  return <AuthRoleSelector mode="login" />;
}
