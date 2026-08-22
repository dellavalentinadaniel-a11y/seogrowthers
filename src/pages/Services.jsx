import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InternalLinkingCTA from "@/components/shared/InternalLinkingCTA";
import LeadQualifierForm from "@/components/contact/LeadQualifierForm";
import GoogleBusinessReviews from "@/components/shared/GoogleBusinessReviews";
import {
  MagnifyingGlass as Search,
  Robot,
  TrendUp as TrendingUp,
  ChartBar as BarChart,
  Sparkle,
  Lightning,
  CheckCircle,
  ArrowRight,
  CaretRight,
  Plus,
  Minus,
  ShieldCheck,
  Globe,
  Storefront,
  Image as ImageIcon,
  Target,
  ThumbsUp,
  Envelope,
  Cpu,
  Wrench,
  Stack as Layers,
} from "@phosphor-icons/react";

// ─── Data ───────────────────────────────────────────────────────────────────

const heroChecklist = [
  "Desarrollo Web de Alta Conversión",
  "SEO y Marketing Digital con ROI real",
  "Automatización con IA y Agentes Autónomos",
  "Estrategias omnicanal basadas en datos",
];

const methodologySteps = [
  {
    step: "01",
    icon: BarChart,
    title: "Diagnóstico & Auditoría",
    desc: "Análisis profundo de tu presencia digital, competencia y oportunidades de mercado para sentar la base estratégica.",
  },
  {
    step: "02",
    icon: Sparkle,
    title: "Estrategia Personalizada",
    desc: "Diseñamos un plan de acción específico para tu industria, presupuesto y objetivos de crecimiento.",
  },
  {
    step: "03",
    icon: Lightning,
    title: "Ejecución de Alto Impacto",
    desc: "Implementamos con velocidad y precisión, manteniendo la calidad técnica en cada entregable.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Optimización Continua",
    desc: "Medición, análisis y refinamiento iterativo para maximizar el retorno y escalar resultados.",
  },
];

const serviceCategories = [
  {
    id: "desarrollo-web",
    step: "01",
    badge: "Ingeniería Digital",
    title: "Desarrollo Web",
    description:
      "Construimos ecosistemas digitales de alto rendimiento. Interfaces inmersivas y arquitecturas robustas diseñadas para escalar y maximizar la conversión.",
    accentColor: "#00e5ff",
    glowRgb: "0,229,255",
    landingUrl: "/services/desarrollo-web-argentina",
    btnClass:
      "bg-gradient-to-r from-[#00e5ff] to-blue-600 text-[#0d0e17] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)]",
    services: [
      { name: "Landing Pages", desc: "Páginas de alta conversión optimizadas para campañas y captura de leads.", icon: Globe, link: "/services/landing-pages" },
      { name: "Sitio Corporativo", desc: "Presencia digital premium que proyecta la autoridad de tu empresa.", icon: Storefront, link: "/services/web-corporativa" },
      { name: "Tiendas Online", desc: "E-commerce escalables y optimizados para la mejor experiencia de compra.", icon: ImageIcon, link: "/services/ecommerce" },
      { name: "Apps & Software", desc: "Aplicaciones móviles, software a medida y soluciones SaaS.", icon: Cpu, link: "/services/apps-software" },
    ],
    image: "/images/services/web-dev.webp",
    metric: { label: "Core Web Vitals Score", value: "100/100" },
  },
  {
    id: "marketing-digital",
    step: "02",
    badge: "Estrategias ROI-Driven",
    title: "Marketing Digital",
    description:
      "Estrategias omnicanal basadas en datos empíricos para amplificar tu alcance, dominar tu nicho y multiplicar tu retorno de inversión.",
    accentColor: "#9372FF",
    glowRgb: "147,114,255",
    landingUrl: "/services/marketing-digital",
    btnClass:
      "bg-gradient-to-r from-[#9372FF] to-fuchsia-600 text-white hover:shadow-[0_0_35px_rgba(147,114,255,0.45)]",
    services: [
      { name: "SEO Técnico", desc: "Posicionamiento orgánico de élite para tráfico sostenible a largo plazo.", icon: Search, link: "/services/seo-neuquen" },
      { name: "SEM & Google Ads", desc: "Campañas hiper-segmentadas en Google y redes con ROI positivo.", icon: Target, link: "/services/marketing-digital" },
      { name: "Redes Sociales", desc: "Gestión de comunidad y contenido viral para fidelizar audiencias.", icon: ThumbsUp, link: "/services/marketing-digital" },
      { name: "Email Marketing", desc: "Automatización de correos para nutrir leads y aumentar LTV.", icon: Envelope, link: "/services/marketing-digital" },
    ],
    image: "/images/services/marketing.webp",
    metric: { label: "Conversion Boost Promedio", value: "+312%" },
  },
  {
    id: "automatizacion",
    step: "03",
    badge: "Inteligencia Artificial",
    title: "Automatización IA",
    description:
      "Optimizamos tus operaciones delegando tareas repetitivas a sistemas inteligentes. Escala tu negocio sin incrementar proporcionalmente tus costos.",
    accentColor: "#00e676",
    glowRgb: "0,230,118",
    landingUrl: "/services/automatizacion-ia",
    btnClass:
      "bg-gradient-to-r from-[#00e676] to-emerald-600 text-[#0d0e17] hover:shadow-[0_0_35px_rgba(0,230,118,0.45)]",
    services: [
      { name: "Marketing Automatizado", desc: "Embudos automatizados que cualifican prospectos y cierran ventas 24/7.", icon: TrendingUp, link: "/services/automatizacion-ia" },
      { name: "RPA (Bots)", desc: "Bots de software que eliminan el trabajo administrativo monótono.", icon: Robot, link: "/services/rpa-automatizacion" },
      { name: "Integraciones No-Code", desc: "Conexión fluida entre tu stack tecnológico sin fricciones.", icon: Wrench, link: "/services/integraciones-no-code" },
      { name: "IA Agéntica", desc: "Agentes autónomos que ejecutan flujos complejos de forma autónoma.", icon: Layers, link: "/services/ia-agentica-agentes" },
    ],
    image: "/images/services/automation.webp",
    metric: { label: "Reducción de Costos Operativos", value: "-60%" },
  },
];

