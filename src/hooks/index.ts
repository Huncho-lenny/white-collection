import { useEffect, useRef, useState } from "react"

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.floor(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, active, duration])
  return val
}
