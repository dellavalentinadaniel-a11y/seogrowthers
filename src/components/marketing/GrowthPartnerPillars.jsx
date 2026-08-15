import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles,
  Share2,
  Search,
  Layout,
  BarChart2,
  Hourglass,
  FileText
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   6 CARDS DATA MATCHING EXACT REFERENCE IMAGE
───────────────────────────────────────────────────────────── */
const pillarsData = [
  {
    id: "performance",
    title: "Todo lo incluido en Performance",
    subtitle: "Las bases de adquisición de clientes.",
    badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    topIcon: Share2,
    topIconBg: "bg-cyan-500/15 text-cyan-400 border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    cardBorder: "border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    items: [
      "GESTIÓN DE GOOGLE ADS",
      "GESTIÓN DE META ADS",
      "GENERACIÓN DE LEADS",
      "OPTIMIZACIÓN CONTINUA",
      "REMARKETING",
      "1 LANDING PAGE INCLUIDA",
      "REPORTE MENSUAL"
    ],
    // Neon Graphic Tile (Right side): Speedometer / Gauge
    neonTile: (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#0A1322] to-[#060A12] border-2 border-cyan-400/60 p-2 flex items-center justify-center relative shadow-[0_0_25px_rgba(6,182,212,0.35),inset_0_0_15px_rgba(6,182,212,0.2)] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          {/* Gauge Arc */}
          <path
            d="M 20 70 A 35 35 0 1 1 80 70"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          {/* Inner Arc */}
          <path
            d="M 28 66 A 25 25 0 1 1 72 66"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="2"
          />
          {/* Needle Pointer */}
          <line
            x1="50"
            y1="50"
            x2="68"
            y2="32"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Center Hub */}
          <circle cx="50" cy="50" r="5" fill="#38bdf8" stroke="#0e7490" strokeWidth="2" />
          {/* Bottom base tick */}
          <rect x="42" y="65" width="16" height="4" rx="2" fill="#06b6d4" opacity="0.6" />
        </svg>
      </div>
    )
  },
  {
    id: "seo",
    title: "Estrategia SEO Full",
    subtitle: "Posicionamiento orgánico integral.",
    badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    topIcon: Search,
    topIconBg: "bg-purple-500/15 text-purple-400 border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    cardBorder: "border-purple-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    items: [
      "INVESTIGACIÓN DE KEYWORDS",
      "PLAN DE CONTENIDOS",
      "OPTIMIZACIÓN ON-PAGE",
      "SEO TÉCNICO",
      "AUDITORÍA SEO",
      "ARQUITECTURA Y URLS"
    ],
    // Neon Graphic Tile (Right side): Search Magnifier with Bar Chart
    neonTile: (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#0A1322] to-[#060A12] border-2 border-cyan-400/60 p-2 flex items-center justify-center relative shadow-[0_0_25px_rgba(6,182,212,0.35),inset_0_0_15px_rgba(6,182,212,0.2)] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          {/* Magnifier glass outer */}
          <circle
            cx="44"
            cy="44"
            r="26"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="4"
          />
          {/* Magnifier Handle */}
          <line
            x1="63"
            y1="63"
            x2="84"
            y2="84"
            stroke="#06b6d4"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Bars inside the glass */}
          <line x1="32" y1="52" x2="32" y2="44" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="52" x2="40" y2="36" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="52" x2="48" y2="30" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="52" x2="56" y2="24" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          {/* Trend arrow over bars */}
          <path
            d="M 28 44 L 40 34 L 56 22"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
    )
  },
  {
    id: "landing",
    title: "2 Landing Pages de Alta Conversión",
    subtitle: "Optimizadas para convertir.",
    badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    topIcon: Layout,
    topIconBg: "bg-amber-500/15 text-amber-400 border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    cardBorder: "border-amber-500/20 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    items: [
      "ESTRUCTURA A CONVERSIÓN",
      "PROPUESTA DE VALOR CLARA",
      "CTA ESTRATÉGICOS",
      "DISEÑO RESPONSIVE",
      "INTEGRACIÓN CON CANALES"
    ],
    // Neon Graphic Tile (Right side): Browser / Landing Page Wireframe
    neonTile: (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#180F0A] to-[#0A0705] border-2 border-amber-400/60 p-2.5 flex items-center justify-center relative shadow-[0_0_25px_rgba(245,158,11,0.35),inset_0_0_15px_rgba(245,158,11,0.2)] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
          {/* Browser Window Frame */}
          <rect
            x="16"
            y="18"
            width="68"
            height="64"
            rx="6"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.5"
          />
          {/* Browser Top Header Line */}
          <line x1="16" y1="32" x2="84" y2="32" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Window dots */}
          <circle cx="24" cy="25" r="2" fill="#fbbf24" />
          <circle cx="30" cy="25" r="2" fill="#fbbf24" />
          <circle cx="36" cy="25" r="2" fill="#fbbf24" />
          {/* Hero mockup box inside */}
          <rect x="24" y="38" width="28" height="20" rx="3" fill="none" stroke="#fbbf24" strokeWidth="2" />
          {/* Text lines inside */}
          <line x1="58" y1="42" x2="76" y2="42" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="48" x2="72" y2="48" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="54" x2="68" y2="54" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          {/* CTA Button mockup */}
          <rect x="24" y="64" width="52" height="10" rx="2" fill="#f59e0b" opacity="0.8" />
        </svg>
      </div>
    )
  },
  {
    id: "analytics",
    title: "Data Analytics GA4 Pro",
    subtitle: "Configuración profesional.",
    badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    topIcon: BarChart2,
    topIconBg: "bg-cyan-500/15 text-cyan-400 border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    cardBorder: "border-cyan-500/20 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    items: [
      "CONFIGURACIÓN DE GA4",
      "EVENTOS Y CONVERSIONES",
      "SEGUIMIENTO CLAVE",
      "RECORRIDO DEL USUARIO",
      "ATRIBUCIÓN"
    ],
    // Neon Graphic Tile (Right side): 3 Ascending Bar Chart Columns
    neonTile: (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#18110A] to-[#0A0704] border-2 border-amber-400/60 p-2 flex items-center justify-center relative shadow-[0_0_25px_rgba(245,158,11,0.35),inset_0_0_15px_rgba(245,158,11,0.2)] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
          {/* Bar 1 (Shortest) */}
          <rect x="22" y="58" width="14" height="24" rx="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          {/* Bar 2 (Medium) */}
          <rect x="43" y="40" width="14" height="42" rx="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          {/* Bar 3 (Tallest) */}
          <rect x="64" y="22" width="14" height="60" rx="7" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" />
          {/* Bottom baseline */}
          <line x1="16" y1="84" x2="84" y2="84" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>
    )
  },
  {
    id: "cro",
    title: "Optimización CRO Mensual",
    subtitle: "Mejora continua.",
    badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    topIcon: Hourglass,
    topIconBg: "bg-amber-500/15 text-amber-400 border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    cardBorder: "border-amber-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    items: [
      "ANÁLISIS DE COMPORTAMIENTO",
      "PRUEBAS A/B",
      "OPTIMIZACIÓN DE LANDING PAGES",
      "MENSAJES Y CTA",
      "UX"
    ],
    // Neon Graphic Tile (Right side): Pie Chart / Donut Segmented
    neonTile: (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#0A1322] to-[#060A12] border-2 border-cyan-400/60 p-2 flex items-center justify-center relative shadow-[0_0_25px_rgba(6,182,212,0.35),inset_0_0_15px_rgba(6,182,212,0.2)] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          {/* Main Pie Segment (Cyan - 75%) */}
          <path
            d="M 50 50 L 50 18 A 32 32 0 1 0 82 50 Z"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Small Pie Segment (Orange - 25% extracted) */}
          <path
            d="M 58 42 L 58 14 A 32 32 0 0 1 86 42 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]"
          />
        </svg>
      </div>
    )
  },
  {
    id: "reporte",
    title: "Reporte y Análisis",
    subtitle: "Informe ejecutivo mensual.",
    badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    topIcon: FileText,
    topIconBg: "bg-purple-500/15 text-purple-400 border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    cardBorder: "border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    items: [
      "RENDIMIENTO CAMPAÑAS",
      "MÉTRICAS DE LEADS",
      "EVOLUCIÓN SEO",
      "RENDIMIENTO LPS",
      "OPORTUNIDADES"
    ],
    // Neon Graphic Tile (Right side): Analytics Line Chart with Arrow
    neonTile: (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#140A1F] to-[#0A0512] border-2 border-purple-400/60 p-2 flex items-center justify-center relative shadow-[0_0_25px_rgba(168,85,247,0.35),inset_0_0_15px_rgba(168,85,247,0.2)] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
          {/* Background grid */}
          <rect x="18" y="20" width="64" height="60" rx="4" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="18" y1="40" x2="82" y2="40" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="18" y1="60" x2="82" y2="60" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Vertical Bars in background */}
          <rect x="25" y="60" width="6" height="20" rx="1" fill="#c084fc" opacity="0.6" />
          <rect x="37" y="48" width="6" height="32" rx="1" fill="#c084fc" opacity="0.7" />
          <rect x="49" y="38" width="6" height="42" rx="1" fill="#c084fc" opacity="0.8" />
          <rect x="61" y="28" width="6" height="52" rx="1" fill="#e879f9" opacity="0.9" />

          {/* Growth Trend Line with Arrow */}
          <path
            d="M 22 68 L 36 50 L 50 44 L 72 26"
            fill="none"
            stroke="#f472b6"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead */}
          <path
            d="M 62 26 L 73 26 L 73 37"
            fill="none"
            stroke="#f472b6"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
];

