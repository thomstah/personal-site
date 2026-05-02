'use client';

import { useState, useEffect } from 'react';

const FRAME_SIZE = 64;
const SCALE = 2;
const SHEET_W = 832;
const SHEET_H = 3456;
const MS_PER_FRAME = 100;
const CYCLES_PER_ANIM = 2;

// South-facing LPC animations — object-free body movements only
// TODO: identify additional Universal LPC rows (idle, emotes, etc.)
const ANIMATIONS = [
  { name: 'walk', y: 640, frames: 9 },
] as const;

type Anim = typeof ANIMATIONS[number];

// Stable keyframe definitions — all built upfront so the <style> tag never changes
const KEYFRAMES = ANIMATIONS.map(({ name, y, frames }) => {
  const sy = y * SCALE;
  const sw = frames * FRAME_SIZE * SCALE;
  return `@keyframes sprite-${name} { from { background-position: 0px -${sy}px; } to { background-position: -${sw}px -${sy}px; } }`;
}).join('\n');

function pickRandom(exclude: Anim): Anim {
  const pool = ANIMATIONS.filter(a => a !== exclude);
  if (pool.length === 0) return exclude;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function PixelCharacter() {
  const [anim, setAnim] = useState<Anim>(ANIMATIONS[0]);

  useEffect(() => {
    const ms = anim.frames * MS_PER_FRAME * CYCLES_PER_ANIM;
    const id = setTimeout(() => setAnim(prev => pickRandom(prev)), ms);
    return () => clearTimeout(id);
  }, [anim]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        data-testid="pixel-character"
        style={{
          width: FRAME_SIZE * SCALE,
          height: FRAME_SIZE * SCALE,
          backgroundImage: 'url(/sprite.png)',
          backgroundSize: `${SHEET_W * SCALE}px ${SHEET_H * SCALE}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: `sprite-${anim.name} ${(anim.frames * MS_PER_FRAME / 1000).toFixed(2)}s steps(${anim.frames}) infinite`,
        }}
      />
    </>
  );
}
