# Projects Pages — Archive & Detail

| Field | Value |
|-------|-------|
| **Paths** | `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page |

---

## Projects Archive (`/projects`)

### Layout
- Hero section with title, lede, and date range
- Vertical list of all 6 projects, with layout dictated by `project.layout`:
  - **Split layout** (2-column with image placeholder + text)
  - **Wide layout** (single-column panoramic)
  - **Reversed layout** (image right, text left)

### Per-project card
- Index number (accent)
- Category label
- Title, context paragraph
- TagRow
- "View full case" LinkArrow

---

## Project Detail (`/projects/[slug]`)

### Routing & SEO
- Uses `generateStaticParams()` to pre-render all 6 project slugs at build time.
- The static archive page (`/projects/page.tsx`) explicitly exports its own `openGraph` and `twitter` metadata.
- The dynamic detail pages (`/projects/[slug]/page.tsx`) use `generateMetadata()` to dynamically inject `<title>`, OpenGraph tags, and Twitter Cards tailored to the specific case study being viewed, greatly improving social sharing previews.

### Sections
1. **Back link** — "← Back to archive"
2. **Hero** — poster-title, context paragraph, TagRow
3. **Metadata bar** — Category, Role, Timeline, Outcome in a `.proj-meta` grid
4. **System Map** (optional) — 3-column architecture diagram with node cards
5. **Narrative sections** — 2-column (sidebar label + prose) for each story block
6. **Next project** — footer navigation to the next case study

### 404 Handling
If slug doesn't match any project, `notFound()` is called.
