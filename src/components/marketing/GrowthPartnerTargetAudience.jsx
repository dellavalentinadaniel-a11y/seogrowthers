import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, RefreshCw, Target, ShieldCheck } from 'lucide-react';

const targetPillars = [
  { icon: Users, label: "Más leads calificados", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { icon: DollarSign, label: "Menor costo de adquisición", color: "text-[#2ECC71]", bg: "bg-[#2ECC71]/10 border-[#2ECC71]/20" },
  { icon: TrendingUp, label: "Más conversión y ventas", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: RefreshCw, label: "Crecimiento sostenible", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" }
];

export default function GrowthPartnerTargetAudience() {
  return (
    <section className="w-full rounded-[2.5rem] bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-violet-950/50 border border-indigo-500/20 p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        {/* Left text */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center">
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-mono text-xs text-indigo-300 font-bold uppercase tracking-widest">
              PERFIL DE CLIENTE IDEAL
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-snug">
            ¿PARA QUIÉN ES <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">GROWTH PARTNER?</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Para empresas y profesionales que quieren crecer en serio: generar oportunidades de manera constante, construir posicionamiento orgánico, mejorar conversiones y tomar decisiones estratégicas basadas en datos reales.
          </p>
        </div>

        {/* Right 4 benefit cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {targetPillars.map((b, i) => {
            const BIcon = b.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl ${b.bg} border backdrop-blur-md text-center min-w-[130px] transition-all`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-2.5 shadow-inner">
                  <BIcon className={`w-5 h-5 ${b.color}`} />
                </div>
                <span className="text-xs font-mono font-bold text-white leading-tight">
                  {b.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
