
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import NovelEditor from '@/components/shared/NovelEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Save, ArrowLeft, Layout, Share2, Search, CheckCircle2, XCircle, Clock, FileText, ImageOff, BarChart2, BookOpen, UploadCloud } from 'lucide-react';
import {
  generateSlug,
  validateSeoTitle,
  validateSeoDescription,
  validateImageAlt,
  calculateSeoScore,
  calculateKeywordDensity,
  calculateReadability,
  getMissingAltImages
} from '@/lib/seoHelpers';

const ArticleForm = ({ initialData, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Initialize form data with safe defaults or mapped initialData
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    seo_title: '',
    seo_description: '',
    keywords: [],
    canonical_url: '',
    featured_image_alt: '',
    published: false,
    featured_image: '',
    social_facebook: '',
    social_whatsapp: '',
    section: 'blog',
    category: '',
  });

  const [blogCategories, setBlogCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const [keywordInput, setKeywordInput] = useState('');
  const [validations, setValidations] = useState({});
  const [slugError, setSlugError] = useState('');

  useEffect(() => {
    if (initialData) {
      // Map 'articles' table schema to form state
      // 'articles' table stores HTML in content_html and metadata in content (jsonb)
      const meta = initialData.content || {}; // Metadata stored in jsonb column
      
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        content: initialData.content_html || '',
        seo_title: meta.seo_title || initialData.title || '',
        seo_description: initialData.summary || '',
        keywords: meta.keywords || [],
        canonical_url: meta.canonical_url || '',
        featured_image_alt: initialData.featured_image_alt || meta.featured_image_alt || '',
        published: initialData.status === 'published',
        featured_image: initialData.featured_image || '',
        social_facebook: initialData.social_meta?.facebook || '',
        social_whatsapp: initialData.social_meta?.whatsapp || '',
        section: initialData.section || 'blog',
        category: initialData.category || '',
      });
      
      // Run validations on loaded data
      runValidations({
        seo_title: meta.seo_title || initialData.title || '',
        seo_description: initialData.summary || '',
        content: initialData.content_html || ''
      });
    }

    const fetchCategories = async () => {
      const { data } = await supabase.from('blog_categories').select('*').in('type', ['article', 'recurso']);
      setBlogCategories(data || []);
      if (data && data.length > 0 && !initialData?.category) {
        setFormData(prev => ({ ...prev, category: data[0].name }));
      }
    };
    fetchCategories();
  }, [initialData]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsCreatingCategory(true);
    const slug = generateSlug(newCategoryName);
    const catType = formData.section === 'recursos' ? 'recurso' : 'article';
    try {
        const { error } = await supabase.from('blog_categories').insert([{
            name: newCategoryName.trim(),
            slug: slug,
            type: catType
        }]);
        if (error) throw error;
        
        const { data } = await supabase.from('blog_categories').select('*').in('type', ['article', 'recurso']);
        setBlogCategories(data || []);
        setFormData(prev => ({ ...prev, category: newCategoryName.trim() }));
        setNewCategoryName('');
        toast({ title: 'Éxito', description: 'Categoría creada correctamente.' });
    } catch (err) {
        console.error('Error creating category:', err);
        toast({ title: 'Error', description: 'No se pudo crear la categoría.', variant: 'destructive' });
    } finally {
        setIsCreatingCategory(false);
    }
  };

  const runValidations = (data) => {
    const titleVal = validateSeoTitle(data.seo_title);
    const descVal = validateSeoDescription(data.seo_description);
    const imgVal = validateImageAlt(data.content);

    setValidations({
      seoTitle: titleVal,
      seoDesc: descVal,
      images: imgVal
    });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing ? generateSlug(title) : prev.slug
    }));
  };

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    runValidations(newData);
  };

  const checkSlugUnique = async (slug) => {
    if (!slug) return;
    let query = supabase.from('articles').select('id').eq('slug', slug);
    if (isEditing && initialData?.id) query = query.neq('id', initialData.id);
    const { data } = await query.maybeSingle();
    setSlugError(data ? 'Este slug ya está en uso por otro artículo.' : '');
  };

  const handleKeywordAdd = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = keywordInput.trim();
      if (val && formData.keywords.length < 5 && !formData.keywords.includes(val)) {
        setFormData(prev => ({ ...prev, keywords: [...prev.keywords, val] }));
        setKeywordInput('');
      } else if (formData.keywords.length >= 5) {
        toast({ title: "Límite alcanzado", description: "Máximo 5 palabras clave." });
      }
    }
  };

  const removeKeyword = (kw) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== kw)
    }));
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      handleInputChange('featured_image', publicUrl);
      toast({ title: "Imagen subida", description: "La imagen destacada se ha cargado correctamente." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error al subir imagen", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { seoTitle, seoDesc } = validations;
      if (seoTitle?.isValid === false || seoDesc?.isValid === false) {
        toast({
          title: "Errores de SEO",
          description: "Por favor corrige los campos marcados antes de guardar.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      if (slugError) {
        toast({ title: "Slug duplicado", description: slugError, variant: "destructive" });
        setLoading(false);
        return;
      }

      const payload = {
        title: formData.title,
        slug: formData.slug,
        content_html: formData.content,
        summary: formData.seo_description,
        status: formData.published ? 'published' : 'draft',
        section: formData.section,
        category: formData.category,
        featured_image: formData.featured_image,
        featured_image_alt: formData.featured_image_alt,
        updated_at: new Date().toISOString(),
        content: {
          seo_title: formData.seo_title || formData.title,
          keywords: formData.keywords,
          canonical_url: formData.canonical_url,
          featured_image_alt: formData.featured_image_alt
        },
        social_meta: {
          facebook: formData.social_facebook || formData.title,
          x: formData.social_x || formData.title,
          whatsapp: formData.social_whatsapp || formData.title,
        }
      };

      if (isEditing) {
        const { error } = await supabase
          .from('articles') // Using 'articles' table (bigint id)
          .update(payload)
          .eq('id', initialData.id);
        if (error) throw error;
        toast({ title: "Artículo actualizado", description: "Los cambios se guardaron correctamente." });
      } else {
        const { error } = await supabase
          .from('articles') // Using 'articles' table
          .insert([payload]);
        if (error) throw error;
        toast({ title: "Artículo creado", description: "El nuevo artículo está listo." });
      }
      
      navigate('/admin/articles');
    } catch (error) {
      console.error(error);
      toast({ 
        title: "Error al guardar", 
        description: error.message || "Ocurrió un error inesperado.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-20 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/articles')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold text-white">
            {isEditing ? 'Editar Artículo' : 'Nuevo Artículo'}
          </h1>
        </div>
        <Button type="submit" disabled={loading} className="bg-cyan-600 hover:bg-cyan-700">
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Guardando...' : 'Guardar Artículo'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div>
              <Label className="text-white">Título del Artículo</Label>
              <Input 
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Escribe un título atractivo..."
                className="bg-slate-800 border-slate-700 text-lg font-semibold text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label className="text-white mb-2 block">Contenido</Label>
              <NovelEditor 
                content={formData.content} 
                onChange={(html) => handleInputChange('content', html)} 
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="bg-purple-500/10 p-2 rounded text-purple-400"><Layout size={20} /></div>
              Optimización SEO
            </h2>

            <div className="grid gap-6">
              <div>
                <div className="flex justify-between">
                  <Label className="text-white">Título SEO (Title Tag)</Label>
                  <span className={`text-xs ${formData.seo_title.length > 60 ? 'text-red-400' : 'text-gray-400'}`}>
                    {formData.seo_title.length}/60
                  </span>
                </div>
                <Input 
                  value={formData.seo_title}
                  onChange={(e) => handleInputChange('seo_title', e.target.value)}
                  className={`bg-slate-800 mt-1 ${
                    validations.seoTitle && !validations.seoTitle.isValid ? 'border-red-500' : 'border-slate-700'
                  } text-white`}
                  placeholder="Título optimizado para buscadores"
                />
                {validations.seoTitle?.warnings?.map((w, i) => (
                   <p key={i} className="text-xs text-yellow-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {w}</p>
                ))}
              </div>

              <div>
                <div className="flex justify-between">
                  <Label className="text-white">Meta Descripción</Label>
                  <span className={`text-xs ${formData.seo_description.length > 160 ? 'text-red-400' : 'text-gray-400'}`}>
                    {formData.seo_description.length}/160
                  </span>
                </div>
                <Textarea 
                  value={formData.seo_description}
                  onChange={(e) => handleInputChange('seo_description', e.target.value)}
                  className={`bg-slate-800 mt-1 ${
                    validations.seoDesc && !validations.seoDesc.isValid ? 'border-red-500' : 'border-slate-700'
                  } text-white h-24`}
                  placeholder="Resumen atractivo del contenido..."
                />
                {validations.seoDesc?.warnings?.map((w, i) => (
                   <p key={i} className="text-xs text-yellow-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {w}</p>
                ))}
              </div>

              <div>
                <Label className="text-white">Slug (URL)</Label>
                <div className="flex items-center mt-1">
                  <span className="bg-slate-800 border border-r-0 border-slate-700 px-3 py-2 text-gray-500 text-sm rounded-l-md">
                    /blog/
                  </span>
                  <Input
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    onBlur={(e) => checkSlugUnique(e.target.value)}
                    className={`bg-slate-800 text-white rounded-l-none ${slugError ? 'border-red-500' : 'border-slate-700'}`}
                  />
                </div>
                {slugError && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {slugError}</p>
                )}
              </div>

              <div>
                <Label className="text-white">Sección de Publicación</Label>
                <select
                  value={formData.section}
                  onChange={(e) => {
                      const sec = e.target.value;
                      let firstCat = '';
                      if (sec === 'blog') firstCat = blogCategories.find(c => c.type === 'article')?.name || '';
                      if (sec === 'recursos') firstCat = blogCategories.find(c => c.type === 'recurso')?.name || '';
                      setFormData(prev => ({ ...prev, section: sec, category: firstCat || prev.category }));
                  }}
                  className="w-full h-10 mt-1 bg-slate-800 border border-slate-700 rounded-md px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="blog">Blog</option>
                  <option value="foro">Foro</option>
                  <option value="recursos">Recursos</option>
                  <option value="herramientas">Herramientas</option>
                </select>
                <p className="text-xs text-slate-400 mt-1">Define dónde se publicará el contenido.</p>
              </div>

              {(formData.section === 'blog' || formData.section === 'recursos') && (
                <div className="pt-2">
                  <Label className="text-white">Categoría de {formData.section === 'blog' ? 'Blog' : 'Recursos'}</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full h-10 mt-1 bg-slate-800 border border-slate-700 rounded-md px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent mb-2"
                  >
                    {blogCategories.filter(c => c.type === (formData.section === 'recursos' ? 'recurso' : 'article')).map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Input 
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        placeholder="Nueva categoría..."
                        className="bg-slate-800 border-slate-700 text-white h-9"
                    />
                    <Button 
                        type="button" 
                        onClick={handleCreateCategory} 
                        disabled={isCreatingCategory || !newCategoryName.trim()}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white h-9"
                        size="sm"
                    >
                        {isCreatingCategory ? '...' : 'Añadir'}
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-white">URL Canónica (Opcional)</Label>
                <Input 
                  value={formData.canonical_url}
                  onChange={(e) => handleInputChange('canonical_url', e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">

          {/* SERP Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Search size={18} className="text-cyan-400" /> Vista previa en Google
            </h3>
            <div className="bg-white rounded-lg p-4 space-y-1 font-sans">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src="https://seogrowthers.com/favicon.ico" alt="" className="w-full h-full" onError={(e) => { e.target.style.display='none'; }} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 leading-none">seogrowthers.com</p>
                  <p className="text-[10px] text-gray-400 leading-none">
                    https://seogrowthers.com/blog/{formData.slug || 'tu-slug'}
                  </p>
                </div>
              </div>
              <p className={`text-base font-medium leading-snug truncate ${
                formData.seo_title.length > 60 ? 'text-red-600' : 'text-blue-700'
              }`}>
                {formData.seo_title || formData.title || 'Título del artículo | SEO Growthers'}
              </p>
              <p className={`text-sm leading-snug line-clamp-2 ${
                formData.seo_description.length > 160 ? 'text-red-500' : 'text-gray-600'
              }`}>
                {formData.seo_description || 'La meta descripción aparecerá aquí. Escribe entre 120 y 160 caracteres para el mejor resultado.'}
              </p>
            </div>
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
              <span className={formData.seo_title.length >= 30 && formData.seo_title.length <= 60 ? 'text-green-400' : 'text-yellow-500'}>
                Título: {formData.seo_title.length}/60
              </span>
              <span className={formData.seo_description.length >= 120 && formData.seo_description.length <= 160 ? 'text-green-400' : 'text-yellow-500'}>
                Desc: {formData.seo_description.length}/160
              </span>
            </div>
          </div>

          {/* SEO Score */}
          {(() => {
            const wordCount = formData.content
              ? formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
              : 0;
            const readingTime = Math.max(1, Math.ceil(wordCount / 200));
            const seoData = {
              seo_title: formData.seo_title || formData.title,
              seo_description: formData.seo_description,
              keywords: formData.keywords,
              content: formData.content,
              slug: formData.slug,
            };
            const { score, breakdown } = calculateSeoScore(seoData);
            const scoreColor = score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';
            const barColor = score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
            return (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-purple-400" /> Análisis SEO
                </h3>
                <div className="flex items-center gap-4 mb-5">
                  <div className={`text-4xl font-black ${scoreColor}`}>{score}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${score}%` }} />
                    </div>
                    <p className={`text-xs mt-1 font-semibold ${scoreColor}`}>
                      {score >= 80 ? 'Excelente' : score >= 60 ? 'Bien' : score >= 40 ? 'Mejorable' : 'Necesita trabajo'}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {breakdown.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      {item.passed
                        ? <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                        : <XCircle size={14} className="text-red-400 shrink-0" />}
                      <span className={item.passed ? 'text-gray-300' : 'text-gray-500'}>{item.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-800 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><FileText size={11} /> {wordCount} palabras</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> ~{readingTime} min lectura</span>
                </div>
              </div>
            );
          })()}

          {/* Keyword Density + Readability + Image Alt alerts */}
          {(() => {
            const densities = calculateKeywordDensity(formData.content, formData.keywords);
            const readability = calculateReadability(formData.content);
            const missingAlts = getMissingAltImages(formData.content);
            const hasContent = formData.content && formData.content.replace(/<[^>]*>/g, '').trim().length > 0;
            if (!hasContent && formData.keywords.length === 0) return null;
            const gradeColor = { A: 'text-green-400', B: 'text-cyan-400', C: 'text-yellow-400', D: 'text-orange-400', F: 'text-red-400' };
            const densityBadge = { good: 'bg-green-500/10 text-green-400 border-green-500/20', low: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', high: 'bg-red-500/10 text-red-400 border-red-500/20', missing: 'bg-slate-700 text-gray-500 border-slate-600' };
            return (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BarChart2 size={18} className="text-cyan-400" /> Análisis de Contenido
                </h3>

                {/* Readability */}
                {hasContent && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen size={12} /> Legibilidad
                    </p>
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl font-black ${gradeColor[readability.grade] || 'text-gray-400'}`}>
                        {readability.grade}
                      </span>
                      <div className="flex-1">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${readability.score >= 60 ? 'bg-green-500' : readability.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${readability.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">{readability.label} <span className="text-gray-600">({readability.score}/100)</span></p>
                      </div>
                    </div>
                    {readability.score < 50 && (
                      <p className="text-xs text-yellow-500 mt-2 flex items-center gap-1">
                        <AlertCircle size={10} /> Simplifica las oraciones para mejorar la lectura.
                      </p>
                    )}
                  </div>
                )}

                {/* Keyword Density */}
                {densities.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BarChart2 size={12} /> Densidad de palabras clave
                    </p>
                    <div className="space-y-2">
                      {densities.map((d) => (
                        <div key={d.keyword} className="flex items-center justify-between gap-2">
                          <span className="text-xs text-gray-300 truncate flex-1">{d.keyword}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${d.status === 'good' ? 'bg-green-500' : d.status === 'low' ? 'bg-yellow-500' : d.status === 'high' ? 'bg-red-500' : 'bg-slate-600'}`}
                                style={{ width: `${Math.min(100, d.density * 40)}%` }}
                              />
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${densityBadge[d.status]}`}>
                              {d.density}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-600 mt-2">Óptimo: 0.5% – 2.5%</p>
                  </div>
                )}

                {/* Missing alt text alerts */}
                {missingAlts.length > 0 && (
                  <div className="border border-orange-500/20 bg-orange-500/5 rounded-lg p-3">
                    <p className="text-xs font-semibold text-orange-400 flex items-center gap-1.5 mb-1">
                      <ImageOff size={12} /> {missingAlts.length} imagen{missingAlts.length > 1 ? 'es' : ''} sin texto alternativo
                    </p>
                    <p className="text-[10px] text-orange-300/70">
                      Las imágenes sin alt text perjudican accesibilidad y SEO. Editalas en el contenido.
                    </p>
                  </div>
                )}
                {hasContent && missingAlts.length === 0 && formData.content.includes('<img') && (
                  <p className="text-xs text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 size={12} /> Todas las imágenes tienen texto alternativo
                  </p>
                )}
              </div>
            );
          })()}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Publicación</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Estado</span>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={formData.published}
                  onCheckedChange={(checked) => handleInputChange('published', checked)}
                />
                <span className={formData.published ? 'text-green-400' : 'text-yellow-400'}>
                  {formData.published ? 'Publicado' : 'Borrador'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Palabras Clave</h3>
            <Input 
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordAdd}
              placeholder="Escribe y presiona Enter..."
              className="bg-slate-800 border-slate-700 text-white mb-3"
            />
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((kw, i) => (
                <span key={i} className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-sm flex items-center gap-1 border border-cyan-500/20">
                  {kw}
                  <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-cyan-200">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

           <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Imagen Destacada</h3>
            
            <div className="mb-4">
              {formData.featured_image ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-700 mb-3 group">
                  <img src={formData.featured_image} alt="Vista previa" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button type="button" variant="destructive" onClick={() => handleInputChange('featured_image', '')}>
                      Quitar Imagen
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center flex flex-col items-center justify-center mb-3 bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <UploadCloud className="w-10 h-10 text-slate-500 mb-2" />
                  <p className="text-sm text-slate-400 mb-4">Sube la portada del artículo</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    className="max-w-xs cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div>
              <Label className="text-white">Texto Alternativo (Alt Text)</Label>
              <Input
                value={formData.featured_image_alt}
                onChange={(e) => handleInputChange('featured_image_alt', e.target.value)}
                className="bg-slate-800 border-slate-700 text-white mt-1"
                placeholder="Descripción de la imagen destacada"
                required={!!formData.featured_image}
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Share2 size={18} className="text-blue-400" /> Texto para Redes Sociales
            </h3>
            <p className="text-xs text-gray-500">Personaliza el texto al compartir. Si queda vacío, se usa el título del artículo.</p>
            <div>
              <Label className="text-gray-300 text-sm">Facebook</Label>
              <Textarea
                value={formData.social_facebook}
                onChange={(e) => handleInputChange('social_facebook', e.target.value)}
                className="bg-slate-800 border-slate-700 text-white mt-1 h-16 text-sm"
                placeholder={formData.title || 'Texto para compartir en Facebook...'}
              />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">X / Twitter</Label>
              <Textarea
                value={formData.social_x}
                onChange={(e) => handleInputChange('social_x', e.target.value)}
                className="bg-slate-800 border-slate-700 text-white mt-1 h-16 text-sm"
                placeholder={formData.title || 'Texto para compartir en X...'}
              />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">WhatsApp</Label>
              <Textarea
                value={formData.social_whatsapp}
                onChange={(e) => handleInputChange('social_whatsapp', e.target.value)}
                className="bg-slate-800 border-slate-700 text-white mt-1 h-16 text-sm"
                placeholder={formData.title || 'Texto para compartir en WhatsApp...'}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;
