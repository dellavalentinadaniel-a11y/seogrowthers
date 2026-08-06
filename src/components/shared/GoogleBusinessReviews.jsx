import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Gift, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { trackCTAClick } from '@/lib/analytics';

const googleReviewsData = [
  {
    id: 1,
    author: "Esteban M.",
    role: "Director de Marketing, Aluvalle",
    rating: 5,
    date: "Hace 2 semanas",
    content: "Excelente trabajo de la agencia. Logramos posicionar nuestras palabras clave principales en el Top #1 de Google Argentina y aumentamos un 180% el tráfico orgánico. El equipo es súper transparente y profesional.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 2,
    author: "Luciana G.",
    role: "Founder, InmoFuture",
    rating: 5,
    date: "Hace 1 mes",
    content: "Trabajar con el equipo de SEO Growthers transformó nuestra tienda online. La auditoría técnica WPO y la estrategia para ecommerce dejaron la página volando y multiplicaron las consultas.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 3,
    author: "Martín V.",
    role: "CEO, EDV Remolques",
    rating: 5,
    date: "Hace 1 mes",
    content: "Muy profesionales y transparentes con los reportes mensuales. El ROI que obtuvimos superó con creces lo que veníamos logrando con pauta paga. 100% recomendados en Argentina.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 4,
    author: "Carolina S.",
    role: "Gerente Comercial, TechData",
    rating: 5,
    date: "Hace 2 meses",
    content: "Buscábamos una agencia SEO en Buenos Aires con enfoque real en ventas y encontramos una consultoría integral de crecimiento. La atención y la velocidad de ejecución son impecables.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
  }
];

const GoogleBusinessReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % googleReviewsData.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % googleReviewsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + googleReviewsData.length) % googleReviewsData.length);
  };

  const current = googleReviewsData[currentIndex];

  return (
    <section className="py-16 my-12 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER GOOGLE BADGE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            {/* Google Icon Badge */}
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-white text-xl">SEO Growthers</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Perfil Verificado
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-white">4.9 / 5.0</span>
                <span className="text-xs text-slate-400">en Google Business Profile</span>
              </div>
            </div>
          </div>

          <a
            href="https://share.google/LIJd4mNxw38vYudPo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('view_google_profile', 'https://share.google/LIJd4mNxw38vYudPo')}
            className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-400/30 hover:border-cyan-400 px-4 py-2 rounded-xl transition-all flex items-center gap-2 bg-cyan-400/5"
          >
            <span>Ver Perfil en Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          className="relative min-h-[220px] mb-10"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,219,231,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">• {current.date}</span>
                </div>

                <p className="text-slate-200 text-base md:text-lg italic leading-relaxed font-light">
                  "{current.content}"
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                  />
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">{current.author}</h4>
                    <p className="text-slate-400 text-xs font-light">{current.role}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* INCENTIVIZED REVIEW CTA CARD */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border-2 border-cyan-400/50 backdrop-blur-xl shadow-[0_0_35px_rgba(0,219,231,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="max-w-2xl space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold">
              <Gift className="w-4 h-4" />
              <span>Premio Exclusivo para Clientes</span>
            </div>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-white tracking-tight">
              ¿Sos cliente de SEO Growthers? Dejanos tu opinión en Google
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
              Compartí tu experiencia en nuestro perfil oficial y obtené un <strong className="text-cyan-400 font-bold">15% DE DESCUENTO</strong> en tu próxima factura u optimización de servicio.
            </p>
          </div>

          <a
            href="https://g.page/r/CWxXl7ZGptE2EAE/review"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('leave_google_review_btn', 'https://g.page/r/CWxXl7ZGptE2EAE/review')}
            className="relative z-10 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-mono font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Dejar Reseña en Google ⭐</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default GoogleBusinessReviews;
