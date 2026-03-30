export type MarketplaceMode = "campaign" | "rate_card";

export type MarketplaceListingStatus = "verified" | "processing" | "open";

export interface CampaignAssetPackage {
  internalAssets: ReadonlyArray<string>;
  externalDriveUrl: string | null;
  note: string;
}

export interface CampaignContext {
  briefObjective: string;
  briefInstructions: ReadonlyArray<string>;
  payoutPer1kViewsIdr: number;
  creatorQuotaTotal: number;
  creatorQuotaClaimed: number;
  deadlineText: string;
  assetPackage: CampaignAssetPackage;
}

export interface RateCardContext {
  packageName: string;
  deliverables: ReadonlyArray<string>;
  revisionPolicy: string;
  estimatedDays: number;
  chatPolicy: string;
  escrowPolicy: string;
  collabPostRequired: boolean;
  portfolioLinks: ReadonlyArray<string>;
  customOfferScope: string;
}

export interface MarketplaceListing {
  id: string;
  mode: MarketplaceMode;
  title: string;
  description: string;
  category: string;
  amountIdr: number;
  targetViews: number | null;
  reachedViews: number | null;
  status: MarketplaceListingStatus;
  creatorName: string;
  brandName: string;
  avatarUrl: string | null;
  thumbnailUrl: string;
  channels: ReadonlyArray<"tiktok" | "instagram" | "youtube">;
  tags: ReadonlyArray<string>;
  rating: number;
  totalCollaborations: number;
  updatedAt: string;
  campaignContext?: CampaignContext;
  rateCardContext?: RateCardContext;
}