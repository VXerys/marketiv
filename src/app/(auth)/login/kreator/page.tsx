import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthRoleForm } from "../../_components/auth-role-form";

export const metadata: Metadata = buildMetadata({
  title: "Login Kreator",
  description: "Masuk sebagai kreator untuk menerima brief, memantau job, dan mengelola performa konten di Marketiv.",
  path: "/login/kreator",
  keywords: ["login kreator", "dashboard kreator", "marketiv auth"],
  noIndex: true,
});

export default function LoginKreatorPage() {
  return <AuthRoleForm mode="login" role="kreator" />;
}
