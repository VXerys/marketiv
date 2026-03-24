export interface CreatorFeature {
  id: string;
  title: string;
  description: string;
}

export interface CreatorMetric {
  label: string;
  value: string;
}

export const CREATOR_FEATURES: CreatorFeature[] = [
  {
    id: "01",
    title: "PERFORMA YANG TERUKUR",
    description:
      "Setiap konten ditrack secara real-time. UMKM melihat performa aktual, kreator mendapat feedback yang jelas.",
  },
  {
    id: "02",
    title: "KONTROL BRIEF YANG JELAS",
    description:
      "Template brief membuat ekspektasi sinkron dari awal. Revisi lebih sedikit, hasil konten lebih tepat sasaran.",
  },
  {
    id: "03",
    title: "EKOSISTEM KAMPANYE BERULANG",
    description:
      "Bukan transaksi sekali jalan. Kreator yang konsisten dapat repeat campaign dan pendapatan yang stabil.",
  },
];

export const CREATOR_METRICS: CreatorMetric[] = [
  { label: "Views tervalidasi", value: "2.8M+" },
  { label: "CPV rata-rata", value: "Rp48" },
  { label: "Kampanye aktif", value: "124" },
  { label: "Kreator bergabung", value: "4.3K" },
];
