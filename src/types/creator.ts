export interface CreatorKpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  status: "up" | "down" | "neutral";
}

export interface CreatorAlertItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info" | "success";
}

export interface CreatorJobOpportunity {
  id: string;
  brandName: string;
  campaignTitle: string;
  niche: string;
  payoutPer1kViewsIdr: number;
  minTargetViews: number;
  deadline: string;
  slotsRemaining: number;
  competitionLevel: "low" | "medium" | "high";
}

export interface CreatorSubmissionItem {
  id: string;
  campaignTitle: string;
  brandName: string;
  submittedAt: string;
  viewsAchieved: number;
  targetViews: number;
  payoutAmount: number;
  status: "draft" | "submitted" | "revision" | "validated" | "disputed";
  reviewerNote: string;
}

export interface CreatorEarningsSummary {
  monthGross: number;
  monthNet: number;
  pendingRelease: number;
  releasedThisMonth: number;
}

export interface CreatorEarningItem {
  id: string;
  campaignTitle: string;
  periodLabel: string;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  payoutStatus: "processing" | "scheduled" | "released";
  payoutDate: string;
}

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  platform: "TikTok" | "Instagram" | "YouTube";
  niche: string;
  views: number;
  engagementRate: number;
  completionRate: number;
  health: "healthy" | "watch" | "risk";
  highlight: string;
}

export interface CreatorDashboardMock {
  metrics: CreatorKpiMetric[];
  alerts: CreatorAlertItem[];
  recommendedActions: string[];
  jobs: CreatorJobOpportunity[];
  submissions: CreatorSubmissionItem[];
  earningsSummary: CreatorEarningsSummary;
  earnings: CreatorEarningItem[];
  portfolio: CreatorPortfolioItem[];
}
