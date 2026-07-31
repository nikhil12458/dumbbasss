# layout.tsx — Root Layout

| Field | Value |
|-------|-------|
| **Path** | `src/app/layout.tsx` |
| **Author** | 🤖 AI |
| **Category** | Foundation / Layout |

## Purpose

The root layout wrapping every page. It provides the HTML skeleton, font class injection, metadata, and the three global chrome elements: Navbar, Footer, and ConsultPanel.

## What it does

1. **Font classes** — Applies CSS variable classes from `font.ts` onto `<html>` so all Tailwind font utilities resolve correctly.
2. **Metadata** — Sets the global `<title>` and `<meta description>`.
3. **Global structure** — Renders `<Navbar />` at the top, `<main>` for page content (flex-grow), `<Footer />` at the bottom, and `<ConsultPanel />` as a floating overlay.

## Dependencies

- `@/components/nav/Navbar`
- `@/components/layout/Footer`
- `@/components/consultation/ConsultPanel`
- `@/app/font` (Inter, Space Grotesk, JetBrains Mono, Fraunces)
