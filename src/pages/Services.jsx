import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '@/components/layout/ScrollToTop';
import SuccessCasesHeroCarousel from '@/components/shared/SuccessCasesHeroCarousel';

// Datos de los servicios basados en las categorías solicitadas
const serviceCategories = [
  {
    id: "desarrollo-web",
    title: "Desarrollo Web",
    description: "Construimos ecosistemas digitales de alto rendimiento. Interfaces inmersivas y arquitecturas robustas diseñadas para escalar y maximizar la conversión.",
    icon: "code",
    color: "primary",
    bgColor: "bg-primary-container/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
    gradient: "from-primary/20 to-transparent",
    services: [
      { name: "Landing Page", desc: "Páginas de alta conversión optimizadas milimétricamente para campañas publicitarias y captura de leads.", icon: "web" },
      { name: "Sitio Web Corporativo", desc: "Presencia digital premium y profesional que proyecta la autoridad y los valores de tu empresa.", icon: "domain" },
      { name: "Tiendas Online", desc: "E-commerce escalables, seguros y optimizados para ofrecer la mejor experiencia de compra.", icon: "storefront" },
      { name: "Portafolio (Ejemplos)", desc: "Muestra tu trabajo al mundo con galerías dinámicas, impactantes y de carga ultrarrápida.", icon: "photo_library" },
    ]
  },
  {
    id: "marketing-digital",
    title: "Marketing Digital",
    description: "Estrategias omnicanal basadas en datos empíricos para amplificar tu alcance, dominar tu nicho y multiplicar tu retorno de inversión.",
    icon: "campaign",
    color: "secondary",
    bgColor: "bg-secondary-container/10",
    borderColor: "border-secondary/30",
    textColor: "text-secondary",
    gradient: "from-secondary/20 to-transparent",
    services: [
      { name: "SEO", desc: "Posicionamiento orgánico de élite en motores de búsqueda para asegurar tráfico sostenible a largo plazo.", icon: "search_insights" },
      { name: "SEM (Ads)", desc: "Campañas publicitarias hiper-segmentadas en Google y redes sociales enfocadas en ROI positivo.", icon: "ads_click" },
      { name: "Redes Sociales", desc: "Gestión de comunidad y creación de contenido viral para construir fidelidad y embajadores de marca.", icon: "thumb_up" },
      { name: "Marketing de Contenidos", desc: "Creación de valor mediante artículos, videos y formatos atractivos que educan y convierten.", icon: "article" },
      { name: "Email Marketing", desc: "Sistemas de automatización de correos para nutrir leads, retener clientes y aumentar el LTV.", icon: "mail" },
    ]
  },
  {
    id: "automatizacion",
    title: "Automatización",
    description: "Optimizamos tus operaciones delegando tareas repetitivas a sistemas inteligentes. Escala tu negocio sin incrementar proporcionalmente tus costos.",
    icon: "smart_toy",
    color: "tertiary",
    bgColor: "bg-tertiary-container/10",
    borderColor: "border-tertiary/30",
    textColor: "text-tertiary",
    gradient: "from-tertiary/20 to-transparent",
    services: [
      { name: "Marketing y Ventas", desc: "Embudos automatizados que cualifican prospectos y cierran ventas de forma autónoma 24/7.", icon: "trending_up" },
      { name: "RPA (Bots)", desc: "Bots de software que imitan acciones humanas para eliminar el trabajo administrativo monótono.", icon: "precision_manufacturing" },
      { name: "Integraciones No-Code", desc: "Conexión fluida entre tu stack tecnológico (Zapier, Make) para que tus datos fluyan sin fricción.", icon: "cable" },
      { name: "IA Agéntica", desc: "Despliegue de agentes de inteligencia artificial autónomos que toman decisiones y ejecutan flujos complejos.", icon: "psychology" },
    ]
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Servicios | SEO Growthers</title>
      </Helmet>
      
      <ScrollToTop />

      <main className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="relative px-8 pt-20 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-variant/30 border border-outline/30 mb-6 backdrop-blur-sm">
              <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-on-surface-variant">Soluciones Integrales</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 max-w-5xl">
              Elevamos tu <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Presencia Digital</span> al Siguiente Nivel
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-3xl leading-relaxed">
              Descubre nuestro ecosistema de servicios diseñados para dominar el panorama digital. Desde el desarrollo web de alta performance hasta la automatización inteligente.
            </p>
          </div>
          {/* Atmospheric Elements */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>
        </section>

        <section className="px-8 max-w-7xl mx-auto mb-24 relative z-10">
          <SuccessCasesHeroCarousel />
        </section>

        {/* Services Categories */}
        <div className="space-y-32">
          {serviceCategories.map((category, index) => (
            <section key={category.id} id={category.id} className="relative px-8">
              {/* Decorative background for each section */}
              <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-[800px] h-[800px] bg-gradient-to-b ${category.gradient} rounded-full blur-[150px] opacity-30 pointer-events-none -translate-y-1/2`}></div>
              
              <div className="max-w-7xl mx-auto relative z-10">
                {/* Category Header */}
                <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end text-right'} mb-16`}>
                  <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center border ${category.borderColor} mb-6 shadow-lg`}>
                    <span className={`material-symbols-outlined text-4xl ${category.textColor}`}>{category.icon}</span>
                  </div>
                  <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-6">
                    {category.title}
                  </h2>
                  <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Sub-services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.services.map((service, sIndex) => (
                    <div 
                      key={sIndex} 
                      className={`glass-panel group relative flex flex-col p-8 rounded-3xl border-t-2 ${category.borderColor} hover:translate-y-[-4px] transition-all duration-300 overflow-hidden bg-surface/40 hover:bg-surface/60 backdrop-blur-md shadow-lg`}
                    >
                      <div className="mb-6">
                        <span className={`material-symbols-outlined text-3xl ${category.textColor} mb-4 block opacity-80 group-hover:opacity-100 transition-opacity`}>
                          {service.icon}
                        </span>
                        <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{service.name}</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                          {service.desc}
                        </p>
                      </div>
                      <div className="mt-auto pt-6 border-t border-outline/10">
                        <a href="https://studiodigital.seogrowthers.com/" target="_blank" rel="noopener noreferrer" className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${category.textColor} group-hover:gap-3 transition-all`}>
                          Comenzar
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                      </div>
                      
                      {/* Hover effect glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                    </div>
                  ))}
                  
                  {/* "Ver más" / CTA Card for the category */}
                  <div className={`glass-panel flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed ${category.borderColor} bg-transparent hover:bg-surface/40 transition-colors duration-300 text-center`}>
                    <span className={`material-symbols-outlined text-4xl ${category.textColor} mb-4 opacity-50`}>
                      rocket_launch
                    </span>
                    <h3 className="font-headline text-lg font-bold text-on-surface mb-2">¿Listo para escalar?</h3>
                    <p className="text-on-surface-variant text-sm mb-6">Agenda una llamada estratégica gratuita.</p>
                    <a href="https://studiodigital.seogrowthers.com/" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-xl bg-surface-variant text-on-surface font-bold text-sm border border-outline/20 hover:border-outline/40 transition-colors`}>
                      Contactar Ventas
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Global CTA Section */}
        <section className="mt-32 px-8 max-w-5xl mx-auto">
          <div className="glass-panel relative rounded-[3rem] p-12 md:p-20 text-center overflow-hidden border border-outline/20 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-secondary/10 opacity-50"></div>
             
             <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-6">workspace_premium</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-6">
                  El Futuro es Ahora
                </h2>
                <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  No dejes que tu competencia se adelante. Implementa hoy las estrategias digitales que dominarán el mercado de mañana.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://studiodigital.seogrowthers.com/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2">
                    Iniciar Proyecto
                    <span className="material-symbols-outlined text-base">rocket</span>
                  </a>
                  <a href="https://studiodigital.seogrowthers.com/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-surface-variant border border-outline/30 text-on-surface font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-variant/80 transition-all flex items-center justify-center gap-2">
                    Agendar Consultoría
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                  </a>
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Services;
