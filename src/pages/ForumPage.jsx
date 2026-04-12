
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  MessageSquare, 
  ThumbsUp, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Verified, 
  Hash,
  LayoutGrid,
  Zap
} from 'lucide-react';
import ImageOptimized from '@/components/shared/ImageOptimized';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ForumPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setFeaturedArticle(data[0]);
        setArticles(data.slice(1));
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const categories = ['All Topics', 'SEO', 'Web Dev', 'AI Tools', 'Growth'];

  const handleStartThread = () => {
    if (!session) {
      toast({
        title: "Acceso Restringido",
        description: "Necesitas una cuenta premium para iniciar un debate.",
        variant: "destructive"
      });
      navigate('/login', { state: { from: '/forum' } });
      return;
    }
    navigate('/blog/create', { state: { category: 'Debates', from: '/forum' } });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body selection:bg-primary/30">
      <Helmet>
        <title>ARCHITECT_FORUM | SEO Growthers</title>
        <meta name="description" content="Comunidad de expertos en SEO y desarrollo web." />
      </Helmet>

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Featured Section */}
        {featuredArticle && (
          <section className="mb-12 relative group animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link to={`/blog/${featuredArticle.category}/${featuredArticle.slug}`} className="block relative h-[450px] w-full overflow-hidden rounded-xl bg-surface-container-high border-t border-white/5">
              <ImageOptimized 
                src={featuredArticle.featured_image} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                <div className="flex gap-3 mb-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest font-headline">Featured</span>
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest font-headline">
                    {featuredArticle.category || 'SEO Strategy'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight tracking-tighter text-on-surface mb-6 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h1>
                <div className="flex items-center gap-6 text-on-surface-variant font-label text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-secondary" />
                    <span>24 comments</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Categories & Filters */}
        <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto overflow-hidden">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-label font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat 
                    ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                    : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border-t border-white/5">
              <button 
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-surface-container-highest text-primary flex items-center gap-2"
                aria-label="Filter by Latest"
              >
                <Zap size={14} /> Latest
              </button>
              <button 
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-on-surface transition-colors flex items-center gap-2"
                aria-label="Filter by Trending"
              >
                <TrendingUp size={14} /> Trending
              </button>
            </div>
          </div>
        </section>

        {/* Forum Feed Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-8 space-y-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(n => (
                  <div key={n} className="h-64 bg-surface-container-high rounded-xl animate-pulse" />
                ))}
              </div>
            ) : articles.map((article, idx) => (
              <article key={article.id} className="bg-surface-container-low/40 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/[0.03] transition-all border-t border-white/5 group border-l border-white/5">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {article.author?.[0] || 'A'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface uppercase tracking-tight">Admin Expert</span>
                        <span className="text-[10px] text-slate-500 font-label uppercase tracking-widest">
                          {format(new Date(article.created_at), 'd MMM · HH:mm', { locale: es })}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-secondary font-bold font-label bg-secondary/10 px-2 py-1 rounded uppercase">
                      {article.category || 'GENERAL'}
                    </span>
                  </div>
                  <Link to={`/blog/${article.category}/${article.slug}`}>
                    <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 line-clamp-2 text-sm mb-6 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-6">
                      <button 
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                        aria-label={`Like article: ${article.title}`}
                      >
                        <ThumbsUp size={18} />
                        <span className="text-xs font-bold">124</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 text-slate-500 hover:text-secondary transition-colors"
                        aria-label={`View comments for article: ${article.title}`}
                      >
                        <MessageSquare size={18} />
                        <span className="text-xs font-bold">12</span>
                      </button>
                    </div>
                    <Link to={`/blog/${article.category}/${article.slug}`} className="text-primary text-xs font-bold font-headline flex items-center gap-1 group">
                      READ MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
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
                <h4 className="font-headline font-bold text-xl mb-2">Join the Elite</h4>
                <p className="text-sm opacity-80 mb-4">Connect with 12k+ SEO Architects globally.</p>
                <button 
                  onClick={handleStartThread}
                  className="w-full bg-white text-black py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all transform active:scale-95"
                >
                  START A THREAD
                </button>
              </div>
              <LayoutGrid className="absolute -right-8 -bottom-8 opacity-10 text-[120px] rotate-12 group-hover:rotate-0 transition-transform duration-700" size={140} />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ForumPage;
