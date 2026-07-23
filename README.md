# Behna Clothing Studio — React + Vite

Marketing site for **Behna Clothing Studio**, Jaipur — a women's ethnic-wear boutique.
Rebuilt from a static HTML/CSS/JS site into a component-based React + TypeScript + Vite
application, preserving the original design, animations and SEO 1:1.

## Tech stack

| Concern            | Choice                                              |
| ------------------ | --------------------------------------------------- |
| Build tool         | [Vite 6](https://vite.dev)                           |
| UI                 | React 18 + TypeScript (strict)                      |
| Routing            | react-router-dom (`/` and `/collections`)           |
| Styling            | CSS Modules, one `*.module.css` per component        |
| Design tokens      | CSS custom properties in `src/styles/tokens.css`     |
| Animation          | GSAP + ScrollTrigger + SplitText                     |
| Carousels          | Swiper (React components)                            |
| Icons              | remixicon (self-hosted via npm)                      |
| Fonts              | Inter + Oswald (Google Fonts)                        |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build
npm run typecheck
```

## Project structure

```
src/
├─ main.tsx                 # app entry (global CSS imports + providers)
├─ App.tsx                  # routes
├─ pages/                   # route components (HomePage, CollectionsPage, NotFoundPage)
├─ components/
│  ├─ common/               # shared UI (SectionHeader, ProductCard, CtaButton)
│  ├─ layout/               # chrome (Header, Footer, LogoTransform, Preloader, FabStack, Layout)
│  ├─ overlays/             # slide-in panels (Menu, Contact, Search)
│  └─ sections/
│     ├─ home/              # one folder per Home section
│     ├─ collections/       # Collections page sections
│     └─ shared/            # sections used by both pages (VisitUs)
├─ context/                 # React context (OverlayContext, ReadyContext)
├─ hooks/                   # reusable hooks (useReveal, useCountdown, usePreloader-logic, …)
├─ data/                    # typed content (products, collections, testimonials, navigation)
├─ config/site.ts           # phone numbers, links, WhatsApp helper
├─ lib/gsap.ts              # GSAP plugin registration + reveal helpers
└─ styles/                  # tokens.css + base.css (global primitives only)
```

Every component lives in its own folder with a colocated `Component.module.css`.
Genuinely global styles (reset, responsive rem scale, `.section-title`, `.offers-badge`)
live in `src/styles/base.css` so scroll animations can target them.

## Animations

Each section owns its scroll reveal via the `useReveal(ref, setup)` hook, which runs the
GSAP code inside a `gsap.context()` scoped to that section and auto-cleans on unmount.
The intro preloader (home only) gates the hero timeline through `ReadyContext`.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds on every push to `main` and deploys `dist/` to
GitHub Pages.

- `public/CNAME` keeps the custom domain **behna.in**.
- `public/404.html` + a restore snippet in `index.html` make client-side routes
  (e.g. `/collections`) work on GitHub Pages (SPA fallback).
- If you deploy under a project subpath instead of a custom domain, set `base` in
  `vite.config.ts` and `pathSegmentsToKeep` in `public/404.html` accordingly.

To enable: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Notes

- **Static assets** live in `public/` and are referenced with absolute paths
  (`/assets/...`, `/img/...`), matching the original site.
- **Swiper** is pinned to v11 for its React components. A prototype-pollution advisory
  exists for the 6.x–12.x line; the only fix (v14) removes the React wrapper. The risk is
  not exploitable here (no untrusted input reaches Swiper), so v11 is retained.
- The original static site is preserved on the `static-site-backup` git branch and in
  `../Behna-static-backup-2026-07-23.zip`. The pre-conversion source files are also kept
  locally under `_legacy/` (git-ignored) for reference and can be deleted anytime.
```
