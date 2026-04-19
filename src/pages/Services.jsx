import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import SuccessCasesHeroCarousel from '@/components/shared/SuccessCasesHeroCarousel';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Servicios | Neural Workspace</title>
      </Helmet>
      
      <ScrollToTop />



      <main className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="relative px-8 pt-20 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container/20 border border-secondary/30 mb-6">
              <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-secondary">Portafolio de Capacidades</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 max-w-4xl">
              Sistemas <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Autónomos</span> para la Nueva Era
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
              Desplegamos arquitecturas de software que trascienden el código tradicional, integrando inteligencia neural y seguridad cuántica en cada línea.
            </p>
          </div>
          {/* Atmospheric Element */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
        </section>

        <section className="px-8 max-w-7xl mx-auto mb-20">
          <SuccessCasesHeroCarousel />
        </section>

        {/* Services Grid */}
        <section className="px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1: AI Consultoría */}
            <div className="glass-panel group relative flex flex-col p-8 rounded-[2rem] border-t-2 border-primary/50 shadow-[0_0_40px_rgba(0,229,255,0.06)] hover:translate-y-[-8px] transition-all duration-500 overflow-hidden">
              <div className="mb-6 flex items-center justify-between relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary-container/20 flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-3xl">neurology</span>
                </div>
                <span className="text-xs font-label text-outline uppercase tracking-widest">Capacidad 01</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4 relative z-10">Consultoría en IA</h3>
              <p className="text-on-surface-variant font-body leading-relaxed mb-8 flex-grow relative z-10">
                Diseño de agentes autónomos y LLMs personalizados integrados en el flujo de trabajo empresarial. Optimizamos la toma de decisiones mediante modelos predictivos de alta fidelidad.
              </p>
              <div className="mt-auto relative z-10">
                <button className="w-full py-4 px-6 bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all rounded-xl">
                  Saber más
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

            {/* Service Card 2: Seguridad Cuántica */}
            <div className="glass-panel group relative flex flex-col p-8 rounded-[2rem] border-t-2 border-secondary/50 shadow-[0_0_40px_rgba(111,0,190,0.06)] hover:translate-y-[-8px] transition-all duration-500 overflow-hidden">
              <div className="mb-6 flex items-center justify-between relative z-10">
                <div className="w-14 h-14 rounded-xl bg-secondary-container/20 flex items-center justify-center border border-secondary/20">
                  <span className="material-symbols-outlined text-secondary text-3xl">shield_with_heart</span>
                </div>
                <span className="text-xs font-label text-outline uppercase tracking-widest">Capacidad 02</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4 relative z-10">Auditoría Cuántica</h3>
              <p className="text-on-surface-variant font-body leading-relaxed mb-8 flex-grow relative z-10">
                Blindaje de infraestructuras críticas contra ataques de computación cuántica. Implementamos criptografía post-cuántica y protocolos de seguridad de confianza cero.
              </p>
              <div className="mt-auto relative z-10">
                <button className="w-full py-4 px-6 border border-secondary/30 hover:bg-secondary/10 text-on-surface font-headline font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all rounded-xl">
                  Saber más
                  <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

            {/* Service Card 3: Vibe Coding */}
            <div className="glass-panel group relative flex flex-col p-8 rounded-[2rem] border-t-2 border-tertiary/50 shadow-[0_0_40px_rgba(255,229,255,0.06)] hover:translate-y-[-8px] transition-all duration-500 overflow-hidden">
              <div className="mb-6 flex items-center justify-between relative z-10">
                <div className="w-14 h-14 rounded-xl bg-tertiary-container/20 flex items-center justify-center border border-tertiary/20">
                  <span className="material-symbols-outlined text-tertiary text-3xl">auto_awesome</span>
                </div>
                <span className="text-xs font-label text-outline uppercase tracking-widest">Capacidad 03</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4 relative z-10">Desarrollo Vibe Coding</h3>
              <p className="text-on-surface-variant font-body leading-relaxed mb-8 flex-grow relative z-10">
                Creación de interfaces orgánicas y fluidas mediante lenguajes naturales. Software que se adapta a la intención del usuario, reduciendo la fricción entre la idea y la ejecución.
              </p>
              <div className="mt-auto relative z-10">
                <button className="w-full py-4 px-6 border border-tertiary/30 hover:bg-tertiary/10 text-on-surface font-headline font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all rounded-xl">
                  Saber más
                  <span className="material-symbols-outlined text-sm text-tertiary">blur_on</span>
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

          </div>
        </section>

        {/* Lab Section / Tonal Divide */}
        <section className="mt-32 pt-24 pb-24 px-8" style={{ backgroundImage: 'linear-gradient(180deg, #12131c 0%, #1a1b24 100%)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-4xl font-bold text-on-surface mb-8">Ecosistema de Laboratorio</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 bg-primary-container/20 rounded flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">architecture</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Arquitectura Evolutiva</h4>
                    <p className="text-on-surface-variant text-sm">Sistemas que aprenden y se reconfiguran dinámicamente según la carga.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 bg-secondary-container/20 rounded flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">monitoring</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Monitoreo Neural</h4>
                    <p className="text-on-surface-variant text-sm">Telemetría predictiva que detecta cuellos de botella antes de que ocurran.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-surface-container-highest p-4 rounded-[2rem] border border-white/5 overflow-hidden">
                <img alt="Futuristic lab environment" className="rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3compKf5Pbt093Qc9hU_zib9yLXGp0u2yHusXfDsitGoujy__SlOrpFBszzus0U0w4_Ht8zrIJhk1hvUF_mBvoQHgatLuI7cHNGoTDlqinDs6e8OPsO9mBuBMx-l-ieQPo0tJ9YuGjpNj0gkhk1Z_tJiUNC13W_6TB62MfXb1XFT3AprJx_kUyNxFh195PKM9ysciPNlwOPTeephLLTLr-Tpsm8x8MQwhqp5F77EMlS6bQjMkBWCRrHpI8_mR1GQTzjXOl8ZjC60"/>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};

export default Services;