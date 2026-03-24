export interface DashboardNavItem {
  label: string;
  href: string;
}

export const umkmDashboardNav: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard/umkm" },
  { label: "Orders", href: "/dashboard/umkm/orders" },
  { label: "Spend Analytics", href: "/dashboard/umkm/analytics" },
  { label: "Campaign Brief", href: "/dashboard/umkm/campaigns" },
];

export const creatorDashboardNav: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard/creator" },
  { label: "Jobs", href: "/dashboard/creator/jobs" },
  { label: "Portfolio", href: "/dashboard/creator/portfolio" },
  { label: "Earnings", href: "/dashboard/creator/earnings" },
];

export const sharedDashboardNav: DashboardNavItem[] = [
  { label: "Account", href: "/dashboard/account" },
  { label: "Inbox", href: "/dashboard/inbox" },
];
