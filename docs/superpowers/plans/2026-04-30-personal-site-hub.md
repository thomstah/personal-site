# Personal Site Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `thommyxay.com` hub page — a full-viewport minimal white page with a floating pixel character, name, subtitle, rule, and three navigation dots linking to subdomains.

**Architecture:** Turborepo monorepo with `packages/ui` (shared tokens, PixelCharacter, PageTransition) and `apps/hub` (Next.js App Router). Navigation dots use `window.location.href` for cross-subdomain navigation with a Framer Motion white overlay transition. Stagger animations on load via Framer Motion.

**Tech Stack:** Next.js 15 (App Router), React 18, Framer Motion 11, Tailwind CSS 3, Pixelify Sans (Google Fonts), Vitest + React Testing Library, pnpm workspaces, Turborepo, AWS Amplify Hosting.

---

## File Map

```
package.json                                  root workspace config
pnpm-workspace.yaml                           pnpm workspace declarations
turbo.json                                    Turborepo pipeline
amplify.yml                                   AWS Amplify build config

packages/ui/
  package.json
  tsconfig.json
  vitest.config.ts
  src/
    test-setup.ts                             @testing-library/jest-dom import
    tokens.ts                                 design tokens (colors, sizes, animation)
    tokens.test.ts
    components/
      PixelCharacter.tsx                      pixel art sprite + float animation
      PixelCharacter.test.tsx
      PageTransition.tsx                      Framer Motion fade-in wrapper
      PageTransition.test.tsx
    index.ts                                  barrel exports

apps/hub/
  package.json
  next.config.ts                              transpilePackages: ['@thommyxay/ui']
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  vitest.config.ts
  vitest.setup.ts
  app/
    layout.tsx                                Pixelify Sans font + metadata
    page.tsx                                  renders <PageTransition><HubPage /></PageTransition>
    globals.css                               Tailwind directives + base resets
  components/
    HubPage.tsx                               full page: character + name + rule + dots
    HubPage.test.tsx
    NavDot.tsx                                dot + label + hover tooltip + click transition
    NavDot.test.tsx
    NavDots.tsx                               row of three NavDots
    NavDots.test.tsx
```

---

## Task 1: Initialize monorepo root

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create root `package.json`**

```json
{
  "name": "thommyxay-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "test": "turbo test",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "^2.3.3"
  },
  "engines": {
    "node": ">=18",
    "pnpm": ">=9"
  }
}
```

- [ ] **Step 2: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 3: Create `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {}
  }
}
```

- [ ] **Step 4: Add monorepo entries to `.gitignore`**

Append to existing `.gitignore`:
```
node_modules
.next
.turbo
dist
*.tsbuildinfo
.env*.local
.superpowers/
```

- [ ] **Step 5: Install Turborepo**

```bash
pnpm install
```

Expected: `node_modules/.pnpm` created, lockfile generated.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-workspace.yaml turbo.json .gitignore pnpm-lock.yaml
git commit -m "feat: initialize turborepo monorepo"
```

---

## Task 2: Scaffold packages/ui

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/vitest.config.ts`
- Create: `packages/ui/src/test-setup.ts`
- Create: `packages/ui/src/index.ts`

- [ ] **Step 1: Create `packages/ui/package.json`**

```json
{
  "name": "@thommyxay/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^15.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^24.1.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0"
  },
  "peerDependencies": {
    "framer-motion": "^11.0.0",
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

- [ ] **Step 2: Create `packages/ui/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `packages/ui/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
});
```

- [ ] **Step 4: Create `packages/ui/src/test-setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Create `packages/ui/src/index.ts`** (empty barrel, populated in later tasks)

```ts
export {};
```

- [ ] **Step 6: Install packages/ui dependencies**

```bash
pnpm install
```

Expected: `packages/ui/node_modules` populated.

- [ ] **Step 7: Commit**

```bash
git add packages/ui
git commit -m "feat: scaffold packages/ui"
```

---

## Task 3: Design tokens

**Files:**
- Create: `packages/ui/src/tokens.ts`
- Create: `packages/ui/src/tokens.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// packages/ui/src/tokens.test.ts
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
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd packages/ui && pnpm test
```

Expected: `Cannot find module './tokens'`

- [ ] **Step 3: Implement `packages/ui/src/tokens.ts`**

```ts
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
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd packages/ui && pnpm test
```

Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/tokens.ts packages/ui/src/tokens.test.ts
git commit -m "feat: add design tokens to packages/ui"
```

