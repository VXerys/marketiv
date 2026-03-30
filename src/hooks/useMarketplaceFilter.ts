import { useMemo } from "react";
import type { MarketplaceMode } from "@/types/marketplace";

export interface MarketplaceFilterState {
  mode: MarketplaceMode;
  search: string;
  category: string;
  sortBy: "relevance" | "latest" | "lowest_price" | "highest_views";
}

export function useMarketplaceFilter(state: MarketplaceFilterState) {
  return useMemo(
    () => ({
      mode: state.mode,
      normalizedSearch: state.search.trim().toLowerCase(),
      category: state.category,
      sortBy: state.sortBy,
    }),
    [state.category, state.mode, state.search, state.sortBy]
  );
}
