
import React, { useEffect, useState, useCallback } from 'react';

import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin, 
  MessageCircle, ArrowLeft, Heart, ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewsCard from '@/components/news/NewsCard';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import CommentsSection from '@/components/news/CommentsSection';
import InteractionBar from '@/components/article/InteractionBar';
import { toast } from '@/components/ui/use-toast';



import { newsData as localNews } from '@/data/newsData';

const NewsDetail = () => {
  const { category, slug } = useParams();
  const fullSlug = category ? `${category}/${slug}` : slug;
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [user, setUser] = useState(null);


  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }, []);


  const fetchArticle = useCallback(async () => {
    setLoading(true);
    let current = null;

    try {
      // 1. Try fetching from Supabase
      const { data, error } = await supabase
        .from('blog_news')
        .select('id, title, excerpt, content, featured_image, slug, category, published_at, status, author_id, reading_time, views')
        .eq('slug', fullSlug)
        .single();

      if (!error && data) {
        current = data;
      }
    } catch (err) {
      console.warn("Supabase fetch error:", err);
    }

    // 2. Fallback to local data if not found in DB
    if (!current) {
      current = localNews.find(n => n.slug === slug);
    }

    if (!current) {
      setLoading(false);
      return;
    }

    setArticle(current);
    
    // Extract headings for TOC from Markdown or HTML
    const extractedHeadings = [];
    // Convert to string to avoid errors if content is null/undefined
    const contentStr = String(current.content || "");
    
    if (contentStr.includes('<h2') || contentStr.includes('<h3')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(contentStr, 'text/html');
      const hTags = Array.from(doc.querySelectorAll('h2, h3'));
      hTags.forEach(h => {
        extractedHeadings.push({
          id: h.id || h.textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
          text: h.textContent.trim(),
          level: h.tagName
        });
      });
    } else {
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      let match;
      while ((match = headingRegex.exec(contentStr)) !== null) {
        const level = match[1].length === 2 ? 'H2' : 'H3';
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
    }
    setHeadings(extractedHeadings);

    // Increment views
    const { error: rpcError } = await supabase.rpc('increment_news_views', { row_id: current.id });
    if (rpcError) {
         // If RPC doesn't exist, manual update fallback
         await supabase.from('blog_news').update({ views: (current.views || 0) + 1 }).eq('id', current.id);
    }

    // Fetch related
    if (current.category) {
      const { data: relatedData } = await supabase
        .from('blog_news')
        .select('id, title, excerpt, featured_image, slug, category, published_at, reading_time')
        .eq('category', current.category)
        .neq('id', current.id)
        .eq('status', 'published')
        .limit(3);
      setRelated(relatedData || []);
    }

    setLoading(false);
  }, [slug, fullSlug]);


  if (loading) return <div className="min-h-screen bg-[#0C0D0D] pt-32 text-center text-white">Cargando...</div>;
  if (!article) return <div className="min-h-screen bg-[#0C0D0D] pt-32 text-center text-white">Artículo no encontrado</div>;

  const shareUrl = window.location.href;
  const shareText = `Lee este artículo: ${article.title}`;

  return (
    <>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.featured_image} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "image": [article.featured_image],
            "datePublished": article.published_at,
            "dateModified": article.updated_at,
            "author": [{ "@type": "Person", "name": "Redacción Agency" }]
          })}
        </script>
      </Helmet>

      <div className="bg-[#0C0D0D] min-h-screen pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 mb-8">
            <nav className="text-sm text-gray-500 flex items-center gap-2">
                <Link to="/" className="hover:text-white">INICIO</Link>
                <span>/</span>
                <Link to="/news" className="hover:text-white">NOTICIAS</Link>
                <span>/</span>
                <span className="text-cyan-400 truncate max-w-[200px]">{article.title}</span>
            </nav>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-6 mb-12">
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden relative">
                <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold tracking-wider mb-6 border border-cyan-500/30">
                        {article.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
                        {article.title}
                    </h1>
                     <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <User size={20} className="text-gray-300" />
                            </div>
                            <span className="font-medium text-white">Redacción Agency</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{format(new Date(article.published_at), 'd MMM yyyy', { locale: es })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{article.reading_time} min lectura</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Left: Share & TOC */}
            <aside className="lg:col-span-3 hidden lg:block space-y-8 sticky top-24 h-fit">
                <div className="space-y-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Compartir</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`)} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                            <div className="p-2 bg-slate-900 rounded-full"><Twitter size={18} /></div> Twitter
                        </button>
                        <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                            <div className="p-2 bg-slate-900 rounded-full"><Linkedin size={18} /></div> LinkedIn
                        </button>
                        <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                             <div className="p-2 bg-slate-900 rounded-full"><Facebook size={18} /></div> Facebook
                        </button>
                        <button onClick={() => window.open(`https://wa.me/?text=${shareText} ${shareUrl}`)} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                             <div className="p-2 bg-slate-900 rounded-full"><MessageCircle size={18} /></div> WhatsApp
                        </button>
                    </div>

                    <div className="pt-6 border-t border-slate-800 space-y-4">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Interacción</p>
                        <InteractionBar 
                            contentId={article.id} 
                            contentType="news" 
                        />
                    </div>
                </div>

                {headings.length > 0 && (
                     <div className="space-y-4 pt-8 border-t border-slate-800">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Contenido</p>
                        <nav className="flex flex-col gap-2">
                            {headings.map((h, i) => (
                                <a key={i} href={`#${h.id}`} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors line-clamp-1">
                                    {h.text}
                                </a>
                            ))}
                        </nav>
                     </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9 max-w-4xl">
                <MarkdownRenderer content={article.content} />

                {/* Mobile Share (Bottom) */}
<InteractionBar contentId={article.id} contentType="news" />

                {/* Comments Section */}
                <CommentsSection newsId={article.id} />
            </main>
        </div>

        {/* Related News */}
        {related.length > 0 && (
            <div className="container mx-auto px-6 mt-24 pt-12 border-t border-slate-800">
                <h3 className="text-2xl font-bold text-white mb-8">Noticias Relacionadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {related.map(item => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default NewsDetail;
