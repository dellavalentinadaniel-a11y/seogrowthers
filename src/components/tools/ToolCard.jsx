
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ToolCard = ({ tool, onFavoriteToggle }) => {
  const getCategoryStyle = (cat) => {
    const uppercaseCat = cat?.toUpperCase() || '';
    
    // Herramientas de SEO y marketing
    if (uppercaseCat.includes('SEO') || uppercaseCat.includes('MARKETING')) {
      return {
        badge: 'bg-[#00d9ff]/10 text-[#00d9ff] border-[#00d9ff]/30',
        glowClass: 'hover:shadow-[0_0_30px_rgba(0,217,255,0.18)] hover:border-[#00d9ff]/40',
        color: '#00d9ff'
      };
    }
    // Herramientas de desarrollo
    if (uppercaseCat.includes('DESARROLLO')) {
      return {
        badge: 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30',
        glowClass: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.18)] hover:border-[#f59e0b]/40',
        color: '#f59e0b'
      };
    }
    // Herramientas de diseño
    if (uppercaseCat.includes('DISEÑO')) {
      return {
        badge: 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30',
        glowClass: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.18)] hover:border-[#10b981]/40',
        color: '#10b981'
      };
    }
    // Herramientas de productividad
    if (uppercaseCat.includes('PRODUCTIVIDAD')) {
      return {
        badge: 'bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/30',
        glowClass: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.18)] hover:border-[#7c3aed]/40',
        color: '#7c3aed'
      };
    }
    // Herramientas de testing
    if (uppercaseCat.includes('TESTING') || uppercaseCat.includes('PRUEBAS') || uppercaseCat.includes('ANÁLISIS')) {
      return {
        badge: 'bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/30',
        glowClass: 'hover:shadow-[0_0_30px_rgba(255,107,53,0.18)] hover:border-[#ff6b35]/40',
        color: '#ff6b35'
      };
    }
    // Integraciones / Por defecto
    if (uppercaseCat.includes('INTEGRACIONES')) {
      return {
        badge: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30',
        glowClass: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] hover:border-[#06b6d4]/40',
        color: '#06b6d4'
      };
    }
    return {
      badge: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
      glowClass: 'hover:shadow-[0_0_30px_rgba(156,163,175,0.18)] hover:border-gray-500/40',
      color: '#9ca3af'
    };
  };

  const styleConfig = getCategoryStyle(tool.category);

  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const saved = localStorage.getItem('seogrowthers_favorite_tools');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.includes(tool.id);
      }
    } catch (e) {
      console.error('Error al leer favoritos:', e);
    }
    return false;
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('seogrowthers_favorite_tools');
      let favorites = saved ? JSON.parse(saved) : [];
      let newFavoriteStatus;
      if (favorites.includes(tool.id)) {
        favorites = favorites.filter(id => id !== tool.id);
        newFavoriteStatus = false;
      } else {
        favorites.push(tool.id);
        newFavoriteStatus = true;
      }
      localStorage.setItem('seogrowthers_favorite_tools', JSON.stringify(favorites));
      setIsFavorite(newFavoriteStatus);
      if (onFavoriteToggle) {
        onFavoriteToggle(tool.id, newFavoriteStatus);
      }
    } catch (err) {
      console.error('Error al guardar favoritos:', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`group bg-slate-900/40 rounded-xl overflow-hidden border border-slate-800 transition-all duration-300 flex flex-col h-full ${styleConfig.glowClass}`}
    >
      {/* Image 4:3 */}
      <a 
        href={tool.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative w-full aspect-[4/3] overflow-hidden bg-slate-800 block cursor-pointer group-hover:opacity-90 transition-opacity"
      >
        <img 
          src={tool.image || 'https://via.placeholder.com/600x450'} 
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${styleConfig.badge}`}>
            {tool.category}
          </span>
        </div>

        {/* Favorite Star Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 hover:border-yellow-500/50 hover:bg-slate-800 transition-all group/star z-20"
          aria-label="Agregar a favoritos"
        >
          <Star 
            size={16} 
            className={`transition-all duration-300 ${
              isFavorite 
                ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' 
                : 'text-slate-400 group-hover/star:text-yellow-400 scale-100 group-hover/star:scale-110'
            }`} 
          />
        </button>
      </a>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-2">
          <a 
            href={tool.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline cursor-pointer flex-grow"
          >
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {tool.name}
            </h3>
          </a>
          {tool.logo && (
             <img src={tool.logo} alt="" className="w-8 h-8 rounded object-contain bg-white/10 p-1.5 transition-transform group-hover:scale-110 shrink-0" />
          )}
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {tool.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
             <Star size={12} className="text-yellow-500 fill-yellow-500" />
             <span className="text-gray-300 font-medium">{tool.rating}</span>
             <span className="text-gray-600">({tool.reviews_count || 12})</span>
          </div>
          <div className="flex items-center gap-1">
             <Users size={12} className="text-cyan-500" />
             <span>{tool.users_count?.toLocaleString() || '1,500+'} usuarios</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
           <span className="text-sm font-semibold text-white px-2.5 py-1 bg-slate-800 rounded">
             {tool.pricing || 'Freemium'}
           </span>
           <span className="text-xs text-gray-600 flex items-center gap-1">
             <Calendar size={10} />
             {tool.created_at ? format(new Date(tool.created_at), 'd MMM yyyy', { locale: es }) : '2026'}
           </span>
        </div>

        <div className="mt-5">
          <a 
            href={tool.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full"
          >
            <Button 
              className="w-full bg-slate-800 hover:bg-cyan-600 hover:text-black text-white border border-slate-700 hover:border-transparent transition-all duration-300 gap-2 group/btn font-semibold"
            >
              Acceder
              <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;

