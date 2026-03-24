export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface CommitmentItem {
  title: string;
  description: string;
}

export const PLATFORM_LINKS: FooterLinkItem[] = [
  { label: "Dashboard Kreator", href: "/dashboard/creator" },
  { label: "Dashboard UMKM", href: "/dashboard/umkm" },
  { label: "Marketplace Campaign", href: "/marketplace" },
  { label: "Harga Berbasis Views", href: "/marketplace" },
  { label: "Proteksi Escrow", href: "/marketplace" },
];

export const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "Tentang Marketiv", href: "/about" },
  { label: "Wawasan Marketing", href: "/marketplace" },
  { label: "Kemitraan", href: "/marketplace" },
  { label: "Media Kit", href: "/marketplace" },
  { label: "Hubungi Tim", href: "/contact" },
];

export const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Syarat & Ketentuan", href: "/marketplace" },
  { label: "Kebijakan Privasi", href: "/marketplace" },
  { label: "Cookie Policy", href: "/marketplace" },
];

export const COMMITMENTS: CommitmentItem[] = [
  {
    title: "EKONOMI UMKM BERKELANJUTAN",
    description: "Mendorong pertumbuhan penjualan UMKM melalui akses campaign yang terukur dan aman.",
  },
  {
    title: "KARIER KREATOR BERKEMBANG",
    description: "Membuka peluang pendapatan berulang bagi kreator mikro lewat kolaborasi yang transparan.",
  },
];
