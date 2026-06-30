import { useState } from "react"
import type { ReactNode } from "react"
import { useReveal, useCounter } from "../hooks"
import { GOLD, GOLD_DARK, CHARCOAL } from "../data/properties"

export function GoldBtn({
  children,
  onClick,
  className = "",
  small = false,
  type = "button",
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  small?: boolean
  type?: "button" | "submit"
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`font-medium text-white transition-all duration-200 ${
        small ? "text-sm px-5 py-2.5" : "px-7 py-4"
      } rounded-full ${className}`}
      style={{ backgroundColor: hover ? GOLD_DARK : GOLD }}
    >
      {children}
    </button>
  )
}

export function DarkBtn({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`font-medium text-white transition-all duration-200 px-7 py-4 rounded-full ${className}`}
      style={{ backgroundColor: hover ? "#2e2e2e" : CHARCOAL }}
    >
      {children}
    </button>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    cancelled: "bg-red-50 text-red-700 border border-red-200",
  }
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
        map[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
  center = true,
}: {
  eyebrow: string
  title: ReactNode
  sub?: string
  light?: boolean
  center?: boolean
}) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`${center ? "text-center" : ""} mb-14`}>
      <p
        className={`${visible ? "rev-up d0" : "opacity-0"} text-xs font-semibold tracking-[0.3em] uppercase mb-3`}
        style={{ color: GOLD }}
      >
        {eyebrow}
      </p>
      <h2
        className={`${visible ? "rev-up d100" : "opacity-0"} font-display text-4xl md:text-5xl font-semibold leading-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`${visible ? "rev-up d200" : "opacity-0"} mt-4 max-w-2xl ${
            center ? "mx-auto" : ""
          } leading-relaxed ${light ? "text-white/55" : "text-muted-foreground"}`}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

export function StatCounter({
  value,
  suffix,
  label,
  active,
}: {
  value: number
  suffix: string
  label: string
  active: boolean
}) {
  const count = useCounter(value, active)
  return (
    <div className="text-center py-7">
      <p className="font-display text-4xl font-bold" style={{ color: GOLD }}>
        {count}
        {suffix}
      </p>
      <p className="text-white/45 text-sm mt-1.5 tracking-wide">{label}</p>
    </div>
  )
}
