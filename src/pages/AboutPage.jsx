import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import {
  Code,
  TrendUp,
  GearSix,
  Brain,
  MapPin,
  CheckCircle,
  Users,
  Stack,
  MagnifyingGlass,
  ArrowRight,
  Plus,
  Minus,
  PaperPlaneTilt,
} from '@phosphor-icons/react';

const industryPoints = [
  'Mantenimiento preventivo y correctivo',
  'Calibración de instrumentos',
  'Operación de equipos de medición y telemetría',
  'Desarrollo de procedimientos y capacitación',
  'Empresas: INTEYCO, PGP Petroaike/PECOM, Fischer',
  'Yacimientos: Loma Campana, El Orejano, Sierra Chata y Mangrullo',
];

const methodologySteps = [
  {
    number: '1',
    icon: Users,
    title: 'Entender antes de construir',
    desc: 'Analizamos tu negocio, tus clientes, tus procesos y tus desafíos. La tecnología tiene sentido cuando responde a una necesidad concreta.',
  },
  {
    number: '2',
    icon: Stack,
    title: 'Construir una base sólida',
    desc: 'Creamos sitios web rápidos, seguros y escalables, con una estructura pensada para las personas y también para los buscadores.',
  },
  {
    number: '3',
    icon: MagnifyingGlass,
    title: 'Hacer que te encuentren',
    desc: 'Trabajamos el SEO desde la intención de búsqueda real de tus clientes, generando contenido y estructura que posicionan tu negocio.',
  },
  {
    number: '4',
    icon: GearSix,
    title: 'Automatizar lo que tiene sentido',
    desc: 'Identificamos tareas repetitivas y las transformamos en flujos automatizados que ahorran tiempo, reducen errores y mejoran resultados.',
  },
  {
    number: '5',
    icon: Brain,
    title: 'Mejorar continuamente',
    desc: 'Medimos, analizamos y optimizamos en base a datos para detectar nuevas oportunidades y seguir creciendo.',
  },
];

const servicesList = [
  {
    icon: Code,
    title: 'Desarrollo web',
    desc: 'Sitios modernos, rápidos y escalables que representan tu marca y se convierten en la base de tu estrategia digital.',
    link: '/services/desarrollo-web',
  },
  {
    icon: TrendUp,
    title: 'SEO',
    desc: 'Mejoramos tu visibilidad orgánica para atraer las búsquedas que realmente importan a tu negocio.',
    link: '/services/marketing-digital',
  },
  {
    icon: GearSix,
    title: 'Automatización',
    desc: 'Optimizamos procesos repetitivos con herramientas digitales, integraciones y automatizaciones inteligentes.',
    link: '/services/automatizacion-ia',
  },
  {
    icon: Brain,
    title: 'Inteligencia artificial',
    desc: 'Exploramos e implementamos IA y agentes inteligentes donde realmente pueden aportar valor a tu negocio.',
    link: '/services/automatizacion-ia',
  },
];

