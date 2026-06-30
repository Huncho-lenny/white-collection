import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {["First Name", "Last Name"].map((l) => (
                  <div key={l}>
                    <label className="text-sm font-semibold text-foreground block mb-2">{l}</label>
                    <input
                      type="text"
                      className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Enquiry Type</label>
                <select className="w-full border border-border rounded-2xl px-4 py-3 text-sm text-foreground bg-background outline-none focus:border-[#C9A55A] transition-colors">
                  {["Villa Enquiry", "Booking Assistance", "Special Occasion", "Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your ideal stay or any questions you have..."
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-background outline-none focus:border-[#C9A55A] transition-colors resize-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                className="w-full text-white font-semibold py-4 rounded-2xl transition-colors"
                style={{ backgroundColor: GOLD }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
