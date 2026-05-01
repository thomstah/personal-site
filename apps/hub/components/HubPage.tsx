'use client';

import { motion } from 'framer-motion';
import { PixelCharacter } from '@thommyxay/ui';
import { NavDots } from './NavDots';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' as const, delay },
  };
}

export function HubPage() {
  return (
    <main
      data-testid="hub-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#faf9f6',
        gap: '20px',
        overflow: 'hidden',
      }}
    >
      <motion.div {...fadeUp(0)}>
        <PixelCharacter />
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixelify-sans)',
            fontSize: '30px',
            fontWeight: 700,
            color: '#111111',
          }}
        >
          Thommy Xay
        </span>
        <span
          style={{
            fontFamily: 'var(--font-pixelify-sans)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#aaaaaa',
          }}
        >
          PERSONAL HUB
        </span>
      </motion.div>

      <motion.div
        {...fadeUp(0.2)}
        style={{ width: '32px', height: '1px', backgroundColor: '#e0e0e0' }}
      />

      <motion.div {...fadeUp(0.3)}>
        <NavDots />
      </motion.div>
    </main>
  );
}
