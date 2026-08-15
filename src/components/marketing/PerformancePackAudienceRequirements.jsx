import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Building2,
  UserCheck,
  Store,
  ShoppingCart,
  Briefcase,
  MapPin,
  CalendarCheck,
  TrendingUp,
  Star
} from 'lucide-react';

const audienceCol1 = [
  { text: "Empresas de servicios", icon: Building2 },
  { text: "Profesionales", icon: UserCheck },
  { text: "Comercios", icon: Store },
  { text: "E-commerce", icon: ShoppingCart },
  { text: "Empresas B2B", icon: Briefcase }
];

const audienceCol2 = [
  { text: "Negocios locales", icon: MapPin },
  { text: "Centros y establecimientos con reservas o consultas", icon: CalendarCheck },
  { text: "Empresas que necesitan generar oportunidades comerciales de manera constante", icon: TrendingUp }
];

const requirementsCol1 = [
  "Una oferta o servicio definido",
  "Información sobre el público objetivo",
  "Material de marca disponible",
  "Accesos a las plataformas publicitarias correspondientes"
];

const requirementsCol2 = [
  "Información comercial para desarrollar la Landing Page",
  "Un presupuesto de inversión publicitaria"
];

export default function PerformancePackAudienceRequirements() {
  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Card: ¿Para quién está pensado? */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 p-6 sm:p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 to-[#070E1E]/95 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
      >
        <div>
          <h2 className="font-headline text-2xl sm:text-3xl font-black text-white mb-8 tracking-tight">
            ¿Para quién está pensado?
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
            {/* Sub-col 1 */}
            <div className="space-y-4">
              {audienceCol1.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 font-light group">
                  <div className="w-6 h-6 rounded-full bg-[#2ECC71]/15 border border-[#2ECC71]/40 flex items-center justify-center shrink-0 text-[#2ECC71] group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Sub-col 2 */}
            <div className="space-y-4">
              {audienceCol2.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light group">
                  <div className="w-6 h-6 rounded-full bg-[#2ECC71]/15 border border-[#2ECC71]/40 flex items-center justify-center shrink-0 text-[#2ECC71] group-hover:scale-110 transition-transform mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Recommendation Green Alert Box */}
        <div className="p-4 rounded-2xl bg-[#2ECC71]/10 border border-[#2ECC71]/30 flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#2ECC71]/20 flex items-center justify-center shrink-0 text-[#2ECC71] mt-0.5">
            <Star className="w-4 h-4 fill-[#2ECC71]" />
          </div>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Es especialmente recomendable para negocios que ya tienen una <strong className="text-white font-medium">oferta definida</strong> y <strong className="text-white font-medium">capacidad para atender los leads generados</strong>.
          </p>
        </div>
      </motion.div>

      {/* Right Card: Photo & ¿Qué necesitás para comenzar? */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 rounded-[2.5rem] bg-gradient-to-b from-[#0A1930]/90 to-[#070E1E]/95 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col justify-between"
      >
        {/* Top Professional Photo from user's assets */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden">
          <img
            src="/images/marketing/icons/office-presentation.jpg"
            alt="Presentación estratégica y equipo"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = "/images/marketing/icons/office-team-meeting.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom Requirements Content */}
        <div className="p-6 sm:p-8">
          <h2 className="font-headline text-2xl font-black text-white mb-6 tracking-tight">
            ¿Qué necesitás para comenzar?
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
            <div className="space-y-3.5">
              {requirementsCol1.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECC71] shrink-0 mt-0.5" />
                  <span className="leading-tight">{req}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3.5">
              {requirementsCol2.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECC71] shrink-0 mt-0.5" />
                  <span className="leading-tight">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
