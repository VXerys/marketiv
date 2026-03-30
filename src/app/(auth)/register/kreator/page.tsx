import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthRoleForm } from "../../_components/auth-role-form";

export const metadata: Metadata = buildMetadata({
  title: "Daftar Kreator",
  description: "Daftar sebagai kreator untuk bergabung ke campaign UMKM dengan brief terstruktur dan tracking performa di Marketiv.",
  path: "/register/kreator",
  keywords: ["register kreator", "daftar kreator", "creator onboarding"],
  noIndex: true,
});

export default function RegisterKreatorPage() {
  return <AuthRoleForm mode="register" role="kreator" />;
}
