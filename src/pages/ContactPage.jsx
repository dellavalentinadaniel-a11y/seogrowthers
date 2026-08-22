import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadQualifierForm from '@/components/contact/LeadQualifierForm';
import ContactFAQ from '@/components/contact/ContactFAQ';
import SuccessCasesCarousel from '@/components/home/SuccessCasesCarousel';
import { trackWhatsAppClick } from '@/lib/analytics';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const contactPageSchema = {

    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacta con SEO Growthers",
    "description": "Ponte en contacto con nuestra agencia digital en Neuquén. Respuesta en 24hs. ¡Iniciemos tu proyecto hoy!",
    "url": "https://seogrowthers.com/contacto",
    "mainEntity": {
      "@type": "ContactPoint",
      "telephone": "+54 (299)25504783",
      "contactType": "sales",
      "email": "seogrowthers@gmail.com",
      "areaServed": ["Neuquén", "Argentina", "Latinoamérica"],
      "availableLanguage": ["Spanish", "English"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SEO Growthers",
    "image": "https://seogrowthers.com/logo_kiwi.png",
    "description": "Agencia digital especializada en desarrollo web, SEO y automatización con IA",
    "telephone": "+54 (299)25504783",
    "email": "seogrowthers@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "El manzano 2115 Neuquen Capital",
      "addressLocality": "Neuquén",
      "addressRegion": "Neuquén",
      "postalCode": "8300",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-38.9517",
      "longitude": "-68.0591"
    },
    "sameAs": [
      "https://www.facebook.com/seogrowthers",
      "https://www.linkedin.com/company/seogrowthers",
      "https://www.instagram.com/seogrowthers/",
      "https://x.com/SEOGrowthers",
      "https://www.youtube.com/@seogrowthers-s4r"
    ],
    "areaServed": ["Neuquén", "Argentina", "Latinoamérica"],
    "priceRange": "$$"
  };

  return (
    <div className="text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Contacta con SEO Growthers - Desarrollo Web y SEO en Neuquén</title>
        <meta name="description" content="Ponte en contacto con nuestra agencia digital en Neuquén. Respuesta en 24hs. ¡Iniciemos tu proyecto hoy!" />
        <link rel="canonical" href="https://seogrowthers.com/contacto" />
        <meta property="og:title" content="Contacta con SEO Growthers - Desarrollo Web y SEO en Neuquén" />
        <meta property="og:description" content="Ponte en contacto con nuestra agencia digital en Neuquén. Respuesta en 24hs. ¡Iniciemos tu proyecto hoy!" />
        <meta property="og:url" content="https://seogrowthers.com/contacto" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content="Contacta con SEO Growthers - Desarrollo Web y SEO en Neuquén" />
        <meta name="twitter:description" content="Ponte en contacto con nuestra agencia digital en Neuquén. Respuesta en 24hs. ¡Iniciemos tu proyecto hoy!" />
        <meta property="og:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <meta name="twitter:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      
      <ScrollToTop />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-4">
            RESPUESTA EN 24HS GARANTIZADA
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
            Hablemos de tu <span className="text-cyan-400">Proyecto</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Impulsa tu crecimiento digital hoy mismo. Déjanos tus datos y un especialista analizará tu caso sin compromiso.
          </p>
        </section>

        {/* Bento Grid Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Contact Form Card (Large) */}
          <div className="lg:col-span-8">
            <LeadQualifierForm />
          </div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Ventas y Servicios Card */}
            <div className="bg-[#1a1c1e] rounded-2xl p-8 border border-white/5 shadow-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-2">
                Ventas y Servicios
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Solicitudes de presupuesto, asesoramiento técnico y planes a medida.
              </p>
              <a 
                href="mailto:seogrowthers@gmail.com" 
                className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-all block text-lg mb-6"
              >
                seogrowthers@gmail.com
              </a>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    TELÉFONO DIRECTO
                  </p>
                  <a
                    href="tel:+5429925504783"
                    className="text-gray-300 hover:text-cyan-400 transition-colors block font-semibold text-sm"
                  >
                    +54 (299) 25504783
                  </a>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    HORARIOS DE ATENCIÓN
                  </p>
                  <p className="text-gray-300 text-sm font-semibold">
                    Lunes a Viernes: 08:00 a 17:00 hs
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#1a1c1e] rounded-2xl p-8 border border-[#25D366]/30 shadow-[0_0_30px_rgba(37,211,102,0.1)] relative overflow-hidden group">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center mb-6 text-[#25D366]">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-2">
                Atención Directa
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Ponte en contacto al instante mediante WhatsApp con nuestro equipo.
              </p>
              <p className="text-[#25D366] font-bold text-lg mb-6">
                +54 9 2995504783
              </p>
              <a
                href="https://wa.me/5492995504783"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('contact_page')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 premium-btn-glow-green text-white font-bold rounded-xl transition-all w-full"
              >
                Chatear por WhatsApp
              </a>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#25D366]/15 transition-all duration-500"></div>
            </div>

            {/* Ubicación & Mapa */}
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-bold text-white flex items-center gap-3 ml-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Nuestra Sede
              </h3>
              
              <div className="bg-[#1a1c1e] rounded-2xl p-6 border-l-4 border-primary border-y border-r border-white/5 shadow-xl relative overflow-hidden group">
                <div className="space-y-2 relative z-10 mb-4">
                  <h4 className="font-bold text-white text-lg">Oficina Central & Operaciones</h4>
                  <p className="text-gray-300 text-sm">El Manzano 2115, Neuquén Capital</p>
                  <p className="text-gray-500 text-xs">CP 8300 • Neuquén, Argentina</p>
                </div>

                {/* Google Maps Embed Frame */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] w-full">
                  <iframe
                    title="Ubicación SEO Growthers Neuquén"
                    src="https://maps.google.com/maps?q=-38.9517,-68.0591&hl=es&z=14&output=embed"
                    className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Social Proof */}
      <div className="py-12 bg-slate-900/50 border-y border-white/5">
        <div className="text-center mb-8">
          <p className="font-label text-sm uppercase tracking-widest text-cyan-400 font-bold">Empresas que ya crecen con nosotros</p>
        </div>
        <SuccessCasesCarousel />
      </div>

      {/* FAQ Section */}
      <ContactFAQ />

      {/* Footer Decoration */}
      <footer className="py-12 px-8 text-center border-t border-white/5 opacity-50">
        <p className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface-variant">
          Iniciado en 2024 • Proyectado para 2026 • SEO Growthers Ecosystem
        </p>
      </footer>
    </div>
  );
};

export default ContactPage;
