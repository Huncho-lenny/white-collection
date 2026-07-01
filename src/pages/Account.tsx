import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, User, Calendar, Heart, Settings, MapPin, Loader2 } from "lucide-react"
import { useAuth } from "../lib/auth"
import { supabase } from "../lib/supabase"
import type { DbBooking } from "../lib/supabase"
import { GOLD } from "../data/properties"

const STATUS_STYLES: Record<DbBooking["status"], string> = {
  pending:   "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined:  "bg-red-50 text-red-700 border-red-200",
}

export default function Account() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [bookings, setBookings] = useState<DbBooking[]>([])
  const [bookingsLoading, setBookingsLoading] = useState(false)

  useEffect(() => {
    if (activeTab !== "bookings" || !user) return
    setBookingsLoading(true)
    supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setBookings((data as DbBooking[]) ?? [])
        setBookingsLoading(false)
      })
  }, [activeTab, user])

  if (!user) {
    return (
      <div className="pt-24 pb-24 min-h-screen page-in">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-8">You need to be logged in to view your account.</p>
          <button
            onClick={() => navigate("/login")}
            className="text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors"
            style={{ backgroundColor: GOLD }}
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "saved", label: "Saved Properties", icon: Heart },
    { id: "settings", label: "Account Settings", icon: Settings },
  ]

  return (
    <div className="pt-24 pb-24 min-h-screen page-in">
      <div className="max-w-5xl mx-auto px-6">
        <div className="pt-10 mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
            My Account
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Welcome, {user.email?.split("@")[0] || "User"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-3xl p-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-[#C9A55A] text-white"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-3xl p-8">
              {activeTab === "profile" && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">User ID</label>
                      <p className="text-muted-foreground font-mono text-xs">{user.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">Account Created</label>
                      <p className="text-muted-foreground">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "bookings" && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">My Bookings</h2>
                  {bookingsLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Loading…</span>
                    </div>
                  ) : bookings.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No bookings yet. <button onClick={() => navigate("/properties")} className="underline hover:text-foreground transition-colors">Browse villas</button></p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((b) => (
                        <div key={b.id} className="border border-border rounded-2xl p-5">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <p className="font-semibold text-foreground">{b.check_in_date} → {b.check_out_date}</p>
                              <p className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                                <MapPin size={10} /> {b.guest_name}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-foreground">KSh {b.total_price.toLocaleString()}</p>
                              <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[b.status]}`}>
                                {b.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "saved" && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Saved Properties</h2>
                  <p className="text-muted-foreground">You haven't saved any properties yet.</p>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Account Settings</h2>
                  <p className="text-muted-foreground">Account settings coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}