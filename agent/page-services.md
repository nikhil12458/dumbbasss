# Services Pages — Overview & Detail

| Field | Value |
|-------|-------|
| **Paths** | `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page |

---

## Services Overview (`/services`)

### Layout
- Hero with title + lede
- Sidebar card: "Not sure where you fit?" → links to consultation
- Full service list: each service is a 2-column row (`items-start` prevents columns from stretching and exposing background gaps):
  - Left: index, title, description, "Full details" LinkArrow
  - Right: 2-column grid of sub-items (e.g. "Web design", "Full-stack development")

### Bottom CTA
"Most projects touch more than one category" → Start a consultation

### SEO & Metadata
Exports explicit static metadata for the archive page to ensure the correct OpenGraph and Twitter cards are shown when shared.

---

## Service Detail (`/services/[slug]`)

### Routing
Uses `generateStaticParams()` to pre-render all 5 service slugs at build time.

### Sections
1. **Back link** — "← Back to services"
2. **Hero** — poster-title + heroLede paragraph
3. **What this is** — 2-column: sidebar label + prose
4. **Who it's for** — 2-column: sidebar label + prose
5. **What's included** — 2-column grid of checklist items with accent dashes
6. **How it works** — Links to the `/process` page
7. **Seen in the wild** (if outcomes exist) — Cards linking to relevant project case studies
8. **Next service** — Footer navigation to the next service
