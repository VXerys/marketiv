import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

const staticRoutes = [
  "",
  "/login",
  "/register",
  "/marketplace",
  "/dashboard/creator",
  "/dashboard/creator/jobs",
  "/dashboard/creator/portfolio",
  "/dashboard/creator/earnings",
  "/dashboard/umkm",
  "/dashboard/umkm/campaigns",
  "/dashboard/umkm/orders",
  "/dashboard/umkm/analytics",
  "/dashboard/account",
  "/dashboard/inbox",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: `${seoConfig.siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
