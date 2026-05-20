import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Copy, 
  Check, 
  Crown, 
  Compass, 
  Code2, 
  Sparkles, 
  Search, 
  UserCheck, 
  Bug, 
  ArrowLeft,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CATEGORY_ICONS = {
  guia: 'menu_book',
  ebook: 'menu_book',
  plantilla: 'token',
  asset: 'token',
  herramienta: 'build',
  tecnico: 'code',
  video: 'play_circle',
  webinar: 'play_circle',
};

const getCategoryIcon = (category = '') => {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(k)) return v;
  }
  return 'description';
};

const TEAM_MANAGER_CODE = `import json
import os
import sys

TEAM_DIR = ".antigravity/team"

def init_team():
    """Inicializa la infraestructura del equipo."""
    os.makedirs(f"{TEAM_DIR}/mailbox", exist_ok=True)
    os.makedirs(f"{TEAM_DIR}/locks", exist_ok=True)
    tasks_path = f"{TEAM_DIR}/tasks.json"
    if not os.path.exists(tasks_path):
        with open(tasks_path, 'w') as f:
            json.dump({"tasks": [], "members": []}, f, indent=2)
    if not os.path.exists(f"{TEAM_DIR}/broadcast.msg"):
        with open(f"{TEAM_DIR}/broadcast.msg", 'w') as f: f.write("")
    print("✓ Infraestructura 'Equipo Alejabot' lista.")

def assign_task(title, assigned_to, deps=[]):
    """Asigna una nueva tarea con soporte para dependencias."""
    path = f"{TEAM_DIR}/tasks.json"
    with open(path, 'r+') as f:
        data = json.load(f)
        task = {
            "id": len(data["tasks"]) + 1,
            "title": title,
            "status": "PENDING",
            "plan_approved": False,
            "assigned_to": assigned_to,
            "dependencies": deps
        }
        data["tasks"].append(task)
        f.seek(0)
        json.dump(data, f, indent=2)
    print(f"✓ Tarea {task['id']} ({title}) asignada a {assigned_to}.")

def broadcast(sender, text):
    """Envía un mensaje a todos los miembros del equipo."""
    msg = {"de": sender, "tipo": "BROADCAST", "mensaje": text}
    with open(f"{TEAM_DIR}/broadcast.msg", 'a') as f:
        f.write(json.dumps(msg) + "\n")
    print(f"✓ Mensaje global enviado por {sender}.")

def send_message(sender, receiver, text):
    """Envía un mensaje al buzón de un agente específico."""
    msg = {"de": sender, "mensaje": text}
    with open(f"{TEAM_DIR}/mailbox/{receiver}.msg", 'a') as f:
        f.write(json.dumps(msg) + "\n")
    print(f"✓ Mensaje enviado a {receiver}.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == "init": init_team()
`;

