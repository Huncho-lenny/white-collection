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
      const hashParams = new URLSearchParams(window.location.hash.replace("#", "?"))

      const code = params.get("code")
      const accessToken = hashParams.get("access_token")
      const errorParam = params.get("error")
      const errorDescription = params.get("error_description")

      console.log("[AuthCallback] URL search:", window.location.search)
      console.log("[AuthCallback] URL hash:", window.location.hash)
      console.log("[AuthCallback] code:", code)
      console.log("[AuthCallback] access_token in hash:", accessToken)

      // Surface any OAuth-level errors from the provider
      if (errorParam) {
        console.error("[AuthCallback] OAuth error:", errorParam, errorDescription)
        navigate("/login", { replace: true })
        return
      }

      let session = null

      if (code) {
        // PKCE flow — exchange the code for a session
        console.log("[AuthCallback] PKCE flow detected, exchanging code…")
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        console.log("[AuthCallback] exchangeCodeForSession result:", { data, error })
        if (error || !data.session) {
          console.error("[AuthCallback] Code exchange failed:", error?.message)
          navigate("/login", { replace: true })
          return
        }
        session = data.session
      } else {
        // Implicit flow fallback — session may already be in storage
        console.log("[AuthCallback] No code param, trying getSession()…")
        const { data, error } = await supabase.auth.getSession()
        console.log("[AuthCallback] getSession result:", { data, error })
        if (error || !data.session) {
          console.error("[AuthCallback] No session found:", error?.message)
          navigate("/login", { replace: true })
          return
        }
        session = data.session
      }

      // Fetch role and route accordingly
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      console.log("[AuthCallback] profile fetch:", { profile, profileError })

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
