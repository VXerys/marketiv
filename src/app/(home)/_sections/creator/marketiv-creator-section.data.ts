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
    title: "PERFORMA REAL-TIME",
    description:
      "Pantau views tervalidasi, engagement, dan progres campaign dalam satu dashboard yang mudah dibaca.",
  },
  {
    id: "02",
    title: "BRIEF SIAP EKSEKUSI",
    description:
      "Template brief berbasis AI menyelaraskan ekspektasi sejak awal, memangkas revisi, dan mempercepat produksi konten.",
  },
  {
    id: "03",
    title: "PENDAPATAN BERULANG",
    description:
      "Kreator dengan performa konsisten diprioritaskan untuk repeat campaign sehingga pendapatan bulanan lebih stabil.",
  },
];

export const CREATOR_METRICS: CreatorMetric[] = [
  { label: "Views tervalidasi", value: "2.8M+" },
  { label: "Biaya per views", value: "Rp48" },
  { label: "Campaign berjalan", value: "124" },
  { label: "Kreator aktif", value: "4.3K" },
];
