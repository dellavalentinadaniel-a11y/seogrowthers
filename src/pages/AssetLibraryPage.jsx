import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { assetCategories, assetItems, lucideUiIconsList } from '@/data/assetsLibraryData';
import {
  Search,
  Copy,
  Check,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
  Image as ImageIcon,
  Video,
  FileCode2,
  Filter,
  Eye,
  X,
  Share2,
  FolderOpen,
  Code2,
  Cpu,
  Database,
  Layout,
  Smartphone,
  Monitor,
  Server,
  Zap,
  Target,
  Megaphone,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  PhoneCall,
  Bot,
  Brain,
  Wand2,
  Terminal,
  Activity,
  ShoppingCart,
  Store,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const lucideIconComponents = {
  Search,
  Target,
  Megaphone,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  PhoneCall,
  Code2,
  Cpu,
  Database,
  Layout,
  Smartphone,
  Monitor,
  Server,
  Zap,
  Bot,
  Sparkles,
  Brain,
  Wand2,
  Terminal,
  Activity,
  ShoppingCart,
  Store,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Copy
};

export default function AssetLibraryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPreviewItem, setSelectedPreviewItem] = useState(null);

  // Copy helper
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Filter assets
  const filteredItems = useMemo(() => {
    return assetItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.format.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Filter Lucide UI icons
  const filteredUiIcons = useMemo(() => {
    if (activeCategory !== "all" && activeCategory !== "ui-icons") return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return lucideUiIconsList;
    return lucideUiIconsList.filter(
      (icon) => icon.name.toLowerCase().includes(q) || icon.category.toLowerCase().includes(q)
    );
  }, [activeCategory, searchQuery]);

  return (
    <div className="text-on-surface font-body text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Biblioteca de Assets, Logos & Iconos | SEO Growthers</title>
        <meta
          name="description"
          content="Biblioteca centralizada de recursos visuales, iconos 3D, logotipos SVG, fotografías de marca y componentes de diseño de SEO Growthers."
        />
        <link rel="canonical" href="https://seogrowthers.com/resources/asset-library" />
      </Helmet>

      <main className="pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden">
        <Breadcrumbs className="mb-6" />

        {/* HERO SECTION */}
        <section className="mb-14 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DESIGN SYSTEM & MEDIA HUB</span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              Biblioteca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-[#2ECC71]">Assets & Iconos</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Catálogo visual completo de recursos multimedia, renders 3D, logotipos de marca, iconos de interfaz y videos listos para usar en tus proyectos.
            </p>
          </motion.div>
        </section>

        {/* SEARCH & FILTERS BAR */}
        <section className="mb-12">
          <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar iconos, logos, renders o tags (ej: 3d, google, seo)..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-light"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Asset counter badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-end md:self-auto">
                <FolderOpen className="w-4 h-4 text-cyan-400" />
                <span>
                  Mostrando <strong className="text-white font-bold">{filteredItems.length + filteredUiIcons.length}</strong> recursos
                </span>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {assetCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,219,231,0.3)]"
                        : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5"
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ASSETS GRID */}
        <section className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isCopied = copiedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    {/* Media Preview Box */}
                    <div
                      onClick={() => setSelectedPreviewItem(item)}
                      className="relative w-full h-44 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center overflow-hidden mb-4 cursor-pointer group-hover:border-cyan-400/20"
                    >
                      {item.type === "video" ? (
                        <div className="relative w-full h-full">
                          <video
                            src={item.path}
                            muted
                            loop
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-6 h-6 text-white drop-shadow" />
                          </div>
                        </div>
                      ) : item.type === "svg-component" ? (
                        <div className="p-6 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <div dangerouslySetInnerHTML={{ __html: item.codeSnippet }} />
                        </div>
                      ) : (
                        <div className="relative w-full h-full p-2 flex items-center justify-center">
                          <img
                            src={item.path}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                            <Eye className="w-6 h-6 text-white drop-shadow" />
                          </div>
                        </div>
                      )}

                      {/* Format Badge */}
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-white/15 text-[9px] font-mono font-bold text-cyan-400 uppercase">
                        {item.format}
                      </span>
                    </div>

                    {/* Asset Info */}
                    <h3 className="font-headline text-sm font-bold text-white mb-2 line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.codeSnippet || item.path, item.id)}
                      className={`flex-1 py-2 px-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        isCopied
                          ? "bg-[#2ECC71] text-slate-950"
                          : "bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-400/30"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>

                    {item.path && (
                      <a
                        href={item.path}
                        download
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Descargar recurso"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* LUCIDE UI ICONS SECTION */}
        {(activeCategory === "all" || activeCategory === "ui-icons") && filteredUiIcons.length > 0 && (
          <section className="mb-28">
            <div className="p-6 sm:p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 to-[#070E1E]/95 border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                    SISTEMA DE ICONOGRAFÍA VECTORIAL
                  </span>
                  <h2 className="font-headline text-2xl sm:text-3xl font-black text-white">
                    Iconos Lucide React
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {filteredUiIcons.length} iconos listos para JSX
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredUiIcons.map((icon, idx) => {
                  const IconComp = lucideIconComponents[icon.name] || Sparkles;
                  const isCopied = copiedId === `lucide-${icon.name}`;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCopy(`<${icon.name} className="w-5 h-5 text-cyan-400" />`, `lucide-${icon.name}`)}
                      className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col items-center justify-between group cursor-pointer ${
                        isCopied
                          ? "bg-[#2ECC71]/20 border-[#2ECC71] shadow-[0_0_15px_rgba(46,204,113,0.3)]"
                          : "bg-slate-950/60 hover:bg-white/[0.08] border-white/10 hover:border-cyan-400/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <IconComp className={`w-5 h-5 ${isCopied ? "text-[#2ECC71]" : "text-cyan-400"}`} />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-200 text-center truncate w-full mb-1">
                        {icon.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">
                        {isCopied ? "✓ Copiado" : "Click p/ copiar"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* MODAL FULLSCREEN PREVIEW */}
        <AnimatePresence>
          {selectedPreviewItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-3xl w-full rounded-3xl bg-slate-900 border border-white/20 p-6 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-400 text-[10px] font-mono font-bold">
                      {selectedPreviewItem.format}
                    </span>
                    <h3 className="font-headline text-lg font-bold text-white">
                      {selectedPreviewItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPreviewItem(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Preview Image / Video */}
                <div className="w-full h-80 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden mb-6 p-4">
                  {selectedPreviewItem.type === "video" ? (
                    <video
                      src={selectedPreviewItem.path}
                      controls
                      autoPlay
                      className="max-h-full max-w-full rounded-xl"
                    />
                  ) : selectedPreviewItem.type === "svg-component" ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedPreviewItem.codeSnippet }} className="scale-150" />
                  ) : (
                    <img
                      src={selectedPreviewItem.path}
                      alt={selectedPreviewItem.title}
                      className="max-h-full max-w-full object-contain rounded-xl"
                    />
                  )}
                </div>

                {/* Code Snippet Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Código de integración</span>
                    <button
                      onClick={() => handleCopy(selectedPreviewItem.codeSnippet || selectedPreviewItem.path, "modal-copy")}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedId === "modal-copy" ? "¡Copiado!" : "Copiar"}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300 overflow-x-auto">
                    {selectedPreviewItem.codeSnippet || selectedPreviewItem.path}
                  </pre>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
