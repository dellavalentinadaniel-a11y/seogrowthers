import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Megaphone, Code2, Smartphone, Bot, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Foro', href: '/forum' },
  { name: 'Recursos', href: '/resources' },
  { name: 'Servicios', href: '/services', hasDropdown: true },
];

const serviciosSubLinks = [
  {
    name: 'Marketing Digital',
    href: '/services/marketing-digital',
    icon: Megaphone,
    description: 'SEO, SEM, Social Ads y estrategias de crecimiento orgánico.',
  },
  {
    name: 'Desarrollo Web',
    href: '/services/desarrollo-web-argentina',
    icon: Code2,
    description: 'Sitios de alto rendimiento, e-commerce y landing pages.',
  },
  {
    name: 'Apps & Software',
    href: '/services/apps-software',
    icon: Smartphone,
    description: 'Aplicaciones móviles, software a medida y soluciones SaaS.',
  },
  {
    name: 'Automatización',
    href: '/services/automatizacion-ia',
    icon: Bot,
    description: 'Flujos inteligentes con IA, RPA y automatización de procesos.',
  },
];

const NavigationMenu = ({ variant = 'horizontal', className }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const isActive = (href) => {
    return location.pathname === href ||
           (href !== '/' && location.pathname.startsWith(href));
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  // Close on route change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (variant === 'vertical') {
    return (
      <nav className={cn('flex flex-col gap-2', className)}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              'px-4 py-2.5 rounded-lg transition-all font-headline text-sm font-semibold',
              isActive(link.href)
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {navLinks.map((link) => {
        const active = isActive(link.href);

        if (link.hasDropdown) {
          return (
            <div
              key={link.name}
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Trigger */}
              <Link
                to={link.href}
                className={cn(
                  'font-headline tracking-tight transition-all duration-300 relative flex items-center gap-1',
                  'text-sm md:text-base font-semibold',
                  active
                    ? 'text-cyan-300'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                {link.name}
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-300 mt-0.5',
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  )}
                />
                {active && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" />
                )}
              </Link>

              {/* Dropdown */}
              <div
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100]',
                  'transition-all duration-200 ease-out',
                  isDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                )}
              >
                {/* Arrow indicator */}
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#111225] border-l border-t border-cyan-500/20" />

                <div className="w-[340px] bg-[#111225]/95 backdrop-blur-xl border border-cyan-500/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(0,200,255,0.06)] overflow-hidden">
                  {/* Header */}
                  <div className="px-5 pt-4 pb-3 border-b border-white/5">
                    <p className="text-[10px] font-label uppercase tracking-[0.2em] text-cyan-400/70">
                      Nuestros Servicios
                    </p>
                  </div>

                  {/* Links */}
                  <div className="p-2">
                    {serviciosSubLinks.map((subLink) => {
                      const Icon = subLink.icon;
                      const subActive = location.pathname === subLink.href;
                      return (
                        <Link
                          key={subLink.name}
                          to={subLink.href}
                          className={cn(
                            'flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group',
                            subActive
                              ? 'bg-cyan-500/10 border border-cyan-500/20'
                              : 'hover:bg-white/[0.04] border border-transparent'
                          )}
                        >
                          <div className={cn(
                            'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200',
                            subActive
                              ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(0,200,255,0.2)]'
                              : 'bg-white/5 text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300'
                          )}>
                            <Icon size={18} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <p className={cn(
                              'text-sm font-headline font-semibold leading-tight transition-colors',
                              subActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'
                            )}>
                              {subLink.name}
                            </p>
                            <p className="text-[11px] text-slate-500 leading-snug mt-0.5 group-hover:text-slate-400 transition-colors">
                              {subLink.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02]">
                    <Link
                      to="/services"
                      className="flex items-center justify-center gap-2 text-xs font-headline font-semibold text-cyan-400/80 hover:text-cyan-300 transition-colors"
                    >
                      Ver todos los servicios
                      <span className="text-[10px]">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              'font-headline tracking-tight transition-all duration-300 relative',
              'text-sm md:text-base font-semibold',
              active
                ? 'text-cyan-300'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {link.name}
            {active && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
