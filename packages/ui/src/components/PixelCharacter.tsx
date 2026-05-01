'use client';

import { animation } from '../tokens';

const PIXEL_SIZE = 4;

const COLORS: Record<string, string> = {
  h: '#111111',   // black hair
  s: '#c8956a',   // medium tan skin
  e: '#111111',   // dark eyes
  m: '#a06858',   // mouth
  c: '#2e3030',   // dark charcoal henley
  v: '#484a4a',   // henley placket detail
  p: '#3d5a8a',   // blue denim
  f: '#b8845a',   // birkenstock suede upper
  F: '#8a6840',   // birkenstock cork sole
};

// 14 cols × 22 rows. SDV-style proportions: big head, middle-part flowy hair,
// dark henley, blue jeans, Birkenstock Bostons.
const GRID = [
  '____hh__hh____', // 0  hair top, middle part visible
  '___hhhhhhhh___', // 1  hair
  '__hssssssssh__', // 2  face
  '__hssssssssh__', // 3  face
  '__hsseeseesh__', // 4  eyes (2px each, skin at nose bridge)
  '__hssssssssh__', // 5  face
  '__hsssmmsssh__', // 6  mouth
  '__hssssssssh__', // 7  face
  '__hssssssssh__', // 8  chin
  '_____ssss_____', // 9  neck
  '__ccc_ss_ccc__', // 10 collar (neck peeking through)
  '__cccccccccc__', // 11 henley
  '__cccccccccc__', // 12 henley
  '__ccc_vv_ccc__', // 13 henley placket buttons
  '__cccccccccc__', // 14 henley hem
  '__pppppppppp__', // 15 jeans waist
  '__pppp__pppp__', // 16 jeans
  '__pppp__pppp__', // 17
  '__pppp__pppp__', // 18
  '__pppp__pppp__', // 19
  '_fffff__fffff_', // 20 birkenstock suede
  '_FFFFF__FFFFF_', // 21 birkenstock cork sole
];

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
        <div style={{ display: 'inline-block', imageRendering: 'pixelated' }}>
          {GRID.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
              {row.split('').map((pixel, x) => (
                <div
                  key={x}
                  style={{
                    width: PIXEL_SIZE,
                    height: PIXEL_SIZE,
                    backgroundColor: COLORS[pixel] ?? 'transparent',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
