import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "../lib/auth"
import { GOLD } from "../data/properties"

export default function AuthCallback() {
  const { profile, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (profile?.role === "admin") navigate("/admin", { replace: true })
    else navigate("/account", { replace: true })
  }, [loading, profile, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={28} className="animate-spin" style={{ color: GOLD }} />
        <p className="text-white/50 text-sm">Signing you in…</p>
      </div>
    </div>
  )
}
