'use client';

const PIXEL_SIZE = 4;

const COLORS: Record<string, string> = {
  h: '#3a2a1a',
  s: '#f5c5a3',
  e: '#1a3a5a',
  m: '#c06060',
  b: '#2a4a7a',
  B: '#4a6a9a',
  p: '#1a2a3a',
  f: '#0d1520',
};

// 14 cols × 22 rows. Edit individual chars to iterate on the character design.
const GRID = [
  '___hhhhhhhh___', // 0  hair
  '___hhhhhhhh___', // 1
  '__ssssssssss__', // 2  face
  '__ssssssssss__', // 3
  '__ss_ee_ee_ss_', // 4  eyes
  '__ss_ee_ee_ss_', // 5
  '__ssssssssss__', // 6
  '__ss_mmmm_ss__', // 7  mouth
  '__ssssssssss__', // 8
  '__bbbbbbbbbb__', // 9  jacket
  '__bbbbbbbbbb__', // 10
  '_bBBBBBBBBBBb_', // 11 jacket highlight
  '__bbbbbbbbbb__', // 12
  '__bbbbbbbbbb__', // 13
  '__bbbbbbbbbb__', // 14
  '__pppp__pppp__', // 15 pants
  '__pppp__pppp__', // 16
  '__pppp__pppp__', // 17
  '__pppp__pppp__', // 18
  '_fffff__fffff_', // 19 shoes
  '_fffff__fffff_', // 20
  '_ffffff_ffffff', // 21
];

export function PixelCharacter() {
  return (
    <>
      <style>{`
        @keyframes pixel-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        data-testid="pixel-character"
        style={{ animation: 'pixel-float 3s ease-in-out infinite' }}
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
