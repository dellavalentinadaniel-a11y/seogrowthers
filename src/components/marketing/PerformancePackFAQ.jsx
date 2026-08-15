import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MapPin,
  Zap,
  Bot,
  Store,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const performancePackFaqData = [
  {
    category: "Posicionamiento SEO Local y Visibilidad en la Patagonia",
    icon: MapPin,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    questions: [
      {
        q: "¿Por qué mi negocio físico en Neuquén o Cipolletti no aparece en Google Maps?",
        a: "La falta de visibilidad suele deberse a un Perfil de Negocio de Google (GBP) no optimizado o desactualizado. Para competir en la región del Alto Valle, es indispensable mantener la consistencia NAP (Nombre, Dirección y Teléfono) en toda la web, recopilar reseñas constantes y utilizar palabras clave geolocalizadas (ej. \"servicios B2B en Vaca Muerta\"). En SEO Growthers optimizamos tu ecosistema local para asegurar que aparezcas en los primeros resultados (Local Map Pack) cuando los clientes busquen cerca de ti."
      },
      {
        q: "¿Cómo ayuda el SEO a competir contra plataformas como Mercado Libre?",
        a: "Depender exclusivamente de grandes marketplaces reduce tus márgenes y te hace competir por precio. Una estrategia de SEO sólido con un sitio web propio te otorga soberanía digital. Al captar tráfico orgánico de calidad y aplicar estrategias como el modelo híbrido ROPO (Research Online, Purchase Offline), lograrás atraer a los clientes directamente hacia tu tienda física o tu e-commerce propio sin pagar altas comisiones por transacción."
      }
    ]
  },
  {
    category: "Desarrollo Web de Alto Rendimiento",
    icon: Zap,
    color: "text-[#2ECC71]",
    bg: "bg-[#2ECC71]/10",
    border: "border-[#2ECC71]/30",
    questions: [
      {
        q: "¿Qué son las Core Web Vitals y cómo impactan en mis ventas?",
        a: "Las Core Web Vitals son métricas oficiales de Google que miden la velocidad de carga (LCP), la interactividad (INP) y la estabilidad visual (CLS) de tu página web. En 2026, si tu web es lenta o inestable, Google penaliza tu posicionamiento. En SEO Growthers desarrollamos arquitecturas web de extrema velocidad que superan métricas de 90/100, garantizando retención de usuarios y maximizando las conversiones."
      },
      {
        q: "¿Es realmente necesario un diseño \"Mobile-First\" para empresas industriales o B2B?",
        a: "Definitivamente. Más del 75% del tráfico web actual proviene de dispositivos móviles. Los profesionales, gerentes y tomadores de decisiones de la industria petrolera y de servicios en la Patagonia investigan opciones desde sus smartphones. Si tu sitio web no está optimizado para móviles, los motores de búsqueda le darán total prioridad a tus competidores."
      }
    ]
  },
  {
    category: "Inteligencia Artificial (IA) y Automatización",
    icon: Bot,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    questions: [
      {
        q: "¿Qué es AEO y por qué es fundamental para liderar el mercado en 2026?",
        a: "El AEO (Answer Engine Optimization) es la evolución del SEO tradicional. Consiste en optimizar tu contenido para que las Inteligencias Artificiales (como ChatGPT, Gemini o Google AI Overviews) utilicen tu web como la fuente principal al responder preguntas de los usuarios. Estructurando el contenido con Schema Markup y resolviendo dudas concretas, posicionamos a tu empresa como la autoridad indiscutida en la región."
      },
      {
        q: "¿Cómo implementamos la Inteligencia Artificial para captar más clientes?",
        a: "Utilizamos la IA para optimizar la creación de contenido a gran escala, automatizar la atención y respuesta a clientes mediante agentes conversacionales, e interpretar datos para predecir el comportamiento de compra. Esto te permite escalar tus ventas y mantener un canal de adquisición activo las 24 horas del día sin aumentar tus costos operativos."
      }
    ]
  },
  {
    category: "Ecosistema Híbrido y Comercio Local",
    icon: Store,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    questions: [
      {
        q: "¿De qué trata el paradigma híbrido (BOPIS y ROPO)?",
        a: "El ecosistema comercial moderno requiere conectar el mundo digital con tu local físico. Estrategias como BOPIS (Comprar en línea, retirar en tienda) y ROPO (Investigar en línea, comprar en tienda) aprovechan todo el tráfico web para generar visitas presenciales. Esto mejora la conveniencia para el cliente local y genera ventas cruzadas o impulsivas, incrementando drásticamente el ticket promedio de tu comercio."
      }
    ]
  }
];

export default function PerformancePackFAQ() {
  const [openIndex, setOpenIndex] = useState(0); // Open first question by default

  const toggleQuestion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  let globalQuestionCounter = 0;

  return (
    <section className="w-full rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 to-[#070E1E]/95 border border-white/10 p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden" id="faqs">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/10 text-[#2ECC71] font-mono text-[10px] font-bold uppercase tracking-widest mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>PREGUNTAS FRECUENTES • SEO LOCAL & AEO 2026</span>
        </div>
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          Preguntas <span className="text-[#2ECC71]">Frecuentes</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
          Respuestas estratégicas sobre posicionamiento digital, SEO local en Neuquén, Vaca Muerta, Core Web Vitals y optimización para Inteligencia Artificial (AEO).
        </p>
      </div>

      {/* FAQ Categories & Questions Accordion */}
      <div className="max-w-4xl mx-auto space-y-10">
        {performancePackFaqData.map((cat, catIdx) => {
          const CatIcon = cat.icon;
          return (
            <div key={catIdx} className="space-y-4">
              {/* Category Header Title */}
              <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                <div className={`w-8 h-8 rounded-xl ${cat.bg} border ${cat.border} flex items-center justify-center shrink-0`}>
                  <CatIcon className={`w-4 h-4 ${cat.color}`} />
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                  {cat.category}
                </h3>
              </div>

              {/* Questions List for this Category */}
              <div className="space-y-3">
                {cat.questions.map((faq) => {
                  const currentIdx = globalQuestionCounter++;
                  const isOpen = openIndex === currentIdx;

                  return (
                    <div
                      key={currentIdx}
                      className={`rounded-2xl transition-all duration-300 border ${
                        isOpen
                          ? "bg-slate-900/90 border-[#2ECC71]/50 shadow-[0_0_25px_rgba(46,204,113,0.15)]"
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
                            isOpen ? "bg-[#2ECC71] text-slate-950 rotate-180" : "bg-white/10 text-slate-300"
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
