import React from 'react';

const socialNetworks = [
  {
    name: "INSTAGRAM",
    handle: "@seogrowthers",
    link: "https://www.instagram.com/seogrowthers/",
    color: "#E1306C",
    logo: (
      <svg className="w-10 h-10 hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="igGradientMarquee" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#igGradientMarquee)" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="url(#igGradientMarquee)" strokeWidth="2" />
        <circle cx="18" cy="6" r="1.2" fill="url(#igGradientMarquee)" />
      </svg>
    )
  },
  {
    name: "FACEBOOK",
    handle: "SEO Growthers",
    link: "https://www.facebook.com/1023086154229173?ref=PROFILE_EDIT_xav_ig_profile_page_web",
    color: "#1877F2",
    logo: (
      <svg className="w-10 h-10 text-[#1877F2] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: "LINKEDIN",
    handle: "in/company/seogrowthers",
    link: "https://www.linkedin.com/company/seogrowthers",
    color: "#0A66C2",
    logo: (
      <svg className="w-10 h-10 text-[#0A66C2] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: "YOUTUBE",
    handle: "@ChronsGamingtv",
    link: "https://www.youtube.com/@ChronsGamingtv",
    color: "#FF0000",
    logo: (
      <svg className="w-10 h-10 text-[#FF0000] hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "ALUVALLE SAS",
    handle: "@aluvalle.sas",
    link: "https://www.instagram.com/aluvalle.sas/",
    color: "#00F5D4",
    logo: (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F5D4] via-[#00BBF9] to-[#9B5DE5] p-[2px] hover:scale-110 transition-transform duration-300 flex items-center justify-center">
        <div className="w-full h-full bg-[#07080d] rounded-[10px] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#00F5D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      </div>
    )
  },
  {
    name: "GOOGLE REVIEWS",
    handle: "SEO Growthers",
    link: "https://seogrowthers.com",
    color: "#4285F4",
    logo: (
      <svg className="w-10 h-10 hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    )
  }
];

const SocialReelsCarousel = () => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden py-10 pointer-events-auto bg-transparent mt-12 md:mt-16">
      {/* Embedded CSS for seamless moving social networks marquee */}
      <style>{`
        @keyframes socialMarqueeShared {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-social-marquee-shared {
          display: flex;
          width: max-content;
          animation: socialMarqueeShared 22s linear infinite;
        }
        .animate-social-marquee-shared:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Info Banner above Marquee */}
      <div className="text-center mb-6">
        <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-2">
          PRESENCIA DIGITAL MULTICANAL
        </span>
        <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Nuestras Redes & Casos Reales
        </h3>
      </div>
      
      {/* Marquee Wrapper with fading borders */}
      <div className="relative w-full overflow-hidden">
        {/* Deeper edge fading masks matching the dark background */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0C0D0D] via-[#0C0D0D]/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0C0D0D] via-[#0C0D0D]/80 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-social-marquee-shared gap-16 py-6">
          {/* Triple array representation to make loop completely seamless */}
          {[...socialNetworks, ...socialNetworks, ...socialNetworks].map((item, idx) => (
            <a 
              key={idx} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 select-none cursor-pointer flex-shrink-0 group relative transition-all duration-500 hover:z-20 px-3 py-2 rounded-2xl"
            >
              {/* Icon Container with 3D zoom and drop shadow */}
              <div className="transform transition-all duration-500 ease-out group-hover:scale-[1.45] group-hover:-translate-y-3 group-hover:drop-shadow-[0_15px_30px_rgba(0,219,231,0.4)]">
                {item.logo}
              </div>
              
              {/* Text element scaling & glowing softly */}
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm uppercase tracking-[0.2em] font-semibold group-hover:text-[#00e5ff] group-hover:scale-105 transition-all duration-500 ease-out">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                  {item.handle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialReelsCarousel;
