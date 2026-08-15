import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function GrowthPartnerFunnelSystem() {
  return (
    <section className="w-full rounded-[2.5rem] bg-slate-900/60 border border-white/10 p-6 sm:p-10 lg:p-14 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SISTEMA COMPARATIVO DE ADQUISICIÓN</span>
        </div>
        <h2 className="font-headline text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          UN SISTEMA DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">CRECIMIENTO</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light">
          Mirá cómo evoluciona la arquitectura de captación entre el Performance Pack básico y el Growth Partner integral.
        </p>
      </div>

      <div className="space-y-8 relative z-10 max-w-5xl mx-auto">
        {/* Row 1: Performance Pack Flow */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest">
              1. PERFORMANCE PACK (Captación Inmediata)
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
              $450 / mes
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
            {[
              { label: "Ads (Google + Meta)", color: "border-blue-400/40 text-blue-300 bg-blue-500/10" },
              { label: "Landing Page", color: "border-purple-400/40 text-purple-300 bg-purple-500/10" },
              { label: "Conversión", color: "border-amber-400/40 text-amber-300 bg-amber-500/10" },
              { label: "Lead", color: "border-emerald-400/40 text-emerald-300 bg-emerald-500/10" },
              { label: "Análisis", color: "border-cyan-400/40 text-cyan-300 bg-cyan-500/10" }
            ].map((node, i) => (
              <React.Fragment key={i}>
                <div className={`px-4 py-2.5 rounded-xl border ${node.color} text-xs font-mono font-bold text-center shadow-sm`}>
                  {node.label}
                </div>
                {i < 4 && <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: Growth Partner Flow (Featured) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-violet-950/30 border-2 border-indigo-400/50 shadow-[0_0_35px_rgba(99,102,241,0.15)] relative">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              2. GROWTH PARTNER (Ecosistema Dual Completo)
            </span>
            <span className="text-[10px] font-mono text-indigo-200 font-bold bg-indigo-500/20 border border-indigo-400/40 px-3 py-0.5 rounded-full">
              $850 / mes
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3">
            {[
              { label: "Ads (Google + Meta)", color: "border-blue-400/60 text-blue-300 bg-blue-500/15" },
              { label: "SEO Orgánico", color: "border-[#2ECC71]/60 text-[#2ECC71] bg-[#2ECC71]/15" },
              { label: "2 Landing Pages", color: "border-purple-400/60 text-purple-300 bg-purple-500/15" },
              { label: "Conversión", color: "border-amber-400/60 text-amber-300 bg-amber-500/15" },
              { label: "Analytics GA4", color: "border-cyan-400/60 text-cyan-300 bg-cyan-500/15" },
              { label: "CRO (A/B)", color: "border-pink-400/60 text-pink-300 bg-pink-500/15" },
              { label: "Optimización", color: "border-emerald-400/60 text-emerald-300 bg-emerald-500/15" }
            ].map((node, i) => (
              <React.Fragment key={i}>
                <div className={`px-4 py-2.5 rounded-xl border ${node.color} text-xs font-mono font-bold text-center shadow-md`}>
                  {node.label}
                </div>
                {i < 6 && <ChevronRight className="w-4 h-4 text-indigo-400/60 shrink-0" />}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-indigo-400/20 text-center">
            <p className="text-xs sm:text-sm font-light text-slate-200">
              <strong className="text-white font-bold">Combinamos adquisición paga, orgánica, conversión y analítica</strong> para lograr crecimiento sostenido y reducir el costo por adquisición (CAC) con el tiempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
