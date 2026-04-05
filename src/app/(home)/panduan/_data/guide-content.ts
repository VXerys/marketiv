export interface GuideStep {
  id: string;
  title: string;
  objective: string;
  description: string;
  checklist: string[];
  counterpartyLabel?: string;
  counterpartyChecklist?: string[];
  image: {
    src: string;
    alt: string;
    badge: string;
  };
}

export type GuideTimelineStatus = "completed" | "in-progress" | "planned";

export interface GuideTimelineItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  dateLabel: string;
  status: GuideTimelineStatus;
  highlights?: string[];
  cta?: {
    label: string;
    href: string;
  };
}

export interface GuideTimeline {
  label: string;
  title: string;
  subtitle: string;
  items: GuideTimelineItem[];
}

export interface GuidePageContent {
  audienceLabel: string;
  heroTag: string;
  title: string;
  subtitle: string;
  keyPillars: string[];
  timeline?: GuideTimeline;
  primaryCta: {
    label: string;
    href: string;
  };
  steps: GuideStep[];
}

export const creatorGuideContent: GuidePageContent = {
  audienceLabel: "PANDUAN SISI KONTEN KREATOR",
  heroTag: "ONBOARDING STEP BY STEP",
  title: "PERSIAPAN KREATOR",
  subtitle:
    "Alur ini membantu kreator mikro siap produksi dari brief pertama sampai evaluasi performa. Semua visual di bawah masih dummy dan bisa diganti screenshot final kapan saja.",
  keyPillars: [
    "Setup profil profesional dan niche utama",
    "Validasi brief campaign berbasis AI",
    "Produksi konten dengan checklist quality gate",
    "Monitoring performa real-time untuk repeat campaign",
  ],
  timeline: {
    label: "RELEASE TIMELINE KREATOR",
    title: "ROADMAP ONBOARDING KONTEN",
    subtitle:
      "Timeline ini membantu kreator melihat urutan aktivasi fitur dari setup awal sampai fase scale campaign secara bertahap.",
    items: [
      {
        id: "creator-t-01",
        phase: "PHASE 01",
        title: "Profile Setup",
        description:
          "Lengkapi identitas niche, referensi visual, dan preferensi campaign agar matchmaking awal lebih presisi.",
        dateLabel: "WEEK 1",
        status: "completed",
        highlights: [
          "Niche dan lokasi operasional tervalidasi",
          "Portofolio minimum 3 konten aktif",
        ],
      },
      {
        id: "creator-t-02",
        phase: "PHASE 02",
        title: "AI Brief Sync",
        description:
          "Sinkronisasi tone dan output konten dengan brief otomatis supaya proses approval lebih cepat.",
        dateLabel: "WEEK 2",
        status: "in-progress",
        highlights: [
          "Brief objective dan CTA konsisten",
          "Rule revisi campaign lebih jelas",
        ],
      },
      {
        id: "creator-t-03",
        phase: "PHASE 03",
        title: "Draft and Approval",
        description:
          "Upload draft dengan quality checklist dan terima feedback UMKM dalam satu alur terpusat.",
        dateLabel: "WEEK 3",
        status: "planned",
        highlights: [
          "Tracking status approval real-time",
          "Escrow milestone siap ditautkan",
        ],
      },
      {
        id: "creator-t-04",
        phase: "PHASE 04",
        title: "Performance Loop",
        description:
          "Pantau performa tervalidasi untuk membuka peluang repeat campaign dengan brand yang relevan.",
        dateLabel: "WEEK 4+",
        status: "planned",
        highlights: [
          "Panel insights per konten",
          "Notifikasi peluang repeat campaign",
        ],
        cta: {
          label: "AKTIFKAN AKUN KREATOR",
          href: "/register/kreator",
        },
      },
    ],
  },
  primaryCta: {
    label: "LANJUT BUAT AKUN KREATOR",
    href: "/register/kreator",
  },
  steps: [
    {
      id: "01",
      title: "Lengkapi Profil dan Portofolio",
      objective: "Brand harus bisa memahami gaya konten, niche, dan kualitas produksi kamu dalam kurang dari 1 menit.",
      description:
        "Mulai dari foto profil, bio niche, hingga contoh konten terbaik. Semakin jelas positioning kreator, semakin cepat kamu dipilih untuk campaign yang relevan.",
      checklist: [
        "Isi niche utama dan kota operasional",
        "Tambahkan 3-5 contoh konten performa terbaik",
        "Aktifkan preferensi kategori campaign",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual dashboard profil kreator",
        badge: "SCREEN DUMMY - PROFIL KREATOR",
      },
    },
    {
      id: "02",
      title: "Review Brief Otomatis dari AI",
      objective: "Pastikan objective campaign, tone komunikasi, dan deliverables benar-benar sinkron sejak awal.",
      description:
        "Sistem AI menyusun draft brief berdasarkan objective UMKM. Kreator tinggal cek tone, angle konten, CTA, serta batas revisi sebelum menerima campaign.",
      checklist: [
        "Verifikasi objective campaign dan target audience",
        "Cek batas revisi dan deadline produksi",
        "Konfirmasi output final: video, caption, dan CTA",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual panel AI brief generator",
        badge: "SCREEN DUMMY - AI BRIEF",
      },
    },
    {
      id: "03",
      title: "Produksi dan Kirim Draft Konten",
      objective: "Kurangi revisi berulang dengan quality checklist yang konsisten sebelum konten dikirim.",
      description:
        "Saat draft selesai, upload melalui dashboard untuk diproses reviewer. Status konten langsung terlihat agar komunikasi dengan UMKM lebih efisien.",
      checklist: [
        "Gunakan checklist framing, audio, dan CTA",
        "Upload draft awal + caption versi final",
        "Pantau status approval dan catatan revisi",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual proses upload draft konten",
        badge: "SCREEN DUMMY - SUBMIT DRAFT",
      },
    },
    {
      id: "04",
      title: "Pantau Performa dan Repeat Campaign",
      objective: "Jadikan performa tervalidasi sebagai mesin pendapatan berulang dari brand aktif.",
      description:
        "Dashboard metrik menampilkan views tervalidasi, engagement, dan nilai pembayaran. Kreator dengan konsistensi performa tinggi masuk prioritas repeat campaign.",
      checklist: [
        "Cek metrik views tervalidasi harian",
        "Analisis konten dengan conversion tertinggi",
        "Aktifkan notifikasi peluang repeat campaign",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual analitik performa konten kreator",
        badge: "SCREEN DUMMY - ANALYTICS",
      },
    },
  ],
};

