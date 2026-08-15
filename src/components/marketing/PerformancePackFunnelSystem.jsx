import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Monitor,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  ArrowRight,
  TrendingUp,
  MousePointerClick
} from 'lucide-react';

const funnelPipeline = [
  {
    name: "Google Ads + Meta Ads",
    badge: "ATRACCIÓN",
    desc: "Tráfico calificado buscando soluciones activamente.",
    icon: (
      <div className="flex -space-x-1.5 items-center">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 shadow">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FEDA77] via-[#D62976] to-[#4F5BD5] flex items-center justify-center border border-white shadow">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    )
  },
  {
    name: "Landing Page",
    badge: "EXPERIENCIA",
    desc: "Diseñada exclusivamente para convertir visitas en consultas.",
    icon: <Monitor className="w-6 h-6 text-blue-400" />
  },
  {
    name: "Conversión",
    badge: "ACCIÓN",
    desc: "El usuario completa el formulario o escribe por WhatsApp.",
    icon: (
      <div className="relative">
        <Users className="w-6 h-6 text-cyan-300" />
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#2ECC71] rounded-full flex items-center justify-center text-[8px] font-bold text-slate-950">✓</span>
      </div>
    )
  },
  {
    name: "Lead",
    badge: "OPORTUNIDAD",
    desc: "Contacto comercial calificado listo para el cierre de venta.",
    icon: (
      <div className="relative">
        <ShieldCheck className="w-6 h-6 text-[#2ECC71]" />
      </div>
    )
  },
  {
    name: "Análisis",
    badge: "MÉTRICAS",
    desc: "Medición exhaustiva de costo por lead y retorno.",
    icon: <Search className="w-6 h-6 text-yellow-400" />
  },
  {
    name: "Optimización",
    badge: "ESCALADO",
    desc: "Ajuste continuo de pujas, creativos y segmentación.",
    icon: <Rocket className="w-6 h-6 text-purple-400" />
  }
];

export default function PerformancePackFunnelSystem() {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 via-[#0C1B33]/80 to-[#070E1E]/95 border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Funnel Visual with animated glow */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
          <div className="relative w-56 h-64 flex flex-col items-center justify-between p-4">
            {/* Top Platforms floating above funnel */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-2xl shadow-xl border border-white/40 z-20"
            >
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>
              <span className="text-slate-400 font-bold text-xs">+</span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FEDA77] via-[#D62976] to-[#4F5BD5] flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </motion.div>

            {/* Funnel SVG Body */}
            <div className="relative w-48 h-32 flex items-center justify-center my-2">
              <svg viewBox="0 0 160 110" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                <defs>
                  <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A6E" />
                    <stop offset="50%" stopColor="#142E5E" />
                    <stop offset="100%" stopColor="#0B1F44" />
                  </linearGradient>
                </defs>
                {/* Funnel Shape */}
                <path
                  d="M10 10 L150 10 L100 70 L100 105 L60 105 L60 70 Z"
                  fill="url(#funnelGrad)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                <ellipse cx="80" cy="10" rx="70" ry="10" fill="#2A4B8D" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              </svg>

              {/* Animated Arrow falling through */}
              <motion.div
                animate={{ y: [-15, 25], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="absolute text-cyan-400 font-bold text-lg pointer-events-none"
              >
                ↓
              </motion.div>
            </div>

            {/* Qualified Leads resulting at bottom */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="flex items-center gap-2 bg-[#2ECC71]/15 border border-[#2ECC71]/40 px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(46,204,113,0.3)]"
            >
              <Users className="w-4 h-4 text-[#2ECC71]" />
              <span className="text-[11px] font-mono font-black text-white uppercase tracking-wider">
                LEADS CALIFICADOS
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Step-by-Step Flowchart Pipeline */}
        <div className="lg:col-span-8">
          <h2 className="font-headline text-2xl sm:text-3xl font-black text-white mb-6">
            Un sistema pensado para generar <span className="text-[#2ECC71]">oportunidades</span>
          </h2>

          {/* Pipeline Icons Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {funnelPipeline.map((item, idx) => {
              const isHovered = hoveredStep === idx;
              return (
                <div key={idx} className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                      isHovered ? "bg-white/[0.1] border-[#2ECC71]/50 shadow-[0_0_20px_rgba(46,204,113,0.2)]" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center mb-2.5 shadow-inner">
                      {item.icon}
                    </div>
                    <span className="font-headline text-[11px] font-bold text-white leading-tight min-h-[28px] flex items-center justify-center">
                      {item.name}
                    </span>
                  </motion.div>

                  {/* Connecting Arrow between pipeline boxes */}
                  {idx < funnelPipeline.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-500 text-xs">
                      ➔
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Clarifying Strategy Description Box */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 leading-relaxed text-xs sm:text-sm text-slate-300 font-light">
            <p>
              No trabajamos únicamente sobre la visibilidad de tu marca. <strong className="text-white font-semibold">Trabajamos para construir</strong> un proceso que permita atraer personas, generar contactos y aprender de los resultados para mejorar progresivamente la adquisición de clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
