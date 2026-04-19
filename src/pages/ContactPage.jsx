import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Contacto | Neural Workspace</title>
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
          <div className="lg:col-span-8 glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container via-secondary-container to-tertiary-container"></div>
            <h2 className="font-headline text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">rocket_launch</span>
              Formulario de Consulta
            </h2>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-[0.2em] text-primary/70 ml-1">Identidad_ID</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body" placeholder="Nombre completo o alias" type="text" required/>
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-[0.2em] text-primary/70 ml-1">Enlace_Protocolo</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body" placeholder="correo@neuronal.com" type="email" required/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-[0.2em] text-primary/70 ml-1">Vector_Motivo</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body appearance-none">
                  <option>Desarrollo de Arquitectura</option>
                  <option>Consultoría de Vibe Coding</option>
                  <option>Expansión de Capacidad Neural</option>
                  <option>Error en el Sistema</option>
                  <option>Otros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-[0.2em] text-primary/70 ml-1">Carga_Mensaje</label>
                <textarea className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body resize-none" placeholder="Escribe tu consulta aquí..." rows="5" required></textarea>
              </div>
              
              <button className="group relative w-full md:w-auto bg-primary-container text-on-primary-container font-headline font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-3 overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]" type="submit">
                <span className="relative z-10">Transmitir Intento</span>
                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">send</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </form>
          </div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Location Node */}
            <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col h-full border border-white/5">
              <h3 className="font-headline text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">hub</span>
                Nodo Central
              </h3>
              <div className="rounded-2xl overflow-hidden grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-500 flex-grow mb-4 aspect-video lg:aspect-auto">
                <img alt="Ubicación Nodo Central" className="w-full h-full object-cover" src="/images/fotos/1726058564177.jpg"/>
              </div>
              <div className="space-y-1">
                <p className="text-on-surface font-bold">Sector 7-Alpha</p>
                <p className="text-on-surface-variant text-sm">Distrito de Innovación Cuántica, Nivel 4</p>
                <p className="text-primary text-xs font-mono mt-2">35.6895° N, 139.6917° E</p>
              </div>
            </div>

            {/* Neural Networks (Social) */}
            <div className="bg-surface-container-high rounded-3xl p-6 border border-white/5">
              <h3 className="font-headline text-xl font-bold text-tertiary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">cell_tower</span>
                Redes Neuronales
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest hover:bg-secondary-container/20 transition-all border border-outline-variant/10" href="#">
                  <span className="material-symbols-outlined text-secondary">share</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Nexus</span>
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest hover:bg-primary-container/20 transition-all border border-outline-variant/10" href="#">
                  <span className="material-symbols-outlined text-primary">cyclone</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Vortex</span>
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest hover:bg-tertiary-container/20 transition-all border border-outline-variant/10" href="#">
                  <span className="material-symbols-outlined text-tertiary">stream</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Pulse</span>
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest hover:bg-white/10 transition-all border border-outline-variant/10" href="#">
                  <span className="material-symbols-outlined text-on-surface">terminal</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Shell</span>
                </a>
              </div>
            </div>

            {/* Live Status */}
            <div className="bg-gradient-to-br from-surface-container-low to-surface-container-highest rounded-3xl p-6 border border-primary/10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-1">Estado del Enlace</p>
                  <p className="text-lg font-headline font-bold text-primary">OPERACIONAL</p>
                </div>
                <div className="relative">
                  <div className="w-3 h-3 bg-primary-container rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-primary-container rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                <div className="h-1 flex-grow rounded-full bg-primary/20">
                  <div className="h-full w-3/4 bg-primary-container rounded-full"></div>
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2">Latencia: 14ms | Encriptación: AES-4096-Q</p>
            </div>
            
          </div>
        </div>
      </main>


      {/* Footer Decoration */}
      <footer className="py-12 px-8 text-center border-t border-white/5 opacity-50">
        <p className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface-variant">
          Iniciado en 2024 • Proyectado para 2026 • Neural Workspace Ecosystem
        </p>
      </footer>
    </div>
  );
};

export default ContactPage;
