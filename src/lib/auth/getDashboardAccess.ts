import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/user";

type AccessKind = "guest" | "authorized" | "mismatch";

export interface DashboardAccess {
  kind: AccessKind;
  expectedRole: UserRole;
  currentRole: UserRole | null;
  targetHref: string | null;
}

const roleRedirectMap: Record<UserRole, string> = {
  umkm: "/dashboard/umkm",
  creator: "/dashboard/creator",
  admin: "/admin",
};

const roleAliases: Record<string, UserRole> = {
  umkm: "umkm",
  creator: "creator",
  kreator: "creator",
  admin: "admin",
};

const DUMMY_AUTH_COOKIE = "marketiv_dummy_auth";

function normalizeRole(value: unknown): UserRole | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return roleAliases[normalized] ?? null;
}

function resolveRole(user: User): UserRole | null {
  const appMetadata = normalizeRole(user.app_metadata?.role);
  if (appMetadata) {
    return appMetadata;
  }

  const userMetadata = normalizeRole(user.user_metadata?.role);
  if (userMetadata) {
    return userMetadata;
  }

  return null;
}

function hasSupabaseEnv(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function guestAccess(expectedRole: UserRole): DashboardAccess {
  return {
    kind: "guest",
    expectedRole,
    currentRole: null,
    targetHref: "/login/umkm",
  };
}

function accessFromRole(expectedRole: UserRole, currentRole: UserRole): DashboardAccess {
  if (currentRole === expectedRole) {
    return {
      kind: "authorized",
      expectedRole,
      currentRole,
      targetHref: roleRedirectMap[currentRole],
    };
  }

  return {
    kind: "mismatch",
    expectedRole,
    currentRole,
    targetHref: roleRedirectMap[currentRole],
  };
}

async function resolveDummyCookieRole(): Promise<UserRole | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(DUMMY_AUTH_COOKIE)?.value;
  if (!cookieValue) {
    return null;
  }

  try {
    const payload = JSON.parse(cookieValue) as { role?: unknown; mode?: unknown };
    const role = normalizeRole(payload.role);
    const mode = typeof payload.mode === "string" ? payload.mode : "";

    if (mode !== "dev-dummy") {
      return null;
    }

    return role;
  } catch {
    return null;
  }
}

export async function getDashboardAccess(expectedRole: UserRole): Promise<DashboardAccess> {
  const dummyRole = await resolveDummyCookieRole();
  if (dummyRole) {
    return accessFromRole(expectedRole, dummyRole);
  }

  // Local/dev fallback: if Supabase env is not configured yet, keep dashboard in preview lock mode.
  if (!hasSupabaseEnv()) {
    return guestAccess(expectedRole);
  }

  let data: Awaited<ReturnType<Awaited<ReturnType<typeof createServerSupabaseClient>>["auth"]["getUser"]>>["data"];
  let error: Awaited<ReturnType<Awaited<ReturnType<typeof createServerSupabaseClient>>["auth"]["getUser"]>>["error"];

  try {
    const supabase = await createServerSupabaseClient();
    const response = await supabase.auth.getUser();
    data = response.data;
    error = response.error;
  } catch {
    return guestAccess(expectedRole);
  }

  if (error || !data.user) {
    return guestAccess(expectedRole);
  }

  const currentRole = resolveRole(data.user);

  if (!currentRole) {
    return guestAccess(expectedRole);
  }

  return accessFromRole(expectedRole, currentRole);
}
