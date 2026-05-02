'use client';

import { motion } from 'framer-motion';
import { colors, fontSizes, spacing, animation } from '@thommyxay/ui';
import { NavDots } from './NavDots';
import { Room } from './Room';
import { WalkingCharacter } from './WalkingCharacter';

function fadeUp(delay: number) {
  return {
    initial:    { opacity: 0, y: 8 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: animation.fadeInDuration, ease: 'easeOut' as const, delay },
  };
}

export function HubPage() {
  return (
    <main
      data-testid="hub-page"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
    >
      <Room />
      <WalkingCharacter />

      {/* Nav card — centred, frosted glass over the room */}
      <div
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          zIndex:         10,
          pointerEvents:  'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animation.fadeInDuration }}
          style={{
            pointerEvents:        'auto',
            display:              'flex',
            flexDirection:        'column',
            alignItems:           'center',
            gap:                  '20px',
            padding:              '28px 40px',
            backgroundColor:      'rgba(250, 249, 246, 0.88)',
            backdropFilter:       'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            {...fadeUp(0.1)}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-pixelify-sans)',
                fontSize:   fontSizes.name,
                fontWeight: 700,
                color:      colors.text,
              }}
            >
              Thommy Xay
            </span>
            <span
              style={{
                fontFamily:    'var(--font-pixelify-sans)',
                fontSize:      fontSizes.subtitle,
                letterSpacing: '0.3em',
                color:         colors.textMuted,
              }}
            >
              PERSONAL HUB
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.2)}
            style={{ width: spacing.ruleWidth, height: '1px', backgroundColor: colors.rule }}
          />

          <NavDots />
        </motion.div>
      </div>
    </main>
  );
}
