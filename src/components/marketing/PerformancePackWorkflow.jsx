import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Target,
  Settings,
  Rocket,
  BarChart3,
  ClipboardCheck,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const workflowSteps = [
  {
    number: "01",
    title: "Analizamos tu negocio",
    desc: "Entendemos qué vendés, a quién le vendés, tu propuesta de valor y el objetivo comercial que querés alcanzar.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "rgba(59,130,246,0.3)"
  },
  {
    number: "02",
    title: "Definimos la estrategia",
    desc: "Determinamos qué canales utilizar, qué campañas desarrollar y cuál será el recorrido del usuario.",
    icon: Target,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    glow: "rgba(236,72,153,0.3)"
  },
  {
    number: "03",
    title: "Construimos el sistema de captación",
    desc: "Configuramos las campañas y desarrollamos la Landing Page incluida en el pack.",
    icon: Settings,
    color: "text-[#2ECC71]",
    bg: "bg-[#2ECC71]/10",
    border: "border-[#2ECC71]/30",
    glow: "rgba(46,204,113,0.3)"
  },
  {
    number: "04",
    title: "Lanzamos las campañas",
    desc: "Ponemos las campañas en funcionamiento con el presupuesto publicitario definido para cada plataforma.",
    icon: Rocket,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "rgba(6,182,212,0.3)"
  },
  {
    number: "05",
    title: "Medimos y optimizamos",
    desc: "Analizamos los datos para identificar qué campañas, anuncios, públicos y mensajes generan mejores oportunidades.",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    glow: "rgba(168,85,247,0.3)"
  },
  {
    number: "06",
    title: "Reportamos y ajustamos",
    desc: "Cada mes revisamos los resultados y planteamos oportunidades de mejora para continuar optimizando el rendimiento.",
    icon: ClipboardCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "rgba(16,185,129,0.3)"
  }
];

export default function PerformancePackWorkflow() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 to-[#070E1E]/95 border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ¿Cómo funciona?
        </h2>
      </div>

      {/* Horizontal workflow timeline for desktop / grid for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
        {workflowSteps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;

          return (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className={`relative flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -translate-y-2 border border-white/20"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/5"
                }`}
              >
                {/* Icon in Rounded Box */}
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-4 transition-all duration-300 shadow-lg`}
                  style={{
                    boxShadow: isSelected ? `0 0 25px ${step.glow}` : "none"
                  }}
                >
                  <Icon className={`w-7 h-7 ${step.color}`} />
                </div>

                {/* Step Number */}
                <div className={`font-mono text-base font-black mb-1.5 ${step.color}`}>
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="font-headline text-sm font-bold text-white mb-2 leading-snug min-h-[36px]">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {step.desc}
                </p>

                {/* Mobile Next Indicator */}
                {idx < workflowSteps.length - 1 && (
                  <div className="lg:hidden mt-4 text-slate-600">
                    ↓
                  </div>
                )}
              </motion.div>

              {/* Dotted Arrow between steps (Desktop only) */}
              {idx < workflowSteps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center absolute"
                  style={{
                    left: `calc(${(idx + 1) * (100 / 6)}% - 16px)`,
                    top: '38px',
                    width: '32px',
                    zIndex: 20
                  }}
                >
                  <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                    <line
                      x1="0"
                      y1="5"
                      x2="22"
                      y2="5"
                      stroke="#94A3B8"
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <path
                      d="M22 2 L26 5 L22 8"
                      stroke="#94A3B8"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
