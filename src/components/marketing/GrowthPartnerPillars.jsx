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
import InteractiveCircuit from '@/components/animations/InteractiveCircuit';

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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

export default function GrowthPartnerPillars() {
  const circuitSteps = pillarsData.map(pillar => ({
    icon: pillar.topIcon,
    title: pillar.title,
    description: (
        <div>
            <p className="text-sm mb-4">{pillar.subtitle}</p>
            <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300">
                {pillar.items.map((item, idx) => <li key={idx} className="flex items-center gap-1">• {item}</li>)}
            </ul>
        </div>
    )
  }));

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

      <InteractiveCircuit steps={circuitSteps} className="w-full" />
    </section>
  );
}
