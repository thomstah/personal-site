import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavDots } from './NavDots';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) =>
      <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('NavDots', () => {
  it('renders all three nav dot containers', () => {
    render(<NavDots />);
    expect(screen.getByTestId('nav-dot-portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('nav-dot-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('nav-dot-stalk me')).toBeInTheDocument();
  });

  it('renders all three labels', () => {
    render(<NavDots />);
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText('GALLERY')).toBeInTheDocument();
    expect(screen.getByText('STALK ME')).toBeInTheDocument();
  });

  it('renders within the nav-dots container', () => {
    render(<NavDots />);
    expect(screen.getByTestId('nav-dots')).toBeInTheDocument();
  });
});
