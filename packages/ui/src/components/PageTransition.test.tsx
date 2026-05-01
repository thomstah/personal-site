import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageTransition } from './PageTransition';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) =>
      <div {...props}>{children}</div>,
  },
}));

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <p>Hello world</p>
      </PageTransition>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('wraps content in a testid container', () => {
    render(
      <PageTransition>
        <span>Content</span>
      </PageTransition>
    );
    expect(screen.getByTestId('page-transition')).toBeInTheDocument();
  });
});
