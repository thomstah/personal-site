import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PixelCharacter } from './PixelCharacter';

describe('PixelCharacter', () => {
  it('renders the character container', () => {
    render(<PixelCharacter />);
    expect(screen.getByTestId('pixel-character')).toBeInTheDocument();
  });

  it('applies the walk-south animation', () => {
    render(<PixelCharacter />);
    expect(screen.getByTestId('pixel-character').style.animation).toContain('walk-south');
  });

  it('renders at the correct frame size', () => {
    render(<PixelCharacter />);
    const el = screen.getByTestId('pixel-character');
    expect(el.style.width).toBe('128px');
    expect(el.style.height).toBe('128px');
  });

  it('points to the sprite sheet', () => {
    render(<PixelCharacter />);
    expect(screen.getByTestId('pixel-character').style.backgroundImage).toContain('sprite.png');
  });
});
