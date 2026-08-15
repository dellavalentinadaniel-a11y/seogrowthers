import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Youtube, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp,
  Play
} from 'lucide-react';

export const VideoReelCard = ({ 
  videoSrc, 
  title, 
  subtitle, 
  handle, 
  url, 
  platform = 'Instagram', 
  tag = 'REEL',
  accent = 'from-cyan-400 to-blue-500'
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const isYoutube = platform === 'YouTube';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-3xl overflow-hidden bg-slate-950/80 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(0,219,231,0.2)] flex flex-col justify-between"
    >
      {/* 9:16 aspect ratio container for vertical reel */}
      <div className="relative w-full aspect-[9/16] sm:aspect-[4/5] md:aspect-[9/16] max-h-[560px] overflow-hidden bg-black flex items-center justify-center">
        {/* Video Element - plays without sound */}
        <video
          ref={videoRef}
          src={videoSrc}
          type="video/mp4"
          preload="metadata"
          poster="/images/video-thumb.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Dark Vignette Overlay for crisp text */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none" />

        {/* Top Floating Badge & Profile */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15">
            <div className={`w-6 h-6 rounded-full p-[1.5px] bg-gradient-to-r ${accent} flex items-center justify-center`}>
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white">
                {isYoutube ? <Youtube className="w-3 h-3 text-red-500" /> : <Instagram className="w-3 h-3 text-pink-500" />}
              </div>
            </div>
            <span className="text-xs font-bold text-white font-mono">{handle}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Sound Toggle Button (starts muted) */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            className="w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 flex items-center justify-center transition-all active:scale-90"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>

        {/* Center Tag Badge */}
        <div className="absolute top-16 left-4 z-10">
          <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
            {tag}
          </span>
        </div>

        {/* Bottom Info & Link Button */}
        <div className="absolute bottom-4 left-4 right-4 z-10 space-y-3">
          <div>
            <p className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider mb-1">{subtitle}</p>
            <h4 className="text-base md:text-lg font-extrabold text-white leading-snug drop-shadow-md">
              {title}
            </h4>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40"
          >
            <span>Ver en {platform}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function VideoReelsPair({ 
  reel1, 
  reel2, 
  sectionBadge = "CASOS & REELS EN ACCIÓN", 
  sectionTitle = "Estrategias Reales en Formato Vertical" 
}) {
  return (
    <section className="mb-32 py-10 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {sectionTitle && (
        <div className="text-center max-w-2xl mx-auto mb-12">
          {sectionBadge && (
            <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold block mb-2">
              {sectionBadge}
            </span>
          )}
          <h3 className="font-headline text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            {sectionTitle}
          </h3>
        </div>
      )}

      {/* 2-Columns Centered Video Reels Layout matching the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto items-stretch">
        <VideoReelCard {...reel1} />
        <VideoReelCard {...reel2} />
      </div>
    </section>
  );
}
