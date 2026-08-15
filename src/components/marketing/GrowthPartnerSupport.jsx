import React from 'react';
import { motion } from 'framer-motion';
import { Lightning, Users, ChatTeardropText, Star, Headset } from '@phosphor-icons/react';

const supportItems = [
  { icon: Lightning, label: "Respuesta prioritaria", color: "text-amber-400" },
  { icon: Users, label: "Seguimiento estratégico", color: "text-indigo-400" },
  { icon: ChatTeardropText, label: "Comunicación constante", color: "text-cyan-400" },
  { icon: Star, label: "Acciones priorizadas", color: "text-[#2ECC71]" }
];

export default function GrowthPartnerSupport() {
  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-indigo-500/20 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left info */}
        <div className="flex items-start gap-4 max-w-xl">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center shrink-0 shadow-lg">
            <Headset weight="duotone" className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white font-mono text-[10px] font-black flex items-center justify-center">7</span>
              <span className="font-mono text-xs text-indigo-300 font-bold uppercase tracking-widest">
                SOPORTE PRIORITARIO
              </span>
            </div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-2">
              Atención prioritaria y seguimiento estratégico
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Atención prioritaria, seguimiento estratégico y coordinación ágil para implementar mejoras y aprovechar oportunidades de crecimiento en tu mercado.
            </p>
          </div>
        </div>

        {/* Right 4 badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {supportItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 transition-all text-center min-w-[110px]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-2">
                <item.icon weight="duotone" className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[11px] font-mono font-bold text-white leading-tight">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
