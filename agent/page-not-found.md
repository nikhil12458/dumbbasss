# not-found.tsx — Custom 404 Page

| Field | Value |
|-------|-------|
| **Path** | `src/app/not-found.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page / Routing |

## Purpose

The fallback 404 error page displayed when a user navigates to a route that does not exist in the application, or when dynamic projects or services call Next.js's `notFound()`.

## Layout & Features

1. **Mono Header**:
   - Renders a small monospaced label: `error 404 — an unserious problem, honestly`
2. **Interactive Word Canvas**:
   - Renders a dynamic Canvas physics canvas rendering the word `"nowhere"`.
   - Uses `next/dynamic` to load the canvas physics engine on the client side only (`ssr: false`), preventing server-side rendering issues with Canvas.
3. **Copy & CTAs**:
   - Displays a brief explanation of the page error.
   - Provides a filled `Btn` linking back to the home page (`"/"`) and an arrow link (`LinkArrow`) leading to the projects archive (`"/projects"`).
