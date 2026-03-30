import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthRoleForm } from "../../_components/auth-role-form";

export const metadata: Metadata = buildMetadata({
  title: "Login UMKM",
  description: "Masuk sebagai UMKM untuk mengelola campaign, budget, dan performa kreator dalam dashboard Marketiv.",
  path: "/login/umkm",
  keywords: ["login umkm", "dashboard umkm", "marketiv auth"],
  noIndex: true,
});

export default function LoginUmkmPage() {
  return <AuthRoleForm mode="login" role="umkm" />;
}
