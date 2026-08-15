import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadQualifierForm from '@/components/contact/LeadQualifierForm';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import PerformancePackHeroAnimated from '@/components/marketing/PerformancePackHeroAnimated';
import PerformancePackWorkflow from '@/components/marketing/PerformancePackWorkflow';
import PerformancePackFunnelSystem from '@/components/marketing/PerformancePackFunnelSystem';
import PerformancePackAudienceRequirements from '@/components/marketing/PerformancePackAudienceRequirements';
import PerformancePackInvestmentBanner from '@/components/marketing/PerformancePackInvestmentBanner';
import PerformancePackFinalCTA from '@/components/marketing/PerformancePackFinalCTA';
import PerformancePackFAQ, { performancePackFaqData } from '@/components/marketing/PerformancePackFAQ';
import {
  Search,
  Monitor,
  CheckCircle2,
  BarChart3,
  Users
} from 'lucide-react';

const fivePillars = [
  {
    step: 1,
    title: "1. Gestión de Google Ads",
    tagline: "Captamos usuarios que ya están buscando productos o servicios relacionados con tu negocio.",
    borderGlow: "hover:border-blue-400/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
    bulletColor: "text-blue-400",
    iconImage: "/images/marketing/icons/google-ads-3d.jpg",
    iconAlt: "Google Ads 3D Icon",
    points: [
      "Campañas Search y Display",
      "Selección y organización de palabras clave",
      "Optimización de anuncios",
      "Segmentaciones y presupuesto",
      "Optimización de pujas",
      "Análisis de conversiones"
    ],
    footerVisual: (
      <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 text-left shadow-inner">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15 mb-2.5">
          <Search className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10.5px] text-slate-200 font-mono truncate">servicios profesionales...</span>
        </div>
        <div className="h-1.5 w-20 bg-blue-400/80 rounded-full mb-1.5" />
        <div className="h-1 w-full bg-white/10 rounded-full mb-1.5" />
        <div className="h-1 w-24 bg-white/10 rounded-full" />
      </div>
    )
  },
  {
    step: 2,
    title: "2. Meta Ads Instagram & Facebook",
    tagline: "Campañas enfocadas en la generación de leads y acciones concretas.",
    borderGlow: "hover:border-pink-400/60 hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]",
    bulletColor: "text-pink-400",
    iconImage: "/images/marketing/icons/meta-ads-3d.jpg",
    iconAlt: "Meta Ads 3D Icon",
    points: [
      "Generación de clientes potenciales",
      "Formularios instantáneos",
      "Tráfico a Landing Page",
      "Remarketing estratégico",
      "Segmentación avanzada",
      "Testeo de creatividades",
      "Optimización continua"
    ],
    footerVisual: (
      <div className="mt-6 p-3 rounded-2xl bg-slate-950/90 border border-white/10 flex items-center justify-center gap-3 shadow-inner">
        <div className="w-14 h-20 rounded-xl bg-slate-900 border border-white/15 p-1.5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="h-1.5 w-6 bg-pink-400 rounded-full" />
            <span className="text-[7px] text-slate-400 font-mono">IG</span>
          </div>
          <div className="w-full h-10 rounded-lg bg-gradient-to-tr from-pink-500/40 via-purple-500/30 to-blue-500/20 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">Anuncio</span>
          </div>
          <div className="h-1 w-8 bg-white/30 rounded-full" />
        </div>
        <div className="w-14 h-20 rounded-xl bg-slate-900 border border-white/15 p-1.5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="h-1.5 w-6 bg-blue-500 rounded-full" />
            <span className="text-[7px] text-slate-400 font-mono">FB</span>
          </div>
          <div className="w-full h-10 rounded-lg bg-gradient-to-tr from-blue-500/40 via-cyan-500/30 to-teal-500/20 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">Lead</span>
          </div>
          <div className="h-1 w-8 bg-white/30 rounded-full" />
        </div>
      </div>
    )
  },
  {
    step: 3,
    title: "3. Landing Page High-Conversion",
    tagline: "Diseñamos 1 Landing Page orientada a convertir el tráfico en oportunidades comerciales.",
    borderGlow: "hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(46,204,113,0.25)]",
    bulletColor: "text-emerald-400",
    iconImage: "/images/marketing/icons/landing-page-3d.jpg",
    iconAlt: "Landing Page 3D Icon",
    points: [
      "Propuesta de valor clara",
      "Diseño 100% responsive",
      "Llamadas a la acción estratégicas",
      "Formularios de contacto",
      "Elementos de confianza & prueba social",
      "Integración directa con WhatsApp"
    ],
    footerVisual: (
      <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 text-center shadow-inner">
        <div className="text-[10px] font-bold text-white mb-1.5">Tu solución a un clic</div>
        <div className="w-full py-1.5 rounded-lg bg-[#2ECC71] text-slate-950 text-[9.5px] font-black uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(46,204,113,0.35)]">
          Quiero más info
        </div>
        <div className="flex justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    )
  },
  {
    step: 4,
    title: "4. Reporte Mensual de Conversión",
    tagline: "Analizamos los resultados y transformamos los datos en información útil.",
    borderGlow: "hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]",
    bulletColor: "text-cyan-400",
    iconImage: "/images/marketing/icons/report-graph-3d.jpg",
    iconAlt: "Reporte 3D Graph Icon",
    points: [
      "Inversión publicitaria real",
      "Alcance e impresiones",
      "Clics, CTR y CPC promedio",
      "Leads calificados generados",
      "Costo por lead (CPL)",
      "Tasa de conversión",
      "Rendimiento por campaña y plataforma",
      "Oportunidades de optimización"
    ],
    footerVisual: (
      <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 flex items-end justify-center gap-2 h-20 shadow-inner">
        <div className="w-3.5 bg-cyan-500/40 rounded-t-md h-6" />
        <div className="w-3.5 bg-cyan-500/60 rounded-t-md h-10" />
        <div className="w-3.5 bg-cyan-400 rounded-t-md h-14" />
        <div className="w-3.5 bg-blue-500 rounded-t-md h-11" />
        <div className="w-3.5 bg-[#2ECC71] rounded-t-md h-16 shadow-[0_0_10px_rgba(46,204,113,0.4)]" />
      </div>
    )
  },
  {
    step: 5,
    title: "5. Acompañamiento Estratégico",
    tagline: "Te acompañamos para mejorar los resultados y tomar mejores decisiones.",
    borderGlow: "hover:border-purple-400/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
    bulletColor: "text-purple-400",
    iconImage: "/images/marketing/icons/strategic-handshake-3d.jpg",
    iconAlt: "Acompañamiento 3D Handshake Icon",
    points: [
      "Revisión de calidad de los leads",
      "Ajustes en la oferta comercial",
      "Mensajes y copys publicitarios",
      "Optimización del proceso de contacto",
      "Afinamiento de segmentaciones",
      "Distribución del presupuesto",
      "Canales de adquisición",
      "Plan de acción continuo"
    ],
    footerVisual: (
      <div className="mt-6 p-1.5 rounded-2xl bg-slate-950/90 border border-white/10 overflow-hidden relative h-20 flex items-center justify-center shadow-inner">
        <img
          src="/images/marketing/icons/office-team-meeting.jpg"
          alt="Equipo estratégico"
          className="w-full h-full object-cover rounded-xl opacity-80 hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent rounded-xl flex items-end justify-center pb-1.5">
          <span className="text-[9.5px] font-bold text-white font-mono uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
            SOPORTE 1 A 1
          </span>
        </div>
      </div>
    )
  }
];

