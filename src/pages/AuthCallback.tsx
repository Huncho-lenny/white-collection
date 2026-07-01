import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { supabase } from "../lib/supabase"
import { GOLD } from "../data/properties"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handle = async () => {
      const params = new URLSearchParams(window.location.search)
      const errorParam = params.get("error")
      const errorDescription = params.get("error_description")
      const code = params.get("code")

      // OAuth provider returned an error (e.g. user cancelled)
      if (errorParam) {
        console.error("[AuthCallback] OAuth error:", errorParam, errorDescription)
        navigate("/login", { replace: true })
        return
      }

      if (code) {
        // PKCE flow: exchange the one-time code for a session.
        // detectSessionInUrl is false on the client so nothing else has
        // touched the verifier in localStorage — this is the only call.
        console.log("[AuthCallback] exchanging code, supabase URL:", import.meta.env.VITE_SUPABASE_URL)
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error || !data.session) {
          console.error("[AuthCallback] exchangeCodeForSession failed:", error?.message)
          navigate("/login", { replace: true })
          return
        }
        await routeByRole(data.session.user.id)
        return
      }

      // Implicit flow fallback (no ?code= in URL)
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        console.error("[AuthCallback] No session found:", error?.message)
        navigate("/login", { replace: true })
        return
      }
      await routeByRole(data.session.user.id)
    }

    const routeByRole = async (userId: string) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single()
      if (profile?.role === "admin") {
        navigate("/admin", { replace: true })
      } else {
        navigate("/account", { replace: true })
      }
    }

    handle()
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
