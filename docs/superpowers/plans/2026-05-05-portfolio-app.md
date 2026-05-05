# Portfolio App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio at `portfolio.thommyxay.com` — bio, skills, projects grid, and contact — as a new Next.js app in the existing Turborepo monorepo.

**Architecture:** New `apps/portfolio` Next.js app mirroring `apps/hub`. One scrolling page with four anchor sections (`#bio`, `#skills`, `#projects`, `#contact`). Sticky top nav with anchor links. Static TypeScript data files. All styles use inline styles with `packages/ui` tokens and Pixelify Sans.

**Tech Stack:** Next.js 15, TypeScript, framer-motion 11, Pixelify Sans via `next/font/google`, `@thommyxay/ui` tokens, Vitest + React Testing Library.

---

## File Map

| File | Purpose |
|------|---------|
| `apps/portfolio/package.json` | App manifest, `@thommyxay/portfolio` name |
| `apps/portfolio/next.config.ts` | Transpile `@thommyxay/ui` |
| `apps/portfolio/tsconfig.json` | TypeScript config |
| `apps/portfolio/tailwind.config.ts` | Pixelify Sans font var, content paths |
| `apps/portfolio/postcss.config.js` | Tailwind + autoprefixer |
| `apps/portfolio/vitest.config.ts` | jsdom test environment |
| `apps/portfolio/vitest.setup.ts` | jest-dom matchers |
| `apps/portfolio/next-env.d.ts` | Next.js type refs |
| `apps/portfolio/app/globals.css` | Tailwind base + reset + `scroll-behavior: smooth` |
| `apps/portfolio/app/layout.tsx` | Pixelify Sans font, metadata |
| `apps/portfolio/app/page.tsx` | Composes all sections (updated in Task 9) |
| `apps/portfolio/data/profile.ts` | Bio, title, social links, skills array |
| `apps/portfolio/data/projects.ts` | `Project` interface + projects array |
| `apps/portfolio/components/PortfolioNav.tsx` | Sticky top nav with section anchor links |
| `apps/portfolio/components/PortfolioNav.test.tsx` | Nav tests |
| `apps/portfolio/components/BioSection.tsx` | Name, title, bio paragraph, social icons |
| `apps/portfolio/components/BioSection.test.tsx` | Bio section tests |
| `apps/portfolio/components/SkillsSection.tsx` | Wrapping row of skill pill tags |
| `apps/portfolio/components/SkillsSection.test.tsx` | Skills section tests |
| `apps/portfolio/components/ProjectCard.tsx` | Single project card |
| `apps/portfolio/components/ProjectCard.test.tsx` | Card tests incl. optional links |
| `apps/portfolio/components/ProjectsSection.tsx` | 2-col grid of ProjectCards |
| `apps/portfolio/components/ProjectsSection.test.tsx` | Projects section tests |
| `apps/portfolio/components/ContactSection.tsx` | Email + social icon links |
| `apps/portfolio/components/ContactSection.test.tsx` | Contact section tests |
| `amplify-portfolio.yml` | Amplify build config for portfolio subdomain |

---

### Task 1: Scaffold `apps/portfolio`

**Files:**
- Create: `apps/portfolio/package.json`
- Create: `apps/portfolio/next.config.ts`
- Create: `apps/portfolio/tsconfig.json`
- Create: `apps/portfolio/tailwind.config.ts`
- Create: `apps/portfolio/postcss.config.js`
- Create: `apps/portfolio/vitest.config.ts`
- Create: `apps/portfolio/vitest.setup.ts`
- Create: `apps/portfolio/next-env.d.ts`
- Create: `apps/portfolio/app/globals.css`
- Create: `apps/portfolio/app/layout.tsx`
- Create: `apps/portfolio/app/page.tsx`

- [ ] **Step 1: Create `apps/portfolio/package.json`**

```json
{
  "name": "@thommyxay/portfolio",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev --port 3001",
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

- [ ] **Step 2: Create `apps/portfolio/next.config.ts`**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@thommyxay/ui'],
};

export default nextConfig;
```

- [ ] **Step 3: Create `apps/portfolio/tsconfig.json`**

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

- [ ] **Step 4: Create `apps/portfolio/tailwind.config.ts`**

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

- [ ] **Step 5: Create `apps/portfolio/postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `apps/portfolio/vitest.config.ts`**

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

- [ ] **Step 7: Create `apps/portfolio/vitest.setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 8: Create `apps/portfolio/next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 9: Create `apps/portfolio/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

