# Ethan Zhou — Portfolio

Personal portfolio site hosted at: 
-  [zethan88.github.io](https://zethan88.github.io)
-  [www.ethanrzhou.com](https://www.ethanrzhou.com)

## Stack

- **React 18 + Vite** — fast dev server and production builds
- **TypeScript** — strict mode, path alias `@/` → `src/`
- **Tailwind CSS v3** — utility classes + shadcn CSS variables
- **shadcn/ui** — component primitives via `components.json`
- **GSAP + ScrollTrigger** — full-screen pinned scroll animation
- **framer-motion** — ethereal shadow background animation

## Dev

```bash
npm run dev       # localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # ESLint (zero warnings)
```

## Structure

```
src/
  App.tsx                          # Root layout
  components/ui/
    full-screen-scroll-fx.tsx      # GSAP scroll animation component
    etheral-shadow.tsx             # Animated framer-motion background
  lib/utils.ts                     # cn() utility
  assets/profile.png               # Profile photo
```

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```
