import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import LeadQualifierForm from '@/components/contact/LeadQualifierForm';
import GoogleBusinessReviews from '@/components/shared/GoogleBusinessReviews';
import SocialReelsCarousel from '@/components/carousels/SocialReelsCarousel';
import VideoReelsPair from '@/components/shared/VideoReelsGrid';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';
import {
  Megaphone,
  MagnifyingGlass as Search,
  Target,
  TrendUp as TrendingUp,
  Mouse as MousePointerClick,
  Envelope,
  DeviceMobile,
  Star,
  CheckCircle,
  ArrowRight,
  Lightning,
  ChartBar as BarChart,
  Sparkle,
  Stack as Layers,
  CaretRight,
  Question as Help,
  Plus,
  Minus,
  ShieldCheck,
  Play,
} from '@phosphor-icons/react';

const channels = [
  { icon: Search, title: 'SEO On-Page', desc: 'Optimización técnica y de contenido para aparecer en Google.', link: '/services/seo-neuquen' },
  { icon: Target, title: 'Google Ads (SEM)', desc: 'Campañas segmentadas para aparecer en búsquedas inmediatas.', link: null },
  { icon: Megaphone, title: 'Social Ads', desc: 'Publicidad en Facebook, Instagram y LinkedIn con segmentación precisa.', link: null },
  { icon: TrendingUp, title: 'Data Analytics', desc: 'Medición exhaustiva de cada peso invertido en marketing.', link: null },
  { icon: MousePointerClick, title: 'CRO', desc: 'Mejoramos tu web para que convierta más visitantes en clientes.', link: null },
  { icon: Envelope, title: 'Email Marketing', desc: 'Automatización de flujos para nutrir y convertir leads.', link: null },
  { icon: DeviceMobile, title: 'Mobile First', desc: 'Estrategias pensadas para el dispositivo más usado.', link: null },
  { icon: Star, title: 'Reputación Online', desc: 'Gestión de reseñas y presencia en Google Maps.', link: null },
];

const faqs = [
  { q: '¿Qué incluye el servicio de Marketing Digital?', a: 'Incluye estrategia SEO completa, gestión de campañas SEM (Google Ads), community management en redes sociales, email marketing automatizado y reportes mensuales con métricas de rendimiento. Todo personalizado según tu industria.' },
  { q: '¿En cuánto tiempo veo resultados?', a: 'Las campañas de pago (SEM/Social Ads) generan resultados inmediatos desde el primer día. El SEO orgánico muestra resultados significativos entre 3 y 6 meses, con un crecimiento sostenido a largo plazo.' },
  { q: '¿Cuánto hay que invertir en publicidad?', a: 'Recomendamos un mínimo de $100-300 USD mensuales en pauta publicitaria para campañas de Google Ads o Social Ads. El monto ideal depende de tu industria, competencia y objetivos de conversión.' },
  { q: '¿Cómo miden el retorno de inversión?', a: 'Implementamos tracking completo con GA4, conversion tracking, UTM parameters y dashboards personalizados. Cada mes recibís un reporte detallado con métricas de rendimiento y ROI.' },
  { q: '¿Trabajan con empresas pequeñas?', a: 'Sí, trabajamos con empresas de todos los tamaños. Adaptamos las estrategias y presupuestos a la escala de cada negocio, desde emprendedores hasta empresas establecidas.' },
];

const methodologySteps = [
  {
    step: "01",
    icon: BarChart,
    title: "Diagnóstico & Setup",
    desc: "Auditoría profunda del mercado, configuración de tracking avanzado y definición de KPIs clave para tu negocio."
  },
  {
    step: "02",
    icon: Sparkle,
    title: "Estrategia Multicanal",
    desc: "Planificación táctica orientada a ROI, seleccionando los canales con mayor potencial de conversión."
  },
  {
    step: "03",
    icon: Lightning,
    title: "Lanzamiento & Ejecución",
    desc: "Puesta en marcha de campañas y optimización SEO técnica con un enfoque agresivo en resultados."
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Optimización & Escala",
    desc: "Refinamiento continuo basado en datos para maximizar el retorno y escalar tu presencia digital."
  }
];

const pipelineReelsData = {
  reel1: {
    videoSrc: '/videos/reels/seogrowthers_promo.mp4',
    title: 'Ecosistemas SEO y Pipelines de Crecimiento Algorítmico',
    subtitle: 'SEO GROWTHERS OFICIAL',
    handle: '@seogrowthers',
    url: 'https://www.instagram.com/seogrowthers/',
    platform: 'Instagram',
    tag: 'REEL ESTRATÉGICO',
    accent: 'from-pink-500 via-rose-500 to-amber-500'
  },
  reel2: {
    videoSrc: '/videos/reels/crea_un_video_promocionando_lo.mp4',
    title: 'Estrategias de Pauta, Inteligencia Artificial y Machine Learning',
    subtitle: 'PERFORMANCE ADS',
    handle: '@seogrowthers',
    url: 'https://www.instagram.com/seogrowthers/',
    platform: 'Instagram',
    tag: 'PAUTA & CRO',
    accent: 'from-cyan-400 to-blue-600'
  }
};