html, body {
  height: 100%;
  background-color: #faf9f6;
}
```

- [ ] **Step 10: Create `apps/portfolio/app/layout.tsx`**

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
  title: 'Thommy Xay — Portfolio',
  description: 'Software engineering portfolio',
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

- [ ] **Step 11: Create stub `apps/portfolio/app/page.tsx`**

```tsx
export default function Page() {
  return <div>Portfolio coming soon</div>;
}
```

- [ ] **Step 12: Install dependencies**

Run from the repo root:

```bash
pnpm install
```

Expected: lockfile updated, `apps/portfolio/node_modules` populated via workspace symlinks.

- [ ] **Step 13: Verify the app builds**

```bash
pnpm turbo build --filter=@thommyxay/portfolio
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 14: Commit**

```bash
git add apps/portfolio
git commit -m "feat: scaffold apps/portfolio Next.js app"
```

---

### Task 2: Static data files

**Files:**
- Create: `apps/portfolio/data/profile.ts`
- Create: `apps/portfolio/data/projects.ts`

- [ ] **Step 1: Create `apps/portfolio/data/profile.ts`**

```ts
export const profile = {
  name: 'Thommy Xay',
  title: 'SOFTWARE ENGINEER',
  bio: 'Second-year undergraduate studying software engineering. Passionate about web development, creative tools, and building things that are fun to use.',
  github: 'https://github.com/thomstah',
  linkedin: 'https://www.linkedin.com/in/thommyxay/',
  email: 'thommyxay@gmail.com',
} as const;

export const skills: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Git',
];
```

- [ ] **Step 2: Create `apps/portfolio/data/projects.ts`**

```ts
export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: 'Personal Site',
    description: 'Pixel-art personal hub built with Next.js, Turborepo, and a custom LPC spritesheet character.',
    tags: ['TypeScript', 'Next.js', 'React'],
    github: 'https://github.com/thomstah/personal-site',
    demo: 'https://thommyxay.com',
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add apps/portfolio/data
git commit -m "feat: add portfolio static data files"
```

---

### Task 3: PortfolioNav component

**Files:**
- Create: `apps/portfolio/components/PortfolioNav.tsx`
- Create: `apps/portfolio/components/PortfolioNav.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio/components/PortfolioNav.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PortfolioNav } from './PortfolioNav';

describe('PortfolioNav', () => {
  it('renders the hub back-link', () => {
    render(<PortfolioNav />);
    expect(screen.getByTestId('nav-hub-link')).toBeInTheDocument();
  });

  it('renders the bio section link', () => {
    render(<PortfolioNav />);
    expect(screen.getByTestId('nav-link-bio')).toBeInTheDocument();
  });

  it('renders the skills section link', () => {
    render(<PortfolioNav />);
    expect(screen.getByTestId('nav-link-skills')).toBeInTheDocument();
  });

  it('renders the projects section link', () => {
    render(<PortfolioNav />);
    expect(screen.getByTestId('nav-link-projects')).toBeInTheDocument();
  });

  it('renders the contact section link', () => {
    render(<PortfolioNav />);
    expect(screen.getByTestId('nav-link-contact')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/portfolio && pnpm test
```

Expected: FAIL — `Cannot find module './PortfolioNav'`

- [ ] **Step 3: Create `apps/portfolio/components/PortfolioNav.tsx`**

```tsx
import { colors, fontSizes } from '@thommyxay/ui';

const SECTIONS = [
  { label: 'BIO',      href: '#bio' },
  { label: 'SKILLS',   href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT',  href: '#contact' },
] as const;

export const NAV_HEIGHT_PX = 48;

export function PortfolioNav() {
  return (
    <nav
      data-testid="portfolio-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${NAV_HEIGHT_PX}px`,
        backgroundColor: colors.background,
        borderBottom: `1px solid ${colors.rule}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        zIndex: 10,
      }}
    >
      <a
        href="https://thommyxay.com"
        data-testid="nav-hub-link"
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.label,
          letterSpacing: '0.1em',
          color: colors.textMuted,
          textDecoration: 'none',
        }}
      >
        ← HUB
      </a>
      <div style={{ display: 'flex', gap: '24px' }}>
        {SECTIONS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            data-testid={`nav-link-${label.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-pixelify-sans)',
              fontSize: fontSizes.label,
              letterSpacing: '0.15em',
              color: colors.textMuted,
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/portfolio && pnpm test
```

Expected: 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/portfolio/components/PortfolioNav.tsx apps/portfolio/components/PortfolioNav.test.tsx
git commit -m "feat: add PortfolioNav component"
```

