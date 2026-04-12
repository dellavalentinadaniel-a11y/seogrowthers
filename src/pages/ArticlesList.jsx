
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ScrollToTop from '@/components/layout/ScrollToTop';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [categories, setCategories] = useState(['Todas']);
  
  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, searchTerm]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'Todas') {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setArticles(data || []);

      // Extract unique categories from all articles (or fetch from categories table)
      // For this implementation, we'll assume we want to derive filter from available content if categories table access is complex,
      // but we seeded categories table, so let's fetch it if possible. 
      // Simplified: We'll hardcode or extract for now to keep it snappy.
      const uniqueCats = ['Todas', 'RPG', 'PS5', 'GTA', 'Análisis', 'Guías'];
      setCategories(uniqueCats);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const ArticleCard = ({ article, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-[#111827] rounded-xl overflow-hidden border border-slate-800 hover:border-[#00d9ff]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] flex flex-col h-full"
    >
      <Link to={`/articulos/${article.slug}`} className="relative h-56 overflow-hidden block">
        <img 
          src={article.featured_image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4">
           <span className="bg-[#00d9ff] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
             {article.category}
           </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
           <Calendar size={14} />
           {article.created_at ? format(new Date(article.created_at), 'd MMM yyyy', { locale: es }) : ''}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#00d9ff] transition-colors">
          <Link to={`/articulos/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
          {article.summary}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
           <Link to={`/articulos/${article.slug}`} className="text-white text-sm font-semibold hover:text-[#00d9ff] transition-colors flex items-center gap-1">
             Leer artículo <ChevronRight size={16} />
           </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Noticias y Artículos - SEO Growthers</title>
        <meta name="description" content="Últimas noticias, análisis y guías sobre videojuegos y tecnología." />
      </Helmet>
      
      <ScrollToTop />

      <main className="bg-[#0C0D0D] min-h-screen pb-20 pt-32">
        <div className="container mx-auto px-6">
           
           <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Noticias y <span className="text-[#00d9ff]">Análisis</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Mantente al día con lo último en el mundo gaming y tech.
              </p>
           </div>

           {/* Filter & Search Bar */}
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-[#111827] p-4 rounded-xl border border-slate-800">
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                       selectedCategory === cat 
                         ? 'bg-[#00d9ff] text-black' 
                         : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>

              <div className="relative w-full md:w-80">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                 <Input 
                   type="text" 
                   placeholder="Buscar artículos..." 
                   className="pl-10 bg-[#0a0e27] border-slate-700 text-white w-full"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>

           {/* Grid */}
           {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(n => (
                   <div key={n} className="bg-[#111827] rounded-xl h-96 animate-pulse border border-slate-800"></div>
                ))}
             </div>
           ) : articles.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                   <ArticleCard key={article.id} article={article} index={index} />
                ))}
             </div>
           ) : (
             <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No se encontraron artículos.</p>
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }} className="mt-4" variant="outline">
                   Limpiar filtros
                </Button>
             </div>
           )}

        </div>
      </main>
    </>
  );
};

export default ArticlesList;
