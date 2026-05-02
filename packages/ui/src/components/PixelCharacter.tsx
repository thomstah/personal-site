'use client';

import { animation } from '../tokens';

const FRAME_SIZE = 64;
const SCALE = 2;

// LPC layout: walk-south = row 10, frame 0 (standing idle facing forward)
const IDLE_X = 0;
const IDLE_Y = 640;

const SHEET_W = 832;
const SHEET_H = 3456;

export function PixelCharacter() {
  return (
    <>
      <style>{`
        @keyframes pixel-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${animation.floatDistance}); }
        }
      `}</style>
      <div
        data-testid="pixel-character"
        style={{ animation: `pixel-float ${animation.floatDuration} ease-in-out infinite` }}
      >
        <div
          style={{
            width: FRAME_SIZE * SCALE,
            height: FRAME_SIZE * SCALE,
            backgroundImage: 'url(/sprite.png)',
            backgroundPosition: `-${IDLE_X * SCALE}px -${IDLE_Y * SCALE}px`,
            backgroundSize: `${SHEET_W * SCALE}px ${SHEET_H * SCALE}px`,
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </>
  );
}