---

### Task 4: BioSection component

**Files:**
- Create: `apps/portfolio/components/BioSection.tsx`
- Create: `apps/portfolio/components/BioSection.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio/components/BioSection.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BioSection } from './BioSection';

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, initial, whileInView, viewport, transition, ...props }: any) =>
      <section {...props}>{children}</section>,
  },
}));

describe('BioSection', () => {
  it('renders the name', () => {
    render(<BioSection />);
    expect(screen.getByText('Thommy Xay')).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<BioSection />);
    expect(screen.getByText('SOFTWARE ENGINEER')).toBeInTheDocument();
  });

  it('renders the github link', () => {
    render(<BioSection />);
    expect(screen.getByTestId('bio-github-link')).toBeInTheDocument();
  });

  it('renders the linkedin link', () => {
    render(<BioSection />);
    expect(screen.getByTestId('bio-linkedin-link')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/portfolio && pnpm test
```

Expected: FAIL — `Cannot find module './BioSection'`

- [ ] **Step 3: Create `apps/portfolio/components/BioSection.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { colors, fontSizes, animation } from '@thommyxay/ui';
import { profile } from '../data/profile';

export function BioSection() {
  return (
    <motion.section
      id="bio"
      data-testid="bio-section"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: animation.fadeInDuration, ease: 'easeOut' }}
      style={{
        padding: '80px 32px 64px',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: '40px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '4px',
        }}
      >
        {profile.name}
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.subtitle,
          letterSpacing: '0.3em',
          color: colors.textMuted,
          marginBottom: '24px',
        }}
      >
        {profile.title}
      </p>
      <p
        style={{
          fontSize: '14px',
          color: colors.text,
          lineHeight: 1.6,
          marginBottom: '24px',
        }}
      >
        {profile.bio}
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          data-testid="bio-github-link"
          style={{ color: colors.text }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
          </svg>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-testid="bio-linkedin-link"
          style={{ color: colors.text }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
          </svg>
        </a>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/portfolio && pnpm test
```

Expected: all BioSection tests pass (4 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/portfolio/components/BioSection.tsx apps/portfolio/components/BioSection.test.tsx
git commit -m "feat: add BioSection component"
```

---

### Task 5: SkillsSection component

**Files:**
- Create: `apps/portfolio/components/SkillsSection.tsx`
- Create: `apps/portfolio/components/SkillsSection.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio/components/SkillsSection.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillsSection } from './SkillsSection';

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, initial, whileInView, viewport, transition, ...props }: any) =>
      <section {...props}>{children}</section>,
  },
}));

