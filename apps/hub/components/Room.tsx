// Top-down pixel-art apartment room.
// All sizes use % so the component scales to any container.
// Back wall = top 30%, floor = bottom 70%.

const BOOKS = [
  { l: '5%',  t: '4%',  w: '12%', h: '27%', c: '#8b2020' },
  { l: '18%', t: '6%',  w: '10%', h: '24%', c: '#204a8b' },
  { l: '30%', t: '4%',  w: '14%', h: '26%', c: '#206820' },
  { l: '46%', t: '6%',  w: '10%', h: '23%', c: '#8b6820' },
  { l: '58%', t: '4%',  w: '12%', h: '27%', c: '#6820a0' },
  { l: '72%', t: '5%',  w: '14%', h: '25%', c: '#204a8b' },
  { l: '5%',  t: '37%', w: '14%', h: '25%', c: '#8b4520' },
  { l: '22%', t: '38%', w: '10%', h: '23%', c: '#206868' },
  { l: '34%', t: '36%', w: '12%', h: '27%', c: '#8b2060' },
  { l: '48%', t: '38%', w: '14%', h: '24%', c: '#408b20' },
  { l: '64%', t: '37%', w: '10%', h: '25%', c: '#20608b' },
  { l: '76%', t: '36%', w: '12%', h: '27%', c: '#8b2020' },
  { l: '5%',  t: '70%', w: '12%', h: '23%', c: '#68208b' },
  { l: '19%', t: '70%', w: '14%', h: '25%', c: '#8b5820' },
  { l: '35%', t: '71%', w: '10%', h: '24%', c: '#20488b' },
  { l: '47%', t: '70%', w: '12%', h: '25%', c: '#208b40' },
  { l: '61%', t: '72%', w: '14%', h: '23%', c: '#8b2020' },
];

export function Room() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>

      {/* ── Back wall ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', backgroundColor: '#6b4f38' }} />

      {/* ── Floor (wood planks) ── */}
      <div style={{
        position: 'absolute', top: '30%', left: 0, right: 0, bottom: 0,
        background: 'repeating-linear-gradient(90deg,#c8966e 0px,#c8966e 80px,#be8c64 80px,#be8c64 160px)',
      }} />

      {/* Wall-floor shadow */}
      <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: 4, backgroundColor: '#2d1f12' }} />

      {/* ── Bookshelf ── */}
      <div style={{ position: 'absolute', top: 0, left: '2%', width: '9%', height: '30%', backgroundColor: '#3d2b1a' }}>
        {[33, 66].map(p => (
          <div key={p} style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 4, backgroundColor: '#2d1f12' }} />
        ))}
        {BOOKS.map((b, i) => (
          <div key={i} style={{ position: 'absolute', left: b.l, top: b.t, width: b.w, height: b.h, backgroundColor: b.c }} />
        ))}
      </div>

      {/* ── Window ── */}
      <div style={{
        position: 'absolute', top: '3%', left: '30%', width: '22%', height: '22%',
        backgroundColor: '#a8d8ea', border: '5px solid #4a3020', boxSizing: 'border-box',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, backgroundColor: '#4a3020', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, backgroundColor: '#4a3020', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', inset: 4, background: 'rgba(255,255,255,0.15)' }} />
      </div>

      {/* ── Desk ── */}
      {/* Desk surface */}
      <div style={{ position: 'absolute', top: '18%', right: '2%', width: '14%', height: '16%', backgroundColor: '#5c3d28' }}>
        {/* Monitor: -50% of desk height puts it above the desk */}
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '57%', height: '44%', backgroundColor: '#1a1a2e' }}>
          <div style={{ position: 'absolute', inset: 3, backgroundColor: '#2a3a5e' }} />
        </div>
        {/* Stand */}
        <div style={{ position: 'absolute', top: '-6%', left: '50%', transform: 'translateX(-50%)', width: '11%', height: '6%', backgroundColor: '#1a1a2e' }} />
        {/* Keyboard */}
        <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '43%', height: '9%', backgroundColor: '#2a2a3a' }} />
      </div>

      {/* ── Couch ── */}
      <div style={{ position: 'absolute', top: '60%', left: '3%', width: '22%', height: '12%', backgroundColor: '#7a3a2a' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', backgroundColor: '#6a2a1a' }} />
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: 'absolute', top: '22%', left: `${5 + i * 33}%`, width: '28%', height: '58%', backgroundColor: '#8a4a38' }} />
        ))}
      </div>

      {/* ── Rug ── */}
      <div style={{ position: 'absolute', top: '52%', left: '25%', width: '35%', height: '22%', backgroundColor: '#7a3020' }}>
        <div style={{ position: 'absolute', inset: 8, border: '3px solid #5a2010' }} />
        <div style={{ position: 'absolute', inset: 16, backgroundColor: '#6a2818' }} />
      </div>

      {/* ── Plant ── */}
      <div style={{ position: 'absolute', bottom: '5%', right: '4%' }}>
        <div style={{ position: 'relative', width: 22, height: 20, backgroundColor: '#2d7a2a' }}>
          <div style={{ position: 'absolute', top: '30%', left: '-40%', width: '55%', height: '45%', backgroundColor: '#3a8a30' }} />
          <div style={{ position: 'absolute', top: '30%', right: '-40%', width: '55%', height: '45%', backgroundColor: '#268020' }} />
        </div>
        <div style={{ width: 16, height: 9, backgroundColor: '#8b5a2a', margin: '0 auto' }} />
      </div>

    </div>
  );
}