const casesReelsData = {
  reel1: {
    videoSrc: '/videos/reels/aluvalle_30s_HQ.mp4',
    title: 'Campaña y Captación de Leads para Aluvalle Aberturas',
    subtitle: 'CASO DE ÉXITO VERIFICADO',
    handle: '@aluvalle.sas',
    url: 'https://www.instagram.com/aluvalle.sas/',
    platform: 'Instagram',
    tag: 'CLIENTE REAL',
    accent: 'from-emerald-400 via-teal-400 to-cyan-500'
  },
  reel2: {
    videoSrc: '/videos/reels/chrons_30s_HQ.mp4',
    title: 'Producción Audiovisual, Streaming y Formatos de Alto Impacto',
    subtitle: 'CONTENT ENGINE',
    handle: '@ChronsGamingtv',
    url: 'https://www.youtube.com/@ChronsGamingtv',
    platform: 'YouTube',
    tag: 'YOUTUBE 4K',
    accent: 'from-red-500 to-orange-500'
  }
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
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
          {isOpen ? <Minus weight="duotone" className="w-5 h-5" /> : <Plus weight="duotone" className="w-5 h-5" />}
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

const MarketingDigitalPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marketing Digital",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Servicios de marketing digital en Argentina: SEO, SEM, Social Ads, Email Marketing y Analytics. Estrategias orientadas a resultados y ROI medible.",
    "areaServed": [
      { "@type": "Country", "name": "Argentina" },
      { "@type": "AdministrativeArea", "name": "Neuquén" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Marketing Digital",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Orgánico" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads (SEM)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Ads" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email Marketing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Analytics y Reportes" } }
      ]
    },
    "serviceType": "Digital Marketing"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className="text-on-surface font-body text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Marketing Digital en Neuquén | SEO, Google Ads y Redes Sociales</title>
        <meta name="description" content="Agencia de marketing digital en Neuquén: SEO orgánico, Google Ads, Social Ads y email marketing. Estrategias con ROI medible desde el día 1. ¡Solicitá tu auditoría gratis!" />
        <link rel="canonical" href="https://seogrowthers.com/services/marketing-digital" />
        <link rel="preload" href="/images/fondo/site-background.webp" as="image" />
        <meta property="og:title" content="Marketing Digital en Neuquén | SEO Growthers" />
        <meta property="og:description" content="Agencia de marketing digital en Neuquén: SEO, Google Ads, Social Ads y Analytics. ROI medible desde el día 1." />
        <meta property="og:url" content="https://seogrowthers.com/services/marketing-digital" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Marketing Digital en Neuquén | SEO Growthers" />
        <meta name="twitter:description" content="Agencia de marketing digital en Neuquén: SEO, Google Ads, Social Ads y Analytics. ROI medible desde el día 1." />
        <meta name="keywords" content="marketing digital neuquen, agencia SEO argentina, google ads neuquen, social ads, email marketing argentina" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>


      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/marketing-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability, smoothly fading to transparent at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0D0D]/80 via-[#0C0D0D]/60 to-transparent" />

        <div className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <Breadcrumbs className="mb-8" />

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Estrategias ROI-Driven</span>
                <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-none">
                  Marketing Digital <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    de Alta Ingeniería
                  </span>
                </h1>
                <p className="max-w-xl text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10">
                  No operamos con suposiciones. Construimos pipelines de adquisición basados en datos, SEO técnico de élite y pauta publicitaria optimizada matemáticamente.
                </p>

                <div className="space-y-4 mb-12">
                  {["SEO Algorítmico Avanzado", "Ads con Machine Learning", "Arquitectura de Conversión (CRO)", "Atribución de Datos GA4"].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="flex items-center gap-3 text-base font-medium text-slate-200"
                    >
                      <CheckCircle weight="duotone" className="w-5 h-5 text-cyan-400" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-5">
                  <a
                    href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20marketing%20digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { trackWhatsAppClick('marketing_digital_page'); trackCTAClick('marketing_hero_cta'); }}
                    className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-400 transition-all hover:shadow-[0_0_25px_rgba(0,219,231,0.4)]"
                  >
                    CONSULTAR ESTRATEGIA
                    <ArrowRight weight="duotone" className="w-4 h-4" />
                  </a>
                  <Link 
                    to="/auditoria-seo-gratis" 
                    className="border border-white/10 bg-white/5 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    Auditoría SEO Gratis
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="mt-12 flex items-center gap-6 pt-8 border-t border-white/10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-cyan-900 flex items-center justify-center font-mono text-[10px] font-bold text-cyan-400">
                      +45
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-light leading-snug">
                    <span className="text-white font-bold">Casos de éxito</span> <br /> 
                    optimizados este año en Argentina.
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visual Graphic Area */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 p-4 bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
              >
                <div className="bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                    alt="Cyber Analytics Data" 
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Metric Card */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-900/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl shadow-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">CONVERSION BOOST</p>
                      <h3 className="text-4xl font-black text-white">+312%</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <TrendingUp weight="duotone" className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>

                  {/* UI Elements Decoration */}
                  <div className="absolute top-8 right-8 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative Blur */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            </div>
          </div>

          {/* Social Media & Reels Carousel Showcase */}
          <SocialReelsCarousel />
        </div>
      </section>

      <main className="pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">

        {/* 1. Investment Plans Section (Directly below Carousel) */}
        <section className="mb-32 py-12 relative overflow-hidden" id="planes">
          {/* Background Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Inversión</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">Planes de Crecimiento</h2>
            <p className="text-slate-400 text-base font-light">Estructuras de servicio diseñadas para escalar junto con tus objetivos comerciales.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {/* Plan 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Performance Pack</h3>
                <p className="text-slate-400 text-xs font-light mb-8">Ideal para negocios que buscan leads calificados de forma inmediata.</p>
                
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8">
                  <span className="text-4xl font-black text-white">$450</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">/ Mes + Inversión</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Gestión de Google Ads (Search/Display)",
                    "Meta Ads (IG / FB) Focus Leads",
                    "Landing Page High-Conversion (1)",
                    "Reporte Mensual de Conversión",
                    "Acompañamiento Estratégico"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-light">
                      <CheckCircle weight="duotone" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 mt-8">
                <Link 
                  to="/services/marketing-digital/performance-pack"
                  className="w-full py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400/60 text-cyan-300 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,219,231,0.2)] group"
                >
                  <span>MÁS INFORMACIÓN / DETALLES</span>
                  <ArrowRight weight="duotone" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20Plan%20Performance" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3 rounded-xl border border-white/15 text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all text-center block"
                >
                  SOLICITAR PLAN
                </a>
              </div>
            </div>

            {/* Plan 2 - Featured */}
            <div className="p-8 rounded-3xl bg-[#0a0a0a] border-2 border-cyan-400 relative shadow-[0_0_50px_rgba(0,219,231,0.15)] flex flex-col justify-between transform lg:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 px-4 py-1 rounded-full font-mono text-[10px] font-black tracking-widest uppercase">
                MÁS POPULAR
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Growth Partner</h3>
                <p className="text-slate-400 text-xs font-light mb-8 text-balance">Nuestra solución insignia. SEO avanzado combinado con pauta inteligente para dominación total.</p>
                
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8">
                  <span className="text-4xl font-black text-white">$850</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">/ Mes + Inversión</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Todo lo incluido en Performance",
                    "Estrategia SEO Full (Content + Técnico)",
                    "2 Landing Pages de Alta Conversión",
                    "Data Analytics GA4 Pro Setup",
                    "Optimización CRO Mensual (A/B Testing)",
                    "Soporte Prioritario"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                      <Lightning weight="duotone" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0 shadow-cyan-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <Link
                  to="/services/marketing-digital/growth-partner"
                  className="w-full py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400/60 text-cyan-300 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,219,231,0.2)] group"
                >
                  <span>MÁS INFORMACIÓN / DETALLES</span>
                  <ArrowRight weight="duotone" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20Plan%20Growth" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl border border-white/15 text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all text-center block">
                  COMENZAR AHORA
                </a>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Enterprise Lab</h3>
                <p className="text-slate-400 text-xs font-light mb-8">Consultoría senior y ecosistema digital a medida para empresas líderes.</p>
                
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8">
                  <span className="text-4xl font-black text-white">Custom</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">A medida</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Departamento de Marketing Digital Out-sourced",
                    "Estrategia Omnicanal 360°",
                    "Desarrollo de Software Ad-hoc (Web/Apps)",
                    "Auditorías de Ciberseguridad & Performance",
                    "Consultoría de Negocios & BI",
                    "Account Manager Senior Dedicado"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-light">
                      <Layers weight="duotone" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20Plan%20Enterprise" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl border border-white/20 text-white font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-center">
                CONTACTAR VENTAS
              </a>
            </div>
          </div>
        </section>

        {/* 2. Metodología / Pipeline de Trabajo */}
        <section className="mb-32 py-12 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Metodología</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">Nuestro Pipeline de Trabajo</h2>
            <p className="text-slate-400 text-base font-light">Un proceso sistemático diseñado para extraer datos y transformarlos en crecimiento predecible.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {methodologySteps.map((step, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-slate-950 border border-white/5 group hover:border-cyan-400/20 transition-all">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center font-headline font-black text-cyan-400 shadow-xl">
                  {step.step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center mb-6">
                  <step.icon weight="duotone" className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-xl mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{step.desc}</p>
                {i < methodologySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                    <CaretRight weight="duotone" className="w-6 h-6 text-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Video Reels Block 1: Pipeline to Strategy Demo */}
        <VideoReelsPair
          reel1={pipelineReelsData.reel1}
          reel2={pipelineReelsData.reel2}
          sectionBadge="CONTENIDO & ESTRATEGIAS REELS"
          sectionTitle="Metodología Aplicada en Video"
        />

        {/* 4. Channels Grid: Presencia Multicanal Total */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Ecosistema Digital</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">Presencia Multicanal Total</h2>
            <p className="text-slate-400 text-base font-light">Dominamos cada touchpoint del customer journey para asegurar que tu marca sea la opción obvia.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-400/30 transition-all group"
                >
                  <Icon weight="duotone" className="text-cyan-400 w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">{item.desc}</p>
                  {item.link ? (
                    <Link to={item.link} className="text-cyan-400 text-[10px] font-black tracking-widest uppercase hover:underline inline-flex items-center gap-1">
                      DOCUMENTACIÓN <CaretRight weight="duotone" className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="text-slate-600 text-[10px] font-black tracking-widest uppercase cursor-default">
                      CONSULTORÍA DISPONIBLE
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. Video Reels Block 2: Real Clients & Cases Demo */}
        <VideoReelsPair
          reel1={casesReelsData.reel1}
          reel2={casesReelsData.reel2}
          sectionBadge="CASOS DE ÉXITO & CREACIÓN DIGITAL"
          sectionTitle="Resultados y Campañas Reales"
        />

        {/* 6. Services detail & Growth Chart */}
        <section className="mb-32 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-8">Escalabilidad <span className="text-cyan-400">Sin Techo</span></h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
              Utilizamos una combinación de ingeniería de datos y creatividad estratégica para posicionar tu marca donde tus clientes están buscando activamente soluciones.
            </p>
            <div className="space-y-8">
              {[
                { title: "SEO Orgánico de Alto Rendimiento", desc: "Optimizamos tu arquitectura para dominar las SERPs sin depender exclusivamente del gasto publicitario.", icon: Search },
                { title: "Performance Marketing (SEM/Social)", desc: "Campañas ultra-segmentadas con algoritmos de pujas automáticas para maximizar el ROAS.", icon: Target },
                { title: "Content Engine & Authority", desc: "Estrategias de contenido que no solo atraen, sino que educan y cierran la venta por vos.", icon: Sparkle },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                    <item.icon weight="duotone" className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-10 border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp weight="duotone" className="w-24 h-24 text-cyan-400" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="mb-8">
                <h4 className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase mb-2">Performance Report</h4>
                <p className="text-white font-bold text-lg">Crecimiento Promedio de Leads</p>
              </div>
              
              {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-500 w-8">{['MES 1','MES 2','MES 3','MES 4','MES 5','MES 6','MES 7'][i]}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,219,231,0.3)]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold w-12 text-right">+{h}%</span>
                </div>
              ))}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>ESTIMACIÓN BASADA EN PROYECTOS 2025</span>
                <span className="flex items-center gap-1 text-green-400"><ShieldCheck weight="duotone" className="w-3 h-3" /> VERIFICADO</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 7. Social Proof - Reviews */}
        <div className="mb-32">
          <GoogleBusinessReviews />
        </div>

        {/* FAQ Section */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Knowledge Base</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-400 text-base font-light">Respuestas técnicas y estratégicas sobre nuestra forma de trabajar.</p>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Lead Qualifier Form */}
        <section className="mb-32 max-w-4xl mx-auto" id="presupuesto-marketing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-4">
              CALCULADOR DE ESTRATEGIA
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              Agenda tu Auditoría <br /> de Crecimiento
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Completa tus datos y nuestro equipo preparará un roadmap estratégico preliminar para tu negocio sin compromiso.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <LeadQualifierForm initialService="marketing" />
          </div>
        </section>

        <InternalLinkingCTA variant="seo" />
      </main>
    </div>
  );
};

export default MarketingDigitalPage;
