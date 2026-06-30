import { useState } from "react"
import { useReveal } from "../hooks"
import { GOLD, CHARCOAL, PROPERTIES } from "../data/properties"
import { PropertyCard } from "../components/PropertyCard"

export default function Properties() {
  const types = ["All", ...Array.from(new Set(PROPERTIES.map((p) => p.type)))]
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? PROPERTIES : PROPERTIES.filter((p) => p.type === filter)
  const { ref } = useReveal()

  return (
    <div className="pt-24 pb-24 page-in">
      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-10 mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
            Our Collection
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">All Villas</h1>
            <p className="text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "villa" : "villas"} available
            </p>
          </div>
        </div>

        {types.length > 2 && (
          <div className="flex gap-2 flex-wrap mb-10" ref={ref}>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  filter === t ? "text-white border-transparent shadow-md" : "bg-card text-foreground border-border hover:border-[#C9A55A]"
                }`}
                style={filter === t ? { backgroundColor: CHARCOAL } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <PropertyCard key={p.id} p={p} delay={(i % 3) * 100} />
          ))}
        </div>
      </div>
    </div>
  )
}
