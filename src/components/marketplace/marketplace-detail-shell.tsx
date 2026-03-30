"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { DASHBOARD_ROUTES } from "@/data/dashboard-nav";
import { useGSAP } from "@/lib/gsap";
import type { MarketplaceListing } from "@/types/marketplace";
import { animateMarketplaceIntro } from "./marketplace-shell.animations";

interface MarketplaceDetailShellProps {
  item: MarketplaceListing;
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(value);
}

function statusLabel(status: MarketplaceListing["status"]): string {
  if (status === "verified") {
    return "VERIFIED";
  }

  if (status === "processing") {
    return "PROCESSING";
  }

  return "OPEN";
}

function statusClassName(status: MarketplaceListing["status"]): string {
  if (status === "verified") {
    return "border-foreground bg-foreground text-background";
  }

  if (status === "processing") {
    return "border-border-strong/75 bg-surface text-foreground";
  }

  return "border-border-strong/75 bg-background text-foreground";
}

function modeLabel(mode: MarketplaceListing["mode"]): string {
  return mode === "campaign" ? "CAMPAIGN UMKM" : "RATE CARD CREATOR";
}

function channelLabel(channels: MarketplaceListing["channels"]): string {
  return channels.map((item) => item.toUpperCase()).join(" + ");
}

function detailSubtitle(item: MarketplaceListing): string {
  if (item.mode === "campaign") {
    return "Detail ini disusun untuk sisi konten kreator: pahami brief, cek ketersediaan aset, klaim campaign, lalu submit URL bukti tayang tanpa chat langsung.";
  }

  return "Detail ini disusun untuk sisi UMKM: review paket kreator, negosiasi lewat chat, kirim custom offer, lalu jalankan escrow sampai collab post tervalidasi.";
}

