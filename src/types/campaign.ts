export interface Campaign {
  id: string;
  title: string;
  mode: "campaign" | "rate_card";
  umkmId: string;
  creatorId: string | null;
  status: "draft" | "open" | "in_progress" | "completed";
  createdAt: string;
}
