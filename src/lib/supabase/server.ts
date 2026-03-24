/**
 * Supabase Server Client
 *
 * For use in Server Components, Server Actions, and Route Handlers ONLY.
 * Has access to the service role key (never exposed to the client).
 *
 * 📱 Mobile Analogy: Like a backend AdminSDK instance (Firebase Admin)
 * used only in trusted server contexts — never shipped to the device.
 *
 * Usage (in Server Component or Route Handler):
 *   import { createServerSupabaseClient } from "@/lib/supabase/server";
 *   const supabase = await createServerSupabaseClient();
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll is called from a Server Component — safe to ignore.
            // Mutations are only needed in middleware or Route Handlers.
          }
        },
      },
    }
  );
}
