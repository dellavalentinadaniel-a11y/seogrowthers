
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import LogoComponent from '@/components/shared/LogoComponent';

const NewsHero = ({ news }) => {
  if (!news) return null;

  const categoryColors = {
    'GROWTH HACKING': 'text-cyan-400 border-cyan-400',
    'SAAS': 'text-purple-400 border-purple-400',
    'A/B TESTING': 'text-orange-400 border-orange-400',
    'TENDENCIAS': 'text-pink-400 border-pink-400',
    'ACTUALIZACIONES': 'text-green-400 border-green-400',
    'TODO': 'text-blue-400 border-blue-400'
  };

  const accentColor = categoryColors[news.category] || categoryColors['TODO'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 group"
    >
      {/* Background Image */}
      <img 
        src={news.featured_image || 'https://images.unsplash.com/photo-1675410202225-0aa53cc561e9'} 
        alt={news.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/60 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
        <div className="max-w-4xl relative">
          
          <div className="absolute -top-20 right-0 md:right-10 opacity-80 hidden md:block">
             <LogoComponent size="large" variant="icon-only" isLink={false} />
          </div>

          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-block px-4 py-1.5 rounded-full border ${accentColor} bg-black/50 backdrop-blur-sm text-xs md:text-sm font-bold tracking-wider mb-6`}
          >
            {news.category}
          </motion.span>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {news.title}
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl mb-8 line-clamp-2 max-w-2xl"
          >
            {news.excerpt}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <User size={20} className="text-gray-300" />
              </div>
              <span className="font-medium text-white">Redacción SEO Growthers</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{format(new Date(news.published_at || news.created_at), 'd MMM, yyyy', { locale: es })}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{news.reading_time || 5} min lectura</span>
            </div>

            <Link 
              to={`/news/${news.slug}`}
              className="ml-auto md:ml-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-xl transition-all flex items-center gap-2 group/btn"
            >
              Leer más
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsHero;
