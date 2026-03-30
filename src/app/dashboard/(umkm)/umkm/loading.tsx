export default function UmkmDashboardLoading() {
  return (
    <div className="umkm-dashboard-space space-y-4">
      <div className="umkm-panel h-36 animate-pulse border border-border bg-surface/70" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="umkm-panel h-28 animate-pulse border border-border bg-surface/70" />
        <div className="umkm-panel h-28 animate-pulse border border-border bg-surface/70" />
        <div className="umkm-panel h-28 animate-pulse border border-border bg-surface/70" />
        <div className="umkm-panel h-28 animate-pulse border border-border bg-surface/70" />
      </div>
    </div>
  );
}
