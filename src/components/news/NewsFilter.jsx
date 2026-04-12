
import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  'TODO',
  'GROWTH HACKING',
  'SAAS',
  'A/B TESTING',
  'TENDENCIAS',
  'ACTUALIZACIONES'
];

const NewsFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 text-gray-400 shrink-0">
        <SlidersHorizontal size={18} />
        <span className="text-sm font-medium hidden md:inline">Filtrar:</span>
      </div>
      
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
              isActive 
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                : "bg-transparent border-transparent text-gray-500 hover:text-white hover:bg-slate-900"
            )}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
};

export default NewsFilter;
