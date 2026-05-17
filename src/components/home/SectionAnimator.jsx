import React from 'react';
import { m } from 'framer-motion';

const SectionAnimator = ({ children, className }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export default SectionAnimator;