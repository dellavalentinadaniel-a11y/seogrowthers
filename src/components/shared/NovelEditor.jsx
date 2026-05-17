import React, { useState } from 'react';
import { 
  EditorRoot, 
  EditorContent, 
  StarterKit, 
  TiptapLink,
  TiptapImage,
  TiptapUnderline,
  Color,
  TextStyle,
  Placeholder,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorBubble,
  EditorBubbleItem,
  handleCommandNavigation
} from 'novel';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import CodeBlockLowlight from '@tiptap/extension-code-block';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockNodeView from './CodeBlockNodeView';
import {
  Bold, Italic, Underline, Strikethrough, Code,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, ImageIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo, Redo, Link as LinkIcon, Unlink, Table, Trash2, Plus, HelpCircle, Video, Music, Smile, FileCode2,
  Highlighter, Baseline, Type
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/customSupabaseClient';

const suggestionItems = [
  {
    title: 'Texto',
    description: 'Empieza a escribir texto normal.',
    searchTerms: ['p', 'paragraph'],
    icon: <div className="p-1 border border-slate-700 bg-slate-800 rounded"><span className="text-gray-400">T</span></div>,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('paragraph').run();
    },
  },
  {
    title: 'Tabla',
    description: 'Inserta una tabla con filas y columnas.',
    searchTerms: ['table', 'grid'],
    icon: <Table size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      window.dispatchEvent(new CustomEvent('novelTableDialog'));
    },
  },
  {
    title: 'Bloque de Código',
    description: 'Inserta un bloque de código para programar.',
    searchTerms: ['code', 'block', 'sql', 'js'],
    icon: <Code size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: 'HTML Personalizado',
    description: 'Inserta y visualiza código HTML personalizado.',
    searchTerms: ['html', 'embed'],
    icon: <FileCode2 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      window.dispatchEvent(new CustomEvent('novelHTMLDialog'));
    },
  },
  {
    title: 'Preguntas Frecuentes',
    description: 'Inserta una sección de FAQ con acordeón interactivo.',
    searchTerms: ['faq', 'frecuentes', 'preguntas', 'accordion'],
    icon: <HelpCircle size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      window.dispatchEvent(new CustomEvent('novelFAQDialog'));
    },
  },
  {
    title: 'Título 1',
    description: 'Título de sección principal.',
    searchTerms: ['title', 'big', 'large'],
    icon: <Heading1 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
    },
  },
  {
    title: 'Título 2',
    description: 'Título de sección secundaria.',
    searchTerms: ['subtitle', 'medium'],
    icon: <Heading2 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
    },
  },
  {
    title: 'Título 3',
    description: 'Subtítulo.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading3 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
    },
  },
  {
    title: 'Lista con viñetas',
    description: 'Crea una lista de viñetas.',
    searchTerms: ['unordered', 'point'],
    icon: <List size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Lista numerada',
    description: 'Crea una lista con números.',
    searchTerms: ['ordered'],
    icon: <ListOrdered size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Cita',
    description: 'Captura una cita relevante.',
    searchTerms: ['blockquote'],
    icon: <Quote size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: 'Imagen rápida',
    description: 'Inserta una imagen mediante una URL externa.',
    searchTerms: ['image', 'img', 'picture'],
    icon: <ImageIcon size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      window.dispatchEvent(new CustomEvent('novelImageDialog'));
      editor.chain().focus().deleteRange(range).run();
    },
  },
  {
    title: 'Video',
    description: 'Sube un video o inserta una URL.',
    searchTerms: ['video', 'mp4'],
    icon: <Video size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      window.dispatchEvent(new CustomEvent('novelVideoDialog'));
      editor.chain().focus().deleteRange(range).run();
    },
  },
  {
    title: 'Audio',
    description: 'Sube un archivo de audio.',
    searchTerms: ['audio', 'mp3', 'music'],
    icon: <Music size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      window.dispatchEvent(new CustomEvent('novelAudioDialog'));
      editor.chain().focus().deleteRange(range).run();
    },
  }
];

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const ToolbarButton = ({ onClick, isActive, disabled, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md transition-colors ${
        isActive
          ? 'bg-cyan-500/20 text-cyan-400'
          : 'text-gray-400 hover:text-white hover:bg-slate-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL del enlace:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('URL de la imagen:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 mb-2 bg-slate-900 border border-slate-700 rounded-t-lg sticky top-0 z-40 shadow-sm overflow-x-auto">
      {/* Undo / Redo */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Deshacer">
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Rehacer">
          <Redo size={16} />
        </ToolbarButton>
      </div>

      {/* Insert Emoji */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              title="Insertar Emoji/Icono"
              className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md transition-colors text-gray-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <Smile size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0 border-none bg-transparent w-auto" sideOffset={5}>
            <div className="bg-slate-900 border border-slate-700 p-2 rounded-t-md text-xs text-slate-300 text-center">
                Tip: Usa los títulos (H1, H2, H3) de la barra superior para agrandar los emojis.
            </div>
            <EmojiPicker 
              theme="dark"
              onEmojiClick={(emojiData) => {
                editor.chain().focus().insertContent(emojiData.emoji).run();
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Headings */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Título 1">
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Título 2">
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Título 3">
          <Heading3 size={18} />
        </ToolbarButton>
      </div>

      {/* Formatting & Colors */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        
        {/* Font Family Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              title="Fuente"
              className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md transition-colors text-gray-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <Type size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-slate-900 border border-slate-700" sideOffset={5}>
            <div className="flex flex-col gap-1">
              {[
                { name: 'Inter', value: 'Inter, sans-serif' },
                { name: 'Serif', value: 'Georgia, serif' },
                { name: 'Mono', value: 'monospace' },
                { name: 'Comic Sans', value: '"Comic Sans MS", "Comic Sans", cursive' },
              ].map(font => (
                <button
                  key={font.name}
                  onClick={() => editor.chain().focus().setFontFamily(font.value).run()}
                  className={`px-2 py-1.5 text-sm text-left rounded-md hover:bg-slate-800 ${editor.isActive('textStyle', { fontFamily: font.value }) ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-200'}`}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </button>
              ))}
              <button
                onClick={() => editor.chain().focus().unsetFontFamily().run()}
                className="px-2 py-1.5 text-sm text-left rounded-md hover:bg-slate-800 text-slate-400 mt-1"
              >
                Por defecto
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Text Color Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              title="Color de Texto"
              className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md transition-colors text-gray-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <Baseline size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 bg-slate-900 border border-slate-700" sideOffset={5}>
            <div className="grid grid-cols-5 gap-1">
              {['#ffffff', '#94a3b8', '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'].map(color => (
                <button
                  key={color}
                  onClick={() => editor.chain().focus().setColor(color).run()}
                  className="w-8 h-8 rounded-md border border-slate-700"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <button
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="w-full mt-2 px-2 py-1 text-xs text-center rounded-md hover:bg-slate-800 text-slate-400"
            >
              Restablecer Color
            </button>
          </PopoverContent>
        </Popover>

        {/* Highlight Color Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              title="Resaltar Texto"
              className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md transition-colors text-gray-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <Highlighter size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 bg-slate-900 border border-slate-700" sideOffset={5}>
            <div className="grid grid-cols-5 gap-1">
              {['#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#e9d5ff', '#fed7aa', '#fecaca', '#99f6e4', '#000000', '#334155'].map(color => (
                <button
                  key={color}
                  onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                  className="w-8 h-8 rounded-md border border-slate-700"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <button
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              className="w-full mt-2 px-2 py-1 text-xs text-center rounded-md hover:bg-slate-800 text-slate-400"
            >
              Quitar Resaltado
            </button>
          </PopoverContent>
        </Popover>

        <div className="w-px h-6 bg-slate-700 mx-1"></div>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Negrita">
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Cursiva">
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Subrayado">
          <Underline size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Tachado">
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Código en línea">
          <Code size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Bloque de Código">
          <FileCode2 size={16} />
        </ToolbarButton>
      </div>

      {/* Alignments */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Alinear izquierda">
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Centrar">
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Alinear derecha">
          <AlignRight size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justificar">
          <AlignJustify size={16} />
        </ToolbarButton>
      </div>

      {/* Lists & Quotes */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Lista viñetas">
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Lista numerada">
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Citar">
          <Quote size={16} />
        </ToolbarButton>
      </div>

      {/* Media & Links */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Añadir enlace">
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} title="Quitar enlace">
          <Unlink size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelImageDialog'))} title="Insertar imagen">
          <ImageIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelVideoDialog'))} title="Insertar video">
          <Video size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelAudioDialog'))} title="Insertar audio">
          <Music size={16} />
        </ToolbarButton>
      </div>

      {/* Advanced Elements */}
      <div className="flex items-center">
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelTableDialog'))} title="Insertar tabla">
          <Table size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelHTMLDialog'))} title="HTML personalizado">
          <Code size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelFAQDialog'))} title="Insertar FAQ">
          <HelpCircle size={16} />
        </ToolbarButton>
      </div>
    </div>
  );
};

// Table Dialog
const NovelTableDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelTableDialog', handleOpen);
    return () => window.removeEventListener('novelTableDialog', handleOpen);
  }, []);

  const insertTable = () => {
    if (!editor || rows < 1 || cols < 1) return;
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Insertar Tabla</DialogTitle>
          <DialogDescription className="text-slate-400">
            Define el número de filas y columnas para tu tabla.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm mb-2 block">Filas</Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={e => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div>
              <Label className="text-sm mb-2 block">Columnas</Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={e => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>
          <div className="bg-slate-800 p-3 rounded border border-slate-700 text-sm text-gray-300">
            Se creará una tabla de <span className="text-cyan-400 font-bold">{rows}×{cols}</span> con encabezados.
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={insertTable} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Insertar Tabla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// HTML Dialog
const NovelHTMLDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [preview, setPreview] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelHTMLDialog', handleOpen);
    return () => window.removeEventListener('novelHTMLDialog', handleOpen);
  }, []);

  const insertHTML = () => {
    if (!editor || !htmlCode.trim()) return;
    editor.chain().focus().insertContent(`<div class="custom-html-block border-l-4 border-yellow-500 pl-4 py-2 my-4 bg-yellow-500/5">${htmlCode}</div>`).run();
    setOpen(false);
    setHtmlCode('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border border-slate-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Insertar HTML Personalizado</DialogTitle>
          <DialogDescription className="text-slate-400">
            Pega tu código HTML y visualiza cómo se verá en el contenido.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-sm mb-2 block">Código HTML</Label>
            <textarea
              value={htmlCode}
              onChange={e => setHtmlCode(e.target.value)}
              placeholder="<div>Contenido HTML aquí</div>"
              className="w-full h-32 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-gray-200 focus:border-cyan-500 outline-none resize-none"
            />
          </div>
          {preview && htmlCode && (
            <div>
              <Label className="text-sm mb-2 block text-cyan-400">Vista Previa</Label>
              <div className="w-full bg-slate-800 border border-slate-700 rounded p-4 text-sm overflow-auto max-h-48">
                <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setPreview(!preview)}
            className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
          >
            {preview ? 'Ocultar' : 'Vista Previa'}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={insertHTML} disabled={!htmlCode.trim()} className="bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50">
            Insertar HTML
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Internal component for Image Upload Modal
const NovelImageDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelImageDialog', handleOpen);
    return () => window.removeEventListener('novelImageDialog', handleOpen);
  }, []);

  const handleUpload = async () => {
    if (!file || !editor) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      editor.chain().focus().setImage({ src: publicUrl, alt: altText }).run();
      setOpen(false);
      setFile(null);
      setAltText('');
    } catch (err) {
      console.error(err);
      alert('Error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Insertar Imagen</DialogTitle>
          <DialogDescription className="text-slate-400">
            Sube una imagen desde tu dispositivo. Opcionalmente, agrega texto alternativo para SEO.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">Archivo</Label>
            <Input 
              id="picture" 
              type="file" 
              accept="image/*"
              className="col-span-3 bg-slate-800 border-slate-700" 
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alt" className="text-right text-xs">Atributo Alt (Opcional)</Label>
            <Input 
              id="alt" 
              placeholder="Descripción de la imagen" 
              className="col-span-3 bg-slate-800 border-slate-700" 
              value={altText}
              onChange={e => setAltText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !file} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {uploading ? 'Subiendo...' : 'Subir e Insertar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Internal component for Video Upload Modal
const NovelVideoDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelVideoDialog', handleOpen);
    return () => window.removeEventListener('novelVideoDialog', handleOpen);
  }, []);

  const handleUpload = async () => {
    if (!file || !editor) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('media-assets').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media-assets').getPublicUrl(fileName);
      
      const videoHtml = `
        <div class="my-4">
          <video controls class="w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-900">
            <source src="${publicUrl}" type="video/${fileExt === 'mkv' ? 'webm' : fileExt}" />
            Tu navegador no soporta el formato de video.
          </video>
        </div>
      `;
      editor.chain().focus().insertContent(videoHtml).run();
      setOpen(false);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Error al subir el video.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Insertar Video</DialogTitle>
          <DialogDescription className="text-slate-400">
            Sube un video (MP4, WebM) desde tu dispositivo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="video-file" className="text-right">Archivo</Label>
            <Input 
              id="video-file" 
              type="file" 
              accept="video/*"
              className="col-span-3 bg-slate-800 border-slate-700" 
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !file} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {uploading ? 'Subiendo...' : 'Subir e Insertar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Internal component for Audio Upload Modal
const NovelAudioDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelAudioDialog', handleOpen);
    return () => window.removeEventListener('novelAudioDialog', handleOpen);
  }, []);

  const handleUpload = async () => {
    if (!file || !editor) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('media-assets').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media-assets').getPublicUrl(fileName);
      
      const audioHtml = `
        <div class="my-4 p-4 rounded-lg border border-slate-700 bg-slate-900/50">
          <audio controls class="w-full">
            <source src="${publicUrl}" type="audio/${fileExt}" />
            Tu navegador no soporta el formato de audio.
          </audio>
        </div>
      `;
      editor.chain().focus().insertContent(audioHtml).run();
      setOpen(false);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Error al subir el audio.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Insertar Audio</DialogTitle>
          <DialogDescription className="text-slate-400">
            Sube un archivo de audio (MP3, WAV) desde tu dispositivo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audio-file" className="text-right">Archivo</Label>
            <Input 
              id="audio-file" 
              type="file" 
              accept="audio/*"
              className="col-span-3 bg-slate-800 border-slate-700" 
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !file} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {uploading ? 'Subiendo...' : 'Subir e Insertar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// FAQ Dialog
const NovelFAQDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [faqItems, setFaqItems] = useState([
    { id: '1', question: '¿Pregunta frecuente?', answer: 'Respuesta a la pregunta.' },
    { id: '2', question: '¿Otra pregunta?', answer: 'Respuesta adicional.' },
  ]);
  const [selectedVariant, setSelectedVariant] = useState('default');

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelFAQDialog', handleOpen);
    return () => window.removeEventListener('novelFAQDialog', handleOpen);
  }, []);

  const addFaqItem = () => {
    setFaqItems([
      ...faqItems,
      { id: Date.now().toString(), question: 'Nueva pregunta', answer: 'Nueva respuesta' }
    ]);
  };

  const removeFaqItem = (id) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  const updateFaqItem = (id, field, value) => {
    setFaqItems(faqItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const insertFAQ = () => {
    if (!editor || faqItems.length === 0) return;

    const faqHtml = `
      <div class="faq-block my-6" data-variant="${selectedVariant}">
        <div class="faq-items">
          ${faqItems.map((item, idx) => `
            <div class="faq-item">
              <div class="faq-question font-semibold text-on-surface cursor-pointer hover:text-primary transition-colors p-3 border border-outline-variant/20 rounded-lg" data-faq-idx="${idx}">
                ${item.question}
              </div>
              <div class="faq-answer text-on-surface-variant p-3 bg-surface-container-low rounded-b-lg hidden" data-faq-idx="${idx}" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                ${item.answer}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <script>
        (function() {
          const faqBlock = document.currentScript.previousElementSibling;
          const questions = faqBlock.querySelectorAll('.faq-question');

          questions.forEach(question => {
            question.addEventListener('click', function() {
              const idx = this.getAttribute('data-faq-idx');
              const answer = faqBlock.querySelector('.faq-answer[data-faq-idx="' + idx + '"]');
              const isHidden = answer.classList.contains('hidden');

              // Close all answers
              faqBlock.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.add('hidden');
                a.style.maxHeight = '0';
              });

              // Open selected answer
              if (isHidden) {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
              }
            });
          });
        })();
      </script>
    `;

    editor.chain().focus().insertContent(faqHtml).run();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border border-slate-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Insertar Preguntas Frecuentes</DialogTitle>
          <DialogDescription className="text-slate-400">
            Crea una sección de FAQ con acordeón interactivo. Edita las preguntas y respuestas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-sm mb-2 block">Estilo</Label>
            <select
              value={selectedVariant}
              onChange={e => setSelectedVariant(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-gray-200 focus:border-cyan-500 outline-none"
            >
              <option value="default">Predeterminado (Caja)</option>
              <option value="minimal">Minimalista</option>
              <option value="bordered">Con borde lateral</option>
            </select>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {faqItems.map((item, idx) => (
              <div key={item.id} className="border border-slate-700 rounded p-3 bg-slate-800">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-slate-400">Ítem {idx + 1}</span>
                  <button
                    onClick={() => removeFaqItem(item.id)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    Eliminar
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={e => updateFaqItem(item.id, 'question', e.target.value)}
                  placeholder="Pregunta"
                  className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm mb-2 focus:border-cyan-500 outline-none"
                />
                <textarea
                  value={item.answer}
                  onChange={e => updateFaqItem(item.id, 'answer', e.target.value)}
                  placeholder="Respuesta"
                  className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm h-16 focus:border-cyan-500 outline-none resize-none"
                />
              </div>
            ))}
          </div>

          <Button
            onClick={addFaqItem}
            variant="outline"
            className="w-full bg-slate-800 border-slate-700 hover:bg-slate-700 text-white text-sm"
          >
            <Plus size={16} className="mr-2" />
            Agregar pregunta
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={insertFAQ} disabled={faqItems.length === 0} className="bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50">
            Insertar FAQ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditorUpdater = ({ content, editor }) => {
  React.useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      if (content.startsWith('<')) {
        editor.commands.setContent(content);
      } else if (content.startsWith('{')) {
        try {
          editor.commands.setContent(JSON.parse(content));
        } catch (e) {
          console.error("Error updating JSON content", e);
        }
      }
    }
  }, [content, editor]);
  return null;
};

const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNodeView);
  },
});

const DEFAULT_EXTENSIONS = [
  StarterKit.configure({
    bulletList: { HTMLAttributes: { class: "list-disc list-outside leading-3 -mt-2" } },
    orderedList: { HTMLAttributes: { class: "list-decimal list-outside leading-3 -mt-2" } },
    listItem: { HTMLAttributes: { class: "leading-normal -mb-2" } },
    blockquote: { HTMLAttributes: { class: "border-l-4 border-cyan-500 pl-4 py-2 italic text-gray-300" } },
    codeBlock: false, // Disabling default to use our CustomCodeBlock
    code: { HTMLAttributes: { class: "rounded-md bg-slate-800 px-1.5 py-1 font-mono font-medium text-gray-200" } },
    horizontalRule: { HTMLAttributes: { class: "border-t border-slate-700 my-8" } },
    table: { HTMLAttributes: { class: "border-collapse border border-slate-700 w-full my-4" } },
    tableRow: { HTMLAttributes: { class: "border-slate-700" } },
    tableHeader: { HTMLAttributes: { class: "border border-slate-700 bg-slate-800 p-2 text-left font-bold text-cyan-400" } },
    tableCell: { HTMLAttributes: { class: "border border-slate-700 p-2" } },
    dropcursor: { color: "#06b6d4", width: 2 },
  }),
  CustomCodeBlock,
  TiptapLink.configure({
    HTMLAttributes: { class: "text-cyan-500 underline underline-offset-4 cursor-pointer hover:text-cyan-400" },
  }),
  TiptapImage.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: { class: "rounded-lg border border-slate-700 max-h-[400px] object-cover" },
  }),
  TiptapUnderline,
  Color,
  TextStyle,
  Highlight.configure({ multicolor: true }),
  FontFamily,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];

const NovelEditor = ({ content, onChange, placeholder = 'Presiona "/" para ver comandos o usar el menú superior...' }) => {
  const [editorInstance, setEditorInstance] = useState(null);
  
  const extensions = React.useMemo(() => [
    ...DEFAULT_EXTENSIONS,
    Placeholder.configure({
      placeholder: placeholder,
    })
  ], [placeholder]);

  return (
    <div className="relative w-full min-h-[400px] border border-slate-800 bg-slate-900/50 rounded-lg shadow-inner text-white focus-within:border-cyan-500/50 transition-all font-sans flex flex-col">
      <Toolbar editor={editorInstance} />
      <NovelImageDialog editor={editorInstance} />
      <NovelVideoDialog editor={editorInstance} />
      <NovelAudioDialog editor={editorInstance} />
      <NovelTableDialog editor={editorInstance} />
      <NovelHTMLDialog editor={editorInstance} />
      <NovelFAQDialog editor={editorInstance} />
      <EditorRoot>
        <EditorContent
          className="min-h-[350px] outline-none prose prose-invert prose-headings:text-cyan-400 max-w-none px-4 pb-4 flex-1"
          initialContent={content && content.startsWith('{') ? JSON.parse(content) : undefined}
          extensions={extensions}
          onUpdate={({ editor }) => {
            setEditorInstance(editor);
            onChange(editor.getHTML());
          }}
          editorProps={{
             handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class: 'prose prose-invert max-w-none prose-headings:text-cyan-400 prose-a:text-cyan-500 focus:outline-none min-h-[350px] p-4',
            },
          }}
          onCreate={({ editor }) => {
            if (content) {
               if (content.startsWith('<')) {
                 editor.commands.setContent(content);
               } else if (content.startsWith('{')) {
                 try {
                   editor.commands.setContent(JSON.parse(content));
                 } catch (e) {
                   console.error("Error parsing JSON content", e);
                 }
               }
            }
            setEditorInstance(editor);
          }}
        >
          <EditorUpdater content={content} editor={editorInstance} />
          {/* Menú Flotante de Formato (Bubble Menu) */}
          <EditorBubble className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-md p-1 shadow-xl">
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleBold().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Bold size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Italic size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleUnderline().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Underline size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleStrike().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Strikethrough size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleCode().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Code size={16} />
             </EditorBubbleItem>
          </EditorBubble>

          {/* Menú de Comandos mediante tecla '/' */}
          <EditorCommand className="z-50 bg-slate-800 border border-slate-700 shadow-xl rounded-lg overflow-hidden flex flex-col w-64 max-h-[300px] overflow-y-auto">
            <EditorCommandEmpty className="px-4 py-2 text-sm text-gray-400">
              No hay resultados
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 cursor-pointer flex-row transition-colors w-full aria-selected:bg-cyan-500/20 aria-selected:text-cyan-400"
                  key={item.title}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded border border-slate-700 bg-slate-900 text-gray-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-200">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default NovelEditor;
