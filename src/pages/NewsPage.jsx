import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { supabase } from '@/lib/customSupabaseClient';
import NewsCard from '@/components/news/NewsCard';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { Zap, TrendingUp, Brain, Monitor, LayoutGrid } from 'lucide-react';


const NewsPage = () => {
  const [filter, setFilter] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchNews();
    window.scrollTo(0, 0);
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_news')
      .select('id, title, excerpt, featured_image, slug, published_at, category, status, reading_time')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    console.log('🔍 NewsPage - fetchNews results:', { data, error, dataLength: data?.length });

    if (error) {
      console.error('❌ NewsPage - Error fetching news:', error);
    }

    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = (item.title?.toLowerCase().includes(filter.toLowerCase())) ||
      (item.excerpt?.toLowerCase().includes(filter.toLowerCase()));
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const featured = filteredNews[0];
  const sideFeed = filteredNews.slice(1, 4); // 2 side cards + we can use 3
  const bottomGrid = filteredNews.slice(4); // remaining


  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Noticias | Neural Workspace</title>
      </Helmet>

      <ScrollToTop />



      <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Search Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">Neural News Feed</span>
              <h2 className="font-headline text-5xl font-bold text-on-surface tracking-tight">
                Explora la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Frontera Digital</span>
              </h2>
            </div>
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline">search</span>
              </div>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-4 pl-12 pr-6 text-on-surface focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all duration-300 placeholder:text-slate-600"
                placeholder="Filtrar flujo de datos..."
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Category Scroller (Mobile) / Grid (Desktop) */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-5 gap-4 mb-12 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <button
              onClick={() => setSelectedCategory('')}
              className={`flex-shrink-0 p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 group shadow-lg min-w-[100px] md:min-w-0 ${selectedCategory === '' ? 'bg-primary/20 border-primary shadow-primary/20 scale-105' : 'bg-surface-container-low border-white/5 hover:border-primary/50'}`}
            >
              <LayoutGrid className={`w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110 ${selectedCategory === '' ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`} />
              <span className="font-label text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.2em] font-bold text-on-surface-variant group-hover:text-primary">Todos</span>
            </button>

            <button
              onClick={() => setSelectedCategory('GROWTH HACKING')}
              className={`flex-shrink-0 p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 group shadow-lg min-w-[100px] md:min-w-0 ${selectedCategory === 'GROWTH HACKING' ? 'bg-amber-500/20 border-amber-500 shadow-amber-500/20 scale-105' : 'bg-surface-container-low border-white/5 hover:border-amber-500/50'}`}
            >
              <Zap className={`w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110 ${selectedCategory === 'GROWTH HACKING' ? 'text-amber-400' : 'text-slate-500 group-hover:text-amber-400'}`} />
              <span className="font-label text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.2em] font-bold text-on-surface-variant group-hover:text-amber-400">Growth</span>
            </button>

            <button
              onClick={() => setSelectedCategory('SEO & Marketing')}
              className={`flex-shrink-0 p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 group shadow-lg min-w-[100px] md:min-w-0 ${selectedCategory === 'SEO & Marketing' ? 'bg-rose-500/20 border-rose-500 shadow-rose-500/20 scale-105' : 'bg-surface-container-low border-white/5 hover:border-rose-500/50'}`}
            >
              <TrendingUp className={`w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110 ${selectedCategory === 'SEO & Marketing' ? 'text-rose-400' : 'text-slate-500 group-hover:text-rose-400'}`} />
              <span className="font-label text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.2em] font-bold text-on-surface-variant group-hover:text-rose-400">SEO</span>
            </button>

            <button
              onClick={() => setSelectedCategory('A/B TESTING')}
              className={`flex-shrink-0 p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 group shadow-lg min-w-[100px] md:min-w-0 ${selectedCategory === 'A/B TESTING' ? 'bg-cyan-500/20 border-cyan-500 shadow-cyan-500/20 scale-105' : 'bg-surface-container-low border-white/5 hover:border-cyan-500/50'}`}
            >
              <Brain className={`w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110 ${selectedCategory === 'A/B TESTING' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
              <span className="font-label text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.2em] font-bold text-on-surface-variant group-hover:text-cyan-400">Testing</span>
            </button>

            <button
              onClick={() => setSelectedCategory('Tecnología')}
              className={`flex-shrink-0 p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 group shadow-lg min-w-[100px] md:min-w-0 ${selectedCategory === 'Tecnología' ? 'bg-emerald-500/20 border-emerald-500 shadow-emerald-500/20 scale-105' : 'bg-surface-container-low border-white/5 hover:border-emerald-500/50'}`}
            >
              <Monitor className={`w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110 ${selectedCategory === 'Tecnología' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}`} />
              <span className="font-label text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.2em] font-bold text-on-surface-variant group-hover:text-emerald-400">Tecnología</span>
            </button>
          </div>

        </section>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 h-96">
              <SkeletonLoader className="h-full w-full rounded-[2rem]" />
            </div>
            <div className="md:col-span-4 flex flex-col gap-4">
              <SkeletonLoader className="h-44 w-full rounded-[2rem]" />
              <SkeletonLoader className="h-44 w-full rounded-[2rem]" />
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-700 mb-4 block">sentiment_dissatisfied</span>
            <p className="text-on-surface-variant">No se encontraron noticias bajo estos parámetros.</p>
            <button onClick={() => { setFilter(''); setSelectedCategory(''); }} className="mt-4 text-primary hover:underline">Reiniciar búsqueda</button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Featured Card (Left Large) */}
            {featured && (
              <div className="md:col-span-8 group cursor-pointer">
                <Link to={`/news/${featured.slug}`}>
                  <article className="glass-panel rounded-[2rem] overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.1)] h-full flex flex-col border border-white/5 hover:border-primary/30 transition-all duration-500">
                    <div className="relative h-96 overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={featured.title} src={featured.featured_image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent opacity-60"></div>
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="px-3 py-1 bg-primary-container text-on-primary-container font-label text-[10px] rounded-full uppercase font-bold tracking-wider">Destacado</span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white font-label text-[10px] rounded-full uppercase tracking-wider">{featured.category}</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-4 text-slate-500 text-xs mb-4 font-label uppercase tracking-widest">
                          <span>{new Date(featured.published_at).toLocaleDateString()}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                          <span>{featured.reading_time || 5} min lectura</span>
                        </div>
                        <h3 className="font-headline text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">{featured.title}</h3>
                        <p className="text-on-surface-variant leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold">NW</div>
                          <span className="text-xs font-medium">Neural Editorial Team</span>
                        </div>
                        <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Side Feed & Remaining */}
            <div className="md:col-span-4 flex flex-col gap-8">
              {sideFeed.map((item, idx) => (
                <Link key={item.id} to={`/news/${item.slug}`}>
                  <article className="glass-panel rounded-[2rem] p-6 border border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                    <div className="flex gap-4 items-center mb-4">
                      <span className="px-2 py-0.5 bg-secondary-container/30 text-secondary font-label text-[9px] rounded uppercase tracking-widest border border-secondary/20">{item.category}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-label">{item.reading_time || 5} min</span>
                    </div>
                    <h4 className="font-headline text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2">{item.excerpt}</p>
                  </article>
                </Link>
              ))}

              {/* Newsletter Card */}
              <div className="bg-gradient-to-br from-secondary-container to-surface-container-highest rounded-[2rem] p-8 border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-headline text-xl font-bold text-white mb-4">Suscríbete al Pulso</h4>
                  <p className="text-sm text-secondary-fixed mb-6">Recibe resúmenes algorítmicos cada lunes directamente en tu córtex digital.</p>
                  <div className="space-y-3">
                    <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/40" placeholder="email@nexus.com" type="email" />
                    <button className="w-full bg-white text-secondary-container font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform">Sincronizar</button>
                  </div>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12">mail</span>
              </div>
            </div>

            {/* Bottom Grid for many items */}
            {bottomGrid.length > 0 && (
              <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {bottomGrid.map(item => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>



      {/* NavigationDrawer (Hidden Desktop Sidebar Trigger) */}
      <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 h-fit flex-col gap-6 p-4 z-[60] bg-[#12131c]/40 backdrop-blur-lg border-r border-white/5 rounded-r-3xl">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-primary-container/20 text-primary transition-all duration-300">
          <span className="material-symbols-outlined">trending_up</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-secondary-container/20 text-secondary transition-all duration-300">
          <span className="material-symbols-outlined">bolt</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-tertiary-container/20 text-tertiary transition-all duration-300">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default NewsPage;
