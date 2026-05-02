'use client';

import { motion } from 'framer-motion';
import { colors, fontSizes, spacing, animation } from '@thommyxay/ui';
import { NavDots } from './NavDots';
import { Room } from './Room';
import { WalkingCharacter } from './WalkingCharacter';

const BOX_W = 400;
const BOX_H = 399; // 1382×1380 image → ~1:1 → 400×399

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
      style={{
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        minHeight:       '100vh',
        backgroundColor: colors.background,
        gap:             '20px',
        overflow:        'hidden',
      }}
    >
      {/* Room diorama box */}
      <motion.div
        {...fadeUp(0)}
        style={{
          position: 'relative',
          width:    BOX_W,
          height:   BOX_H,
          overflow: 'hidden',
          outline:  `2px solid ${colors.rule}`,
        }}
      >
        <Room />
        <WalkingCharacter boxWidth={BOX_W} boxHeight={BOX_H} />
      </motion.div>

      {/* Name + subtitle */}
      <motion.div
        {...fadeUp(0.1)}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <span style={{ fontFamily: 'var(--font-pixelify-sans)', fontSize: fontSizes.name, fontWeight: 700, color: colors.text }}>
          Thommy Xay
        </span>
        <span style={{ fontFamily: 'var(--font-pixelify-sans)', fontSize: fontSizes.subtitle, letterSpacing: '0.3em', color: colors.textMuted }}>
          PERSONAL HUB
        </span>
      </motion.div>

      {/* Rule */}
      <motion.div
        {...fadeUp(0.2)}
        style={{ width: spacing.ruleWidth, height: '1px', backgroundColor: colors.rule }}
      />

      <NavDots />
    </main>
  );
}