const faqs = [
  { q: "¿Cuánto cuesta un sitio web profesional?", a: "Nuestros proyectos de desarrollo web comienzan desde $800 USD para landing pages de alta conversión. Sitios corporativos desde $1,500 USD y tiendas online desde $2,500 USD. Cada presupuesto incluye diseño responsive, optimización SEO básica y soporte post-lanzamiento." },
  { q: "¿Cuánto tiempo tarda en posicionarse mi sitio en Google?", a: "Los resultados de SEO técnico se ven en 2-4 semanas. El posicionamiento orgánico por keywords competitivas toma entre 3 y 6 meses. Nuestros clientes suelen ver un aumento de tráfico del 150-300% en el primer semestre." },
  { q: "¿Qué incluye el servicio de Marketing Digital?", a: "Incluye estrategia SEO completa, gestión de campañas SEM (Google Ads), community management en redes sociales, email marketing automatizado y reportes mensuales con métricas de rendimiento." },
  { q: "¿Qué es la automatización con IA y cómo beneficia a mi empresa?", a: "La automatización con IA permite delegar tareas repetitivas a sistemas inteligentes: desde embudos de venta automáticos y chatbots, hasta integración de herramientas y agentes de IA autónomos. Reduce costos operativos hasta un 60%." },
  { q: "¿Trabajan con empresas fuera de Argentina?", a: "Sí, trabajamos con empresas de toda Latinoamérica y España. Nuestro equipo opera de forma remota y nos adaptamos a diferentes zonas horarias. Facturamos en USD." },
  { q: "¿Ofrecen auditoría SEO gratuita?", a: "Sí, realizamos una auditoría preliminar gratuita que incluye análisis técnico básico, revisión de meta tags, velocidad de carga y oportunidades de mejora inmediatas." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${isOpen ? "border-cyan-400/50 bg-slate-900/90 shadow-[0_0_25px_rgba(0,219,231,0.12)]" : "border-white/10 bg-slate-950/60 hover:border-cyan-400/30"}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group">
        <h3 className={`font-headline text-base md:text-lg font-bold pr-4 transition-colors ${isOpen ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`}>{question}</h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${isOpen ? "bg-cyan-400/20 text-cyan-400" : "bg-white/5 text-slate-400 group-hover:text-white"}`}>
          {isOpen ? <Minus weight="duotone" className="w-5 h-5" /> : <Plus weight="duotone" className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="px-6 pb-6 text-slate-300 leading-relaxed font-light text-sm md:text-base border-t border-white/5 pt-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceCard = ({ service, accentColor }) => {
  const Icon = service.icon;
  const Wrapper = service.link ? Link : "div";
  const wrapperProps = service.link ? { to: service.link } : {};
  return (
    <Wrapper {...wrapperProps} className="group p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 block">
      <Icon weight="duotone" className="w-8 h-8 mb-4 transition-transform group-hover:scale-110" style={{ color: accentColor }} />
      <h3 className="font-bold text-white text-base mb-2">{service.name}</h3>
      <p className="text-slate-400 text-sm leading-relaxed font-light mb-4">{service.desc}</p>
      {service.link && (
        <span className="text-[10px] font-black tracking-widest uppercase inline-flex items-center gap-1" style={{ color: accentColor }}>
          VER MÁS <CaretRight weight="duotone" className="w-3 h-3" />
        </span>
      )}
    </Wrapper>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

const Services = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SEO Growthers",
    description: "Agencia de Desarrollo Web, SEO, Marketing Digital y Automatización con IA para empresas en crecimiento.",
    url: "https://seogrowthers.com/services",
    telephone: "+54 9 2995504783",
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressCountry: "AR", addressLocality: "Neuquén" },
    areaServed: [{ "@type": "Country", name: "Argentina" }, { "@type": "Country", name: "España" }],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="text-white font-body min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Servicios de SEO, Desarrollo Web y Automatización IA | SEO Growthers</title>
        <meta name="description" content="Desarrollo Web de alto rendimiento, Marketing Digital con ROI real y Automatización con IA. La agencia que impulsa tu crecimiento digital en Argentina." />
        <link rel="canonical" href="https://seogrowthers.com/services" />
        <meta property="og:title" content="Servicios Premium | SEO Growthers" />
        <meta property="og:url" content="https://seogrowthers.com/services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
          <source src="/videos/marketing-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0D0D]/85 via-[#0C0D0D]/65 to-[#0c0d14]" />

        <div className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <Breadcrumbs className="mb-8" />
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Soluciones de Próxima Generación</span>
                <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-none">
                  Dominio{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Digital</span>{" "}
                  de Vanguardia
                </h1>
                <p className="max-w-xl text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10">
                  Ingeniería de precisión, marketing omnicanal y automatizaciones avanzadas fusionadas en un ecosistema digital diseñado para escalar tus resultados.
                </p>
                <div className="space-y-4 mb-12">
                  {heroChecklist.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i, duration: 0.5 }} className="flex items-center gap-3 text-base font-medium text-slate-200">
                      <CheckCircle weight="duotone" className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  <a href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20conocer%20los%20servicios" target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-400 transition-all hover:shadow-[0_0_25px_rgba(0,219,231,0.4)]">
                    CONSULTAR AHORA <ArrowRight weight="duotone" className="w-4 h-4" />
                  </a>
                  <Link to="/auditoria-seo-gratis" className="border border-white/10 bg-white/5 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm">
                    Auditoría SEO Gratis
                  </Link>
                </div>
                <div className="mt-12 flex items-center gap-6 pt-8 border-t border-white/10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Cliente" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-cyan-900 flex items-center justify-center font-mono text-[10px] font-bold text-cyan-400">+45</div>
                  </div>
                  <div className="text-xs text-slate-400 font-light leading-snug">
                    <span className="text-white font-bold">Casos de éxito</span> <br /> optimizados este año en Argentina.
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 p-4 bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
                <div className="bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative aspect-square">
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Digital ecosystem" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-900/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl shadow-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">ECOSYSTEM ROI</p>
                      <h3 className="text-4xl font-black text-white">+280%</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <TrendingUp weight="duotone" className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </motion.div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      <main className="pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section className="mb-32 py-16 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Metodología</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">Nuestro Pipeline de Trabajo</h2>
            <p className="text-slate-400 text-base font-light">Un proceso sistemático diseñado para transformar datos en crecimiento predecible.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {methodologySteps.map((step, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-slate-950 border border-white/5 group hover:border-cyan-400/20 transition-all">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center font-headline font-black text-cyan-400 shadow-xl">{step.step}</div>
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

        {/* ── Service Categories ───────────────────────────────────────────── */}
        <div className="space-y-40">
          {serviceCategories.map((cat, catIndex) => {
            const isReversed = catIndex % 2 !== 0;
            return (
              <section key={cat.id} id={cat.id} className="relative">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
                    <motion.div initial={{ opacity: 0, x: isReversed ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-headline text-6xl font-black opacity-20" style={{ color: cat.accentColor }}>{cat.step}</span>
                        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: cat.accentColor }}>{cat.badge}</span>
                      </div>
                      <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{cat.title}</h2>
                      <p className="text-slate-300 text-lg leading-relaxed font-light mb-10">{cat.description}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {cat.services.map((svc, si) => (
                          <ServiceCard key={si} service={svc} accentColor={cat.accentColor} />
                        ))}
                      </div>
                      <div className="mt-10">
                        <Link to={cat.landingUrl} className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-105 group ${cat.btnClass}`}>
                          <span>Explorar {cat.title}</span>
                          <ArrowRight weight="duotone" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative p-4 bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl sticky top-28">
                      <div className="bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative aspect-[4/3]">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 p-5 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-between border" style={{ borderColor: `rgba(${cat.glowRgb},0.3)` }}>
                          <div>
                            <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: cat.accentColor }}>{cat.metric.label}</p>
                            <h3 className="text-3xl font-black text-white">{cat.metric.value}</h3>
                          </div>
                          <div className="w-14 h-14 rounded-full flex items-center justify-center border" style={{ background: `rgba(${cat.glowRgb},0.1)`, borderColor: `rgba(${cat.glowRgb},0.2)` }}>
                            <TrendingUp weight="duotone" className="w-7 h-7" style={{ color: cat.accentColor }} />
                          </div>
                        </div>
                        <div className="absolute top-6 right-6 flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Reviews ─────────────────────────────────────────────────────── */}
        <div className="mt-32 mb-32">
          <GoogleBusinessReviews />
        </div>

        {/* ── Growth Chart ─────────────────────────────────────────────────── */}
        <section className="mb-32 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Resultados</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-8">Escalabilidad <span className="text-cyan-400">Sin Techo</span></h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">Combinamos ingeniería de datos y creatividad estratégica para posicionar tu marca donde tus clientes están buscando soluciones.</p>
            <div className="space-y-6">
              {[
                { title: "SEO Orgánico de Alto Rendimiento", desc: "Optimizamos tu arquitectura para dominar las SERPs sin depender exclusivamente del gasto publicitario.", icon: Search },
                { title: "Performance Marketing", desc: "Campañas ultra-segmentadas con algoritmos de pujas automáticas para maximizar el ROAS.", icon: Target },
                { title: "Automatización & IA", desc: "Agentes autónomos y flujos inteligentes que operan 24/7 escalando sin costos proporcionales.", icon: Robot },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                    <item.icon weight="duotone" className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-10 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp weight="duotone" className="w-24 h-24 text-cyan-400" />
            </div>
            <div className="space-y-6 relative z-10">
              <div className="mb-8">
                <h4 className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase mb-2">Performance Report</h4>
                <p className="text-white font-bold text-lg">Crecimiento Promedio de Clientes</p>
              </div>
              {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-500 w-8">{["MES 1","MES 2","MES 3","MES 4","MES 5","MES 6","MES 7"][i]}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${h}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,219,231,0.3)]" />
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

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 block">Knowledge Base</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-400 text-base font-light">Respuestas técnicas y estratégicas sobre nuestra forma de trabajar.</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (<FAQItem key={i} question={faq.q} answer={faq.a} />))}
          </div>
          <div className="text-center mt-8">
            <Link to="/contacto" className="text-cyan-400 text-sm font-bold tracking-widest hover:text-cyan-300 transition-colors inline-flex items-center gap-2">
              Tenés otra pregunta? Contactanos <ArrowRight weight="duotone" className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Lead Form ────────────────────────────────────────────────────── */}
        <section className="mb-32 max-w-4xl mx-auto" id="presupuesto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-4">CALCULADOR DE ESTRATEGIA</div>
            <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Agenda tu Auditoría <br /> de Crecimiento</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">Completa tus datos y nuestro equipo preparará un roadmap estratégico preliminar sin compromiso.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500" />
            <LeadQualifierForm initialService="general" />
          </div>
        </section>

        <InternalLinkingCTA variant="seo" />
      </main>
    </div>
  );
};

export default Services;
