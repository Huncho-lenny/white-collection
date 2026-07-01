import { Link, useNavigate } from "react-router-dom"
import { GOLD } from "../data/properties"

// Scrolls to a hash anchor on the home page, navigating there first if needed
function useAnchorNav() {
  const navigate = useNavigate()
  return (hash: string) => {
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate(`/#${hash}`)
    }
  }
}

export function Footer() {
  const scrollTo = useAnchorNav()

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

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/35">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/properties" className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/properties/white-hill-villa" className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link">
                  White Hill Villa
                </Link>
              </li>
              <li>
                <Link to="/properties/white-cliff-villa" className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link">
                  White Cliff Villa
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/35">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/35">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link">
                  Help Centre
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("cancellation-policy")}
                  className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link text-left"
                >
                  Cancellation Policy
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/50 hover:text-[#C9A55A] transition-colors gold-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© {new Date().getFullYear()} The White Collection. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/50 transition-colors">Terms &amp; Conditions</Link>
            <p>Kisumu · Mombasa</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
