import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function GrowthPartnerInvestmentBanner() {
  return (
    <div className="w-full lg:w-auto shrink-0">
      <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-600/30 to-violet-700/20 border-2 border-indigo-400/50 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.2)] text-center min-w-[260px]">
        <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-widest block mb-2">NUESTRA SOLUCIÓN INSIGNIA</span>
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-5xl sm:text-6xl font-black text-white">$850</span>
          <span className="text-lg text-slate-300 font-light">/ mes</span>
        </div>
        <p className="text-indigo-300 text-xs font-bold mb-2">+ inversión publicitaria</p>
        <p className="text-[10px] text-slate-400 font-light leading-snug max-w-[200px] mx-auto mb-6">
          La inversión publicitaria se abona por separado y corresponde al presupuesto destinado a las plataformas de anuncios.
        </p>
        <a
          href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20plan%20Growth%20Partner"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-mono text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/30"
        >
          COMENZAR AHORA <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
