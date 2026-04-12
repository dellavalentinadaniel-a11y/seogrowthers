
import React from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { CheckCircle, TrendingUp, Users, Award } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const springValue = useSpring(0, { duration: 2000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const stats = [
  {
    icon: CheckCircle,
    value: 500,
    suffix: "+",
    label: "Auditorías realizadas",
    color: "text-cyan-400"
  },
  {
    icon: TrendingUp,
    value: 2000,
    suffix: "%",
    label: "Crecimiento promedio",
    color: "text-green-400"
  },
  {
    icon: Users,
    value: 150,
    suffix: "+",
    label: "Clientes satisfechos",
    color: "text-orange-400"
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Años de experiencia",
    color: "text-purple-400"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0e27] to-[#111827] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300"
              >
                <div className={`mb-6 p-4 rounded-full bg-white/5 ${stat.color}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-mono">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
