import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RecentArticlesCarousel from '@/components/shared/RecentArticlesCarousel';
import ToolCard from '@/components/tools/ToolCard';
import { toolsData } from '@/data/toolsData';
import { Search, Star, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('seogrowthers_favorite_tools');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al cargar favoritos:', e);
      return [];
    }
  });

  const searchInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Atajo de teclado: presionar '/' enfoca el buscador si no se está escribiendo en él
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFavoriteToggle = (toolId, isFav) => {
    if (isFav) {
      setFavorites(prev => [...prev, toolId]);
    } else {
      setFavorites(prev => prev.filter(id => id !== toolId));
    }
  };

  // Categorías fijas del catálogo
  const categories = [
    'Todos',
    'Favoritos',
    'Herramientas de diseño',
    'Herramientas de desarrollo',
    'Herramientas de productividad',
    'Herramientas de SEO y marketing',
    'Herramientas de testing'
  ];

  // Filtrado de herramientas en tiempo real
  const filteredTools = toolsData.filter(tool => {
    // Filtro por Categorías
    if (selectedCategory === 'Favoritos') {
      if (!favorites.includes(tool.id)) return false;
    } else if (selectedCategory !== 'Todos') {
      if (tool.category !== selectedCategory) return false;
    }

    // Filtro por Buscador
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const nameMatch = tool.name?.toLowerCase().includes(term);
      const descMatch = tool.description?.toLowerCase().includes(term);
      const featuresMatch = tool.features?.some(f => f?.toLowerCase().includes(term));
      return nameMatch || descMatch || featuresMatch;
    }

    return true;
  });

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Herramientas Premium para Crecimiento Digital | SEO Growthers</title>
        <meta name="description" content="Descubre las mejores herramientas de SEO, analytics, marketing digital y desarrollo web recomendadas por SEO Growthers. Compara y elige la ideal para tu negocio." />
        <link rel="canonical" href="https://seogrowthers.com/tools" />
        <meta property="og:title" content="Herramientas Premium | SEO Growthers" />
        <meta property="og:description" content="Las mejores herramientas de SEO, analytics, marketing y desarrollo web curadas por expertos." />
        <meta property="og:url" content="https://seogrowthers.com/tools" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Herramientas&subtitle=Las+mejores+herramientas+de+SEO&type=tool" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />

      {/* Main Canvas */}
      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
        <Breadcrumbs className="mb-4" />
        
        {/* Recent Articles Hero Carousel */}
        <div className="mb-16">
          <RecentArticlesCarousel title="Destacados del Blog" subtitle="EXPLORA LO ÚLTIMO" />
        </div>

        {/* Hero/Section Title */}
        <div className="mb-16">
          <span className="font-label text-primary tracking-[0.2em] text-xs uppercase mb-4 block">Laboratorio de Arquitectura</span>
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tight mb-6">
            Herramientas de <span className="bg-gradient-to-r from-primary-container to-secondary-container bg-clip-text text-transparent">Nueva Generación</span>
          </h2>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
            Accede a utilidades de alto rendimiento diseñadas para el flujo de trabajo del ingeniero de 2026. Analizadores neuronales, simulación de nodos y terminales de baja latencia.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-none md:grid-rows-2 gap-6">

          {/* Feature Card: Terminal (Large) */}
          <div className="md:col-span-4 md:row-span-2 glass-panel rounded-[2rem] p-8 flex flex-col border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-container/20 rounded-xl">
                  <span className="material-symbols-outlined text-primary-container text-3xl">terminal</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold text-white">Terminal Interactiva</h3>
                  <p className="text-slate-400 text-sm">Vibe Coding Node v4.2.0</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              </div>
            </div>

            <div className="flex-grow bg-surface-container-lowest rounded-xl p-6 font-mono text-sm border border-outline-variant/30 relative z-10 flex flex-col">
              <div className="flex gap-2 mb-2">
                <span className="text-secondary">engine@neural:~$</span>
                <span className="text-primary-fixed">initiating neural_sync...</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="text-secondary">engine@neural:~$</span>
                <span className="text-on-surface">analyzing branch: evolution/2026</span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="text-secondary">engine@neural:~$</span>
                <span className="text-primary-container">system status: OPTIMAL</span>
              </div>

              <div className="h-[200px] w-full mt-auto flex items-end gap-1">
                <div className="w-full bg-primary-container/20 h-[30%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/40 h-[45%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/30 h-[25%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/60 h-[70%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/50 h-[55%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/80 h-[90%] rounded-t-sm animate-pulse"></div>
                <div className="w-full bg-primary-container/40 h-[40%] rounded-t-sm"></div>
              </div>
              <div className="mt-4 animate-pulse inline-block w-2 h-4 bg-primary-container"></div>
            </div>

            <button className="mt-6 self-start px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:scale-105 transition-transform flex items-center gap-2 relative z-10">
              <span>Abrir Sesión</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>

          {/* Feature Card: Code Analyzer (Tall) */}
          <div className="md:col-span-2 glass-panel rounded-[2rem] p-6 border border-white/5 border-t-2 border-t-secondary-container flex flex-col group">
            <div className="mb-6">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4 block group-hover:rotate-12 transition-transform">analytics</span>
              <h3 className="font-headline text-xl font-bold text-white mb-2">Analizador de Código</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Escaneo heurístico profundo con IA para detectar patrones de arquitectura evolutiva.
              </p>
            </div>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between text-xs font-label text-slate-500">
                <span>CALIDAD DE SINTAXIS</span>
                <span className="text-secondary">98%</span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-secondary"></div>
              </div>
              <button className="w-full py-3 border border-secondary/20 text-secondary rounded-xl hover:bg-secondary/10 transition-colors font-bold text-xs uppercase tracking-widest">
                Ejecutar Diagnóstico
              </button>
            </div>
          </div>

          {/* Feature Card: Node Simulator (Small) */}
          <div className="md:col-span-2 glass-panel rounded-[2rem] p-6 border border-white/5 border-t-2 border-t-primary-container flex flex-col group">
            <div className="flex items-start justify-between mb-4">
              <span className="material-symbols-outlined text-primary-container text-4xl group-hover:scale-110 transition-transform">hub</span>
              <span className="text-[10px] font-label px-2 py-1 bg-primary-container/20 text-primary-container rounded">PRO</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-white mb-2">Simulador de Nodos</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Pruebas de latencia en redes distribuidas.
            </p>
            <div className="flex -space-x-2 mt-auto">
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-800 flex items-center justify-center text-[10px] text-white">N1</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-700 flex items-center justify-center text-[10px] text-white">N2</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-600 flex items-center justify-center text-[10px] text-white">N3</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary-container/20 flex items-center justify-center text-[10px] text-primary-container">+5</div>
            </div>
          </div>
        </div>

        {/* Secondary Grid: Quick Tools */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-primary-container mb-4">auto_fix_high</span>
            <h4 className="font-headline text-white font-bold mb-1">Refactorizador</h4>
            <p className="text-xs text-slate-500">Optimización instantánea de algoritmos.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-secondary/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-secondary mb-4">security</span>
            <h4 className="font-headline text-white font-bold mb-1">Vault Auditor</h4>
            <p className="text-xs text-slate-500">Seguridad criptográfica integrada.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-tertiary-container/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-tertiary mb-4">database</span>
            <h4 className="font-headline text-white font-bold mb-1">Schema Mapper</h4>
            <p className="text-xs text-slate-500">Visualización de grafos de datos.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-primary mb-4">cloud_sync</span>
            <h4 className="font-headline text-white font-bold mb-1">Neural Bridge</h4>
            <p className="text-xs text-slate-500">Sincronización multi-cluster.</p>
          </div>
        </div>

        {/* Separador elegante de neón */}
        <div className="my-20 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

        {/* Sección del Catálogo Completo */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6" id="catalogo-herramientas">
          <div>
            <h3 className="font-headline text-3xl font-bold text-white mb-2 flex items-center gap-2.5">
              <Sparkles size={24} className="text-cyan-400 animate-pulse" />
              Catálogo de Herramientas Premium
            </h3>
            <p className="text-gray-400 text-sm max-w-xl">
              Explora nuestra selección curada de utilidades profesionales. Filtra por categoría, busca palabras clave o guarda tus favoritas ⭐.
            </p>
          </div>

          {/* Buscador Interactivo */}
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
              <Search size={18} />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar herramienta... (pulsa '/' para enfocar)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-12 py-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 font-body text-sm"
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-gray-400">
                  /
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="mb-10 flex flex-wrap items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-1">
            <SlidersHorizontal size={12} className="text-gray-400" />
            <span>Filtros:</span>
          </div>

          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const isFav = category === 'Favoritos';
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 border shrink-0 ${
                  isSelected
                    ? isFav
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40 shadow-[0_0_15px_rgba(250,204,21,0.1)]'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-900/40 text-gray-400 border-slate-800/80 hover:bg-slate-850 hover:text-white hover:border-slate-700'
                }`}
              >
                {isFav && (
                  <Star
                    size={13}
                    className={isSelected ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}
                  />
                )}
                <span>{category}</span>
                {isFav && favorites.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-yellow-500/30 text-yellow-300 font-bold rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Catálogo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                layout
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ToolCard tool={tool} onFavoriteToggle={handleFavoriteToggle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Sin resultados */}
        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-slate-900/10 backdrop-blur-md rounded-2xl border border-slate-800/50 max-w-lg mx-auto flex flex-col items-center justify-center p-8 mt-6"
          >
            <div className="w-14 h-14 rounded-full bg-slate-950/40 border border-slate-800 flex items-center justify-center mb-5">
              {selectedCategory === 'Favoritos' ? (
                <Star className="text-yellow-500 w-6 h-6 fill-yellow-500/10" />
              ) : (
                <Search className="text-gray-500 w-6 h-6" />
              )}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              {selectedCategory === 'Favoritos'
                ? 'No tienes herramientas favoritas'
                : 'No se encontraron resultados'}
            </h4>
            <p className="text-gray-400 text-xs max-w-sm leading-relaxed mb-6">
              {selectedCategory === 'Favoritos'
                ? 'Marca tus herramientas preferidas pulsando la estrella ⭐ en las tarjetas para poder verlas rápidamente aquí.'
                : 'Prueba a cambiar tus palabras clave o utiliza una categoría de filtro distinta.'}
            </p>
            {selectedCategory === 'Favoritos' ? (
              <button
                onClick={() => setSelectedCategory('Todos')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Ver todo el catálogo
              </button>
            ) : (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Restablecer filtros
              </button>
            )}
          </motion.div>
        )}
      </main>

      {/* Side Decorative Elements */}
      <div className="fixed top-[20%] -right-20 w-80 h-80 bg-secondary-container/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[10%] -left-20 w-64 h-64 bg-primary-container/5 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default ToolsPage;

