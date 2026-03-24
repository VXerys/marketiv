export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  totalAmount: number;
  status: "pending" | "paid" | "processing" | "completed" | "cancelled";
  createdAt: string;
}
