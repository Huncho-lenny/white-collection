import { useState } from "react"
import { Link } from "react-router-dom"
import {
  LayoutDashboard, BookOpen, Building, Settings, ArrowRight, LogOut,
  Menu, MapPin, Star, Edit, Inbox,
} from "lucide-react"
import { GOLD, PROPERTIES } from "../data/properties"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: BookOpen },
  { id: "properties", label: "Properties", icon: Building },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function Admin() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F0EDE8" }}>
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-60"} transition-all duration-300 flex flex-col shrink-0`}
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/8 shrink-0">
          {!collapsed && (
            <span className="font-display text-white text-lg font-bold">
              WHITE<span style={{ color: GOLD }}>COLLECTION</span>
            </span>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white/40 hover:text-white transition-colors ml-auto">
            <Menu size={17} />
          </button>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeNav === item.id ? "text-white shadow-md" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
              style={activeNav === item.id ? { backgroundColor: GOLD } : {}}
            >
              <item.icon size={17} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-white/8 space-y-0.5">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowRight size={17} className="shrink-0 rotate-180" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut size={17} className="shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-display font-semibold text-lg text-foreground capitalize">
              {activeNav === "dashboard" ? "Overview" : activeNav}
            </h1>
            <p className="text-muted-foreground text-xs">
              {new Date().toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: GOLD }}>
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">hello@thewhitecollection.co.ke</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Honest stat cards — real counts, no invented revenue/occupancy */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Active Properties", value: String(PROPERTIES.length), icon: Building },
              { label: "Pending Bookings", value: "0", icon: BookOpen },
              { label: "Confirmed Bookings", value: "0", icon: BookOpen },
              { label: "Total Guests Hosted", value: "0", icon: Star },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>
                  <s.icon size={19} />
                </div>
                <p className="font-display font-bold text-2xl text-foreground">{s.value}</p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bookings — empty state, honest since nothing has launched yet */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-lg text-foreground">Recent Bookings</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Booking requests submitted from the website will appear here</p>
            </div>
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Inbox size={22} className="text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">No bookings yet</p>
              <p className="text-muted-foreground text-sm max-w-sm">
                Once guests submit a booking request from the site, it'll show up here for you to approve or decline.
              </p>
            </div>
          </div>

          {/* Property list */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold text-lg text-foreground">Property Portfolio</h3>
            </div>
            <div className="divide-y divide-border">
              {PROPERTIES.map((p) => (
                <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-secondary shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{p.name}</p>
                    <p className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                      <MapPin size={10} />
                      {p.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="font-bold text-foreground text-sm">KSh {p.price.toLocaleString()}<span className="text-muted-foreground font-normal text-xs">/night</span></p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Active
                    </span>
                    <button className="text-muted-foreground hover:text-[#C9A55A] transition-colors">
                      <Edit size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
