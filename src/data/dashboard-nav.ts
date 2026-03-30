export interface DashboardNavItem {
  label: string;
  href: string;
}

export const DASHBOARD_ROUTES = {
  umkm: {
    overview: "/dashboard/umkm",
    orders: "/dashboard/umkm/orders",
    analytics: "/dashboard/umkm/analytics",
    campaigns: "/dashboard/umkm/campaigns",
  },
  creator: {
    overview: "/dashboard/creator",
    jobs: "/dashboard/creator/jobs",
    portfolio: "/dashboard/creator/portfolio",
    earnings: "/dashboard/creator/earnings",
  },
  shared: {
    account: "/dashboard/account",
    inbox: "/dashboard/inbox",
  },
} as const;

export const umkmDashboardNav: DashboardNavItem[] = [
  { label: "Overview", href: DASHBOARD_ROUTES.umkm.overview },
  { label: "Campaign Brief", href: DASHBOARD_ROUTES.umkm.campaigns },
  { label: "Orders", href: DASHBOARD_ROUTES.umkm.orders },
  { label: "Spend Analytics", href: DASHBOARD_ROUTES.umkm.analytics },
];

export const creatorDashboardNav: DashboardNavItem[] = [
  { label: "Overview", href: DASHBOARD_ROUTES.creator.overview },
  { label: "Jobs", href: DASHBOARD_ROUTES.creator.jobs },
  { label: "Portfolio", href: DASHBOARD_ROUTES.creator.portfolio },
  { label: "Earnings", href: DASHBOARD_ROUTES.creator.earnings },
];

export const sharedDashboardNav: DashboardNavItem[] = [
  { label: "Account", href: DASHBOARD_ROUTES.shared.account },
  { label: "Inbox", href: DASHBOARD_ROUTES.shared.inbox },
];
