
import React from 'react';
import { m } from 'framer-motion';

// Ripple Effect Wrapper
export const Ripple = ({ children, className }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// Pulse Animation for CTAs
export const Pulse = ({ children, className }) => (
  <m.div
    className={className}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
  </m.div>
);

// Fade In on Scroll
export const FadeIn = ({ children, delay = 0, className }) => (
  <m.div
    className={className}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </m.div>
);

// Slide Up on Scroll
export const SlideUp = ({ children, delay = 0, className }) => (
  <m.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </m.div>
);

// Bounce Effect
export const Bounce = ({ children, className }) => (
  <m.div
    className={className}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {children}
  </m.div>
);

// Stagger Container
export const StaggerContainer = ({ children, className, staggerDelay = 0.1 }) => (
  <m.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
  >
    {children}
  </m.div>
);

export const StaggerItem = ({ children, className }) => (
  <m.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </m.div>
);

const MicroInteraction = {
  Ripple,
  Pulse,
  FadeIn,
  SlideUp,
  Bounce,
  StaggerContainer,
  StaggerItem
};

export default MicroInteraction;
