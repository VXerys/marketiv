export type UserRole = "umkm" | "creator" | "admin";

export interface MarketivUser {
  id: string;
  fullName: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
}
