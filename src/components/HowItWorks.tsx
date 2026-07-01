import { Search, CalendarCheck, MessageCircle, CheckCircle2, Smile } from "lucide-react"
import { useReveal } from "../hooks"
import { GOLD } from "../data/properties"
import { SectionHeading } from "./ui-elements"

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Browse Our Villas",
    desc: "Explore White Hill Villa in Kisumu or White Cliff Villa in Mombasa. View photos, amenities, and real pricing — no sign-up required.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Pick Your Dates",
    desc: "Select your check-in and check-out dates, number of guests, and submit a booking request directly through the site.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "We Confirm via WhatsApp",
    desc: "We review your request and reach out on WhatsApp within a few hours to confirm availability and share payment details.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Secure Your Booking",
    desc: "Pay a deposit to lock in your dates. We accept M-Pesa and bank transfer. No third-party platform fees — ever.",
  },
  {
    icon: Smile,
    step: "05",
    title: "Arrive & Enjoy",
    desc: "Check in on your terms. We'll be available throughout your stay for anything you need — just a message away.",
  },
]

function Step({ item, index }: { item: (typeof STEPS)[0]; index: number }) {
  const { ref, visible } = useReveal()
  const isLast = index === STEPS.length - 1

  return (
    <div
      ref={ref}
      className={`${visible ? `rev-up d${index * 100}` : "opacity-0"} relative flex gap-5 md:gap-6`}
    >
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-[22px] top-[52px] w-px bottom-0 -mb-6"
          style={{ background: `linear-gradient(to bottom, ${GOLD}40, transparent)` }}
        />
      )}

      {/* Icon circle */}
      <div className="shrink-0 relative z-10">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: GOLD, backgroundColor: "#111" }}
        >
          <item.icon size={17} style={{ color: GOLD }} />
        </div>
      </div>

      {/* Content */}
      <div className="pb-10">
        <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: GOLD }}>
          Step {item.step}
        </span>
        <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{item.desc}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How It Works"
          title={<>From Browse<br />to Check-In</>}
          sub="Booking directly with us is simple, fast, and personal. Here's exactly what to expect."
        />

        <div className="max-w-2xl mx-auto">
          {STEPS.map((item, i) => (
            <Step key={item.step} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