export default function GrowthPartnerPillars() {
  return (
    <section id="detalles-plan" className="scroll-mt-24">
      {/* ────────────────── SECTION HEADER ────────────────── */}
      <div className="text-center max-w-5xl mx-auto mb-14">
        {/* Video Banner */}
        <div className="w-full aspect-[21/9] sm:aspect-[3/1] md:aspect-[4/1] rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl shadow-cyan-500/10 relative bg-slate-900/50">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/media/GrowthPartner_banner_animado.mp4" type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
        </div>

        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          ¿Qué incluye el{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.7)]">
            Growth Partner?
          </span>
        </h2>
      </div>

      {/* ────────────────── 6 CARDS GRID ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillarsData.map((pillar, idx) => {
          const TopIcon = pillar.topIcon;

          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`p-6 sm:p-7 rounded-[1.75rem] bg-[#070B14]/90 border ${pillar.cardBorder} backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden group`}
            >
              {/* Top Row: Category Icon + Title + Results-driven Pill */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${pillar.topIconBg} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <TopIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-headline text-base font-bold text-white leading-snug tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-light mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Top Right Pill Badge */}
                  <div className={`px-2.5 py-1 rounded-full border ${pillar.badgeColor} font-mono text-[9px] font-bold tracking-wider flex items-center gap-1 shrink-0 uppercase`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Results-driven</span>
                  </div>
                </div>

                {/* Body Row: Left Checklist + Right Neon Vector Tile */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10 mt-4">
                  {/* Checklist */}
                  <div className="space-y-2.5 flex-1">
                    {pillar.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-[11px] text-slate-300 font-mono tracking-tight font-medium leading-tight">
                        <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Neon App Tile */}
                  <div className="self-center">
                    {pillar.neonTile}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
