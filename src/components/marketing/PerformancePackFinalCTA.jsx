import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, ArrowRight, Users, Sparkles } from 'lucide-react';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

export default function PerformancePackFinalCTA() {
  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/95 via-[#0C1E3D] to-[#070E1E] border border-white/10 p-8 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2ECC71]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10 max-w-5xl mx-auto">
        {/* Left Target Illustration (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-36 h-36 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent border-2 border-cyan-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,219,231,0.2)]"
          >
            {/* Concentric rings */}
            <div className="w-24 h-24 rounded-full border border-cyan-400/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-300/60 flex items-center justify-center">
                <Target className="w-7 h-7 text-cyan-300" />
              </div>
            </div>
            {/* Miniature users */}
            <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-white">
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
          </motion.div>
        </div>

        {/* Center Content & CTA */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
            ¿Listo para generar más <span className="text-[#2ECC71]">oportunidades comerciales?</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg mb-8">
            No se trata solamente de conseguir más visitas. Se trata de atraer a las personas correctas, convertir su interés en una oportunidad y utilizar los datos para <strong className="text-white font-medium">mejorar el rendimiento de tu inversión</strong>.
          </p>

          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20solicitar%20el%20Performance%20Pack%20de%20SEO%20Growthers"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick('performance_pack_final_cta');
              trackCTAClick('performance_pack_final_cta');
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#2ECC71] text-slate-950 font-black text-xs font-mono uppercase tracking-widest hover:bg-[#27C065] transition-all shadow-[0_0_30px_rgba(46,204,113,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Solicitar Performance Pack</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right Growth Graphic (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 items-center justify-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            className="w-36 h-36 rounded-3xl bg-slate-900/80 border border-white/10 p-3.5 flex flex-col justify-between shadow-2xl backdrop-blur"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#2ECC71]">
              <span>GROWTH</span>
              <Sparkles className="w-3 h-3" />
            </div>

            {/* Rising chart */}
            <div className="flex items-end justify-between gap-1.5 h-16">
              <div className="w-4 bg-blue-500/40 rounded-t h-4" />
              <div className="w-4 bg-blue-500/60 rounded-t h-7" />
              <div className="w-4 bg-cyan-400 rounded-t h-11" />
              <div className="w-4 bg-[#2ECC71] rounded-t h-16 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-black text-[#2ECC71]">
                  ▲
                </span>
              </div>
            </div>

            <span className="text-[9px] font-mono text-slate-400 text-center">ROI Maximizado</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
