'use client';

import { motion } from 'framer-motion';
import { animation } from '../tokens';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      data-testid="page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: animation.transitionDuration / 1000, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
