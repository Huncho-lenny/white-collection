import { Link } from "react-router-dom"
import { GOLD } from "../data/properties"

const FOOTER_COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Explore",
    links: [
      ["All Properties", "/properties"],
      ["White Hill Villa", "/properties/white-hill-villa"],
      ["White Cliff Villa", "/properties/white-cliff-villa"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/"],
      ["How It Works", "/"],
      ["Contact Us", "/contact"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help Centre", "/contact"],
      ["Cancellation Policy", "/contact"],
      ["Contact Us", "/contact"],
    ],
  },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#111111" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-bold mb-4">
              WHITE<span style={{ color: GOLD }}>COLLECTION</span>
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Private villas in Kisumu and Mombasa, booked directly with us — no middleman, no
              booking fees. Curated with care, delivered with excellence.
            </p>
            <div className="flex gap-2">
              {["𝕏", "f", "in", "▶"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-xs text-white/50 cursor-pointer hover:text-white transition-all duration-200"
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = GOLD
                    ;(e.currentTarget as HTMLElement).style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"
                    ;(e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/35">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© {new Date().getFullYear()} The White Collection. All rights reserved.</p>
          <p>Kisumu · Mombasa</p>
        </div>
      </div>
    </footer>
  )
}
