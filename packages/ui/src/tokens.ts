export const colors = {
  background: '#faf9f6',
  text: '#111111',
  textMuted: '#aaaaaa',
  rule: '#e0e0e0',
  dots: ['#111111', '#888888', '#cccccc'] as const,
  overlay: '#ffffff',
} as const;

export const fontSizes = {
  name: '30px',
  subtitle: '10px',
  label: '9px',
  tooltip: '8px',
} as const;

export const spacing = {
  dotSize: '9px',
  dotGap: '32px',
  ruleWidth: '32px',
} as const;

export const animation = {
  floatDuration: '3s',
  floatDistance: '6px',
  staggerDelay: 0.1,
  fadeInDuration: 0.4,
  hoverScale: 1.3,
  hoverDuration: 150,
  transitionDuration: 300,
} as const;

export const tokens = { colors, fontSizes, spacing, animation } as const;