export default function PerformancePackPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract all questions for Schema FAQPage
  const allFaqQuestions = performancePackFaqData.flatMap(cat => cat.questions);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Performance Pack - Sistema de Generación de Leads en Neuquén y Argentina",
      "image": "https://seogrowthers.com/logo_kiwi.png",
      "description": "Plan integral de generación de leads con Google Ads, Meta Ads y Landing Page de alta conversión para negocios en Neuquén, Cipolletti, Alto Valle y Argentina. $450 USD mensuales + inversión.",
      "brand": {
        "@type": "Brand",
        "name": "SEO Growthers"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://seogrowthers.com/services/marketing-digital/performance-pack",
        "priceCurrency": "USD",
        "price": "450",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Neuquén, Argentina" },
          { "@type": "AdministrativeArea", "name": "Cipolletti, Río Negro" },
          { "@type": "AdministrativeArea", "name": "Alto Valle" },
          { "@type": "AdministrativeArea", "name": "Vaca Muerta" },
          { "@type": "Country", "name": "Argentina" }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allFaqQuestions.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "SEO Growthers",
      "image": "https://seogrowthers.com/logo_kiwi.png",
      "url": "https://seogrowthers.com",
      "telephone": "+54 9 299 550-4783",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Neuquén",
        "addressRegion": "Neuquén",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -38.9516,
        "longitude": -68.0591
      },
      "priceRange": "$$"
    }
  ];

  return (
    <div className="text-on-surface font-body text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Performance Pack en Neuquén & Patagonia | Google Ads, Meta Ads & SEO Local | SEO Growthers</title>
        <meta 
          name="description" 
          content="Performance Pack: Captación de leads calificados con Google Ads, Meta Ads y Landing Page de alta conversión para empresas en Neuquén, Cipolletti, Vaca Muerta y toda la Patagonia. $450/mes." 
        />
        <meta 
          name="keywords" 
          content="SEO Neuquén, Google Ads Neuquén, Meta Ads Cipolletti, Marketing digital Vaca Muerta, Landing page alta conversión Patagonia, AEO Argentina, SEO Local Alto Valle, Generación de Leads Neuquén" 
        />
        <link rel="canonical" href="https://seogrowthers.com/services/marketing-digital/performance-pack" />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:title" content="Performance Pack en Neuquén & Patagonia | SEO Growthers" />
        <meta property="og:description" content="Sistema de captación de leads con Google Ads, Meta Ads y Landing Page optimizada para conversión en el Alto Valle y la Patagonia." />
        <meta property="og:url" content="https://seogrowthers.com/services/marketing-digital/performance-pack" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:site_name" content="SEO Growthers" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Performance Pack en Neuquén & Patagonia | SEO Growthers" />
        <meta name="twitter:description" content="Captá leads calificados en Neuquén y la Patagonia con Google Ads, Meta Ads y Landing Page de alto impacto." />
        <meta name="twitter:image" content="https://seogrowthers.com/logo_kiwi.png" />

        {/* Local Geo SEO Tags */}
        <meta name="geo.region" content="AR-Q" />
        <meta name="geo.placename" content="Neuquén" />
        <meta name="geo.position" content="-38.9516;-68.0591" />
        <meta name="ICBM" content="-38.9516, -68.0591" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <Breadcrumbs className="mb-6" />

        {/* HERO SECTION: ANIMATED HERO ELEMENT */}
        <section className="mb-20">
          <PerformancePackHeroAnimated />
        </section>

        {/* SECTION 2: 5 PILLARS WITH 3D ICONS */}
        <section className="mb-20" id="detalles-plan">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#2ECC71] uppercase font-bold block mb-3">
              DESGLOSE COMPLETO DEL SERVICIO
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              ¿Qué incluye el <span className="text-[#2ECC71]">Performance Pack?</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Cada componente cumple un rol estratégico para captar, persuadir y convertir visitantes en clientes en el mercado local y nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {fivePillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`p-6 rounded-[2rem] bg-slate-900/60 border border-white/10 ${pillar.borderGlow} backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl group`}
              >
                <div>
                  <div className="flex justify-center mb-5">
                    <div className="relative w-16 h-16 rounded-2xl p-1 bg-gradient-to-b from-white/20 to-white/5 shadow-2xl border border-white/20 backdrop-blur group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={pillar.iconImage}
                        alt={pillar.iconAlt}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>

                  <h3 className="font-headline text-base md:text-lg font-bold text-white text-center mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-light text-center mb-5 leading-relaxed min-h-[48px]">
                    {pillar.tagline}
                  </p>
                  <div className="pt-4 border-t border-white/10 space-y-2.5">
                    {pillar.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300 font-light leading-snug">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${pillar.bulletColor} shrink-0 mt-0.5`} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  {pillar.footerVisual}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS (6 STEPS WORKFLOW) */}
        <section className="mb-20">
          <PerformancePackWorkflow />
        </section>

        {/* SECTION 4: FUNNEL SYSTEM DIAGRAM */}
        <section className="mb-20">
          <PerformancePackFunnelSystem />
        </section>

        {/* SECTION 5: TARGET AUDIENCE & REQUIREMENTS */}
        <section className="mb-20">
          <PerformancePackAudienceRequirements />
        </section>

        {/* SECTION 6: $450 INVESTMENT BANNER */}
        <section className="mb-20">
          <PerformancePackInvestmentBanner />
        </section>

        {/* SECTION 7: FINAL CTA BANNER */}
        <section className="mb-20">
          <PerformancePackFinalCTA />
        </section>

        {/* SECTION 8: FAQ ACCORDION (SEO LOCAL & AEO 2026) */}
        <section className="mb-20">
          <PerformancePackFAQ />
        </section>

        {/* SECTION 9: LEAD QUALIFIER FORM */}
        <section className="mb-28">
          <div className="max-w-4xl mx-auto">
            <LeadQualifierForm 
              title="¿Querés comenzar con el Performance Pack en Neuquén o tu región?"
              subtitle="Completá tus datos para coordinar una llamada estratégica de 15 minutos y definir el plan para tu negocio."
            />
          </div>
        </section>

        {/* SECTION 10: INTERNAL LINKING */}
        <InternalLinkingCTA currentService="marketing-digital" />
      </main>
    </div>
  );
}
