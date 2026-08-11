# layout.tsx — Root Layout

| Field | Value |
|-------|-------|
| **Path** | `src/app/layout.tsx` |
| **Author** | 🤖 AI |
| **Category** | Foundation / Layout |

## Purpose

The root layout wrapping every page. It provides the HTML skeleton, font class injection, technical metadata (OpenGraph/Twitter), and the three global chrome elements: Navbar, Footer, and ConsultPanel.

## What it does

1. **Font classes** — Applies CSS variable classes from `font.ts` onto `<html>` so all Tailwind font utilities resolve correctly.
2. **Metadata** — Sets the global `<title>`, `<meta description>`, `metadataBase`, OpenGraph tags, and Twitter Cards to ensure social links unfurl correctly with the `og-image.png`.
3. **Global structure** — Renders `<Navbar />` at the top, `<main>` for page content (flex-grow), `<Footer />` at the bottom, and `<ConsultPanel />` as a floating overlay. Everything inside `<body>` is wrapped in `<SmoothScrolling>` to enable Lenis smooth scrolling site-wide. It also renders the `<AgentationProvider />` development wrapper inside `<main>`.

## Dependencies

- `@/components/nav/Navbar`
- `@/components/layout/Footer`
- `@/components/consultation/ConsultPanel`
- `@/components/dev/AgentationProvider`
- `@/components/layout/SmoothScrolling`
- `@/components/layout/AmbientGrid`
- `@/components/layout/EasterEgg`
- `@/components/animations/IntroLoader`
- `@/components/cursor/CustomCursor`
- `@/app/font` (Inter, Space Grotesk, JetBrains Mono, Fraunces)
- `@vercel/analytics/next`

