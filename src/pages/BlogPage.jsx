import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ArticleCard from '@/components/article/ArticleCard';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/input';
import { Search, Loader2, Plus, PenSquare, MessageSquare, Shield, Star, ThumbsUp, ArrowRight, Hash, Verified, Layout } from 'lucide-react';
import AdUnit from '@/components/ads/AdUnit';
import AdSidebar from '@/components/ads/AdSidebar';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/Pagination';
import RecentArticlesCarousel from '@/components/shared/RecentArticlesCarousel';
import GoogleBusinessReviews from '@/components/shared/GoogleBusinessReviews';
import { useToast } from '@/components/ui/use-toast';

const PAGE_SIZE = 6;
const TABS = ['Noticias', 'Foro', 'Reseñas'];

const BlogPage = () => {
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState('noticias');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('blog_categories').select('id, name, slug').eq('type', 'article');
    setCategories(data || []);
  }, []);

  const fetchArticles = useCallback(async (sectionFilter) => {
    setLoading(true);
    let dbArticles = [];
    try {
      let query = supabase
        .from('articles')
        .select('id, title, summary, featured_image, slug, category, created_at, status, section', { count: 'exact' })
        .eq('status', 'published');

      if (sectionFilter) {
        query = query.eq('section', sectionFilter);
      } else {
        query = query.neq('section', 'Foro');
      }

      if (category) {
        const matchedCategory = categories.find(c => c.slug === category);
        if (matchedCategory) {
          query = query.eq('category', matchedCategory.name);
        } else {
          query = query.eq('category', category);
        }
      }

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error, count } = await query;
      if (!error && data) {
        dbArticles = data.map(item => {
          const cleanExcerpt = (item.summary || '').replace(/<[^>]*>/g, '');
          return {
            ...item,
            description: cleanExcerpt,
            excerpt: cleanExcerpt
          };
        });
        setTotalCount(count || 0);
      }
    } catch (err) {
      console.warn("DB fetch failed:", err);
    }

    setArticles(dbArticles);
    setLoading(false);
  }, [category, searchTerm, categories]);

  // Reset page when filtering or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchTerm, activeTab]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const init = async () => {
      await fetchCategories();
    };
    init();
  }, [fetchCategories]);

  useEffect(() => {
    if (!category || (categories && categories.length > 0)) {
      fetchArticles();
    }
  }, [category, categories, fetchArticles]);

  const tabs = TABS.map((tab, index) => ({
    key: tab,
    label: tab,
    value: tab.toLowerCase()
  }));

  // Forum post content from Claude Academy article
  const forumPost = {
    id: 999,
    title: 'Create a polished client proposal deck with professional layouts data visualizations and cohesive design—then refine through feedback until it matches your standards.',
    summary: 'Claude can build complete presentation decks with thoughtful slide layouts, clean data visualizations, and consistent typography. Describe your proposal content and design preferences, and Claude creates a professional deck. Treat that first version as a draft rather than the finished deliverable, and plan to revise it a few times.',
    slug: 'claude-academy-sales-proposal-presentation',
    category: 'Herramientas AI',
    created_at: new Date().toISOString(),
    status: 'published',
    section: 'Foro',
    profiles: {
      username: 'SEO_Growthers',
      full_name: 'Equipo SEO Growthers',
      avatar_url: null,
      role: 'writer',
      xp: 84
    },
    article_likes: [],
    article_comments: []
  };

  // Logic moved to fetchArticles for server-side search and pagination
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm.trim() === '' || 
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>
          {activeTab === 'noticias'
            ? category
              ? `Blog de ${category} - Artículos y Guías | SEO Growthers`
              : 'Blog de SEO, Marketing Digital y Desarrollo Web | SEO Growthers'
            : activeTab === 'foro'
              ? 'Foro | SEO Growthers'
              : 'Reseñas | SEO Growthers'}
        </title>
        <meta name="description" content={activeTab === 'noticias'
          ? category
            ? `Artículos y guías sobre ${category}. Estrategias digitales para potenciar tu negocio.`
            : 'Explora nuestros artículos sobre SEO, marketing digital, desarrollo web e inteligencia artificial para potenciar tu negocio.'
          : activeTab === 'foro'
            ? 'Comunidad de expertos en SEO y desarrollo web'
            : 'Reseñas y opiniones de clientes de SEO Growthers'}
        />
        <link rel="canonical" href={`https://seogrowthers.com/blog/${activeTab}`} />
        {currentPage > 1 && (
          <link rel="prev" href={`https://seogrowthers.com${activeTab === 'noticias' ? `/blog/${category}` : '/blog'}?page=${currentPage - 1}`} />
        )}
        {currentPage * PAGE_SIZE < totalCount && (
          <link rel="next" href={`https://seogrowthers.com${activeTab === 'noticias' ? `/blog/${category}` : '/blog'}?page=${currentPage + 1}`} />
        )}

        {/* Open Graph */}
        <meta property="og:title" content={activeTab === 'noticias'
          ? category
            ? `Blog de ${category} | SEO Growthers`
            : 'Blog | SEO Growthers'
          : activeTab === 'foro'
            ? 'Foro | SEO Growthers'
            : 'Reseñas | SEO Growthers'} />
        <meta property="og:description" content={activeTab === 'noticias'
          ? category
            ? `Artículos y guías sobre ${category}. Estrategias digitales para potenciar tu negocio.`
            : 'Artículos sobre SEO, desarrollo web, IA y estrategias digitales para hacer crecer tu negocio.'
          : activeTab === 'foro'
            ? 'Discusiones y debates de la comunidad SEO Growthers'
            : 'Reseñas y opiniones de clientes de SEO Growthers'} />
        <meta property="og:url" content={`https://seogrowthers.com/blog/${activeTab}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SEO Growthers" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Blog&subtitle=SEO%2C+marketing+digital+e+IA&type=blog" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content={activeTab === 'noticias'
          ? category
            ? `Blog de ${category} | SEO Growthers`
            : 'Blog | SEO Growthers'
          : activeTab === 'foro'
            ? 'Foro | SEO Growthers'
            : 'Reseñas | SEO Growthers'} />
        <meta name="twitter:description" content={activeTab === 'noticias'
          ? category
            ? `Artículos y guías sobre ${category}.`
            : 'Artículos sobre SEO, desarrollo web, IA y marketing digital.'
          : activeTab === 'foro'
            ? 'Discusiones y debates de la comunidad SEO Growthers'
            : 'Reseñas y opiniones de clientes de SEO Growthers'} />
        <meta name="twitter:image" content="https://seogrowthers.com/api/og?title=Blog&subtitle=SEO%2C+marketing+digital+e+IA&type=blog" />

        {/* CollectionPage schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": activeTab === 'noticias'
              ? category
                ? `Blog de ${category} | SEO Growthers`
                : "Blog | SEO Growthers"
              : activeTab === 'foro'
                ? 'Foro | SEO Growthers'
                : 'Reseñas | SEO Growthers',
            "description": activeTab === 'noticias'
              ? category
                ? `Artículos y guías sobre ${category}. Estrategias digitales para potenciar tu negocio.`
                : "Artículos sobre SEO, marketing digital, desarrollo web e inteligencia artificial."
              : activeTab === 'foro'
                ? 'Discusiones y debates de la comunidad SEO Growthers'
                : 'Reseñas y opiniones de clientes de SEO Growthers',
            "url": `https://seogrowthers.com/blog/${activeTab}`,
            "publisher": {
              "@type": "Organization",
              "name": "SEO Growthers",
              "logo": { "@type": "ImageObject", "url": "https://seogrowthers.com/api/og?title=Blog&subtitle=SEO%2C+marketing+digital+e+IA&type=blog" }
            },
            "inLanguage": "es-AR",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://seogrowthers.com/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://seogrowthers.com/blog" },
                ...(category ? [{ "@type": "ListItem", "position": 3, "name": category, "item": `https://seogrowthers.com/blog/${category}` }] : [])
              ]
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs className="mb-8" />
          
          {/* Tabs Navigation */}
          <div className="flex flex-col md:flex-row justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.value
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Recent Articles Hero Carousel (only for noticias tab) */}
          {activeTab === 'noticias' && !category && !searchTerm && currentPage === 1 && (
            <RecentArticlesCarousel title="Destacados del Blog" subtitle="EXPLORA LO ÚLTIMO" />
          )}

          {activeTab === 'noticias' && (
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
                Nuestro <span className="text-cyan-400">Blog</span>
              </h1>
              
              {session && (
                <div className="flex justify-center mb-6">
                  <Link to="/forum">
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-[#0C0D0D] font-bold px-6 py-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all hover:scale-105 active:scale-95">
                      <MessageSquare size={20} />
                      Iniciar Debate en el Foro
                    </Button>
                  </Link>
                </div>
              )}
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ideas, tutoriales y noticias sobre el mundo del desarrollo de software y la transformación digital.
              </p>
            </div>
          )}

          {activeTab === 'noticias' ? (
            <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
              {/* Sidebar Filters & Ads */}
              <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                  <h3 className="font-bold text-white mb-4">Buscar</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Buscar artículos..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                  <h3 className="font-bold text-white mb-4">Categorías</h3>
                  <nav className="flex flex-col gap-2">
                    <Link 
                      to="/blog/noticias" 
                      className={`text-sm py-2 px-3 rounded transition-colors ${!category ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
                    >
                      Todas
                    </Link>
                    {categories.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/blog/noticias/${cat.slug}`}
                        className={`text-sm py-2 px-3 rounded transition-colors ${category === cat.slug ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                {/* Sidebar Ads */}
                <div className="hidden md:block">
                  <AdSidebar />
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin h-10 w-10 text-cyan-500" />
                  </div>
                ) : filteredArticles.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>

                    <Pagination 
                      currentPage={currentPage}
                      totalItems={totalCount}
                      pageSize={PAGE_SIZE}
                      onPageChange={setCurrentPage}
                      className="mt-12"
                    />
                    
                    {/* Footer Leaderboard for Grid */}
                    <div className="mt-12">
                      <AdUnit 
                        slotId="blog-bottom-leaderboard" 
                        width="728px" 
                        height="90px" 
                        className="hidden md:flex justify-center"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                    <p className="text-gray-400 text-lg">No se encontraron artículos.</p>
                    {category && <Link to="/blog/noticias" className="text-cyan-400 mt-2 inline-block hover:underline">Ver todos los artículos</Link>}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'foro' ? (
            <div className="space-y-8">
              <div className="flex justify-center mb-8">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-[#0C0D0D] font-bold px-6 py-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all hover:scale-105 active:scale-95">
                  <MessageSquare size={20} />
                  Iniciar Debate en el Foro
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Main Forum Feed */}
                <div className="md:w-2/3 space-y-6">
                  {session && (session.user?.role !== 'owner' && session.user?.role !== 'admin' && session.user?.role !== 'editor' && session.user?.role !== 'writer') && (
                    <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl mb-6">
                      <p className="text-slate-400 text-sm">Para iniciar un debate, sesión requerida</p>
                    </div>
                  )}

                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map(n => (
                        <div key={n} className="h-40 bg-slate-900/50 rounded-xl animate-pulse" />
                      ))}
                    </div>
                  ) : filteredArticles.length === 0 ? (
                    <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 text-center text-slate-500 italic">
                      No se encontraron debates para los filtros aplicados.
                    </div>
                  ) : filteredArticles.map((article, idx) => {
                    // Add the forum post at the beginning if it's the first article
                    const isForumPost = idx === 0 && article.section === 'Foro';
                    const displayArticle = isForumPost ? forumPost : article;
                    
                    return (
                      <article key={displayArticle.id} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all border border-white/10 hover:border-cyan-500/30 group shadow-lg">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {displayArticle.profiles?.avatar_url ? (
                                <img 
                                  src={displayArticle.profiles.avatar_url} 
                                  alt={displayArticle.profiles.username}
                                  className="w-10 h-10 rounded-full object-cover border border-primary/30"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                  {displayArticle.profiles?.username?.[0]?.toUpperCase() || 'A'}
                                </div>
                              )}
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-on-surface uppercase tracking-tight">
                                    {displayArticle.profiles?.full_name || displayArticle.profiles?.username || 'Usuario'}
                                  </span>
                                  {displayArticle.profiles?.role === 'owner' && (
                                    <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold">OWNER</span>
                                  )}
                                  {displayArticle.profiles?.role === 'admin' && (
                                    <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                                  )}
                                  {displayArticle.profiles?.xp >= 501 && (
                                    <span className="text-[9px] text-fuchsia-400 font-bold border border-fuchsia-500/30 px-1 rounded-sm uppercase tracking-tighter">Elite</span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-500 font-label uppercase tracking-widest">
                                  {new Date(displayArticle.created_at).toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-secondary font-bold font-label bg-secondary/10 px-2 py-1 rounded uppercase">
                                {displayArticle.category || 'GENERAL'}
                              </span>
                            </div>
                          </div>
                          <Link to={`/blog/noticias/${displayArticle.slug}`}>
                            <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                              {displayArticle.title}
                            </h3>
                          </Link>
                          <p className="text-slate-400 line-clamp-2 text-sm mb-6 leading-relaxed">
                            {displayArticle.summary}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex gap-6">
                              <Link 
                                to={`/blog/noticias/${displayArticle.slug}`}
                                className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                              >
                                <ThumbsUp size={18} />
                                <span className="text-xs font-bold">{displayArticle.article_likes?.length || 0}</span>
                              </Link>
                              <Link 
                                to={`/blog/noticias/${displayArticle.slug}#comments`}
                                className="flex items-center gap-2 text-slate-500 hover:text-secondary transition-colors"
                              >
                                <MessageSquare size={18} />
                                <span className="text-xs font-bold">{displayArticle.article_comments?.length || 0}</span>
                              </Link>
                            </div>
                            <Link to={`/blog/noticias/${displayArticle.slug}`} className="text-primary text-xs font-bold font-headline flex items-center gap-1 group">
                              READ MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Sidebar */}
                <aside className="md:w-1/3 space-y-8">
                  {/* Search */}
                  <div className="bg-surface-container-high/40 backdrop-blur-md rounded-xl p-6 border-t border-white/5">
                    <h4 className="text-sm font-headline font-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Search size={16} className="text-primary" /> Search Database
                    </h4>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Query keywords..."
                        className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Trending Tags */}
                  <div className="bg-surface-container-high/40 backdrop-blur-md rounded-xl p-6 border-t border-white/5">
                    <h4 className="text-sm font-headline font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Hash size={16} className="text-secondary" /> Trending
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['GoogleUpdate', 'SchemaMarkup', 'ReactNextJS', 'LinkBuilding', 'TailwindCSS'].map(tag => (
                        <span key={tag} className="bg-surface-container-highest text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:text-primary transition-colors border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active Experts */}
                  <div className="bg-surface-container-high/40 backdrop-blur-md rounded-xl p-6 border-t border-white/5">
                    <h4 className="text-sm font-headline font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center justify-between">
                      <span>Top Architects</span>
                      <Verified size={16} className="text-primary" />
                    </h4>
                    <div className="space-y-4">
                      {[
                        { name: 'Marcus Wright', lvl: 84 },
                        { name: 'Elena Belova', lvl: 79 },
                        { name: 'David Kho', lvl: 72 }
                      ].map(expert => (
                        <div key={expert.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs capitalize">
                              {expert.name?.[0]}
                            </div>
                            <span className="text-xs font-medium text-slate-300">{expert.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-primary">LVL {expert.lvl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container group">
                    <div className="relative z-10">
                      <h4 className="font-headline font-bold text-xl mb-2">Únete a la Comunidad</h4>
                      <p className="text-sm opacity-80 mb-4">Conecta con más de 12k expertos en SEO.</p>
                      <button 
                        onClick={() => setActiveTab('foro')}
                        className="w-full bg-white text-black py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all transform active:scale-95"
                      >
                        INICIAR DEBATE
                      </button>
                    </div>
                    <Layout className="absolute -right-8 -bottom-8 opacity-10 text-[120px] rotate-12 group-hover:rotate-0 transition-transform duration-700" size={140} />
                  </div>
                </aside>
              </div>
            </div>
          ) : activeTab === 'reseñas' ? (
            <GoogleBusinessReviews />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BlogPage;