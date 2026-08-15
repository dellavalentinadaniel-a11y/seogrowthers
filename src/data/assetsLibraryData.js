export const assetCategories = [
  { id: "all", label: "Todos los Recursos", count: 36 },
  { id: "3d-icons", label: "Iconos 3D & Renders", count: 10 },
  { id: "brand-logos", label: "Logos & Marcas", count: 8 },
  { id: "ui-icons", label: "Iconos UI (Lucide)", count: 24 },
  { id: "photos", label: "Fotografías & Fondos", count: 8 },
  { id: "videos", label: "Videos & Reels", count: 5 }
];

export const assetItems = [
  // 1. ICONOS 3D & RENDERS
  {
    id: "3d-google-ads",
    title: "Google Ads 3D Render",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/google-ads-3d.jpg",
    tags: ["google", "ads", "sem", "3d", "marketing"],
    codeSnippet: `<img src="/images/marketing/icons/google-ads-3d.jpg" alt="Google Ads 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-meta-ads",
    title: "Meta Ads / Infinity 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/meta-ads-3d.jpg",
    tags: ["meta", "facebook", "instagram", "ads", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/meta-ads-3d.jpg" alt="Meta Ads 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-landing-page",
    title: "Landing Page & UI 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/landing-page-3d.jpg",
    tags: ["landing", "web", "conversion", "3d", "ui"],
    codeSnippet: `<img src="/images/marketing/icons/landing-page-3d.jpg" alt="Landing Page 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-report-graph",
    title: "Stylized Growth Graph 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/report-graph-3d.jpg",
    tags: ["analytics", "grafico", "crecimiento", "reporte", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/report-graph-3d.jpg" alt="Reporte 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-handshake",
    title: "Strategic Handshake 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/strategic-handshake-3d.jpg",
    tags: ["handshake", "alianza", "estrategia", "acuerdo", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/strategic-handshake-3d.jpg" alt="Handshake 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-percentage",
    title: "Glossy Blue Percentage 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/percentage-3d.jpg",
    tags: ["descuento", "porcentaje", "oferta", "conversion", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/percentage-3d.jpg" alt="Percentage 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-tech-icon-1",
    title: "Abstract Digital Sphere 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/icon-1.jpg",
    tags: ["esfera", "futurista", "tecnologia", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/icon-1.jpg" alt="Tech Sphere 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-tech-icon-2",
    title: "Cyber Cube / Matrix 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/icon-2.jpg",
    tags: ["cubo", "data", "nodo", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/icon-2.jpg" alt="Cyber Cube 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-tech-icon-3",
    title: "Prism & Geometry 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/icon-3.jpg",
    tags: ["prisma", "render", "cristal", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/icon-3.jpg" alt="Prism 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },
  {
    id: "3d-tech-icon-4",
    title: "Quantum Helix 3D",
    category: "3d-icons",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/icon-4.jpg",
    tags: ["helix", "adn", "algoritmo", "3d"],
    codeSnippet: `<img src="/images/marketing/icons/icon-4.jpg" alt="Quantum Helix 3D" className="w-16 h-16 object-cover rounded-2xl" />`
  },

  // 2. LOGOS DE MARCA & TECH
  {
    id: "logo-seogrowthers-kiwi",
    title: "Logo SEO Growthers (Kiwi Shield)",
    category: "brand-logos",
    type: "image",
    format: "PNG",
    path: "/logo_kiwi.png",
    tags: ["seogrowthers", "brand", "logo", "escudo"],
    codeSnippet: `<img src="/logo_kiwi.png" alt="SEO Growthers" className="h-10 w-auto" />`
  },
  {
    id: "logo-seogrowthers-official",
    title: "Logo Oficial Isotipo",
    category: "brand-logos",
    type: "image",
    format: "PNG",
    path: "/images/logo_official.png",
    tags: ["seogrowthers", "brand", "official", "logo"],
    codeSnippet: `<img src="/images/logo_official.png" alt="SEO Growthers Oficial" className="h-10 w-auto" />`
  },
  {
    id: "logo-seogrowthers-transparent",
    title: "Logo Tipografía Sin Fondo",
    category: "brand-logos",
    type: "image",
    format: "WEBP",
    path: "/images/iconos/logoletrassinfondo.webp",
    tags: ["seogrowthers", "letras", "sin fondo", "navbar"],
    codeSnippet: `<img src="/images/iconos/logoletrassinfondo.webp" alt="SEO Growthers Wordmark" className="h-8 w-auto" />`
  },
  {
    id: "logo-google",
    title: "Google Official Multicolor SVG",
    category: "brand-logos",
    type: "svg-component",
    format: "SVG",
    tags: ["google", "search", "ads", "tech"],
    codeSnippet: `<svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>`
  },
  {
    id: "logo-instagram-gradient",
    title: "Instagram Gradient Icon",
    category: "brand-logos",
    type: "svg-component",
    format: "SVG",
    tags: ["instagram", "social", "meta", "reel"],
    codeSnippet: `<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FEDA77] via-[#D62976] to-[#4F5BD5] flex items-center justify-center p-1.5"><svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2"/><circle cx="18" cy="6" r="1.2" fill="white"/></svg></div>`
  },
  {
    id: "logo-facebook",
    title: "Facebook Blue Icon",
    category: "brand-logos",
    type: "svg-component",
    format: "SVG",
    tags: ["facebook", "meta", "social", "ads"],
    codeSnippet: `<div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>`
  },
  {
    id: "logo-youtube",
    title: "YouTube Red Icon",
    category: "brand-logos",
    type: "svg-component",
    format: "SVG",
    tags: ["youtube", "video", "social", "streaming"],
    codeSnippet: `<div className="w-8 h-8 rounded-xl bg-[#FF0000] flex items-center justify-center text-white"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></div>`
  },
  {
    id: "logo-linkedin",
    title: "LinkedIn Corporate Blue Icon",
    category: "brand-logos",
    type: "svg-component",
    format: "SVG",
    tags: ["linkedin", "b2b", "social", "networking"],
    codeSnippet: `<div className="w-8 h-8 rounded-xl bg-[#0077B5] flex items-center justify-center text-white"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></div>`
  },

  // 3. FOTOGRAFÍAS & FONDOS
  {
    id: "photo-office-presentation",
    title: "Office Strategic Presentation",
    category: "photos",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/office-presentation.jpg",
    tags: ["oficina", "presentacion", "estrategia", "equipo", "consultoria"],
    codeSnippet: `<img src="/images/marketing/icons/office-presentation.jpg" alt="Presentación Estratégica" className="w-full h-64 object-cover rounded-3xl" />`
  },
  {
    id: "photo-office-team",
    title: "Collaborative Team Workshop",
    category: "photos",
    type: "image",
    format: "JPG",
    path: "/images/marketing/icons/office-team-meeting.jpg",
    tags: ["equipo", "reunion", "workshop", "coworking"],
    codeSnippet: `<img src="/images/marketing/icons/office-team-meeting.jpg" alt="Reunión de Equipo" className="w-full h-64 object-cover rounded-3xl" />`
  },
  {
    id: "photo-man-cutout",
    title: "Professional Executive Cutout",
    category: "photos",
    type: "image",
    format: "JPG",
    path: "/images/marketing/man-cutout.jpg",
    tags: ["consultor", "persona", "ejecutivo", "cutout"],
    codeSnippet: `<img src="/images/marketing/man-cutout.jpg" alt="Consultor SEO" className="w-40 h-56 object-cover" />`
  },
  {
    id: "photo-global-bg",
    title: "Site Global Textured Background",
    category: "photos",
    type: "image",
    format: "WEBP",
    path: "/images/fondo/site-background.webp",
    tags: ["fondo", "textura", "dark", "grid", "background"],
    codeSnippet: `background-image: linear-gradient(rgba(12, 13, 13, 0.88), rgba(12, 13, 13, 0.88)), url('/images/fondo/site-background.webp');`
  },
  {
    id: "photo-aluvalle-showcase",
    title: "Caso de Éxito Aluvalle Showcase",
    category: "photos",
    type: "image",
    format: "WEBP",
    path: "/images/aluvalle-showcase.webp",
    tags: ["aluvalle", "mockup", "caso", "ecommerce"],
    codeSnippet: `<img src="/images/aluvalle-showcase.webp" alt="Aluvalle Showcase" className="w-full rounded-2xl" />`
  },
  {
    id: "photo-seo-platform",
    title: "SEO Platform SaaS Showcase",
    category: "photos",
    type: "image",
    format: "WEBP",
    path: "/images/seo-platform-showcase.webp",
    tags: ["seo", "plataforma", "saas", "dashboard"],
    codeSnippet: `<img src="/images/seo-platform-showcase.webp" alt="SEO Platform" className="w-full rounded-2xl" />`
  },
  {
    id: "photo-edv-hero",
    title: "EDV Remolques Hero Banner",
    category: "photos",
    type: "image",
    format: "WEBP",
    path: "/images/edv-remolques-hero.webp",
    tags: ["edv", "industrial", "remolques", "web"],
    codeSnippet: `<img src="/images/edv-remolques-hero.webp" alt="EDV Remolques" className="w-full rounded-2xl" />`
  },
  {
    id: "photo-tech-grid",
    title: "Fondo Tecnológico Abstracto",
    category: "photos",
    type: "image",
    format: "PNG",
    path: "/images/iconos/fondo-tecnologico-moderno.png",
    tags: ["tech", "cyber", "grid", "fondo"],
    codeSnippet: `<img src="/images/iconos/fondo-tecnologico-moderno.png" alt="Fondo Tech" className="w-full rounded-2xl" />`
  },

  // 4. VIDEOS & MULTIMEDIA
  {
    id: "video-marketing-bg",
    title: "Marketing Hero Cyber Background Video",
    category: "videos",
    type: "video",
    format: "MP4",
    path: "/videos/marketing-bg.mp4",
    tags: ["video", "hero", "fondo", "cyber", "animacion"],
    codeSnippet: `<video autoPlay loop muted playsInline className="w-full h-full object-cover"><source src="/videos/marketing-bg.mp4" type="video/mp4" /></video>`
  },
  {
    id: "reel-seogrowthers-promo",
    title: "Reel: SEO Growthers Promo",
    category: "videos",
    type: "video",
    format: "MP4",
    path: "/videos/reels/seogrowthers_promo.mp4",
    tags: ["reel", "instagram", "video", "promo"],
    codeSnippet: `<video autoPlay loop muted playsInline className="w-full aspect-[9/16] object-cover rounded-2xl"><source src="/videos/reels/seogrowthers_promo.mp4" type="video/mp4" /></video>`
  },
  {
    id: "reel-promocion-servicios",
    title: "Reel: Promoción de Servicios & Pauta",
    category: "videos",
    type: "video",
    format: "MP4",
    path: "/videos/reels/crea_un_video_promocionando_lo.mp4",
    tags: ["reel", "marketing", "pauta", "anuncio"],
    codeSnippet: `<video autoPlay loop muted playsInline className="w-full aspect-[9/16] object-cover rounded-2xl"><source src="/videos/reels/crea_un_video_promocionando_lo.mp4" type="video/mp4" /></video>`
  },
  {
    id: "reel-aluvalle",
    title: "Reel: Caso de Éxito Aluvalle",
    category: "videos",
    type: "video",
    format: "MP4",
    path: "/videos/reels/aluvalle_30s_HQ.mp4",
    tags: ["reel", "aluvalle", "cliente", "caso de exito"],
    codeSnippet: `<video autoPlay loop muted playsInline className="w-full aspect-[9/16] object-cover rounded-2xl"><source src="/videos/reels/aluvalle_30s_HQ.mp4" type="video/mp4" /></video>`
  },
  {
    id: "reel-chrons-gaming",
    title: "Reel: YouTube Chrons Gaming",
    category: "videos",
    type: "video",
    format: "MP4",
    path: "/videos/reels/chrons_30s_HQ.mp4",
    tags: ["reel", "youtube", "gaming", "produccion"],
    codeSnippet: `<video autoPlay loop muted playsInline className="w-full aspect-[9/16] object-cover rounded-2xl"><source src="/videos/reels/chrons_30s_HQ.mp4" type="video/mp4" /></video>`
  }
];

export const lucideUiIconsList = [
  { name: "Search", category: "marketing", import: "import { Search } from 'lucide-react';" },
  { name: "Target", category: "marketing", import: "import { Target } from 'lucide-react';" },
  { name: "Megaphone", category: "marketing", import: "import { Megaphone } from 'lucide-react';" },
  { name: "TrendingUp", category: "marketing", import: "import { TrendingUp } from 'lucide-react';" },
  { name: "BarChart3", category: "marketing", import: "import { BarChart3 } from 'lucide-react';" },
  { name: "PieChart", category: "marketing", import: "import { PieChart } from 'lucide-react';" },
  { name: "Users", category: "marketing", import: "import { Users } from 'lucide-react';" },
  { name: "PhoneCall", category: "marketing", import: "import { PhoneCall } from 'lucide-react';" },

  { name: "Code2", category: "tech", import: "import { Code2 } from 'lucide-react';" },
  { name: "Cpu", category: "tech", import: "import { Cpu } from 'lucide-react';" },
  { name: "Database", category: "tech", import: "import { Database } from 'lucide-react';" },
  { name: "Layout", category: "tech", import: "import { Layout } from 'lucide-react';" },
  { name: "Smartphone", category: "tech", import: "import { Smartphone } from 'lucide-react';" },
  { name: "Monitor", category: "tech", import: "import { Monitor } from 'lucide-react';" },
  { name: "Server", category: "tech", import: "import { Server } from 'lucide-react';" },
  { name: "Zap", category: "tech", import: "import { Zap } from 'lucide-react';" },

  { name: "Bot", category: "ai", import: "import { Bot } from 'lucide-react';" },
  { name: "Sparkles", category: "ai", import: "import { Sparkles } from 'lucide-react';" },
  { name: "Brain", category: "ai", import: "import { Brain } from 'lucide-react';" },
  { name: "Wand2", category: "ai", import: "import { Wand2 } from 'lucide-react';" },
  { name: "Terminal", category: "ai", import: "import { Terminal } from 'lucide-react';" },
  { name: "Activity", category: "ai", import: "import { Activity } from 'lucide-react';" },

  { name: "ShoppingCart", category: "ecommerce", import: "import { ShoppingCart } from 'lucide-react';" },
  { name: "Store", category: "ecommerce", import: "import { Store } from 'lucide-react';" },
  { name: "CreditCard", category: "ecommerce", import: "import { CreditCard } from 'lucide-react';" },
  { name: "PackageCheck", category: "ecommerce", import: "import { PackageCheck } from 'lucide-react';" },
  { name: "ShieldCheck", category: "ui", import: "import { ShieldCheck } from 'lucide-react';" },
  { name: "CheckCircle2", category: "ui", import: "import { CheckCircle2 } from 'lucide-react';" },
  { name: "ArrowRight", category: "ui", import: "import { ArrowRight } from 'lucide-react';" },
  { name: "Copy", category: "ui", import: "import { Copy } from 'lucide-react';" }
];
