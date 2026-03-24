/**
 * Supabase Browser Client
 *
 * Safe for use in Client Components ("use client").
 * Uses only NEXT_PUBLIC_ variables — never exposes secret keys.
 *
 * 📱 Mobile Analogy: Like a singleton Firebase/Supabase instance
 * initialized once at app startup in Flutter's `main.dart`.
 *
 * Usage:
 *   import { createBrowserClient } from "@/lib/supabase/client";
 *   const supabase = createBrowserClient();
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
