
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
import NovelEditor from '@/components/shared/NovelEditor';
import ImageUpload from '@/components/admin/ImageUpload';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditMode = !!id;
    const forumMode = location.state?.from === '/forum';
    const initialCategory = location.state?.category || '';
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: initialCategory,
        featured_image: '',
        meta_title: '',
        meta_description: ''
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
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                if (profile) setUserRole(profile.role);
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
        const fetchExistingPost = async () => {
            if (!id) return;
            try {
                const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
                if (error) throw error;
                if (data) {
                    setFormData({
                        title: data.title || '',
                        content: data.content_html || data.content || '',
                        excerpt: data.summary || '',
                        category: data.category || '',
                        featured_image: data.featured_image || '',
                        meta_title: data.meta_title || '',
                        meta_description: data.meta_description || ''
                    });
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                toast({ title: 'Error', description: 'No se pudo cargar la publicación', variant: 'destructive' });
            }
        };

        checkUser();
        fetchCategories();
        fetchExistingPost();
    }, [navigate, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (html) => {
        setFormData(prev => ({ ...prev, content: html }));
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
        // Only generate slug if it's new. For existing, we can keep the old one or generate a new one. Let's keep existing unchanged or update it minimally.
        const slug = generateSlug(formData.title);

        try {
            let error;
            const articleData = {
                title: formData.title,
                slug: slug,
                content_html: formData.content,
                summary: formData.excerpt || formData.content.substring(0, 150) + '...',
                category: formData.category || 'Comunidad',
                featured_image: formData.featured_image,
                meta_title: formData.meta_title,
                meta_description: formData.meta_description,
                updated_at: new Date().toISOString()
            };

            if (isEditMode) {
                const { error: updateError } = await supabase
                    .from('articles')
                    .update(articleData)
                    .eq('id', id);
                error = updateError;
            } else {
                articleData.author_id = user.id;
                articleData.status = 'published';
                articleData.created_at = new Date().toISOString();
                
                const { error: insertError } = await supabase
                    .from('articles')
                    .insert([articleData]);
                error = insertError;
            }

            if (error) throw error;

            toast({
                title: isEditMode ? "¡Actualizado con éxito! 🎉" : "¡Publicado con éxito! 🎉",
                description: isEditMode ? "Los cambios han sido guardados." : (forumMode ? "Tu debate ya está disponible en el foro." : "Tu post ya está disponible en el blog."),
            });
            navigate(forumMode ? '/forum' : '/blog');
        } catch (error) {
            console.error('Error saving post:', error);
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
                                {isEditMode ? 'Editar' : (forumMode ? 'Iniciar' : 'Crear')} <span className="text-cyan-400">{forumMode ? 'Debate' : 'Publicación'}</span>
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
                                {isEditMode ? 'Actualizar' : 'Publicar'}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Sidebar Izquierda - Opciones */}
                        <div className={`space-y-6 ${preview ? 'hidden' : 'block'}`}>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6 sticky top-24">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Layout size={16} /> Panel de Opciones
                                </h3>
                                
                                <div className="space-y-4 pt-2 border-t border-slate-800">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                            <ImageIcon size={12} /> Imagen Destacada
                                        </label>
                                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm">
                                            <ImageUpload 
                                                value={formData.featured_image || ''}
                                                onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                                                bucket="article-images"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                            <Tag size={12} /> Título SEO (Opcional)
                                        </label>
                                        <Input 
                                            name="meta_title"
                                            value={formData.meta_title}
                                            onChange={handleChange}
                                            placeholder="Título para buscadores"
                                            className="bg-slate-950 border-slate-800 focus:border-cyan-500/50 text-white text-xs"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                            <PenSquare size={12} /> Descripción SEO
                                        </label>
                                        <Textarea 
                                            name="meta_description"
                                            value={formData.meta_description}
                                            onChange={handleChange}
                                            placeholder="Breve resumen del artículo para Google..."
                                            className="bg-slate-950 border-slate-800 focus:border-cyan-500/50 text-white min-h-[100px] text-xs resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                            <Tag size={12} /> Categoría
                                        </label>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        { id: 'Debates', icon: '💬' },
                                                        { id: 'Preguntas', icon: '❓' },
                                                        { id: 'Showcase', icon: '🚀' }
                                                    ].map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                                                            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-2 ${
                                                                formData.category === cat.id
                                                                ? 'bg-cyan-500 border-cyan-400 text-[#0C0D0D]'
                                                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                                                            }`}
                                                        >
                                                            <span>{cat.icon}</span>
                                                            {cat.id}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            {(userRole === 'admin' || userRole === 'owner') && categories.length > 0 && (
                                                <div className="pt-2 border-t border-slate-800/50">
                                                    <p className="text-[10px] text-cyan-400/60 uppercase tracking-tighter mb-2">Categorías de Blog</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {categories.map((cat) => (
                                                            <button
                                                                key={cat.id}
                                                                type="button"
                                                                onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))}
                                                                className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-2 ${
                                                                    formData.category === cat.name
                                                                    ? 'bg-cyan-500 border-cyan-400 text-[#0C0D0D]'
                                                                    : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400/80 hover:bg-cyan-500/10'
                                                                }`}
                                                            >
                                                                <span>📄</span>
                                                                {cat.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Editor Section */}
                        <div className={`lg:col-span-2 space-y-8 ${preview ? 'hidden' : 'block'}`}>
                            <div className="space-y-4">
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

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <PenSquare size={14} className="text-cyan-400" /> Contenido del artículo
                                </label>
                                <div className="min-h-[500px]">
                                    <NovelEditor 
                                        content={formData.content} 
                                        onChange={handleEditorChange} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className={`lg:col-span-3 bg-slate-900/30 rounded-2xl border border-slate-800 p-8 ${!preview ? 'hidden' : 'block'}`}>
                            <div className="prose prose-invert max-w-none">
                                <h1 className="text-4xl font-bold text-white mb-6">{formData.title || 'Tu Título Aquí'}</h1>
                                {formData.featured_image && (
                                    <img src={formData.featured_image} alt="Preview" className="w-full h-64 object-cover rounded-xl mb-8 border border-slate-800" />
                                )}
                                <div dangerouslySetInnerHTML={{ __html: formData.content || '<em>No hay contenido para previsualizar todavía...</em>' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePostPage;
