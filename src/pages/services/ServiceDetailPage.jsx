import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { ArrowRight, CheckCircle2, Sparkles, Shield, Rocket, HelpCircle } from 'lucide-react';

const SERVICE_MAP = {
  'seo-audit': {
    redirect: '/auditoria-seo-gratis'
  },
  'growth-hacking': {
    title: 'Growth Hacking y Crecimiento Acelerado',
    metaTitle: 'Servicio de Growth Hacking | SEO Growthers',
    description: 'Estrategias cuantitativas de crecimiento rápido, optimización de embudos y experimentación continua para escalar tu negocio digital.',
    features: [
      'Experimentación A/B continua en embudos de conversión',
      'Optimización de tasa de conversión (CRO)',
      'Adquisición multicanal orientada a ROI',
      'Automatización de retención y secuencias de usuarios',
      'Analítica avanzada y atribuición de métricas clave'
    ],
    icon: 'rocket_launch'
  },
  'consulting': {
    title: 'Consultoría Digital y Estrategia SEO/IA',
    metaTitle: 'Consultoría Digital y Estrategia IA | SEO Growthers',
    description: 'Asesoramiento estratégico personalizado para empresas que buscan transformar sus procesos digitales e integrar Inteligencia Artificial.',
    features: [
      'Auditoría técnica y arquitectónica completa',
      'Roadmap de transformación digital e IA',
      'Capacitación e integración para equipos internos',
      'Optimización de presupuesto de marketing y tecnología',
      'Acompañamiento mensual y revisión de OKRs'
    ],
    icon: 'psychology'
  }
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const serviceInfo = SERVICE_MAP[slug?.toLowerCase()];

  if (serviceInfo?.redirect) {
    return <Navigate to={serviceInfo.redirect} replace />;
  }

  const title = serviceInfo?.title || `Servicio de ${slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Consultoría'}`;
  const metaTitle = serviceInfo?.metaTitle || `${title} | SEO Growthers`;
  const description = serviceInfo?.description || `Descubre nuestro servicio profesional de ${title}. Estrategias avanzadas para escalar tu negocio digital.`;
  const canonicalUrl = `https://seogrowthers.com/services/${slug || ''}`;

  const features = serviceInfo?.features || [
    'Auditoría y análisis técnico profundo',
    'Estrategia personalizada adaptada a tu industria',
    'Implementación con estándares modernos de velocidad y SEO',
    'Soporte continuo y reporte de rendimiento'
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Servicios', path: '/services' },
          { label: title, path: `/services/${slug}` }
        ]} />

        {/* Hero Section */}
        <div className="mt-8 bg-surface-variant/40 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <span className="material-symbols-outlined text-5xl text-primary mb-4 block">
            {serviceInfo?.icon || 'insights'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-primary text-black font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Solicitar Cotización <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="bg-white/5 border border-white/10 text-white font-medium px-6 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-surface-variant/20 border border-white/5 p-6 rounded-xl flex items-start gap-4 hover:border-primary/30 transition-all">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{feature}</h3>
                <p className="text-gray-400 text-sm">Diseñado para maximizar resultados y retorno de inversión.</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border border-primary/30 p-8 rounded-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">¿Listo para impulsar tu proyecto?</h3>
            <p className="text-gray-300">Agenda una sesión diagnóstica sin costo con nuestros especialistas.</p>
          </div>
          <Link
            to="/auditoria-seo-gratis"
            className="bg-primary text-black font-bold px-6 py-3 rounded-xl hover:bg-primary/90 whitespace-nowrap transition-colors"
          >
            Auditoría SEO Gratis
          </Link>
        </div>

        <NewsletterForm variant="banner" source={`service_${slug}`} className="mt-16" />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