describe('SkillsSection', () => {
  it('renders the SKILLS heading', () => {
    render(<SkillsSection />);
    expect(screen.getByText('SKILLS')).toBeInTheDocument();
  });

  it('renders at least one skill tag', () => {
    render(<SkillsSection />);
    expect(screen.getAllByTestId('skill-tag').length).toBeGreaterThan(0);
  });

  it('renders TypeScript as a skill', () => {
    render(<SkillsSection />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/portfolio && pnpm test
```

Expected: FAIL — `Cannot find module './SkillsSection'`

- [ ] **Step 3: Create `apps/portfolio/components/SkillsSection.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { colors, fontSizes, animation } from '@thommyxay/ui';
import { skills } from '../data/profile';

export function SkillsSection() {
  return (
    <motion.section
      id="skills"
      data-testid="skills-section"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: animation.fadeInDuration, ease: 'easeOut' }}
      style={{
        padding: '64px 32px',
        maxWidth: '640px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.rule}`,
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.name,
          fontWeight: 700,
          color: colors.text,
          marginBottom: '24px',
        }}
      >
        SKILLS
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skills.map((skill) => (
          <span
            key={skill}
            data-testid="skill-tag"
            style={{
              fontFamily: 'var(--font-pixelify-sans)',
              fontSize: fontSizes.label,
              letterSpacing: '0.1em',
              color: colors.textMuted,
              border: `1px solid ${colors.rule}`,
              padding: '4px 10px',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/portfolio && pnpm test
```

Expected: all SkillsSection tests pass (3 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/portfolio/components/SkillsSection.tsx apps/portfolio/components/SkillsSection.test.tsx
git commit -m "feat: add SkillsSection component"
```

---

### Task 6: ProjectCard component

**Files:**
- Create: `apps/portfolio/components/ProjectCard.tsx`
- Create: `apps/portfolio/components/ProjectCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio/components/ProjectCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../data/projects';

const baseProject: Project = {
  title: 'Test Project',
  description: 'A test description.',
  tags: ['TypeScript', 'React'],
};

describe('ProjectCard', () => {
  it('renders the project title', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('A test description.')).toBeInTheDocument();
  });

  it('renders all tags', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('omits github link when not provided', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.queryByTestId('project-github-link')).not.toBeInTheDocument();
  });

  it('omits demo link when not provided', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.queryByTestId('project-demo-link')).not.toBeInTheDocument();
  });

  it('renders github link when provided', () => {
    const project = { ...baseProject, github: 'https://github.com/thomstah/test' };
    render(<ProjectCard project={project} />);
    expect(screen.getByTestId('project-github-link')).toBeInTheDocument();
  });

  it('renders demo link when provided', () => {
    const project = { ...baseProject, demo: 'https://example.com' };
    render(<ProjectCard project={project} />);
    expect(screen.getByTestId('project-demo-link')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/portfolio && pnpm test
```

Expected: FAIL — `Cannot find module './ProjectCard'`

- [ ] **Step 3: Create `apps/portfolio/components/ProjectCard.tsx`**

```tsx
import { colors, fontSizes } from '@thommyxay/ui';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <div
      data-testid="project-card"
      style={{
        border: `1px solid ${colors.rule}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.name,
          fontWeight: 700,
          color: colors.text,
        }}
      >
        {project.title}
      </h3>
      <p style={{ fontSize: '13px', color: colors.textMuted, lineHeight: 1.5 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            data-testid="project-tag"
            style={{
              fontFamily: 'var(--font-pixelify-sans)',
              fontSize: fontSizes.label,
              letterSpacing: '0.1em',
              color: colors.textMuted,
              border: `1px solid ${colors.rule}`,
              padding: '2px 8px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {(project.github || project.demo) && (
        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="project-github-link"
              style={{
                fontFamily: 'var(--font-pixelify-sans)',
                fontSize: fontSizes.label,
                letterSpacing: '0.1em',
                color: colors.text,
                textDecoration: 'none',
              }}
            >
              GITHUB
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="project-demo-link"
              style={{
                fontFamily: 'var(--font-pixelify-sans)',
                fontSize: fontSizes.label,
                letterSpacing: '0.1em',
                color: colors.textMuted,
                textDecoration: 'none',
              }}
            >
              DEMO
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/portfolio && pnpm test
```

Expected: all 7 ProjectCard tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/portfolio/components/ProjectCard.tsx apps/portfolio/components/ProjectCard.test.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 7: ProjectsSection component

**Files:**
- Create: `apps/portfolio/components/ProjectsSection.tsx`
- Create: `apps/portfolio/components/ProjectsSection.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio/components/ProjectsSection.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsSection } from './ProjectsSection';

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, initial, whileInView, viewport, transition, ...props }: any) =>
      <section {...props}>{children}</section>,
  },
}));

describe('ProjectsSection', () => {
  it('renders the PROJECTS heading', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
  });

  it('renders a card for each project in the data file', () => {
    render(<ProjectsSection />);
    expect(screen.getAllByTestId('project-card').length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/portfolio && pnpm test
```

Expected: FAIL — `Cannot find module './ProjectsSection'`

- [ ] **Step 3: Create `apps/portfolio/components/ProjectsSection.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { colors, fontSizes, animation } from '@thommyxay/ui';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      data-testid="projects-section"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: animation.fadeInDuration, ease: 'easeOut' }}
      style={{
        padding: '64px 32px',
        maxWidth: '640px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.rule}`,
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.name,
          fontWeight: 700,
          color: colors.text,
          marginBottom: '24px',
        }}
      >
        PROJECTS
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/portfolio && pnpm test
```

Expected: all ProjectsSection tests pass (2 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/portfolio/components/ProjectsSection.tsx apps/portfolio/components/ProjectsSection.test.tsx
git commit -m "feat: add ProjectsSection component"
```

---

### Task 8: ContactSection component

**Files:**
- Create: `apps/portfolio/components/ContactSection.tsx`
- Create: `apps/portfolio/components/ContactSection.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio/components/ContactSection.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSection } from './ContactSection';

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, initial, whileInView, viewport, transition, ...props }: any) =>
      <section {...props}>{children}</section>,
  },
}));

describe('ContactSection', () => {
  it('renders the CONTACT heading', () => {
    render(<ContactSection />);
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  it('renders the email link', () => {
    render(<ContactSection />);
    expect(screen.getByTestId('contact-email')).toBeInTheDocument();
  });

  it('renders the github link', () => {
    render(<ContactSection />);
    expect(screen.getByTestId('contact-github-link')).toBeInTheDocument();
  });

  it('renders the linkedin link', () => {
    render(<ContactSection />);
    expect(screen.getByTestId('contact-linkedin-link')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/portfolio && pnpm test
```

Expected: FAIL — `Cannot find module './ContactSection'`

- [ ] **Step 3: Create `apps/portfolio/components/ContactSection.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { colors, fontSizes, animation } from '@thommyxay/ui';
import { profile } from '../data/profile';

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      data-testid="contact-section"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: animation.fadeInDuration, ease: 'easeOut' }}
      style={{
        padding: '64px 32px 80px',
        maxWidth: '640px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.rule}`,
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.name,
          fontWeight: 700,
          color: colors.text,
          marginBottom: '24px',
        }}
      >
        CONTACT
      </h2>
      <a
        href={`mailto:${profile.email}`}
        data-testid="contact-email"
        style={{
          fontFamily: 'var(--font-pixelify-sans)',
          fontSize: fontSizes.subtitle,
          letterSpacing: '0.2em',
          color: colors.text,
          textDecoration: 'none',
          display: 'block',
          marginBottom: '24px',
        }}
      >
        {profile.email}
      </a>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          data-testid="contact-github-link"
          style={{ color: colors.text }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
          </svg>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-testid="contact-linkedin-link"
          style={{ color: colors.text }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
          </svg>
        </a>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/portfolio && pnpm test
```

Expected: all 4 ContactSection tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/portfolio/components/ContactSection.tsx apps/portfolio/components/ContactSection.test.tsx
git commit -m "feat: add ContactSection component"
```

---

### Task 9: Wire up `page.tsx`

**Files:**
- Modify: `apps/portfolio/app/page.tsx`

- [ ] **Step 1: Replace the stub `apps/portfolio/app/page.tsx`**

```tsx
import { PageTransition } from '@thommyxay/ui';
import { PortfolioNav, NAV_HEIGHT_PX } from '../components/PortfolioNav';
import { BioSection } from '../components/BioSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { colors } from '@thommyxay/ui';

export default function Page() {
  return (
    <PageTransition>
      <PortfolioNav />
      <main
        style={{
          backgroundColor: colors.background,
          minHeight: '100vh',
          paddingTop: `${NAV_HEIGHT_PX}px`,
        }}
      >
        <BioSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Run all tests**

```bash
cd apps/portfolio && pnpm test
```

Expected: all tests pass (5 + 4 + 3 + 7 + 2 + 4 = 25 tests).

- [ ] **Step 3: Start the dev server and verify visually**

```bash
cd apps/portfolio && pnpm dev
```

Open `http://localhost:3001`. Verify:
- Sticky nav appears at top with `← HUB`, `BIO`, `SKILLS`, `PROJECTS`, `CONTACT`
- Clicking each nav link scrolls smoothly to that section
- All four sections render with correct content
- Project card grid appears in 2 columns

- [ ] **Step 4: Commit**

```bash
git add apps/portfolio/app/page.tsx
git commit -m "feat: wire up portfolio page with all sections"
```

---

### Task 10: Add `amplify-portfolio.yml`

**Files:**
- Create: `amplify-portfolio.yml`

- [ ] **Step 1: Create `amplify-portfolio.yml` at repo root**

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
        - pnpm turbo build --filter=@thommyxay/portfolio
  artifacts:
    baseDirectory: apps/portfolio/.next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - apps/portfolio/.next/cache/**/*
```

- [ ] **Step 2: Run the full monorepo test suite to confirm nothing is broken**

```bash
pnpm turbo test
```

Expected: all tests pass across `@thommyxay/ui`, `@thommyxay/hub`, and `@thommyxay/portfolio`.

- [ ] **Step 3: Commit**

```bash
git add amplify-portfolio.yml
git commit -m "feat: add Amplify build config for portfolio subdomain"
```

---

## Deployment Note

After all tasks are complete, create a **new Amplify app** in the AWS console (separate from the hub app), connect it to the same GitHub repo, and point it at `amplify-portfolio.yml` as the build spec. Then add `portfolio.thommyxay.com` as the custom domain in that Amplify app's settings.
