export type FearIconType = "financial" | "quality" | "literacy";

export interface FearPoint {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: FearIconType;
}

export const FEAR_POINTS: FearPoint[] = [
  {
    number: "01",
    label: "BAYAR DI MUKA TANPA PROTEKSI",
    title: "ANGGARAN MUDAH BOCOR",
    description:
      "Biaya promosi keluar sebelum hasil terlihat. Saat deliverable tertunda, arus kas UMKM langsung tertekan tanpa perlindungan transaksi.",
    icon: "financial",
  },
  {
    number: "02",
    label: "ENGAGEMENT PALSU & BOT",
    title: "DATA KINERJA MENYESATKAN",
    description:
      "Views terlihat tinggi, tetapi konversi stagnan. Tanpa verifikasi performa yang valid, keputusan marketing jadi salah arah.",
    icon: "quality",
  },
  {
    number: "03",
    label: "BRIEF MANUAL TIDAK TERARAH",
    title: "KONTEN SERING MELENCENG",
    description:
      "Instruksi campaign yang tidak presisi memicu revisi berulang. Waktu produksi habis, momentum penjualan ikut hilang.",
    icon: "literacy",
  },
];
