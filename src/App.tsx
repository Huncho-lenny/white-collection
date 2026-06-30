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
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import { AuthProvider, useAuth } from "./lib/auth"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

// Redirects to /login if not authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading) return null // wait for Supabase session restore
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppInner() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const isFullscreen = location.pathname === "/admin" || location.pathname === "/login"

  if (isFullscreen) {
    return (
      <>
        <AnimationStyles />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
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
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all fallback */}
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
