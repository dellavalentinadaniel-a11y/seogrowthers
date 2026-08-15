import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Lightning, Trophy, TrendUp, ArrowRight, ShieldCheck } from '@phosphor-icons/react';

export default function GrowthPartnerHero() {
  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-br from-[#0B0F19] via-[#0D1527] to-[#120D24] border border-indigo-500/20 p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 lg:gap-14">
        {/* Left Column: Heading & Pillars */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-widest mb-6">
              <Rocket weight="duotone" className="w-4 h-4 text-indigo-400" />
              <span>NUESTRA SOLUCIÓN INSIGNIA</span>
            </div>

            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[1.05]">
              Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">Partner</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white font-bold mb-3 tracking-tight">
              Nuestra solución insignia.
            </p>

            <p className="text-sm sm:text-base text-slate-300 font-light mb-8 leading-relaxed max-w-xl">
              SEO avanzado + pauta inteligente + optimización de conversión + analítica avanzada para <strong className="text-white font-medium">dominación total</strong>.
            </p>
          </div>

          {/* 4 Benefit Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            {[
              { icon: Target, label: "Más tráfico de calidad", color: "text-indigo-400" },
              { icon: Users, label: "Más oportunidades de negocio", color: "text-violet-400" },
              { icon: TrendUp, label: "Más conversiones con menor costo", color: "text-cyan-400" },
              { icon: Trophy, label: "Crecimiento sostenible", color: "text-emerald-400" }
            ].map((b, i) => (
              <div 
                key={i} 
                className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-400/30 transition-all text-center sm:text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <b.icon weight="duotone" className={`w-4 h-4 ${b.color}`} />
                </div>
                <span className="text-[11px] text-slate-200 font-medium leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-Impact Pricing Card matching Stitch & Graphic */}
        <div className="w-full lg:w-[340px] shrink-0">
          <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border-2 border-indigo-400/50 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.2)] text-center flex flex-col justify-between h-full relative">
            {/* Top Badge */}
            <div className="inline-block mx-auto py-1 px-4 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest mb-4">
              NUESTRA SOLUCIÓN INSIGNIA
            </div>

            <div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$850</span>
                <span className="text-sm font-mono text-slate-400">/ mes</span>
              </div>

              <div className="text-indigo-300 text-xs font-bold font-mono uppercase tracking-wider mb-2">
                + inversión publicitaria
              </div>

              <p className="text-[11px] text-slate-400 font-light leading-relaxed mb-6">
                La inversión publicitaria se abona por separado y corresponde al presupuesto destinado a las plataformas de anuncios.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20Plan%20Growth%20Partner"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-500 hover:opacity-95 text-white font-mono text-[11px] font-black uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 group"
              >
                <span>SOLICITAR PLAN</span>
                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#detalles-plan"
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors block"
              >
                VER DESGLOSE COMPLETO ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
