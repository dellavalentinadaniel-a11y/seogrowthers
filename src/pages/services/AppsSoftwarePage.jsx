import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackCTAClick } from '@/lib/analytics';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-outline/10 bg-surface-variant/10 backdrop-blur-md overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left group">
        <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors pr-4">{faq.question}</h3>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="px-5 text-on-surface-variant leading-relaxed text-sm">{faq.answer}</p>
      </div>
    </div>
  );
};

const faqs = [
  { question: "¿Qué tipos de aplicaciones desarrollan?", answer: "Desarrollamos aplicaciones móviles nativas (iOS y Android), aplicaciones web progresivas (PWA), plataformas SaaS, sistemas de gestión internos, dashboards personalizados y herramientas empresariales a medida. Cada proyecto se diseña según las necesidades específicas de tu negocio." },
  { question: "¿Cuánto tiempo toma desarrollar una aplicación?", answer: "Depende de la complejidad. Una app MVP puede estar lista en 6-8 semanas. Aplicaciones con funcionalidades avanzadas (pagos, geolocalización, IA integrada) entre 3 y 5 meses. Siempre arrancamos con un prototipo validado para minimizar riesgos." },
  { question: "¿Qué tecnologías utilizan?", answer: "Para apps móviles: React Native y Flutter para desarrollo multiplataforma, Swift y Kotlin para nativo puro. Para software web: React, Next.js, Node.js y PostgreSQL. Usamos arquitecturas escalables en la nube (AWS, GCP, Supabase) para garantizar rendimiento." },
  { question: "¿Incluyen mantenimiento y soporte post-lanzamiento?", answer: "Sí. Todos nuestros proyectos incluyen 3 meses de soporte post-lanzamiento con corrección de bugs, actualizaciones de seguridad y optimización de rendimiento. Ofrecemos planes de mantenimiento continuo para iteraciones y nuevas funcionalidades." },
  { question: "¿Puedo integrar mi app con sistemas que ya uso?", answer: "Absolutamente. Desarrollamos integraciones con APIs de terceros, CRMs (HubSpot, Salesforce), pasarelas de pago (Mercado Pago, Stripe), ERPs, sistemas de facturación y cualquier herramienta que tu negocio necesite conectar." },
];

const solutions = [
  { icon: "phone_iphone", title: "Apps Móviles", desc: "Aplicaciones nativas y multiplataforma con experiencia de usuario premium. Publicación en App Store y Google Play incluida.", tag: "Mobile" },
  { icon: "web", title: "Plataformas SaaS", desc: "Software como servicio escalable, con suscripciones, multi-tenancy, dashboards y analytics integrados desde el día uno.", tag: "Cloud" },
  { icon: "dashboard_customize", title: "Sistemas de Gestión", desc: "ERPs, CRMs y herramientas internas personalizadas que se adaptan a tu flujo de trabajo, no al revés.", tag: "Enterprise" },
  { icon: "api", title: "APIs & Integraciones", desc: "Conectamos tus sistemas existentes. APIs REST y GraphQL robustas, documentadas y listas para escalar.", tag: "Backend" },
  { icon: "shopping_cart", title: "Marketplaces", desc: "Plataformas de comercio multi-vendor con gestión de vendedores, pagos split y logística integrada.", tag: "E-Commerce" },
  { icon: "smart_toy", title: "Software con IA", desc: "Aplicaciones potenciadas con inteligencia artificial: recomendaciones, procesamiento de lenguaje natural y visión computacional.", tag: "IA" },
];

