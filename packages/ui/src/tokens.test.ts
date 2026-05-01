import { describe, it, expect } from 'vitest';
import { colors, fontSizes, spacing, animation, tokens } from './tokens';

describe('colors', () => {
  it('has correct background', () => {
    expect(colors.background).toBe('#faf9f6');
  });
  it('has three dot colors dark-to-light', () => {
    expect(colors.dots).toHaveLength(3);
    expect(colors.dots[0]).toBe('#111111');
    expect(colors.dots[1]).toBe('#888888');
    expect(colors.dots[2]).toBe('#cccccc');
  });
});

describe('animation', () => {
  it('has correct hover scale', () => {
    expect(animation.hoverScale).toBe(1.3);
  });
  it('has correct transition duration in ms', () => {
    expect(animation.transitionDuration).toBe(300);
  });
  it('has correct hover duration in ms', () => {
    expect(animation.hoverDuration).toBe(150);
  });
});

describe('tokens', () => {
  it('re-exports all sub-objects', () => {
    expect(tokens.colors).toBe(colors);
    expect(tokens.fontSizes).toBe(fontSizes);
    expect(tokens.spacing).toBe(spacing);
    expect(tokens.animation).toBe(animation);
  });
});
