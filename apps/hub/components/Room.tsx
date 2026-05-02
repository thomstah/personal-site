export function Room() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/room.png"
      alt=""
      draggable={false}
      style={{
        position:   'absolute',
        inset:      0,
        width:      '100%',
        height:     '100%',
        objectFit:  'fill',
        display:    'block',
        userSelect: 'none',
      }}
    />
  );
}
