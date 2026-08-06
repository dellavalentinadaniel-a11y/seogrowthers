import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';
import {
  ShoppingBag,
  Zap,
  CheckCircle2,
  TrendingUp,
  Search,
  ChevronDown,
  ArrowRight,
  Download,
  ShieldCheck,
  FileText,
  BarChart3,
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-container-low/60 backdrop-blur-md overflow-hidden hover:border-primary/40 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <h3 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors pr-4">
          {question}
        </h3>
        <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
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
            <p className="px-6 pb-6 text-on-surface-variant leading-relaxed font-light text-sm md:text-base border-t border-white/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EcommerceTiendanubePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', storeUrl: '' });
  const [submitted, setSubmitted] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO para Tiendanube",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Servicio de SEO técnico y posicionamiento orgánico especializado para Tiendanube en Argentina. Optimización de categorías, velocidad y marcado estructurado.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "E-Commerce SEO Optimization"
  };

  const faqs = [
    { q: '¿Por qué Tiendanube necesita una estrategia SEO específica?', a: 'Tiendanube genera dinámicamente variaciones de categorías, etiquetas y filtros que sin la configuración adecuada pueden causar contenido duplicado e indexar URLs innecesarias que dispersan la autoridad de tu sitio.' },
    { q: '¿Cuánto tiempo tarda en verse el impacto del SEO en Tiendanube?', a: 'Las optimizaciones técnicas e indexación toman entre 2 y 4 semanas. El incremento de tráfico orgánico y ventas suele manifestarse a partir del segundo mes de trabajo continuo.' },
    { q: '¿Cómo afecta la velocidad del tema elegido en Tiendanube?', a: 'La plantilla de Tiendanube y las apps conectadas impactan directamente en el Largest Contentful Paint (LCP). Optimizar imágenes pesadas a formato WebP y depurar scripts diferidos eleva tu tasa de conversión hasta un 30%.' },
    { q: '¿Puedo integrar Google Search Console y GA4 en mi Tiendanube?', a: 'Sí. Realizamos la integración profesional de GSC y Google Analytics 4 con el protocolo de Comercio Electrónico Mejorado para medir exactamente qué búsquedas generan compras.' }
  ];

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setLeadForm({ name: '', email: '', storeUrl: '' });
    }, 2500);
  };

  return (
    <div className="text-on-surface font-body min-h-screen bg-background selection:bg-cyan-500/30 selection:text-white">
      <Helmet>
        <title>SEO para Tiendanube | Posicionamiento y Auditoría - SEO Growthers</title>
        <meta name="description" content="Escalá las ventas orgánicas de tu Tiendanube sin depender 100% de la pauta. Optimización SEO técnica, velocidad, estructura de categorías y marcado Schema en Argentina." />
        <link rel="canonical" href="https://seogrowthers.com/services/ecommerce/tiendanube" />
        <meta property="og:title" content="SEO para Tiendanube | Posicionamiento Orgánico de Élite" />
        <meta property="og:description" content="Aumentá el tráfico orgánico de tu Tiendanube sin depender exclusivamente de Meta o Google Ads. Estrategias comprobadas con +140% de crecimiento." />
        <meta property="og:url" content="https://seogrowthers.com/services/ecommerce/tiendanube" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* HERO SECTION */}
        <section className="mb-20 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 backdrop-blur-md">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="font-label text-xs tracking-[0.2em] text-cyan-400 uppercase font-extrabold">
              Especialización Oportunidad A+ • Tiendanube
            </span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Escalá las ventas orgánicas de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Tiendanube</span> sin depender 100% de la pauta
          </h1>

          <p className="max-w-3xl text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
            Optimizamos la arquitectura técnica, velocidad de plantilla e indexabilidad de tu Tiendanube para dominar las búsquedas transaccionales en Google y bajar drásticamente tu costo de adquisición (CAC).
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              "Arquitectura Sin Contenido Duplicado",
              "Plantilla & LCP en Verde (< 1.5s)",
              "Tracking Avanzado GA4 & GSC",
              "Schema Markup Product/Offer"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low/80 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-white">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA BLOCK & LEAD MAGNET */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low/90 border border-cyan-500/20 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            <div className="max-w-xl">
              <span className="text-[11px] font-headline font-bold text-cyan-400 uppercase tracking-[0.2em] block mb-1">AUDITORÍA EXPRESS GRATUITA</span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Analizamos los 15 puntos clave de tu Tiendanube</h2>
              <p className="text-xs md:text-sm text-slate-300 font-light mt-1">Recibí un diagnóstico técnico en 5 minutos con las oportunidades de posicionamiento inmediatas.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20una%20Auditor%C3%ADa%20Express%20para%20mi%20Tiendanube"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackWhatsAppClick('tiendanube_hero_cta'); trackCTAClick('tiendanube_express_audit'); }}
                className="flex-1 md:flex-initial bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-6 py-3.5 rounded-xl font-headline font-black text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all hover:scale-105"
              >
                <span>Auditoría Express (5 Min)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 md:flex-initial border border-cyan-400/40 text-cyan-400 px-6 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-cyan-400/10 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Checklist PDF CyberMonday</span>
              </button>
            </div>
          </div>
        </section>

        {/* CONTENIDO CLAVE DE OPTIMIZACIÓN EN TIENDANUBE */}
        <section className="mb-20 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-label text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold block mb-2">Puntos Críticos de Acción</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Ingeniería SEO Diseñada Específicamente para Tiendanube
            </h2>
            <p className="text-slate-300 mt-4 text-base font-light">
              Superamos las limitaciones nativas de la plataforma con técnicas de indexación limpia, control de canibalización y aceleración de carga.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">1. Optimización de Arquitectura y Canónicas</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Estructuramos árboles de categorías y etiquetas inteligentes sin generar contenido duplicado. Implementamos reglas canónicas estrictas para variantes de talles, colores y parámetros de ordenación en Tiendanube.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Control de indexación en filtros faceted</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Jerarquía semántica de H1, H2 y descripciones</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">2. Velocidad de Carga & Optimización de Temas</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Reducimos el peso de la plantilla reemplazando recursos obsoletos, aplicando compresión WebP automatizada y difiriendo scripts de aplicaciones externas para mantener tu LCP por debajo de 1.5 segundos.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Core Web Vitals en verde en celulares</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Reducción del porcentaje de rebote en campañas</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">3. Tracking Avanzado con GSC & Analytics 4</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Configuración adecuada de Google Search Console y GA4 Comercio Electrónico Mejorado. Medimos qué palabras clave generan compras reales y calculamos el ROI orgánico exacto.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Embudos de conversión y abandono de carrito</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Informes mensuales de atribución orgánica</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">4. Marcado Schema.org & Rich Snippets</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Inyectamos código de datos estructurados (Product, Offer, AggregateRating, InStock) para destacar precios, calificaciones con estrellas y disponibilidad directamente en los resultados de Google.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Mayor CTR en búsquedas transaccionales</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Elegibilidad para resultados enriquecidos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CASO DE ESTUDIO PRÁCTICO */}
        <section className="mb-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30">
          <div className="max-w-4xl">
            <span className="text-xs font-headline font-bold text-cyan-400 uppercase tracking-[0.2em] block mb-2">CASO DE ÉXITO EMPÍRICO</span>
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-white mb-4">
              "Cómo aumentamos un +140% el tráfico orgánico de una tienda de indumentaria en Tiendanube"
            </h2>
            <p className="text-slate-300 leading-relaxed font-light mb-8 text-sm md:text-base">
              Mediante la reestructuración de la taxonomía de categorías, optimización de atributos alt en imágenes de producto y la eliminación de canibalización de palabras clave, logramos duplicar las ventas de fuente orgánica en 90 días.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-xs text-slate-400 font-bold block">CRECIMIENTO TRÁFICO</span>
                <span className="text-3xl font-black text-cyan-400">+140% Orgánico</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">DISMINUCIÓN CAC</span>
                <span className="text-3xl font-black text-emerald-400">-35% Costo Adquisición</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">TIEMPO DE RESULTADOS</span>
                <span className="text-3xl font-black text-purple-400">90 Días</span>
              </div>
            </div>
          </div>
        </section>

        {/* ENLACE VERTICAL HACIA PÁGINA PILAR E-COMMERCE */}
        <section className="mb-20 p-6 rounded-2xl bg-surface-container-low border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-white text-base">¿Querés explorar soluciones de E-Commerce generales?</h3>
              <p className="text-slate-400 text-xs">Descubrí nuestra estrategia integral para tiendas online y plataformas a medida.</p>
            </div>
          </div>

          <Link
            to="/services/ecommerce"
            className="text-xs font-headline font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Ver Hub E-Commerce</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-8">Preguntas Frecuentes sobre SEO en Tiendanube</h2>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>

      {/* MODAL LEAD MAGNET CHECKLIST PDF */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-cyan-500/30 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-cyan-400" />
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-cyan-400">Descarga Gratuita PDF</span>
              </div>

              <h3 className="font-headline text-xl font-bold text-white mb-2">
                Checklist PDF: 15 Puntos para Auditar tu Tiendanube antes de CyberMonday
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-light mb-6">
                Ingresá tu correo corporativo y URL de tienda para recibir inmediatamente el checklist técnico para elevar tus ventas orgánicas.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-sm font-bold">
                  ✓ ¡Checklist enviado con éxito! Revisá tu bandeja de entrada.
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Nombre</label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="tu@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">URL de tu Tiendanube</label>
                    <input
                      type="url"
                      required
                      value={leadForm.storeUrl}
                      onChange={(e) => setLeadForm({ ...leadForm, storeUrl: e.target.value })}
                      placeholder="https://tutienda.mitiendanube.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-headline font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                  >
                    Obtener PDF Gratis
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcommerceTiendanubePage;
