import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavDot } from './NavDot';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) =>
      <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('NavDot', () => {
  it('renders the label', () => {
    render(<NavDot label="PORTFOLIO" href="https://portfolio.thommyxay.com" color="#111111" />);
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
  });

  it('renders with correct testid', () => {
    render(<NavDot label="GALLERY" href="https://gallery.thommyxay.com" color="#888888" />);
    expect(screen.getByTestId('nav-dot-gallery')).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', () => {
    render(<NavDot label="STALK ME" href="https://links.thommyxay.com" color="#cccccc" />);
    fireEvent.mouseEnter(screen.getByTestId('nav-dot-stalk me'));
    expect(screen.getByText('https://links.thommyxay.com')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(<NavDot label="STALK ME" href="https://links.thommyxay.com" color="#cccccc" />);
    const dot = screen.getByTestId('nav-dot-stalk me');
    fireEvent.mouseEnter(dot);
    fireEvent.mouseLeave(dot);
    expect(screen.queryByText('https://links.thommyxay.com')).not.toBeInTheDocument();
  });

  it('navigates to href after click with delay', async () => {
    vi.useFakeTimers();
    render(<NavDot label="PORTFOLIO" href="https://portfolio.thommyxay.com" color="#111111" />);
    fireEvent.click(screen.getByTestId('nav-dot-portfolio'));
    expect(window.location.href).toBe('');
    vi.advanceTimersByTime(300);
    expect(window.location.href).toBe('https://portfolio.thommyxay.com');
    vi.useRealTimers();
  });
});
