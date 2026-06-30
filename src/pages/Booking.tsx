import { useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ArrowRight, CheckCircle, ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { GOLD, GOLD_DARK, PROPERTIES } from "../data/properties"
import { GoldBtn } from "../components/ui-elements"

export default function Booking() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const propertySlug = searchParams.get("property")
  const p = PROPERTIES.find((x) => x.slug === propertySlug) ?? PROPERTIES[0]

  const [step, setStep] = useState(1)
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

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0
    const diff = (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000
    return diff > 0 ? Math.round(diff) : 0
  }, [form.checkIn, form.checkOut])

  const total = nights * p.price

  const update = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="pt-24 pb-24 min-h-screen page-in">
      <div className="max-w-5xl mx-auto px-6">
        <div className="pt-10 mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
            Booking Request
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Reserve {p.name}</h1>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {["Your Details", "Review & Send"].map((label, i) => {
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
                {s < 2 && <ChevronRight size={14} className="text-muted-foreground mx-1" />}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                      {Array.from({ length: p.guests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? "s" : ""}
                        </option>
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
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.firstName || !form.phone || !form.checkIn || !form.checkOut}
                  className="mt-6 text-white font-semibold px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: GOLD }}
                >
                  Review Booking <ArrowRight size={15} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={38} className="text-emerald-600" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground mb-3">Request Sent!</h2>
                <p className="text-muted-foreground text-sm mb-9 max-w-md mx-auto leading-relaxed">
                  Thanks, {form.firstName || "there"}. We've received your request for {p.name}
                  {nights > 0 ? ` (${nights} night${nights > 1 ? "s" : ""})` : ""}. We'll confirm
                  availability and payment details directly on WhatsApp or via the phone number you
                  provided, usually within a few hours.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <GoldBtn onClick={() => window.open("https://wa.me/254700000000", "_blank")}>
                    <MessageCircle size={15} className="inline mr-1.5" />
                    Message Us on WhatsApp
                  </GoldBtn>
                  <button
                    onClick={() => navigate("/")}
                    className="border border-border text-foreground px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary card */}
          <div>
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl sticky top-24">
              <div className="bg-muted" style={{ aspectRatio: "16/9" }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg text-foreground">{p.name}</h3>
                <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1 mb-5">
                  <MapPin size={12} />
                  {p.location}
                </p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""} × KSh ${p.price.toLocaleString()}` : `KSh ${p.price.toLocaleString()} / night`}
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
  label,
  placeholder,
  type = "text",
  value,
  onChange,
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
