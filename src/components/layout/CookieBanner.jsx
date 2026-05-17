import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to not overwhelm user immediately on load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const handleMoreInfo = () => {
    navigate('/privacy-policy');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-[96px] md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[200]"
        >
          <div className="bg-slate-900/98 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] p-5 flex flex-col gap-4 border-l-4 border-l-cyan-400">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0 mt-0.5 shadow-[inset_0_0_10px_rgba(6,182,212,0.15)]">
                <Cookie size={20} />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-white tracking-tight">Uso de Cookies</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Puedes consultar nuestra{' '}
                  <button 
                    onClick={handleMoreInfo} 
                    className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium inline-block"
                  >
                    política de privacidad
                  </button>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full shrink-0 border-t border-slate-800/80 pt-3.5">
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2.5 border border-slate-700 hover:border-slate-600 bg-transparent text-slate-300 hover:text-white rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all h-10 active:scale-95"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white rounded-xl text-xs font-headline font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all h-10 active:scale-95"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;