import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import NewsCard from '@/components/news/NewsCard';
import { Newspaper } from 'lucide-react';

const RelatedNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, summary, featured_image, slug, category, created_at')
          .eq('status', 'published')
          .eq('category', 'news')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setLatestNews(data || []);
      } catch (err) {
        console.error('Error fetching latest news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) return null; // Or a skeleton if preferred
  if (latestNews.length === 0) return null;

  return (
    <section className="mt-20 border-t border-slate-800/80 pt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Últimas Noticias del Sector</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </section>
  );
};

export default RelatedNews;
