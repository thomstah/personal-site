import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HubPage } from './HubPage';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) =>
      <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HubPage', () => {
  it('renders the hub page container', () => {
    render(<HubPage />);
    expect(screen.getByTestId('hub-page')).toBeInTheDocument();
  });

  it('renders the walking character', () => {
    render(<HubPage />);
    expect(screen.getByTestId('walking-character')).toBeInTheDocument();
  });

  it('renders the name', () => {
    render(<HubPage />);
    expect(screen.getByText('Thommy Xay')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HubPage />);
    expect(screen.getByText('PERSONAL HUB')).toBeInTheDocument();
  });

  it('renders the nav dots', () => {
    render(<HubPage />);
    expect(screen.getByTestId('nav-dots')).toBeInTheDocument();
  });
});