export const umkmGuideContent: GuidePageContent = {
  audienceLabel: "PANDUAN SISI UMKM",
  heroTag: "WORKFLOW CAMPAIGN TERSTRUKTUR",
  title: "STARTER KIT UMKM",
  subtitle:
    "Flow ini dirancang agar UMKM bisa launching campaign lebih cepat, transparan, dan terukur. Tiap step sudah disiapkan area dummy image untuk nanti diganti screenshot fitur final.",
  keyPillars: [
    "Tentukan objective campaign dan budget",
    "Generate brief kreatif otomatis dengan AI",
    "Kelola escrow serta approval konten dengan aman",
    "Evaluasi ROI dari data performa tervalidasi",
  ],
  timeline: {
    label: "RELEASE TIMELINE UMKM",
    title: "ROADMAP EKSEKUSI CAMPAIGN",
    subtitle:
      "Alur rilis ini merangkum tahapan UMKM dari setup campaign sampai optimasi ROI agar deployment campaign lebih terukur.",
    items: [
      {
        id: "umkm-t-01",
        phase: "PHASE 01",
        title: "Campaign Setup",
        description:
          "Susun objective, budget, dan target market untuk membentuk baseline rekomendasi kreator yang akurat.",
        dateLabel: "WEEK 1",
        status: "completed",
        highlights: [
          "Objective campaign tervalidasi",
          "Budget dan durasi sudah terstruktur",
        ],
      },
      {
        id: "umkm-t-02",
        phase: "PHASE 02",
        title: "AI Brief Builder",
        description:
          "Generate brief kreatif berbasis produk dan style brand agar semua kreator menerima arahan yang seragam.",
        dateLabel: "WEEK 2",
        status: "in-progress",
        highlights: [
          "Template brief siap publish",
          "CTA dan key message lebih konsisten",
        ],
      },
      {
        id: "umkm-t-03",
        phase: "PHASE 03",
        title: "Escrow and Approval",
        description:
          "Aktifkan escrow dan approval workflow untuk menjaga pembayaran tetap aman sesuai milestone hasil.",
        dateLabel: "WEEK 3",
        status: "planned",
        highlights: [
          "Progress review per draft konten",
          "Release dana sesuai validasi target",
        ],
      },
      {
        id: "umkm-t-04",
        phase: "PHASE 04",
        title: "ROI Optimization",
        description:
          "Pantau cost efficiency dan conversion untuk menentukan campaign mana yang layak di-scale.",
        dateLabel: "WEEK 4+",
        status: "planned",
        highlights: [
          "Perbandingan performa kreator per niche",
          "Rekomendasi skala campaign berbasis data",
        ],
        cta: {
          label: "AKTIFKAN AKUN UMKM",
          href: "/register/umkm",
        },
      },
    ],
  },
  primaryCta: {
    label: "LANJUT BUAT AKUN UMKM",
    href: "/register/umkm",
  },
  steps: [
    {
      id: "01",
      title: "Setup Campaign dan Target Market",
      objective: "Mendefinisikan objective bisnis agar sistem bisa merekomendasikan creator shortlist yang tepat.",
      description:
        "Isi nama campaign, kategori produk, budget, dan goal utama. Dari data ini, platform membantu menyesuaikan ekspektasi performa sejak awal.",
      checklist: [
        "Pilih objective: awareness, traffic, atau conversion",
        "Tentukan budget dan periode campaign",
        "Isi segmentasi target audience utama",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual form setup campaign UMKM",
        badge: "SCREEN DUMMY - SETUP CAMPAIGN",
      },
    },
    {
      id: "02",
      title: "Generate AI Brief dan Rule Campaign",
      objective: "Memastikan setiap kreator menerima arahan yang jelas dan seragam untuk menekan miskomunikasi.",
      description:
        "AI brief generator membantu menulis objective, key message, hook, CTA, hingga larangan konten. UMKM dapat langsung menyesuaikan tone brand.",
      checklist: [
        "Generate draft brief dari data produk",
        "Tinjau tone, key message, dan CTA",
        "Publish brief ke shortlist kreator",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual editor AI brief untuk UMKM",
        badge: "SCREEN DUMMY - BRIEF BUILDER",
      },
    },
    {
      id: "03",
      title: "Kelola Escrow dan Approval Konten",
      objective: "Memberi rasa aman untuk UMKM dan kreator melalui alur pembayaran berbasis validasi hasil.",
      description:
        "Dana campaign ditempatkan di escrow. Pembayaran dirilis sesuai milestone atau views tervalidasi, sehingga proses kolaborasi lebih aman dan objektif.",
      checklist: [
        "Top up escrow sesuai rencana budget",
        "Review draft kreator dan berikan feedback",
        "Setujui konten final sebelum publish",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual dashboard escrow dan approval konten",
        badge: "SCREEN DUMMY - ESCROW",
      },
    },
    {
      id: "04",
      title: "Pantau ROI dan Scale Campaign",
      objective: "Mengambil keputusan scaling berdasarkan data views tervalidasi dan efisiensi biaya per hasil.",
      description:
        "Panel analytics merangkum CPV, engagement, dan performa per kreator. Dari sini UMKM bisa menentukan repeat campaign atau optimasi strategy berikutnya.",
      checklist: [
        "Bandingkan performa kreator per niche",
        "Analisis biaya per views tervalidasi",
        "Tentukan campaign yang layak di-scale",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
        alt: "Dummy visual analytics ROI campaign UMKM",
        badge: "SCREEN DUMMY - ROI ANALYTICS",
      },
    },
  ],
};
