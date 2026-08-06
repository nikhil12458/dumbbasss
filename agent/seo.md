# SEO & Indexing — sitemap.ts & robots.ts

| Field | Value |
|-------|-------|
| **Paths** | `src/app/sitemap.ts`, `src/app/robots.ts` |
| **Author** | 🤖 AI |
| **Category** | SEO / Routing |

## Purpose

These files use Next.js App Router metadata conventions to dynamically generate `sitemap.xml` and `robots.txt` at build time, ensuring all static and dynamic pages are crawlable by search engines.

---

## robots.ts

Generates the `robots.txt` file. 

- **Rules**: Allows all user agents (`*`) to crawl the entire site (`/`).
- **Sitemap**: Automatically points search engines to `https://dumbbasss.vercel.app/sitemap.xml`.

---

## sitemap.ts

Generates a dynamic XML sitemap containing all accessible pages on the site.

### Included Routes
1. **Static Pages**: `/`, `/about`, `/contact`, `/process`, `/consultation`, `/services`, `/projects`.
2. **Dynamic Project Pages**: Iterates over `projects.ts` and maps each slug to `/projects/[slug]`.
3. **Dynamic Service Pages**: Iterates over `services.ts` and maps each slug to `/services/[slug]`.

### Output Properties
- `url`: The absolute path for the page.
- `lastModified`: Uses the build time to indicate freshness.
- `changeFrequency`: Set to `monthly` (static) or `weekly` (dynamic/frequently updated pages).
- `priority`: Weighted (e.g. `1.0` for Home, `0.8` for Services, `0.6` for Contact) to guide search engine crawling hierarchy.
