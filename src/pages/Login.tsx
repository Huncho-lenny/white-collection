import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { supabase } from "../lib/supabase"
import { GOLD, GOLD_DARK } from "../data/properties"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    navigate("/admin", { replace: true })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-2xl font-bold text-white tracking-tight">
            WHITE<span style={{ color: GOLD }}>COLLECTION</span>
          </p>
          <p className="text-white/40 text-sm mt-2">Admin Portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-white/50 block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-[#C9A55A] transition-colors placeholder:text-white/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-white/50 block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-11 text-sm text-white outline-none focus:border-[#C9A55A] transition-colors placeholder:text-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = GOLD_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
