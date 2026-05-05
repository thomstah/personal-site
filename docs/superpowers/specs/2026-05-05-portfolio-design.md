# Portfolio App Design Spec

**Goal:** Build a single-page portfolio at `portfolio.thommyxay.com` that showcases software projects for both employers and developers, consistent with the hub's pixel art aesthetic.

**Architecture:** New Next.js app `apps/portfolio` in the existing Turborepo monorepo. One scrolling page with four anchor sections. Static TypeScript data files — no backend or CMS.

**Tech Stack:** Next.js, TypeScript, framer-motion, Pixelify Sans, `packages/ui` tokens, Vitest + React Testing Library.

---

## App Structure

New app at `apps/portfolio`, mirroring the `apps/hub` setup:

```
apps/portfolio/
  app/
    layout.tsx          # Pixelify Sans font, global styles
    page.tsx            # Composes all sections
    globals.css         # Tailwind base + box-sizing reset
  components/
    PortfolioNav.tsx    # Sticky top nav with section links + hub back-link
    BioSection.tsx      # Hero: name, title, bio paragraph, social links
    SkillsSection.tsx   # Wrapping row of skill pill tags
    ProjectsSection.tsx # 2-column grid of project cards
    ProjectCard.tsx     # Individual project card
    ContactSection.tsx  # Email + social links
  data/
    projects.ts         # Static array of project objects
    profile.ts          # Bio text, title, skills list
  public/               # Static assets if needed
  package.json
  next.config.ts
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  vitest.config.ts
  vitest.setup.ts
```

---

## Navigation

A sticky top bar fixed at the top of the viewport:

- **Left:** `← HUB` link back to `https://thommyxay.com`
- **Right:** `BIO · SKILLS · PROJECTS · CONTACT` — each label smooth-scrolls to its section anchor on click (`#bio`, `#skills`, `#projects`, `#contact`)
- **Style:** Pixelify Sans, `colors.background` (`#faf9f6`) background, `1px` bottom border using `colors.rule` (`#e0e0e0`), `colors.textMuted` labels that darken to `colors.text` on hover

---

## Sections

### Bio (`#bio`)
- Name in large Pixelify Sans (reuses `fontSizes.name` or larger)
- One-line title: e.g. `SOFTWARE ENGINEER` in `fontSizes.subtitle` with letter-spacing
- Short paragraph (2-3 sentences) from `profile.ts`
- Row of icon links: GitHub, LinkedIn — Bootstrap Icons SVGs (bi-github, bi-linkedin), 25×25px, `colors.text`

### Skills (`#skills`)
- Section heading `SKILLS` in Pixelify Sans
- Wrapping flex row of pill tags from `profile.skills`
- Pills: `1px` border using `colors.rule`, `fontSizes.label`, `colors.textMuted` text, small padding, no background fill

### Projects (`#projects`)
- Section heading `PROJECTS` in Pixelify Sans
- 2-column CSS grid (collapses to 1 column on narrow viewports)
- Each `ProjectCard` contains:
  - **Title** — Pixelify Sans, `colors.text`
  - **Description** — 1-2 sentences, `colors.textMuted`, small font
  - **Tags** — same pill style as Skills section
  - **Links** — up to 2: `GITHUB` and `DEMO` as small text links; omitted if URL is not provided

### Contact (`#contact`)
- Section heading `CONTACT` in Pixelify Sans
- Centered: email address as a `mailto:` link, plus GitHub and LinkedIn icon links
- Same icon SVGs as Bio section

---

## Data Shapes

### `data/projects.ts`
```ts
export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  // populated by user
];
```

### `data/profile.ts`
```ts
export const profile = {
  name: 'Thommy Xay',
  title: 'SOFTWARE ENGINEER',
  bio: '', // 2-3 sentence bio
  github: 'https://github.com/thomstah',
  linkedin: 'https://www.linkedin.com/in/thommyxay/',
  email: 'thommyxay@gmail.com',
};

export const skills: string[] = [
  // e.g. 'TypeScript', 'React', 'Next.js', ...
];
```

---

## Animations

Each section fades up as it enters the viewport using `framer-motion`'s `whileInView` with `initial: { opacity: 0, y: 8 }` — the same pattern as the hub's stagger. The nav fades in on page load.

---

## Styling

Inherits all tokens from `packages/ui`:
- `colors.background` (`#faf9f6`) — page background
- `colors.text` (`#111111`) — headings and body
- `colors.textMuted` (`#aaaaaa`) — descriptions, labels
- `colors.rule` (`#e0e0e0`) — card borders, nav underline, pill borders
- Pixelify Sans for all headings and labels
- No new tokens needed

---

## Testing

Vitest + React Testing Library, same config as `apps/hub`:

- `PortfolioNav` renders all four section links and the hub back-link
- `BioSection` renders name and title from `profile.ts`
- `SkillsSection` renders at least one skill tag
- `ProjectsSection` renders a card for each entry in `projects.ts`
- `ProjectCard` renders title, description, and tags; omits links when URLs are absent

---

## Deployment

AWS Amplify does not support multiple apps in one `amplify.yml`. The portfolio requires a **separate Amplify app** created in the AWS console, connected to the same GitHub repo, with a new build config file `amplify-portfolio.yml` at the repo root:

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

The new Amplify app is pointed at this file, and `portfolio.thommyxay.com` is set as its custom domain.
