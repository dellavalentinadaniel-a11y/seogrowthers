import React, { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import LogoComponent from '@/components/shared/LogoComponent';
import ImageOptimized from '@/components/shared/ImageOptimized';

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    {
      id: 'welcome',
      type: 'welcome',
      title: 'Bienvenido a SEO Growthers',
      subtitle: 'Soluciones expertas en Web Development, SEO & Analytics para escalar tus resultados digitales.',
      image: '/images/fondo/professional-banner.jpg',
      link: '/services',
      cta: 'Solicitar Auditoría Gratuita'
    },
    {
      id: 'aluvalle-hero',
      type: 'case',
      title: 'Aluvalle: Transformación Digital',
      subtitle: 'Rediseño de alta gama y posicionamiento SEO que multiplicó el tráfico x3 para la mayor carpintería de aluminio de la región.',
      image: '/images/aluvalle-premium.webp',
      link: '/services/success-cases/aluvalle-transformacion-digital',
      cta: 'Ver Caso de Estudio',
      badge: 'Destacado: Éxito en Retail'
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchCarouselData = useCallback(async () => {
    try {
      // Fetch latest 3 published blog articles
      const { data: articlesData } = await supabase
        .from('articles')
        .select('id, title, summary, featured_image, slug, category, status')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch latest 2 resources
      const { data: resourcesData } = await supabase
        .from('resources')
        .select('id, title, description, image, link')
        .order('created_at', { ascending: false })
        .limit(2);

      const dynamicSlides = [];
      const dynamicArticles = [];

      if (articlesData) {
        articlesData.forEach(article => {
          dynamicArticles.push({
            id: `article-${article.id}`,
            type: 'article',
            title: article.title,
            subtitle: article.summary || 'Descubre nuestras últimas guías estratégicas y análisis del sector.',
            image: article.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            link: `/blog/${article.category || 'general'}/${article.slug}`,
            cta: 'Leer Artículo',
            badge: `Blog: ${article.category || 'Estrategia'}`
          });
        });
      }

      if (resourcesData) {
        resourcesData.forEach(resource => {
          dynamicSlides.push({
            id: `resource-${resource.id}`,
            type: 'resource',
            title: resource.title,
            subtitle: resource.description || 'Explora nuestra biblioteca técnica avanzada.',
            image: resource.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
            link: resource.link || '/resources',
            cta: 'Ver Recurso',
            badge: 'Recursos Exclusivos'
          });
        });
      }

      setSlides(prev => {
        const baseSlides = prev.filter(slide => slide.id === 'welcome' || slide.id === 'aluvalle-hero');
        return [...baseSlides, ...dynamicArticles, ...dynamicSlides];
      });
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarouselData();
  }, [fetchCarouselData]);

  // Auto-advance logic - Speed reduced to 10 seconds (10000ms) for comfortable reading
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] md:h-[750px] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Professional Background with Image */}
      <AnimatePresence mode="wait">
        <m.div
          key={activeSlide.id}
          initial={currentSlide === 0 ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <div className="relative w-full h-full">
            {currentSlide === 0 ? (
              <div className="w-full h-full bg-gradient-to-br from-[#0a1219] via-[#0d1b28] to-[#0a2235] overflow-hidden">
                {/* Decorative grid background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.1),rgba(6,182,212,0))] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_100%_0%,rgba(30,144,255,0.05),transparent)] pointer-events-none" />

                {/* Professional background image as overlay */}
                <img
                  src="/images/fondo/professional-banner.jpg"
                  alt="Professional Banner"
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                />

                {/* Sophisticated overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1219]/90 via-[#0d1b28]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1219]/60 via-transparent to-[#0d1b28]/80 pointer-events-none" />
              </div>
            ) : (
              <>
                <ImageOptimized
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover"
                  priority={currentSlide === 0}
                  fetchPriority="auto"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/80 via-[#0a0e27]/40 to-transparent pointer-events-none"></div>
              </>
            )}
          </div>
        </m.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <m.div
              key={`content-${activeSlide.id}`}
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 30, y: -10 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col items-start gap-4"
            >
              {/* Premium Accent Line */}
              {activeSlide.type !== 'welcome' && (
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" />
              )}

              {/* Badge */}
              {activeSlide.badge && (
                <div className="flex items-center gap-3">
                  <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-cyan-300 uppercase bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30">
                    {activeSlide.badge}
                  </span>
                </div>
              )}

              {/* Main Heading */}
              {activeSlide.type !== 'welcome' && (
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 leading-[1.15] tracking-tighter">
                  <span className="line-clamp-2 md:line-clamp-none">{activeSlide.title}</span>
                </h1>
              )}

              {/* Subtitle */}
              {activeSlide.type !== 'welcome' && (
                <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8 max-w-3xl font-body leading-relaxed">
                  {activeSlide.subtitle}
                </p>
              )}

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row flex-wrap gap-4 items-start ${activeSlide.type === 'welcome' ? 'mt-[160px] sm:mt-[220px] md:mt-[280px]' : ''}`}>
                <Link to={activeSlide.link}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-black text-sm md:text-base px-8 md:px-12 py-6 md:py-8 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    {activeSlide.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {activeSlide.type === 'welcome' && (
                  <Link to="/services/success-cases">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/5 backdrop-blur-md border border-cyan-400/30 text-white hover:bg-cyan-500/10 hover:border-cyan-400/50 font-semibold text-sm md:text-base px-8 md:px-10 py-6 md:py-8 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                    >
                      Casos de Éxito
                    </Button>
                  </Link>
                )}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Navigation Controls - Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center`}
            aria-label={`Ir a slide ${idx + 1}`}
          >
            <span className={`block rounded-full transition-all duration-500 ${
              currentSlide === idx
                ? 'w-10 h-1.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>

      {/* Optional Side Arrows for Desktop */}
      <div className="hidden lg:flex absolute inset-x-8 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-20">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-white/40 hover:text-white hover:bg-black/40 hover:border-white/20 transition-all pointer-events-auto group"
        >
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_left</span>
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-white/40 hover:text-white hover:bg-black/40 hover:border-white/20 transition-all pointer-events-auto group"
        >
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_right</span>
        </button>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
    </section>
  );
};

export default HomeHero;

