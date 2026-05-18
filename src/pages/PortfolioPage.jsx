import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackCTAClick, trackWhatsAppClick } from '@/lib/analytics';
import { ArrowRight, Sparkles, Code2, ShieldAlert, BarChart3, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 9, 
    category: 'corporativa', 
    title: "SEO Growthers Platform",
    desc: "Ecosistema digital completo: Blog, Comunidad, Herramientas SEO y Servicios profesionales con rendimiento estelar.",
    link: "https://seogrowthers.com/",
    tags: ["Platform", "SEO Tools", "Community", "Supabase"],
    image: "/images/seo-platform-showcase.png"
  },
  {
    id: 8, 
    category: 'corporativa', 
    title: "Aluvalle SAS",
    desc: "Catálogo industrial y corporativo líder en aberturas de aluminio, posicionado en el top de Google Maps Neuquén.",
    link: "https://www.aluvalle.store/",
    tags: ["Industrial", "SEO Local", "Catalog", "Premium"],
    image: "/images/aluvalle-showcase.png"
  },
  {
    id: 10, 
    category: 'corporativa', 
    title: "InmoFuture Platform",
    desc: "Portal inmobiliario de gama alta con buscador dinámico, CRM inteligente y diseño premium enfocado en conversiones.",
    link: "https://inmobiliaria-plantilla.vercel.app/",
    tags: ["Real Estate", "React", "Management", "Framer Motion"],
    image: "/images/inmofuture-showcase.png"
  },
  {
    id: 11,
    category: 'landing',
    title: "EDV Remolques",
    desc: "Soporte táctico y auxilio mecánico 24hs con optimización mobile-first extrema y sintonización de velocidad perfecta.",
    link: "https://edvremolques.online/",
    tags: ["Landing Page", "Logistics", "Mobile-First", "High Conversion"],
    image: "/images/edv-remolques-hero.png"
  },
  {
    id: 7, 
    category: 'corporativa', 
    title: "Chrons Gaming",
    desc: "Portal de noticias y comunidad gaming con actualización en tiempo real y posicionamiento SEO estratégico.",
    link: "https://throneandlibertylatam.icu/",
    tags: ["News Portal", "Gaming", "SEO"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 1, 
    category: 'landing', 
    title: "NutriLife Landing",
    desc: "Página de aterrizaje optimizada para conversión de suplementos naturales y captación veloz de leads calificados.",
    tags: ["React", "Tailwind", "SEO"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2, 
    category: 'corporativa', 
    title: "Constructora Delta",
    desc: "Sitio institucional robusto con catálogo dinámico de obras civiles e industriales.",
    tags: ["WordPress", "Custom UI"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3, 
    category: 'ecommerce', 
    title: "Glow Beauty Shop",
    desc: "Tienda online de cosméticos con pasarela de pagos integrada y gestión automatizada de inventario.",
    tags: ["WooCommerce", "MercadoPago"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4, 
    category: 'landing', 
    title: "SaaS Analytics One",
    desc: "One page para plataforma de software de analítica de datos con tablas de precios dinámicas.",
    tags: ["Next.js", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5, 
    category: 'corporativa', 
    title: "Estudio Contable Pérez",
    desc: "Web profesional y limpia para firma de asesoría tributaria y financiera.",
    tags: ["Minimalist", "Fast Load"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6, 
    category: 'ecommerce', 
    title: "Urban Fit Wear",
    desc: "E-commerce de indumentaria deportiva con sistema avanzado de filtrado y checkout veloz.",
    tags: ["Tienda Nube", "Custom CSS"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
  }
];

const filters = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'landing', label: 'Landing Pages' },
  { id: 'corporativa', label: 'Sitios Corporativos' },
  { id: 'ecommerce', label: 'E-Commerce' },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio de Desarrollo Web - SEO Growthers",
    "description": "Galería de proyectos web y activos digitales de alta conversión construidos por SEO Growthers.",
    "url": "https://seogrowthers.com/portfolio",
    "publisher": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };

  return (
    <div className="text-on-surface font-body selection:bg-cyan-500/30 selection:text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Portfolio de Desarrollo Web y Diseño Premium | SEO Growthers</title>
        <meta name="description" content="Explorá nuestra galería de desarrollos web de alto rendimiento. Landing pages de conversión masiva, tiendas online integradas y portales corporativos de élite." />
        <link rel="canonical" href="https://seogrowthers.com/portfolio" />
        <meta property="og:title" content="Portfolio de Proyectos Premium | SEO Growthers" />
        <meta property="og:description" content="Nuestra biblioteca y galería de desarrollos digitales optimizados para velocidad extrema y conversiones de negocio." />
        <meta property="og:url" content="https://seogrowthers.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/images/seo-platform-showcase.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Atmospheric backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* Hero Section styled with Neon aesthetics */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0c10] p-8 md:p-16 lg:p-20 mb-20 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl">
            {/* Elite Showcase Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/25 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-label text-[10px] tracking-[0.25em] text-cyan-400 uppercase font-black">BIBLIOTECA DE ACTIVOS DIGITALES</span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl md:text-6.5xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Desarrollos de Alta Gama <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500">Diseñados para Escalar</span>
            </h1>

            <p className="max-w-2xl text-slate-350 text-base md:text-lg font-light leading-relaxed mb-10">
              Explorá nuestra galería de plataformas activas y demostraciones tecnológicas. Filtra los proyectos y descubrí por qué construimos la web más veloz y optimizada del mercado.
            </p>

            {/* Crucial redirection CTAs requested by USER */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services/success-cases"
                onClick={() => trackCTAClick('portfolio_to_success_cases')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d0e17] font-headline font-black rounded-xl text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-105 transition-all duration-300"
              >
                <span>Ver Casos de Éxito</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#ejemplos"
                className="inline-flex items-center justify-center px-8 py-4.5 bg-white/5 border border-white/10 text-white font-headline font-bold rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                Explorar Ejemplos
              </a>
            </div>
          </div>
        </section>

        {/* Categories / Filters styled beautifully */}
        <section id="ejemplos" className="mb-12 scroll-mt-28">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-12">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white">Galería Técnica</h2>
              <p className="text-slate-400 text-sm mt-1">Hacé clic para filtrar entre nuestras diferentes categorías de desarrollo.</p>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {filters.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`px-5 py-2.5 rounded-xl border text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 ${
                    filter === btn.id
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Projects Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={project.id}
                  className="group bg-[#111322]/70 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col hover:border-cyan-500/30 hover:bg-[#15182e]/85 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(6,182,212,0.05)]"
                >
                  {/* Aspect Card Header Image */}
                  <div className="aspect-[4/3] overflow-hidden relative bg-[#0d0f1a] border-b border-white/5">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111322] via-[#111322]/10 to-transparent pointer-events-none"></div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-[#0d0e17]/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3"
                        onClick={() => trackCTAClick('portfolio_visit_site')}
                      >
                        <span className="w-12 h-12 rounded-full bg-cyan-400 text-[#0d0e17] flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <ExternalLink className="w-5 h-5" />
                        </span>
                        <span className="text-white font-headline text-[10px] font-black uppercase tracking-[0.25em]">Visitar Sitio Oficial</span>
                      </a>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-[9px] font-headline font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/5 border border-cyan-400/20 px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-headline text-xl font-extrabold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-350 text-sm font-light leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
                      <span className="text-[10px] font-headline font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                        {project.category}
                      </span>
                      
                      {project.link ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-slate-500 text-xs font-medium italic">Concepto VIP</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Spectacular Bottom CTA directing to Success Cases Page */}
        <section className="text-center p-12 md:p-20 rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#141628]/80 to-[#0c0d17]/95 relative overflow-hidden mb-12 shadow-[0_30px_85px_rgba(0,0,0,0.6)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-black mb-4 block">MÉTRICAS QUE VALIDAN NUESTRO TRABAJO</span>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">
            ¿Querés ver los resultados de facturación y SEO real?
          </h2>
          <p className="text-slate-350 text-base md:text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light leading-relaxed">
            Nuestros desarrollos no solo se ven elegantes; están enlazados con analíticas de negocio de alto rendimiento. Visitá nuestra sección de Casos de Éxito completos para ver datos de tráfico y conversiones.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Link
              to="/services/success-cases"
              onClick={() => trackCTAClick('portfolio_bottom_to_success_cases')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d0e17] font-headline text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-105 transition-all duration-300"
            >
              <span>Explorar Casos de Éxito</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20vi%20el%20portfolio%20y%20quiero%20hacer%20un%20sitio%20con%20ustedes"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('portfolio_bottom_cta')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white/5 border border-white/10 text-white font-headline font-bold rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </section>

        <InternalLinkingCTA variant="webdev" />
      </main>
    </div>
  );
};

export default PortfolioPage;