export function MarketplaceDetailShell({ item }: MarketplaceDetailShellProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateMarketplaceIntro(rootRef.current);
    },
    { scope: rootRef }
  );

  const amountLabel = formatRupiah(item.amountIdr);
  const ratingLabel = item.rating.toFixed(1);
  const isCampaign = item.mode === "campaign";
  const campaignContext = item.campaignContext;
  const rateCardContext = item.rateCardContext;
  const claimableSlots = campaignContext
    ? Math.max(campaignContext.creatorQuotaTotal - campaignContext.creatorQuotaClaimed, 0)
    : 0;

  return (
    <section ref={rootRef} className="landing-light overflow-x-clip border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="relative overflow-hidden border border-border">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-cover grayscale"
              priority
            />
            <div className="absolute inset-0 bg-background/82" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:54px_54px] opacity-35" />
          </div>

          <div className="relative z-10 grid gap-5 bg-background/65 p-5 backdrop-blur-[2px] md:p-7 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:gap-7">
            <div>
              <p className="mp-eyebrow font-label text-[10px] tracking-[0.24em] text-foreground-subtle">{modeLabel(item.mode)}</p>

              <h1 className="mt-3 overflow-hidden font-heading text-[clamp(2rem,4.8vw,4.2rem)] leading-[0.9] tracking-[-0.04em]">
                <span className="mp-heading-line block">{item.title}</span>
              </h1>

              <p className="mp-description mt-4 max-w-[780px] text-body-sm text-foreground-muted">{item.description}</p>

              <p className="mt-4 max-w-[780px] border-t border-border/80 pt-4 text-[13px] leading-relaxed text-foreground-subtle">{detailSubtitle(item)}</p>

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border/80 pt-4 text-[12px] md:grid-cols-4 md:gap-3 md:text-[13px]">
                <div>
                  <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle">KATEGORI</p>
                  <p className="mt-1 text-foreground">{item.category}</p>
                </div>
                <div>
                  <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle">CHANNEL</p>
                  <p className="mt-1 text-foreground">{channelLabel(item.channels)}</p>
                </div>
                <div>
                  <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle">RATING</p>
                  <p className="mt-1 text-foreground">{ratingLabel} / 5</p>
                </div>
                <div>
                  <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle">KOLABORASI</p>
                  <p className="mt-1 text-foreground">{formatNumber(item.totalCollaborations)}</p>
                </div>
              </div>
            </div>

            <aside className="border border-border bg-background/95 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex min-h-7 items-center border border-border-strong/70 bg-background px-2.5 font-label text-[10px] tracking-[0.14em] text-foreground">
                  {isCampaign ? "BUDGET CAMPAIGN" : "RATE CARD"}
                </span>
                <span className={`inline-flex min-h-7 items-center border px-2.5 font-label text-[10px] tracking-[0.14em] ${statusClassName(item.status)}`}>
                  {statusLabel(item.status)}
                </span>
              </div>

              <p className="mt-4 font-heading text-[1.95rem] leading-[0.9] tracking-[-0.03em] text-foreground">{amountLabel}</p>
              <p className="mt-1 font-label text-[9px] tracking-[0.15em] text-foreground-subtle">{isCampaign ? "ESTIMASI BUDGET" : "HARGA MULAI"}</p>

              <div className="mt-4 border-t border-border pt-3">
                <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle">{isCampaign ? "UMKM OWNER" : "CREATOR"}</p>
                <p className="mt-1 text-[14px] text-foreground">{isCampaign ? item.brandName : item.creatorName}</p>
              </div>

              {isCampaign ? (
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-[12px]">
                  <div>
                    <p className="font-label text-[8px] tracking-[0.15em] text-foreground-subtle">SLOT TERSISA</p>
                    <p className="mt-1 text-foreground">{formatNumber(claimableSlots)}</p>
                  </div>
                  <div>
                    <p className="font-label text-[8px] tracking-[0.15em] text-foreground-subtle">BAYAR / 1K VIEWS</p>
                    <p className="mt-1 text-foreground">{formatRupiah(campaignContext?.payoutPer1kViewsIdr ?? 0)}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-3 border-t border-border pt-3 text-[12px]">
                  <p className="font-label text-[8px] tracking-[0.15em] text-foreground-subtle">REVISI + ESTIMASI</p>
                  <p className="mt-1 text-foreground">
                    {rateCardContext?.revisionPolicy ?? "Sesuai kesepakatan"} • {rateCardContext?.estimatedDays ?? 0} hari
                  </p>
                </div>
              )}

              {isCampaign ? (
                <div className="mt-4 grid gap-2">
                  <Link
                    href={DASHBOARD_ROUTES.creator.jobs}
                    className="inline-flex min-h-11 w-full items-center justify-center border border-foreground bg-foreground px-4 py-3 font-label text-[10px] tracking-[0.18em] text-background transition-[opacity,transform] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90"
                  >
                    KLAIM CAMPAIGN INI
                  </Link>
                  <Link
                    href={DASHBOARD_ROUTES.creator.jobs}
                    className="inline-flex min-h-11 w-full items-center justify-center border border-border-strong/45 bg-background px-4 py-3 font-label text-[10px] tracking-[0.18em] text-foreground transition-[transform,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/65"
                  >
                    LIHAT JOB POOL KREATOR
                  </Link>
                </div>
              ) : (
                <div className="mt-4 grid gap-2">
                  <Link
                    href={DASHBOARD_ROUTES.shared.inbox}
                    className="inline-flex min-h-11 w-full items-center justify-center border border-foreground bg-foreground px-4 py-3 font-label text-[10px] tracking-[0.18em] text-background transition-[opacity,transform] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90"
                  >
                    HUBUNGI KREATOR
                  </Link>
                  <Link
                    href={DASHBOARD_ROUTES.shared.inbox}
                    className="inline-flex min-h-11 w-full items-center justify-center border border-border-strong/45 bg-background px-4 py-3 font-label text-[10px] tracking-[0.18em] text-foreground transition-[transform,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/65"
                  >
                    KIRIM CUSTOM OFFER
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <article className="border border-border bg-background p-5 md:p-6">
            <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">
              {isCampaign ? "BRIEF + FLOW KREATOR" : "PAKET + FLOW NEGOSIASI UMKM"}
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[0.92] tracking-[-0.02em]">
              {isCampaign ? "INFORMASI WAJIB UNTUK KONTEN KREATOR" : "INFORMASI WAJIB UNTUK UMKM"}
            </h2>

            {isCampaign ? (
              <div className="mt-4 space-y-4">
                <div className="border border-border p-4">
                  <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">OBJECTIVE BRIEF</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground-muted">
                    {campaignContext?.briefObjective ?? "Brief objective belum tersedia."}
                  </p>
                </div>

                <div className="border border-border p-4">
                  <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">CHECKLIST EKSEKUSI</p>
                  <ul className="mt-2 space-y-2 text-[14px] leading-relaxed text-foreground-muted">
                    {(campaignContext?.briefInstructions ?? []).map((instruction) => (
                      <li key={instruction} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="mt-[8px] inline-block size-[5px] bg-foreground" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border p-4">
                  <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">DEADLINE</p>
                  <p className="mt-2 text-[14px] text-foreground">{campaignContext?.deadlineText ?? "Menunggu update deadline"}</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="border border-border p-4">
                  <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">PAKET RATE CARD</p>
                  <p className="mt-2 text-[14px] text-foreground">{rateCardContext?.packageName ?? "Rate card package"}</p>
                  <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-foreground-muted">
                    {(rateCardContext?.deliverables ?? []).map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="mt-[8px] inline-block size-[5px] bg-foreground" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border p-4">
                  <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">NEGOSIASI + ESCROW</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground-muted">{rateCardContext?.chatPolicy}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-foreground-muted">{rateCardContext?.escrowPolicy}</p>
                </div>
              </div>
            )}
          </article>

          <article className="border border-border bg-surface p-5 md:p-6">
            <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">
              {isCampaign ? "ASSET CAMPAIGN" : "PORTOFOLIO + CUSTOM OFFER"}
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[0.92] tracking-[-0.02em]">
              {isCampaign ? "AKSES ASSET UNTUK EKSEKUSI KONTEN" : "INFORMASI FINAL UNTUK UMKM"}
            </h2>

            <div className="mt-4 grid gap-3">
              {isCampaign ? (
                <>
                  <div className="border border-border bg-background p-4">
                    <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">ASSET INTERNAL MARKETIV</p>
                    <ul className="mt-2 space-y-1.5 text-[14px] text-foreground-muted">
                      {(campaignContext?.assetPackage.internalAssets ?? []).map((asset) => (
                        <li key={asset}>• {asset}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-border bg-background p-4">
                    <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">ASSET EKSTERNAL (FILE BESAR)</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-foreground-muted">{campaignContext?.assetPackage.note}</p>

                    {campaignContext?.assetPackage.externalDriveUrl ? (
                      <a
                        href={campaignContext.assetPackage.externalDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex min-h-10 w-full items-center justify-center border border-foreground bg-foreground px-4 py-2 font-label text-[10px] tracking-[0.18em] text-background transition-[opacity,transform] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90"
                      >
                        BUKA LINK GOOGLE DRIVE
                      </a>
                    ) : (
                      <p className="mt-3 text-[13px] text-foreground-subtle">Campaign ini tidak memerlukan link eksternal.</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="border border-border bg-background p-4">
                    <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">CUSTOM OFFER SCOPE</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-foreground-muted">{rateCardContext?.customOfferScope}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-foreground-muted">
                      {rateCardContext?.collabPostRequired ? "Collab post wajib untuk validasi publikasi konten." : "Collab post opsional."}
                    </p>
                  </div>

                  <div className="border border-border bg-background p-4">
                    <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">PORTOFOLIO LINK</p>
                    <ul className="mt-2 space-y-2 text-[13px] text-foreground-muted">
                      {(rateCardContext?.portfolioLinks ?? []).map((link) => (
                        <li key={link}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/marketplace"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center border border-border-strong/45 bg-background px-4 py-3 font-label text-[10px] tracking-[0.18em] text-foreground transition-[transform,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/65"
            >
              KEMBALI KE MARKETPLACE
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
