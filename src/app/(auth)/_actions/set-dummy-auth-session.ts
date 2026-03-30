"use server";

import { cookies } from "next/headers";
import type { UserRole as AuthRole } from "@/app/(auth)/_components/auth-role-types";
import type { UserRole } from "@/types/user";

const DUMMY_AUTH_COOKIE = "marketiv_dummy_auth";

interface SetDummyAuthSessionInput {
  email: string;
  password: string;
  role: AuthRole;
}

interface DummyAuthCookiePayload {
  email: string;
  role: UserRole;
  mode: "dev-dummy";
  timestamp: number;
}

interface SetDummyAuthSessionResult {
  redirectTo: string;
}

const roleRedirectMap: Record<UserRole, string> = {
  umkm: "/dashboard/umkm",
  creator: "/dashboard/creator",
  admin: "/admin",
};

function mapAuthRoleToUserRole(role: AuthRole): UserRole {
  if (role === "kreator") {
    return "creator";
  }

  return "umkm";
}

export async function setDummyAuthSession(input: SetDummyAuthSessionInput): Promise<SetDummyAuthSessionResult> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const normalizedPassword = input.password.trim();
  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Email dan password wajib diisi.");
  }

  const userRole = mapAuthRoleToUserRole(input.role);
  const payload: DummyAuthCookiePayload = {
    email: normalizedEmail,
    role: userRole,
    mode: "dev-dummy",
    timestamp: Date.now(),
  };

  const cookieStore = await cookies();

  cookieStore.set(DUMMY_AUTH_COOKIE, JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { redirectTo: roleRedirectMap[userRole] };
}
