export default function MarketplaceDetailLoading() {
  return (
    <main className="landing-light min-h-screen border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="animate-pulse border border-border bg-surface px-4 py-6 md:px-6 md:py-8">
          <div className="h-3 w-48 bg-border" />
          <div className="mt-4 h-11 w-full max-w-[760px] bg-border" />
          <div className="mt-3 h-4 w-full max-w-[920px] bg-border" />
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_320px]">
            <div className="min-h-[260px] border border-border bg-background" />
            <div className="min-h-[260px] border border-border bg-background" />
          </div>
        </div>
      </div>
    </main>
  );
}
