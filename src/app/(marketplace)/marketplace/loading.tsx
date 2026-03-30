export default function MarketplaceLoading() {
  return (
    <main className="landing-light min-h-screen border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="animate-pulse border border-border bg-surface px-4 py-6 md:px-6 md:py-8">
          <div className="h-3 w-40 bg-border" />
          <div className="mt-4 h-10 w-full max-w-[720px] bg-border" />
          <div className="mt-4 h-4 w-full max-w-[840px] bg-border" />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="border border-border bg-background">
                <div className="aspect-[3/4] bg-border" />
                <div className="space-y-2 px-3 py-3">
                  <div className="h-2.5 w-1/2 bg-border" />
                  <div className="h-4 w-full bg-border" />
                  <div className="h-4 w-5/6 bg-border" />
                  <div className="h-10 w-full bg-border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}