"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useGSAP } from "@/lib/gsap";
import type { UmkmCampaignWizardStep } from "@/types/dashboard";
import { animateUmkmCampaignStepChange, animateUmkmCampaignWizard } from "./umkm-campaign-wizard.animations";

interface UmkmCampaignWizardProps {
  steps: UmkmCampaignWizardStep[];
}

type CampaignNiche = "Kuliner" | "Fesyen" | "Pariwisata" | "Edukasi" | "Kecantikan" | "Lainnya";

interface CampaignDraftForm {
  judulCampaign: string;
  deskripsiBrief: string;
  niche: CampaignNiche | "";
  assetFileName: string | null;
  assetFileSize: number | null;
  assetExternalUrl: string;
  hargaPer1000Views: string;
  kuotaKreator: string;
  targetViews: string;
}

interface CreatedCampaign {
  id: string;
  judulCampaign: string;
  niche: CampaignNiche;
  budgetCampaign: number;
  komisiPlatform: number;
  totalBayar: number;
  kuotaKreator: number;
  targetViews: number;
  createdAt: string;
}

type StepErrors = Partial<Record<keyof CampaignDraftForm, string>>;

const STORAGE_KEY = "marketiv-umkm-campaign-drafts";
const WIZARD_STEPS_TOTAL = 4;
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const PLATFORM_FEE_RATE = 0.15;