---

## Task 4: PixelCharacter component

**Files:**
- Create: `packages/ui/src/components/PixelCharacter.tsx`
- Create: `packages/ui/src/components/PixelCharacter.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// packages/ui/src/components/PixelCharacter.test.tsx
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
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd packages/ui && pnpm test
```

Expected: `Cannot find module './PixelCharacter'`

- [ ] **Step 3: Implement `packages/ui/src/components/PixelCharacter.tsx`**

Each character in the grid string maps to a color; `_` is transparent. Grid is 14 cols × 22 rows, rendered at 4px per pixel = 56×88px.

```tsx
'use client';

const PIXEL_SIZE = 4;

const COLORS: Record<string, string> = {
  h: '#3a2a1a',
  s: '#f5c5a3',
  e: '#1a3a5a',
  m: '#c06060',
  b: '#2a4a7a',
  B: '#4a6a9a',
  p: '#1a2a3a',
  f: '#0d1520',
};

// 14 cols × 22 rows. Edit individual chars to iterate on the character design.
const GRID = [
  '___hhhhhhhh___', // 0  hair
  '___hhhhhhhh___', // 1
  '__ssssssssss__', // 2  face
  '__ssssssssss__', // 3
  '__ss_ee_ee_ss_', // 4  eyes
  '__ss_ee_ee_ss_', // 5
  '__ssssssssss__', // 6
  '__ss_mmmm_ss__', // 7  mouth
  '__ssssssssss__', // 8
  '__bbbbbbbbbb__', // 9  jacket
  '__bbbbbbbbbb__', // 10
  '_bBBBBBBBBBBb_', // 11 jacket highlight
  '__bbbbbbbbbb__', // 12
  '__bbbbbbbbbb__', // 13
  '__bbbbbbbbbb__', // 14
  '__pppp__pppp__', // 15 pants
  '__pppp__pppp__', // 16
  '__pppp__pppp__', // 17
  '__pppp__pppp__', // 18
  '_fffff__fffff_', // 19 shoes
  '_fffff__fffff_', // 20
  '_ffffff_ffffff', // 21
];

export function PixelCharacter() {
  return (
    <>
      <style>{`
        @keyframes pixel-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        data-testid="pixel-character"
        style={{ animation: 'pixel-float 3s ease-in-out infinite' }}
      >
        <div style={{ display: 'inline-block', imageRendering: 'pixelated' }}>
          {GRID.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
              {row.split('').map((pixel, x) => (
                <div
                  key={x}
                  style={{
                    width: PIXEL_SIZE,
                    height: PIXEL_SIZE,
                    backgroundColor: COLORS[pixel] ?? 'transparent',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd packages/ui && pnpm test
```

Expected: `7 passed`

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/components/PixelCharacter.tsx packages/ui/src/components/PixelCharacter.test.tsx
git commit -m "feat: add PixelCharacter component"
```

---

## Task 5: PageTransition component

**Files:**
- Create: `packages/ui/src/components/PageTransition.tsx`
- Create: `packages/ui/src/components/PageTransition.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// packages/ui/src/components/PageTransition.test.tsx
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
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd packages/ui && pnpm test
```

Expected: `Cannot find module './PageTransition'`

- [ ] **Step 3: Implement `packages/ui/src/components/PageTransition.tsx`**

Fades the page in from opacity 0 on mount. The outgoing transition (fade to white) is handled in NavDot by a fixed overlay.

```tsx
'use client';

import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      data-testid="page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd packages/ui && pnpm test
```

Expected: `9 passed`

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/components/PageTransition.tsx packages/ui/src/components/PageTransition.test.tsx
git commit -m "feat: add PageTransition component"
```

---

## Task 6: Export UI package barrel

**Files:**
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Update `packages/ui/src/index.ts`**

```ts
export { tokens, colors, fontSizes, spacing, animation } from './tokens';
export { PixelCharacter } from './components/PixelCharacter';
export { PageTransition } from './components/PageTransition';
```

- [ ] **Step 2: Run all packages/ui tests to confirm nothing broke**

```bash
cd packages/ui && pnpm test
```

Expected: `9 passed`

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/index.ts
git commit -m "feat: export packages/ui barrel"
```

---

## Task 7: Scaffold apps/hub

**Files:**
- Create: `apps/hub/package.json`
- Create: `apps/hub/next.config.ts`
- Create: `apps/hub/tsconfig.json`
- Create: `apps/hub/tailwind.config.ts`
- Create: `apps/hub/postcss.config.js`
- Create: `apps/hub/vitest.config.ts`
- Create: `apps/hub/vitest.setup.ts`

- [ ] **Step 1: Create `apps/hub/package.json`**

```json
{
  "name": "@thommyxay/hub",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev --port 3000",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@thommyxay/ui": "workspace:*",
    "framer-motion": "^11.0.0",
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^24.1.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `apps/hub/next.config.ts`**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@thommyxay/ui'],
};

export default nextConfig;
```

- [ ] **Step 3: Create `apps/hub/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `apps/hub/tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['var(--font-pixelify-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Create `apps/hub/postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `apps/hub/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
```

- [ ] **Step 7: Create `apps/hub/vitest.setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 8: Install all workspace dependencies**

```bash
pnpm install
```

Expected: `apps/hub/node_modules` populated, `@thommyxay/ui` symlinked.

- [ ] **Step 9: Commit**

```bash
git add apps/hub
git commit -m "feat: scaffold apps/hub Next.js app"
```

---

## Task 8: Root layout and global CSS

**Files:**
- Create: `apps/hub/app/layout.tsx`
- Create: `apps/hub/app/globals.css`

- [ ] **Step 1: Create `apps/hub/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  background-color: #faf9f6;
}
```

- [ ] **Step 2: Create `apps/hub/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import './globals.css';

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixelify-sans',
});

export const metadata: Metadata = {
  title: 'Thommy Xay',
  description: 'Personal hub — portfolio, gallery, links',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} font-pixel`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify Next.js builds without errors**

```bash
cd apps/hub && pnpm build
```

Expected: Build completes. Ignore "no pages found" warning — page.tsx is added in Task 12.

- [ ] **Step 4: Commit**

```bash
git add apps/hub/app/layout.tsx apps/hub/app/globals.css
git commit -m "feat: add hub root layout with Pixelify Sans"
```

---

## Task 9: NavDot component

**Files:**
- Create: `apps/hub/components/NavDot.tsx`
- Create: `apps/hub/components/NavDot.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// apps/hub/components/NavDot.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
    render(<NavDot label="LINKS" href="https://links.thommyxay.com" color="#cccccc" />);
    fireEvent.mouseEnter(screen.getByTestId('nav-dot-links'));
    expect(screen.getByText('https://links.thommyxay.com')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(<NavDot label="LINKS" href="https://links.thommyxay.com" color="#cccccc" />);
    const dot = screen.getByTestId('nav-dot-links');
    fireEvent.mouseEnter(dot);
    fireEvent.mouseLeave(dot);
    expect(screen.queryByText('https://links.thommyxay.com')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/hub && pnpm test
```

Expected: `Cannot find module './NavDot'`

- [ ] **Step 3: Implement `apps/hub/components/NavDot.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animation } from '@thommyxay/ui';

interface NavDotProps {
  label: string;
  href: string;
  color: string;
  delay?: number;
}

export function NavDot({ label, href, color, delay = 0 }: NavDotProps) {
  const [hovered, setHovered] = useState(false);
  const [navigating, setNavigating] = useState(false);

  function handleClick() {
    setNavigating(true);
    setTimeout(() => {
      window.location.href = href;
    }, animation.transitionDuration);
  }

  return (
    <>
      <AnimatePresence>
        {navigating && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animation.transitionDuration / 1000 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#ffffff',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        data-testid={`nav-dot-${label.toLowerCase()}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animation.fadeInDuration, ease: 'easeOut', delay }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                marginBottom: '8px',
                backgroundColor: '#111111',
                color: '#faf9f6',
                fontSize: '8px',
                padding: '4px 8px',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-pixelify-sans)',
                pointerEvents: 'none',
              }}
            >
              {href}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: hovered ? animation.hoverScale : 1 }}
          transition={{ duration: animation.hoverDuration / 1000 }}
          style={{
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />

        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.15em',
            color: hovered ? '#111111' : '#aaaaaa',
            transition: `color ${animation.hoverDuration}ms ease`,
            fontFamily: 'var(--font-pixelify-sans)',
          }}
        >
          {label}
        </span>
      </motion.div>
    </>
  );
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd apps/hub && pnpm test
```

Expected: `4 passed`

- [ ] **Step 5: Commit**

```bash
git add apps/hub/components/NavDot.tsx apps/hub/components/NavDot.test.tsx
git commit -m "feat: add NavDot component with hover tooltip and click transition"
```

---

## Task 10: NavDots component

**Files:**
- Create: `apps/hub/components/NavDots.tsx`
- Create: `apps/hub/components/NavDots.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// apps/hub/components/NavDots.test.tsx
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
    expect(screen.getByTestId('nav-dot-links')).toBeInTheDocument();
  });

  it('renders all three labels', () => {
    render(<NavDots />);
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText('GALLERY')).toBeInTheDocument();
    expect(screen.getByText('LINKS')).toBeInTheDocument();
  });

  it('renders within the nav-dots container', () => {
    render(<NavDots />);
    expect(screen.getByTestId('nav-dots')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/hub && pnpm test
```

Expected: `Cannot find module './NavDots'`

- [ ] **Step 3: Implement `apps/hub/components/NavDots.tsx`**

```tsx
import { NavDot } from './NavDot';
import { colors } from '@thommyxay/ui';

const DESTINATIONS = [
  { label: 'PORTFOLIO', href: 'https://portfolio.thommyxay.com', color: colors.dots[0] },
  { label: 'GALLERY',   href: 'https://gallery.thommyxay.com',   color: colors.dots[1] },
  { label: 'LINKS',     href: 'https://links.thommyxay.com',     color: colors.dots[2] },
] as const;

// Character fades in at delay=0, name at 0.1, rule at 0.2, dots start at 0.3
const DOT_BASE_DELAY = 0.3;

export function NavDots() {
  return (
    <div
      data-testid="nav-dots"
      style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}
    >
      {DESTINATIONS.map((dest, i) => (
        <NavDot
          key={dest.label}
          label={dest.label}
          href={dest.href}
          color={dest.color}
          delay={DOT_BASE_DELAY + i * 0.05}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd apps/hub && pnpm test
```

Expected: `7 passed`

- [ ] **Step 5: Commit**

```bash
git add apps/hub/components/NavDots.tsx apps/hub/components/NavDots.test.tsx
git commit -m "feat: add NavDots component"
```

---

## Task 11: HubPage component

**Files:**
- Create: `apps/hub/components/HubPage.tsx`
- Create: `apps/hub/components/HubPage.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// apps/hub/components/HubPage.test.tsx
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

  it('renders the pixel character', () => {
    render(<HubPage />);
    expect(screen.getByTestId('pixel-character')).toBeInTheDocument();
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
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/hub && pnpm test
```

Expected: `Cannot find module './HubPage'`

- [ ] **Step 3: Implement `apps/hub/components/HubPage.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { PixelCharacter } from '@thommyxay/ui';
import { NavDots } from './NavDots';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' as const, delay },
  };
}

export function HubPage() {
  return (
    <main
      data-testid="hub-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#faf9f6',
        gap: '20px',
        overflow: 'hidden',
      }}
    >
      <motion.div {...fadeUp(0)}>
        <PixelCharacter />
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixelify-sans)',
            fontSize: '30px',
            fontWeight: 700,
            color: '#111111',
          }}
        >
          Thommy Xay
        </span>
        <span
          style={{
            fontFamily: 'var(--font-pixelify-sans)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#aaaaaa',
          }}
        >
          PERSONAL HUB
        </span>
      </motion.div>

      <motion.div
        {...fadeUp(0.2)}
        style={{ width: '32px', height: '1px', backgroundColor: '#e0e0e0' }}
      />

      <motion.div {...fadeUp(0.3)}>
        <NavDots />
      </motion.div>
    </main>
  );
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd apps/hub && pnpm test
```

Expected: `12 passed`

- [ ] **Step 5: Commit**

```bash
git add apps/hub/components/HubPage.tsx apps/hub/components/HubPage.test.tsx
git commit -m "feat: add HubPage component with stagger animations"
```

---

## Task 12: Wire up app/page.tsx and smoke-test dev server

**Files:**
- Create: `apps/hub/app/page.tsx`

- [ ] **Step 1: Create `apps/hub/app/page.tsx`**

```tsx
import { HubPage } from '@/components/HubPage';
import { PageTransition } from '@thommyxay/ui';

export default function Home() {
  return (
    <PageTransition>
      <HubPage />
    </PageTransition>
  );
}
```

- [ ] **Step 2: Start dev server and verify the page renders**

```bash
cd apps/hub && pnpm dev
```

Open `http://localhost:3000`. Verify:
- White background
- Pixel character floating
- "Thommy Xay" and "PERSONAL HUB" text appear
- Thin rule visible
- Three dots with labels PORTFOLIO, GALLERY, LINKS
- Elements stagger in on load
- Hovering a dot shows the subdomain URL tooltip

- [ ] **Step 3: Run full test suite**

```bash
pnpm test
```

Expected: All tests pass across both `packages/ui` and `apps/hub`.

- [ ] **Step 4: Commit**

```bash
git add apps/hub/app/page.tsx
git commit -m "feat: wire up hub page"
```

---

## Task 13: AWS Amplify config

**Files:**
- Create: `amplify.yml`

- [ ] **Step 1: Create `amplify.yml` at repo root**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm@9
        - pnpm install --frozen-lockfile
    build:
      commands:
        - pnpm turbo build --filter=@thommyxay/hub
  artifacts:
    baseDirectory: apps/hub/.next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - apps/hub/.next/cache/**/*
```

- [ ] **Step 2: Create an Amplify app in the AWS Console**

1. Go to AWS Console → Amplify → "New app" → "Host web app"
2. Connect your GitHub repo (`thomstah/personal-site`)
3. Select branch `new-and-improved`
4. Amplify will detect `amplify.yml` automatically — confirm the build settings
5. Set environment variable in Amplify console: `NEXT_PUBLIC_BASE_URL=https://thommyxay.com`
6. Deploy

- [ ] **Step 3: Configure custom domain in Amplify**

1. In Amplify Console → App settings → Domain management
2. Add domain `thommyxay.com`
3. Amplify will provide CNAME records — update your DNS registrar to point `thommyxay.com` and `www.thommyxay.com` to the Amplify domain

- [ ] **Step 4: Commit**

```bash
git add amplify.yml
git commit -m "feat: add AWS Amplify build config"
```

---

## Self-Review Notes

**Spec coverage:**
- ✅ Turborepo monorepo with 4 apps + packages/ui (Tasks 1-2)
- ✅ Design tokens with all spec values (Task 3)
- ✅ PixelCharacter with float animation (Task 4)
- ✅ PageTransition fade-in wrapper (Task 5)
- ✅ Background `#faf9f6`, Pixelify Sans (Tasks 7-8)
- ✅ Hub layout: character → name → subtitle → rule → dots (Task 11)
- ✅ Stagger load animation, 0.1s apart (Task 11)
- ✅ Dot hover: scale 1.3×, label darkens, tooltip slides up (Task 9)
- ✅ Click: white overlay → navigate to subdomain (Task 9)
- ✅ AWS Amplify config (Task 13)

**Type consistency:**
- `animation.transitionDuration` (300ms number) used as `/ 1000` for Framer Motion `duration` — consistent in Task 9
- `animation.hoverScale` (1.3) used in NavDot `animate.scale` — consistent
- `colors.dots[0/1/2]` passed to NavDot `color` prop — consistent
- `PixelCharacter` imported from `@thommyxay/ui` in HubPage — exported in Task 6
- `PageTransition` imported from `@thommyxay/ui` in page.tsx — exported in Task 6
