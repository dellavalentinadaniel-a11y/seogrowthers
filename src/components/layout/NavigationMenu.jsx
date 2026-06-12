import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Foro', href: '/forum' },
  { name: 'Recursos', href: '/resources' },
  { name: 'Servicios', href: '/services' },
];

const NavigationMenu = ({ variant = 'horizontal', className }) => {
  const location = useLocation();

  const isActive = (href) => {
    return location.pathname === href ||
           (href !== '/' && location.pathname.startsWith(href));
  };

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
