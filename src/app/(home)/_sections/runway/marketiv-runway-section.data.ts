export interface RunwayStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
}

export const RUNWAY_STEPS: RunwayStep[] = [
  {
    number: "01",
    stepLabel: "STEP 01",
    title: "UNGGAH PRODUK",
    description: "Unggah foto, video, dan tujuan campaign UMKM lewat form ringkas yang siap diproses.",
  },
  {
    number: "02",
    stepLabel: "STEP 02",
    title: "AI MENULIS\nBRIEF",
    description: "AI menyusun brief, angle konten, dan CTA yang sesuai persona audiens dalam kurang dari 30 detik.",
  },
  {
    number: "03",
    stepLabel: "STEP 03",
    title: "KREATOR\nTERPILIH",
    description: "Kreator mikro yang relevan klaim campaign berdasarkan niche, wilayah, dan rekam performa historis.",
  },
  {
    number: "04",
    stepLabel: "STEP 04",
    title: "BAYAR SAAT\nTERVERIFIKASI",
    description: "Escrow dicairkan hanya untuk views tervalidasi sehingga biaya promosi tetap terukur dan aman.",
  },
];

export const TICKER_ITEMS = [
  "AI BRIEF OTOMATIS",
  "KREATOR TERVERIFIKASI",
  "ESCROW AMAN",
  "ANALITIK REAL-TIME",
  "AI BRIEF OTOMATIS",
  "KREATOR TERVERIFIKASI",
  "ESCROW AMAN",
  "ANALITIK REAL-TIME",
];
