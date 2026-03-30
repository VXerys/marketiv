export const MARKETIV_ROLES = ["umkm", "creator", "admin"] as const;

export const CAMPAIGN_MODES = ["campaign", "rate_card"] as const;

export const UMKM_MARKETPLACE_CATEGORIES = [
	"Kuliner",
	"Fashion",
	"Tech",
	"Beauty",
	"Home Living",
	"Jasa",
] as const;

export const MARKETPLACE_SORT_OPTIONS = [
	{ value: "relevance", label: "RELEVAN" },
	{ value: "latest", label: "TERBARU" },
	{ value: "lowest_price", label: "BUDGET/RATE TERENDAH" },
	{ value: "highest_views", label: "TARGET VIEWS TERTINGGI" },
] as const;
