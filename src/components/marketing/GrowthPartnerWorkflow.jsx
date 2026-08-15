import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Eye, 
  Layers, 
  Rocket, 
  RefreshCw, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const workflowSteps = [
  {
    step: "01",
    title: "Analizamos",
    desc: "Entendemos tu negocio, oferta, público, canales y objetivos.",
    icon: Search,
    color: "text-blue-400"
  },
  {
    step: "02",
    title: "Detectamos oportunidades",
    desc: "Analizamos pauta, SEO, sitio web, datos y conversión.",
    icon: Eye,
    color: "text-indigo-400"
  },
  {
    step: "03",
    title: "Construimos",
    desc: "Desarrollamos y optimizamos los activos necesarios: pauta, SEO, LPs y analytics.",
    icon: Layers,
    color: "text-purple-400"
  },
  {
    step: "04",
    title: "Lanzamos y medimos",
    desc: "Ponemos en marcha y medimos tráfico, comportamiento y conversiones.",
    icon: Rocket,
    color: "text-cyan-400"
  },
  {
    step: "05",
    title: "Optimizamos",
    desc: "Identificamos qué mejora y aplicamos pruebas y ajustes continuos.",
    icon: RefreshCw,
    color: "text-amber-400"
  },
  {
    step: "06",
    title: "Escalamos",
    desc: "Escalamos lo que funciona, mejoramos resultados y crecemos.",
    icon: TrendingUp,
    color: "text-[#2ECC71]"
  }
];

export default function GrowthPartnerWorkflow() {
  return (
    <section>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-mono text-[10px] tracking-[0.3em] text-indigo-400 uppercase font-bold block mb-2">
          METODOLOGÍA DE CRECIMIENTO
        </span>
        <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
          ¿CÓMO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">FUNCIONA?</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-light">
          Un proceso sistemático de 6 fases diseñado para convertir visitantes en clientes fidelizados.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {workflowSteps.map((s, idx) => {
          const StepIcon = s.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-400/40 backdrop-blur-xl flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <StepIcon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="font-mono text-xs font-black text-slate-500 group-hover:text-indigo-400 transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-headline text-sm font-bold text-white mb-2 leading-snug">
                  {s.title}
                </h3>
              </div>

              <p className="text-slate-400 text-xs font-light leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
