import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Cpu, Smartphone } from 'lucide-react';

const cases = [
  {
    slug: 'aluvalle-transformacion-digital',
    title: 'Aluvalle SAS',
    subtitle: 'Transformación Digital & SEO Industrial',
    desc: 'De cero presencia online a dominar de manera blindada las búsquedas de carpintería de aluminio en Neuquén y Alto Valle. Desarrollo de ecosistema web, SEO local y optimización de conversión.',
    kpis: ['+300% Tráfico Orgánico', 'Top #1 en Google Maps', 'LCP < 1.5s (Carga Instantánea)'],
    tags: ['SEO Local', 'Desarrollo Web', 'Google Business Profile'],
    icon: <Cpu className="w-5 h-5" />,
    image: "/images/aluvalle-showcase.png",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    slug: 'edv-remolques-tactica-logistica',
    title: 'EDV Remolques',
    subtitle: 'Soporte Táctico en Ruta & Logística 24/7',
    desc: 'Landing page táctica ultra-veloz equipada con embudo de conversión telefónica de alta respuesta y nivel de calidad óptimo 10/10 en campañas de Google Ads.',
    kpis: ['Carga móvil en 0.7s', '+150% Conversión Telefónica', '10/10 Google Ads Quality Score'],
    tags: ['Landing Page', 'Logística Táctica', 'CRO Móvil Extremo'],
    icon: <Smartphone className="w-5 h-5" />,
    image: "/images/edv-remolques-hero.png",
    color: "from-amber-500/20 to-orange-600/20"
  },
  {
    slug: 'inmofuture-plataforma-inmobiliaria',
    title: 'InmoFuture',
    subtitle: 'Plataforma Premium de Real Estate',
    desc: 'Ecosistema digital completo para agencias inmobiliarias y desarrolladores. Buscador avanzado con filtros inteligentes, CRM a medida y experiencia de usuario fluida.',
    kpis: ['+358% Conversión de Leads', 'LCP 1.2s en Escritorio', '+40% Productividad Comercial'],
    tags: ['Plataforma Web', 'CRM Inmobiliario', 'UX/UI de Alta Gama'],
    icon: <TrendingUp className="w-5 h-5" />,
    image: "/images/inmofuture-showcase.png",
    color: "from-purple-500/20 to-indigo-600/20"
  },
];

const SuccessCasesPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Casos de Éxito - SEO Growthers",
    "description": "Casos de estudio reales y métricas verídicas sobre el impacto de nuestro trabajo de SEO y desarrollo web premium.",
    "url": "https://seogrowthers.com/services/success-cases",
    "publisher": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": cases.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://seogrowthers.com/services/success-cases/${c.slug}`,
        "name": c.title
      }))
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  return (
    <div className="text-on-surface font-body selection:bg-cyan-500/30 selection:text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Casos de Éxito y Proyectos Reales | SEO Growthers</title>
        <meta name="description" content="Nuestros proyectos destacados con resultados medibles. De cero a dominar las búsquedas orgánicas en internet. Conocé cómo impulsamos el crecimiento de las empresas." />
        <link rel="canonical" href="https://seogrowthers.com/services/success-cases" />
        <meta property="og:title" content="Casos de Éxito Reales | SEO Growthers" />
        <meta property="og:description" content="Casos de éxito verídicos con métricas reales de conversión, tráfico y velocidad web." />
        <meta property="og:url" content="https://seogrowthers.com/services/success-cases" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/images/seo-platform-showcase.png" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Atmospheric lighting */}
      <div className="absolute top-0 left-0 w-full h-[900px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.07),transparent_70%)] pointer-events-none"></div>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* Hero Section */}
        <section className="mb-20 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/45 border border-cyan-500/25 backdrop-blur-md mb-6 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="font-label text-[10px] tracking-[0.25em] text-cyan-400 uppercase font-black">CASOS DE ESTUDIO</span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7.5xl font-black text-white tracking-tight leading-[1.05] mb-6">
            Métricas que <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 animate-gradient-x">Hablan por Nosotros</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
            No creemos en promesas vacías. Cada caso de éxito a continuación documenta cómo transformamos activos digitales ordinarios en herramientas de crecimiento exponencial.
          </p>
        </section>

        {/* Dynamic Animated Case Studies list */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-24 space-y-12"
        >
          {cases.map((c, i) => (
            <motion.div
              variants={itemVariants}
              key={c.slug}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0e101f]/80 p-6 md:p-10 hover:border-cyan-500/30 hover:bg-[#14162c]/90 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
            >
              {/* Highlight Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]`}></div>

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                {/* Visual Image Block */}
                <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 relative bg-[#0b0c14]">
                  <img 
                    src={c.image} 
                    alt={c.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e101f] via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Case Info details */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Header line with icon */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20 group-hover:scale-110 transition-transform duration-500">
                        {c.icon}
                      </div>
                      <div>
                        <h2 className="font-headline text-2xl md:text-3.5xl font-black text-white group-hover:text-cyan-400 transition-colors">
                          {c.title}
                        </h2>
                        <p className="text-cyan-400/80 text-xs md:text-sm font-semibold tracking-wide uppercase mt-0.5">
                          {c.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-6">
                      {c.desc}
                    </p>

                    {/* KPIs lists */}
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                      {c.kpis.map((kpi, j) => (
                        <div key={j} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/[0.02] transition-colors duration-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-xs font-bold text-slate-200">{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions links */}
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    <Link
                      to={`/services/success-cases/${c.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-cyan-400 hover:text-[#0d0e17] text-white font-headline text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                    >
                      <span>Estudiar Caso Completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {c.slug === 'edv-remolques-tactica-logistica' && (
                      <a
                        href="https://edvremolques.online/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>Visitar Web Real</span>
                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                      </a>
                    )}
                    {c.slug === 'aluvalle-transformacion-digital' && (
                      <a
                        href="https://www.aluvalle.store/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>Visitar Web Real</span>
                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Breathtaking CTA Section */}
        <section className="text-center p-12 md:p-20 rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#141628]/80 to-[#0c0d17]/95 relative overflow-hidden mb-12 shadow-[0_30px_85px_rgba(0,0,0,0.6)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none"></div>

          <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4 relative z-10 leading-tight">
            ¿Tu empresa será el próximo caso de éxito?
          </h2>
          <p className="text-slate-350 text-base md:text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light leading-relaxed">
            Contanos tus objetivos comerciales y diseñamos una estrategia digital de vanguardia optimizada para superarlos en tiempo récord.
          </p>

          <a 
            href="https://wa.me/5492995504783?text=Hola%2C%20vi%20los%20casos%20de%20éxito%20y%20quiero%20resultados%20similares" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackWhatsAppClick('success_cases_cta')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d0e17] font-headline font-black rounded-xl text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-105 transition-all duration-300 relative z-10"
          >
            Quiero Resultados Así <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>
    </div>
  );
};

export default SuccessCasesPage;
