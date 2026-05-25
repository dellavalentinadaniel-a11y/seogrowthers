import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { m, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, BarChart3, Globe, Zap, Users, Code2, Server, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';

const SuccessCaseSeoPlatform = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Detrás del código: Cómo construimos SEO Growthers desde cero",
    "author": { "@type": "Organization", "name": "SEO Growthers" },
    "publisher": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-25",
    "description": "El caso de estudio completo detrás del desarrollo de la plataforma SEO Growthers (seogrowthers.com), incluyendo su arquitectura DevOps, el enfoque de Vibe Coding y la optimización SEO."
  };

  const metrics = [
    { label: 'Rendimiento Lighthouse', before: '45/100', after: '100/100', icon: <Zap className="text-yellow-500" /> },
    { label: 'Ingesta de Contenidos', before: 'Manual (1h)', after: 'Automatizada (10s)', icon: <Server className="text-cyan-500" /> },
    { label: 'Arquitectura SEO', before: 'Desestructurada', after: '100% Optimizada', icon: <BarChart3 className="text-green-500" /> },
  ];

  const technicalData = [
    { category: 'Entorno de Desarrollo', tools: 'Linux (Ubuntu, Fedora)' },
    { category: 'Control de Versiones', tools: 'GitHub (Gestión de repositorios y control de cambios)' },
    { category: 'Contenerización', tools: 'Docker (Aislamiento de entornos y consistencia en despliegue)' },
    { category: 'Frontend', tools: 'HTML5, CSS3, JavaScript, TypeScript (Tipado estricto)' },
    { category: 'Backend & Lógica', tools: 'Python (Scripts de automatización y procesamiento)' },
    { category: 'Base de Datos & BaaS', tools: 'Supabase (Autenticación, base de datos Postgres y almacenamiento)' },
    { category: 'Infraestructura y Hosting', tools: 'Hostinger Cloud (Servidores virtuales optimizados para producción)' },
    { category: 'Pipeline de Datos', tools: 'Ingesta de canales RSS → Scraping de limpieza HTTP → Parseo a JSON' },
    { category: 'Stack de IA (Vibe Coding)', tools: 'Antigravity IDE, Google AI Studio, Modelos LLM' },
    { category: 'Estructura e Ingeniería SEO', tools: 'Rank Math PRO (Schema, Metadatos, XML)' },
    { category: 'Analítica y Monitorización', tools: 'Google Search Console, Ubersuggest' },
  ];

  const faqs = [
    {
      question: "¿Qué es el 'Vibe Coding' y cómo se aplicó en SEO Growthers?",
      answer: "El Vibe Coding es una filosofía de desarrollo ágil en la que el desarrollador actúa como un Arquitecto de IA. En lugar de escribir manualmente todo el código repetitivo, configuraciones de bases de datos o scripts de automatización, se dirigen y orquestan agentes de IA avanzados (como Antigravity y Google AI Studio) para generar la estructura técnica, mientras el arquitecto se enfoca en la lógica del negocio, la seguridad y la integración estratégica de las piezas."
    },
    {
      question: "¿Cómo funciona el pipeline de automatización de contenidos en Python?",
      answer: "Desarrollamos scripts en Python que monitorean continuamente canales de información estructurada (RSS feeds). Al detectar novedades relevantes, el pipeline realiza un scraping de limpieza HTTP eliminando elementos innecesarios, parsea los datos a formato JSON y los almacena dinámicamente en Supabase. Esto permite que el portal de novedades se mantenga actualizado de forma autónoma en segundos, reduciendo drásticamente la intervención manual."
    },
    {
      question: "¿Por qué se eligió un entorno híbrido de Hostinger Cloud y Supabase?",
      answer: "Buscamos separar responsabilidades para obtener máxima escalabilidad. Hostinger Cloud proporciona servidores virtuales sumamente estables y veloces optimizados para servir el frontend con baja latencia (TTFB reducido), mientras que Supabase actúa como el Backend-as-a-Service (BaaS) encargado de la base de datos PostgreSQL en tiempo real, la autenticación de usuarios y el almacenamiento seguro de recursos."
    },
    {
      question: "¿Cómo se logran las métricas perfectas Core Web Vitals (LCP < 1.2s)?",
      answer: "La clave reside en la optimización extrema del frontend: implementación de imágenes en formatos modernos de última generación (WebP/AVIF), precarga de recursos en la ruta crítica de renderizado (Preload LCP), uso de fuentes no bloqueantes y eliminación de JavaScript innecesario. Todo esto respaldado por el rendimiento y caché de servidores robustos en la nube."
    }
  ];

  // State for colapsable Accordion FAQs
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const metadata = {
    title: "Caso de Éxito: Desarrollo de la Plataforma SEO Growthers | SEOGrowthers",
    description: "Conocé cómo construimos SEO Growthers desde cero: stack de desarrollo Linux, Python, React, Supabase y la metodología de Vibe Coding con Inteligencia Artificial.",
    image: "/images/seo-platform-showcase.webp",
    url: "https://seogrowthers.com/services/success-cases/seo-growthers-plataforma-ecosistema"
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-20 relative overflow-hidden bg-[#0a0a0c]">
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={metadata.url} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none"></div>
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 relative z-10 max-w-6xl">
        <Breadcrumbs className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <m.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-[1px] bg-cyan-500"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">Ecosistema & Desarrollo</span>
            </div>
            <h1 className="text-4xl md:text-5.5xl lg:text-6.5xl font-black mb-6 leading-tight tracking-tight text-white">
              SEO Growthers: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500">Desarrollo desde Cero</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light">
              Cómo conceptualizamos y creamos nuestro propio ecosistema digital premium: blog autogestionado, analíticas profundas, automatización con Python y una experiencia UX/UI de gama alta.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">React + Vite</span>
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">Python Automation</span>
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">Supabase DB</span>
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">Vibe Coding</span>
            </div>

            <a 
              href="https://seogrowthers.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-cyan-400 text-[#0d0e17] px-7 py-3.5 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300 group"
            >
              <Globe size={16} />
              <span>Explorar Plataforma en Vivo</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 bg-cyan-500/10 blur-[80px] rounded-full opacity-35 pointer-events-none"></div>
            <div className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-black/40">
              <img 
                src="/images/seo-growthers-home.png" 
                alt="SEO Growthers Platform Home Preview" 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent pointer-events-none"></div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white/[0.02] border-y border-white/5 py-14 mb-20 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="p-6 bg-black/35 rounded-2xl border border-white/5 hover:border-cyan-500/25 transition-all group"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 text-cyan-400 flex items-center justify-center border border-cyan-400/20 group-hover:scale-110 transition-transform">
                    {metric.icon}
                  </div>
                  <h3 className="text-slate-400 text-xs font-black uppercase tracking-wider">{metric.label}</h3>
                </div>
                <div className="flex items-center gap-3 pl-1">
                  <span className="text-slate-500 line-through text-sm font-semibold">{metric.before}</span>
                  <ArrowRight size={14} className="text-cyan-500" />
                  <span className="text-2xl font-black text-white">{metric.after}</span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="space-y-16">
          
          {/* Introducción */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3.5xl font-black mb-6 text-white leading-tight">
              Detrás del código: Cómo construimos SEO Growthers desde cero
            </h2>
            <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-6 font-light">
              <p>
                El crecimiento digital no es magia; es ingeniería, estrategia y mucha iteración. Cuando decidí darle vida a <strong className="text-white font-semibold">SEO Growthers (seogrowthers.com)</strong>, el objetivo era claro: crear una plataforma robusta que no solo hablara de optimización y crecimiento digital, sino que estuviera construida bajo esos mismos estándares desde su primera línea de código.
              </p>
              <p>
                Hoy quiero compartir con ustedes el viaje de desarrollo de este proyecto, las tecnologías que elegimos, cómo integramos la inteligencia artificial en nuestro día a día y los desafíos que superamos en el camino.
              </p>
            </div>
          </m.div>

          {/* El Proyecto */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold mb-5 text-white flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono tracking-widest">01.</span> El Proyecto: Un Ecosistema Dinámico
            </h2>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 text-slate-350 text-base font-light leading-relaxed">
                <p className="mb-4">
                  SEO Growthers nació de la necesidad de centralizar recursos, lead magnets y estrategias de posicionamiento web. No queríamos hacer un blog tradicional, sino una plataforma dinámica donde la estructura del sitio y la calidad técnica hablaran por sí solas.
                </p>
                <p>
                  Desde el primer día, la visión fue automatizar procesos sin sacrificar la calidad, asegurando que cada página estuviera diseñada de forma inteligente para rankear orgánicamente en Google y convertir a los visitantes en clientes potenciales.
                </p>
              </div>
              <div className="md:col-span-5 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
                <img 
                  src="/images/seo-growthers-tools.png" 
                  alt="Galería de Herramientas SEO Growthers" 
                  className="w-full h-auto object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </m.div>

          {/* Stack Tecnológico */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold mb-5 text-white flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono tracking-widest">02.</span> Filosofía de Desarrollo & Stack
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-6 font-light mb-8">
              <p>
                Para lograr un rendimiento de velocidad excepcional y un flujo de trabajo ágil, la elección de las herramientas fue un pilar fundamental.
              </p>
              <ul className="space-y-4 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 shrink-0"></span>
                  <div>
                    <strong className="text-white font-semibold">El Entorno de Trabajo:</strong> Todo el desarrollo y la configuración de servidores se gestó en un entorno de sistema operativo <strong className="text-white font-semibold">Linux</strong>, lo que me proporcionó la estabilidad, seguridad y el control absoluto que un proyecto de este tipo requiere directamente desde la línea de comandos en la terminal.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 shrink-0"></span>
                  <div>
                    <strong className="text-white font-semibold">Lenguajes y Automatización:</strong> A nivel estructural, utilizamos una base moderna de <strong className="text-white font-semibold">HTML, CSS, JavaScript y TypeScript</strong> para garantizar una interfaz de usuario rápida y reactiva. Sin embargo, el verdadero motor de la plataforma corre gracias a <strong className="text-white font-semibold">Python</strong>, el cual nos ha permitido crear pipelines personalizados, automatizar la recolección de datos (scraping) y gestionar la publicación de contenidos de forma eficiente.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 shrink-0"></span>
                  <div>
                    <strong className="text-white font-semibold">El Motor SEO:</strong> Para garantizar que el SEO On-Page fuera impecable, implementamos <strong className="text-white font-semibold">Rank Math PRO</strong> para tener un control granular sobre nuestros metadatos, esquemas enriquecidos (Schema markup) y sitemaps. Todo esto respaldado por una investigación de palabras clave exhaustiva utilizando herramientas como <strong className="text-white font-semibold">Ubersuggest</strong>.
                  </div>
                </li>
              </ul>
            </div>
          </m.div>

          {/* Vibe Coding */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-cyan-950/20 to-blue-950/15 border border-cyan-500/20"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <Code2 className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-extrabold text-white">"Vibe Coding": Actuando como Arquitecto de IA</h3>
            </div>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-4 italic">
              "Uno de los aspectos más innovadores del desarrollo de SEO Growthers fue nuestra metodología de trabajo. En lugar de escribir cada bloque de código de la manera tradicional, adopté un enfoque de 'Vibe Coding'.
            </p>
            <p className="text-slate-350 text-sm md:text-base font-light leading-relaxed">
              Asumí el rol de arquitecto, orquestando y dirigiendo diferentes agentes de Inteligencia Artificial y entornos de desarrollo avanzados. Esto me permitió delegar la generación de código repetitivo, la creación de scripts de automatización y el planteamiento de bases de datos a la IA, mientras yo me enfocaba en la lógica de negocio, la arquitectura del sitio y la integración de las piezas. Es un cambio de paradigma: pasas de ser el obrero a ser el director de la obra."
            </p>
          </m.div>

          {/* Desafíos */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold mb-5 text-white flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono tracking-widest">03.</span> Desafíos Técnicos Superados
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/15 transition-all">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Sincronización de Agentes de IA
                </h4>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  Lograr que los diferentes flujos de trabajo automatizados (como los canales RSS y los generadores de contenido) se integraran de forma natural en el sitio sin que pareciera "robótico". Requirió muchas pruebas y refinamiento de prompts e instrucciones en el backend.
                </p>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/15 transition-all">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Estructura y Arquitectura SEO
                </h4>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  Diseñar una arquitectura de la información que fuera escalable. Teníamos que asegurarnos de que a medida que añadiéramos nuevas categorías, herramientas y lead magnets, el jugo de enlaces (link juice) fluyera correctamente y Google Search Console no arrojara errores de indexación.
                </p>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/15 transition-all md:col-span-2">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Optimización de Rendimiento Extremo
                </h4>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  Mantener el sitio ultrarrápido a pesar de las integraciones complejas, la carga de datos dinámicos en tiempo real y las analíticas de comportamiento corriendo en segundo plano. Esto se logró con el pre-renderizado estático y una carga asíncrona de recursos.
                </p>
              </div>
            </div>
          </m.div>

          {/* Visual Gallery section responsive */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="rounded-2xl overflow-hidden border border-white/5 aspect-video bg-black/40">
              <img 
                src="/images/seo-growthers-portfolio-mobile.png" 
                alt="SEO Growthers Portfolio Mobile View" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/5 aspect-video bg-black/40">
              <img 
                src="/images/seo-growthers-blog-mobile.png" 
                alt="SEO Growthers Blog Mobile View" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
              />
            </div>
          </m.div>

          {/* SECCIÓN DE DATOS TÉCNICOS (TABLA) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold mb-5 text-white flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono tracking-widest">04.</span> Especificaciones de Datos Técnicos
            </h2>
            <p className="text-slate-350 text-sm md:text-base font-light leading-relaxed mb-6">
              El ecosistema digital completo se sostiene gracias a un stack tecnológico moderno, robusto y altamente compatible, diseñado para el máximo rendimiento y control.
            </p>
            
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0e101f]/60 backdrop-blur-md">
              <table className="min-w-full divide-y divide-white/10 text-xs md:text-sm">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th scope="col" className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider">Categoría</th>
                    <th scope="col" className="px-6 py-4 text-left font-bold text-cyan-400 uppercase tracking-wider">Tecnologías, Herramientas y Plataformas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light text-slate-300">
                  {technicalData.map((row, index) => (
                    <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-white">{row.category}</td>
                      <td className="px-6 py-4 text-slate-350">{row.tools}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </m.div>

          {/* MÉTRICAS Y FLUJO DE ARQUITECTURA */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold mb-5 text-white flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono tracking-widest">05.</span> Métricas y Flujo de Arquitectura
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 bg-gradient-to-b from-cyan-950/20 to-black/40 border border-white/5 rounded-2xl">
                <h3 className="text-base font-bold text-white mb-3">Arquitectura DevOps</h3>
                <p className="text-slate-350 text-xs md:text-sm font-light leading-relaxed">
                  Código gestionado de manera segura en <strong className="text-white font-semibold">GitHub</strong>, empaquetado en contenedores <strong className="text-white font-semibold">Docker</strong> para garantizar que el entorno local de desarrollo sea idéntico al de producción, y finalmente desplegado eficientemente en la nube con <strong className="text-white font-semibold">Hostinger Cloud</strong>.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-b from-blue-950/20 to-black/40 border border-white/5 rounded-2xl">
                <h3 className="text-base font-bold text-white mb-3">Persistencia de Datos</h3>
                <p className="text-slate-350 text-xs md:text-sm font-light leading-relaxed">
                  Centralización del sistema de usuarios, logs de pipelines de automatización y almacenamiento de recursos multimedia dinámicos a través de la infraestructura PostgreSQL robusta y altamente escalable de <strong className="text-white font-semibold">Supabase</strong>.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-b from-cyan-950/20 to-black/40 border border-white/5 rounded-2xl">
                <h3 className="text-base font-bold text-white mb-3">Optimización Total</h3>
                <p className="text-slate-350 text-xs md:text-sm font-light leading-relaxed">
                  Enfoque nativo absoluto en la reducción del <strong className="text-white font-semibold">TTFB (Time to First Byte)</strong> y cumplimiento estricto de las métricas <strong className="text-white font-semibold">Core Web Vitals</strong> de Google mediante la combinación de servidores estables y código optimizado y comprimido.
                </p>
              </div>

            </div>
          </m.div>

          {/* PREGUNTAS FRECUENTES (FAQ) - ACORDEÓN INTERACTIVO */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold mb-5 text-white flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-mono tracking-widest">06.</span> Preguntas Frecuentes (FAQ)
            </h2>
            <p className="text-slate-350 text-sm md:text-base font-light leading-relaxed mb-6">
              Respuestas rápidas a las consultas técnicas y de arquitectura más comunes sobre el proceso de construcción de SEO Growthers.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left text-white font-bold text-sm md:text-base transition-colors hover:bg-white/[0.01]"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={16} className="text-cyan-400 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-350 shrink-0 ${openFaq === idx ? 'rotate-180 text-cyan-400' : ''}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-350 text-xs md:text-sm font-light leading-relaxed border-t border-white/5 bg-white/[0.005]">
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </m.div>

          {/* Conclusión del Proyecto */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-cyan-950/30 to-[#0e101f]/90 border border-cyan-500/20 text-center"
          >
            <h3 className="text-2xl md:text-3.5xl font-black mb-4 text-white">El Futuro de SEO Growthers</h3>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 font-light max-w-2xl mx-auto">
              El desarrollo web nunca termina; solo se despliega la siguiente versión. Actualmente seguimos trabajando en escalar la automatización del contenido y en mejorar la interconexión de nuestras herramientas. SEO Growthers es un proyecto vivo, y cada actualización está pensada para aportar más valor a la comunidad.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d0e17] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] font-bold px-8 py-5.5 rounded-xl transition-all group w-full md:w-auto text-xs uppercase tracking-wider">
                  ¿Quieres resultados similares?
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a 
                href="https://seogrowthers.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white font-medium transition-colors flex items-center gap-2 px-8 py-5.5 text-sm"
              >
                <Globe size={18} />
                <span>Explorar seogrowthers.com</span>
              </a>
            </div>
          </m.div>

        </div>
        <InternalLinkingCTA variant="services" />
      </section>
    </div>
  );
};

export default SuccessCaseSeoPlatform;
