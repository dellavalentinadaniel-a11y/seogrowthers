import React, { useState, useEffect } from 'react';

const fullValues = [
  "Sofía Martínez",
  "sofia@empresa.com",
  "+54 11 4567 8900"
];

export default function PerformancePackHeroAnimated() {
  const [typedValues, setTypedValues] = useState(["", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let currentField = 0;
    let currentChar = 0;
    let isCancelled = false;

    const interval = setInterval(() => {
      if (isCancelled) return;

      if (currentField < 3) {
        setActiveInput(currentField);
        const targetText = fullValues[currentField];

        if (currentChar < targetText.length) {
          currentChar++;
          setTypedValues((prev) => {
            const next = [...prev];
            next[currentField] = targetText.slice(0, currentChar);
            return next;
          });
        } else {
          // Finished typing this field, move to next
          currentField++;
          currentChar = 0;
        }
      } else {
        // All fields typed, simulate submit
        setActiveInput(3);
        setIsSubmitted(true);
        setTimeout(() => {
          if (!isCancelled) {
            setIsSubmitted(false);
            setTypedValues(["", "", ""]);
            currentField = 0;
            currentChar = 0;
            setActiveInput(0);
          }
        }, 3200);
        currentField = 0;
        currentChar = 0;
      }
    }, 95);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2500);
  };

  return (
    <div className="relative w-full overflow-hidden select-none mb-16 rounded-[2.5rem] bg-gradient-to-b from-[#0A1930] via-[#0A1930]/80 to-[#07080D] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      {/* Dynamic Embedded Keyframe Styles */}
      <style>{`
        @keyframes floatHero {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes floatHero2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-9px); }
        }
        @keyframes arrowPulse {
          0% { opacity: 0.35; }
          50% { opacity: 1; }
          100% { opacity: 0.35; }
        }
        @keyframes arrowMove {
          0% { transform: translateY(0); }
          50% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }
        @keyframes glowPulseHero {
          0%, 100% {
            box-shadow: 0 0 28px rgba(46, 204, 113, 0.12), 0 0 90px rgba(46, 204, 113, 0.06), 0 24px 64px rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 42px rgba(46, 204, 113, 0.22), 0 0 130px rgba(46, 204, 113, 0.12), 0 24px 64px rgba(0, 0, 0, 0.5);
          }
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -22; }
        }
        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.35), 0 8px 22px rgba(46, 204, 113, 0.35);
          }
          50% {
            transform: scale(1.015);
            box-shadow: 0 0 0 12px rgba(46, 204, 113, 0), 0 8px 22px rgba(46, 204, 113, 0.45);
          }
        }
        .animate-float-hero {
          animation: floatHero 3.1s ease-in-out infinite;
        }
        .animate-float-hero2 {
          animation: floatHero2 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Atmospheric Background Glows */}
      <div className="absolute top-0 left-[20%] w-[900px] h-[520px] bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(30,74,140,0.35),transparent),radial-gradient(900px_500px_at_80%_30%,rgba(16,46,92,0.6),transparent)] pointer-events-none -z-0" />
      <div className="absolute -top-[180px] -left-[120px] w-[560px] h-[560px] bg-[#0E2A5A]/50 rounded-full blur-[110px] pointer-events-none -z-0" />
      <div className="absolute top-[10%] right-0 w-[520px] h-[380px] bg-[#1A3C77]/30 rounded-full blur-[90px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-12 lg:pt-12 lg:pb-12 overflow-hidden">
        {/* Top Floating Channel Badges */}
        <div className="relative">
          <div className="flex items-start gap-3 lg:gap-4">
            {/* Google Ads Badge */}
            <div className="animate-float-hero will-change-transform">
              <div className="flex items-center gap-2.5 bg-white rounded-full pl-2.5 pr-4 py-[7px] shadow-[0_10px_30px_rgba(0,0,0,0.28)] border border-black/5">
                <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center">
                  <span className="text-[18px] font-bold tracking-tighter leading-none">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
                <div className="leading-[0.95]">
                  <div className="text-[12.5px] font-semibold text-[#202124]">Google</div>
                  <div className="text-[13px] font-bold text-[#202124] -mt-[1px]">Ads</div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#0B1F44]/10 flex items-center justify-center ml-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#0B1F44" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Meta Ads Badge */}
            <div className="animate-float-hero2 will-change-transform" style={{ animationDelay: '0.35s' }}>
              <div className="flex items-center gap-2 bg-white rounded-full pl-[7px] pr-3.5 py-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.28)] border border-black/5">
                <div className="flex -space-x-[6px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#1877F2] flex items-center justify-center border-[2.5px] border-white shadow-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                      <path d="M14 8H16V3.5H13C10.5 3.5 8.5 5.5 8.5 8V10H5.5V13.8H8.5V20.5H12.5V13.8H14.8L15.5 10H12.5V8C12.5 7.3 13 7 13.7 7H14V8Z" />
                    </svg>
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-[#FEDA77] via-[#D62976] to-[#4F5BD5] flex items-center justify-center border-[2.5px] border-white shadow-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
                      <circle cx="17.8" cy="6.2" r="1.1" fill="white" />
                    </svg>
                  </div>
                </div>
                <div className="leading-[0.95] ml-1">
                  <div className="text-[10.5px] font-extrabold tracking-[0.09em] text-[#202124] uppercase">Meta</div>
                  <div className="text-[13px] font-bold text-[#202124] -mt-[1px]">Ads</div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Connecting SVG Dashed Arrows */}
          <div className="hidden lg:block absolute left-[96px] top-[42px] w-[360px] h-[110px] pointer-events-none z-20 overflow-hidden">
            <svg width="360" height="110" viewBox="0 0 360 110" fill="none" className="overflow-visible">
              <path
                d="M18 10 C 32 70, 120 70, 175 88"
                stroke="white"
                strokeOpacity="0.45"
                strokeWidth="1.1"
                strokeDasharray="6 6"
                style={{ animation: 'dashMove 1s linear infinite' }}
              />
              <g style={{ animation: 'arrowMove 1.6s ease-in-out infinite, arrowPulse 1.6s ease-in-out infinite' }}>
                <path d="M175 88 L167 81 L180 77 Z" fill="white" />
              </g>
              <path
                d="M120 16 C 135 64, 155 74, 188 90"
                stroke="white"
                strokeOpacity="0.45"
                strokeWidth="1.1"
                strokeDasharray="6 6"
                style={{ animation: 'dashMove 1s linear infinite 0.2s' }}
              />
              <g style={{ animation: 'arrowMove 1.6s ease-in-out 0.25s infinite, arrowPulse 1.6s ease-in-out 0.25s infinite' }}>
                <path d="M188 90 L180 83 L193 79 Z" fill="white" />
              </g>
            </svg>
          </div>
        </div>

        {/* Main Grid: Content (Left) & Animated Laptop Simulation (Right) */}
        <div className="grid lg:grid-cols-[1.12fr_1fr] gap-8 lg:gap-6 items-start mt-6 lg:mt-10 overflow-hidden">
          {/* Left Column: Headlines & Pricing */}
          <div className="order-2 lg:order-1">
            <div>
              <h1 className="font-headline font-bold leading-[0.92] tracking-[-0.025em] text-[34px] md:text-[48px] lg:text-[56px] xl:text-[60px]">
                <span className="text-white block">SERVICIO</span>
                <span className="text-white">Performance </span>
                <span className="text-[#2ECC71]">Pack</span>
              </h1>
            </div>

            <div className="mt-5 lg:mt-6">
              <h2 className="text-[19px] md:text-[26px] lg:text-[28px] leading-[1.18] font-semibold text-white max-w-[560px] tracking-[-0.01em]">
                Convertí tu inversión publicitaria en oportunidades comerciales reales
              </h2>
            </div>

            <div className="mt-4">
              <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-white/70 max-w-[560px] font-light">
                Implementamos un <span className="text-white font-medium">sistema completo de captación</span>: combinamos Google Ads + Meta Ads con una Landing Page de alto rendimiento, diseñada para transformar cada clic en un <span className="text-white font-medium">lead calificado</span> listo para comprar. Sin humo, sin likes vacíos. Solo crecimiento medible.
              </p>
            </div>

            {/* Price Pill */}
            <div className="mt-8">
              <div className="inline-flex flex-wrap items-center gap-3 bg-white/[0.07] border border-white/[0.09] rounded-full px-5 py-[11px] backdrop-blur-md">
                <span className="text-[28px] md:text-[32px] font-extrabold tracking-tight leading-none text-white font-headline">
                  $450
                </span>
                <span className="text-[14px] text-white/75 leading-none font-medium">
                  / mes + inversión publicitaria
                </span>
                <span className="hidden sm:inline-flex w-px h-4 bg-white/15 mx-1" />
                <span className="text-[10.5px] text-[#2ECC71] uppercase tracking-[0.14em] font-bold">
                  Setup inicial incluido
                </span>
              </div>
              <div className="mt-3.5 text-[11px] leading-[1.55] text-white/40 max-w-[520px]">
                *Precio base del servicio de gestión. No incluye presupuesto publicitario. Resultados pueden variar según industria y ticket promedio. Optimización continua incluida.
              </div>
            </div>

            {/* Mobile Benefit List */}
            <div className="lg:hidden mt-8 grid grid-cols-1 gap-3">
              {[
                { t: "Más leads calificados", d: "Filtramos curiosos. Solo contactos con intención real." },
                { t: "Mejor rendimiento de tu inversión", d: "Cada dólar vuelve en oportunidades trazables." },
                { t: "Estrategia orientada a resultados", d: "Decisiones basadas en datos, no en corazonadas." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white/[0.05] border border-white/[0.07] rounded-2xl p-3.5 backdrop-blur">
                  <div className="w-9 h-9 rounded-full bg-[#2ECC71] flex items-center justify-center shrink-0 text-white font-bold text-[12px]">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">{item.t}</div>
                    <div className="text-[11.5px] text-white/50 mt-0.5 leading-[1.4]">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Animated Interactive Laptop Mockup */}
          <div className="order-1 lg:order-2 relative">
            <div className="flex gap-4 lg:gap-5 items-start justify-center lg:justify-end">
              {/* Laptop Screen Frame */}
              <div className="relative w-[340px] md:w-[420px] lg:w-[360px] xl:w-[400px] shrink-0 max-w-full">
                <div
                  className="relative rounded-[20px] p-[9px] bg-gradient-to-b from-white/25 to-white/5 backdrop-blur"
                  style={{ animation: 'glowPulseHero 3.2s ease-in-out infinite' }}
                >
                  <div className="rounded-[13px] overflow-hidden bg-white shadow-[0_28px_80px_rgba(0,0,0,0.5)] border border-white/20">
                    {/* Header bar of simulated landing page */}
                    <div className="bg-[#142E5E] px-5 py-[14px] flex items-center justify-between">
                      <div className="leading-[1.1]">
                        <div className="text-white font-bold text-[14.5px]">Soluciones que</div>
                        <div className="text-white font-bold text-[14.5px]">impulsan tu negocio</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-[26px] h-[26px] rounded-full bg-white/10 flex items-center justify-center">
                          <div className="w-[7px] h-[7px] bg-[#2ECC71] rounded-full animate-pulse shadow-[0_0_8px_#2ECC71]" />
                        </div>
                      </div>
                    </div>

                    {/* Simulated Form with Typewriter State */}
                    <div className="p-[16px] md:p-[18px] bg-[#F8FAFC]">
                      <div className="space-y-[11px]">
                        {[
                          { label: "Nombre", value: typedValues[0], active: activeInput === 0, icon: "👤" },
                          { label: "Email", value: typedValues[1], active: activeInput === 1, icon: "✉️" },
                          { label: "Teléfono", value: typedValues[2], active: activeInput === 2, icon: "📞" }
                        ].map((field, idx) => (
                          <div key={idx} className="relative">
                            <div
                              className={`flex items-center gap-3 bg-white border rounded-[11px] px-3.5 h-[44px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 ${
                                field.active
                                  ? "border-[#2ECC71] shadow-[0_0_0_3px_rgba(46,204,113,0.14)]"
                                  : "border-[#E2E8F0]"
                              }`}
                            >
                              <span className="text-[11px] w-[18px] h-[18px] rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                                {field.icon}
                              </span>
                              <div className="flex-1 text-[13px] leading-none">
                                {field.value ? (
                                  <span className="text-[#0F172A] font-[550] flex items-center">
                                    {field.value}
                                    {field.active && (
                                      <span
                                        className="ml-[2px] w-[2px] h-[14px] bg-[#0F172A] inline-block"
                                        style={{ animation: 'cursorBlink 1s step-end infinite' }}
                                      />
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-[#94A3B8] font-[450]">{field.label}</span>
                                )}
                              </div>
                              {field.value && !field.active && (
                                <span className="text-[#2ECC71] text-[13px] font-bold">✓</span>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Animated CTA Button */}
                        <button
                          type="button"
                          onClick={handleManualSubmit}
                          className="w-full mt-[6px] bg-[#2ECC71] text-white font-bold text-[12.5px] tracking-[0.02em] uppercase rounded-[11px] h-[46px] shadow-[0_10px_24px_rgba(46,204,113,0.38)] hover:bg-[#27C065] transition-all active:scale-[0.98]"
                          style={{ animation: isSubmitted ? "none" : "buttonPulse 2.4s ease-in-out infinite" }}
                        >
                          {isSubmitted ? "¡Enviado! ✓" : "Quiero más información"}
                        </button>

                        {isSubmitted && (
                          <div className="text-[11px] text-[#2ECC71] font-semibold text-center animate-pulse">
                            ¡Listo! Te contactamos en menos de 2hs.
                          </div>
                        )}

                        <div className="flex items-center justify-center gap-1.5 pt-[2px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                          <span className="text-[10px] text-[#64748B] font-medium tracking-[0.01em]">
                            Respuesta en &lt; 2hs • Sin spam
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Base & Shadow */}
                <div className="mx-auto w-[84%] h-[12px] bg-gradient-to-b from-[#CBD5E1] to-[#94A3B8] rounded-b-[9px] shadow-[0_10px_24px_rgba(0,0,0,0.32)]" />
                <div className="mx-auto w-[96%] h-[7px] bg-[#0F1F3D]/40 rounded-b-[12px] blur-[1px]" />

                {/* Person Cutout Card in foreground */}
                <div className="absolute -bottom-[8px] right-0 w-[148px] h-[210px] md:w-[158px] md:h-[224px] pointer-events-none select-none">
                  <div className="w-full h-full rounded-[16px] overflow-hidden relative shadow-[0_16px_40px_rgba(0,0,0,0.45)] bg-[#0A1930] border border-white/10">
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src="/images/marketing/man-cutout.jpg"
                        alt="Hombre camisa azul cruzado de brazos"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "68% 32%", transform: "scale(2.85)", transformOrigin: "68% 28%" }}
                        onError={(e) => {
                          // Fallback to high quality unsplash business portrait if local image has issues
                          e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0A1930] via-[#0A1930]/30 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Floating Benefit Pills on the right of Laptop (Desktop) */}
              <div className="hidden lg:flex flex-col gap-[18px] w-[180px] shrink-0 pt-[46px]">
                {[
                  { title: "Más leads calificados", icon: "M" },
                  { title: "Mejor rendimiento de tu inversión", icon: "↗" },
                  { title: "Estrategia orientada a resultados", icon: "◎" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2ECC71] flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(46,204,113,0.35)] text-white">
                      {idx === 0 && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8" r="3.2" stroke="white" strokeWidth="1.7" />
                          <path d="M5.5 19.5C5.5 16 8.7 13.5 12 13.5C13.8 13.5 15.5 14.2 16.8 15.3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M18 17L20.5 14.5M20.5 14.5L18 12M20.5 14.5H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H11M17 7V13" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="1.6" />
                          <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.6" />
                          <circle cx="12" cy="12" r="1" fill="white" />
                        </svg>
                      )}
                    </div>
                    <div className="pt-[3px]">
                      <div className="text-[12.5px] font-semibold leading-[1.22] text-white tracking-[-0.01em] max-w-[110px]">
                        {item.title}
                      </div>
                      <div className="mt-[6px] w-[22px] h-[2px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof Checkmarks below Laptop */}
            <div className="hidden lg:flex items-center gap-2 mt-[28px] justify-end pr-[190px]">
              <div className="flex -space-x-[5px]">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-[22px] h-[22px] rounded-full border-[2px] border-[#0A1930] bg-[#1E3A6E] flex items-center justify-center text-[9px] font-bold text-white">
                    ✓
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-white/60 tracking-[0.01em]">
                +127 empresas escalando con nosotros
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
