import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimationStyles } from "./components/AnimationStyles"
import { Nav } from "./components/Nav"
import { Footer } from "./components/Footer"
import Home from "./pages/Home"
import Properties from "./pages/Properties"
import PropertyDetail from "./pages/PropertyDetail"
import Booking from "./pages/Booking"
import Contact from "./pages/Contact"
import Admin from "./pages/Admin"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  if (location.pathname === "/admin") {
    return (
      <>
        <AnimationStyles />
        <Admin />
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
        </Routes>
        <Footer />
      </div>
    </>
  )
}
