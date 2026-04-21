import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ContactForm from '@/components/contact/ContactForm';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Contacto | SEO Growthers - Agencia de SEO y Desarrollo Web en Neuquén</title>
        <meta name="description" content="Contáctanos en Neuquén Capital. Expertos en SEO, Desarrollo Web y Analytics para potenciar tu presencia digital." />
      </Helmet>
      
      <ScrollToTop />


      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Sincroniza con el <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Nodo Central</span>
          </h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg leading-relaxed">
            Establece un enlace directo con la arquitectura neural de 2026. Tu intención será procesada por nuestros protocolos de alta fidelidad.
          </p>
        </section>

        {/* Bento Grid Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Contact Form Card (Large) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Ventas y Proyectos Card */}
            <div className="bg-[#1a1c1e] rounded-2xl p-8 border border-white/5 shadow-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">point_of_sale</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-4">
                Ventas y Proyectos
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Asesoramiento comercial para obras y distribuidores.
              </p>
              <a 
                href="mailto:seogrowthers@outlook.es" 
                className="text-primary font-bold hover:underline transition-all block text-lg"
              >
                seogrowthers@outlook.es
              </a>
            </div>

            {/* Nuestras Sedes Section */}
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-bold text-white flex items-center gap-3 ml-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Nuestras Sedes
              </h3>
              
              <div className="bg-[#1a1c1e] rounded-2xl p-6 border-l-4 border-primary border-y border-r border-white/5 shadow-xl relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-lg">Planta Industrial & Ventas</h4>
                    <p className="text-gray-400 text-sm">Argentina Neuquén Capital</p>
                  </div>
                  <div className="text-right md:text-right space-y-1">
                    <p className="text-primary font-bold text-lg">+54 9 299 608-7387</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                      LUN A VIE: 8:00 A 17:00 HS
                    </p>
                  </div>
                </div>
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              </div>
            </div>

            {/* Interactive Map Button */}
            <div className="relative rounded-3xl overflow-hidden h-48 border border-white/5 group cursor-pointer shadow-2xl">
              <img 
                src="/images/fotos/1726058564177.jpg" 
                alt="Mapa Interactivo" 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 text-primary border border-primary/30 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <span className="text-white font-bold tracking-[0.2em] text-xs uppercase drop-shadow-md">
                  Ver Mapa Interactivo
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </main>


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
