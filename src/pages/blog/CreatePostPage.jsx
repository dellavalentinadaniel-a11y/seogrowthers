
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { 
  PenSquare, Image as ImageIcon, Tag, Send, ArrowLeft, 
  Eye, Layout, Loader2, Sparkles, AlertCircle 
} from 'lucide-react';
import SEOHead from '@/components/shared/SEOHead';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const forumMode = location.state?.from === '/forum';
    const initialCategory = location.state?.category || '';
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: initialCategory,
        featured_image: '',
    });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast({
                    title: "Acceso restringido",
                    description: "Debes iniciar sesión para crear una publicación.",
                    variant: "destructive"
                });
                navigate('/login');
            } else {
                setUser(user);
            }
        };

        const fetchCategories = async () => {
            const { data } = await supabase
                .from('blog_categories')
                .select('*')
                .eq('type', 'article');
            setCategories(data || []);
            if (data && data.length > 0 && !initialCategory) {
                setFormData(prev => ({ ...prev, category: data[0].name }));
            }
        };

        checkUser();
        fetchCategories();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' + Math.random().toString(36).substring(2, 7);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            toast({
                title: "Campos incompletos",
                description: "Por favor completa el título y el contenido.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        const slug = generateSlug(formData.title);

        try {
            const { error } = await supabase
                .from('articles')
                .insert([{
                    title: formData.title,
                    slug: slug,
                    content_html: formData.content, // We store raw markdown/text here for simplicity as the renderer handles it
                    summary: formData.excerpt || formData.content.substring(0, 150) + '...',
                    category: formData.category || 'Comunidad',
                    author_id: user.id,
                    status: 'published', // User posts are public by default in forum
                    created_at: new Date().toISOString(),
                }]);

            if (error) throw error;

            toast({
                title: "¡Publicado con éxito! 🎉",
                description: forumMode ? "Tu debate ya está disponible en el foro." : "Tu post ya está disponible en el blog.",
            });
            navigate(forumMode ? '/forum' : '/blog');
        } catch (error) {
            console.error('Error creating post:', error);
            toast({
                title: "Error al publicar",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEOHead 
                title="Crear Nueva Publicación - Community Blog"
                description="Comparte tus conocimientos e ideas con la comunidad de SEO Growthers."
            />
            
            <div className="bg-[#0C0D0D] min-h-screen pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <button 
                        onClick={() => navigate(forumMode ? '/forum' : '/blog')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al {forumMode ? 'Foro' : 'Blog'}
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                {forumMode ? 'Iniciar' : 'Crear'} <span className="text-cyan-400">{forumMode ? 'Debate' : 'Publicación'}</span>
                            </h1>
                            <p className="text-gray-400">Comparte tu experiencia con los demás miembros.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button 
                                variant="outline" 
                                onClick={() => setPreview(!preview)}
                                className="border-slate-800 text-gray-300 hover:bg-slate-800"
                            >
                                {preview ? <Layout size={18} className="mr-2"/> : <Eye size={18} className="mr-2"/>}
                                {preview ? 'Editar' : 'Vista Previa'}
                            </Button>
                            <Button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-cyan-500 hover:bg-cyan-600 text-[#0C0D0D] font-bold px-8 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                            >
                                {loading ? <Loader2 size={18} className="mr-2 animate-spin"/> : <Send size={18} className="mr-2"/>}
                                Publicar
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Editor Section */}
                        <div className={`lg:col-span-2 space-y-8 ${preview ? 'hidden' : 'block'}`}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Sparkles size={14} className="text-cyan-400" /> Título de la publicación
                                </label>
                                <Input 
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ej: Cómo optimizar el Core Web Vitals en 2026"
                                    className="bg-slate-900/50 border-slate-800 text-white text-xl py-6 focus:border-cyan-500/50 transition-all shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <PenSquare size={14} className="text-cyan-400" /> Contenido (Soporta Markdown)
                                </label>
                                <Textarea 
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Escribe aquí tu artículo... Puedes usar # para títulos, * para negritas, etc."
                                    className="bg-slate-900/50 border-slate-800 text-white min-h-[400px] py-4 focus:border-cyan-500/50 transition-all resize-none shadow-inner leading-relaxed"
                                />
                                <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-2">
                                    <AlertCircle size={10} /> Sugerencia: Usa Markdown para una mejor presentación.
                                </p>
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className={`lg:col-span-2 bg-slate-900/30 rounded-2xl border border-slate-800 p-8 ${!preview ? 'hidden' : 'block'}`}>
                            <div className="prose prose-invert max-w-none">
                                <h1 className="text-4xl font-bold text-white mb-6">{formData.title || 'Tu Título Aquí'}</h1>
                                {formData.featured_image && (
                                    <img src={formData.featured_image} alt="Preview" className="w-full h-64 object-cover rounded-xl mb-8 border border-slate-800" />
                                )}
                                <MarkdownRenderer content={formData.content || '_No hay contenido para previsualizar todavía..._'} />
                            </div>
                        </div>

                        {/* Sidebar Options */}
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    Configuración
                                </h3>
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <Tag size={12} /> Categoría
                                    </label>
                                    <select 
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 text-sm focus:ring-1 focus:ring-cyan-500 outline-none"
                                    >
                                        <option value="Comunidad">Comunidad</option>
                                        <option value="Debates">Debates</option>
                                        <option value="Preguntas">Preguntas</option>
                                        <option value="Showcase">Showcase</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-cyan-500/5 p-6 rounded-2xl border border-cyan-500/10">
                                <h4 className="text-cyan-400 font-bold text-sm mb-2 flex items-center gap-2">
                                    <AlertCircle size={16} /> Guía de Publicación
                                </h4>
                                <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                                    <li>Sé respetuoso con los demás miembros.</li>
                                    <li>Evita el spam o contenido irrelevante.</li>
                                    <li>Usa imágenes de alta calidad (Unsplash recomendado).</li>
                                    <li>Comprueba la ortografía antes de publicar.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePostPage;
