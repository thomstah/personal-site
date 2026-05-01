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

  it('renders 22 pixel rows', () => {
    render(<PixelCharacter />);
    const inner = screen.getByTestId('pixel-character').firstElementChild as HTMLElement;
    expect(inner.children).toHaveLength(22);
  });

  it('renders 14 pixel columns per row', () => {
    render(<PixelCharacter />);
    const inner = screen.getByTestId('pixel-character').firstElementChild as HTMLElement;
    const firstRow = inner.children[0] as HTMLElement;
    expect(firstRow.children).toHaveLength(14);
  });
});