const AppsSoftwarePage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Desarrollo de Apps y Software a Medida | Apps Móviles, SaaS y Sistemas | SEO Growthers</title>
        <meta name="description" content="Desarrollamos aplicaciones móviles, software a medida, plataformas SaaS y sistemas empresariales. De la idea al producto funcional con tecnología de punta. Consultá gratis." />
        <link rel="canonical" href="https://seogrowthers.com/services/apps-software" />
        <meta property="og:title" content="Desarrollo de Apps y Software a Medida | SEO Growthers" />
        <meta property="og:description" content="Apps móviles, plataformas SaaS y software empresarial a medida. Desarrollo con React Native, Flutter y arquitecturas cloud escalables." />
        <meta property="og:url" content="https://seogrowthers.com/services/apps-software" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="desarrollo apps, software a medida, aplicaciones moviles, desarrollo saas, apps react native, flutter argentina, software empresarial, desarrollo aplicaciones" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Desarrollo de Apps y Software a Medida",
          "description": "Servicio de desarrollo de aplicaciones móviles, plataformas SaaS, sistemas de gestión y software empresarial personalizado.",
          "provider": {
            "@type": "ProfessionalService",
            "name": "SEO Growthers",
            "url": "https://seogrowthers.com",
            "telephone": "+54 9 2995504783"
          },
          "areaServed": [
            { "@type": "Country", "name": "Argentina" },
            { "@type": "Country", "name": "España" }
          ],
          "serviceType": "Desarrollo de Software"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
        })}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20 text-center">
          <span className="font-label text-xs tracking-[0.2em] text-purple-400 uppercase mb-4 block">Apps Personalizadas · Software a Medida</span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface tracking-tight mb-6">
            Apps & Software <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">a Medida</span>
          </h1>
          <p className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
            Convertimos tu idea en un producto digital funcional. Aplicaciones móviles, plataformas SaaS y software empresarial diseñados para escalar con tu negocio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" onClick={() => trackCTAClick('apps_hero', '/contact')} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl text-sm tracking-wider hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Consultá sobre tu proyecto
            </Link>
            <a href="#soluciones" className="px-8 py-4 border border-purple-400/30 text-purple-400 font-bold rounded-xl text-sm tracking-wider hover:bg-purple-500/10 transition-all">
              Ver Soluciones
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50+", label: "Proyectos entregados" },
            { value: "99.9%", label: "Uptime garantizado" },
            { value: "4.9★", label: "Satisfacción promedio" },
            { value: "6-8", label: "Semanas para MVP" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <p className="font-headline text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.value}</p>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Solutions */}
        <section className="mb-20" id="soluciones">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            ¿Qué podemos construir para vos?
          </h2>
          <p className="text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
            Soluciones de software para cada necesidad, desde apps móviles hasta plataformas empresariales completas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div key={sol.title} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-purple-400/20 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <span className="material-symbols-outlined text-purple-400 text-3xl group-hover:scale-110 transition-transform">{sol.icon}</span>
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full uppercase tracking-wider">{sol.tag}</span>
                </div>
                <h3 className="font-headline font-bold text-on-surface mb-2 text-lg">{sol.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-12">
            Nuestro proceso de desarrollo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Analizamos tu idea, definimos alcance, arquitectura técnica y diseñamos wireframes validados con usuarios reales.", icon: "lightbulb" },
              { step: "02", title: "Diseño UX/UI", desc: "Creamos prototipos interactivos con diseño premium. Cada pantalla se testea antes de escribir una línea de código.", icon: "palette" },
              { step: "03", title: "Desarrollo", desc: "Sprints de 2 semanas con demos. Código limpio, testing automatizado y CI/CD para entregas continuas.", icon: "code" },
              { step: "04", title: "Lanzamiento", desc: "Deploy en producción, publicación en stores, monitoreo 24/7 y soporte dedicado post-lanzamiento.", icon: "rocket_launch" },
            ].map((p) => (
              <div key={p.step} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-400/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-400 text-2xl">{p.icon}</span>
                </div>
                <span className="font-headline text-sm font-bold text-purple-400/50 block mb-2">PASO {p.step}</span>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-3">{p.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            Tecnologías que dominamos
          </h2>
          <p className="text-on-surface-variant text-center max-w-xl mx-auto mb-10">
            Elegimos la herramienta correcta para cada proyecto, priorizando rendimiento y escalabilidad.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "React Native", category: "Mobile" },
              { name: "Flutter", category: "Mobile" },
              { name: "React / Next.js", category: "Frontend" },
              { name: "Node.js", category: "Backend" },
              { name: "PostgreSQL", category: "Database" },
              { name: "Supabase", category: "BaaS" },
              { name: "AWS / GCP", category: "Cloud" },
              { name: "Docker", category: "DevOps" },
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-center hover:border-purple-400/20 transition-all">
                <p className="font-headline font-bold text-sm text-on-surface">{tech.name}</p>
                <p className="text-[10px] text-purple-400/70 uppercase tracking-wider mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </section>

        <InternalLinkingCTA variant="contact" />

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            Preguntas frecuentes sobre desarrollo de apps
          </h2>
          <p className="text-on-surface-variant text-center max-w-xl mx-auto mb-10">
            Todo lo que necesitás saber antes de arrancar tu proyecto.
          </p>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </section>

        <InternalLinkingCTA variant="seo" />
      </main>
    </div>
  );
};

export default AppsSoftwarePage;
