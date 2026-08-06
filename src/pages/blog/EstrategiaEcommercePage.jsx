import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import GoogleBusinessReviews from '@/components/shared/GoogleBusinessReviews';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  ShoppingBag,
  HelpCircle,
  Plus,
  Minus,
  Download,
  Share2
} from 'lucide-react';

const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
      isOpen
        ? 'border-cyan-400/50 bg-slate-900/90 shadow-[0_0_25px_rgba(0,219,231,0.12)]'
        : 'border-white/10 bg-slate-950/60 hover:border-cyan-400/30'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <h3 className={`font-headline text-base md:text-lg font-bold pr-4 transition-colors ${
          isOpen ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
        }`}>
          {question}
        </h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isOpen ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-slate-400 group-hover:text-white'
        }`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-slate-300 leading-relaxed font-light text-sm md:text-base border-t border-white/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EstrategiaEcommercePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Estrategia SEO E-commerce: Migrá de MercadoShops a Tiendanube sin Perder Tráfico",
    "description": "¿Cierra MercadoShops? No pierdas tus ventas. Migramos tu tienda a Tiendanube manteniendo tu posicionamiento en Google. ¡Solicitá tu auditoría gratuita hoy!",
    "image": "https://seogrowthers.com/images/blog/estrategia_ecommerce_hero.png",
    "author": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://seogrowthers.com/logo.webp"
      }
    },
    "mainEntityOfPage": "https://seogrowthers.com/blog/seo/estrategia-seo-ecommerce-argentina-migracion-tiendanube",
    "datePublished": "2026-08-06",
    "inLanguage": "es-AR"
  };

  const articleFaqs = [
    {
      q: '¿Qué pasará cuando MercadoShops cierre a finales de 2025?',
      a: 'Mercado Libre discontinúa MercadoShops para impulsar "Mi Página", una solución restringida sin dominio propio ni control SEO. Si no realizás una migración estratégica hacia Tiendanube antes del cierre, perderás la autoridad acumulada en Google y el tráfico orgánico de tus productos.',
      defaultOpen: true
    },
    {
      q: '¿Cómo migrar de MercadoShops a Tiendanube sin perder posiciones en Google Argentina?',
      a: 'La clave radica en mapear las URLs originales e implementar redirecciones 301 masivas punto a punto hacia la nueva estructura en Tiendanube. Además, se debe inyectar marcado Schema.org de producto y optimizar los canónicos para evitar la canibalización.',
      defaultOpen: false
    },
    {
      q: '¿Por qué Tiendanube es la mejor alternativa de comercio electrónico en Argentina?',
      a: 'Tiendanube ofrece autonomía total sobre tu dominio propio, integraciones nativas con pasarelas de pago y envíos locales, y un control flexible sobre los metadatos SEO y etiquetas canónicas, lo que te permite posicionar palabras clave de alta intención sin depender 100% de la pauta publicitaria.',
      defaultOpen: false
    },
    {
      q: '¿Qué incluye la auditoría SEO técnica e-commerce de SEO Growthers?',
      a: 'Auditamos la velocidad de carga (Core Web Vitals), el control de filtros parametrizados para evitar contenido duplicado, la arquitectura de categorías, la indexabilidad móvil y la estrategia de enlazado interno para maximizar tus ventas orgánicas.',
      defaultOpen: false
    }
  ];

  const checklistItems = [
    "Revisar que no haya páginas repetidas que confundan a Google.",
    "Chequear que los títulos y descripciones que se ven en el buscador tengan el largo justo para que no se corten.",
    "Mirar en las herramientas de Google si hay páginas que no se están mostrando por algún error.",
    "Probar que la web cargue rápido en el celular, para que el cliente no se canse de esperar.",
    "Asegurarse de que Google entienda bien el precio y el stock de tus productos.",
    "Ver que las fotos se vean bien pero no pesen tanto como para frenar la web.",
    "Controlar que las herramientas extras (como chats) no hagan lenta la página de pago.",
    "Limpiar los links de productos que ya no vendés para que no den error.",
    "Confirmar que le enviamos a Google el 'mapa' (sitemap) actualizado de nuestra web.",
    "Ver que la conexión sea segura (certificado SSL activo) en todas partes.",
    "Hacer una compra de prueba para ver si el proceso es ágil desde un teléfono.",
    "Asegurarse de que estamos midiendo bien cuánta gente compra y desde dónde viene.",
    "Verificar que no le estemos prohibiendo a Google ver las fotos o el diseño de la web.",
    "Revisar que el camino de categorías (Breadcrumbs) se entienda bien.",
    "Tener un plan por si se acaba el stock durante las ofertas grandes (CyberMonday / Hot Sale)."
  ];

  return (
    <div className="text-slate-200 font-body min-h-screen bg-[#0d1515] selection:bg-cyan-500/30 selection:text-white relative">
      <Helmet>
        <title>Estrategia SEO E-commerce: Migrá de MercadoShops a Tiendanube | SEO Growthers</title>
        <meta name="description" content="¿Cierra MercadoShops? No pierdas tus ventas. Migramos tu tienda a Tiendanube manteniendo tu posicionamiento en Google. ¡Solicitá tu auditoría gratuita hoy!" />
        <link rel="canonical" href="https://seogrowthers.com/blog/seo/estrategia-seo-ecommerce-argentina-migracion-tiendanube" />
        <meta property="og:title" content="Estrategia SEO E-commerce: Migrá de MercadoShops a Tiendanube" />
        <meta property="og:description" content="Guía completa de migración estratégica e-commerce en Argentina sin perder tráfico orgánico en Google." />
        <meta property="og:image" content="https://seogrowthers.com/images/blog/estrategia_ecommerce_hero.png" />
        <meta property="og:url" content="https://seogrowthers.com/blog/seo/estrategia-seo-ecommerce-argentina-migracion-tiendanube" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,219,231,0.04)_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none" />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto relative z-10">
        <Breadcrumbs className="mb-6" />

        {/* HEADER DEL ARTÍCULO */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-md mb-6">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
              GUÍA COMPLETA • SEO E-COMMERCE ARGENTINA 2026
            </span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6">
            Plan de Acción: Cómo aparecer primero en Google y vender más en Argentina
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-slate-400 border-y border-white/10 py-4 font-mono">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <User className="w-4 h-4" /> SEO Growthers Team
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Agosto 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> 8 min de lectura
            </span>
          </div>
        </header>

        {/* IMAGEN DESTACADA PRINCIPAL */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(0,219,231,0.15)] relative">
          <img
            src="/images/blog/estrategia_ecommerce_hero.png"
            alt="Diagrama estratégico de migración de MercadoShops a Tiendanube conservando posicionamiento SEO en Argentina."
            className="w-full h-auto object-cover max-h-[550px]"
          />
        </div>

        {/* CONTENIDO DEL ARTÍCULO */}
        <article className="space-y-12 text-slate-300 leading-relaxed font-light text-base md:text-lg">
          
          {/* SECCIÓN 1 */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <span className="text-cyan-400 font-mono">01.</span> Qué está pasando hoy en el mercado argentino y cómo vamos a encararlo
            </h2>

            <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/images/blog/estrategia_ecommerce_migracion.jpg"
                alt="Diagrama estratégico de migración de MercadoShops a Tiendanube conservando posicionamiento SEO en Argentina."
                className="w-full h-auto object-cover"
              />
            </div>

            <p>
              El mundo de la <strong className="text-white font-semibold">venta online en Argentina</strong> está cambiando mucho y muy rápido. <strong className="text-cyan-400 font-semibold">Mercado Libre</strong> anunció que <strong className="text-amber-400 font-semibold">MercadoShops</strong> va a dejar de funcionar a finales de 2025, y esto cambia las reglas del juego para todos los que venden por internet. Ya no se trata solo de elegir una plataforma u otra, sino de entender cómo hacer para que la gente nos siga encontrando en este nuevo escenario.
            </p>

            <p>
              Al cerrar MercadoShops, Mercado Libre empuja a los vendedores a usar "Mi Página", un espacio que vive dentro de su propia plataforma pero que es mucho más limitado. Ahí, los dueños de negocios pierden el control sobre su marca: no pueden tener su propio dominio ni decidir cómo organizar su web para <strong className="text-white font-semibold">aparecer primeros en Google</strong>. Por eso, hay muchísimos negocios que hoy necesitan ayuda urgente para mudarse a otro lugar sin perder todo el camino que ya recorrieron con sus nombres y su presencia en buscadores.
            </p>

            <p>
              En medio de este escenario, <strong className="text-cyan-400 font-semibold">Tiendanube</strong> se convirtió en la opción número uno, con más de 180.000 marcas que ya la usan en la región. Si bien es una herramienta buenísima y fácil de usar, sacarle todo el jugo para que Google te quiera no es tan simple. Hay que saber configurar bien los filtros, las etiquetas y los textos para que la tienda realmente rinda al máximo.
            </p>
          </section>

          {/* SECCIÓN 2 */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <span className="text-cyan-400 font-mono">02.</span> Cómo vamos a organizar el contenido y la información
            </h2>

            <p>
              Nuestro objetivo es que la información sea facilísima de encontrar, tanto para tus clientes como para Google. No queremos que unas páginas se pisen con otras, sino que todo esté bien organizado. Por eso, armamos una "página principal" de servicios que muestra todo lo que sabemos hacer y, desde ahí, llevamos a los usuarios de la mano hacia secciones específicas donde resolvemos sus dudas.
            </p>

            <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/images/blog/estrategia_ecommerce_arquitectura.jpg"
                alt="Mapa de arquitectura de contenido SEO y estructura de landings para tiendas e-commerce."
                className="w-full h-auto object-cover"
              />
            </div>

            {/* SUBSECTION TIENDANUBE */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-cyan-400/30 space-y-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">LANDING A1 • /SERVICIOS/ECOMMERCE/TIENDANUBE</span>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-white">SEO para Tiendanube: Vendé más sin depender 100% de la pauta</h3>
              <p className="text-sm text-slate-300">
                La promesa de marca se sintetiza en escalar las ventas orgánicas sin gastar fortunas en anuncios. En Tiendanube, es habitual que se origine contenido duplicado por las URLs dinámicas asignadas a variables (talle, color, material). Aplicamos correctamente etiquetas <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded">rel="canonical"</code> hacia el producto raíz para eliminar la canibalización y acelerar la indexación.
              </p>
              <Link
                to="/services/ecommerce/tiendanube"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest pt-2"
              >
                <span>Ver Landing Específica de Tiendanube</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* SUBSECTION MERCADOSHOPS */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-amber-400/30 space-y-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">LANDING A2 • /SERVICIOS/ECOMMERCE/MERCADOSHOPS</span>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-white">Migración de MercadoShops: Cambiá de plataforma sin errores</h3>
              <p className="text-sm text-slate-300">
                El mensaje es directo: hacé que tu negocio aparezca en Google y mantené tus productos sincronizados con Mercado Libre. Explicamos cómo migrar la autoridad SEO con redirecciones 301 masivas punto a punto para que no aparezcan errores 404 que arruinen tu posicionamiento.
              </p>
              <Link
                to="/services/ecommerce/mercadoshops"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 uppercase tracking-widest pt-2"
              >
                <span>Ver Landing de Migración MercadoShops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* SECCIÓN 3: TABLA COMPARATIVA */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <span className="text-cyan-400 font-mono">03.</span> Comparación: ¿Qué tan fácil es aparecer en Google con cada opción?
            </h2>

            <div className="overflow-x-auto my-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <table className="w-full text-left text-xs md:text-sm text-slate-300">
                <thead className="bg-slate-950 text-white font-mono text-xs uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">Criterio SEO / Técnico</th>
                    <th className="p-4 text-cyan-400">Tiendanube (SaaS)</th>
                    <th className="p-4 text-amber-400">Legacy MercadoShops</th>
                    <th className="p-4 text-slate-400">Mercado Libre ("Mi Página")</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light">
                  <tr>
                    <td className="p-4 font-bold text-white">Dominio Propio</td>
                    <td className="p-4 text-emerald-400 font-semibold">Total. Propiedad absoluta de la autoridad acumulada.</td>
                    <td className="p-4 text-amber-400">Parcial. Vínculo cerrado hasta cierre 2025.</td>
                    <td className="p-4 text-rose-400">Inexistente. Subdominio dentro de MELI.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Gestión de Canónicas</td>
                    <td className="p-4 text-emerald-400 font-semibold">Editable mediante código Twig en layout.tpl.</td>
                    <td className="p-4">Autogenerada de forma rígida.</td>
                    <td className="p-4">Controlada 100% por algoritmo de MELI.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Límite Metadatos</td>
                    <td className="p-4">Configurable (Title 60 char / Desc 160 char).</td>
                    <td className="p-4">Campos rígidos predeterminados.</td>
                    <td className="p-4 text-rose-400">Basado en título de publicación. Sin meta desc.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Schema Markup</td>
                    <td className="p-4 text-emerald-400 font-semibold">Marcado Product, Offer y BreadcrumbList manual/app.</td>
                    <td className="p-4">Estructura rígida.</td>
                    <td className="p-4">Administrado centralizadamente por MELI.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Core Web Vitals & WPO</td>
                    <td className="p-4 text-emerald-400 font-semibold">Alto. Carga diferida via LS.ready.then.</td>
                    <td className="p-4">Nulo. Scripts impuestos por servidor.</td>
                    <td className="p-4 text-rose-400">Nulo. Dependencia total del servidor de MELI.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECCIÓN 4: INTERLINKING Y RECURSO PDF */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <span className="text-cyan-400 font-mono">04.</span> Estrategia de Leads: Checklist 15 Puntos CyberMonday
            </h2>

            <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/images/blog/estrategia_ecommerce_embudo.jpg"
                alt="Embudo de conversión y nutrición de leads para captación de clientes en tiendas online."
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-cyan-400/40 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
                <Download className="w-5 h-5" />
                <span>Asset Descargable Exclusivo</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white">
                Guía de 15 puntos para revisar tu tienda antes del CyberMonday / Hot Sale
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300 font-light">
                {checklistItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20solicitar%20la%20Guia%20Checklist%20SEO%20CyberMonday"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('checklist_cybermonday_pdf')}
                  className="bg-cyan-400 text-slate-950 font-mono font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  Solicitar Checklist por WhatsApp
                </a>
                <Link
                  to="/auditoria-seo-gratis"
                  className="border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl bg-white/5 hover:border-cyan-400 hover:text-cyan-400 transition-all"
                >
                  Auditoría Express de 5 Minutos
                </Link>
              </div>
            </div>
          </section>

          {/* SECCIÓN 5: HOJA DE RUTA 30 DÍAS */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3 border-b border-cyan-500/20 pb-3">
              <span className="text-cyan-400 font-mono">05.</span> Plan de Ejecución Paso a Paso en 30 Días
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400">SEMANA 1</span>
                <h4 className="font-bold text-white text-base">Diseño & Contenidos</h4>
                <p className="text-xs text-slate-400">Bocetos funcionales (wireframes), redacción de copys comerciales y preparación de metadatos adaptados a Tiendanube.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400">SEMANA 2</span>
                <h4 className="font-bold text-white text-base">Despliegue & SEO Técnico</h4>
                <p className="text-xs text-slate-400">Configuración de URLs, marcado Schema.org de producto, redirecciones 301 masivas y optimización WPO PageSpeed &gt; 85.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400">SEMANA 3</span>
                <h4 className="font-bold text-white text-base">Blog & Analítica GA4</h4>
                <p className="text-xs text-slate-400">Publicación de artículos de soporte en el blog, enlazado interno cruzado y medición de eventos de conversión en GA4.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400">SEMANA 4</span>
                <h4 className="font-bold text-white text-base">Link Building & Difusión</h4>
                <p className="text-xs text-slate-400">Difusión en comunidades locales de e-commerce, adquisición de backlinks de autoridad y captación de clientes de alto valor.</p>
              </div>
            </div>
          </section>

          {/* GOOGLE BUSINESS REVIEWS CAROUSEL & CTA */}
          <GoogleBusinessReviews />

          {/* PREGUNTAS FRECUENTES PARA POSICIONAMIENTO */}
          <section className="py-12 border-t border-white/10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
                PREGUNTAS FRECUENTES
              </div>
              <h2 className="font-headline text-3xl md:text-4xl font-black text-white">
                Resolución de Dudas Frecuentes de Migración
              </h2>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {articleFaqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} defaultOpen={faq.defaultOpen} />
              ))}
            </div>
          </section>

        </article>

        {/* CTA FINAL */}
        <section className="mt-16 text-center p-10 md:p-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/60 via-slate-900 to-slate-900 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white">
              ¿Listo para migrar tu tienda a Tiendanube sin perder ventas?
            </h2>
            <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
              Solicitá hoy tu consultoría SEO e-commerce en Argentina y asegurá la transición de tu negocio antes del cierre de MercadoShops.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20consultar%20por%20la%20migracion%20de%20MercadoShops%20a%20Tiendanube"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('bottom_article_migracion_cta')}
                className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-mono font-black px-8 py-4 rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-cyan-400/20 hover:scale-105 transition-all"
              >
                Consultar por WhatsApp
              </a>
              <Link
                to="/contact"
                className="border border-white/20 text-white font-mono font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-xs hover:border-cyan-400 hover:text-cyan-400 transition-all bg-white/5"
              >
                Formulario de Contacto
              </Link>
            </div>
          </div>
        </section>

        <InternalLinkingCTA variant="blog" />
      </main>
    </div>
  );
};

export default EstrategiaEcommercePage;
