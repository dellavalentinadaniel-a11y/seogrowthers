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
          className="fixed bottom-0 left-0 right-0 z-[100] px-3 py-3 md:px-6 md:py-6 pb-safe"
        >
          <div className="max-w-7xl mx-auto bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 md:p-3 bg-cyan-500/10 rounded-lg text-cyan-400 shrink-0 mt-0.5">
                <Cookie size={18} className="md:hidden" />
                <Cookie size={24} className="hidden md:block" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm md:text-lg font-semibold text-white leading-snug">Uso de Cookies</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-snug">
                  Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.{' '}
                  <button onClick={handleMoreInfo} className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 md:hidden">
                    Más info
                  </button>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto shrink-0">
              <Button
                variant="ghost"
                onClick={handleMoreInfo}
                className="hidden md:flex text-gray-400 hover:text-white hover:bg-white/5 text-sm"
              >
                Más información
              </Button>
              <Button
                variant="outline"
                onClick={handleReject}
                className="flex-1 md:flex-none border-slate-600 text-gray-300 hover:text-white hover:bg-slate-800 text-sm h-9"
              >
                Rechazar
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-cyan-600 hover:bg-cyan-700 text-white text-sm h-9"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;