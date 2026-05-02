'use client';

import { useState, useEffect, useRef } from 'react';

const FRAME_SIZE = 64;
const SCALE = 2;           // 128px character — more visible in the smaller box
const CHAR = FRAME_SIZE * SCALE;
const SHEET_W = 832;
const SHEET_H = 3456;
const SPEED = 80;         // px / second
const IDLE_MS = 2500;

const WALK_ROWS = { north: 8, west: 9, south: 10, east: 11 } as const;
type Direction = keyof typeof WALK_ROWS;

// Walkable waypoints as box fractions [x, y].
// Mapped to the open wood floor in the square pixel bedroom/office.
// Avoids: desk+chair (left, y≈35-65%), camera+trash (far left),
//         dumbbells (right, y≈38-52%), right shelf (far right).
const WAYPOINT_FRACS: [number, number][] = [
  [0.28, 0.68],  // left-center open floor
  [0.48, 0.63],  // center floor
  [0.62, 0.68],  // center-right
  [0.40, 0.82],  // bottom center
  [0.55, 0.82],  // bottom right of center
  [0.28, 0.82],  // bottom left
];

const KEYFRAMES = (Object.entries(WALK_ROWS) as [Direction, number][])
  .map(([dir, row]) => {
    const y = row * FRAME_SIZE * SCALE;
    const w = 9 * FRAME_SIZE * SCALE;
    return `@keyframes walk-${dir}{from{background-position:0px -${y}px}to{background-position:-${w}px -${y}px}}`;
  })
  .join('\n');

const IDLE_BG_POS = `0px -${10 * FRAME_SIZE * SCALE}px`; // walk-south frame 0

function getDirection(dx: number, dy: number): Direction {
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'east' : 'west';
  return dy > 0 ? 'south' : 'north';
}

interface Props {
  boxWidth?: number;
  boxHeight?: number;
}

export function WalkingCharacter({ boxWidth, boxHeight }: Props = {}) {
  function getWaypoints() {
    const w = boxWidth  ?? window.innerWidth;
    const h = boxHeight ?? window.innerHeight;
    return WAYPOINT_FRACS.map(([fx, fy]) => ({
      x: w * fx - CHAR / 2,
      y: h * fy - CHAR / 2,
    }));
  }

  const [pos,            setPos]            = useState({ x: 0, y: 0 });
  const [direction,      setDirection]      = useState<Direction>('south');
  const [walking,        setWalking]        = useState(false);
  const [transitionSecs, setTransitionSecs] = useState(0);
  const [visible,        setVisible]        = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    const pts   = getWaypoints();
    const start = Math.floor(Math.random() * pts.length);
    idxRef.current = start;
    setPos(pts[start]);
    setVisible(true);

    let tWalk: ReturnType<typeof setTimeout>;
    let tIdle: ReturnType<typeof setTimeout>;

    function step() {
      const pts    = getWaypoints();
      const cur    = idxRef.current;
      const others = pts.map((_, i) => i).filter(i => i !== cur);
      const next   = others[Math.floor(Math.random() * others.length)];
      idxRef.current = next;

      const dx  = pts[next].x - pts[cur].x;
      const dy  = pts[next].y - pts[cur].y;
      const dur = Math.sqrt(dx * dx + dy * dy) / SPEED;

      setDirection(getDirection(dx, dy));
      setTransitionSecs(dur);
      setWalking(true);
      setPos(pts[next]);

      tWalk = setTimeout(() => {
        setWalking(false);
        tIdle = setTimeout(step, IDLE_MS);
      }, dur * 1000 + 80);
    }

    tIdle = setTimeout(step, IDLE_MS);
    return () => { clearTimeout(tWalk); clearTimeout(tIdle); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        data-testid="walking-character"
        style={{
          position:           'absolute',
          left:               pos.x,
          top:                pos.y,
          width:              CHAR,
          height:             CHAR,
          backgroundImage:    'url(/sprite.png)',
          backgroundSize:     `${SHEET_W * SCALE}px ${SHEET_H * SCALE}px`,
          backgroundRepeat:   'no-repeat',
          imageRendering:     'pixelated',
          opacity:            visible ? 1 : 0,
          zIndex:             1,
          transition:         walking
            ? `left ${transitionSecs}s linear, top ${transitionSecs}s linear`
            : 'none',
          animation:          walking ? `walk-${direction} 0.6s steps(9) infinite` : 'none',
          backgroundPosition: walking ? undefined : IDLE_BG_POS,
        }}
      />
    </>
  );
}
