
import React, { useState, useEffect, memo } from 'react';
import { Search, Mail, Eye, Calendar, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const NewsSidebar = memo(({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topNews, setTopNews] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  useEffect(() => {
    fetchTopNews();
  }, []);

  const fetchTopNews = async () => {
    const { data } = await supabase
      .from('blog_news')
      .select('id, title, slug, views, created_at')
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(5);
    
    if (data) setTopNews(data);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, status: 'active' }]);

      if (error) {
          if (error.code === '23505') { // Unique violation
             toast({ title: "¡Ya estás suscrito!", description: "Este correo ya recibe nuestras noticias.", variant: "default" });
          } else {
             throw error;
          }
      } else {
        toast({ title: "¡Bienvenido a bordo!", description: "Te has suscrito correctamente.", className: "bg-cyan-500 border-none text-black" });
        setEmail('');
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "No pudimos procesar tu suscripción.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-full space-y-8">
      {/* 1. AI Assistant Search */}
      <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
        <h3 className="flex items-center gap-2 text-white font-bold mb-4">
          <Sparkles className="text-cyan-400" size={18} />
          AI Editor Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={16} />
          <Input 
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/40 border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* 2. Most Read */}
      <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
        <h3 className="flex items-center gap-2 text-white font-bold mb-6">
          <Eye className="text-orange-400" size={18} />
          Lo más leído
        </h3>
        <div className="space-y-6">
          {topNews.map((item, idx) => (
            <Link key={item.id} to={`/news/${item.slug}`} className="flex gap-4 group">
              <span className="text-4xl font-bold text-slate-800 group-hover:text-cyan-500/50 transition-colors">
                {idx + 1}
              </span>
              <div>
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h4>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Eye size={10} /> {item.views} lecturas
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Upcoming */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-6 border border-indigo-500/20">
        <h3 className="flex items-center gap-2 text-white font-bold mb-4">
          <Calendar className="text-purple-400" size={18} />
          Próximos lanzamientos
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Reporte exclusivo sobre GPT-5 y el impacto en el mercado SaaS.
        </p>
        <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
          Disponible: 24 Marzo
        </div>
      </div>

      {/* 4. Newsletter */}
      <div className="bg-cyan-950/20 rounded-2xl p-6 border border-cyan-900/50 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <h3 className="flex items-center gap-2 text-white font-bold mb-2 relative z-10">
          <Mail className="text-cyan-400" size={18} />
          Newsletter Semanal
        </h3>
        <p className="text-xs text-gray-400 mb-4 relative z-10">
          Recibe las noticias que realmente importan. Sin spam, solo valor.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
          <Input 
            type="email" 
            placeholder="tu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/40 border-cyan-900/50 text-white placeholder:text-gray-600 focus:border-cyan-500"
          />
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
          >
            {loading ? 'Suscribiendo...' : 'Suscribirme Gratis'}
          </Button>
        </form>
      </div>
    </aside>
  );
});

NewsSidebar.displayName = 'NewsSidebar';

export default NewsSidebar;
