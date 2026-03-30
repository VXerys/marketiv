import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthRoleSelector } from "../_components/auth-role-selector";

export const metadata: Metadata = buildMetadata({
  title: "Pilih Role Registrasi",
  description:
    "Pilih role registrasi sebagai UMKM atau Kreator untuk mulai setup akun sesuai kebutuhan workflow di Marketiv.",
  path: "/register",
  keywords: [
    "register marketiv",
    "register umkm",
    "register kreator",
    "role based onboarding",
  ],
  noIndex: true,
});

export default function RegisterPage() {
  return <AuthRoleSelector mode="register" />;
}
