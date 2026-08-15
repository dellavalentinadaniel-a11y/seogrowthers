import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import GoogleBusinessReviews from '@/components/shared/GoogleBusinessReviews';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';
import {
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle2,
  BarChart3,
  Code2,
  Rocket,
  Plus,
  Minus,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
      isOpen
        ? 'border-cyan-400/50 bg-slate-900/90 shadow-[0_0_25px_rgba(0,219,231,0.12)]'
        : 'border-white/10 bg-slate-950/60 hover:border-cyan-400/30'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <h3 className={`font-headline text-base md:text-lg font-bold pr-4 transition-colors ${
          isOpen ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
        }`}>
          {question}
        </h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isOpen ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-slate-400 group-hover:text-white'
        }`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-slate-300 leading-relaxed font-light text-sm md:text-base border-t border-white/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPagesPage = () => {
  const [activeTab, setActiveTab] = useState('tipologias');
  const [activeCase, setActiveCase] = useState('a1');
  const [currency, setCurrency] = useState('usd');

  const methodologySteps = [
    {
      step: "01",
      icon: BarChart3,
      title: "Análisis y Estrategia",
      desc: "Auditoría profunda del mercado, análisis de competidores y definición de KPIs para establecer la arquitectura de conversión."
    },
    {
      step: "02",
      icon: Sparkles,
      title: "Diseño UX/UI",
      desc: "Creación de interfaces de alta conversión utilizando heurísticas de usabilidad y jerarquía visual persuasiva."
    },
    {
      step: "03",
      icon: Code2,
      title: "Desarrollo y Optim.",
      desc: "Implementación técnica impecable, optimización de Core Web Vitals y estructuración de datos para motores de búsqueda."
    },
    {
      step: "04",
      icon: Rocket,
      title: "Lanzamiento y Seg.",
      desc: "Despliegue a producción, configuración de tracking avanzado y monitorización iterativa de métricas de rendimiento."
    }
  ];

  const faqs = [
    {
      q: '¿Por qué elegir a SEO Growthers como tu agencia SEO en Argentina (Buenos Aires, Córdoba y Rosario)?',
      a: 'Como empresa SEO líder en Argentina, combinamos ingeniería WPO de ultra-velocidad con optimización semántica profunda. Diseñamos estrategias personalizadas para clientes en Buenos Aires, Córdoba, Rosario y todo el país, garantizando un posicionamiento web sólido y sustentable en Google Argentina.',
      defaultOpen: true
    },
    {
      q: '¿Cómo funciona la consultoría SEO en Argentina y qué incluye la auditoría SEO en Buenos Aires?',
      a: 'Nuestra consultoría SEO en Argentina analiza 4 pilares: salud técnica, velocidad Core Web Vitals, intención comercial de búsqueda y perfil de backlinks (link building Argentina). Con nuestra auditoría SEO en Buenos Aires identificamos los cuellos de botella exactos y entregamos una hoja de ruta para elevar tu tasa de conversión.',
      defaultOpen: false
    },
    {
      q: '¿Qué servicios SEO para ecommerce ofrecen en Tiendanube y MercadoShops?',
      a: 'Desarrollamos soluciones especializadas de SEO para Tiendanube y SEO para MercadoShops. Optimizamos la arquitectura de categorías, eliminamos el contenido duplicado de variantes y parametrizaciones, e inyectamos datos estructurados Schema.org para posicionar tus productos en las primeras posiciones de Google.',
      defaultOpen: false
    },
    {
      q: '¿Cuánto tiempo tarda en verse el posicionamiento en Google Argentina?',
      a: 'Las mejoras técnicas WPO e indexación semántica muestran resultados en 2 a 4 semanas. El incremento masivo de tráfico orgánico transaccional y posicionamiento en Google Argentina para palabras clave competitivas suele consolidarse entre los 60 y 90 días.',
      defaultOpen: false
    },
    {
      q: '¿Cómo se integran las estrategias de Link Building en Argentina con el desarrollo de Landing Pages?',
      a: 'Construir una landing page de alta conversión es el primer paso; amplificar su autoridad requiere link building estratégico en Argentina. Obtenemos menciones y backlinks de alta reputación que impulsan el ranking de tu sitio sin correr riesgos de penalizaciones.',
      defaultOpen: false
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño Web Landing Page - SEO Growthers",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Agencia SEO en Argentina especializada en diseño de landing pages de alta conversión, posicionamiento web en Google, SEO para ecommerce (Tiendanube, MercadoShops) y consultoría.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "Landing Page Design & SEO Engineering"
  };

  return (
    <div className="text-slate-200 font-body min-h-screen bg-[#0d1515] selection:bg-cyan-500/30 selection:text-white relative">
      <Helmet>
        <title>Diseño Web Landing Page | Agencia SEO Argentina - SEO Growthers</title>
        <meta name="description" content="Agencia SEO en Argentina especializada en diseño web de landing pages, posicionamiento en Google, SEO para ecommerce (Tiendanube, MercadoShops) y auditoría en Buenos Aires." />
        <link rel="canonical" href="https://seogrowthers.com/services/landing-pages" />
        <meta property="og:title" content="Diseño Web Landing Page | Agencia SEO Argentina - SEO Growthers" />
        <meta property="og:description" content="Ingeniería de conversión de alta precisión y posicionamiento orgánico en Google Argentina." />
        <meta property="og:url" content="https://seogrowthers.com/services/landing-pages" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Mesh Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,219,231,0.04)_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none" />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <Breadcrumbs className="mb-6" />

        {/* HERO SECTION */}
        <section className="relative min-h-[750px] flex items-center justify-center pt-8 pb-16">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
                  AGENCIA SEO ARGENTINA • CRO ENGINEERING
                </span>
              </div>

              <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                Diseño Web <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300 drop-shadow-[0_0_20px_rgba(0,219,231,0.3)]">
                  Landing Page
                </span>
              </h1>

              <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Ingeniería de conversión y posicionamiento web en Argentina. Construimos ecosistemas digitales enfocados en maximizar resultados en Google y ratios de conversión mediante arquitectura avanzada.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
                <a
                  href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20iniciar%20un%20proyecto%20de%20landing%20page"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { trackWhatsAppClick('hero_iniciar_proyecto'); trackCTAClick('landing_pages_main_cta'); }}
                  className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 px-8 py-4 rounded-lg font-mono text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(0,219,231,0.3)] hover:shadow-[0_0_35px_rgba(0,219,231,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>INICIAR PROYECTO</span>
                </a>
                <Link
                  to="/portfolio"
                  className="bg-white/5 border border-white/10 text-cyan-400 px-8 py-4 rounded-lg font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span>VER PORTFOLIO</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Social Proof Avatars */}
              <div className="flex items-center gap-6 pt-6 border-t border-white/10 w-full">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar 1" />
                  <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar 2" />
                  <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Avatar 3" />
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400 font-bold">
                    +500
                  </div>
                </div>
                <div className="text-xs md:text-sm text-slate-300 font-light leading-snug">
                  Proyectos de alta conversión <br />entregados con éxito en Argentina.
                </div>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="lg:col-span-5 relative w-full h-[450px] lg:h-[550px] group">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                    alt="3D Cyber Metric Analytics Panel"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1515] via-[#0d1515]/40 to-transparent" />

                  {/* Floating Stats Card Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-slate-950/80 p-5 rounded-xl border-l-4 border-l-cyan-400 border border-white/10 flex items-center justify-between shadow-2xl">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">CONVERSION RATE</div>
                      <div className="text-3xl font-black text-cyan-400 font-headline">+24.8%</div>
                    </div>
                    <div className="w-20 h-10 flex items-end gap-1">
                      <div className="w-2 h-4 bg-cyan-500/40 rounded-t" />
                      <div className="w-2 h-6 bg-cyan-500/60 rounded-t" />
                      <div className="w-2 h-3 bg-cyan-500/30 rounded-t" />
                      <div className="w-2 h-8 bg-cyan-500/80 rounded-t" />
                      <div className="w-2 h-10 bg-cyan-400 rounded-t shadow-[0_0_10px_#00dbe7]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting Glowing Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-cyan-400/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none">
                <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#00dbe7]" />
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTE DE RESEÑAS GOOGLE BUSINESS REALES + INCENTIVADO */}
        <GoogleBusinessReviews />

        {/* METODOLOGÍA / PROCESOS SECTION */}
        <section className="py-20 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              METODOLOGÍA
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-slate-300 text-base font-light">
              Un pipeline de ingeniería sistemático, diseñado para extraer datos, construir interfaces y escalar conversiones con precisión predecible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {methodologySteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/40 transition-all flex flex-col justify-between">
                  <div className="absolute -right-2 -bottom-6 font-headline font-black text-8xl text-white/[0.03] group-hover:text-cyan-400/[0.08] transition-colors pointer-events-none">
                    {s.step}
                  </div>

                  <div>
                    <div className="w-14 h-14 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-all">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h3 className="font-headline font-bold text-white text-xl mb-3 relative z-10">{s.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light relative z-10">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PLANES DE INVERSIÓN SECTION */}
        <section className="py-20 mb-20 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              PAQUETES
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">
              Nuestros Planes de Inversión
            </h2>
            <p className="text-slate-300 text-base font-light">
              Estructuras de pricing diseñadas para escalar. Desde validación de leads hasta ecosistemas enterprise de alta disponibilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* PLAN 1: LANDING BASE */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Landing Base</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">Ideal para validación de productos y captación de leads inicial.</p>

                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-6">
                  <span className="text-slate-400 text-xs font-mono">Desde</span>
                  <span className="text-4xl font-black text-white font-headline">$800</span>
                  <span className="text-xs text-slate-400 font-mono">USD</span>
                </div>

                <ul className="space-y-4 mb-8 text-sm text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> 1 Página Principal (One-Page)</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Diseño UX/UI Custom</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Optimización SEO Básica</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Formulario de Contacto / Lead</li>
                </ul>
              </div>

              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20plan%20Landing%20Base"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-lg border border-cyan-400 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest hover:bg-cyan-400/10 transition-all text-center"
              >
                SOLICITAR PRESUPUESTO
              </a>
            </div>

            {/* PLAN 2: BUSINESS PRO (MÁS POPULAR) */}
            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex flex-col justify-between relative shadow-[0_0_35px_rgba(0,219,231,0.2)] transform lg:-translate-y-3">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 px-4 py-1 rounded-full font-mono text-[11px] font-black tracking-widest uppercase shadow-md">
                MÁS POPULAR
              </div>

              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2 mt-2">Business Pro</h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">El estándar de la industria. Arquitectura web completa con enfoque agresivo en CRO y Performance.</p>

                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-6">
                  <span className="text-slate-400 text-xs font-mono">Desde</span>
                  <span className="text-5xl font-black text-cyan-400 font-headline">$1,500</span>
                  <span className="text-xs text-slate-400 font-mono">USD</span>
                </div>

                <ul className="space-y-4 mb-8 text-sm text-slate-200">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Hasta 8 Páginas Corporativas</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> SEO Técnico Avanzado & Schema</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Auditoría y Estrategia CRO</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Optimización Extrema (Vitals 95+)</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Setup Analítica Avanzada (GA4/GTM)</li>
                </ul>
              </div>

              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20plan%20Business%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-mono text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,219,231,0.4)] hover:scale-105 transition-all text-center"
              >
                INICIAR PROYECTO
              </a>
            </div>

            {/* PLAN 3: CUSTOM ENTERPRISE */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Custom Enterprise</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">Soluciones a medida para corporaciones y grandes e-commerces que requieren ecosistemas complejos.</p>

                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-6">
                  <span className="text-3xl font-black text-white font-headline">A Medida</span>
                </div>

                <ul className="space-y-4 mb-8 text-sm text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Arquitectura Headless / Jamstack</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Integraciones API Custom</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Migraciones SEO Complejas</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" /> Soporte y SLA 24/7</li>
                </ul>
              </div>

              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20un%20plan%20Custom%20Enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-lg border border-cyan-400 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest hover:bg-cyan-400/10 transition-all text-center"
              >
                AGENDAR CONSULTORÍA
              </a>
            </div>
          </div>
        </section>

        {/* FAQ SECTION OPTIMIZADA PARA KEYWORDS Y CONVERSIÓN */}
        <section className="py-20 mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              FAQ • SEO ARGENTINA
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} defaultOpen={faq.defaultOpen} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm font-mono mb-2">¿Aún tienes dudas técnicas sobre tu proyecto?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono text-xs uppercase tracking-widest border-b border-cyan-400/40 pb-1 transition-colors"
            >
              <span>CONTACTA CON UN INGENIERO SEO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-20 border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-slate-900/80 p-12 md:p-20 rounded-3xl border border-cyan-400/30 relative z-10 shadow-2xl">
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-6">
              ¿Listo para maximizar <br />tus conversiones?
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Deja de perder leads por una arquitectura web deficiente. Construyamos un motor de adquisición de clientes validado y optimizado en Google Argentina.
            </p>
            <Link
              to="/auditoria-seo-gratis"
              className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 px-10 py-5 rounded-lg font-mono text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,219,231,0.3)] hover:scale-105 transition-all"
            >
              SOLICITAR AUDITORÍA GRATUITA
            </Link>
          </div>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>
    </div>
  );
};

export default LandingPagesPage;
