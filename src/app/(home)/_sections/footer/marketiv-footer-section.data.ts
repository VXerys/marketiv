export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface CommitmentItem {
  title: string;
  description: string;
}

export const PLATFORM_LINKS: FooterLinkItem[] = [
  { label: "Untuk Kreator", href: "/dashboard/creator" },
  { label: "Untuk UMKM", href: "/dashboard/umkm" },
  { label: "Campaign Aktif", href: "/marketplace" },
  { label: "Rate Card", href: "/marketplace" },
  { label: "Escrow", href: "/marketplace" },
];

export const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Blog", href: "/marketplace" },
  { label: "Karir", href: "/marketplace" },
  { label: "Press Kit", href: "/marketplace" },
  { label: "Kontak", href: "/contact" },
];

export const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Syarat & Ketentuan", href: "/marketplace" },
  { label: "Kebijakan Privasi", href: "/marketplace" },
  { label: "Cookie Policy", href: "/marketplace" },
];

export const COMMITMENTS: CommitmentItem[] = [
  {
    title: "SDG 8 - PEKERJAAN LAYAK",
    description: "Mendukung pertumbuhan ekonomi inklusif UMKM.",
  },
  {
    title: "SDG 9 - INOVASI INDUSTRI",
    description: "Infrastruktur digital untuk kreator lokal.",
  },
];
