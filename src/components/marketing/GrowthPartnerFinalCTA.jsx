import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, MessageCircle, CalendarCheck, ShieldCheck, Zap } from 'lucide-react';

export default function GrowthPartnerFinalCTA() {
  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-br from-[#0B0F19] via-indigo-950/60 to-[#120D24] border border-indigo-500/30 p-8 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Background glow & circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-widest mb-6">
          <Rocket className="w-3.5 h-3.5 text-indigo-400" />
          <span>ESCALABILIDAD SIN TECHO • 2026</span>
        </div>

        <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          ¿Listo para liderar tu industria con <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">Growth Partner?</span>
        </h2>

        <p className="text-sm sm:text-lg text-slate-200 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
          Unificamos pauta digital de alta precisión, SEO técnico y de contenidos, CRO continuo y Business Intelligence para que tu empresa sea la opción indiscutida en Neuquén y en todo el país.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20empezar%20con%20el%20Plan%20Growth%20Partner"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-500 text-white font-mono font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-[0_0_30px_rgba(99,102,241,0.35)] group"
          >
            <MessageCircle className="w-4 h-4" />
            <span>SOLICITAR POR WHATSAPP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#presupuesto-growth"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-mono font-bold text-xs uppercase tracking-widest transition-all"
          >
            <CalendarCheck className="w-4 h-4 text-indigo-400" />
            <span>CALCULAR AUDITORÍA</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
            CONTRATO MENSUAL FLEXIBLE
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400" />
            ONBOARDING EN 7 DÍAS
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Rocket className="w-4 h-4 text-indigo-400" />
            RESULTADOS DESDE EL MES 1
          </span>
        </div>
      </div>
    </div>
  );
}
