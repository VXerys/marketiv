export interface UmkmKpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  status: "up" | "down" | "neutral";
}

export interface UmkmQuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface UmkmCampaignRow {
  id: string;
  title: string;
  niche: string;
  budget: string;
  quota: string;
  status: "draft" | "aktif" | "menunggu_validasi" | "selesai";
}

export interface UmkmEscrowOrderItem {
  id: string;
  campaignTitle: string;
  creatorName: string;
  creatorHandle: string;
  claimDate: string;
  paymentMethod: "VA BCA" | "QRIS" | "GoPay" | "Bank Transfer";
  escrowAmount: number;
  viewsProgress: string;
  submissionStatus: "draft" | "submitted" | "validated" | "disputed";
  escrowState: "processing" | "shipped" | "released";
}

export interface UmkmAnalyticsHighlight {
  id: string;
  label: string;
  value: string;
  note: string;
}

export interface UmkmFraudQueueItem {
  id: string;
  campaignTitle: string;
  creatorHandle: string;
  anomalyReason: string;
  state: "review" | "clear";
}

export interface UmkmCampaignWizardStep {
  id: number;
  title: string;
  subtitle: string;
  checklist: string[];
}

export interface UmkmDashboardMock {
  metrics: UmkmKpiMetric[];
  quickActions: UmkmQuickAction[];
  campaigns: UmkmCampaignRow[];
  escrowOrders: UmkmEscrowOrderItem[];
  analyticsHighlights: UmkmAnalyticsHighlight[];
  fraudQueue: UmkmFraudQueueItem[];
  campaignWizardSteps: UmkmCampaignWizardStep[];
}
