import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  ArrowRight, CheckCircle, ChevronRight, CreditCard,
  Loader2, Lock, MapPin, MessageCircle,
} from "lucide-react"
import { GOLD, PROPERTIES } from "../data/properties"
import { GoldBtn } from "../components/ui-elements"
import { supabase } from "../lib/supabase"
import { useAuth } from "../lib/auth"
import type { DbProperty } from "../lib/supabase"

const STEPS = ["Your Details", "Payment", "Confirmed"]

export default function Booking() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const propertySlug = searchParams.get("property")

  const staticP = PROPERTIES.find((x) => x.slug === propertySlug) ?? PROPERTIES[0]
  const [dbProperty, setDbProperty] = useState<DbProperty | null>(null)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [paying, setPaying] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    notes: "",
  })

  // Prefill from profile once loaded
  useEffect(() => {
    if (!profile && !user) return
    const nameParts = (profile?.full_name ?? "").split(" ")
    setForm((f) => ({
      ...f,
      firstName: nameParts[0] ?? f.firstName,
      lastName: nameParts.slice(1).join(" ") ?? f.lastName,
      email: user?.email ?? f.email,
    }))
  }, [profile, user])

  useEffect(() => {
    const slug = propertySlug ?? staticP.slug
    supabase.from("properties").select("*").eq("slug", slug).single()
      .then(({ data }) => { if (data) setDbProperty(data) })
  }, [propertySlug, staticP.slug])

  const price = dbProperty?.price_per_night ?? staticP.price
  const maxGuests = dbProperty?.max_guests ?? staticP.guests
  const name = dbProperty?.title ?? staticP.name
  const image = dbProperty?.image_urls?.[0] ?? staticP.image
  const location = dbProperty?.location ?? staticP.location

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0
    const diff = (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000
    return diff > 0 ? Math.round(diff) : 0
  }, [form.checkIn, form.checkOut])

  const total = nights * price

  const update = (field: string, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }))

  // Step 1 → insert booking as pending, move to payment
  const handleSubmitDetails = async () => {
    if (!dbProperty) { setSubmitError("Property not found. Please go back and try again."); return }
    setSubmitting(true)
    setSubmitError(null)
    const { data, error } = await supabase.from("bookings").insert({
      property_id: dbProperty.id,
      user_id: user!.id,
      guest_name: `${form.firstName} ${form.lastName}`.trim(),
      guest_email: form.email,
      guest_phone: form.phone,
      check_in_date: form.checkIn,
      check_out_date: form.checkOut,
      number_of_guests: form.guests,
      special_requests: form.notes || null,
      status: "pending",
      payment_status: "unpaid",
      total_price: total,
    }).select("id").single()
    if (error) { setSubmitError(error.message); setSubmitting(false); return }
    setBookingId(data.id)
    setStep(2)
    setSubmitting(false)
  }

  // Step 2 → mock payment: update payment_status to paid
  const handleMockPayment = async () => {
    if (!bookingId) return
    setPaying(true)
    // Simulate a 1.5s payment processing delay
    await new Promise((r) => setTimeout(r, 1500))
    const { error } = await supabase
      .from("bookings")
      .update({ payment_status: "paid" })
      .eq("id", bookingId)
    if (error) { setSubmitError(error.message); setPaying(false); return }
    setStep(3)
    setPaying(false)
  }

  return (
    <div className="pt-24 pb-24 min-h-screen page-in">
      <div className="max-w-5xl mx-auto px-6">
        <div className="pt-10 mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
            Booking Request
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Reserve {name}</h1>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((label, i) => {
            const s = i + 1
            const done = s < step
            const active = s === step
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{ backgroundColor: done || active ? GOLD : "#e4ded5", color: done || active ? "white" : "#7a7268" }}
                >
                  {done ? <CheckCircle size={14} /> : s}
                </div>
                <span className={`text-sm hidden sm:block ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {s < STEPS.length && <ChevronRight size={14} className="text-muted-foreground mx-1" />}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

            {/* Step 1 — Guest details */}
            {step === 1 && (
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Guest Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="First Name" placeholder="Jane" value={form.firstName} onChange={(v) => update("firstName", v)} />
                  <Field label="Last Name" placeholder="Mwangi" value={form.lastName} onChange={(v) => update("lastName", v)} />
                  <Field label="Email Address" type="email" placeholder="jane@example.com" value={form.email} onChange={(v) => update("email", v)} />
                  <Field label="Phone Number" type="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={(v) => update("phone", v)} />
                  <Field label="Check In" type="date" value={form.checkIn} onChange={(v) => update("checkIn", v)} />
                  <Field label="Check Out" type="date" value={form.checkOut} onChange={(v) => update("checkOut", v)} />
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Guests</label>
                    <select
                      value={form.guests}
                      onChange={(e) => update("guests", Number(e.target.value))}
                      className="w-full border border-border rounded-2xl px-4 py-3 text-sm text-foreground bg-background outline-none focus:border-[#C9A55A] transition-colors"
                    >
                      {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-foreground block mb-2">Special Requests</label>
                    <textarea
                      rows={3}
                      placeholder="Early check-in, dietary requirements, special occasions..."
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      className="w-full border border-border rounded-2xl px-4 py-3 text-sm text-foreground bg-background outline-none focus:border-[#C9A55A] resize-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
                )}

                <button
                  onClick={handleSubmitDetails}
                  disabled={!form.firstName || !form.phone || !form.checkIn || !form.checkOut || nights === 0 || submitting}
                  className="mt-6 text-white font-semibold px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: GOLD }}
                >
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
                  {submitting ? "Saving…" : "Continue to Payment"}
                </button>
              </div>
            )}

            {/* Step 2 — Mock payment */}
            {step === 2 && (
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">Payment</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  This is a demo checkout. No real payment is processed — M-Pesa and card integration coming in Phase 2.
                </p>

                <div className="border border-border rounded-2xl p-6 mb-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard size={18} className="text-muted-foreground" />
                    <span className="font-semibold text-foreground text-sm">Demo Card</span>
                  </div>
                  {[
                    { label: "Card Number", value: "4242 4242 4242 4242" },
                    { label: "Expiry", value: "12 / 26" },
                    { label: "CVC", value: "•••" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">{label}</label>
                      <div className="border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground bg-secondary/40">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                  <Lock size={12} />
                  <span>Payments are secured end-to-end. Real integration coming soon.</span>
                </div>

                {submitError && (
                  <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
                )}

                <button
                  onClick={handleMockPayment}
                  disabled={paying}
                  className="w-full text-white font-semibold py-4 rounded-2xl inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                  style={{ backgroundColor: GOLD }}
                >
                  {paying ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                  {paying ? "Processing…" : `Pay KSh ${total.toLocaleString()}`}
                </button>
              </div>
            )}

            {/* Step 3 — Confirmed */}
            {step === 3 && (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={38} className="text-emerald-600" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground mb-3">Booking Confirmed!</h2>
                <p className="text-muted-foreground text-sm mb-9 max-w-md mx-auto leading-relaxed">
                  Thanks, {form.firstName || "there"}. Your booking for {name}
                  {nights > 0 ? ` (${nights} night${nights > 1 ? "s" : ""})` : ""} is confirmed.
                  We'll be in touch on WhatsApp to share check-in details.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <GoldBtn onClick={() => window.open("https://wa.me/254700000000", "_blank")}>
                    <MessageCircle size={15} className="inline mr-1.5" />
                    Message Us on WhatsApp
                  </GoldBtn>
                  <button
                    onClick={() => navigate("/account")}
                    className="border border-border text-foreground px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
                  >
                    View My Bookings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary card */}
          <div>
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl sticky top-24">
              <div className="bg-muted" style={{ aspectRatio: "16/9" }}>
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg text-foreground">{name}</h3>
                <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1 mb-5">
                  <MapPin size={12} />{location}
                </p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {nights > 0
                        ? `${nights} night${nights > 1 ? "s" : ""} × KSh ${price.toLocaleString()}`
                        : `KSh ${price.toLocaleString()} / night`}
                    </span>
                    <span className="text-foreground font-semibold">KSh {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="text-foreground font-semibold">KSh 0</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border font-bold text-foreground">
                    <span>Total</span>
                    <span>KSh {total.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  No fees, no markup — you pay only the nightly rate, directly to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label, placeholder, type = "text", value, onChange,
}: {
  label: string
  placeholder?: string
  type?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground block mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border rounded-2xl px-4 py-3 text-sm text-foreground bg-background outline-none focus:border-[#C9A55A] transition-colors placeholder:text-muted-foreground"
      />
    </div>
  )
}
