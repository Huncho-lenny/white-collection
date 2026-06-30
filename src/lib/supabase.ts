import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) {
  console.warn("Supabase env vars missing — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env")
}

export const supabase = createClient(url ?? "", key ?? "")

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
  special_requests: string | null
  status: "pending" | "confirmed" | "declined"
  total_price: number
}
