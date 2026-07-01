import { useState } from "react"
import { Mail, MapPin, MessageCircle, Phone, Loader2, CheckCircle } from "lucide-react"
import { useReveal } from "../hooks"
import { GOLD, GOLD_DARK, CHARCOAL } from "../data/properties"

// TODO: swap in the real phone number, email, and WhatsApp link before launch
const CONTACT_ITEMS = [
  { icon: Phone, label: "Telephone", value: "+254 7XX XXX XXX", href: "tel:+2547XXXXXXXX" },
  { icon: Mail, label: "Email", value: "hello@thewhitecollection.co.ke", href: "mailto:hello@thewhitecollection.co.ke" },
  { icon: MessageCircle, label: "WhatsApp", value: "+254 7XX XXX XXX", href: "https://wa.me/254700000000" },
  { icon: MapPin, label: "Villas", value: "Kisumu & Mombasa, Kenya", href: "#" },
]

export default function Contact() {
  const leftReveal = useReveal()
  const rightReveal = useReveal()

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", type: "Villa Enquiry", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.")
      return
    }
    setSubmitting(true)
    setError(null)
    // No backend yet — simulate a short delay then show success
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-24 pb-24 page-in">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-10">
          <div ref={leftReveal.ref} className={leftReveal.visible ? "rev-left" : "opacity-0"}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              Get in Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              We Are Here<br />to Help
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Questions about a villa, dates, or pricing? Reach us directly — no call centre, just us.
            </p>

            <div className="space-y-3 mb-10">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 bg-secondary rounded-2xl border border-border hover:border-[#C9A55A] transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${GOLD}18` }}>
                    <item.icon size={17} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                    <p className="text-foreground font-medium text-sm mt-0.5 group-hover:text-[#C9A55A] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: CHARCOAL }}>
              <p className="text-white/65 text-sm mb-4">Usually replies within a few hours</p>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 font-semibold px-6 py-3 rounded-xl text-white transition-colors"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div
            ref={rightReveal.ref}
            className={`${rightReveal.visible ? "rev-right" : "opacity-0"} bg-card border border-border rounded-3xl p-8 shadow-sm`}
          >
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={30} className="text-emerald-600" />
                </div>
                <p className="font-display text-xl font-semibold text-foreground mb-2">Message Sent!</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thanks, {form.firstName}. We'll get back to you within a few hours.
                </p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Enquiry Type</label>
                <select
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm text-foreground bg-background outline-none focus:border-[#C9A55A] transition-colors"
                >
                  {["Villa Enquiry", "Booking Assistance", "Special Occasion", "Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your ideal stay or any questions you have..."
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors resize-none placeholder:text-muted-foreground"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: GOLD }}
                onMouseEnter={(e) => !submitting && (e.currentTarget.style.backgroundColor = GOLD_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : "Send Message"}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
