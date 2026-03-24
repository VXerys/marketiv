import { useMemo } from "react";

export interface MarketplaceFilterState {
  search: string;
  category: string;
}

export function useMarketplaceFilter(state: MarketplaceFilterState) {
  return useMemo(() => ({
    normalizedSearch: state.search.trim().toLowerCase(),
    category: state.category,
  }), [state.search, state.category]);
}