const initialFormState: CampaignDraftForm = {
  judulCampaign: "",
  deskripsiBrief: "",
  niche: "",
  assetFileName: null,
  assetFileSize: null,
  assetExternalUrl: "",
  hargaPer1000Views: "",
  kuotaKreator: "",
  targetViews: "",
};

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function isHttpsUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function UmkmCampaignWizard({ steps }: UmkmCampaignWizardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<StepErrors>({});
  const [formState, setFormState] = useState<CampaignDraftForm>(initialFormState);
  const [createdCampaigns, setCreatedCampaigns] = useState<CreatedCampaign[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);
      if (!rawValue) {
        return [];
      }

      const parsed = JSON.parse(rawValue) as CreatedCampaign[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const budgetCampaign = useMemo(() => {
    const harga = Number(formState.hargaPer1000Views);
    const views = Number(formState.targetViews);
    if (!Number.isFinite(harga) || !Number.isFinite(views) || harga <= 0 || views <= 0) {
      return 0;
    }

    return (views / 1000) * harga;
  }, [formState.hargaPer1000Views, formState.targetViews]);

  const komisiPlatform = useMemo(() => budgetCampaign * PLATFORM_FEE_RATE, [budgetCampaign]);
  const totalBayar = useMemo(() => budgetCampaign + komisiPlatform, [budgetCampaign, komisiPlatform]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createdCampaigns));
  }, [createdCampaigns]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateUmkmCampaignWizard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateUmkmCampaignStepChange(rootRef.current, currentStep / WIZARD_STEPS_TOTAL);
      }
    },
    { scope: rootRef, dependencies: [currentStep] }
  );

  const activeStep = steps.find((item) => item.id === currentStep) ?? steps[0];

  const updateField = <Field extends keyof CampaignDraftForm>(field: Field, value: CampaignDraftForm[Field]) => {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setPublishMessage(null);
  };

  const validateCurrentStep = (): boolean => {
    const nextErrors: StepErrors = {};

    if (currentStep === 1) {
      if (!formState.judulCampaign.trim()) {
        nextErrors.judulCampaign = "Judul campaign wajib diisi.";
      }

      if (formState.deskripsiBrief.trim().length < 50) {
        nextErrors.deskripsiBrief = "Deskripsi brief minimal 50 karakter.";
      }

      if (!formState.niche) {
        nextErrors.niche = "Pilih niche campaign terlebih dahulu.";
      }
    }

    if (currentStep === 2) {
      const hasFile = Boolean(formState.assetFileName);
      const hasUrl = Boolean(formState.assetExternalUrl.trim());

      if (!hasFile && !hasUrl) {
        nextErrors.assetExternalUrl = "Isi minimal satu aset: upload file atau URL eksternal.";
      }

      if (hasUrl && !isHttpsUrl(formState.assetExternalUrl.trim())) {
        nextErrors.assetExternalUrl = "URL eksternal harus valid dan dimulai dengan https://.";
      }
    }

    if (currentStep === 3) {
      const harga = Number(formState.hargaPer1000Views);
      const kuota = Number(formState.kuotaKreator);
      const views = Number(formState.targetViews);

      if (!Number.isFinite(harga) || harga <= 0) {
        nextErrors.hargaPer1000Views = "Harga per 1.000 views harus lebih dari 0.";
      }

      if (!Number.isInteger(kuota) || kuota < 1 || kuota > 100) {
        nextErrors.kuotaKreator = "Kuota kreator harus di antara 1 sampai 100.";
      }

      if (!Number.isFinite(views) || views < 1000) {
        nextErrors.targetViews = "Target views minimal 1.000.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((previous) => Math.min(previous + 1, WIZARD_STEPS_TOTAL));
  };

  const handlePreviousStep = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 1));
    setPublishMessage(null);
  };

  const handleAssetFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      updateField("assetFileName", null);
      updateField("assetFileSize", null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        assetFileName: "Batas maksimal unggahan file adalah 100 MB. Gunakan URL eksternal.",
      }));
      return;
    }

    updateField("assetFileName", selectedFile.name);
    updateField("assetFileSize", selectedFile.size);
  };

  const handlePublishCampaign = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (!formState.niche) {
      return;
    }

    setIsPublishing(true);

    const newCampaign: CreatedCampaign = {
      id: `cmp-${Date.now()}`,
      judulCampaign: formState.judulCampaign.trim(),
      niche: formState.niche,
      budgetCampaign,
      komisiPlatform,
      totalBayar,
      kuotaKreator: Number(formState.kuotaKreator),
      targetViews: Number(formState.targetViews),
      createdAt: new Date().toISOString(),
    };

    setCreatedCampaigns((previous) => [newCampaign, ...previous]);
    setFormState(initialFormState);
    setCurrentStep(1);
    setPublishMessage("Campaign berhasil dibuat pada mode demo. Status awal: Draft menunggu pembayaran escrow.");
    setErrors({});
    setIsPublishing(false);
  };

  return (
    <div ref={rootRef} className="umkm-dashboard-space space-y-7">
      <section className="umkm-campaign-head umkm-panel border border-border p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">CAMPAIGN MODE BRIEF BUILDER</p>
            <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Campaign Brief Wizard</h1>
          </div>
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">STEP AKTIF</p>
            <p className="mt-1 font-heading text-2xl">0{currentStep}/04</p>
          </div>
        </div>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Multi-step builder untuk menyiapkan campaign berbasis views. Sesuai kebijakan Campaign Mode: tidak ada tombol chat, kontak, atau komunikasi langsung di modul ini.
        </p>

        <div className="mt-5 h-2 w-full overflow-hidden border border-border bg-surface">
          <span className="umkm-campaign-progress block h-full w-full bg-foreground" style={{ transform: `scaleX(${currentStep / WIZARD_STEPS_TOTAL})`, transformOrigin: "left center" }} />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="umkm-campaign-step umkm-panel order-2 border border-border p-4 md:p-6 xl:order-1">
          <p className="font-label text-[10px] tracking-[0.18em] text-foreground-subtle">PANDUAN STEP</p>
          <div className="mt-4 space-y-2">
            {steps.map((step) => {
              const active = step.id === currentStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex w-full items-start justify-between border px-3 py-3 text-left transition-colors ${
                    active ? "border-border-strong bg-background" : "border-border bg-surface/55 hover:bg-background"
                  }`}
                >
                  <span>
                    <span className="font-label block text-[10px] tracking-[0.16em] text-foreground-subtle">STEP {step.id}</span>
                    <span className="mt-1 block font-heading text-lg tracking-tight md:text-xl">{step.title}</span>
                    <span className="mt-1 block text-xs text-foreground-muted">{step.subtitle}</span>
                  </span>
                  <span className="mt-1 font-label text-[10px] tracking-[0.16em] text-foreground-subtle">{active ? "AKTIF" : "BUKA"}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">CHECKLIST STEP {activeStep.id}</p>
            <ul className="mt-2 space-y-2 text-sm text-foreground-muted">
              {activeStep.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-[7px] inline-block size-[5px] bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="umkm-campaign-panel umkm-panel order-1 border border-border p-4 md:p-6 xl:order-2">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl tracking-tight md:text-3xl">Step 1 - Informasi Produk</h2>
              <label className="block space-y-1.5">
                <span className="text-sm text-foreground-muted">Nama Produk / Judul Campaign</span>
                <input
                  value={formState.judulCampaign}
                  onChange={(event) => updateField("judulCampaign", event.target.value)}
                  className="min-h-11 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                  placeholder="Contoh: Dapur Sehat - Sambal Matah Khas Sukabumi"
                />
                {errors.judulCampaign && <p className="text-sm text-red-600">{errors.judulCampaign}</p>}
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm text-foreground-muted">Ceritakan Produk & Instruksi untuk Kreator</span>
                <textarea
                  value={formState.deskripsiBrief}
                  onChange={(event) => updateField("deskripsiBrief", event.target.value)}
                  className="min-h-36 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                  placeholder="Produk saya adalah... Saya ingin kreator membuat video..."
                />
                <p className="text-xs text-foreground-subtle">Minimal 50 karakter. Tombol AI Brief Assistant akan diintegrasikan di fase backend.</p>
                {errors.deskripsiBrief && <p className="text-sm text-red-600">{errors.deskripsiBrief}</p>}
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm text-foreground-muted">Niche</span>
                <select
                  value={formState.niche}
                  onChange={(event) => updateField("niche", event.target.value as CampaignNiche | "")}
                  className="min-h-11 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                >
                  <option value="">Pilih niche campaign</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Fesyen">Fesyen</option>
                  <option value="Pariwisata">Pariwisata</option>
                  <option value="Edukasi">Edukasi</option>
                  <option value="Kecantikan">Kecantikan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.niche && <p className="text-sm text-red-600">{errors.niche}</p>}
              </label>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl tracking-tight md:text-3xl">Step 2 - Upload Aset Mentah</h2>

              <label className="block space-y-1.5">
                <span className="text-sm text-foreground-muted">Upload file (logo/foto/referensi) maksimal 100MB</span>
                <input
                  type="file"
                  onChange={handleAssetFileChange}
                  className="block min-h-11 w-full border border-border bg-background px-3 py-2 text-sm"
                />
                {formState.assetFileName && (
                  <p className="text-xs text-foreground-subtle">
                    File dipilih: {formState.assetFileName} ({Math.round((formState.assetFileSize ?? 0) / 1024 / 1024)} MB)
                  </p>
                )}
                {errors.assetFileName && <p className="text-sm text-red-600">{errors.assetFileName}</p>}
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm text-foreground-muted">Link Google Drive / Dropbox aset video mentah</span>
                <input
                  value={formState.assetExternalUrl}
                  onChange={(event) => updateField("assetExternalUrl", event.target.value)}
                  className="min-h-11 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                  placeholder="https://drive.google.com/..."
                />
                {errors.assetExternalUrl && <p className="text-sm text-red-600">{errors.assetExternalUrl}</p>}
              </label>

              <div className="border border-amber-400 bg-amber-50 px-3 py-3 text-sm text-amber-900">
                Untuk video bahan mentah berukuran besar, gunakan link Google Drive/Dropbox. Marketiv tidak menyimpan file video internal.
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl tracking-tight md:text-3xl">Step 3 - Budget & Kuota</h2>

              <label className="block space-y-1.5">
                <span className="text-sm text-foreground-muted">Bayaran per 1.000 Views (Rp)</span>
                <input
                  type="number"
                  min={1}
                  value={formState.hargaPer1000Views}
                  onChange={(event) => updateField("hargaPer1000Views", event.target.value)}
                  className="min-h-11 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                  placeholder="Contoh: 3500"
                />
                <p className="text-xs text-foreground-subtle">Range rekomendasi: Rp 2.000 - Rp 10.000 per 1.000 views.</p>
                {errors.hargaPer1000Views && <p className="text-sm text-red-600">{errors.hargaPer1000Views}</p>}
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-sm text-foreground-muted">Kuota Kreator</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formState.kuotaKreator}
                    onChange={(event) => updateField("kuotaKreator", event.target.value)}
                    className="min-h-11 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                    placeholder="1 - 100"
                  />
                  {errors.kuotaKreator && <p className="text-sm text-red-600">{errors.kuotaKreator}</p>}
                </label>

                <label className="block space-y-1.5">
                  <span className="text-sm text-foreground-muted">Target Views</span>
                  <input
                    type="number"
                    min={1000}
                    value={formState.targetViews}
                    onChange={(event) => updateField("targetViews", event.target.value)}
                    className="min-h-11 w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-border-strong"
                    placeholder="Contoh: 50000"
                  />
                  {errors.targetViews && <p className="text-sm text-red-600">{errors.targetViews}</p>}
                </label>
              </div>

              <div className="border border-border-strong bg-surface px-4 py-4 text-sm">
                <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">RINGKASAN BIAYA</p>
                <div className="mt-2 space-y-1.5 text-foreground-muted">
                  <p>Budget Kampanye: <span className="font-semibold text-foreground">{formatRupiah(budgetCampaign)}</span></p>
                  <p>Komisi Platform 15%: <span className="font-semibold text-foreground">{formatRupiah(komisiPlatform)}</span></p>
                  <p>Total yang dibayar: <span className="font-semibold text-foreground">{formatRupiah(totalBayar)}</span></p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl tracking-tight md:text-3xl">Step 4 - Review & Pembayaran</h2>

              <div className="grid gap-3 border border-border bg-surface/60 p-4 text-sm text-foreground-muted md:grid-cols-2">
                <p>Judul Campaign: <span className="text-foreground">{formState.judulCampaign || "-"}</span></p>
                <p>Niche: <span className="text-foreground">{formState.niche || "-"}</span></p>
                <p>File Referensi: <span className="text-foreground">{formState.assetFileName || "Tidak ada"}</span></p>
                <p>URL Eksternal: <span className="text-foreground">{formState.assetExternalUrl || "Tidak ada"}</span></p>
                <p>Harga / 1.000 views: <span className="text-foreground">{formState.hargaPer1000Views ? formatRupiah(Number(formState.hargaPer1000Views)) : "-"}</span></p>
                <p>Kuota Kreator: <span className="text-foreground">{formState.kuotaKreator || "-"}</span></p>
                <p>Target Views: <span className="text-foreground">{formState.targetViews || "-"}</span></p>
                <p>Total Bayar Escrow: <span className="font-semibold text-foreground">{formatRupiah(totalBayar)}</span></p>
              </div>

              <p className="text-sm text-foreground-muted">Di fase produksi, tombol ini akan mengarah ke Midtrans. Saat ini mode demo akan menyimpan campaign sebagai draft.</p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 font-label text-[10px] tracking-[0.16em] text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            >
              KEMBALI
            </button>

            {currentStep < WIZARD_STEPS_TOTAL ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-4 py-2 font-label text-[10px] tracking-[0.16em] text-background transition-opacity hover:opacity-90"
              >
                LANJUT STEP {currentStep + 1}
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublishCampaign}
                disabled={isPublishing}
                className="inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-4 py-2 font-label text-[10px] tracking-[0.16em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPublishing ? "MENYIMPAN..." : "BAYAR SEKARANG VIA ESCROW"}
              </button>
            )}
          </div>

          {publishMessage && <p className="mt-3 text-sm text-green-700">{publishMessage}</p>}
        </article>
      </section>

      <section className="umkm-campaign-note umkm-panel border border-border p-5 md:p-6">
        <h2 className="font-heading text-3xl tracking-tight">Catatan Validasi Penting</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          Jika file lebih dari 100 MB, gunakan URL Google Drive atau Dropbox yang publik dan dimulai dengan https://. Pengaturan ini mengikuti standar Campaign Mode agar proses klaim kreator dan validasi submission berjalan lancar.
        </p>
      </section>

      <section className="umkm-panel border border-border p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">Campaign Baru yang Dibuat</h2>
          <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">MODE DEMO (LOCAL)</span>
        </div>

        {createdCampaigns.length === 0 ? (
          <p className="mt-3 text-sm text-foreground-muted">Belum ada campaign yang dibuat dari wizard ini.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {createdCampaigns.map((campaign) => (
              <article key={campaign.id} className="umkm-created-card border border-border bg-surface/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">{campaign.niche}</p>
                    <h3 className="mt-1 font-heading text-2xl tracking-tight">{campaign.judulCampaign}</h3>
                  </div>
                  <span className="font-label inline-flex min-h-8 items-center border border-border-strong bg-background px-3 text-[10px] tracking-[0.16em]">DRAFT</span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-foreground-muted md:grid-cols-2">
                  <p>Kuota Kreator: {campaign.kuotaKreator}</p>
                  <p>Target Views: {campaign.targetViews.toLocaleString("id-ID")}</p>
                  <p>Budget Kampanye: {formatRupiah(campaign.budgetCampaign)}</p>
                  <p>Total Escrow: {formatRupiah(campaign.totalBayar)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
