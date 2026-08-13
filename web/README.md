# Sachin — AI Video Creator (landing page)

Dark, animated one-page portfolio for the AI Video Factory pipeline.
React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.

## Run

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Sections

`HeroSection` → `MarqueeSection` → `AboutSection` → `ServicesSection` → `ProjectsSection`

## Editing the copy

All text, links, and image URLs live in `src/data/content.ts` — nav links, hero
tagline, about paragraph, the five services, and the three project cards. Nothing
else needs to be touched to reword the page or swap imagery.

The contact links point at `sachinakdatta@gmail.com`; change them in
`src/data/content.ts` (nav) and `src/components/ContactButton.tsx` (default href).

## Components

| Component | What it does |
| --- | --- |
| `FadeIn` | `whileInView` fade/slide wrapper, fires once, configurable delay/x/y |
| `Magnet` | Cursor-following magnetic hover for the hero portrait |
| `AnimatedText` | Character-by-character opacity reveal driven by scroll progress |
| `FitText` | Measures and scales the hero heading so it spans the full viewport width |
| `ContactButton` | Gradient pill CTA |
| `LiveProjectButton` | Outline pill CTA used on project cards |

## Notes

- Fonts: Kanit 300–900, loaded from Google Fonts in `index.html`.
- Marquee rows and the project card stack are driven by scroll position; the
  marquee scroll listener is passive and both use `will-change: transform`.
- Remote imagery (Figma/motionsites/CloudFront) is hot-linked, so the page needs
  outbound network access to render its images.
