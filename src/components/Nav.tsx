import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { GoldBtn } from "./ui-elements"
import { GOLD } from "../data/properties"

const NAV_LINKS: [string, string][] = [
  ["Home", "/"],
  ["Properties", "/properties"],
  ["Contact", "/contact"],
]

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const transparent = location.pathname === "/" && !scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent ? "" : "bg-white/96 backdrop-blur-xl shadow-sm border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-xl font-bold tracking-wider transition-colors ${
            transparent ? "text-white" : "text-foreground"
          }`}
        >
          WHITE<span style={{ color: GOLD }}>COLLECTION</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className={`text-sm font-medium transition-colors gold-link ${
                transparent
                  ? location.pathname === href
                    ? "text-[#C9A55A]"
                    : "text-white/85 hover:text-white"
                  : location.pathname === href
                  ? "text-[#C9A55A]"
                  : "text-foreground hover:text-[#C9A55A]"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/admin"
            className={`text-sm font-medium transition-colors ${
              transparent ? "text-white/50 hover:text-white/80" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Admin
          </Link>
          <GoldBtn small onClick={() => navigate("/booking")}>
            Book Now
          </GoldBtn>
        </div>

        <button
          className={`md:hidden ${transparent ? "text-white" : "text-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-5 space-y-3">
          {[...NAV_LINKS, ["Admin", "/admin"]].map(([label, href]) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left text-sm font-medium text-foreground hover:text-[#C9A55A] transition-colors py-1"
            >
              {label}
            </Link>
          ))}
          <GoldBtn
            small
            onClick={() => {
              navigate("/booking")
              setMobileOpen(false)
            }}
          >
            Book Now
          </GoldBtn>
        </div>
      )}
    </nav>
  )
}
