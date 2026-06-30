import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart, MapPin, Star, Users, Bed, Bath } from "lucide-react"
import { useReveal } from "../hooks"
import { GOLD, CHARCOAL, CREAM, type Property } from "../data/properties"

export function PropertyCard({ p, delay = 0 }: { p: Property; delay?: number }) {
  const { ref, visible } = useReveal()
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      ref={ref}
      onClick={() => navigate(`/properties/${p.slug}`)}
      className={`${
        visible ? `rev-scale d${delay}` : "opacity-0"
      } group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer border border-border`}
    >
      <div className="relative overflow-hidden bg-secondary img-pan" style={{ aspectRatio: "4/3" }}>
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {p.tag && (
          <span
            className="absolute top-4 left-4 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full tracking-wide"
            style={{ backgroundColor: GOLD }}
          >
            {p.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setLiked(!liked)
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            liked ? "scale-110" : "hover:scale-110"
          }`}
          style={{ backgroundColor: liked ? "#ef4444" : "rgba(255,255,255,0.92)" }}
        >
          <Heart size={14} className={liked ? "fill-white text-white" : "text-foreground"} />
        </button>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
          <Star size={13} className="fill-[#C9A55A] text-[#C9A55A]" />
          {p.rating}
          <span className="text-white/65 font-normal">({p.reviews})</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-lg text-foreground truncate">{p.name}</h3>
            <p className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
              <MapPin size={12} />
              {p.location}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-xl text-foreground">
              KSh {p.price.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-xs">/night</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
          <span className="flex items-center gap-1.5">
            <Users size={12} />
            {p.guests} guests
          </span>
          <span className="flex items-center gap-1.5">
            <Bed size={12} />
            {p.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={12} />
            {p.baths} baths
          </span>
        </div>
        <button
          onClick={() => navigate(`/properties/${p.slug}`)}
          className="mt-4 w-full text-sm font-semibold py-3 rounded-2xl transition-colors duration-200"
          style={{ backgroundColor: CHARCOAL, color: CREAM }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = GOLD
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = CHARCOAL
          }}
        >
          View Property
        </button>
      </div>
    </div>
  )
}
