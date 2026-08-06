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
  Link2,
  ArrowUpRight,
  RefreshCw
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

const EcommerceMercadoShopsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', storeUrl: '' });
  const [submitted, setSubmitted] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO para MercadoShops",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Servicio de SEO técnico y sincronización de catálogo para MercadoShops en Argentina. Posicioná tu tienda independiente aprovechando la autoridad de Mercado Libre.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "E-Commerce SEO & Marketplace Optimization"
  };

  const faqs = [
    { q: '¿Cómo beneficia el ecosistema de Mercado Libre al SEO de MercadoShops?', a: 'MercadoShops aprovecha la sincronización de inventario y datos estructurados de Mercado Libre. Optimizar correctamente los títulos y atributos permite posicionar directamente las publicaciones en la búsqueda orgánica de Google.' },
    { q: '¿Qué ocurre con las URLs parametrizadas en MercadoShops?', a: 'MercadoShops tiende a generar parámetros complejos en URLs de categorías y búsquedas. Auditamos e inyectamos directivas canónicas para consolidar la autoridad de tus páginas de producto principales.' },
    { q: '¿Puedo conectar un dominio propio en MercadoShops?', a: 'Sí. Configurar tu dominio propio de forma adecuada permite construir un activo de marca independiente mientras mantenés la logística de Flex y Mercado Envíos.' },
    { q: '¿Es conveniente migrar de MercadoShops a Tiendanube o tienda propia?', a: 'Si requerís control total de datos de clientes y mayor autonomía SEO, diseñamos la estrategia de migración con Redirecciones 301 para no perder la autoridad acumulada.' }
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
        <title>SEO para MercadoShops | Posicionamiento & Sincronización - SEO Growthers</title>
        <meta name="description" content="Posicioná tu MercadoShops en Google y sincronizá tu catálogo con Mercado Libre. Optimización SEO On-Page para fichas, URLs parametrizadas y estrategia híbrida en Argentina." />
        <link rel="canonical" href="https://seogrowthers.com/services/ecommerce/mercadoshops" />
        <meta property="og:title" content="SEO para MercadoShops | Posicioná tu Tienda en Google" />
        <meta property="og:description" content="Aprovechá la autoridad del ecosistema Mercado Libre. Optimización de títulos, fichas HTML y canónicas en MercadoShops." />
        <meta property="og:url" content="https://seogrowthers.com/services/ecommerce/mercadoshops" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* HERO SECTION */}
        <section className="mb-20 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 backdrop-blur-md">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="font-label text-xs tracking-[0.2em] text-amber-400 uppercase font-extrabold">
              Especialización Oportunidad A+ • MercadoShops
            </span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Posicioná tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">MercadoShops</span> en Google y sincronizá tu catálogo con Mercado Libre
          </h1>

          <p className="max-w-3xl text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
            Maximizá el alcance orgánico de tu catálogo sincronizado. Optimizado para dominar la búsqueda de productos en Google Shopping y posicionamiento directo en búsquedas comerciales.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              "Estrategia Híbrida MeLi + Shop",
              "SEO On-Page para Fichas",
              "Solución a URLs Parametrizadas",
              "Sincronización de Stock & Precios"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low/80 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-white">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA BLOCK & LEAD MAGNET */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low/90 border border-amber-500/20 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            <div className="max-w-xl">
              <span className="text-[11px] font-headline font-bold text-amber-400 uppercase tracking-[0.2em] block mb-1">AUDITORÍA EXPRESS GRATUITA</span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Analizamos las fichas de producto de tu MercadoShops</h2>
              <p className="text-xs md:text-sm text-slate-300 font-light mt-1">Recibí una evaluación técnica de 5 minutos para optimizar títulos, canónicas e indexación.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20una%20Auditor%C3%ADa%20Express%20para%20mi%20MercadoShops"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackWhatsAppClick('mercadoshops_hero_cta'); trackCTAClick('mercadoshops_express_audit'); }}
                className="flex-1 md:flex-initial bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 px-6 py-3.5 rounded-xl font-headline font-black text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
              >
                <span>Auditoría Express (5 Min)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 md:flex-initial border border-amber-400/40 text-amber-400 px-6 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-amber-400/10 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Checklist PDF CyberMonday</span>
              </button>
            </div>
          </div>
        </section>

        {/* CONTENIDO CLAVE DE OPTIMIZACIÓN EN MERCADOSHOPS */}
        <section className="mb-20 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-label text-xs tracking-[0.2em] text-amber-400 uppercase font-bold block mb-2">Pilares de Optimización</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Estrategia SEO Integral para MercadoShops
            </h2>
            <p className="text-slate-300 mt-4 text-base font-light">
              Combinamos el poder transaccional del marketplace de Mercado Libre con las mejores prácticas de posicionamiento web independiente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 font-bold">
                <Link2 className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">1. Estrategia Híbrida MeLi + MercadoShops</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Explotamos la alta autoridad de dominio del ecosistema de Mercado Libre alineando los títulos de tus publicaciones con la búsqueda de tu tienda propia MercadoShops.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Sincronización transparente de inventario y envíos Flex</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Tráfico orgánico directo a tu dominio personalizado</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">2. SEO On-Page para Fichas de Producto</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Optimizamos los títulos comerciales, descripciones HTML estructuradas y fichas técnicas de tus productos para asegurar la máxima visibilidad en Google Shopping y orgánico.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400" /> Palabras clave de intención de compra en títulos</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400" /> Estructura limpia de atributos y variaciones</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">3. Solución a URLs Parametrizadas y Canónicas</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Corregimos la dispersión de autoridad causada por URLs con parámetros de filtrado. Implementamos soluciones de canónicas limpias para consolidar la fuerza SEO de tu tienda.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Eliminación de URLs duplicadas en la indexación</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Consolidación de autoridad de producto</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 font-bold">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white mb-3">4. Planes de Migración & Coexistencia</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                Si requerís evaluar alternativas o migrar hacia una tienda propia (Tiendanube o React), ejecutamos mapeos de Redirecciones 301 masivas para garantizar 0 pérdida de autoridad acumulada.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Preservación de rankings comerciales</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Sincronización fluida sin interrupción operativa</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ENLACE VERTICAL HACIA PÁGINA PILAR E-COMMERCE */}
        <section className="mb-20 p-6 rounded-2xl bg-surface-container-low border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-white text-base">¿Querés comparar con otras soluciones E-Commerce?</h3>
              <p className="text-slate-400 text-xs">Revisá nuestro Hub de Soluciones eCommerce y estrategias para Tiendanube y tiendas a medida.</p>
            </div>
          </div>

          <Link
            to="/services/ecommerce"
            className="text-xs font-headline font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Ver Hub E-Commerce</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-8">Preguntas Frecuentes sobre SEO en MercadoShops</h2>
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
              className="bg-slate-900 border border-amber-500/30 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-amber-400" />
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-amber-400">Descarga Gratuita PDF</span>
              </div>

              <h3 className="font-headline text-xl font-bold text-white mb-2">
                Checklist PDF: 15 Puntos para Auditar tu MercadoShops antes de CyberMonday
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-light mb-6">
                Ingresá tu correo y URL para recibir de inmediato la guía técnica con los 15 puntos críticos para maximizar las ventas de tu tienda.
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">URL de tu MercadoShops</label>
                    <input
                      type="url"
                      required
                      value={leadForm.storeUrl}
                      onChange={(e) => setLeadForm({ ...leadForm, storeUrl: e.target.value })}
                      placeholder="https://tutienda.mercadoshops.com.ar"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-headline font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
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

export default EcommerceMercadoShopsPage;
