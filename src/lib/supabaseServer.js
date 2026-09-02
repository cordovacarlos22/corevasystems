import { createClient } from "@supabase/supabase-js";

// Server-side routes need the service role key, not the public anon key —
// with RLS on, the anon key can't write to tables that don't grant it an
// insert/update policy (contact_leads, stripe_orders, etc. all hit this).
// Falls back to the anon key only so a missing env var doesn't crash the
// import; writes will keep failing under RLS until SUPABASE_SERVICE_ROLE_KEY
// is set.
export function supabaseServer() {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "SUPABASE_SERVICE_ROLE_KEY is not set — falling back to the anon key, which RLS will likely reject for writes."
    );
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key);
}