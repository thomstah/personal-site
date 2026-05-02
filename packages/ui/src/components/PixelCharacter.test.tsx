import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PixelCharacter } from './PixelCharacter';

describe('PixelCharacter', () => {
  it('renders the character container', () => {
    render(<PixelCharacter />);
    expect(screen.getByTestId('pixel-character')).toBeInTheDocument();
  });

  it('applies the pixel-float animation', () => {
    render(<PixelCharacter />);
    const el = screen.getByTestId('pixel-character');
    expect(el.style.animation).toContain('pixel-float');
  });

  it('renders the sprite frame at the correct size', () => {
    render(<PixelCharacter />);
    const frame = screen.getByTestId('pixel-character').firstElementChild as HTMLElement;
    expect(frame.style.width).toBe('128px');
    expect(frame.style.height).toBe('128px');
  });

  it('points to the sprite sheet', () => {
    render(<PixelCharacter />);
    const frame = screen.getByTestId('pixel-character').firstElementChild as HTMLElement;
    expect(frame.style.backgroundImage).toContain('sprite.png');
  });
});
