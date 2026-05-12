'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colors, fontSizes, spacing, animation } from '@thommyxay/ui';
import { NavDots } from './NavDots';
import { Room } from './Room';
import { WalkingCharacter } from './WalkingCharacter';

const MAX_BOX_W = 400;
const ASPECT    = 399 / 400; // 1382×1380 image ≈ 1:1

function fadeUp(delay: number) {
  return {
    initial:    { opacity: 0, y: 8 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: animation.fadeInDuration, ease: 'easeOut' as const, delay },
  };
}

export function HubPage() {
  const [boxW, setBoxW] = useState(MAX_BOX_W);
  const [boxH, setBoxH] = useState(Math.round(MAX_BOX_W * ASPECT));

  useEffect(() => {
    function update() {
      const w = Math.min(MAX_BOX_W, window.innerWidth - 32);
      setBoxW(w);
      setBoxH(Math.round(w * ASPECT));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

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
          width:    boxW,
          height:   boxH,
          overflow: 'hidden',
          outline:  `2px solid ${colors.rule}`,
        }}
      >
        <Room />
        <WalkingCharacter boxWidth={boxW} boxHeight={boxH} />
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
