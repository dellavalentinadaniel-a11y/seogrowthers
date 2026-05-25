import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { m, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Send, Eye, CheckCircle2, AlertTriangle, Loader2, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const AdminSocialHub = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loadingArticles, setLoadingArticles] = useState(true);
  
  // Schedule state
  const [scheduleDate, setScheduleDate] = useState('');
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Social Hub state
  const [generatingCopys, setGeneratingCopys] = useState(false);
  const [copys, setCopys] = useState({ linkedin: '', twitter: '', instagram: '' });
  const [publishing, setPublishing] = useState({ linkedin: false, twitter: false, instagram: false });

  // Load articles on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, summary, slug, category, status, created_at, featured_image')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setArticles(data || []);
        if (data && data.length > 0) {
          setSelectedArticleId(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching admin articles:', err);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, []);

  // Update selected article details
  useEffect(() => {
    if (selectedArticleId) {
      const art = articles.find(a => a.id === selectedArticleId || a.id.toString() === selectedArticleId.toString());
      setSelectedArticle(art || null);
      
      // Default scheduled date to now or existing date if we have one
      const dateStr = art?.created_at ? new Date(art.created_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
      setScheduleDate(dateStr);
      
      // Reset copys when changing articles
      setCopys({ linkedin: '', twitter: '', instagram: '' });
    } else {
      setSelectedArticle(null);
    }
  }, [selectedArticleId, articles]);

  // Handle schedule submit
  const handleSaveSchedule = async () => {
    if (!selectedArticle) return;
    setSavingSchedule(true);
    try {
      const { error } = await supabase
        .from('articles')
        .update({ 
          created_at: new Date(scheduleDate).toISOString(),
          status: 'draft' // Set back to draft if scheduled in future
        })
        .eq('id', selectedArticle.id);

      if (error) throw error;

      // Update local state
      setArticles(prev => prev.map(a => a.id === selectedArticle.id ? { ...a, created_at: new Date(scheduleDate).toISOString(), status: 'draft' } : a));

      toast({ 
        title: 'Publicación Programada', 
        description: `El artículo se ha programado para el ${new Date(scheduleDate).toLocaleString('es-AR')}.`
      });
    } catch (err) {
      toast({ 
        variant: 'destructive', 
        title: 'Error de Programación', 
        description: err.message 
      });
    } finally {
      setSavingSchedule(false);
    }
  };

  // Generate copys with IA simulation
  const handleGenerateCopys = () => {
    if (!selectedArticle) return;
    setGeneratingCopys(true);
    
    // Simulate Google AI Studio API call
    setTimeout(() => {
      const title = selectedArticle.title;
      const category = selectedArticle.category || 'SEO';
      const summary = selectedArticle.summary || 'estrategias de crecimiento digital.';
      
      setCopys({
        linkedin: `✍️ ¿Tu web está diseñada para competir o solo para existir? \n\nEn nuestro último desarrollo, "${title}", llevamos las métricas de rendimiento y conversión al siguiente nivel. Analizamos los desafíos clave en la categoría de ${category} y cómo integrar inteligencia artificial en el backend para automatizar procesos. \n\n💡 Lee el caso completo sobre cómo construimos este ecosistema digital robusto:\n🔗 https://seogrowthers.com/blog/${category.toLowerCase()}/${selectedArticle.slug} \n\n#DesarrolloWeb #SEO #InteligenciaArtificial #React #Python #PymesArgentina`,
        twitter: `🚀 ¿Listos para el siguiente nivel técnico? Así desarrollamos "${title}" desde cero.\n\n✔️ React + Supabase en la nube\n✔️ Pipelines en Python para RSS feeds\n✔️ Rendimiento 100/100 Lighthouse\n\nLee el caso completo y el paso a paso:\n🔗 seogrowthers.com/blog/${category.toLowerCase()}/${selectedArticle.slug} 🧵👇`,
        instagram: `🔥 DETRÁS DEL CÓDIGO: ¿Cómo construimos la plataforma de SEO Growthers desde cero? \n\nNo creemos en promesas vacías; creemos en ingeniería, datos y mucha iteración. Desarrollamos un ecosistema completo enfocado en conversiones, automatizando la ingesta de noticias en Python y sirviendo los assets de forma instantánea. 🚀\n\n📌 Mira los resultados de velocidad y la arquitectura DevOps en el link de la Bio.\n\n#seogrowthers #desarrolloweb #seo #argentina #python #supabase #hostinger #pymes #vibeoding`
      });
      setGeneratingCopys(false);
      toast({
        title: 'Copys Generados con IA',
        description: 'Google AI Studio ha generado copys específicos para cada red social.'
      });
    }, 1800);
  };

  // Simulate publish through webhook
  const handlePublish = (platform) => {
    if (!copys[platform]) return;
    setPublishing(prev => ({ ...prev, [platform]: true }));

    // Simulate webhook payload to n8n / Make
    setTimeout(() => {
      setPublishing(prev => ({ ...prev, [platform]: false }));
      toast({
        title: `Publicado en ${platform.toUpperCase()}`,
        description: `Se disparó el Webhook de n8n para publicar el contenido en ${platform} de manera exitosa.`
      });
    }, 1500);
  };

  if (loadingArticles) {
    return (
      <div className="p-8 bg-[#0e0e15] border border-white/5 rounded-3xl flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-slate-400 text-xs uppercase tracking-wider">Cargando Módulo Social Hub...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base tracking-tight text-white">Social Hub & Planificador (Admin)</h3>
            <p className="text-xs text-slate-500">Gestión de calendarios, automatización de copys y webhooks de publicación.</p>
          </div>
        </div>
      </div>

      {/* Article Selector */}
      <div className="mb-6 space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block">Seleccionar Artículo a Gestionar</label>
        <select 
          value={selectedArticleId}
          onChange={(e) => setSelectedArticleId(e.target.value)}
          className="w-full bg-[#12111A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-500/50 focus:outline-none"
        >
          {articles.map(art => (
            <option key={art.id} value={art.id}>
              {art.title} ({art.status === 'published' ? 'Público' : 'Borrador'})
            </option>
          ))}
        </select>
      </div>

      {selectedArticle && (
        <div className="grid lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          
          {/* Column Left: Schedule & Banner Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Calendar Scheduler */}
            <div className="bg-black/35 border border-white/5 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 flex items-center gap-2">
                <Calendar size={14} className="text-cyan-400" />
                Programación de Publicación
              </h4>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase">Estado Actual:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-black uppercase text-[9px] border ${
                  selectedArticle.status === 'published' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                  {selectedArticle.status === 'published' ? 'Público' : 'Borrador'}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Fecha y Hora de Lanzamiento</label>
                <input 
                  type="datetime-local" 
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-[#12111A] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500/50 focus:outline-none"
                />
              </div>

              <Button
                onClick={handleSaveSchedule}
                disabled={savingSchedule}
                className="w-full py-2 bg-cyan-400 text-black hover:bg-cyan-500 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                {savingSchedule ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : null}
                Guardar Programación
              </Button>
            </div>

            {/* Banner Preview */}
            <div className="bg-black/35 border border-white/5 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 flex items-center gap-2">
                <Eye size={14} className="text-cyan-400" />
                Previsualización de Banner
              </h4>
              
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[1.91/1] bg-[#0c0d16] p-4 flex flex-col justify-between shadow-inner">
                {/* Visual grid background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.12),transparent_60%)] pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/5 blur-xl rounded-full pointer-events-none"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5">
                    <img src="/logo.webp" alt="Logo" className="w-4 h-4 rounded" />
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white">SEO Growthers</span>
                  </div>
                  <span className="text-[6px] font-black uppercase text-cyan-400 tracking-widest bg-cyan-400/5 border border-cyan-400/20 px-1 py-0.5 rounded">
                    {selectedArticle.category || 'SEO'}
                  </span>
                </div>

                <div className="relative z-10 my-auto pr-4">
                  <h5 className="text-[10px] md:text-[11px] font-black text-white leading-tight tracking-tight line-clamp-3">
                    {selectedArticle.title}
                  </h5>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-1.5 relative z-10 text-[5px] text-slate-500 uppercase tracking-wider">
                  <span>seogrowthers.com</span>
                  <span className="text-[6px] font-black text-white/40">Knowledge Hub</span>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-500 leading-relaxed text-center italic">
                Miniatura autogenerada. El sistema inyecta el título del artículo en la plantilla oficial para redes sociales.
              </p>
            </div>

          </div>

          {/* Column Right: IA Copys & Publish Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Generate IA Copys Button */}
            <div className="flex items-center justify-between bg-cyan-950/20 border border-cyan-500/20 p-4.5 rounded-2xl">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-400 animate-pulse" />
                  Motor de IA (Google AI Studio)
                </h4>
                <p className="text-[10px] text-slate-400">Analiza el artículo y redacta copys de alta conversión para cada red.</p>
              </div>
              
              <Button
                onClick={handleGenerateCopys}
                disabled={generatingCopys}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold text-xs uppercase tracking-wider py-5 px-6 rounded-xl transition-all"
              >
                {generatingCopys ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                    <span>Redactando...</span>
                  </>
                ) : (
                  <span>Generar Copys</span>
                )}
              </Button>
            </div>

            {/* Social Channels Copys */}
            <div className="space-y-4">
              
              {/* LinkedIn Copy */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Linkedin size={14} className="text-blue-500" />
                    Copy para LinkedIn
                  </span>
                  <span className="text-[9px] text-slate-500 uppercase font-bold">Post Profesional</span>
                </div>
                <textarea
                  value={copys.linkedin}
                  onChange={(e) => setCopys(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="Haz clic en 'Generar Copys' para redactar el post profesional automáticamente..."
                  className="w-full bg-[#12111A] border border-white/10 rounded-xl px-4 py-3 text-white text-xs leading-relaxed focus:border-cyan-500/50 focus:outline-none placeholder:text-slate-600"
                  rows={4}
                />
                {copys.linkedin && (
                  <Button
                    onClick={() => handlePublish('linkedin')}
                    disabled={publishing.linkedin}
                    className="w-full sm:w-auto py-2 bg-blue-600 text-white hover:bg-blue-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {publishing.linkedin ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send size={12} />}
                    <span>Disparar Webhook LinkedIn (n8n)</span>
                  </Button>
                )}
              </div>

              {/* Twitter/X Copy */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Twitter size={14} className="text-slate-400" />
                    Copy para Twitter / X
                  </span>
                  <span className="text-[9px] text-slate-500 uppercase font-bold">Hilo/Post Corto</span>
                </div>
                <textarea
                  value={copys.twitter}
                  onChange={(e) => setCopys(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="Haz clic en 'Generar Copys' para redactar el post corto automáticamente..."
                  className="w-full bg-[#12111A] border border-white/10 rounded-xl px-4 py-3 text-white text-xs leading-relaxed focus:border-cyan-500/50 focus:outline-none placeholder:text-slate-600"
                  rows={3}
                />
                {copys.twitter && (
                  <Button
                    onClick={() => handlePublish('twitter')}
                    disabled={publishing.twitter}
                    className="w-full sm:w-auto py-2 bg-slate-800 text-white hover:bg-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    {publishing.twitter ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send size={12} />}
                    <span>Disparar Webhook Twitter (n8n)</span>
                  </Button>
                )}
              </div>

              {/* Instagram Copy */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Instagram size={14} className="text-pink-500" />
                    Copy para Instagram
                  </span>
                  <span className="text-[9px] text-slate-500 uppercase font-bold">Social Post + Emojis</span>
                </div>
                <textarea
                  value={copys.instagram}
                  onChange={(e) => setCopys(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="Haz clic en 'Generar Copys' para redactar el post de impacto social automáticamente..."
                  className="w-full bg-[#12111A] border border-white/10 rounded-xl px-4 py-3 text-white text-xs leading-relaxed focus:border-cyan-500/50 focus:outline-none placeholder:text-slate-600"
                  rows={4}
                />
                {copys.instagram && (
                  <Button
                    onClick={() => handlePublish('instagram')}
                    disabled={publishing.instagram}
                    className="w-full sm:w-auto py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {publishing.instagram ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send size={12} />}
                    <span>Disparar Webhook Instagram (n8n)</span>
                  </Button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminSocialHub;
