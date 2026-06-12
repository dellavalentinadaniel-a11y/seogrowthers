import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import LeadQualifierForm from '@/components/contact/LeadQualifierForm';
import TechMarquee from '@/components/shared/TechMarquee';
import { trackCTAClick } from '@/lib/analytics';
import { ArrowRight, Sparkles, CheckCircle2, HelpCircle, Percent } from 'lucide-react';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-white/15 bg-[#141727]/60 backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:bg-[#1a1e35]/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group">
        <h3 className="font-headline text-base md:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors pr-4 flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-cyan-500/60 flex-shrink-0 group-hover:text-cyan-400 transition-colors" />
          {faq.question}
        </h3>
        <span className={`material-symbols-outlined text-slate-500 group-hover:text-white transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>expand_more</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] pb-8' : 'max-h-0'}`}>
        <div className="px-14 text-slate-300 leading-relaxed text-sm md:text-base font-light">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

const faqs = [
  { 
    question: "¿Cuánto cuesta un sitio web profesional en Argentina?", 
    answer: "Nuestras landing pages de alta conversión arrancan desde $800 USD. Sitios corporativos premium con CMS autogestionable desde $1,500 USD y tiendas online robustas de alto rendimiento desde $2,500 USD. Todos los planes incluyen diseño responsive, SEO técnico on-page nativo y un mes completo de soporte premium post-lanzamiento." 
  },
  { 
    question: "¿Cuánto tiempo tarda el desarrollo de un sitio web?", 
    answer: "Una landing page estratégica toma entre 5 y 10 días hábiles. Un sitio corporativo avanzado entre 2 y 4 semanas. Tiendas online y e-commerce completos toman entre 4 y 8 semanas según el tamaño del catálogo. Trabajamos con sprints semanales ágiles y te mostramos avances interactivos en cada etapa." 
  },
  { 
    question: "¿Mi sitio web va a estar optimizado para celulares?", 
    answer: "Absolutamente sí. Todos nuestros desarrollos se construyen bajo la filosofía mobile-first. Diseñamos con precisión milimétrica para celulares y luego adaptamos la interfaz a tablets y computadoras de escritorio. Además, optimizamos Core Web Vitals para garantizar velocidades de carga instantáneas que Google premia." 
  },
  { 
    question: "¿Incluyen SEO en el desarrollo web?", 
    answer: "Sí. Cada sitio incluye SEO técnico de raíz: arquitectura limpia de URLs, optimización de meta tags y encabezados H1-H3, sitemaps dinámicos, robots.txt, compresión automática de imágenes a formato de última generación WebP y estructuración de datos enriquecidos Schema.org." 
  },
  { 
    question: "¿Puedo actualizar el contenido yo mismo?", 
    answer: "Sí. Implementamos paneles de administración intuitivos y modernos con Supabase o CMS headless personalizados, lo que te permite editar textos, cambiar imágenes y publicar noticias o artículos sin depender de un programador. Te brindamos una capacitación en video grabada incluida." 
  },
  { 
    question: "¿Qué tecnologías utilizan?", 
    answer: "Trabajamos con las herramientas líderes de la industria moderna: React, Tailwind CSS, Node.js, Supabase, Vite, Docker, PostgreSQL y Vercel. Seleccionamos el ecosistema tecnológico adecuado según las exigencias del proyecto, priorizando siempre la velocidad, la seguridad y la visibilidad de tu marca." 
  },
  { 
    question: "¿Puedo integrar inteligencia artificial o bots automatizados en mi web?", 
    answer: (
      <span>
        ¡Por supuesto! Diseñamos tu plataforma web lista para integrarse de forma nativa con bots de atención al cliente de última generación, asistentes interactivos y flujos de trabajo autónomos. Si querés automatizar tu negocio y reducir costos operativos, te invitamos a explorar nuestro servicio especializado de <Link to="/services/automatizacion-ia" className="text-cyan-400 font-bold underline hover:text-cyan-300 transition-colors">Automatización con IA</Link> y <Link to="/services/rpa-automatizacion" className="text-cyan-400 font-bold underline hover:text-cyan-300 transition-colors">RPA (Bots)</Link>.
      </span>
    )
  },
  { 
    question: "¿Cómo garantizan que mi negocio realmente atraiga clientes locales?", 
    answer: (
      <span>
        La combinación de desarrollo veloz y SEO técnico optimizado localmente es infalible. Si tu objetivo es dominar búsquedas geolocalizadas específicas en tu zona y captar llamadas y visitas físicas, podemos acoplar tu desarrollo con nuestro servicio integral de <Link to="/services/seo-neuquen" className="text-cyan-400 font-bold underline hover:text-cyan-300 transition-colors">SEO en Neuquén y Patagonia</Link> para posicionarte en el Top #1 de Google Maps.
      </span>
    )
  },
  { 
    question: "¿Qué pasa si ya tengo una web antigua pero no tiene visitas ni convierte?", 
    answer: (
      <span>
        Hacemos rediseños integrales basados en optimización de tasa de conversión (CRO) y velocidad de carga extrema. Si no estás seguro de qué está fallando en tu sitio actual, te recomendamos solicitar hoy mismo nuestra <Link to="/auditoria-seo-gratis" className="text-cyan-400 font-bold underline hover:text-cyan-300 transition-colors">Auditoría SEO Gratuita</Link>. Evaluamos tu web y la de tu competencia directa, entregándote un informe en 48 horas sin compromiso.
      </span>
    )
  }
];

const packages = [
  {
    name: "Landing Page",
    price: "800",
    desc: "Perfecta para campañas publicitarias, lanzamientos de productos y captura veloz de leads de alta calidad.",
    features: ["Diseño responsive mobile-first", "Formulario de contacto inteligente", "SEO on-page estructurado básico", "Optimización de velocidad extrema (WebP)", "1 revisión de diseño completa", "Hosting inicial de 3 meses incluido"],
    popular: false,
    icon: "web",
  },
  {
    name: "Sitio Corporativo",
    price: "1,500",
    desc: "Presencia digital institucional premium y autogestionable para empresas líderes en crecimiento.",
    features: ["Hasta 8 secciones o páginas exclusivas", "Blog integrado con panel autogestionable", "SEO técnico y de indexación profundo", "Schema markup estructurado de marca", "Google Analytics y Search Console", "Panel de administración y control", "3 revisiones de diseño completas", "Soporte VIP post-lanzamiento de 30 días"],
    popular: true,
    icon: "domain",
  },
  {
    name: "Tienda Online",
    price: "2,500",
    desc: "E-commerce completo, seguro y optimizado con CRO avanzado para maximizar tus transacciones digitales.",
    features: ["Catálogo e inventario de productos ilimitado", "Pasarela de pagos (Mercado Pago, Stripe)", "Carrito y checkout fluido de alta conversión", "Panel intuitivo de gestión de pedidos", "SEO avanzado para categorías y productos", "Correos automatizados de confirmación", "Integración logística con envíos locales", "Soporte técnico VIP extendido de 60 días"],
    popular: false,
    icon: "storefront",
  },
];

const DesarrolloWebPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="text-on-surface font-body selection:bg-cyan-500/30 selection:text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Desarrollo Web en Argentina | Sitios Rápidos y Optimizados | SEO Growthers</title>
        <meta name="description" content="Desarrollo web profesional en Argentina. Landing pages, sitios corporativos y tiendas online con SEO incluido. Diseño responsive, velocidad optimizada y panel de administración. Desde $800 USD." />
        <link rel="canonical" href="https://seogrowthers.com/services/desarrollo-web-argentina" />
        <meta property="og:title" content="Desarrollo Web en Argentina | SEO Growthers" />
        <meta property="og:description" content="Sitios web profesionales con SEO incluido. Landing pages desde $800 USD. Diseño responsive y velocidad optimizada." />
        <meta property="og:url" content="https://seogrowthers.com/services/desarrollo-web-argentina" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="desarrollo web argentina, diseño web profesional, crear pagina web, tienda online argentina, landing page argentina" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Desarrollo Web Profesional",
          "description": "Servicio de desarrollo de sitios web, landing pages y tiendas online optimizados para conversión y SEO.",
          "provider": {
            "@type": "ProfessionalService",
            "name": "SEO Growthers",
            "url": "https://seogrowthers.com",
            "telephone": "+54 9 2995504783"
          },
          "areaServed": [
            { "@type": "Country", "name": "Argentina" },
            { "@type": "Country", "name": "España" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Planes de Desarrollo Web",
            "itemListElement": packages.map(p => ({
              "@type": "Offer",
              "name": p.name,
              "description": p.desc,
              "priceCurrency": "USD",
              "price": p.price.replace(",", "")
            }))
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => {
            const plainAnswer = typeof f.answer === 'string' ? f.answer : "Diseñamos ecosistemas digitales completos de alta gama con optimización SEO técnica y analítica avanzada para multiplicar tus conversiones de clientes calificados.";
            return { "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": plainAnswer } };
          })
        })}</script>
      </Helmet>

      <ScrollToTop />

      {/* Global Background elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* Hero Section: Professional Banner with Custom Background Image & Glowing Gradients */}
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0c0d13] flex items-center justify-center p-8 md:p-16 lg:p-24 mb-24 shadow-[0_30px_100px_rgba(0,0,0,0.8)] min-h-[550px]">
          {/* Background Image representive of Web Dev with cover mode */}
          <div className="absolute inset-0 bg-[url('/images/banners/web-development-hero.png')] bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none"></div>
          
          {/* Edge masking gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d13] via-[#0c0d13]/70 to-[#0c0d13]/40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d13]/90 via-transparent to-[#0c0d13]/90 pointer-events-none"></div>

          {/* Central neon atmospheric light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Text and Actions */}
          <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
            {/* Elite Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/55 border border-cyan-500/35 backdrop-blur-md mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-black">DESARROLLO WEB DE ÉLITE</span>
            </div>

            <h1 className="font-headline text-4xl md:text-6xl lg:text-7.5xl font-black text-white tracking-tight leading-[1.05] mb-8">
              Sitios Web de Alto Rendimiento que <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 animate-gradient-x">Convierten Visitas en Clientes</span>
            </h1>

            <p className="max-w-3xl text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-12">
              No diseñamos simples tarjetas de presentación estáticas. Desarrollamos plataformas ultra veloces, seguras y optimizadas desde la primera línea de código para dominar Google y multiplicar tu tasa de conversión.
            </p>

            {/* Highly Visible Neon styled Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md sm:max-w-none sm:w-auto">
              <Link 
                to="/contact" 
                onClick={() => trackCTAClick('webdev_hero', '/contact')} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-[#0d0e17] font-headline font-black rounded-2xl text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300"
              >
                <span>Solicitar Presupuesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:gap-4">
                <a 
                  href="#planes" 
                  className="inline-flex items-center justify-center px-4 py-4 md:px-8 md:py-5 bg-white/5 border border-white/10 text-white font-headline font-bold rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
                >
                  Planes y Precios
                </a>
                <Link 
                  to="/portfolio" 
                  className="inline-flex items-center justify-center px-4 py-4 md:px-8 md:py-5 bg-white/5 border border-white/10 text-[#00e5ff] font-headline font-bold rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 text-center"
                >
                  Casos de Éxito
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Carril / Reusable Moving Marquee Section */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-3">TECNOLOGÍAS CERTIFICADAS</span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Infraestructura que Impulsa tus Resultados
            </h2>
          </div>

          <TechMarquee />
        </section>

        {/* Pricing Section with Neon Depth & Glows */}
        <section className="mb-32 relative animate-fade-in" id="planes">
          {/* Subtle mesh background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none"></div>

          <div className="text-center mb-16 relative z-10">
            <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-3">PRECIOS TRANSPARENTES</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Planes de Desarrollo Web
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Inversión clara sin sorpresas de mantenimiento ocultas. Cada plan ha sido diseñado minuciosamente para resolver necesidades estratégicas de negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-stretch">
            {packages.map((pkg) => {
              const borderStyle = pkg.popular 
                ? 'border-2 border-cyan-400/90 bg-[#161a33]/90 shadow-[0_0_60px_rgba(6,182,212,0.35)] scale-[1.02] md:scale-[1.04] hover:shadow-[0_0_80px_rgba(6,182,212,0.5)]' 
                : 'border border-white/15 bg-[#111322]/80 hover:border-cyan-400/50 hover:bg-[#181b30]/90 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]';
                
              const ctaStyle = pkg.popular
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d0e17] font-black hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] hover:scale-[1.03]'
                : 'bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 hover:border-cyan-400/40';

              return (
                <div 
                  key={pkg.name} 
                  className={`p-8 md:p-10 rounded-[2.5rem] overflow-hidden flex flex-col relative transition-all duration-500 hover:-translate-y-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${borderStyle} group`}
                >
                  {/* Subtle responsive hover glow reflection (Spotlight effect) */}
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>
                  
                  {/* Floating high-contrast popular Badge */}
                  {pkg.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d0e17] text-[10px] font-black rounded-full uppercase tracking-[0.25em] shadow-lg shadow-cyan-500/30 z-20">
                      MÁS ELEGIDO
                    </span>
                  )}
                  
                  {/* Top Header Card */}
                  <div className="mb-8 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20">
                      <span className="material-symbols-outlined text-4xl">{pkg.icon}</span>
                    </div>
                    <h3 className="font-headline text-2xl font-extrabold text-white mb-3 tracking-tight">{pkg.name}</h3>
                    <p className="text-slate-350 text-sm leading-relaxed font-light min-h-[48px]">{pkg.desc}</p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 border-y border-white/10 py-6 relative z-10">
                    <p className="font-headline text-5xl font-black text-white flex items-baseline gap-2">
                      <span className="text-xs text-cyan-400 tracking-wider font-bold">USD</span> 
                      ${pkg.price}
                      <span className="text-xs text-slate-400 tracking-normal font-light"> / por proyecto</span>
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-4 mb-10 flex-grow relative z-10">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed font-light">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stacked Interactive CTA Actions */}
                  <div className="flex flex-col gap-3 mt-auto relative z-10">
                    <Link
                      to="/contact"
                      onClick={() => trackCTAClick(`webdev_plan_${pkg.name}`, '/contact')}
                      className={`w-full py-4 rounded-xl font-headline text-xs uppercase tracking-[0.2em] text-center transform active:scale-95 transition-all duration-300 ${ctaStyle}`}
                    >
                      Solicitar Presupuesto
                    </Link>
                    <a
                      href="#plantillas-prediseñadas"
                      className="w-full py-3.5 rounded-xl font-headline text-xs uppercase tracking-[0.2em] text-center bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white hover:border-cyan-500/30 transition-all duration-300 transform active:scale-95"
                    >
                      Ver detalles
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Plantillas Pre-diseñadas de Élite Section */}
        <section className="mb-32 relative" id="plantillas-prediseñadas">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none"></div>

          <div className="text-center mb-16 relative z-10">
            <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-3">LANZAMIENTO VELOZ</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Plantillas Pre-diseñadas de Élite
            </h2>
            <p className="text-slate-400 mt-4 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
              ¿Buscás lanzar rápido y con menor inversión? Descubrí nuestro catálogo exclusivo de plantillas semi-personalizadas de alta gama. Optimizadas para conversión, adaptadas a tu marca y listas en tiempo récord.
            </p>
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 backdrop-blur-md">
              <Percent className="w-4 h-4 text-rose-400 animate-bounce" />
              <span className="font-label text-[11px] tracking-[0.1em] text-rose-400 uppercase font-black">🔥 40% DE DESCUENTO INMEDIATO POR TIEMPO LIMITADO</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-16">
            {[
              {
                name: "SaaS Lumina",
                type: "Landing Page / App",
                desc: "Diseño ultrarrápido y minimalista con animaciones fluidas. Ideal para startups tecnológicas, SaaS y productos digitales.",
                originalPrice: "400",
                promoPrice: "240",
                badge: "40% OFF - Lanzamiento",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                features: ["Conversión 95% Lighthouse", "Framer Motion incluido", "Integración de leads y Stripe", "Listado en 3 días hábiles"]
              },
              {
                name: "InmoFuture",
                type: "Portal Inmobiliario",
                desc: "Plataforma de alta gama para agencias inmobiliarias y desarrolladores. Con filtros avanzados y fichas técnicas premium.",
                originalPrice: "600",
                promoPrice: "360",
                badge: "40% OFF - Más Popular",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
                features: ["Filtros dinámicos integrados", "Galería de imágenes premium", "Botón directo de WhatsApp", "Panel autoadministrable"]
              },
              {
                name: "Aura Dental / Clinic",
                type: "Salud & Consultorios",
                desc: "Diseño impecable para clínicas, médicos, odontólogos o consultores. Calendario de turnos online y servicios estelares.",
                originalPrice: "350",
                promoPrice: "210",
                badge: "40% OFF - Recomendada",
                image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
                features: ["Calendario de reservas online", "Sección de profesionales", "Testimonios y Google Reviews", "SEO optimizado localmente"]
              }
            ].map((tmpl) => (
              <div 
                key={tmpl.name} 
                className="group border border-white/15 bg-[#111322]/80 rounded-[2.5rem] overflow-hidden flex flex-col relative transition-all duration-500 hover:-translate-y-4 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]"
              >
                {/* Image header with high contrast hover zoom */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111322] to-transparent z-10"></div>
                  <img 
                    src={tmpl.image} 
                    alt={tmpl.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
                  />
                  <span className="absolute top-4 right-4 z-20 px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-lg">
                    {tmpl.badge}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="mb-6">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">{tmpl.type}</span>
                    <h3 className="font-headline text-2xl font-extrabold text-white mb-3 tracking-tight">{tmpl.name}</h3>
                    <p className="text-slate-350 text-sm font-light leading-relaxed min-h-[64px]">{tmpl.desc}</p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-6 border-y border-white/10 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Antes</span>
                      <span className="text-sm text-slate-400 line-through font-light">${tmpl.originalPrice} USD</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-rose-400 font-bold block">Con Descuento</span>
                      <span className="text-3xl font-black text-white">${tmpl.promoPrice} <span className="text-xs text-slate-400 font-light">USD</span></span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tmpl.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-xs text-slate-350 font-light">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/contact?service=template&name=${encodeURIComponent(tmpl.name)}`}
                    onClick={() => trackCTAClick(`webdev_template_${tmpl.name}`, '/contact')}
                    className="w-full py-4 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-[#0d0e17] font-headline text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 transform active:scale-95"
                  >
                    Obtener con Descuento
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Portfolio Button Call To Action */}
          <div className="relative z-10 text-center p-8 md:p-12 rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#16182c]/80 to-[#0e101f]/90 max-w-4xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="font-headline text-xl md:text-2xl font-extrabold text-white mb-4">
              ¿Querés ver de qué somos capaces?
            </h3>
            <p className="text-slate-350 font-light text-sm md:text-base max-w-2xl mx-auto mb-8">
              Explorá nuestra galería de proyectos reales, casos de éxito implementados de punta a punta y demos de software a medida que ya están escalando negocios hoy mismo.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4.5 bg-white/10 border border-white/20 text-white font-headline text-xs font-black uppercase tracking-[0.25em] rounded-xl hover:bg-white/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transform active:scale-95"
            >
              <span>Explorar Nuestro Portafolio</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
            </Link>
          </div>
        </section>

        {/* Dynamic CTA Block 1 (Neuquén Local SEO) */}
        <InternalLinkingCTA variant="seo" />

        {/* FAQ Section with strategically connected questions */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-3">RESOLVEMOS TUS DUDAS</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Todo lo que necesitás saber antes de dar inicio a la construcción de tu activo digital.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </section>

        {/* Formulario de Calificación */}
        <section className="mb-32 max-w-4xl mx-auto" id="presupuesto-desarrollo">
          <div className="text-center mb-12">
            <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-3">COTIZADOR AL INSTANTE</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight">
              Calcula el Presupuesto de tu Web
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Completa los requerimientos iniciales de tu proyecto y recibe una estimación y propuesta de desarrollo adaptada a tu medida.
            </p>
          </div>
          <LeadQualifierForm initialService="desarrollo" />
        </section>
      </main>
    </div>
  );
};

export default DesarrolloWebPage;
