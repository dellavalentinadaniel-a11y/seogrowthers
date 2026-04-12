
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import ImageOptimized from '@/components/shared/ImageOptimized';
import { generateJsonLd } from '@/lib/seoHelpers';
import { Helmet } from 'react-helmet-async';

const ArticleCard = ({ article, className }) => {
  const jsonLd = generateJsonLd('BlogPosting', {
    title: article.title,
    image: article.featured_image,
    datePublished: article.published_at || article.created_at,
    authorName: 'Equipo Editorial', // Needs author relation in real app
    description: article.excerpt,
    url: `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${article.category || 'general'}/${article.slug}`
  });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
           {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <article className={`group flex flex-col h-full bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 ${className}`}>
        <Link to={`/blog/${article.category || 'general'}/${article.slug}`} className="block relative h-48 overflow-hidden">
          <ImageOptimized 
            src={article.featured_image}
            alt={article.featured_image_alt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={250}
          />
          <div className="absolute top-4 left-4">
             <span className="bg-cyan-600/90 text-white text-xs px-2 py-1 rounded shadow-lg backdrop-blur-sm">
                {article.category || 'Blog'}
             </span>
          </div>
        </Link>
        
        <div className="p-5 flex flex-col flex-grow">
          <header className="mb-3">
             <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                   <Calendar size={12} />
                   {(article.published_at || article.created_at) ? format(new Date(article.published_at || article.created_at), 'd MMM yyyy', { locale: es }) : 'Borrador'}
                </span>
                <span className="flex items-center gap-1">
                   <User size={12} />
                   Redacción
                </span>
             </div>
             <Link to={`/blog/${article.category || 'general'}/${article.slug}`}>
                <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.title}
                </h2>
             </Link>
          </header>
          
          <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">
            {article.excerpt}
          </p>
          
          <footer className="mt-auto pt-4 border-t border-slate-800">
             <Link 
                to={`/blog/${article.category || 'general'}/${article.slug}`}
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center"
             >
                Leer más
             </Link>
          </footer>
        </div>
      </article>
    </>
  );
};

export default ArticleCard;
