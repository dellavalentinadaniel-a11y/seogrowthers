import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ShieldCheck,
  Code2,
  Sparkles,
  Layers,
  ArrowUpRight,
  Store,
  Boxes,
  Award
} from 'lucide-react';

const features = [
  { icon: ShoppingBag, title: 'Carrito & Checkout Pro', desc: 'Sistema de carrito optimizado para reducir el abandono de ventas.' },
  { icon: Zap, title: 'Velocidad LCP < 1.5s', desc: 'Plantillas ultrarrápidas preparadas para convertir en redes celulares.' },
  { icon: Search, title: 'SEO On-Page & Schema', desc: 'Marcado estructurado de productos, categorías y ofertas para Google.' },
  { icon: ShieldCheck, title: 'Integración Pagos & Envíos', desc: 'Mercado Pago, tarjetas, Correo Argentino y Andreani sincronizados.' }
];

const faqs = [
  { q: '¿Qué incluye la estrategia de SEO para eCommerce?', a: 'Incluye la auditoría técnica completa de tu tienda (Tiendanube, MercadoShops o a medida), optimización de arquitectura de categorías, eliminación de contenido duplicado, marcado Schema.org de producto y optimización de velocidad de carga.' },
  { q: '¿Cuál es la diferencia entre Tiendanube, MercadoShops y una tienda a medida?', a: 'Tiendanube y MercadoShops son SaaS ideales para lanzamientos veloces con logística integrada. Una tienda a medida (React / Node.js) brinda control total de la base de datos, 0 comisiones por venta y máxima velocidad de carga.' },
  { q: '¿Cómo reducen la dependencia de la pauta publicitaria?', a: 'Al posicionar tus categorías y productos por palabras clave comerciales de alta intención en la búsqueda orgánica de Google, atraés clientes calificados de forma continua sin pagar por cada clic.' },
  { q: '¿Trabajan con auditorías para CyberMonday o BlackFriday?', a: 'Sí. Auditamos tu infraestructura antes de eventos masivos para asegurar que el sitio soporte picos de tráfico y no colapse en momentos críticos de facturación.' }
];

const EcommercePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hub de Servicios SEO para E-Commerce",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Hub de soluciones y servicios SEO para ecommerce en Argentina. Especialistas en posicionamiento para Tiendanube, MercadoShops y desarrollo a medida.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "E-Commerce SEO & Web Development"
  };

  return (
    <div className="text-on-surface font-body min-h-screen bg-background selection:bg-cyan-500/30 selection:text-white">
      <Helmet>
        <title>Servicios SEO para E-Commerce | Hub Tiendanube & MercadoShops - SEO Growthers</title>
        <meta name="description" content="Servicios SEO para e-commerce en Argentina. Posicionamiento orgánico de alta conversión para Tiendanube, MercadoShops y tiendas online a medida. Escalá tus ventas." />
        <link rel="canonical" href="https://seogrowthers.com/services/ecommerce" />
        <meta property="og:title" content="Servicios SEO para E-Commerce | SEO Growthers" />
        <meta property="og:description" content="Dominá el comercio electrónico en Argentina. Estrategias SEO probadas para Tiendanube, MercadoShops y tiendas a medida." />
        <meta property="og:url" content="https://seogrowthers.com/services/ecommerce" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* HERO PILLAR PAGE */}
        <section className="mb-20 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 backdrop-blur-md">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="font-label text-xs tracking-[0.2em] text-cyan-400 uppercase font-extrabold">
              Hub Pilar • Servicios SEO para E-Commerce
            </span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Servicios <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">SEO para E-Commerce</span> en Argentina
          </h1>

          <p className="max-w-3xl text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
            Dominá los motores de búsqueda y transformá tu tienda online en una máquina de facturación orgánica. Especialistas en posicionamiento para las plataformas líderes de la región.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              "Auditoría SEO On-Page & Técnica",
              "Optimización de Categorías & Fichas",
              "Sincronización GSC & GA4",
              "Reducción Drástica del CAC"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low/80 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-white">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20necesito%20servicios%20SEO%20para%20mi%20eCommerce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick('ecommerce_hero'); trackCTAClick('ecommerce_pillar_hero'); }}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-8 py-4 rounded-xl font-headline font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all hover:scale-105"
            >
              <span>Solicitar Consultoría SEO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/auditoria-seo-gratis"
              className="border border-white/15 text-white px-8 py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all bg-white/5"
            >
              Auditoría Gratuita
            </Link>
          </div>
        </section>

        {/* ESPECIALIZACIONES A+ POR PLATAFORMA (HUB SILO) */}
        <section className="mb-20 space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-label text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold block mb-2">Estrategia de Dominio Regional</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Landings Especializadas por Plataforma
            </h2>
            <p className="text-slate-300 mt-4 text-base font-light">
              Explorá nuestras soluciones técnicas específicas para optimizar y escalar en el ecosistema donde opera tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD TIENDANUBE */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border-2 border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between relative group shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              <div className="absolute -top-3.5 left-6 bg-cyan-400 text-slate-950 text-[10px] font-headline font-black px-4 py-0.5 rounded-full uppercase tracking-wider">
                OPORTUNIDAD A+ • SEO TIENDANUBE
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 font-bold mt-2">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  SEO para Tiendanube
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                  "Escalá las ventas orgánicas de tu Tiendanube sin depender 100% de la pauta". Arquitectura limpia, eliminación de contenido duplicado y aceleración de plantilla.
                </p>
                <ul className="text-xs text-slate-400 space-y-2 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Optimización de categorías y etiquetas inteligentes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Caso práctico: +140% de tráfico en indumentaria</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Checklist PDF CyberMonday incluido</li>
                </ul>
              </div>

              <Link
                to="/services/ecommerce/tiendanube"
                className="w-full py-4 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-headline font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Ver Landing SEO Tiendanube</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* CARD MERCADOSHOPS */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border-2 border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between relative group shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <div className="absolute -top-3.5 left-6 bg-amber-500 text-slate-950 text-[10px] font-headline font-black px-4 py-0.5 rounded-full uppercase tracking-wider">
                OPORTUNIDAD A+ • SEO MERCADOSHOPS
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 font-bold mt-2">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  SEO para MercadoShops
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                  "Posicioná tu MercadoShops en Google y sincronizá tu catálogo con Mercado Libre". Estrategia híbrida de ecosistema y fichas On-Page.
                </p>
                <ul className="text-xs text-slate-400 space-y-2 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> SEO en publicaciones de Mercado Libre + Shop</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Solución a URLs parametrizadas y canónicas</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Mapeos de migración segura sin perder autoridad</li>
                </ul>
              </div>

              <Link
                to="/services/ecommerce/mercadoshops"
                className="w-full py-4 rounded-xl bg-amber-400/10 border border-amber-400/40 text-amber-400 font-headline font-bold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Ver Landing SEO MercadoShops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CARACTERÍSTICAS Y PILARES GENERALES */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Beneficios de la Optimización SEO para E-Commerce
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-white/10 hover:border-cyan-400/30 transition-all group">
                  <Icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-container-low/60 backdrop-blur-md overflow-hidden hover:border-primary/40 transition-all duration-300">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group">
        <h3 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors pr-4">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-on-surface-variant leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">{answer}</p>
      </div>
    </div>
  );
};

export default EcommercePage;
