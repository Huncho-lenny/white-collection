import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { supabase } from "../lib/supabase"
import { GOLD } from "../data/properties"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Supabase puts the session tokens in the URL hash after OAuth redirect.
    // getSession() will automatically exchange them and establish the session.
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        // No session — something went wrong, send back to login
        navigate("/login", { replace: true })
        return
      }

      // Fetch the user's role directly — don't rely on context timing
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single()

      if (profile?.role === "admin") {
        navigate("/admin", { replace: true })
      } else {
        navigate("/account", { replace: true })
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={28} className="animate-spin" style={{ color: GOLD }} />
        <p className="text-white/50 text-sm">Signing you in…</p>
      </div>
    </div>
  )
}
