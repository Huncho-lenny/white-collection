import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) {
  console.error("[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Check Vercel environment variables.")
}

// Ensure no trailing slash — a common misconfiguration that breaks _getSessionFromURL
const cleanUrl = (url ?? "").replace(/\/$/, "")

export const supabase = createClient(cleanUrl, key ?? "", {
  auth: {
    flowType: "pkce",
    // detectSessionInUrl must be FALSE — if true, the client auto-exchanges
    // the PKCE code on init and deletes the verifier from localStorage before
    // AuthCallback can use it, causing "PKCE code verifier not found in storage".
    // AuthCallback handles the exchange manually as the single source of truth.
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
