import React, { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const successCasesList = [
  {
    id: 'seo-growthers-platform',
    title: 'SEO Growthers: Ecosistema Digital Completo',
    description: 'Desarrollamos nuestra propia plataforma de crecimiento. Ingesta automática de contenidos, automatización con Python y una experiencia premium de velocidad extrema enfocada a conversiones.',
    image: '/images/seo-platform-showcase.webp',
    result: 'Lighthouse 100/100',
    industry: 'Tecnología / SEO',
    slug: 'seo-growthers-plataforma-ecosistema',
    category: 'Plataforma',
    url: '/services/success-cases/seo-growthers-plataforma-ecosistema'
  },
  {
    id: 'aluvalle-static',
    title: 'Aluvalle: Transformación Digital e Impacto SEO',
    description: 'Implementamos una arquitectura digital escalable y una estrategia de contenidos avanzada, logrando resultados extraordinarios en visibilidad y posicionamiento local en Google Maps.',
    image: '/images/aluvalle-showcase.webp',
    result: '+300% Tráfico Orgánico',
    industry: 'Retail / Construcción',
    slug: 'aluvalle-transformacion-digital',
    category: 'Construcción',
    url: '/services/success-cases/aluvalle-transformacion-digital'
  },
  {
    id: 'inmofuture-static',
    title: 'InmoFuture: Plataforma de Real Estate de Gama Alta',
    description: 'Portal inmobiliario de élite con buscador inteligente de propiedades, filtros a medida y sistema de gestión optimizado para potenciar la productividad y el cierre de ventas.',
    image: '/images/inmofuture-showcase.webp',
    result: '+358% Leads Generados',
    industry: 'Real Estate / Premium',
    slug: 'inmofuture-plataforma-inmobiliaria',
    category: 'Inmobiliaria',
    url: '/services/success-cases/inmofuture-plataforma-inmobiliaria'
  },
  {
    id: 'edv-remolques-static',
    title: 'EDV Remolques: Auxilio y Soporte Vial 24/7',
    description: 'Landing page táctica móvil ultra-veloz equipada con optimización mobile-first extrema y embudos de llamada optimizados para campañas de alta conversión.',
    image: '/images/edv-remolques-hero.webp',
    result: '10/10 Google Ads Score',
    industry: 'Auxilio Vial / Logística',
    slug: 'edv-remolques-tactica-logistica',
    category: 'Landing Page',
    url: '/services/success-cases/edv-remolques-tactica-logistica'
  }
];

const UnifiedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % successCasesList.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-20 bg-[#0C0D0D] overflow-hidden" id="unified-showcase">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-cyan-500"></span>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Proyectos Destacados</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">Casos de Éxito</h2>
          </div>
          <div className="flex gap-2">
             <Link 
               to="/services/success-cases" 
               className="text-sm font-bold text-cyan-400 hover:text-white hover:underline transition-all flex items-center gap-1.5 group"
             >
               <span>Ver todos los casos</span>
               <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
             </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-white/10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <m.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Eager loading and decoding async for ultimate performance */}
              <img 
                src={successCasesList[currentIndex].image} 
                alt={successCasesList[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-[12000ms] group-hover:scale-105 will-change-transform opacity-80"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/65 to-transparent opacity-95"></div>
              
              <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end z-10">
                <div className="max-w-3xl">
                  
                  {/* Category and tag info */}
                  <m.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-3 mb-4.5"
                  >
                    <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                      Caso de Éxito
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{successCasesList[currentIndex].industry}</span>
                  </m.div>

                  {/* Title */}
                  <m.h3
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-2xl sm:text-3.5xl md:text-5.5xl font-black text-white mb-3.5 leading-tight tracking-tight"
                  >
                    {successCasesList[currentIndex].title}
                  </m.h3>

                  {/* KPI Result */}
                  <m.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-wrap items-center gap-6 mb-5"
                  >
                    <p className="text-xl md:text-2.5xl font-black text-emerald-400 flex items-center gap-2">
                      <Star className="fill-emerald-400 text-emerald-400" size={20} />
                      {successCasesList[currentIndex].result}
                    </p>
                  </m.div>

                  {/* Description */}
                  <m.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-slate-300 text-sm md:text-base line-clamp-2 md:line-clamp-none max-w-2xl mb-7 font-light leading-relaxed"
                  >
                    {successCasesList[currentIndex].description}
                  </m.p>

                  {/* CTA Button */}
                  <m.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    <Link to={successCasesList[currentIndex].url}>
                      <Button className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold px-7 py-5.5 rounded-xl transition-all duration-300 group/btn text-xs uppercase tracking-wider">
                        Ver caso completo
                        <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" size={16} />
                      </Button>
                    </Link>
                  </m.div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          {/* Slider Arrow Controls */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            <button 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + successCasesList.length) % successCasesList.length)}
              className="w-11 h-11 rounded-xl border border-white/10 bg-black/35 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              aria-label="Anterior"
            >
              <ChevronRight className="rotate-180" size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-11 h-11 rounded-xl border border-white/10 bg-black/35 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Thumbnail Indicators (Instant Load) */}
        <div className="flex justify-start md:justify-center gap-3.5 mt-8 px-2 overflow-x-auto pb-2 scrollbar-hide touch-pan-x overscroll-contain">
          {successCasesList.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-20 md:w-26 aspect-video rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                idx === currentIndex 
                  ? "border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.35)] z-10" 
                  : "border-white/5 opacity-40 hover:opacity-75 scale-100"
              }`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none" loading="lazy" />
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentIndex ? "bg-cyan-500/10" : "bg-black/55"
              }`}></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedCarousel;
