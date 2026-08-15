import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search as SearchIcon,
  BarChart3,
  Bot,
  Globe,
  Rocket,
  ShieldCheck,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const growthPartnerFaqData = [
  {
    category: "SEO Avanzado y Posicionamiento Orgánico en Argentina",
    icon: SearchIcon,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    questions: [
      {
        q: "¿En cuánto tiempo puedo ver resultados del SEO orgánico en Neuquén o Cipolletti?",
        a: "El SEO es una inversión a mediano y largo plazo. Generalmente se comienzan a ver mejoras de posicionamiento entre el mes 3 y 6. Sin embargo, con el Growth Partner, al combinar SEO técnico y de contenidos con pauta paga desde el día 1, empezás a generar tráfico y leads mientras construimos tu posicionamiento orgánico. Es una estrategia dual que no te deja sin resultados durante la fase de crecimiento SEO."
      },
      {
        q: "¿Qué diferencia hay entre SEO de Contenidos y SEO Técnico?",
        a: "El SEO de Contenidos se enfoca en investigación de keywords, creación de artículos estratégicos, optimización on-page y enlazado interno para posicionar tu sitio en las búsquedas más relevantes de tu industria en Neuquén y el Alto Valle. El SEO Técnico trabaja sobre la arquitectura del sitio: velocidad (Core Web Vitals), indexación, URLs, sitemaps, robots.txt y estructura de datos. Ambos son indispensables y en el Growth Partner están integrados."
      },
      {
        q: "¿El SEO funciona para empresas B2B en sectores como Vaca Muerta o servicios petroleros?",
        a: "Absolutamente. De hecho, los sectores industriales y B2B en la Patagonia presentan enormes oportunidades de SEO porque la competencia digital es baja. Los tomadores de decisiones investigan proveedores en Google antes de contactarlos. Posicionar tu empresa para búsquedas como 'servicios de logística Vaca Muerta' o 'proveedores petroleros Neuquén' te conecta directamente con contratos y oportunidades comerciales de alto valor."
      }
    ]
  },
  {
    category: "Optimización de Conversión (CRO) y Landing Pages",
    icon: Rocket,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    questions: [
      {
        q: "¿Qué es la Optimización CRO mensual y cómo me beneficia?",
        a: "CRO (Conversion Rate Optimization) es el proceso continuo de mejorar la tasa de conversión de tus landing pages y formularios. Cada mes analizamos el comportamiento de los usuarios, identificamos fricciones en el embudo de ventas y ejecutamos pruebas A/B para optimizar CTAs, mensajes, formularios y experiencia de usuario. Esto significa que con el mismo tráfico, obtenés más leads y más ventas, reduciendo tu costo de adquisición."
      },
      {
        q: "¿Por qué el Growth Partner incluye 2 Landing Pages en lugar de 1?",
        a: "Con 2 Landing Pages podemos segmentar mejor tus campañas: una optimizada para Google Ads (enfocada en búsquedas de intención alta) y otra para Meta Ads (enfocada en captación de leads más fríos). También permite testear distintas propuestas de valor, públicos o servicios. Esto maximiza la relevancia del mensaje, mejora el Quality Score y reduce significativamente el costo por lead."
      }
    ]
  },
  {
    category: "Analítica Avanzada (GA4) e Inteligencia de Datos",
    icon: BarChart3,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    questions: [
      {
        q: "¿Qué es el setup profesional de Google Analytics 4 (GA4) que incluye el plan?",
        a: "Configuramos GA4 de forma avanzada: eventos personalizados de conversión (formularios, clics en WhatsApp, scrolls), seguimiento de recorrido del usuario, integración con Google Ads y Meta Ads para atribución cruzada, audiencias personalizadas para remarketing, y dashboards de indicadores clave. Esto te da visibilidad total sobre qué canales generan más oportunidades comerciales en Neuquén y en todo el país."
      },
      {
        q: "¿Cómo miden el rendimiento y cómo sé que mi inversión está funcionando?",
        a: "Cada mes recibirás un Reporte de Análisis de Growth detallado que incluye: rendimiento de todas las campañas, métricas de leads generados, evolución del tráfico orgánico y posiciones SEO, rendimiento individual de cada landing page, comportamiento de usuarios, oportunidades de CRO detectadas y un plan de acción con los próximos pasos. Todo con datos concretos, no suposiciones."
      }
    ]
  },
  {
    category: "Estrategia Integral y Crecimiento Sostenible",
    icon: Globe,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    questions: [
      {
        q: "¿Cuál es la diferencia real entre el Performance Pack y el Growth Partner?",
        a: "El Performance Pack ($450/mes) está diseñado para resultados inmediatos a través de campañas pagas (Google Ads + Meta Ads + 1 Landing Page). El Growth Partner ($850/mes) incluye todo lo del Performance Pack PLUS: Estrategia SEO Full (contenidos + técnico), 2 Landing Pages, GA4 Pro Setup, Optimización CRO mensual con A/B Testing, Reporte de Análisis de Growth y Soporte Prioritario. Es la diferencia entre captar leads hoy vs. construir un sistema de crecimiento sostenible que combine adquisición paga, orgánica, conversión y analítica."
      },
      {
        q: "¿Es conveniente para una PYME o emprendedor en Neuquén, o solo para empresas grandes?",
        a: "El Growth Partner está diseñado precisamente para PYMEs y profesionales que quieren escalar de manera seria. Si tu negocio factura y tiene capacidad de atender más clientes, este plan te posiciona como referente digital en tu sector. No necesitás ser una multinacional: muchos de nuestros clientes en Cipolletti, Neuquén y el Alto Valle son estudios contables, clínicas, empresas de servicios y comercios que duplicaron sus consultas en menos de 6 meses."
      }
    ]
  }
];

export default function GrowthPartnerFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  let globalQuestionCounter = 0;

  return (
    <section className="w-full rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 to-[#070E1E]/95 border border-white/10 p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden" id="faqs-growth">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-400/30 bg-indigo-400/10 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-widest mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>PREGUNTAS FRECUENTES • GROWTH PARTNER 2026</span>
        </div>
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Frecuentes</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
          Respuestas estratégicas sobre SEO avanzado, CRO, analítica GA4 y crecimiento sostenible para negocios en Neuquén, Cipolletti y toda Argentina.
        </p>
      </div>

      {/* FAQ Categories & Questions Accordion */}
      <div className="max-w-4xl mx-auto space-y-10">
        {growthPartnerFaqData.map((cat, catIdx) => {
          const CatIcon = cat.icon;
          return (
            <div key={catIdx} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                <div className={`w-8 h-8 rounded-xl ${cat.bg} border ${cat.border} flex items-center justify-center shrink-0`}>
                  <CatIcon className={`w-4 h-4 ${cat.color}`} />
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                  {cat.category}
                </h3>
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {cat.questions.map((faq) => {
                  const currentIdx = globalQuestionCounter++;
                  const isOpen = openIndex === currentIdx;

                  return (
                    <div
                      key={currentIdx}
                      className={`rounded-2xl transition-all duration-300 border ${
                        isOpen
                          ? "bg-slate-900/90 border-indigo-400/50 shadow-[0_0_25px_rgba(99,102,241,0.15)]"
                          : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(currentIdx)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                        aria-expanded={isOpen}
                      >
                        <span className="font-headline text-sm sm:text-base font-bold text-white leading-snug">
                          {faq.q}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen ? "bg-indigo-500 text-white rotate-180" : "bg-white/10 text-slate-300"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
