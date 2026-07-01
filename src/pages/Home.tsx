import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  MapPin, Star, Users, Calendar, Search, ChevronDown,
  ArrowRight, ArrowUpRight, Award, Shield, Headphones, Globe,
  Waves, Wifi, Utensils, Car, Coffee, Tv,
} from "lucide-react"
import { useReveal } from "../hooks"
import { GOLD, GOLD_DARK, PROPERTIES } from "../data/properties"
import { SectionHeading, StatCounter, GoldBtn } from "../components/ui-elements"
import { PropertyCard } from "../components/PropertyCard"
import { AboutUs } from "../components/AboutUs"
import { HowItWorks } from "../components/HowItWorks"
import { CancellationPolicy } from "../components/CancellationPolicy"

type WhyCardProps = {
  item: { icon: React.ElementType; title: string; desc: string }
  delay: number
}
function WhyCard({ item, delay }: WhyCardProps) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`${visible ? `rev-up d${delay}` : "opacity-0"} p-7 rounded-3xl border border-white/8 hover:border-white/15 transition-colors`}
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GOLD}18` }}>
        <item.icon size={20} style={{ color: GOLD }} />
      </div>
      <h3 className="font-display text-xl font-semibold text-white mb-3">{item.title}</h3>
      <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const amenitiesReveal = useReveal()
  const ctaReveal = useReveal()

  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "#0e0e0e" }}>
          <img
            src={PROPERTIES[0].image}
            alt={PROPERTIES[0].name}
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="relative z-10 text-white px-6 w-full max-w-5xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm px-4 py-2 mb-7">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: GOLD }} />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/80">Private Villas, Kenya</span>
          </div>

          <h1 className="hero-title font-display text-6xl md:text-8xl font-semibold leading-[0.95] mb-7">
            Where Comfort<br />
            <em style={{ color: GOLD }}>Meets Home</em>
          </h1>
          <p className="hero-sub text-white/70 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-12">
            Two private villas in Kisumu and Mombasa, booked directly with us. No middleman, no booking fees.
          </p>

          {/* Search bar */}
          <div className="hero-search glass-search rounded-2xl p-3 max-w-3xl shadow-2xl border border-white/20">
            <div className="flex flex-col md:flex-row gap-2">
              {[
                {
                  icon: <MapPin size={16} style={{ color: GOLD }} />,
                  label: "Villa",
                  input: (
                    <select className="text-sm font-medium text-foreground bg-transparent outline-none w-full">
                      {PROPERTIES.map((p) => (
                        <option key={p.id}>{p.name}</option>
                      ))}
                    </select>
                  ),
                },
                {
                  icon: <Calendar size={16} style={{ color: GOLD }} />,
                  label: "Check In",
                  input: <input type="date" className="text-sm font-medium text-foreground bg-transparent outline-none w-full" />,
                },
                {
                  icon: <Calendar size={16} style={{ color: GOLD }} />,
                  label: "Check Out",
                  input: <input type="date" className="text-sm font-medium text-foreground bg-transparent outline-none w-full" />,
                },
                {
                  icon: <Users size={16} style={{ color: GOLD }} />,
                  label: "Guests",
                  input: (
                    <select className="text-sm font-medium text-foreground bg-transparent outline-none w-full">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  ),
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors ${
                    i < 3 ? "md:border-r border-border" : ""
                  }`}
                >
                  {f.icon}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{f.label}</p>
                    {f.input}
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate("/properties")}
                className="flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl shrink-0 transition-colors"
                style={{ backgroundColor: GOLD }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              >
                <Search size={17} />
                <span className="hidden sm:block">Search</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* Honest stats — no inflated numbers */}
      <div ref={statsRef} style={{ backgroundColor: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/8">
          {[
            { v: 2, s: "", l: "Private Villas" },
            { v: 2, s: "", l: "Kenyan Coastal & Lake Towns" },
            { v: 100, s: "%", l: "Direct Booking, No Fees" },
          ].map((stat) => (
            <StatCounter key={stat.l} value={stat.v} suffix={stat.s} label={stat.l} active={statsVisible} />
          ))}
        </div>
      </div>

      {/* Both villas, side by side */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Villas"
          title={<>Two Villas,<br />Made for Different Trips</>}
          sub="Each villa is personally managed by us — real photos, honest pricing, and direct communication from booking to checkout."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROPERTIES.map((p, i) => (
            <PropertyCard key={p.id} p={p} delay={i * 150} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/properties")}
            className="border border-foreground text-foreground text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors inline-flex items-center gap-2"
          >
            View Full Details <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Why book direct */}
      <section style={{ backgroundColor: "#0f0f0f" }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            light
            eyebrow="The White Collection Difference"
            title={<>Why Book<br />Directly With Us</>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Award, title: "Personally Managed", desc: "We own and manage both villas ourselves — no agency in between." },
              { icon: Shield, title: "No Booking Fees", desc: "Book direct and pay only the nightly rate, no platform markup." },
              { icon: Headphones, title: "Direct Contact", desc: "Reach us straight on WhatsApp or call — real answers, fast." },
              { icon: Globe, title: "Two Locations", desc: "Lakeside in Kisumu, coastal in Mombasa — pick your escape." },
            ].map((item, i) => (
              <WhyCard key={item.title} item={item} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities split layout */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={amenitiesReveal.ref} className={amenitiesReveal.visible ? "rev-left" : "opacity-0"}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
                Signature Amenities
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
                Every Comfort,<br />Every Detail
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Both villas come fully equipped so you can focus entirely on the stay — reliable power, fast WiFi, and a kitchen ready to use from the moment you arrive.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Waves, label: "Pool / Lake & Sea Access" },
                  { icon: Wifi, label: "High-Speed WiFi" },
                  { icon: Utensils, label: "Full Kitchen" },
                  { icon: Car, label: "Private Parking" },
                  { icon: Coffee, label: "Backup Generator" },
                  { icon: Tv, label: "DSTV" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-sm border border-border hover:border-[#C9A55A] hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${GOLD}18` }}>
                      <item.icon size={17} style={{ color: GOLD }} />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl img-pan" style={{ aspectRatio: "4/5" }}>
                <img src={PROPERTIES[1].image} alt={PROPERTIES[1].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-2xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: GOLD }}>
                    <Star size={18} className="fill-white text-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-foreground">New Listing</p>
                    <p className="text-muted-foreground text-sm">Be one of our first guests</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 -right-5 bg-card rounded-2xl p-4 shadow-2xl border border-border hidden lg:block">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Starting from</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  KSh {Math.min(...PROPERTIES.map((p) => p.price)).toLocaleString()}
                  <span className="text-sm text-muted-foreground font-normal">/night</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
      <HowItWorks />
      <CancellationPolicy />

      {/* CTA split canvas */}
      <section ref={ctaReveal.ref} className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        <div
          className={`${ctaReveal.visible ? "rev-left" : "opacity-0"} flex flex-col justify-center px-12 py-20 lg:px-16`}
          style={{ backgroundColor: "#111" }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: GOLD }}>
            Direct Booking
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            Ready for Your<br />
            <em style={{ color: GOLD }}>Perfect Escape?</em>
          </h2>
          <p className="text-white/55 leading-relaxed mb-9 max-w-sm">
            Book directly with us for the best rates, guaranteed. No fees, no middlemen — just a real conversation from the first message.
          </p>
          <div className="flex flex-wrap gap-3">
            <GoldBtn onClick={() => navigate("/properties")}>
              Explore Villas <ArrowUpRight size={15} className="inline ml-1" />
            </GoldBtn>
            <button
              onClick={() => navigate("/contact")}
              className="border border-white/25 text-white font-medium px-7 py-4 rounded-full hover:bg-white/8 transition-colors"
            >
              Speak to Us
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden img-pan min-h-[320px]">
          <img src={PROPERTIES[1].image} alt={PROPERTIES[1].name} className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111]/60 to-transparent" />
        </div>
      </section>
    </div>
  )
}
