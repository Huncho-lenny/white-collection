import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  LayoutDashboard, BookOpen, Building, Settings, ArrowRight, LogOut,
  Menu, MapPin, Edit, Inbox, Loader2, CheckCircle, XCircle, Clock,
  RefreshCw, Star,
} from "lucide-react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../lib/auth"
import type { DbBooking, DbProperty } from "../lib/supabase"
import { GOLD } from "../data/properties"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings",  label: "Bookings",  icon: BookOpen },
  { id: "properties",label: "Properties",icon: Building },
  { id: "settings",  label: "Settings",  icon: Settings },
]

const STATUS_STYLES: Record<DbBooking["status"], string> = {
  pending:   "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined:  "bg-red-50 text-red-700 border-red-200",
}

const STATUS_ICONS: Record<DbBooking["status"], React.ElementType> = {
  pending:   Clock,
  confirmed: CheckCircle,
  declined:  XCircle,
}

function StatusBadge({ status }: { status: DbBooking["status"] }) {
  const Icon = STATUS_ICONS[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLES[status]}`}>
      <Icon size={11} />
      {status}
    </span>
  )
}

export default function Admin() {
  const { user, signOut } = useAuth()
  const [activeNav, setActiveNav] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)

  const [properties, setProperties] = useState<DbProperty[]>([])
  const [bookings,   setBookings]   = useState<DbBooking[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [updatingId,  setUpdatingId]  = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoadingData(true)
    setError(null)
    const [propsRes, bookRes] = await Promise.all([
      supabase.from("properties").select("*").order("created_at"),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
    ])
    if (propsRes.error) setError(propsRes.error.message)
    else setProperties(propsRes.data ?? [])
    if (bookRes.error) setError(bookRes.error.message)
    else setBookings(bookRes.data ?? [])
    setLoadingData(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const updateStatus = async (id: string, status: DbBooking["status"]) => {
    setUpdatingId(id)
    const { error: err } = await supabase.from("bookings").update({ status }).eq("id", id)
    if (err) setError(err.message)
    else setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    setUpdatingId(null)
  }

  const pendingCount   = bookings.filter((b) => b.status === "pending").length
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length

  const stats = [
    { label: "Active Properties",  value: String(properties.length), icon: Building },
    { label: "Pending Bookings",   value: String(pendingCount),       icon: Clock },
    { label: "Confirmed Bookings", value: String(confirmedCount),     icon: CheckCircle },
    { label: "Total Bookings",     value: String(bookings.length),    icon: Star },
  ]

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
          <button onClick={() => setCollapsed((c) => !c)} className="text-white/40 hover:text-white transition-colors ml-auto">
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
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={17} className="shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
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
          <div className="flex items-center gap-3">
            <button onClick={fetchData} disabled={loadingData} title="Refresh" className="text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw size={16} className={loadingData ? "animate-spin" : ""} />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: GOLD }}>
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user?.email}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-3 text-sm">{error}</div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>
                  <s.icon size={19} />
                </div>
                {loadingData
                  ? <div className="h-8 w-10 bg-border rounded animate-pulse mb-1" />
                  : <p className="font-display font-bold text-2xl text-foreground">{s.value}</p>
                }
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bookings table */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground">Booking Requests</h3>
                <p className="text-muted-foreground text-xs mt-0.5">Approve or decline requests submitted from the website</p>
              </div>
              {pendingCount > 0 && (
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                  {pendingCount} pending
                </span>
              )}
            </div>

            {loadingData ? (
              <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">Loading bookings…</span>
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Inbox size={22} className="text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground mb-1">No bookings yet</p>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Once guests submit a booking request from the site, it'll appear here for you to approve or decline.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/40">
                      {["Guest", "Villa", "Dates", "Total", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookings.map((b) => {
                      const prop = properties.find((p) => p.id === b.property_id)
                      return (
                        <tr key={b.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-semibold text-foreground">{b.guest_name}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">{b.guest_email}</p>
                            <p className="text-muted-foreground text-xs">{b.guest_phone}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-medium text-foreground">{prop?.title ?? "—"}</p>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <p className="text-foreground">{b.check_in_date}</p>
                            <p className="text-muted-foreground text-xs">→ {b.check_out_date}</p>
                          </td>
                          <td className="px-5 py-4 font-semibold text-foreground whitespace-nowrap">
                            KSh {b.total_price.toLocaleString()}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={b.status} />
                          </td>
                          <td className="px-5 py-4">
                            {b.status === "pending" ? (
                              <div className="flex items-center gap-2">
                                <button
                                  disabled={updatingId === b.id}
                                  onClick={() => updateStatus(b.id, "confirmed")}
                                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                >
                                  {updatingId === b.id ? <Loader2 size={11} className="animate-spin" /> : <CheckCircle size={11} />}
                                  Approve
                                </button>
                                <button
                                  disabled={updatingId === b.id}
                                  onClick={() => updateStatus(b.id, "declined")}
                                  className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"
                                >
                                  {updatingId === b.id ? <Loader2 size={11} className="animate-spin" /> : <XCircle size={11} />}
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground italic">No action needed</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Properties */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-lg text-foreground">Property Portfolio</h3>
            </div>
            {loadingData ? (
              <div className="flex items-center justify-center py-10 gap-3 text-muted-foreground">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm">Loading properties…</span>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {properties.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-secondary shrink-0">
                      <img src={p.image_urls[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{p.title}</p>
                      <p className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                        <MapPin size={10} />{p.location}
                      </p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="font-bold text-foreground text-sm">
                        KSh {p.price_per_night.toLocaleString()}
                        <span className="text-muted-foreground font-normal text-xs">/night</span>
                      </p>
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
