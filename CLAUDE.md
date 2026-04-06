# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR at localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint across js, jsx, ts, tsx (zero warnings allowed)
```

No test runner is configured.

## Tech Stack

- **React 18 + Vite** — entry at [index.html](index.html) → [src/main.tsx](src/main.tsx) → [src/App.tsx](src/App.tsx)
- **TypeScript** — `tsconfig.json` splits into `tsconfig.app.json` (src) and `tsconfig.node.json` (vite config)
- **Tailwind CSS v3** — configured in [tailwind.config.js](tailwind.config.js), directives + shadcn CSS variables in [src/index.css](src/index.css)
- **shadcn/ui** — configured via [components.json](components.json); components live in [src/components/ui/](src/components/ui/); utility in [src/lib/utils.ts](src/lib/utils.ts)
- **gsap + ScrollTrigger** — used by the FullScreenScrollFX component for scroll-pinned animations
- Path alias `@/` → `src/` is set up in both `vite.config.ts` and `tsconfig.app.json`

## Architecture

### Layout (App.tsx)

The page is a fixed 30/70 split:

- **Left (30vw)** — `position: fixed` sidebar with name, about text, section nav buttons, and footer links. Edit static copy directly in [src/App.tsx](src/App.tsx).
- **Right (70vw)** — `ml-[30vw]` main area containing `FullScreenScrollFX`. The scroll FX fills the full page height (`(n+1)*100vh`) while the fixed left panel remains visible.

### FullScreenScrollFX component

Located at [src/components/ui/full-screen-scroll-fx.tsx](src/components/ui/full-screen-scroll-fx.tsx) with styles in [src/components/ui/full-screen-scroll-fx.css](src/components/ui/full-screen-scroll-fx.css).

- Accepts a `sections` array — each section has `leftLabel`, `title`, `rightLabel`, and a `background` image URL
- Uses GSAP `ScrollTrigger` to pin the viewport and step through sections on scroll
- Dynamic section height is driven by the `--fx-section-height` CSS variable set inline (avoids template-literal styles)
- The `apiRef` prop exposes `next()`, `prev()`, `goTo(i)`, `getIndex()`, `refresh()` imperatively — used by the nav buttons in the sidebar

### Adding shadcn components

```bash
npx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/`.
