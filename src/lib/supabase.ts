import { createClient } from "@supabase/supabase-js"

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Vite bakes import.meta.env values into the bundle at BUILD time.
// If these are undefined here, the env vars were not set in Vercel dashboard
// before the build ran. "undefined" (the string) passed to createClient
// causes: Failed to execute 'fetch': Invalid value
console.log("[supabase] URL present:", !!rawUrl, "| KEY present:", !!rawKey)

if (!rawUrl || rawUrl === "undefined") {
  console.error(
    "[supabase] VITE_SUPABASE_URL is missing or invalid.\n" +
    "Go to Vercel Dashboard → Project → Settings → Environment Variables\n" +
    "Add VITE_SUPABASE_URL = https://tytscdansburphlhyhds.supabase.co\n" +
    "Then trigger a redeploy — Vite bakes these at build time, not runtime."
  )
}

if (!rawKey || rawKey === "undefined") {
  console.error(
    "[supabase] VITE_SUPABASE_ANON_KEY is missing or invalid.\n" +
    "Go to Vercel Dashboard → Project → Settings → Environment Variables\n" +
    "Add VITE_SUPABASE_ANON_KEY and trigger a redeploy."
  )
}

// Strip trailing slash — /rest/v1 or trailing / breaks _getSessionFromURL
const cleanUrl = (rawUrl ?? "").replace(/\/$/, "").replace(/\/rest\/v1$/, "")

export const supabase = createClient(cleanUrl, rawKey ?? "", {
  auth: {
    flowType: "pkce",
    // detectSessionInUrl MUST be false — if true, the Supabase client
    // auto-exchanges the PKCE code on init and deletes the verifier from
    // localStorage before AuthCallback can use it.
    // AuthCallback is the single authority for the code exchange.
    detectSessionInUrl: false,
    persistSession: true,
  },
})

// ── Types that mirror your DB schema ─────────────────────────────────────────

export interface DbProperty {
  id: string           // uuid
  slug: string
  title: string
  location: string
  price_per_night: number
  max_guests: number
  bedrooms: number
  bathrooms: number
  rating: number | null
  review_count: number
  image_urls: string[]
  tag: string | null
  type?: string
  amenities: string[]
  description: string
  status: string
}

export interface DbBooking {
  id: string
  created_at: string
  property_id: string
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in_date: string
  check_out_date: string
  number_of_guests: number
  special_requests: string | null
  status: "pending" | "confirmed" | "declined"
  total_price: number
}
