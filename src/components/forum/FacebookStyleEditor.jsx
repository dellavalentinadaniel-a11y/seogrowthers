import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Bold, Italic, Link as LinkIcon, List, Image as ImageIcon, Send, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const SUB_CATEGORIES = ['SEO', 'Web Dev', 'Herramientas AI', 'Growth'];

const FacebookStyleEditor = ({ onPostCreated }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('SEO');
  const [featuredImage, setFeaturedImage] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          if (data) setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching profile for editor:', err);
      }
    };
    fetchUserAndProfile();
  }, []);

  const handleTextareaInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(300, textarea.scrollHeight)}px`;
    setContent(textarea.value);
  };

  const insertTextAtCursor = (beforeVal, afterVal = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = beforeVal + selectedText + afterVal;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setContent(newValue);

    // Set textarea value programmatically
    textarea.value = newValue;
    
    // Auto adjust height
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(300, textarea.scrollHeight)}px`;

    // Focus and select the text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + beforeVal.length, start + beforeVal.length + selectedText.length);
    }, 0);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove non-alphanumeric except spaces and dashes
      .replace(/[\s_]+/g, '-')  // replace spaces and underscores with dashes
      .replace(/^-+|-+$/g, '');  // remove leading/trailing dashes
  };

  const convertToHtml = (text, imageUrl) => {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Bullet list item
      .replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>')
      // Wrap list items in ul
      .replace(/(<li>.*?<\/li>)+/gs, '<ul>$&</ul>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>')
      // Paragraphs
      .split(/\n{2,}/)
      .map(p => {
        if (p.startsWith('<ul>') || p.startsWith('<li>')) return p;
        return `<p class="mb-4 leading-relaxed">${p.replace(/\n/g, '<br />')}</p>`;
      })
      .join('');

    if (imageUrl) {
      html = `<div class="mb-6 rounded-xl overflow-hidden border border-slate-800"><img src="${imageUrl}" alt="Imagen del debate" class="w-full h-auto object-cover" /></div>` + html;
    }
    return html;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: 'Error', description: 'Por favor, añade un título a tu debate.', variant: 'destructive' });
      return;
    }
    if (!content.trim()) {
      toast({ title: 'Error', description: 'El contenido del debate no puede estar vacío.', variant: 'destructive' });
      return;
    }
    if (!category) {
      toast({ title: 'Error', description: 'Por favor, selecciona una categoría.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const slugBase = generateSlug(title);
      const uniqueSlug = `${slugBase}-${Math.random().toString(36).substring(2, 7)}`;
      const summaryText = content.substring(0, 150) + (content.length > 150 ? '...' : '');

      const newArticle = {
        title: title.trim(),
        slug: uniqueSlug,
        content: content,
        content_html: convertToHtml(content, featuredImage),
        summary: summaryText,
        category: category,
        section: 'Foro',
        featured_image: featuredImage || null,
        status: 'published',
        author_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        views: 0
      };

      const { error } = await supabase
        .from('articles')
        .insert([newArticle]);

      if (error) throw error;

      toast({ title: '¡Éxito!', description: 'Tu debate ha sido publicado en el foro.' });
      
      // Reset state
      setTitle('');
      setContent('');
      setFeaturedImage('');
      setShowImageUpload(false);
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      console.error('Error creating post:', err);
      toast({ title: 'Error', description: err.message || 'No se pudo crear el debate.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const displayName = profile?.full_name || profile?.username || user?.user_metadata?.full_name || 'Growther';
  const displayAvatar = profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=06B6D4&color=fff`;

  return (
    <div className="bg-[#0e0e15]/95 border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl animate-fadeIn">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-3xl -mr-12 -mt-12 rounded-full pointer-events-none"></div>

      <div className="flex gap-4 items-start mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/30 shrink-0">
          <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
            Iniciar nuevo debate
          </p>
          <h4 className="text-sm font-bold text-white leading-tight">
            ¿Qué tienes en mente para debatir hoy, <span className="text-cyan-400 font-extrabold">{displayName}</span>?
          </h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <input
            type="text"
            placeholder="Título llamativo para tu debate..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-white/5 py-2 px-1 text-white placeholder-slate-600 font-extrabold text-base focus:outline-none focus:border-cyan-500/40 transition-colors"
          />
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            placeholder="Escribe aquí los detalles, argumentos o preguntas para la comunidad..."
            value={content}
            onChange={handleTextareaInput}
            onInput={handleTextareaInput}
            rows={3}
            className="w-full bg-transparent border-0 py-1 px-1 text-slate-300 placeholder-slate-600 text-sm focus:outline-none resize-none min-h-[80px] max-h-[300px] overflow-y-auto leading-relaxed"
          />
        </div>

        {/* Toggleable Image Upload */}
        {showImageUpload && (
          <div className="bg-black/35 border border-white/5 p-4 rounded-2xl relative">
            <button
              type="button"
              onClick={() => {
                setFeaturedImage('');
                setShowImageUpload(false);
              }}
              className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-colors z-10"
            >
              <X size={14} />
            </button>
            <ImageUpload
              value={featuredImage}
              onChange={(url) => setFeaturedImage(url)}
              bucket="article-images"
              className="border-0 p-0"
            />
          </div>
        )}

        {/* Subcategories Selection */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Categoría del Debate:
          </label>
          <div className="flex flex-wrap gap-2">
            {SUB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  category === cat
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Footer actions toolbar */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          {/* Formatting Shortcuts */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => insertTextAtCursor('**', '**')}
              className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all"
              title="Negrita"
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertTextAtCursor('*', '*')}
              className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all"
              title="Cursiva"
            >
              <Italic size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertTextAtCursor('[', '](url)')}
              className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all"
              title="Enlace"
            >
              <LinkIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertTextAtCursor('\n- ')}
              className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all"
              title="Lista de viñetas"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setShowImageUpload(!showImageUpload)}
              className={`p-2 rounded-lg transition-all ${
                showImageUpload || featuredImage
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
              title="Añadir Imagen"
            >
              <ImageIcon size={16} />
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 active:scale-95 duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> publicando...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Publicar Debate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacebookStyleEditor;
