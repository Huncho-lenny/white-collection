import { GOLD } from "../data/properties"

export function AnimationStyles() {
  return (
    <style>{`
      @keyframes heroUp {
        from { opacity: 0; transform: translateY(50px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes heroBadge {
        from { opacity: 0; transform: translateY(-12px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes revealUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes revealLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes revealRight {
        from { opacity: 0; transform: translateX(30px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes revealScale {
        from { opacity: 0; transform: scale(0.94); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes pageEnter {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulse-gold {
        0%, 100% { box-shadow: 0 0 0 0 rgba(201,165,90,0.4); }
        50%       { box-shadow: 0 0 0 8px rgba(201,165,90,0); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-6px); }
      }
      @keyframes lineGrow {
        from { width: 0; }
        to   { width: 100%; }
      }

      .hero-badge    { animation: heroBadge 0.7s cubic-bezier(0.16,1,0.3,1) both 0.2s; }
      .hero-title    { animation: heroUp   0.9s cubic-bezier(0.16,1,0.3,1) both 0.35s; }
      .hero-sub      { animation: heroUp   0.9s cubic-bezier(0.16,1,0.3,1) both 0.5s; }
      .hero-search   { animation: heroUp   0.9s cubic-bezier(0.16,1,0.3,1) both 0.65s; }

      .rev-up    { animation: revealUp    0.75s cubic-bezier(0.16,1,0.3,1) both; }
      .rev-left  { animation: revealLeft  0.75s cubic-bezier(0.16,1,0.3,1) both; }
      .rev-right { animation: revealRight 0.75s cubic-bezier(0.16,1,0.3,1) both; }
      .rev-scale { animation: revealScale 0.75s cubic-bezier(0.16,1,0.3,1) both; }
      .page-in   { animation: pageEnter   0.5s cubic-bezier(0.16,1,0.3,1) both; }

      .d0   { animation-delay: 0ms; }
      .d100 { animation-delay: 100ms; }
      .d150 { animation-delay: 150ms; }
      .d200 { animation-delay: 200ms; }
      .d250 { animation-delay: 250ms; }
      .d300 { animation-delay: 300ms; }
      .d400 { animation-delay: 400ms; }
      .d500 { animation-delay: 500ms; }
      .d600 { animation-delay: 600ms; }

      .img-pan img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
      .img-pan:hover img { transform: scale(1.07); }

      .gold-link { position: relative; display: inline-block; }
      .gold-link::after {
        content: '';
        position: absolute;
        bottom: -1px; left: 0;
        width: 0; height: 1px;
        background: ${GOLD};
        transition: width 0.3s ease;
      }
      .gold-link:hover::after { width: 100%; }

      .glass-search {
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }

      /* Thin elegant scrollbar */
      * { scrollbar-width: thin; scrollbar-color: rgba(201,165,90,0.25) transparent; }
      *::-webkit-scrollbar { width: 4px; }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb { background: rgba(201,165,90,0.3); border-radius: 99px; }

      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(0.4) sepia(0.5) saturate(1.5) hue-rotate(5deg);
        cursor: pointer;
      }

      .float-card { animation: float 4s ease-in-out infinite; }
    `}</style>
  )
}
