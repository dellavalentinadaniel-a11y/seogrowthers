import React from 'react';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';
import { CheckCircle2, ArrowRight, BarChart3, Globe, Zap, Users, Phone, ShieldCheck, Clock, MapPin, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';

const SuccessCaseEdvRemolques = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "EDV Remolques: Soporte Táctico en Ruta & Logística 24/7",
    "author": { "@type": "Organization", "name": "SEO Growthers" },
    "publisher": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "datePublished": "2026-05-17",
    "dateModified": "2026-05-18",
    "description": "Caso de éxito: desarrollo de landing page táctica ultra optimizada para EDV Remolques en Neuquén y Alto Valle, logrando conversiones directas récord y carga instantánea."
  };

  const metrics = [
    { label: 'Carga Móvil (LCP)', before: '3.8s', after: '0.7s', icon: <Zap className="text-yellow-400" /> },
    { label: 'Tasa de Conversión (Leads)', before: '1.2%', after: '6.4%', icon: <Users className="text-cyan-400" /> },
    { label: 'Nivel de Calidad Google Ads', before: '4/10', after: '10/10', icon: <BarChart3 className="text-emerald-400" /> },
  ];

  const metadata = {
    title: "EDV Remolques: Carga Ultra Rápida y Conversión Táctica | SEOGrowthers",
    description: "Conocé cómo transformamos a EDV Remolques en Neuquén. Landing page de alto rendimiento, optimización extrema de conversiones y 10/10 en Google Ads.",
    image: "/images/edv-remolques-hero.png",
    url: "https://seogrowthers.com/services/success-cases/edv-remolques-tactica-logistica"
  };

  const fleet = [
    { title: "Auxilio 24HS", desc: "Soporte táctico y remolques de urgencia disponibles en Neuquén, Río Negro y La Pampa." },
    { title: "Remolques Especiales", desc: "Unidades equipadas para situaciones complejas y rescates de vehículos de gran tamaño." },
    { title: "Traslados de Alta Gama", desc: "Garantía de máxima seguridad para vehículos deportivos e importados con anclaje de precisión." },
    { title: "Maquinaria Pesada", desc: "Logística y traslados de equipo industrial y vial con chóferes de alta experiencia." }
  ];

  return (
    <div className="min-h-screen text-white pt-32 pb-20 bg-[#0C0D0D]">
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <Breadcrumbs className="mb-4" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-yellow-400"></span>
              <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Caso de Éxito</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-headline">
              EDV Remolques: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Soporte Táctico</span> en Ruta
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Desarrollamos una landing page ultra-rápida y de alta conversión como motor de crecimiento. Una solución económica pero potenciada con tecnología de punta para dominar las campañas de Google Ads y urgencias 24/7 en Neuquén y la Patagonia.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Logística</div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Landing Page</div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Conversión Extrema</div>
            </div>

            <a 
              href="https://edvremolques.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 px-6 py-3 rounded-full text-yellow-400 font-bold transition-all group mb-8"
            >
              <Globe size={18} className="animate-pulse" />
              Ver sitio web en vivo
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-full opacity-20"></div>
            <img 
              src="/images/edv-remolques-hero.png" 
              alt="EDV Remolques Preview" 
              className="relative rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full h-auto object-cover"
            />
          </m.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white/5 border-y border-white/10 py-16 mb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-yellow-400/30 transition-all group"
              >
                <div className="flex justify-center mb-4 text-3xl opacity-80 group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{metric.label}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-gray-600 line-through text-lg">{metric.before}</span>
                  <ArrowRight size={16} className="text-yellow-400" />
                  <span className="text-3xl font-bold text-white">{metric.after}</span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* High impact Stats from EDV Real Screen */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "15,000+", label: "Servicios Realizados", icon: <Truck size={24} className="text-yellow-400" /> },
            { value: "12,500+", label: "Clientes Satisfechos", icon: <ShieldCheck size={24} className="text-yellow-400" /> },
            { value: "25 MIN", label: "Tiempo de Respuesta", icon: <Clock size={24} className="text-yellow-400" /> },
            { value: "3", label: "Provincias Cubiertas", icon: <MapPin size={24} className="text-yellow-400" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-low border border-white/5 p-6 rounded-2xl text-center hover:border-yellow-400/20 transition-all">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-white mb-1 font-headline">{stat.value}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-16">
          {/* El Desafío */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-yellow-400 text-sm font-mono">01.</span> El Desafío
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Para un negocio de asistencia en ruta, los milisegundos se traducen directamente en llamadas perdidas. Cuando un conductor tiene un percance, realiza búsquedas en su teléfono celular y contacta al primer sitio que carga instantáneamente y le brinda seguridad. EDV presentaba una presencia en línea limitada y campañas de Google Ads ineficientes debido a una velocidad de carga móvil deficiente.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Velocidad de carga en móviles deficiente (LCP de 3.8s)',
                'Costos de adquisición en Google Ads elevados',
                'Falta de un llamado a la acción (CTA) optimizado para llamadas rápidas',
                'Necesidad de generar confianza instantánea en la ruta'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </m.div>

          {/* La Solución Técnica */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-yellow-400 text-sm font-mono">02.</span> Solución Tecnológica Premium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Diseñamos una landing page ultra optimizada ("One-Page") con una arquitectura táctica enfocada a la conversión móvil instantánea. Integramos una red de asistencia táctica interactiva, optimizando al extremo las imágenes de su flota.
                </p>
                <ul className="space-y-4">
                  {[
                    'Llamado a la acción táctico (Solicitar Auxilio) en un clic',
                    'Nivel de calidad 10/10 en Google Ads (Landing Page Experience)',
                    'Carga instantánea en dispositivos móviles (LCP 0.7s)',
                    'Integración de Mapa de Cobertura Kinetic Grid'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
                <div className="p-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400 mb-4 flex items-center gap-2">
                    <Truck size={16} /> Especialidades de la Flota
                  </h4>
                  <div className="space-y-3">
                    {fleet.map((f, i) => (
                      <div key={i} className="border-l-2 border-yellow-400/50 pl-3">
                        <div className="text-xs font-black uppercase text-white">{f.title}</div>
                        <div className="text-[11px] text-gray-500">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          {/* Conclusión */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-yellow-950/20 to-yellow-900/10 border border-yellow-400/20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Conclusión del Proyecto</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              El caso de EDV Remolques demuestra de manera fehaciente que el desarrollo de una web económica y de una sola página no está reñido con la excelencia técnica. Al dotarla de un rendimiento extraordinario y enfocarla en el comportamiento del usuario móvil ante urgencias en ruta, logramos maximizar el retorno de inversión publicitaria y crear un canal altamente rentable y estratégico.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 rounded-full transition-all group w-full md:w-auto">
                  ¿Quieres resultados similares?
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a 
                href="https://edvremolques.online/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2 px-8 py-6"
              >
                <Globe size={18} />
                Explorar edvremolques.online
              </a>
            </div>
          </m.div>
        </div>
        <InternalLinkingCTA variant="services" />
      </section>
    </div>
  );
};

export default SuccessCaseEdvRemolques;
