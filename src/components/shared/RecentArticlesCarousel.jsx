
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ChevronRight, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import ImageOptimized from '@/components/shared/ImageOptimized';

const staticSuccessCases = [
  {
    id: 'case-aluvalle',
    title: 'Aluvalle: Transformación Digital y SEO de Vanguardia',
    summary: 'De cero presencia online a dominar las búsquedas locales en Neuquén. Implementación de desarrollo web premium, optimización extrema de Core Web Vitals y posicionamiento SEO local líder.',
    featured_image: '/images/aluvalle-case.webp',
    category: 'Caso de Éxito',
    slug: 'aluvalle-transformacion-digital',
    created_at: '2026-05-17T12:00:00Z',
    author: {
      username: 'seogrowthers',
      full_name: 'SEO GROWTHERS',
      avatar_url: '/images/iconos/guiaspersonaje.webp'
    },
    isSuccessCase: true
  },
  {
    id: 'case-inmofuture',
    title: 'InmoFuture: Ecosistema Digital para Real Estate y Ventas',
    summary: 'Diseño y desarrollo de una plataforma inmobiliaria premium con buscador inteligente, CRM integrado y UX optimizada de alta conversión para maximizar la captación de leads.',
    featured_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
    category: 'Caso de Éxito',
    slug: 'inmofuture-plataforma-inmobiliaria',
    created_at: '2026-05-17T11:00:00Z',
    author: {
      username: 'seogrowthers',
      full_name: 'SEO GROWTHERS',
      avatar_url: '/images/iconos/guiaspersonaje.webp'
    },
    isSuccessCase: true
  }
];

const RecentArticlesCarousel = ({ title = "Últimas Publicaciones", subtitle = "RECIENTE" }) => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const fetchRecentArticles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          id,
          title,
          summary,
          featured_image,
          category,
          slug,
          created_at,
          author:profiles!author_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'published')
        .neq('category', 'Debates') // Usually for blog/services/tools we want articles, not forum threads
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      const blogArticles = data || [];
      // Combinar los artículos de blog con los casos de éxito estáticos y ordenarlos por fecha (los más nuevos primero)
      const combined = [...staticSuccessCases, ...blogArticles].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setArticles(combined.slice(0, 6)); // Mostramos hasta 6 elementos destacados
    } catch (err) {
      console.error('Error fetching recent articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentArticles();
  }, [fetchRecentArticles]);

  const nextSlide = useCallback(() => {
    if (articles.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    if (articles.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [articles.length, isPaused, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-surface-container-high animate-pulse mb-16 border border-white/5">
        <div className="w-full h-full flex items-center justify-center">
          <SkeletonLoader className="w-3/4 h-12" />
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  const currentItem = articles[currentIndex];
  const itemLink = currentItem.isSuccessCase
    ? `/services/success-cases/${currentItem.slug}`
    : `/blog/${currentItem.category || 'general'}/${currentItem.slug}`;

  return (
    <section 
      className="mb-12 md:mb-16 relative h-[380px] md:h-[500px] w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-transparent border border-white/10 group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageOptimized 
            src={currentItem.featured_image} 
            alt={currentItem.title}
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[10s] ease-linear"
          />
          
          {/* THE REQUESTED ELEMENT: Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          
          <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-3"
              >
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-sm">
                  {currentItem.isSuccessCase ? "CASO DE ÉXITO" : subtitle}
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{currentItem.category}</span>
              </motion.div>
              
              <Link to={itemLink}>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight tracking-tighter text-on-surface mb-4 md:mb-6 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                >
                  {currentItem.title}
                </motion.h2>
              </Link>
 
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-surface-variant font-label text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 bg-surface">
                    <img 
                      src={currentItem.author?.avatar_url || "/images/iconos/guiaspersonaje.webp"} 
                      alt="Author" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-white/80">{currentItem.author?.full_name || "REDACCIÓN"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span>{currentItem.isSuccessCase ? "RESULTADOS COMPROBADOS" : "5 MIN LECTURA"}</span>
                </div>
                <div className="flex items-center gap-2 hidden md:flex">
                  <BookOpen size={14} className="text-secondary" />
                  <span>{currentItem.isSuccessCase ? "PORTFOLIO" : "KNOWLEDGE HUB"}</span>
                </div>
              </motion.div>
 
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to={itemLink}>
                  <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all group/btn">
                    {currentItem.isSuccessCase ? "Ver Caso de Éxito" : "Leer Publicación"}
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20 flex flex-col gap-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)}
          className="p-3 rounded-xl bg-surface/20 hover:bg-surface/40 backdrop-blur-md border border-white/5 text-white transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-xl bg-surface/20 hover:bg-surface/40 backdrop-blur-md border border-white/5 text-white transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentArticlesCarousel;
