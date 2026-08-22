
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import { 
  Megaphone, 
  Code2, 
  Smartphone, 
  Bot, 
  ChevronDown,
  Search,
  Newspaper,
  MessageSquare,
  Star,
  BookOpen,
  Wrench
} from 'lucide-react';

const navLinks = [
  { 
    name: 'Servicios', 
    href: '/services', 
    hasDropdown: true,
    subLinks: [
      {
        name: 'Desarrollo Web',
        href: '/services/desarrollo-web',
        icon: Code2,
      },
      {
        name: 'Marketing Digital',
        href: '/services/marketing-digital',
        icon: Megaphone,
      },
      {
        name: 'Automatización IA',
        href: '/services/automatizacion-ia',
        icon: Bot,
      },
    ]
  },
  { 
    name: 'Blog', 
    href: '/blog', 
    hasDropdown: true,
    subLinks: [
      {
        name: 'Noticias',
        href: '/blog/noticias',
        icon: Newspaper,
      },
      {
        name: 'Foros',
        href: '/blog/foros',
        icon: MessageSquare,
      },
      {
        name: 'Reseñas',
        href: '/blog/reseñas',
        icon: Star,
      },
    ]
  },
  { 
    name: 'Recursos', 
    href: '/recursos', 
    hasDropdown: true,
    subLinks: [
      {
        name: 'Guías',
        href: '/recursos/guias',
        icon: BookOpen,
      },
      {
        name: 'Herramientas',
        href: '/recursos/herramientas',
        icon: Wrench,
      },
    ]
  },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Nosotros', href: '/nosotros' },
];

const MobileMenu = () => {
  const { isMenuOpen, closeMenu } = useMobileMenu();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-[#0a0b14]/80 backdrop-blur-sm z-[60] md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#0d0e17] border-l border-white/10 z-[70] p-6 flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-headline font-bold text-white">Menú</h2>
              <button
                onClick={closeMenu}
                className="p-2 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                                 (link.href !== '/' && location.pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  const isOpen = openDropdown === link.name;
                  return (
                    <div key={link.name}>
                      {/* Dropdown toggle */}
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                        className={`w-full flex items-center justify-between text-lg font-headline tracking-tight py-3 px-2 rounded-lg transition-colors ${
                          isActive
                            ? 'text-[#c3f5ff] font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>

                      {/* Sub-links */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pl-2 pb-2 flex flex-col gap-1">
                              {link.subLinks?.map((subLink) => {
                                const Icon = subLink.icon;
                                const subActive = location.pathname === subLink.href;
                                return (
                                  <Link
                                    key={subLink.name}
                                    to={subLink.href}
                                    onClick={closeMenu}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                      subActive
                                        ? 'bg-cyan-500/10 text-cyan-300'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                      subActive
                                        ? 'bg-cyan-500/20 text-cyan-300'
                                        : 'bg-white/5 text-slate-500'
                                    }`}>
                                      <Icon size={16} strokeWidth={1.8} />
                                    </div>
                                    <span className="text-sm font-headline font-semibold">
                                      {subLink.name}
                                    </span>
                                  </Link>
                                );
                              })}

                              {/* Ver todos */}
                              <Link
                                to={link.href}
                                onClick={closeMenu}
                                className="flex items-center justify-center gap-1.5 mt-1 px-3 py-2 text-xs font-headline font-semibold text-cyan-400/70 hover:text-cyan-300 transition-colors"
                              >
                                Ver todos →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={closeMenu}
                    className={`text-lg font-headline tracking-tight py-3 px-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-[#c3f5ff] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <Link
                to="/contact"
                onClick={closeMenu}
                className="mt-4 px-6 py-4 premium-btn-glow text-white text-center font-headline font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Contacto
              </Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
              <p className="text-xs text-slate-500 font-label uppercase tracking-widest mb-4">Síguenos</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
