import React from 'react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

/**
 * Componente de Internal Linking reutilizable.
 * Inserta CTAs contextuales de alta visibilidad hacia páginas de servicio y conversión.
 */

const variants = {
  audit: {
    title: '¿Tu sitio web no aparece en las primeras búsquedas de Google?',
    description: 'El 90% del tráfico web nunca pasa de la primera página. Descubrí los errores de SEO técnico, velocidad y estructura que están frenando tus ventas. Te entregamos un informe de auditoría completo y accionable gratis en 48hs.',
    cta: 'Solicitar Auditoría SEO Gratis',
    link: '/auditoria-seo-gratis',
    icon: 'search_insights',
    color: 'primary',
  },
  services: {
    title: '¿Necesitás más que un simple sitio web?',
    description: 'Desarrollamos ecosistemas digitales completos: SEO de alto impacto, desarrollo a medida y automatizaciones inteligentes para multiplicar tus ventas en piloto automático.',
    cta: 'Ver Catálogo de Servicios',
    link: '/services',
    icon: 'rocket_launch',
    color: 'secondary',
  },
  seo: {
    title: 'Dominá el Mercado Local: Posicioná tu Negocio en Neuquén',
    description: 'Conectá con miles de clientes calificados en la Patagonia. Diseñamos estrategias de SEO Local de alta precisión para ubicarte en el Top #1 de Google y Google Maps justo cuando te buscan.',
    cta: 'Potenciar Mi Negocio Local',
    link: '/services/seo-neuquen',
    icon: 'location_on',
    color: 'primary',
  },
  contact: {
    title: '¿Listo para duplicar tu facturación?',
    description: 'Hablemos hoy mismo sobre tu proyecto. Analizamos tu modelo de negocio y trazamos una estrategia a medida. Respuesta garantizada en menos de 24 horas.',
    cta: 'Contactar con un Especialista',
    link: '/contact',
    icon: 'chat',
    color: 'tertiary',
  },
  webdev: {
    title: '¿Querés un sitio web rápido y de alta conversión?',
    description: 'Desde landing pages de captura hasta tiendas online y plataformas corporativas a medida con optimización Core Web Vitals y SEO de base.',
    cta: 'Cotizar Desarrollo Web',
    link: '/services/desarrollo-web-argentina',
    icon: 'code',
    color: 'primary',
  },
  automation: {
    title: '¿Querés automatizar tus procesos de negocio?',
    description: 'Bots de RPA, integraciones de sistemas no-code y agentes inteligentes de Inteligencia Artificial para delegar tus tareas repetitivas.',
    cta: 'Ver Soluciones de IA',
    link: '/services/automatizacion-ia',
    icon: 'smart_toy',
    color: 'secondary',
  },
  cases: {
    title: '¿Buscás resultados reales y medibles?',
    description: '+300% de crecimiento orgánico y +358% en conversión digital de leads. Explorá nuestros casos de éxito con métricas verificables y transparentes.',
    cta: 'Explorar Casos de Éxito',
    link: '/services/success-cases',
    icon: 'emoji_events',
    color: 'tertiary',
  },
};

// Mapeo estático explícito de clases de Tailwind CSS para prevenir la purga (Purge) del compilador de Vite en producción
const colorMap = {
  primary: {
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    bg: 'bg-[#0d0e17]/80 hover:bg-[#0f111c]/90',
    glow: 'bg-cyan-500/5',
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-400',
    btnBg: 'bg-cyan-500 hover:bg-cyan-400 text-[#0d0e17] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]',
  },
  secondary: {
    border: 'border-blue-500/20 hover:border-blue-500/40',
    bg: 'bg-[#0a0d18]/80 hover:bg-[#0c0f20]/90',
    glow: 'bg-blue-500/5',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    btnBg: 'bg-blue-500 hover:bg-blue-400 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
  },
  tertiary: {
    border: 'border-purple-500/20 hover:border-purple-500/40',
    bg: 'bg-[#0f0b18]/80 hover:bg-[#120d20]/90',
    glow: 'bg-purple-500/5',
    iconBg: 'bg-purple-500/10',
    iconText: 'text-purple-400',
    btnBg: 'bg-purple-500 hover:bg-purple-400 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
  }
};

const InternalLinkingCTA = ({ variant = 'audit', className = '' }) => {
  const v = variants[variant] || variants.audit;
  const c = colorMap[v.color] || colorMap.primary;

  return (
    <div className={`my-12 p-8 md:p-10 rounded-[2.5rem] border ${c.border} ${c.bg} shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden transition-all duration-500 group ${className}`}>
      {/* Background radial glow */}
      <div className={`absolute -right-20 -bottom-20 w-80 h-80 ${c.glow} rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-110`}></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-start gap-6 max-w-4xl">
          <div className={`p-4 rounded-2xl ${c.iconBg} ${c.iconText} flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
            <span className="material-symbols-outlined text-4xl">{v.icon}</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug">
              {v.title}
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
              {v.description}
            </p>
          </div>
        </div>
        
        {/* CTAs explicitly styled to stand out like neon elements */}
        <Link
          to={v.link}
          onClick={() => trackCTAClick(`internal_linking_${variant}`, v.link)}
          className={`w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 ${c.btnBg} font-headline font-black rounded-2xl text-xs uppercase tracking-[0.2em] transform active:scale-95 transition-all duration-300 whitespace-nowrap flex-shrink-0`}
        >
          <span>{v.cta}</span>
          <span className="material-symbols-outlined text-sm font-bold animate-pulse">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export const RelatedServicesBlock = ({ currentPath = '' }) => {
  const links = [
    { title: 'SEO en Neuquén', desc: 'Posicionamiento local para tu negocio', to: '/services/seo-neuquen', icon: 'location_on' },
    { title: 'Desarrollo Web', desc: 'Sitios rápidos y optimizados', to: '/services/desarrollo-web-argentina', icon: 'code' },
    { title: 'Automatización con IA', desc: 'Escala sin contratar', to: '/services/automatizacion-ia', icon: 'smart_toy' },
    { title: 'RPA (Bots)', desc: 'Bots 24/7 para tareas repetitivas', to: '/services/rpa-automatizacion', icon: 'precision_manufacturing' },
    { title: 'Integraciones No-Code', desc: 'Conectá tus apps sin programar', to: '/services/integraciones-no-code', icon: 'cable' },
    { title: 'Agentes de IA', desc: 'IA autónoma que razona y actúa', to: '/services/ia-agentica-agentes', icon: 'psychology' },
    { title: 'Casos de Éxito', desc: 'Resultados reales y medibles', to: '/services/success-cases', icon: 'emoji_events' },
    { title: 'Auditoría SEO Gratis', desc: 'Análisis completo en 48hs', to: '/auditoria-seo-gratis', icon: 'search_insights' },
  ].filter(l => l.to !== currentPath);

  return (
    <div className="my-20 border-t border-white/5 pt-12">
      <h3 className="font-headline text-2xl font-extrabold text-white mb-8 flex items-center gap-3">
        <span className="material-symbols-outlined text-cyan-400">link</span>
        Servicios Relacionados
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => trackCTAClick('related_service', link.to)}
            className="p-6 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 bg-[#0d0e17]/50 hover:bg-[#0d0e17] transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-cyan-400 mb-3 block group-hover:scale-110 transition-transform text-3xl">{link.icon}</span>
            <h4 className="font-headline font-bold text-white text-base mb-1">{link.title}</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLinkingCTA;
