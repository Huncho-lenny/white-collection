import { Heart, MapPin, Users, Sparkles } from "lucide-react"
import { useReveal } from "../hooks"
import { GOLD } from "../data/properties"
import { SectionHeading } from "./ui-elements"

const PILLARS = [
  {
    icon: Heart,
    title: "Owner-Managed",
    desc: "Both villas are personally owned and managed by us — not a faceless agency. You deal directly with the people who care most about your stay.",
  },
  {
    icon: MapPin,
    title: "Two Iconic Locations",
    desc: "Lakeside serenity in Kisumu, coastal luxury in Mombasa. Two very different escapes, one consistent standard of quality.",
  },
  {
    icon: Users,
    title: "Built for Families & Groups",
    desc: "Spacious layouts, full kitchens, and private grounds — designed for the way real families and friend groups actually travel.",
  },
  {
    icon: Sparkles,
    title: "No Fees, No Surprises",
    desc: "Book direct and pay only the nightly rate. No platform markup, no hidden charges — just honest, transparent pricing.",
  },
]

function Pillar({ item, delay }: { item: (typeof PILLARS)[0]; delay: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`${visible ? `rev-up d${delay}` : "opacity-0"} flex gap-5`}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${GOLD}18` }}
      >
        <item.icon size={19} style={{ color: GOLD }} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-white mb-1.5">{item.title}</h3>
        <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}

export function AboutUs() {
  const imgReveal = useReveal()

  return (
    <section id="about" style={{ backgroundColor: "#0f0f0f" }} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — image stack */}
          <div
            ref={imgReveal.ref}
            className={`${imgReveal.visible ? "rev-left" : "opacity-0"} relative`}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1100&fit=crop&auto=format"
                alt="White Collection villa interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 shadow-2xl">
              <p className="text-xs text-white/40 font-semibold uppercase tracking-widest mb-1">Est.</p>
              <p className="font-display text-3xl font-bold text-white">2024</p>
              <p className="text-xs text-white/40 mt-0.5">Nairobi, Kenya</p>
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <SectionHeading
              light
              center={false}
              eyebrow="About Us"
              title={<>A Different Kind<br />of Villa Stay</>}
              sub="The White Collection was founded on a simple belief — that a private villa stay should feel personal, not transactional."
            />

            <div className="space-y-8 mt-2">
              {PILLARS.map((item, i) => (
                <Pillar key={item.title} item={item} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
