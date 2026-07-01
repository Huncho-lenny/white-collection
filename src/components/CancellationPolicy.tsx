import { Clock, RefreshCw, XCircle, MessageCircle } from "lucide-react"
import { useReveal } from "../hooks"
import { GOLD } from "../data/properties"
import { SectionHeading } from "./ui-elements"

const POLICIES = [
  {
    icon: RefreshCw,
    title: "Full Refund",
    badge: "14+ days notice",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    desc: "Cancel at least 14 days before your check-in date and receive a full refund of any deposit paid, no questions asked.",
  },
  {
    icon: Clock,
    title: "50% Refund",
    badge: "7–13 days notice",
    badgeColor: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    desc: "Cancellations made 7 to 13 days before check-in are eligible for a 50% refund of the deposit paid.",
  },
  {
    icon: XCircle,
    title: "No Refund",
    badge: "Under 7 days",
    badgeColor: "bg-red-500/15 text-red-400 border border-red-500/20",
    desc: "Cancellations within 7 days of check-in are non-refundable. We strongly recommend travel insurance for last-minute plans.",
  },
  {
    icon: MessageCircle,
    title: "How to Cancel",
    badge: "WhatsApp or Email",
    badgeColor: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    desc: "Contact us directly on WhatsApp or email with your booking reference. We'll confirm the cancellation and process any eligible refund within 5 business days.",
  },
]

function PolicyCard({ item, delay }: { item: (typeof POLICIES)[0]; delay: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`${visible ? `rev-up d${delay}` : "opacity-0"} bg-card border border-border rounded-3xl p-7 hover:border-[#C9A55A]/30 transition-colors`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${GOLD}18` }}
        >
          <item.icon size={19} style={{ color: GOLD }} />
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}>
          {item.badge}
        </span>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
    </div>
  )
}

export function CancellationPolicy() {
  const noteReveal = useReveal()

  return (
    <section id="cancellation-policy" style={{ backgroundColor: "#0f0f0f" }} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          light
          eyebrow="Cancellation Policy"
          title={<>Flexible &amp; Fair,<br />Always Transparent</>}
          sub="We understand plans change. Our policy is designed to be fair to both guests and hosts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {POLICIES.map((item, i) => (
            <PolicyCard key={item.title} item={item} delay={i * 100} />
          ))}
        </div>

        {/* Fine print note */}
        <div
          ref={noteReveal.ref}
          className={`${noteReveal.visible ? "rev-up d0" : "opacity-0"} mt-10 border border-white/8 rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4`}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${GOLD}18` }}
          >
            <Clock size={17} style={{ color: GOLD }} />
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            <span className="text-white/70 font-medium">Note: </span>
            All cancellation notice periods are calculated from midnight (EAT, UTC+3) on the day of check-in.
            Refunds are processed to the original payment method. For extenuating circumstances, please reach out — we'll always try to find a fair solution.
          </p>
        </div>
      </div>
    </section>
  )
}
