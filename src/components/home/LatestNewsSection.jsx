
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import NewsCard from '@/components/news/NewsCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const LatestNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from('blog_news')
        .select('id, title, excerpt, featured_image, slug, published_at, category, reading_time')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (data) setNews(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section className="py-24 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Últimas <span className="text-cyan-400">Noticias</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              Mantente actualizado con las últimas tendencias en tecnología, growth hacking y desarrollo digital.
            </p>
          </div>
          <Link to="/news">
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black">
              Ver todas las noticias <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             [1, 2, 3].map(i => <SkeletonLoader key={i} className="h-[400px] w-full rounded-2xl" />)
          ) : (
             news.map((item) => <NewsCard key={item.id} news={item} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
