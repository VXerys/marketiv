"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import type { UmkmEscrowOrderItem } from "@/types/dashboard";
import { animateUmkmOrdersBoard } from "./umkm-orders-board.animations";

interface UmkmOrdersBoardProps {
  orders: UmkmEscrowOrderItem[];
}

const escrowToneMap: Record<UmkmEscrowOrderItem["escrowState"], string> = {
  processing: "bg-[#e8f4ff] text-[#2f5f8a]",
  shipped: "bg-[#ece6ff] text-[#5a3da8]",
  released: "bg-[#e6f7ef] text-[#247a52]",
};

const submissionToneMap: Record<UmkmEscrowOrderItem["submissionStatus"], string> = {
  draft: "bg-[#f4f4f4] text-[#6b6b6b]",
  submitted: "bg-[#fff4dc] text-[#9c6b00]",
  validated: "bg-[#e7f7eb] text-[#238247]",
  disputed: "bg-[#ffeaea] text-[#b63939]",
};

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function UmkmOrdersBoard({ orders }: UmkmOrdersBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UmkmEscrowOrderItem["escrowState"]>("all");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateUmkmOrdersBoard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  const summary = useMemo(() => {
    const totalEscrow = orders.reduce((total, item) => total + item.escrowAmount, 0);
    const pendingValidation = orders.filter((item) => item.submissionStatus === "submitted").length;
    const disputed = orders.filter((item) => item.submissionStatus === "disputed").length;

    return {
      totalOrders: orders.length,
      totalEscrow,
      pendingValidation,
      disputed,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return orders.filter((item) => {
      const matchStatus = statusFilter === "all" ? true : item.escrowState === statusFilter;
      if (!matchStatus) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = `${item.id} ${item.campaignTitle} ${item.creatorName} ${item.creatorHandle}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / rowsPerPage));

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredOrders.slice(start, start + rowsPerPage);
  }, [filteredOrders, currentPage, rowsPerPage]);

  const currentRowsStart = filteredOrders.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const currentRowsEnd = Math.min(currentPage * rowsPerPage, filteredOrders.length);

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: "all" | UmkmEscrowOrderItem["escrowState"]) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const exportCurrentRows = () => {
    const header = [
      "Order ID",
      "Judul Campaign",
      "Claim Date",
      "Content Creator",
      "Payment Method",
      "Escrow Amount",
      "Views",
      "Submission",
      "Order Status",
    ];

    const rows = filteredOrders.map((item) => [
      item.id,
      item.campaignTitle,
      item.claimDate,
      `${item.creatorName} (${item.creatorHandle})`,
      item.paymentMethod,
      String(item.escrowAmount),
      item.viewsProgress,
      item.submissionStatus,
      item.escrowState,
    ]);

    const csvContent = [header, ...rows].map((line) => line.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "marketiv-umkm-orders.csv";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div ref={rootRef} className="umkm-dashboard-space space-y-7">
      <section className="umkm-orders-head umkm-panel border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">ESCROW OPERATIONS</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Manajemen Order Campaign</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Kontrol status deposit Midtrans, posisi dana escrow, dan progres kreator sampai tahap release. Seluruh status dirangkum agar tim UMKM bisa bergerak cepat saat ada anomali.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="umkm-orders-kpi umkm-panel border border-border p-5">
          <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">Total Campaign Orders</p>
          <p className="mt-3 font-heading text-4xl tracking-tight">{summary.totalOrders}</p>
          <p className="mt-2 text-xs text-foreground-muted">Semua order campaign aktif + histori</p>
        </article>
        <article className="umkm-orders-kpi umkm-panel border border-border p-5">
          <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">Total Escrow Budget</p>
          <p className="mt-3 font-heading text-4xl tracking-tight">{formatRupiah(summary.totalEscrow)}</p>
          <p className="mt-2 text-xs text-foreground-muted">Akumulasi budget yang dikelola</p>
        </article>
        <article className="umkm-orders-kpi umkm-panel border border-border p-5">
          <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">Pending Validation</p>
          <p className="mt-3 font-heading text-4xl tracking-tight">{summary.pendingValidation}</p>
          <p className="mt-2 text-xs text-foreground-muted">Submission menunggu validasi</p>
        </article>
        <article className="umkm-orders-kpi umkm-panel border border-border p-5">
          <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">Disputed Submission</p>
          <p className="mt-3 font-heading text-4xl tracking-tight">{summary.disputed}</p>
          <p className="mt-2 text-xs text-foreground-muted">Membutuhkan review manual</p>
        </article>
      </section>

      <section className="umkm-orders-table umkm-panel border border-border p-4 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl tracking-tight">Campaign Orders</h2>
            <p className="mt-1 text-sm text-foreground-muted">Daftar order campaign dengan status escrow, progress views, dan submission kreator.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <label className="inline-flex min-h-10 w-full items-center gap-2 border border-border bg-background px-3 text-sm text-foreground-muted sm:w-[300px]">
              <span>Cari</span>
              <input
                value={searchTerm}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="campaign / creator / order id"
                className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle"
              />
            </label>

            <select
              value={statusFilter}
              onChange={(event) => handleFilterChange(event.target.value as "all" | UmkmEscrowOrderItem["escrowState"])}
              className="min-h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none sm:w-auto"
            >
              <option value="all">Status: All</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="released">Released</option>
            </select>

            <button
              type="button"
              onClick={exportCurrentRows}
              className="inline-flex min-h-10 w-full items-center justify-center border border-border px-3 font-label text-[10px] tracking-[0.14em] text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              EXPORT
            </button>
          </div>
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border bg-background/80 md:block">
          <table className="min-w-[1120px] w-full border-collapse text-sm">
            <thead className="bg-surface/80">
              <tr className="text-left text-xs uppercase tracking-[0.08em] text-foreground-subtle">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Judul Campaign</th>
                <th className="px-4 py-3">Claim Date</th>
                <th className="px-4 py-3">Content Creator</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Escrow Amount</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Submission</th>
                <th className="px-4 py-3">Order Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-sm text-foreground-muted">
                    Tidak ada order yang cocok dengan filter saat ini.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="umkm-orders-row border-t border-border/80 align-top text-foreground-muted">
                    <td className="px-4 py-3 font-label text-[10px] tracking-[0.14em] text-foreground">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{order.campaignTitle}</p>
                    </td>
                    <td className="px-4 py-3">{order.claimDate}</td>
                    <td className="px-4 py-3">
                      <p className="text-foreground">{order.creatorName}</p>
                      <p className="text-xs text-foreground-subtle">{order.creatorHandle}</p>
                    </td>
                    <td className="px-4 py-3">{order.paymentMethod}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{formatRupiah(order.escrowAmount)}</td>
                    <td className="px-4 py-3">{order.viewsProgress}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex min-h-7 items-center px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${submissionToneMap[order.submissionStatus]}`}>
                        {order.submissionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex min-h-7 items-center px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${escrowToneMap[order.escrowState]}`}>
                        {order.escrowState}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="inline-flex min-h-8 items-center border border-border px-3 font-label text-[10px] tracking-[0.12em] text-foreground transition-colors hover:bg-surface"
                      >
                        REVIEW
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {paginatedOrders.length === 0 ? (
            <article className="rounded-xl border border-border bg-background px-4 py-6 text-center text-sm text-foreground-muted">
              Tidak ada order yang cocok dengan filter saat ini.
            </article>
          ) : (
            paginatedOrders.map((order) => (
              <article key={order.id} className="umkm-orders-row rounded-xl border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">{order.id}</p>
                    <h3 className="mt-1 font-medium text-foreground">{order.campaignTitle}</h3>
                  </div>
                  <span className={`inline-flex min-h-7 items-center px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${escrowToneMap[order.escrowState]}`}>
                    {order.escrowState}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-sm text-foreground-muted">
                  <p>
                    Creator: <span className="text-foreground">{order.creatorName}</span> <span className="text-foreground-subtle">({order.creatorHandle})</span>
                  </p>
                  <p>
                    Claim Date: <span className="text-foreground">{order.claimDate}</span>
                  </p>
                  <p>
                    Payment: <span className="text-foreground">{order.paymentMethod}</span>
                  </p>
                  <p>
                    Escrow: <span className="font-medium text-foreground">{formatRupiah(order.escrowAmount)}</span>
                  </p>
                  <p>
                    Views: <span className="text-foreground">{order.viewsProgress}</span>
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className={`inline-flex min-h-7 items-center px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${submissionToneMap[order.submissionStatus]}`}>
                    {order.submissionStatus}
                  </span>
                  <button
                    type="button"
                    className="inline-flex min-h-8 items-center border border-border px-3 font-label text-[10px] tracking-[0.12em] text-foreground transition-colors hover:bg-surface"
                  >
                    REVIEW
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-foreground-muted">Rows:</span>
            <select
              value={rowsPerPage}
              onChange={(event) => handleRowsPerPageChange(Number(event.target.value))}
              className="min-h-9 border border-border bg-background px-2 text-xs text-foreground outline-none"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
            <span className="text-xs text-foreground-subtle">
              Menampilkan {currentRowsStart}-{currentRowsEnd} dari {filteredOrders.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex min-h-9 items-center justify-center border border-border px-3 text-xs text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-16"
            >
              Prev
            </button>
            <span className="inline-flex min-h-9 items-center justify-center border border-border bg-surface text-xs text-foreground sm:min-w-16">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="inline-flex min-h-9 items-center justify-center border border-border px-3 text-xs text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-16"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
