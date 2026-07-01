import { useEffect, useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { AnimationStyles } from "./components/AnimationStyles"
import { Nav } from "./components/Nav"
import { Footer } from "./components/Footer"
import Home from "./pages/Home"
import Properties from "./pages/Properties"
import PropertyDetail from "./pages/PropertyDetail"
import Booking from "./pages/Booking"
import Contact from "./pages/Contact"
import Account from "./pages/Account"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AuthCallback from "./pages/AuthCallback"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import { AuthProvider, useAuth } from "./lib/auth"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { session, profile, loading } = useAuth()
  const location = useLocation()
  if (loading) return null
  if (!session) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (requireAdmin && profile?.role !== "admin") return <Navigate to="/account" replace />
  return <>{children}</>
}

const FULLSCREEN_PATHS = ["/admin", "/login", "/signup", "/auth/callback"]

function AppInner() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const isFullscreen = FULLSCREEN_PATHS.some((p) => location.pathname.startsWith(p))

  if (isFullscreen) {
    return (
      <>
        <AnimationStyles />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    )
  }

  return (
    <>
      <AnimationStyles />
      <ScrollToTop />
      <div className="min-h-screen bg-background">
        <Nav scrolled={scrolled} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
