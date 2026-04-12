
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ImageOptimized from '@/components/shared/ImageOptimized';

const NewsCard = memo(({ news }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-cyan-500/5"
    >
      {/* Image Container 4:3 Aspect Ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <ImageOptimized 
          src={news.featured_image} 
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          aspectRatio="4/3"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Floating Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 text-xs font-bold rounded-lg uppercase tracking-wider">
          {news.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/news/${news.slug}`} className="block group-hover:text-cyan-400 transition-colors">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
            {news.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
          {news.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 mt-auto">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <User size={12} className="text-cyan-500" />
              Redacción
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {news.reading_time || 5} min
            </span>
          </div>
          
          <Link 
            to={`/news/${news.slug}`}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

NewsCard.displayName = 'NewsCard';

export default NewsCard;
