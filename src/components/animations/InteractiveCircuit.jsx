import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveCircuit({ steps, className = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % steps.length);
      }, 3000); // 3 seconds interval
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, steps.length]);

  return (
    <div className={`interactive-circuit-container ${className}`}>
      {/* Visual Area (The Circuit) */}
      <div 
        className="flex justify-center gap-4 mb-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isImageUrl = typeof step.icon === 'string';
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={index}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_20px_rgba(46,204,113,0.3)]' 
                  : 'border-white/10 bg-slate-900/40 hover:border-white/30'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {isImageUrl ? (
                <img src={step.icon} alt={step.title} className="w-8 h-8 object-cover rounded-md" />
              ) : (
                <Icon className={`w-8 h-8 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Detail Area */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-3xl bg-slate-900/60 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-2">{steps[activeIndex].title}</h3>
            <div className="text-slate-300">{steps[activeIndex].description}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
