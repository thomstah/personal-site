'use client';

const FRAME_SIZE = 64;
const SCALE = 2;
const FRAME_COUNT = 9;  // LPC walk cycle frames
const WALK_ROW_Y = 640; // walk-south = row 10 × 64px
const SHEET_W = 832;
const SHEET_H = 3456;

export function PixelCharacter() {
  const scaledY = WALK_ROW_Y * SCALE;
  const totalWidth = FRAME_COUNT * FRAME_SIZE * SCALE;

  return (
    <>
      <style>{`
        @keyframes walk-south {
          from { background-position: 0px -${scaledY}px; }
          to   { background-position: -${totalWidth}px -${scaledY}px; }
        }
      `}</style>
      <div
        data-testid="pixel-character"
        style={{
          width: FRAME_SIZE * SCALE,
          height: FRAME_SIZE * SCALE,
          backgroundImage: 'url(/sprite.png)',
          backgroundSize: `${SHEET_W * SCALE}px ${SHEET_H * SCALE}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: `walk-south 0.7s steps(${FRAME_COUNT}) infinite`,
        }}
      />
    </>
  );
}