const ResourceDetailPage = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // States for Skill Interactivity
  const [copied, setCopied] = useState(false);
  const [activeProtocolTab, setActiveProtocolTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchResource();
  }, [slug]);

  const fetchResource = async () => {
    setLoading(true);
    setNotFound(false);

    // 1. Intercept Multi-Agent offline Skill
    if (slug === 'multi-agente') {
      setResource({
        id: 'multi-agente',
        title: 'Habilidad de Multi-Agente para Antigravity',
        description: 'Esta habilidad permite a Antigravity coordinar un equipo de agentes inteligentes trabajando en paralelo sobre el mismo proyecto, replicando la funcionalidad de "Agent Teams" de Claude Code.',
        category: 'SKILLS',
        link: '/doc/team_manager.py',
        featured: true,
        image: '/images/seo_pillar.webp',
        downloads: 742,
        file_size: '2.4 KB',
        file_type: 'py',
        created_at: new Date().toISOString(),
        author: 'Antigravity Core',
        isSkill: true
      });
      setLoading(false);
      return;
    }

    // Try by UUID id first
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    let data = null;
    let error = null;

    if (isUuid) {
      ({ data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', slug)
        .single());
    }

    // Fallback: match by link field ending in slug
    if (!data) {
      const { data: byLink, error: linkError } = await supabase
        .from('resources')
        .select('*')
        .ilike('link', `%${slug}`)
        .limit(1);
      if (!linkError && byLink && byLink.length > 0) {
        data = byLink[0];
      }
    }

    if (data) {
      setResource(data);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const incrementDownloads = async () => {
    if (!resource?.id || resource.id === 'multi-agente') return;
    await supabase
      .from('resources')
      .update({ downloads: (resource.downloads || 0) + 1 })
      .eq('id', resource.id);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(TEAM_MANAGER_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <SkeletonLoader className="h-8 w-48 mb-8 rounded" />
        <SkeletonLoader className="h-12 w-3/4 mb-4 rounded" />
        <SkeletonLoader className="h-6 w-full mb-2 rounded" />
        <SkeletonLoader className="h-6 w-5/6 mb-8 rounded" />
        <SkeletonLoader className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <Helmet>
          <title>Recurso no encontrado | SEO Growthers</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <span className="material-symbols-outlined text-6xl text-gray-600 mb-6">search_off</span>
        <h1 className="text-3xl font-bold text-white mb-4">Recurso no encontrado</h1>
        <p className="text-gray-400 mb-8">El recurso que buscas no existe o fue eliminado.</p>
        <Link to="/resources" className="bg-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-primary/80 transition-colors">
          Ver todos los recursos
        </Link>
      </div>
    );
  }

  const canonicalUrl = `https://seogrowthers.com/resources/${slug}`;
  const publishedDate = resource.published_at || resource.created_at;
  const icon = getCategoryIcon(resource.category);
  const isDownloadable = resource.file_type === 'zip' || resource.file_type === 'pdf' || resource.file_type === 'py';
  const externalLink = resource.link && !resource.link.startsWith('/') ? resource.link : null;

  // Custom data arrays for Multi-Agent Skill Render
  const roles = [
    {
      title: 'Director (Alejabot)',
      desc: 'El líder supremo. Divide el problema general, asigna subtareas, valida y aprueba los planes de acción propuestos.',
      color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.03)] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]',
      textColor: 'text-purple-400',
      icon: <Crown className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'Arquitecto',
      desc: 'Define la estructura, patrones de diseño y modularidad del código antes de codificar, garantizando altos estándares técnicos.',
      color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.03)] hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]',
      textColor: 'text-blue-400',
      icon: <Compass className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Especialista',
      desc: 'Implementa el código técnico en frontend, backend y base de datos de manera limpia, eficiente y libre de fallos.',
      color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.03)] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]',
      textColor: 'text-emerald-400',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Marketer',
      desc: 'Desarrolla la identidad de marca, redacta contenidos persuasivos (copywriting) y optimiza las landing pages.',
      color: 'from-pink-500/10 to-pink-600/5 border-pink-500/20 hover:border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.03)] hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]',
      textColor: 'text-pink-400',
      icon: <Sparkles className="w-5 h-5 text-pink-400" />
    },
    {
      title: 'Investigador',
      desc: 'Analiza el mercado, investiga APIs complejas y recopila documentación técnica clave para respaldar al equipo.',
      color: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.03)] hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]',
      textColor: 'text-amber-400',
      icon: <Search className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Revisor',
      desc: 'Audita el código final, ejecuta pruebas locales en busca de fallos, bugs de performance y posibles brechas de seguridad.',
      color: 'from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.03)] hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]',
      textColor: 'text-red-400',
      icon: <Bug className="w-5 h-5 text-red-400" />
    }
  ];

  const protocols = [
    {
      title: '1. Modo de Planificación (Gatekeeping)',
      content: 'Antes de realizar cambios significativos en el código, cada agente debe enviar un Plan de Acción estructurado al buzón de Alejabot. Los especialistas se mantendrán en estado inactivo o READ_ONLY hasta recibir un mensaje explícito de APPROVED.'
    },
    {
      title: '2. Mensajería y Difusión (Broadcast)',
      content: 'Los agentes interactúan mediante buzones locales de mensajería (.msg). Se permiten coordinaciones directas 1 a 1 entre especialistas, mientras que el Director (Alejabot) puede emitir consignas a todo el equipo simultáneamente en broadcast.msg.'
    },
    {
      title: '3. Sincronización y Dependencias',
      content: 'El script team_manager.py controla el árbol de dependencias de tareas registradas en tasks.json. Ninguna IA reclamará ni comenzará una tarea si sus prerrequisitos dependientes no están marcados como COMPLETED en la base de datos local.'
    },
    {
      title: '4. Reglas Críticas del Entorno',
      content: 'Se implementa control preventivo de colisiones en la carpeta locks/. Si un archivo está siendo modificado, se crea un .lock temporal. Ningún otro agente puede tocar ese archivo hasta que se libere el bloqueo y se notifique al líder.'
    }
  ];

  // RENDER SPECIALLY FOR MULTI-AGENT SKILL (FUTURISTIC LAYOUT)
  if (resource.isSkill) {
    return (
      <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
        <Helmet>
          <title>{resource.title} | Antigravity Skills</title>
          <meta name="description" content={resource.description} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={resource.title} />
          <meta property="og:description" content={resource.description} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          {resource.image && <meta property="og:image" content={resource.image} />}
        </Helmet>

        <ScrollToTop />

        <main className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
          <Breadcrumbs className="mb-6" />

          {/* Badge & Category */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
              <Terminal className="text-fuchsia-400 w-5 h-5 animate-pulse" />
            </div>
            <span className="text-xs font-black tracking-widest text-fuchsia-400 uppercase">
              {resource.category}
            </span>
            {publishedDate && (
              <span className="text-xs text-gray-500 ml-auto font-medium">
                {format(new Date(publishedDate), "d 'de' MMMM, yyyy", { locale: es })}
              </span>
            )}
          </div>

          {/* Header Title */}
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Habilidad de <span className="bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Multi-Agente</span> para Antigravity
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-3xl">
            {resource.description} Replicando la funcionalidad de "Agent Teams" de Claude Code, esta habilidad permite inicializar subagentes especializados y sincronizar sus tareas, comunicaciones y semáforos de archivos en local de manera 100% coordinada.
          </p>

          {/* Separator */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent my-12"></div>

          {/* SECTION 1: Bento Grid of Roles */}
          <section className="mb-20">
            <div className="mb-8">
              <span className="font-label text-[10px] tracking-[0.2em] text-fuchsia-400 uppercase font-black block mb-2">Estructura Neuronal</span>
              <h2 className="font-headline text-3xl font-bold text-white">Roles del Equipo Alejabot</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Cada agente asume una personalidad y especialización definida para resolver el problema sin solapamientos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div 
                  key={role.title} 
                  className={`bg-gradient-to-b border rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 ${role.color}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 group-hover:border-white/10 transition-colors">
                      {role.icon}
                    </div>
                    <h3 className={`font-headline text-md font-bold ${role.textColor}`}>{role.title}</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed font-body">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: Protocolo de Orquestación */}
          <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="font-label text-[10px] tracking-[0.2em] text-purple-400 uppercase font-black block mb-2">Reglas de Convivencia</span>
                <h2 className="font-headline text-3xl font-bold text-white">Protocolo de Orquestación</h2>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                  Para evitar conflictos de edición y garantizar una coordinación impecable, el equipo sigue rigurosamente este protocolo local de orquestación reactiva.
                </p>
              </div>

              {/* Selector de Protocolo */}
              <div className="space-y-2 pt-4">
                {protocols.map((proto, index) => (
                  <button
                    key={proto.title}
                    onClick={() => setActiveProtocolTab(index)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center justify-between ${
                      activeProtocolTab === index
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : 'bg-slate-900/40 text-gray-400 border-slate-800/80 hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{proto.title.split(' ')[0]} {proto.title.split(' ').slice(1).join(' ')}</span>
                    <ArrowRight size={14} className={`transition-transform duration-300 ${activeProtocolTab === index ? 'translate-x-1 text-purple-400' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Panel de Contenido de Protocolo */}
            <div className="lg:col-span-7 h-full">
              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden min-h-[220px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full"></div>
                <h3 className="font-headline text-md font-bold text-white mb-3">
                  {protocols[activeProtocolTab].title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-body">
                  {protocols[activeProtocolTab].content}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: Terminal de Código y Script */}
          <section className="mb-20">
            <div className="mb-8">
              <span className="font-label text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-black block mb-2">Código de Automatización</span>
              <h2 className="font-headline text-3xl font-bold text-white">Script de Orquestación (team_manager.py)</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Guarda este script en tu proyecto local para automatizar la mensajería y la gestión de tareas del equipo.
              </p>
            </div>

            {/* Terminal Interactiva */}
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-gray-400 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-gray-500 font-bold ml-2">powershell - team_manager.py</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-fuchsia-400 border border-fuchsia-500/20 font-bold">PYTHON</span>
                </div>
              </div>
              
              <div className="p-5 max-h-[400px] overflow-y-auto overflow-x-auto text-slate-300 scrollbar-thin scrollbar-thumb-slate-800 bg-[#0d0e12]">
                <pre><code className="language-python">{TEAM_MANAGER_CODE}</code></pre>
              </div>

              {/* Botones de acción flotantes en la terminal */}
              <div className="p-4 bg-slate-900 border-t border-slate-800/80 flex flex-wrap items-center justify-end gap-3">
                <button 
                  onClick={handleCopyCode}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-wider flex items-center gap-1.5 border transition-all ${
                    copied 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-950 hover:bg-slate-800 text-white border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? '¡COPIADO!' : 'COPIAR SCRIPT'}
                </button>
                <a 
                  href="/doc/team_manager.py"
                  download="team_manager.py"
                  className="px-4 py-2 rounded-xl text-[10px] font-bold tracking-wider flex items-center gap-1.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-all border border-fuchsia-600 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                >
                  <Download size={12} /> DESCARGAR SCRIPT
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 4: Stepper visual "Cómo usarlo" */}
          <section className="mb-16">
            <div className="mb-8">
              <span className="font-label text-[10px] tracking-[0.2em] text-fuchsia-400 uppercase font-black block mb-2">Instrucciones de Despliegue</span>
              <h2 className="font-headline text-3xl font-bold text-white">Guía de Inicio Rápido</h2>
              <p className="text-gray-400 text-sm mt-1">
                Sigue estos sencillos pasos para activar el equipo inteligente de Alejabot en tu proyecto local.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Inicializar el Entorno',
                  desc: 'Pídele a Antigravity en el chat: "Usa la habilidad de Multi-Agente para inicializar el proyecto". Se creará la carpeta oculta de comunicación y tareas.'
                },
                {
                  step: '02',
                  title: 'Asignar Tareas',
                  desc: 'El Director (Alejabot) dividirá el trabajo. Abre terminales nuevas en local o en subagentes paralelos para encarnar los roles necesarios.'
                },
                {
                  step: '03',
                  title: 'Modo de Planificación',
                  desc: 'Los agentes enviarán sus planes detallados a Alejabot antes de editar código. La coordinación y los semáforos aseguran un resultado libre de bugs.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-3xl font-black text-slate-800 font-mono tracking-tight select-none">
                    {item.step}
                  </div>
                  <h3 className="font-headline text-md font-bold text-white mb-3 pt-4">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Back link */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-8 mt-12">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-xs font-bold tracking-wider uppercase"
            >
              <ArrowLeft size={14} /> VOLVER A RECURSOS
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 hover:text-white uppercase transition-colors"
            >
              Proponer otra skill <ArrowRight size={14} />
            </Link>
          </div>

          {/* Newsletter banner */}
          <NewsletterForm variant="banner" source="skill_detail" className="mt-20" />
        </main>
      </div>
    );
  }

  // STANDARD RESOURCE DETAIL PAGE RENDER
  const publishedDateFormatted = publishedDate ? format(new Date(publishedDate), "d 'de' MMMM, yyyy", { locale: es }) : 'Mayo 2026';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.description,
    image: resource.image ? [resource.image] : [],
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Organization',
      name: resource.author || 'SEO Growthers',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEO Growthers',
      logo: { '@type': 'ImageObject', url: 'https://seogrowthers.com/logo.webp' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>{resource.title} | SEO Growthers</title>
        <meta name="description" content={resource.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={resource.title} />
        <meta property="og:description" content={resource.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {resource.image && <meta property="og:image" content={resource.image} />}
        <meta property="og:site_name" content="SEO Growthers" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content={resource.title} />
        <meta name="twitter:description" content={resource.description} />
        {resource.image && <meta name="twitter:image" content={resource.image} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* Category badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
          </div>
          {resource.category && (
            <span className="text-xs font-bold tracking-widest text-primary uppercase">{resource.category}</span>
          )}
          {publishedDate && (
            <span className="text-xs text-gray-500 ml-auto">
              {publishedDateFormatted}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {resource.title}
        </h1>

        {/* Description */}
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-2xl">
          {resource.description}
        </p>

        {/* Cover image */}
        {resource.image && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-white/5">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full object-cover max-h-80"
            />
          </div>
        )}

        {/* Action card */}
        <div className="bg-[#1a1c1e] rounded-2xl p-8 border border-white/5 shadow-xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-headline text-xl font-bold text-white mb-2">
              {isDownloadable ? 'Descargar recurso' : externalLink ? 'Acceder al recurso' : 'Recurso digital'}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {resource.file_size && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">folder</span>
                  {resource.file_size}
                </span>
              )}
              {resource.file_type && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">description</span>
                  {resource.file_type.toUpperCase()}
                </span>
              )}
              {resource.downloads != null && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">download</span>
                  {resource.downloads.toLocaleString()} descargas
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={incrementDownloads}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/80 transition-all"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Abrir
              </a>
            )}
            {isDownloadable && resource.link && (
              <a
                href={resource.link}
                download
                onClick={incrementDownloads}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/80 transition-all"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Descargar
              </a>
            )}
            {!externalLink && !isDownloadable && (
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition-all border border-white/10"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Ver más recursos
              </Link>
            )}
          </div>
        </div>

        {/* Author */}
        {resource.author && (
          <div className="flex items-center gap-3 mb-12 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Publicado por</p>
              <p className="text-white font-medium">{resource.author}</p>
            </div>
          </div>
        )}

        {/* Back link */}
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-bold tracking-wider mb-16"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          VOLVER A RECURSOS
        </Link>

        {/* Newsletter */}
        <NewsletterForm variant="banner" source="resource_detail" className="mt-8" />
      </main>
    </div>
  );
};

export default ResourceDetailPage;
