import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { MapPin, Star, Users, Bed, Bath, CheckCircle, ChevronLeft } from "lucide-react"
import { GOLD, GOLD_DARK, PROPERTIES } from "../data/properties"

export default function PropertyDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const p = PROPERTIES.find((x) => x.slug === slug) ?? PROPERTIES[0]
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div className="pt-24 pb-24 page-in">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/properties"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-8 mt-6 transition-colors"
        >
          <ChevronLeft size={15} /> Back to Properties
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full text-white" style={{ backgroundColor: GOLD }}>
                {p.tag}
              </span>
              <span className="text-xs text-muted-foreground font-medium border border-border px-3 py-1.5 rounded-full">{p.type}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{p.name}</h1>
            <div className="flex flex-wrap items-center gap-5 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {p.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={13} className="fill-[#C9A55A] text-[#C9A55A]" />
                <strong className="text-foreground">{p.rating}</strong> · {p.reviews} reviews
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl font-bold text-foreground">KSh {p.price.toLocaleString()}</p>
            <p className="text-muted-foreground text-sm">per night</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-3 rounded-3xl overflow-hidden mb-12" style={{ height: 420 }}>
          <div className="col-span-2 relative bg-muted img-pan overflow-hidden cursor-pointer">
            <img src={p.gallery[activeImg]} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-3">
            {p.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative bg-muted cursor-pointer img-pan overflow-hidden transition-all ${
                  activeImg === i ? "ring-3 ring-[#C9A55A]" : ""
                }`}
              >
                <img src={img} alt={`${p.name} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-8 pb-8 border-b border-border mb-8">
              {[
                { icon: Users, l: `${p.guests} Guests` },
                { icon: Bed, l: `${p.beds} Bedrooms` },
                { icon: Bath, l: `${p.baths} Bathrooms` },
              ].map((item) => (
                <div key={item.l} className="flex items-center gap-2.5">
                  <item.icon size={20} style={{ color: GOLD }} />
                  <span className="font-semibold text-foreground">{item.l}</span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">About this villa</h2>
              <p className="text-muted-foreground leading-relaxed">{p.description}</p>
            </div>

            <div className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {p.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 bg-secondary border border-border rounded-2xl px-4 py-3 hover:border-[#C9A55A] transition-colors"
                  >
                    <CheckCircle size={15} style={{ color: GOLD }} className="shrink-0" />
                    <span className="text-sm font-medium text-foreground">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">Guest Reviews</h2>
              <p className="text-muted-foreground text-sm">
                We're just getting started — be one of our first guests to leave a review.
              </p>
            </div>
          </div>

          <div>
            <div className="sticky top-24 bg-card border border-border rounded-3xl p-7 shadow-xl">
              <div className="mb-5">
                <span className="font-display text-3xl font-bold text-foreground">KSh {p.price.toLocaleString()}</span>
                <span className="text-muted-foreground"> / night</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  {["Check In", "Check Out"].map((label) => (
                    <div key={label} className="border border-border rounded-2xl p-3.5 focus-within:border-[#C9A55A] transition-colors">
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">{label}</p>
                      <input type="date" className="text-sm font-medium text-foreground bg-transparent outline-none w-full" />
                    </div>
                  ))}
                </div>
                <div className="border border-border rounded-2xl p-3.5 focus-within:border-[#C9A55A] transition-colors">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Guests</p>
                  <select className="text-sm font-medium text-foreground bg-transparent outline-none w-full">
                    {Array.from({ length: p.guests }, (_, i) => i + 1).map((n) => (
                      <option key={n}>
                        {n} Guest{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => navigate(`/booking?property=${p.slug}`)}
                className="w-full text-white font-semibold py-4 rounded-2xl transition-colors mb-2"
                style={{ backgroundColor: GOLD }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              >
                Reserve Now
              </button>
              <p className="text-center text-xs text-muted-foreground mt-3">No charge until booking is confirmed by us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
