# Yug Gupta — Portfolio

A static portfolio for Yug Gupta, a full-stack developer and AI/LLM engineer.
Built with React, TypeScript, Vite, Tailwind CSS v4 and Motion.

All content is data-driven and lives in [`src/data/portfolioData.ts`](src/data/portfolioData.ts).

## Design notes

- **Design language** — "Engineering Monograph": a warm paper canvas, hairline
  structure, a tight grotesk display face (Space Grotesk), Inter for body copy,
  and JetBrains Mono for technical metadata. One signal accent (rust).
- **Theme** — full light and dark themes driven by semantic CSS variables
  (`src/index.css`), with no flash of incorrect theme thanks to an inline
  bootstrap script in `index.html`.
- **Motion** — restrained scroll reveals, hover states and a themed console on
  the hero. All animation respects `prefers-reduced-motion`.
- **No 3D** — WebGL was intentionally left out in favour of fast SVG
  architecture diagrams, keeping the bundle small and the experience accessible.

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — TypeScript type check

## Deploy

The build output in `dist/` is static and can be hosted on any static provider
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.). No API keys or server
runtime are required.
