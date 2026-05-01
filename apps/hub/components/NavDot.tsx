'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animation } from '@thommyxay/ui';

interface NavDotProps {
  label: string;
  href: string;
  color: string;
  delay?: number;
}

export function NavDot({ label, href, color, delay = 0 }: NavDotProps) {
  const [hovered, setHovered] = useState(false);
  const [navigating, setNavigating] = useState(false);

  function handleClick() {
    setNavigating(true);
    setTimeout(() => {
      window.location.href = href;
    }, animation.transitionDuration);
  }

  return (
    <>
      <AnimatePresence>
        {navigating && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animation.transitionDuration / 1000 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#ffffff',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        data-testid={`nav-dot-${label.toLowerCase()}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animation.fadeInDuration, ease: 'easeOut', delay }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                marginBottom: '8px',
                backgroundColor: '#111111',
                color: '#faf9f6',
                fontSize: '8px',
                padding: '4px 8px',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-pixelify-sans)',
                pointerEvents: 'none',
              }}
            >
              {href}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: hovered ? animation.hoverScale : 1 }}
          transition={{ duration: animation.hoverDuration / 1000 }}
          style={{
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />

        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.15em',
            color: hovered ? '#111111' : '#aaaaaa',
            transition: `color ${animation.hoverDuration}ms ease`,
            fontFamily: 'var(--font-pixelify-sans)',
          }}
        >
          {label}
        </span>
      </motion.div>
    </>
  );
}
