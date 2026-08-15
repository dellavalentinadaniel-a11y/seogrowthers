import React from 'react';
import { motion } from 'framer-motion';
import {
  Info,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const inclusionsCol1 = [
  { text: "Gestión de Google Ads", icon: "G" },
  { text: "Gestión de Meta Ads", icon: "M" },
  { text: "Campañas enfocadas en generación de leads", icon: "⚡" },
  { text: "1 Landing Page High-Conversion", icon: "💻" }
];

const inclusionsCol2 = [
  { text: "Optimización de campañas", icon: "⚙️" },
  { text: "Seguimiento de conversiones", icon: "🔄" },
  { text: "Reporte mensual", icon: "📊" },
  { text: "Acompañamiento estratégico", icon: "👥" }
];

export default function PerformancePackInvestmentBanner() {
  return (
    <div className="w-full rounded-[2.5rem] bg-gradient-to-r from-[#071328] via-[#0A1D3B] to-[#081224] border-2 border-[#2ECC71]/40 p-6 sm:p-8 lg:p-10 shadow-[0_0_60px_rgba(46,204,113,0.12)] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#2ECC71]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: Pricing & Info */}
        <div className="lg:col-span-3">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1 font-bold">
            Inversión
          </span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl sm:text-5xl font-black text-white font-headline">
              $450
            </span>
            <span className="text-base font-medium text-slate-300">
              / mes
            </span>
          </div>

          <div className="font-bold text-sm text-[#2ECC71] mb-6 tracking-wide">
            + inversión publicitaria
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5 text-[11px] text-slate-400 font-light leading-relaxed">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              La inversión publicitaria no está incluida en el abono mensual y se paga directamente como presupuesto destinado a las plataformas publicitarias.
            </span>
          </div>
        </div>

        {/* Middle: Included Inclusions Checklist (2 columns) */}
        <div className="lg:col-span-5">
          <h3 className="font-headline text-base font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2">
            <span>Incluye:</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3.5">
            {/* Col 1 */}
            <div className="space-y-3">
              {inclusionsCol1.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 font-light group">
                  <div className="w-5 h-5 rounded-lg bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center shrink-0 text-[#2ECC71] text-[10px] font-bold group-hover:scale-110 transition-transform">
                    ✓
                  </div>
                  <span className="leading-tight">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              {inclusionsCol2.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 font-light group">
                  <div className="w-5 h-5 rounded-lg bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center shrink-0 text-[#2ECC71] text-[10px] font-bold group-hover:scale-110 transition-transform">
                    ✓
                  </div>
                  <span className="leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Laptop Analytics Mockup */}
        <div className="lg:col-span-4 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-sm rounded-2xl bg-[#0F172A] border border-white/20 p-3 shadow-2xl backdrop-blur relative"
          >
            {/* Laptop Screen Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
              </div>
              <span className="text-[9px] font-mono text-slate-400">analytics.seogrowthers.com</span>
            </div>

            {/* 4 Mockup Dashboards Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Chart 1: Line Chart */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between h-20">
                <span className="text-[8px] font-mono text-slate-400">Clics & Tráfico</span>
                <svg viewBox="0 0 100 40" className="w-full h-8 overflow-visible">
                  <path
                    d="M0 30 Q 25 5, 50 20 T 100 5"
                    fill="none"
                    stroke="#00D084"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0 35 Q 25 15, 50 28 T 100 15"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                </svg>
                <span className="text-[8px] font-bold text-emerald-400">+142% leads</span>
              </div>

              {/* Chart 2: Vertical Bar Chart */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between h-20">
                <span className="text-[8px] font-mono text-slate-400">Conversiones</span>
                <div className="flex items-end justify-between gap-1 h-8 px-1">
                  <div className="w-2 bg-blue-500/40 rounded-t h-3" />
                  <div className="w-2 bg-blue-500/60 rounded-t h-5" />
                  <div className="w-2 bg-cyan-400 rounded-t h-7" />
                  <div className="w-2 bg-[#2ECC71] rounded-t h-8" />
                </div>
                <span className="text-[8px] font-bold text-cyan-400">CPL $4.20 USD</span>
              </div>

              {/* Chart 3: Mini Horizontal Bars */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between h-20">
                <span className="text-[8px] font-mono text-slate-400">Canales Top</span>
                <div className="space-y-1 my-1">
                  <div className="h-1.5 w-full bg-blue-500 rounded-full" />
                  <div className="h-1.5 w-4/5 bg-pink-500 rounded-full" />
                  <div className="h-1.5 w-3/5 bg-cyan-400 rounded-full" />
                </div>
                <span className="text-[8px] font-mono text-slate-500">Google / Meta</span>
              </div>

              {/* Chart 4: Donut Chart */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center h-20">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#1E293B" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#2ECC71"
                      strokeWidth="4"
                      strokeDasharray="60 40"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth="4"
                      strokeDasharray="30 70"
                      strokeDashoffset="-60"
                    />
                  </svg>
                  <span className="absolute text-[8px] font-bold text-white">ROI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
