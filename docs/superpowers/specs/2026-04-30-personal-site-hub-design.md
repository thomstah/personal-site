# Personal Site Hub — Design Spec
**Date:** 2026-04-30
**Scope:** Main hub only (`thommyxay.com`). Subdomains (portfolio, gallery, links) are separate specs.

---

## Goal
A personal brand hub that acts as a central navigator to three subdomains. Minimal, white, and whimsical — a floating pixel character of Thommy above three navigation dots. First impression is a polished indie game title screen, not a traditional portfolio.

---

## Architecture

Turborepo monorepo with 4 Next.js apps and one shared UI package.

```
apps/
  hub/          → thommyxay.com
  portfolio/    → portfolio.thommyxay.com
  gallery/      → gallery.thommyxay.com
  links/        → links.thommyxay.com
packages/
  ui/           → shared design tokens, Pixelify Sans config, pixel character component, layout primitives
```

Each app deploys independently to **AWS Amplify** on its own subdomain. The `packages/ui` design system ensures visual consistency across all subdomains without coupling deployments.

---

## Hub Page — `thommyxay.com`

### Layout
Full-viewport, vertically and horizontally centered single column. No scroll. No header nav.

### Visual Elements (top to bottom)
1. **Pixel character** — a pixel art sprite of Thommy, ~64–96px tall, centered. Plays an idle floating animation (subtle 3s ease loop, 5–6px vertical travel). Character is detailed enough to be expressive — to be iterated on collaboratively.
2. **Name** — `Thommy Xay` in Pixelify Sans Bold, ~28–32px, color `#111111`
3. **Subtitle** — `PERSONAL HUB` in Pixelify Sans Regular, ~10px, letter-spacing wide, color `#aaaaaa`
4. **Rule** — 1px horizontal line, ~32px wide, color `#e0e0e0`, centered
5. **Navigation dots** — three filled circles in a row, evenly spaced. Each dot sits above its label:
   - ● `PORTFOLIO` → `portfolio.thommyxay.com`
   - ● `GALLERY` → `gallery.thommyxay.com`
   - ● `LINKS` → `links.thommyxay.com`

   Dot sizes: ~8–10px diameter. Colors: dark to light left-to-right (`#111`, `#888`, `#ccc`) to create subtle visual hierarchy.

### Background
Pure white `#faf9f6`. No texture, no pattern, no gradient.

### Typography
**Pixelify Sans** (Google Fonts) for all text — name, subtitle, dot labels, tooltips.

---

## Interactions

### Page Load
Elements stagger-fade in with a subtle upward translate (8px → 0), 0.4s ease, staggered 0.1s apart:
1. Pixel character
2. Name + subtitle
3. Rule
4. Dots + labels

### Dot Hover
- Dot scales up to ~1.3×, transition 150ms ease
- Label darkens to `#111`
- A small tooltip card slides up above the dot (translateY from +6px → 0, opacity 0→1) showing the full subdomain URL in small Pixelify Sans

### Dot Click — Page Transition
Framer Motion `AnimatePresence` page transition:
- White `#ffffff` full-viewport overlay fades in (opacity 0→1, 300ms)
- Next.js navigation fires
- New page fades in from white

---

## Shared UI Package (`packages/ui`)

Exports used by hub and all subdomains:

| Export | Description |
|---|---|
| `tokens` | Color palette, font sizes, spacing scale |
| `PixelCharacter` | The pixel art sprite component with idle animation |
| `fonts` | Pixelify Sans Next.js font config |
| `PageTransition` | Framer Motion wrapper for white overlay transition |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Monorepo | Turborepo |
| Animations | Framer Motion |
| Font | Pixelify Sans (Google Fonts) |
| Hosting | AWS Amplify (one app per subdomain) |
| Styling | Tailwind CSS or CSS Modules (decided during implementation) |

---

## Subdomains — Out of Scope for This Spec

Each subdomain gets its own design + implementation cycle after the hub ships. They inherit `packages/ui` but define their own layouts:

- `portfolio.thommyxay.com` — professional work, projects, experience
- `gallery.thommyxay.com` — photography portfolio
- `links.thommyxay.com` — linktree-style links page

---

## Open Questions (resolved during implementation)
- Tailwind CSS vs CSS Modules for styling
- Pixel character final design (to be iterated collaboratively)
- AWS Amplify domain configuration for subdomains
