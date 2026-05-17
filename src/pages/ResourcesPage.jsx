import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/customSupabaseClient';
import RecentArticlesCarousel from '@/components/shared/RecentArticlesCarousel';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Download, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  FileText, 
  Video, 
  Hash, 
  Star, 
  Layout, 
  Filter, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CATEGORIES = ['Todos', 'Guías', 'Activos', 'Técnicos', 'Vídeos'];

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'popular'

  useEffect(() => {
    fetchResources();
    window.scrollTo(0, 0);
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      // Fallback & default items if Supabase table is empty or has error
      const ssdGuide = {
        id: 'ssd-ps5-optimization-2026',
        title: 'Mejores SSD para PS5: Guía 2026',
        description: 'Todo lo que necesitas saber para ampliar el almacenamiento de tu consola: Gen4, Disipadores y DRAM.',
        category: 'GUÍAS',
        link: '/resources/ssd-ps5-optimization-2026',
        featured: true,
        image: '/images/seo_pillar.webp',
        downloads: 1420,
        file_size: '4.2 MB',
        file_type: 'pdf',
        created_at: new Date().toISOString()
      };

      if (!error && data) {
        setResources([ssdGuide, ...data]);
      } else {
        setResources([
          ssdGuide,
          {
            id: 'plantilla-seo-audit-2026',
            title: 'Plantilla de Auditoría SEO Avanzada',
            description: 'Un checklist técnico completo y automatizado para auditar cualquier sitio web en cuestión de minutos.',
            category: 'ACTIVOS',
            link: '#',
            featured: false,
            downloads: 852,
            file_size: '1.8 MB',
            file_type: 'zip',
            created_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'guias-vibe-coding-react19',
            title: 'Guía Definitiva de React 19 y Vibe Coding',
            description: 'Aprende a integrar componentes de servidor de React 19 y patrones de composición avanzados con Inteligencia Artificial.',
            category: 'GUÍAS',
            link: '#',
            featured: false,
            downloads: 2105,
            file_size: '12.5 MB',
            file_type: 'pdf',
            created_at: new Date(Date.now() - 172800000).toISOString()
          },
          {
            id: 'video-nextjs-seo-lighthouse',
            title: 'Video Webinar: Next.js Speed & Core Web Vitals',
            description: 'Sesión grabada sobre cómo optimizar al 100% las métricas de Lighthouse en arquitecturas headless modernas.',
            category: 'VÍDEO',
            link: '#',
            featured: false,
            downloads: 412,
            file_size: 'Webinar',
            file_type: 'mp4',
            created_at: new Date(Date.now() - 259200000).toISOString()
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (category = '') => {
    const cat = category.toLowerCase();
    if (cat.includes('guia') || cat.includes('ebook') || cat.includes('libro')) {
      return <BookOpen size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />;
    }
    if (cat.includes('plantilla') || cat.includes('asset') || cat.includes('activo')) {
      return <Layout size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />;
    }
    if (cat.includes('tecnico') || cat.includes('herramienta') || cat.includes('code')) {
      return <FileText size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />;
    }
    if (cat.includes('video') || cat.includes('webinar') || cat.includes('multimedia')) {
      return <Video size={20} className="text-rose-400 group-hover:scale-110 transition-transform" />;
    }
    return <FileText size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />;
  };

  const getCategoryColor = (category = '') => {
    const cat = category.toLowerCase();
    if (cat.includes('guia') || cat.includes('ebook')) return 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20';
    if (cat.includes('plantilla') || cat.includes('asset')) return 'border-purple-500/30 text-purple-400 bg-purple-950/20';
    if (cat.includes('tecnico') || cat.includes('herramienta')) return 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20';
    if (cat.includes('video') || cat.includes('webinar')) return 'border-rose-500/30 text-rose-400 bg-rose-950/20';
    return 'border-blue-500/30 text-blue-400 bg-blue-950/20';
  };

  // Filter & Search Logic
  const filteredResources = resources.filter(item => {
    // Search Term Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(term);
      const descMatch = item.description?.toLowerCase().includes(term);
      const catMatch = item.category?.toLowerCase().includes(term);
      if (!titleMatch && !descMatch && !catMatch) return false;
    }

    // Category Filter
    if (activeCategory === 'Todos') return true;
    if (activeCategory === 'Guías') {
      return item.category?.toUpperCase().includes('GUÍA') || item.category?.toUpperCase().includes('EBOOK') || item.category?.toUpperCase() === 'GUÍAS';
    }
    if (activeCategory === 'Activos') {
      return item.category?.toUpperCase().includes('PLANTILLA') || item.category?.toUpperCase() === 'ASSET' || item.category?.toUpperCase() === 'ACTIVOS';
    }
    if (activeCategory === 'Técnicos') {
      return item.category?.toUpperCase().includes('HERRAMIENTA') || item.category?.toUpperCase().includes('TECNICO') || item.category?.toUpperCase() === 'TÉCNICO';
    }
    if (activeCategory === 'Vídeos') {
      return item.category?.toUpperCase().includes('WEBINAR') || item.category?.toUpperCase().includes('VIDEO') || item.category?.toUpperCase() === 'VÍDEO';
    }
    return true;
  });

  // Sort Logic
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.downloads || 0) - (a.downloads || 0);
    }
    // Default to 'latest'
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Recursos Neuronales | SEO Growthers</title>
        <meta name="description" content="Accede a recursos gratuitos de SEO, marketing digital y desarrollo web. Guías, plantillas y herramientas para potenciar tu estrategia digital." />
        <meta property="og:title" content="Recursos Neuronales | SEO Growthers" />
        <meta property="og:description" content="Biblioteca de recursos digitales: guías SEO, plantillas de marketing y documentación técnica avanzada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seogrowthers.com/resources" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://seogrowthers.com/resources" />
      </Helmet>

      <ScrollToTop />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />
        
        {/* Recycled Blog/Forum Carousel Header */}
        <RecentArticlesCarousel title="Recursos Destacados del Blog" subtitle="EXPLORA LO ÚLTIMO" />

        {/* Hero Section */}
        <section className="mb-16 mt-8">
          <div className="max-w-3xl">
            <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-4 block">Capítulo 03</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight mb-6">
              BIBLIOTECA DE <span className="bg-gradient-to-r from-primary-container to-secondary-container bg-clip-text text-transparent">RECURSOS_NEURALES</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Accede a la arquitectura del conocimiento. Activos digitales, documentación técnica avanzada y simulaciones de entrenamiento para optimizar tu presencia en buscadores y desarrollo.
            </p>
          </div>
        </section>

        {/* Categories & Sorting Filters Bar (Recycled from Forum Layout) */}
        <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4 border-b border-white/5">
            {/* Categories Buttons */}
            <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto overflow-hidden">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider font-headline transition-all whitespace-nowrap focus:outline-none ${
                    activeCategory === cat 
                      ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(0,229,255,0.4)] border border-primary/20 hover:bg-primary/90' 
                      : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sorting & Action buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex rounded-xl bg-surface-container-high/80 p-1 border border-white/5">
                <button 
                  onClick={() => setSortBy('latest')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all ${
                    sortBy === 'latest' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-white'
                  }`}
                  title="Más recientes"
                >
                  <Zap size={14} /> Recientes
                </button>
                <button 
                  onClick={() => setSortBy('popular')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all ${
                    sortBy === 'popular' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-white'
                  }`}
                  title="Más descargados"
                >
                  <TrendingUp size={14} /> Populares
                </button>
              </div>

              <Link 
                to="/contact"
                className="px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.2)] flex items-center gap-1.5 whitespace-nowrap"
              >
                SUGERIR RECURSO
              </Link>
            </div>
          </div>
        </section>

        {/* 12-Column Responsive Layout (Consistently Matching Forum Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN RESOURCES AREA (8-columns) */}
          <div className="lg:col-span-8 space-y-6">
            {loading ? (
              <div className="space-y-4">
                <SkeletonLoader className="h-44 w-full rounded-2xl" />
                <SkeletonLoader className="h-44 w-full rounded-2xl" />
                <SkeletonLoader className="h-44 w-full rounded-2xl" />
              </div>
            ) : sortedResources.length === 0 ? (
              <div className="text-center py-20 bg-surface-container-low/40 border border-white/5 rounded-2xl backdrop-blur-md">
                <HelpCircle size={48} className="text-slate-500 mx-auto mb-4" />
                <h3 className="font-headline text-xl font-bold text-white mb-2">No se encontraron recursos</h3>
                <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
                  No hay activos digitales que coincidan con tu búsqueda en la categoría "{activeCategory}". Intenta cambiar tus filtros o término de búsqueda.
                </p>
              </div>
            ) : (
              sortedResources.map((item) => {
                const icon = getResourceIcon(item.category);
                const categoryColor = getCategoryColor(item.category);
                const isExternal = item.link && !item.link.startsWith('/');
                const cleanLink = item.link && item.link.startsWith('/') ? item.link : `/resources/${item.id}`;

                return (
                  <div 
                    key={item.id} 
                    className="bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-primary-container/40 hover:bg-slate-900/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between group shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Glowing highlight animation border-glow on hover */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-container to-secondary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div>
                      {/* Card Header metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary-container/20 group-hover:bg-primary-container/5 transition-all">
                            {icon}
                          </div>
                          <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border ${categoryColor}`}>
                            {item.category || 'Asset'}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                          {item.file_size && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm text-secondary">folder</span>
                              {item.file_size}
                            </span>
                          )}
                          {item.downloads != null && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm text-primary">download</span>
                              {(item.downloads || 0).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <Link to={cleanLink}>
                        <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-3 hover:text-primary transition-colors leading-snug cursor-pointer">
                          {item.title}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <Clock size={14} className="text-primary-container/80" />
                        <span>
                          {item.created_at ? format(new Date(item.created_at), "d 'de' MMMM, yyyy", { locale: es }) : 'Mayo 2026'}
                        </span>
                      </div>

                      <Link 
                        to={cleanLink} 
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-primary group-hover:text-primary-container group-hover:translate-x-1.5 transition-all uppercase"
                      >
                        {item.file_type === 'zip' || item.file_type === 'pdf' ? 'DESCARGAR AHORA' : 'EXPLORAR RECURSO'}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* SIDEBAR AREA (4-columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* SEARCH COMPONENT (Recycled style) */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
              <h4 className="text-sm font-headline font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Search size={16} className="text-primary" /> BUSCAR EN BIBLIOTECA
              </h4>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ej. Checklist SEO, React..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-high border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                />
                <Search className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
              </div>
            </div>

            {/* POPULAR TAGS / SUBJECTS */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full"></div>
              <h4 className="text-sm font-headline font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Hash size={16} className="text-secondary" /> TEMAS POPULARES
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { tag: 'SEO Técnico', count: 18 },
                  { tag: 'React & NextJS', count: 12 },
                  { tag: 'PS5 SSD', count: 5 },
                  { tag: 'Marketing AI', count: 9 },
                  { tag: 'Checklists', count: 14 },
                  { tag: 'Core Web Vitals', count: 8 },
                  { tag: 'Link Building', count: 6 }
                ].map((item) => (
                  <button 
                    key={item.tag}
                    onClick={() => setSearchTerm(item.tag)}
                    className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-white px-3 py-2 bg-surface-container-high/80 rounded-lg hover:bg-surface-container-highest border border-white/5 hover:border-primary-container/20 transition-all font-medium"
                  >
                    <span>#{item.tag}</span>
                    <span className="text-[10px] text-slate-500 bg-black/35 px-1.5 py-0.5 rounded-full">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* LIBRARY STATS / QUICK DIRECT ACTIONS */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
              <h4 className="text-sm font-headline font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Star size={16} className="text-primary-container" /> ESTADÍSTICAS DEL PORTAL
              </h4>
              <div className="space-y-4 font-label">
                <div className="flex items-center justify-between p-3.5 bg-black/25 rounded-xl border border-white/5">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider">Total Descargas</span>
                  <span className="text-sm font-headline font-black text-primary">5,419+</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-black/25 rounded-xl border border-white/5">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider">Guías de Expertos</span>
                  <span className="text-sm font-headline font-black text-secondary">24</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-black/25 rounded-xl border border-white/5">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider">Velocidad del Portal</span>
                  <span className="text-sm font-headline font-black text-green-400">99.8ms</span>
                </div>
              </div>
            </div>

            {/* RECYCLED CALL-TO-ACTION CARD (Consistent with Forum join community) */}
            <div className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-b from-primary/30 to-secondary/30 shadow-xl group">
              <div className="relative z-10 bg-slate-900/90 rounded-[15px] p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Star className="text-primary" size={24} />
                </div>
                <h4 className="font-headline font-bold text-lg text-white mb-2">¿Necesitas ayuda técnica?</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  Nuestros consultores y arquitectos SEO pueden auditar tu plataforma y optimizar tus métricas de Google de manera 100% personalizada.
                </p>
                <Link 
                  to="/services" 
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/95 hover:to-blue-600/95 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
                >
                  Ver Servicios <ArrowRight size={14} />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

          </div>
        </div>

        {/* Newsletter Section */}
        <NewsletterForm variant="banner" source="resources_page" className="mt-24" />
      </main>
    </div>
  );
};

export default ResourcesPage;
