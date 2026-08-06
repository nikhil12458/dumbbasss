# Contact Page

| Field | Value |
|-------|-------|
| **Path** | `src/app/contact/page.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page |

## Purpose

Two-path contact page — either email directly or go through the guided consultation flow.

## Sections

1. **Hero** — "Say the word." with a lede describing both options
2. **Two-column split**:
   - **Direct** — Email CTA with `mailto:` link
   - **Guided** — Link to `/consultation`
3. **Contact details row** — Email, Instagram handle, and response time

## Design

- 2-column grid separated by a 1px gap in `--line` color
- Each column has its own Eyebrow + heading + description + CTA

## SEO & Metadata

Exports static metadata (including `openGraph` and `twitter` cards), ensuring correct title formatting and social sharing previews without falling back to site-wide defaults.