const aboutFaqs = [
  {
    q: '¿Dónde está ubicada SEO Growthers?',
    a: 'SEO Growthers tiene su base en Neuquén, Patagonia Argentina, y trabaja en proyectos digitales que pueden desarrollarse de forma remota para clientes de diferentes ubicaciones.',
  },
  {
    q: '¿SEO Growthers es una agencia SEO?',
    a: 'SEO Growthers combina posicionamiento SEO con desarrollo web, automatización e inteligencia artificial. La idea es trabajar sobre el ecosistema digital completo cuando el proyecto lo necesita, en lugar de tratar el SEO como una actividad aislada.',
  },
  {
    q: '¿Trabajan solamente con empresas de Neuquén?',
    a: 'No. Aunque nuestra experiencia y base están vinculadas con Neuquén y la Patagonia, trabajamos también con proyectos de otras regiones de Argentina y el mundo.',
  },
  {
    q: '¿También desarrollan sitios web?',
    a: 'Sí. El desarrollo web es una de las áreas principales de SEO Growthers y se plantea como la base sobre la que pueden construirse posteriormente estrategias de SEO, contenido, automatización y otras soluciones digitales.',
  },
  {
    q: '¿Pueden automatizar procesos de mi empresa?',
    a: 'Depende del proceso. Primero analizamos qué tarea se quiere mejorar, cómo se realiza actualmente y qué alternativas existen. No todas las tareas necesitan automatización y no todas necesitan inteligencia artificial.',
  },
  {
    q: '¿Trabajan con inteligencia artificial?',
    a: 'Sí. SEO Growthers explora y desarrolla aplicaciones prácticas de inteligencia artificial, agentes y automatización, buscando utilizarlos cuando pueden aportar una mejora concreta al proyecto.',
  },
  {
    q: '¿Por qué combinar SEO con desarrollo web y automatización?',
    a: 'Porque la visibilidad es solamente una parte de un proyecto digital. Una empresa necesita poder ser encontrada, ofrecer una buena experiencia, convertir oportunidades y, cuando corresponde, automatizar procesos internos. Integrar estas áreas permite trabajar sobre una estrategia más completa.',
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-blue-500/40 bg-[#0e1424] shadow-[0_0_25px_rgba(59,130,246,0.1)]'
          : 'border-white/5 bg-[#0a0d18] hover:border-white/10'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group gap-4"
      >
        <h3
          className={`font-headline text-base md:text-lg font-semibold transition-colors ${
            isOpen ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'
          }`}
        >
          {question}
        </h3>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isOpen
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-white/5 text-slate-400 group-hover:text-white'
          }`}
        >
          {isOpen ? (
            <Minus weight="bold" className="w-4 h-4" />
          ) : (
            <Plus weight="bold" className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 md:px-6 pb-6 text-slate-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre SEO Growthers',
    description:
      'Tecnología, SEO y automatización con una mirada diferente. Conoce a Daniel Della Valentina y el equipo detrás de SEO Growthers en Neuquén, Argentina.',
    url: 'https://seogrowthers.com/nosotros',
    mainEntity: {
      '@type': 'Organization',
      name: 'SEO Growthers',
      founder: {
        '@type': 'Person',
        name: 'Daniel Della Valentina',
        jobTitle: 'Founder & Tech Director',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Neuquén',
        addressRegion: 'Neuquén',
        addressCountry: 'AR',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: aboutFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="text-on-surface font-body selection:bg-blue-500/30 selection:text-white min-h-screen relative overflow-hidden bg-[#06080F]">
      <Helmet>
        <title>Sobre Nosotros | SEO Growthers - Tecnología, SEO y Automatización</title>
        <meta
          name="description"
          content="Conocé la historia de SEO Growthers en Neuquén. De la industria energética al desarrollo web, SEO y automatización con IA. Soluciones reales para empresas."
        />
        <link rel="canonical" href="https://seogrowthers.com/nosotros" />
        <meta property="og:title" content="Sobre Nosotros | SEO Growthers" />
        <meta
          property="og:description"
          content="Tecnología, SEO y automatización con una mirada diferente. Nacidos en Neuquén para impulsar proyectos de todo el mundo."
        />
        <meta property="og:url" content="https://seogrowthers.com/nosotros" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/images/daniel-della-valentina.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nosotros | SEO Growthers" />
        <meta
          name="twitter:description"
          content="Tecnología, SEO y automatización con una mirada diferente. Nacidos en Neuquén."
        />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <ScrollToTop />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO WITH CINEMATIC INTERACTIVE VIDEO BACKGROUND               */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed interactive background video */}
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

        {/* Dark overlay for readability with smooth bottom fade into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0D0D]/80 via-[#0C0D0D]/60 to-[#06080F]" />

        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 w-full pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <Breadcrumbs className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text & Pillars */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/15 text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md">
                SOBRE NOSOTROS
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl lg:text-5.5xl font-extrabold text-white tracking-tight leading-[1.12]">
                Tecnología, SEO y <br />
                automatización con <br />
                una <span className="text-[#3B82F6]">mirada diferente</span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl font-light">
                SEO Growthers es un proyecto nacido en Neuquén, Argentina, que combina desarrollo web,
                posicionamiento SEO, automatización e inteligencia artificial para transformar oportunidades
                digitales en resultados reales.
              </p>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="flex flex-col items-center sm:items-start gap-2.5 p-3.5 rounded-xl border border-white/10 bg-[#0e1322]/80 backdrop-blur-md text-center sm:text-left hover:border-blue-500/40 transition-all shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Code weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs">Desarrollo Web</h4>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2.5 p-3.5 rounded-xl border border-white/10 bg-[#0e1322]/80 backdrop-blur-md text-center sm:text-left hover:border-blue-500/40 transition-all shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <TrendUp weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs">SEO Estratégico</h4>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2.5 p-3.5 rounded-xl border border-white/10 bg-[#0e1322]/80 backdrop-blur-md text-center sm:text-left hover:border-blue-500/40 transition-all shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <GearSix weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs">Automatización Inteligente</h4>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2.5 p-3.5 rounded-xl border border-white/10 bg-[#0e1322]/80 backdrop-blur-md text-center sm:text-left hover:border-blue-500/40 transition-all shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Brain weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs">Inteligencia Artificial</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Daniel's Portrait Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-b from-[#0e1424] via-[#090d18] to-[#06080f] p-3 shadow-[0_0_60px_rgba(59,130,246,0.15)] group backdrop-blur-sm">
                {/* Background Matrix/Grid Accent */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:8px_8px] opacity-30 pointer-events-none" />
                <div className="absolute bottom-16 left-4 w-20 h-20 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />

                {/* Portrait Image with elegant blend */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img
                    src="/images/daniel-della-valentina.jpg"
                    alt="Daniel Della Valentina - Fundador de SEO Growthers"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Gradient Mask at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>

                {/* Floating Badge (Location & Reach) */}
                <div className="mt-3 p-4 rounded-2xl border border-blue-500/20 bg-[#0d1222]/90 backdrop-blur-md flex items-center gap-3.5 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <MapPin weight="fill" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">
                      Desde Neuquén, Patagonia Argentina
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Trabajamos con proyectos de Argentina y el mundo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area for Rest of Sections */}
      <main className="pt-16 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 space-y-28 md:space-y-36">


        {/* ========================================================================= */}
        {/* SECTION 2: DE LA INDUSTRIA A LA TECNOLOGÍA                               */}
        {/* ========================================================================= */}
        <section className="space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider mb-4">
              DE LA INDUSTRIA A LA TECNOLOGÍA
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Experiencia real. <span className="text-[#3B82F6]">Soluciones que funcionan.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Story Narrative */}
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-light">
              <p>
                Detrás de SEO Growthers está <strong className="text-white font-semibold">Daniel Della Valentina</strong>, profesional con más de 10 años de experiencia en la industria del petróleo y gas, en áreas de instrumentación, mantenimiento, calibración, telemetría y well testing.
              </p>
              <p>
                Esa experiencia dejó algo claro: los datos deben ser confiables, los procesos deben funcionar y las soluciones deben resolver problemas reales.
              </p>
              <p>
                Con el tiempo, esa mirada técnica se encontró con el mundo del software, los datos, la automatización y la inteligencia artificial.
              </p>
              <p>
                Hoy combinamos esa base industrial con tecnologías modernas como Firebase, agentes de IA, Gemini, MCP y herramientas que nos permiten optimizar procesos y construir soluciones digitales inteligentes.
              </p>
            </div>

            {/* Right Card: Industry Experience Checklist */}
            <div className="lg:col-span-5 bg-[#0e1424] border border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-headline text-xl font-bold text-white mb-6">
                Experiencia en la industria
              </h3>

              <ul className="space-y-4">
                {industryPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                    <CheckCircle weight="fill" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: NUESTRA FORMA DE TRABAJAR                                     */}
        {/* ========================================================================= */}
        <section className="space-y-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider mb-4">
              NUESTRA FORMA DE TRABAJAR
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Un método claro para <span className="text-[#3B82F6]">resultados reales</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {methodologySteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-[#0e1322]/80 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group relative overflow-hidden"
                >
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
                        {step.number}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-blue-400 transition-colors">
                        <IconComp weight="duotone" className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-headline text-base sm:text-lg font-bold text-white leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: LO QUE HACEMOS                                                */}
        {/* ========================================================================= */}
        <section className="space-y-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider mb-4">
              LO QUE HACEMOS
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Soluciones digitales que impulsan tu negocio
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <Link
                  to={service.link}
                  key={idx}
                  className="bg-[#0e1322]/80 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg group block"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                      <IconComponent weight="duotone" className="w-6 h-6" />
                    </div>

                    <h3 className="font-headline text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center text-xs font-semibold text-blue-400 gap-1.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <span>Ver más</span>
                    <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: PREGUNTAS FRECUENTES                                          */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading & Contact Mini Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
              PREGUNTAS FRECUENTES
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Respuestas a las dudas más comunes
            </h2>

            <div className="pt-4">
              <Link
                to="/contacto"
                className="p-5 rounded-2xl border border-blue-500/20 bg-[#0e1424] hover:bg-[#12192e] transition-all flex items-center justify-between group max-w-sm shadow-md"
              >
                <div>
                  <p className="text-white font-bold text-sm">¿Tenés otra consulta?</p>
                  <p className="text-blue-400 text-xs mt-0.5 group-hover:underline">
                    Hablemos
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:translate-x-1 transition-transform">
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: FAQs Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {aboutFaqs.map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: BOTTOM CTA BANNER (¿Hablamos sobre tu proyecto?)              */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-[#0d1428] via-[#0b1020] to-[#090d1a] border border-blue-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(59,130,246,0.12)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Icon */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                <PaperPlaneTilt weight="duotone" className="w-7 h-7" />
              </div>
            </div>

            {/* Middle Text */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
                ¿Hablamos sobre <span className="text-[#3B82F6]">tu proyecto?</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Si estás pensando en crear un sitio web, mejorar tu posicionamiento en Google, automatizar un proceso o explorar cómo la inteligencia artificial puede aplicarse a tu negocio, podemos analizarlo. No hace falta que tengas definida la solución. Podemos empezar por el problema.
              </p>
            </div>

            {/* Right Button */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:scale-105"
              >
                <span>Hablar sobre mi proyecto</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
