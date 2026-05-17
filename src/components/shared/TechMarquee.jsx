import React from 'react';

const technologies = [
  { 
    name: "React", 
    link: "https://react.dev",
    logo: (
      <svg className="w-10 h-10 text-[#61dafb] hover:scale-110 transition-transform duration-300" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  { 
    name: "Tailwind CSS", 
    link: "https://tailwindcss.com",
    logo: (
      <svg className="w-10 h-10 text-[#38bdf8] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/>
      </svg>
    )
  },
  { 
    name: "Node.js", 
    link: "https://nodejs.org",
    logo: (
      <svg className="w-10 h-10 text-[#339933] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3.5 6.9v9.8L12 22l8.5-4.9v-9.8L12 2zm6.7 13.9l-6.7 3.9-6.7-3.9V8.1l6.7-3.9 6.7 3.9v7.8z"/>
        <path d="M12 6.8v9.9l4.5-2.6V9.4z" opacity="0.6"/>
      </svg>
    )
  },
  { 
    name: "Supabase", 
    link: "https://supabase.com",
    logo: (
      <svg className="w-10 h-10 text-[#3ecf8e] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.36 9.7a1.18 1.18 0 00-1-1.07l-6.84-.71L17 .88A1.17 1.17 0 0015.17.06l-12.8 12a1.18 1.18 0 00.77 2L10 14.8l-3.3 7.3a1.18 1.18 0 001.81 1.34l12.8-12a1.18 1.18 0 00.05-1.74z"/>
      </svg>
    )
  },
  { 
    name: "Vite", 
    link: "https://vite.dev",
    logo: (
      <svg className="w-10 h-10 hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.78 1.82L12 11.23L4.22 1.82a.8.8 0 00-1.25.1L.12 17.65a.8.8 0 00.91 1.14L12 16.5l10.97 2.29a.8.8 0 00.91-1.14L21.03 1.92a.8.8 0 00-1.25-.1z" fill="url(#viteLogoGradShared)"/>
        <path d="M14.5 1L8.5 11h5l-3.5 9.5L18.5 9h-5L14.5 1z" fill="#FFC517"/>
        <defs>
          <linearGradient id="viteLogoGradShared" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  { 
    name: "Vercel", 
    link: "https://vercel.com",
    logo: (
      <svg className="w-10 h-10 text-white hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 22.525H0L12 1.475L24 22.525Z"/>
      </svg>
    )
  },
  { 
    name: "Git", 
    link: "https://git-scm.com",
    logo: (
      <svg className="w-10 h-10 text-[#F05032] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.27 10.56L13.44.73a2.08 2.08 0 00-2.94 0L8.62 2.61l3.06 3.06a2.13 2.13 0 012.38.38 2.12 2.12 0 01.37 2.39l3.07 3.07a2.13 2.13 0 11-1.4 1.4L13 9.85a2.14 2.14 0 01-2.4.37L7.54 13.3a2.13 2.13 0 11-1.4-1.4L9.2 8.84a2.14 2.14 0 01-.38-2.39L5.75 3.38 1.07 8.06a2.08 2.08 0 000 2.94l9.83 9.83a2.08 2.08 0 002.94 0l9.43-9.43a2.08 2.08 0 000-2.84z"/>
      </svg>
    )
  },
  { 
    name: "Docker", 
    link: "https://www.docker.com",
    logo: (
      <svg className="w-10 h-10 text-[#2496ED] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.962 7.162h-2.146v2.115h2.146V7.162zM11.19 7.162H9.043v2.115H11.19V7.162zM8.423 7.162H6.282v2.115h2.141V7.162zM5.655 7.162H3.51v2.115h2.145V7.162zM11.19 4.382H9.043v2.115H11.19V4.382zM8.423 4.382H6.282v2.115h2.141V4.382zM13.962 4.382h-2.146v2.115h2.146V4.382zM16.73 7.162h-2.146v2.115h2.146V7.162zM23.763 9.94c-.203-.984-.963-1.8-2.203-1.8a4.919 4.919 0 00-1.743.328c-.092-.888-.738-1.57-1.789-1.57-.45 0-.895.143-1.23.41v2.306H1.513A1.516 1.516 0 000 11.13v6.06c0 1.25.962 2.27 2.247 2.27 4.28 0 8.016-1.536 10.37-3.957a10.984 10.984 0 006.182.906c3.21-.307 4.672-2.316 4.946-4.536.03-.23.05-.44.05-.66a3.86 3.86 0 00-.032-.773z"/>
      </svg>
    )
  },
  { 
    name: "PostgreSQL", 
    link: "https://www.postgresql.org",
    logo: (
      <svg className="w-10 h-10 text-[#336791] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    )
  },
  { 
    name: "Framer Motion", 
    link: "https://motion.dev",
    logo: (
      <svg className="w-10 h-10 hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h12v12H0V0zm12 12h12v12H12V12zm0-12l12 12H12V0zM0 12h12L0 24V12z" fill="url(#framerLogoGradShared)"/>
        <defs>
          <linearGradient id="framerLogoGradShared" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF007A" />
            <stop offset="100%" stopColor="#7B00FF" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  { 
    name: "Shopify", 
    link: "https://www.shopify.com",
    logo: (
      <svg className="w-10 h-10 text-[#96bf48] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.574 6.136L12.5 1.5 5.426 6.136c-.463.303-.746.82-.746 1.38v8.968c0 .56.283 1.077.746 1.38l7.074 4.636 7.074-4.636c.463-.303.746-.82.746-1.38V7.516c0-.56-.283-1.077-.746-1.38zM12.5 4.3l4.5 2.946-4.5 2.946-4.5-2.946L12.5 4.3z"/>
      </svg>
    )
  },
  { 
    name: "JavaScript", 
    link: "https://developer.mozilla.org/es/docs/Web/JavaScript",
    logo: (
      <svg className="w-10 h-10 text-[#f7df1e] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0zm20.25 18.73c-.09-.59-.53-.94-1.22-1.05-.66-.11-1.05-.33-1.05-.72 0-.31.28-.48.66-.48.42 0 .7.17.89.5l1.61-1.04c-.39-.63-.94-1.05-1.89-1.05-1.8 0-2.88 1.13-2.88 2.58 0 1.58 1.09 2.05 2.55 2.3 1 .18 1.31.39 1.31.81 0 .39-.33.56-.86.56-.63 0-1-.31-1.22-.72l-1.63 1.01c.42.79 1.19 1.25 2.19 1.25 1.94 0 3.09-1.12 3.09-2.73 0-1.62-1.12-2.02-2.58-2.22zm-7.66-.12v-5.69H10.5v5.75c0 1.25-.63 1.91-1.72 1.91-.72 0-1.22-.39-1.42-.89l-1.63.97c.41.92 1.34 1.5 2.75 1.5 2.22.02 3.66-1.15 3.66-3.55z"/>
      </svg>
    )
  }
];

const TechMarquee = () => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden py-10 pointer-events-auto bg-transparent">
      {/* Embedded CSS for seamless moving technology marquee */}
      <style>{`
        @keyframes marqueeShared {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-shared {
          display: flex;
          width: max-content;
          animation: marqueeShared 25s linear infinite;
        }
        .animate-marquee-shared:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Marquee Wrapper with fading borders and 100% seamless transparency */}
      <div className="relative w-full overflow-hidden">
        {/* Deeper edge fading masks matching the dark background */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#07080d] via-[#07080d]/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#07080d] via-[#07080d]/80 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-shared gap-16 py-8">
          {/* Double array representation to make loop seamless */}
          {[...technologies, ...technologies].map((tech, idx) => (
            <a 
              key={idx} 
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 select-none cursor-pointer flex-shrink-0 group relative transition-all duration-500 hover:z-20"
            >
              {/* Icon Container with massive 3D zoom out-of-screen effect */}
              <div className="transform transition-all duration-500 ease-out group-hover:scale-[1.45] group-hover:-translate-y-4 group-hover:drop-shadow-[0_20px_35px_rgba(0,229,255,0.45)]">
                {tech.logo}
              </div>
              
              {/* Text element scaling & lighting up softly */}
              <span className="text-slate-400 text-sm uppercase tracking-[0.2em] font-semibold group-hover:text-[#00e5ff] group-hover:scale-110 transition-all duration-500 ease-out">
                {tech.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
