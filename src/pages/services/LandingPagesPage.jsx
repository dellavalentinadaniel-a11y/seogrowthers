import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';
import {
  Zap,
  Target,
  Smartphone,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Code2,
  TrendingUp,
  Layers,
  Sparkles,
  ChevronDown,
  DollarSign,
  AlertTriangle,
  Award
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

const LandingPagesPage = () => {
  const [activeTab, setActiveTab] = useState('tipologias');
  const [activeCase, setActiveCase] = useState('a1');
  const [currency, setCurrency] = useState('usd');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño y Arquitectura de Landing Pages",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Diseño profesional de landing pages de alta conversión en Argentina. Optimizadas para campañas publicitarias, captura de leads y ventas.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "offers": {
      "@type": "Offer",
      "price": "800",
      "priceCurrency": "USD",
      "description": "Landing page de alta conversión con dominio, hosting y SSL incluido"
    },
    "serviceType": "Landing Page Design & CRO Architecture"
  };

  const faqs = [
    { q: '¿Qué incluye exactamente el diseño de landing page?', a: 'Incluye arquitectura de 1 página de alta conversión, optimización responsive mobile-first, dominio y hosting por 1 año, certificado SSL, 1 correo corporativo, SEO on-page básico y botón flotante de WhatsApp.' },
    { q: '¿Cuánto tiempo tarda en estar lista mi landing page?', a: 'El tiempo promedio de entrega es de 7 a 14 días hábiles desde la recepción del contenido e insumos de marca.' },
    { q: '¿Es compatible con campañas de Google Ads y Facebook Ads?', a: 'Absolutamente. Nuestras landing pages están estructuradas específicamente para elevar el Quality Score de Google Ads y maximizar el retorno de inversión en Meta Ads.' },
    { q: '¿Puedo actualizar textos e imágenes en el futuro?', a: 'Sí, incluimos un panel de gestión intuitivo para que actualices contenido sin necesidad de saber programación.' },
    { q: '¿Qué diferencia a una landing page de un sitio web corporativo completo?', a: 'Una landing page se enfoca en un único objetivo de conversión (lead o venta) con 0 distracciones. Un sitio corporativo abarca múltiples secciones para brindar presencia institucional completa.' }
  ];

  return (
    <div className="text-on-surface font-body min-h-screen bg-background selection:bg-cyan-500/30 selection:text-white">
      <Helmet>
        <title>Diseño de Landing Pages | Alta Conversión - SEO Growthers</title>
        <meta name="description" content="Diseño profesional de landing pages de alta conversión en Argentina. Optimizadas para campañas de Google Ads, captura de leads y ventas. Desde $800 USD." />
        <link rel="canonical" href="https://seogrowthers.com/services/landing-pages" />
        <meta property="og:title" content="Diseño de Landing Pages | SEO Growthers" />
        <meta property="og:description" content="Landing pages optimizadas para convertir visitantes en clientes. Diseño responsive, SEO y carga rápida." />
        <meta property="og:url" content="https://seogrowthers.com/services/landing-pages" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* HERO SECTION */}
        <section className="mb-20 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-label text-xs tracking-[0.2em] text-cyan-400 uppercase font-extrabold">
              Arquitectura CRO & Landing Pages 2026
            </span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Diseño Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Landing Page</span>
          </h1>

          <p className="max-w-3xl text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
            Creamos landing pages de alto impacto visual e ingeniería de conversión. Diseñadas para convertir visitantes fríos en leads cualificados y ventas inmediatas.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              "1 Página de Alta Conversión",
              "Carga Ultrarrápida (< 1.5s)",
              "Dominio, Hosting & SSL 1 año",
              "Integración WhatsApp & CRM"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low/80 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-white">{item}</span>
              </div>
            ))}
          </div>

          {/* Hero Call to Action Block */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low/90 border border-cyan-500/20 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            <div className="max-w-xl">
              <span className="text-[11px] font-headline font-bold text-cyan-400 uppercase tracking-[0.2em] block mb-1">IMPULSÁ TU NEGOCIO</span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">¿Listo para maximizar tus conversiones?</h2>
              <p className="text-xs md:text-sm text-slate-300 font-light mt-1">Diseñamos la landing page estratégica y optimizada que tu marca necesita para captar clientes.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20landing%20page"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackWhatsAppClick('landing_pages_page'); trackCTAClick('landing_pages_hero_cta'); }}
                className="flex-1 md:flex-initial bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-6 py-3.5 rounded-xl font-headline font-black text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all hover:scale-105"
              >
                <span>Solicitar Presupuesto</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/auditoria-seo-gratis"
                className="flex-1 md:flex-initial border border-white/20 text-white px-6 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all bg-white/5 text-center"
              >
                Auditoría Gratuita
              </Link>
            </div>
          </div>
        </section>

        {/* NAVEGACIÓN INTERACTIVA DE INFORME TÉCNICO */}
        <section className="mb-20">
          <div className="border-b border-white/10 flex flex-wrap gap-4 mb-10">
            {[
              { id: 'tipologias', label: 'Tipologías & Embudo', icon: Layers },
              { id: 'tecnica', label: 'Performance & Vitals', icon: Zap },
              { id: 'casos', label: 'Casos & Migraciones', icon: TrendingUp },
              { id: 'precios', label: 'Matriz de Inversión', icon: DollarSign }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-4 font-headline text-xs md:text-sm uppercase tracking-widest font-bold flex items-center gap-2 transition-all relative ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CONTENIDO SEGÚN PESTAÑA */}
          <div className="bg-surface-container-low/40 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl">
            
            {/* TUPOLOGÍAS */}
            {activeTab === 'tipologias' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
                <div>
                  <h2 className="font-headline text-2xl md:text-4xl font-bold text-white mb-3">
                    Arquitectura y Tipologías de Conversión
                  </h2>
                  <p className="text-slate-300 font-light text-base md:text-lg">
                    Cada landing page responde a una etapa específica del embudo de ventas. Diseñamos la estructura exacta según la intención de tu tráfico.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 font-bold text-xl">01</div>
                    <h3 className="font-bold text-white text-lg mb-2">Captación de Leads (B2B / Servicios)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Enfoque en formularios cualificados, lead magnets de alto valor (PDF, plantillas) y prueba social contundente.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 font-bold text-xl">02</div>
                    <h3 className="font-bold text-white text-lg mb-2">Conversión Directa (Ventas / Ads)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Estructura transaccional sin puntos de fuga. Matriz de beneficios, llamado a la acción visible y ofertas por tiempo limitado.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 font-bold text-xl">03</div>
                    <h3 className="font-bold text-white text-lg mb-2">Sub-hubs SEO (Categorías)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Landing pages optimizadas orgánicamente para captar intenciones comerciales específicas en Google con marcado Schema.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PERFORMANCE Y VITALS */}
            {activeTab === 'tecnica' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
                <div>
                  <h2 className="font-headline text-2xl md:text-4xl font-bold text-white mb-3">
                    Performance y Core Web Vitals Extremos
                  </h2>
                  <p className="text-slate-300 font-light text-base">
                    La velocidad de carga no es solo experiencia de usuario: es el factor #1 en el nivel de calidad de Google Ads y conversión móvil.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
                    <div className="text-4xl font-black text-emerald-400 mb-2">&lt; 1.5s</div>
                    <div className="font-label text-xs uppercase tracking-wider text-slate-400 font-bold">Carga LCP Ideal</div>
                    <p className="text-xs text-slate-500 mt-2">Evita el rebote de usuarios en redes móviles.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-center">
                    <div className="text-4xl font-black text-cyan-400 mb-2">75%+</div>
                    <div className="font-label text-xs uppercase tracking-wider text-slate-400 font-bold">Tráfico Móvil</div>
                    <p className="text-xs text-slate-500 mt-2">Maquetación responsive Mobile-First nativa.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 text-center">
                    <div className="text-4xl font-black text-purple-400 mb-2">10/10</div>
                    <div className="font-label text-xs uppercase tracking-wider text-slate-400 font-bold">Google Ads Quality Score</div>
                    <p className="text-xs text-slate-500 mt-2">Relevancia de destino para reducir el CPC.</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Checklist de Optimización Técnica Incluido:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Indexabilidad Semántica:</strong> HTML5 semántico limpio y metadatos adaptados a buscadores.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Datos Estructurados:</strong> Marcado Schema.org (Product, Offer, FAQPage) integrado.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Control Canónico:</strong> Etiquetas rel="canonical" para evitar duplicados.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Optimización de Recursos:</strong> Imágenes WebP de última generación y scripts diferidos.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CASOS Y MIGRACIONES */}
            {activeTab === 'casos' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
                <div>
                  <h2 className="font-headline text-2xl md:text-4xl font-bold text-white mb-3">
                    Transición de Plataformas y Caso de Éxito
                  </h2>
                  <p className="text-slate-300 font-light text-base">
                    Analizamos las migraciones críticas de ecosistemas y el impacto directo en resultados comerciales.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveCase('a1')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      activeCase === 'a1' ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Caso A1: Escala sin Pauta
                  </button>
                  <button
                    onClick={() => setActiveCase('a2')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      activeCase === 'a2' ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Caso A2: Migración MercadoShops / Tiendanube
                  </button>
                </div>

                {activeCase === 'a1' ? (
                  <div className="bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-cyan-500/20 space-y-4">
                    <h3 className="text-xl font-bold text-white">Resultados Medidos en Landing de Alta Conversión</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Implementación de landing page transaccional con velocidad de respuesta extrema (LCP 0.7s) y optimización de llamados a la acción por WhatsApp.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-xs text-slate-500 font-bold block">INCREMENTO EN LEADS</span>
                        <span className="text-2xl font-bold text-cyan-400">+140% Conversión</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 font-bold block">TIEMPO DE RESPUESTA</span>
                        <span className="text-2xl font-bold text-emerald-400">&lt; 1 segundo</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-amber-500/20 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Transición Crítica de Plataforma</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Migración Hacia Ecosistema Propio</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Ante cierres o limitaciones de marketplaces cerrados, la migración a una plataforma propia (React / Next.js / Tiendanube / WooCommerce) preserva la autoridad SEO con Redirecciones 301 masivas.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* PRECIOS Y COMPARATIVA */}
            {activeTab === 'precios' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="font-headline text-2xl md:text-4xl font-bold text-white mb-1">
                      Matriz de Inversión y Comparativa
                    </h2>
                    <p className="text-slate-400 text-sm">Transparencia de costos según escala y tipo de proveedor en Argentina.</p>
                  </div>

                  <div className="inline-flex bg-slate-900 p-1.5 rounded-2xl border border-white/10">
                    <button
                      onClick={() => setCurrency('ars')}
                      className={`px-5 py-2.5 rounded-xl text-xs font-headline font-bold transition-all ${
                        currency === 'ars' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Precios en ARS
                    </button>
                    <button
                      onClick={() => setCurrency('usd')}
                      className={`px-5 py-2.5 rounded-xl text-xs font-headline font-bold transition-all ${
                        currency === 'usd' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Referencia USD
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-stretch pt-4">
                  
                  {/* CARD 1 */}
                  <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <h3 className="font-headline font-bold text-white text-xl mb-4">LP Inicial / Plantilla</h3>
                      <div className="text-3xl font-black text-white mb-6">
                        {currency === 'ars' ? '$150k - $300k' : 'USD 150 - 300'}
                      </div>
                      <ul className="text-sm text-slate-300 space-y-3 mb-8">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>Basada en maquetadores (Wix/WP)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>Formulario básico</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>Diseño responsive estándar</span>
                        </li>
                      </ul>
                    </div>
                    <span className="text-xs text-slate-500 font-light block pt-4 border-t border-white/5">
                      Opción ideal para validación rápida.
                    </span>
                  </div>

                  {/* CARD 2 - RECOMENDADO */}
                  <div className="bg-slate-900 p-8 rounded-3xl border-2 border-amber-500 flex flex-col justify-between relative shadow-[0_0_35px_rgba(245,158,11,0.2)] transform md:-translate-y-2">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[11px] font-headline font-black px-5 py-1 rounded-full uppercase tracking-widest shadow-md">
                      RECOMENDADO
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-white text-xl mb-4 mt-2">Profesional a Medida</h3>
                      <div className="text-3xl font-black text-white mb-6">
                        {currency === 'ars' ? '$200k - $500k' : 'USD 300 - 900'}
                      </div>
                      <ul className="text-sm text-slate-200 space-y-3 mb-8">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>Desarrollo en Next.js o WP Optimizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>SEO Técnico Avanzado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>Core Web Vitals en Verde</span>
                        </li>
                      </ul>
                    </div>
                    <span className="text-xs text-amber-300/90 font-medium block pt-4 border-t border-white/10">
                      Enfoque en alta conversión y escalabilidad.
                    </span>
                  </div>

                  {/* CARD 3 */}
                  <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <h3 className="font-headline font-bold text-white text-xl mb-4">eCommerce / Sub-hub</h3>
                      <div className="text-3xl font-black text-white mb-6">
                        {currency === 'ars' ? '$490k - $1.2M' : 'USD 500 - 1200'}
                      </div>
                      <ul className="text-sm text-slate-300 space-y-3 mb-8">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>Configuración Tiendanube Avanzada</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>Inyección de Schema Markup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>Auditoría de Canibalización SEO</span>
                        </li>
                      </ul>
                    </div>
                    <span className="text-xs text-slate-500 font-light block pt-4 border-t border-white/5">
                      Orientado a facturación masiva.
                    </span>
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* BANNER CTA FINAL */}
        <section className="text-center p-10 md:p-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4">
              ¿Listo para multiplicar las conversiones de tu negocio?
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-8 font-light leading-relaxed">
              Solicitá hoy tu presupuesto personalizado y recibí una consultoría preliminar gratuita sobre la arquitectura de tu landing page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20cotizar%20una%20landing%20page"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('landing_pages_bottom_cta')}
                className="bg-cyan-400 text-slate-950 font-headline font-black px-8 py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
              >
                Solicitar por WhatsApp
              </a>
              <Link
                to="/contact"
                className="border border-white/20 text-white font-headline font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-xs hover:border-cyan-400 hover:text-cyan-400 transition-all bg-white/5"
              >
                Formulario de Contacto
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPagesPage;
