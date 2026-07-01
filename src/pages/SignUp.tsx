import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2, Mail } from "lucide-react"
import { useAuth } from "../lib/auth"
import { GOLD, GOLD_DARK } from "../data/properties"

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp, signInWithGoogle } = useAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkEmail, setCheckEmail] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setError("Password must be at least 6 characters."); return }
    setLoading(true)
    setError(null)
    const { error: err, confirmedImmediately } = await signUp(email, password, fullName)
    if (err) { setError(err); setLoading(false); return }
    if (confirmedImmediately) navigate("/account", { replace: true })
    else setCheckEmail(true)
    setLoading(false)
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    const { error: err } = await signInWithGoogle()
    if (err) { setError(err); setGoogleLoading(false) }
  }

  if (checkEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#0d0d0d" }}>
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} style={{ color: GOLD }} />
          </div>
          <p className="font-display text-2xl font-bold text-white mb-3">Check your email</p>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            We sent a confirmation link to <span className="text-white font-medium">{email}</span>. Click it to activate your account.
          </p>
          <Link to="/login" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: GOLD }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-2xl font-bold text-white tracking-tight">
            WHITE<span style={{ color: GOLD }}>COLLECTION</span>
          </p>
          <p className="text-white/40 text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50 block mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Mwangi"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-[#C9A55A] transition-colors placeholder:text-white/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50 block mb-2">Email</label>
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
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50 block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
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
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ backgroundColor: GOLD }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = GOLD_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:text-white transition-colors" style={{ color: GOLD }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
