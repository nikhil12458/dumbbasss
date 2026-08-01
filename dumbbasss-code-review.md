# dumbbasss — Codebase Review
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion · custom canvas physics
**Scope:** full `src/` tree, config files, public assets, metadata

Findings are ordered by priority within each section. "Already good" items are called out explicitly per your request — I'm not padding this with nitpicks to look thorough.

---

## CRITICAL

### 1. Open Graph image is referenced but doesn't exist
**File:** `src/app/layout.tsx`, lines 22 & 35
**Problem:** `openGraph.images` and `twitter.images` both point to `/og-image.png`. That file is not in `public/` — only the five default `create-next-app` SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) are there.
**Why it matters:** Every link share of every page on this site — Twitter/X, LinkedIn, Slack, iMessage — will render a broken image or no preview at all. You've done the OG/Twitter metadata work correctly (right dimensions, right fields); the one file that makes it visible is missing.
**Fix:** Add a real 1200×630 `og-image.png` (or `.jpg`) to `public/`. Consider generating it dynamically later with `next/og`.
**Priority:** Critical

### 2. No sitemap or robots file
**File:** missing from `src/app/`
**Problem:** No `sitemap.ts` and no `robots.ts`. With 11 statically-generated detail routes (`/projects/[slug]` × 6, `/services/[slug]` × 5) plus 6 static routes, there's no machine-readable map of the site for crawlers.
**Why it matters:** This is App Router's single easiest SEO win — file-based, a few lines each — and it's the first thing any SEO audit checks. Discovery isn't *impossible* (everything's linked from the archive/index pages), but you're relying entirely on crawl-and-follow instead of telling search engines directly.
**Fix:** Add `src/app/sitemap.ts` mapping over `projects` and `services` (you already have `generateStaticParams` doing the equivalent work — reuse the same data), and `src/app/robots.ts` pointing to it.
**Priority:** Critical

### 3. `dangerouslySetInnerHTML` used for a line break
**File:** `src/app/projects/[slug]/page.tsx`, line 53
```tsx
<h1 ... dangerouslySetInnerHTML={{ __html: project.title.replace(' ', '<br/>') }}></h1>
```
**Problem:** This exists purely to insert a `<br/>` after the first space in a project title. `project.title` is trusted static data today, so there's no live exploit — but this is the exact pattern that becomes a stored-XSS vector the moment project data moves to a CMS or admin form (a very likely next step for "scalability for future pages"). `.replace(' ', ...)` also only replaces the *first* space, so it'll behave inconsistently on a future three-word title.
**Why it matters:** `dangerouslySetInnerHTML` should be reserved for pre-sanitized HTML, never used as a shortcut for layout. This is a landmine for whoever wires up a CMS later and doesn't think to re-audit this line.
**Fix:** Do the split in JS and render real JSX:
```tsx
{project.title.split(' ').map((word, i) => (
  <React.Fragment key={i}>{i > 0 && <br />}{word}</React.Fragment>
))}
```
Also drop `whitespace-pre-line` on that `h1` — it's doing nothing once this is real JSX instead of injected HTML.
**Priority:** Critical

---

## HIGH

### 4. Half the site shares one page title and description
**Files:** `src/app/services/[slug]/page.tsx` (no `generateMetadata` at all), plus `about`, `contact`, `process`, `services/page.tsx`, `projects/page.tsx`, `consultation/page.tsx` (none export `metadata`)
**Problem:** Only `src/app/projects/[slug]/page.tsx` implements `generateMetadata`. Every other route — that's 5 service detail pages plus 6 static pages, 11 total — falls back to the root layout's default title (`"dumbbasss — a very serious studio, unseriously named"`) and description. Search engines will see 11 pages with an identical `<title>` and meta description.
**Why it matters:** Duplicate titles across pages is one of the most basic, most damaging SEO mistakes — it actively confuses search engines about which page should rank for what, and you're sitting on perfectly good per-page copy (`service.shortDesc`, `service.title`) that's just never being used for this.
**Fix:** Copy the pattern that's already correct in `projects/[slug]/page.tsx` into `services/[slug]/page.tsx` (trivial — the data shape already supports it), and give the 6 static pages their own `export const metadata`.
**Priority:** High

### 5. Kinetic word: unscoped, unthrottled `document`-level `pointermove`
**File:** `src/utils/kinetic-type.ts`, `Input.bind()` (~line 320) and `Input.move()` (~line 303)
**Problem:** `document.addEventListener('pointermove', this.move)` fires for *every* mouse move anywhere on the page — not just near the canvas — for as long as the component is mounted (which, per `page.tsx`, is the entire time you're on the home page, even after scrolling past the hero). Every firing loops over every particle (several hundred to low thousands, depending on viewport width) computing distance. On top of that, `Input.move()` allocates a **new `Vec2` object per particle per event** (`this.mouse.subtractNew(p.pos)` clones, then `new Vec2(...)` again for the force) — that's potentially thousands of short-lived object allocations on every single mouse move, continuously, whether or not the cursor is anywhere near the word.
**Why it matters:** This is exactly the kind of thing that doesn't show up in a quick demo but shows up as jank and battery drain on real devices, especially compounded with finding #6 below, and especially if `KineticWord` is ever mounted twice on one page (each instance adds its own full-document listener).
**Fix:** Gate the listener behind proximity — check the canvas's bounding rect (or maintain it via `ResizeObserver`) and early-return if the pointer is far outside it before touching any particle. Reuse scratch `Vec2`/plain-number math in the hot path instead of allocating.
**Priority:** High

### 6. Kinetic word: physics loop never pauses off-screen
**File:** `src/utils/kinetic-type.ts`, `loop()` (~line 257)
**Problem:** `requestAnimationFrame(loop)` self-schedules forever once `build()` runs. There's no `IntersectionObserver` (or any check) pausing the simulation when the canvas scrolls out of the viewport. Scroll past the hero to read the rest of the home page, and the constraint solver (5 iterations × every constraint) and the full glyph redraw are still running at full rate, invisibly, for as long as you stay on the page.
**Why it matters:** 100% wasted main-thread and GPU work. This is a very concrete, fixable Core Web Vitals / INP risk on lower-end devices, and it's the single highest-leverage performance fix available in this file.
**Fix:** Wrap the canvas in an `IntersectionObserver`; set `running = false` (already exists as a flag!) when it leaves the viewport and restart the rAF loop when it re-enters.
**Priority:** High

### 7. Scroll reveal ignores `prefers-reduced-motion`
**File:** `src/components/animations/ScrollReveal.tsx`
**Problem:** Every `whileInView` animation (fade + translateY) fires regardless of the user's OS-level reduced-motion preference. Your own `globals.css` still has the `@media (prefers-reduced-motion: reduce)` rule for `scroll-behavior`, but the actual component doing the bulk of the motion on every page has no equivalent.
**Why it matters:** This is a real regression from the original static build, which respected this preference everywhere. For users with vestibular disorders or motion sensitivity, this isn't a nice-to-have.
**Fix:** `const shouldReduce = useReducedMotion();` from Framer Motion, and either skip the `initial`/animate props or set durations to ~0 when true. One shared change in this one file fixes it sitewide.
**Priority:** High

### 8. `display: contents` silently breaks the reveal animation on project pages
**File:** `src/app/projects/[slug]/page.tsx`, line 95: `<ScrollReveal className="contents">`
**Problem:** This is used to stop `ScrollReveal`'s wrapping `motion.div` from breaking the two-column CSS grid it sits inside (a real problem, and `display: contents` is a legitimate fix for *that*) — but `display: contents` means the element generates no box. `transform` and `opacity`, which is exactly what Framer Motion is animating here, **have no effect on boxless elements** per the CSS spec. The label/paragraph pairs in every narrative section on every project page most likely just appear instantly, with no fade or slide, contradicting the "smooth section reveals" motion language everywhere else on the site.
**Why it matters:** It's a correctness bug that's invisible unless you know to look for it — the code runs without errors, nothing crashes, it just quietly doesn't animate.
**Fix:** Don't animate the `display:contents` element itself. Either move the grid onto the two children directly (each gets its own small reveal), or restructure so `ScrollReveal` wraps the *whole* `<section>` (which is a normal block, not a grid-participating child) instead of sitting inside the grid.
**Priority:** High

### 9. The "mounted" gate hides the primary CTA from SSR and no-JS
**Files:** `src/components/consultation/ConsultPanel.tsx` line 22 (`if (!mounted) return null;`), `src/components/animations/KineticWord.tsx` (same pattern)
**Problem:** `ConsultPanel` — which renders on **every page** via the root layout, and contains your persistent "Start a project" launcher button — returns `null` until a `useEffect` flips `mounted` to `true`. Nothing in the button's JSX touches `window`/`document`; there's no hydration-mismatch reason for this gate. The practical effect: the button doesn't exist in the server-rendered HTML, doesn't exist for crawlers that don't execute JS, and pops in after hydration for everyone else.
**Why it matters:** This is your sitewide primary conversion action, gone from the initial payload for no functional reason.
**Fix:** Delete the `mounted` state entirely. `useEffect` already only runs client-side after mount — that's the guarantee you're trying to re-implement with extra state. Just move the `document.addEventListener` calls into a plain `useEffect` with no gate on the return statement.
**Priority:** High

### 10. "Start a consultation" doesn't consistently mean the same thing
**Files:** `src/components/consultation/ConsultPanel.tsx` vs. every `<Btn href="/consultation">` across `page.tsx`, `services/page.tsx`, etc.
**Problem:** `ConsultPanel`'s `isOpen` state is local to that component — I checked, `setIsOpen` is called nowhere else in the codebase. So the *only* way to open the slide-over panel is the floating launcher button. Every other "Start a consultation" / "What do you need?" button elsewhere on the site uses `href="/consultation"` and navigates to the full page instead.
**Why it matters:** Two different affordances that read as the same call-to-action behave differently depending on which button the user happens to click — one is instant (in-place panel), one is a full navigation. This looks like an artifact of porting a shared-singleton DOM pattern (one delegated click listener, any button could trigger it) into components without picking a state-sharing strategy for it.
**Fix:** Decide which one behavior should be. If the panel should be the universal entry point, lift `isOpen` into a small context provider in the layout and have every consultation CTA call it. If the dedicated page should be canonical and the floating button is just a shortcut, that's fine too — just make it consistent everywhere.
**Priority:** High

### 11. `my-[16px_8px]`-style Tailwind arbitrary values are silently doing nothing
**File:** `src/app/page.tsx` — every service preview cell (e.g. line 89) and both project preview cards (e.g. line 199)
**Problem:** `my-[16px_8px]` compiles to two separate declarations, `margin-top: 16px 8px` and `margin-bottom: 16px 8px`. Neither property accepts two values — both declarations are invalid CSS and get dropped by the browser. The intended "16px top / 8px bottom" spacing around those headings isn't applied at all.
**Why it matters:** `mt-`/`mb-` (single value each) support this; `my-`/`mx-` (shorthand-for-two-properties) don't support asymmetric arbitrary pairs the way `padding`/`margin` shorthand classes like `p-[16px_8px]` do. This is a genuinely easy mistake to make translating a static `margin: 16px 0 8px` into Tailwind, and it fails silently — no console warning, nothing visually catastrophic, just slightly wrong spacing that's easy to not notice.
**Fix:** Split into `mt-[16px] mb-[8px]` (or the specific values you actually want per instance).
**Priority:** High

### 12. Project archive layout is keyed to array index, not data
**File:** `src/app/projects/page.tsx`, lines 26–45
**Problem:** The comment says it outright: *"Determine layout style based on original index.html mapping."* Whether a project renders wide, split, or reversed is computed from `i === 2 || i === 5` etc. — literally which position it happens to sit at in the array.
**Why it matters:** You explicitly asked me to check scalability for future pages. Add a 7th project, remove one, or reorder two, and every project *after* the change point silently gets reassigned to a different layout than the one it was art-directed for — with no warning, no type error, nothing. The whole point of the varied-layout archive design gets undermined by the first data edit.
**Fix:** Add a `layout: "wide" | "split" | "reverse"` field to `ProjectData` and drive the classes from that instead of `i`.
**Priority:** High

### 13. The physics engine is functionally untyped
**Files:** `src/utils/kinetic-type.ts`, `src/components/animations/KineticWord.tsx`
**Problem:** 14 instances of explicit `any` — `opts?: any`, both class constructors typed `any`, `cfg: any`, `downConstraint?: any`, pointer handlers typed `e: any` instead of `PointerEvent`, and `mountKineticWord`'s inferred return type forces `KineticWord.tsx` to declare `let kineticInstance: any`.
**Why it matters:** Worth noting first — this is *isolated*. I checked: there is no other `any` anywhere else in the app; the data layer, UI components, and every page are cleanly typed. But in the one file doing genuinely complex math (grid coordinates, constraint graphs, force accumulation), `any` removes exactly the safety net that code needs most — nothing would catch a `col`/`row` transposition or a wrong field name in `cfg` at compile time.
**Fix:** Define and export `KineticWordOptions`, a `GridKey`/`GridPoint` pair, `ConstraintArgs`, and a `KineticWordInstance` return interface. `Constraint` is declared after `Particle` in the file but TypeScript resolves types file-wide regardless of declaration order, so `downConstraint?: Constraint` will work fine without reordering anything.
**Priority:** High

---

## MEDIUM

### 14. All four font families load on every route; one of them is used on one page
**Files:** `src/app/font.ts`, `src/app/layout.tsx`
**Problem:** `inter`, `spaceGrotesk`, `jetbrainsMono`, and `fraunces` are all instantiated in the root layout, so all four are in the font-loading waterfall for every single route. I grepped for actual usage of `serif-italic`/`serif-display`/`font-serif` — it's used exactly once, on the homepage's dark stats section.
**Why it matters:** The original brief specifically described Fraunces as a "restrained, used sparingly" element. Loading it globally means every visitor to `/about`, `/contact`, `/process`, and every project/service page pays for a font file they'll never see rendered.
**Fix:** Either accept the small fixed cost (it's not huge, `display: swap` already prevents render-blocking), or move the `fraunces` font instantiation to just the home page component instead of the root layout.
**Priority:** Medium

### 15. Google fonts loaded without a `weight` array
**File:** `src/app/font.ts`
**Problem:** None of the four `next/font/google` calls specify `weight`. For variable-axis families like these, omitting it means the full variable range ships instead of just the weights your design system actually defines (Space Grotesk 500/700, Inter 300–600, JetBrains Mono 400–600, Fraunces a narrower range with italic).
**Why it matters:** More font payload than necessary, on every page, forever.
**Fix:** Pass explicit `weight: ["300","400","500","600"]`-style arrays matching what `globals.css` actually uses.
**Priority:** Medium

### 16. `resizeObs` is declared and never used
**File:** `src/utils/kinetic-type.ts`, line 107
**Problem:** `let ... resizeObs: any;` is declared but never assigned or referenced anywhere in the file. Resize handling is done entirely via `window.addEventListener('resize', ...)`.
**Why it matters:** The variable name strongly suggests a `ResizeObserver` on the *container* was the original intent and it was never finished. The practical gap: `window` resize only fires when the *browser window* changes size — not when the container changes size for any other reason (a sidebar toggling, a parent flex/grid reflow, content pushing things around). If that ever happens, the canvas won't re-measure and can end up visually mismatched with its container.
**Fix:** Either delete the dead variable, or finish what it implies: a `ResizeObserver` on `container` instead of (or in addition to) the window listener.
**Priority:** Medium

### 17. Resize rebuilds are rAF-throttled, not debounced
**File:** `src/utils/kinetic-type.ts`, `handleResize` (~line 336)
**Problem:** `cancelAnimationFrame(resizeRAF); resizeRAF = requestAnimationFrame(build);` limits rebuilds to once per animation frame — better than nothing, but during an active window-drag-resize that's still a full `build()` (pixel-mask rescan via `getImageData`, glyph atlas rebuild, full particle/constraint reconstruction) up to ~60 times a second.
**Why it matters:** Real cost during an admittedly uncommon interaction (actively dragging the window edge), but it's cheap to fix properly.
**Fix:** Debounce on resize *end* instead (e.g. 150–200ms after the last resize event) rather than rebuilding every frame during the drag.
**Priority:** Medium

### 18. Delta-time handling is dead code wrapped around a load-bearing side effect
**File:** `src/utils/kinetic-type.ts`, `loop()` line 262 and `Particle.update()` lines 40–52
**Problem:** This one's subtle, so I'll walk through it:
```ts
particleList.forEach(p => p.update(delta ? 16.6 : 16.6, ...))
```
Both branches of that ternary are the same value — the real elapsed frame time (`delta = t - lastDelta`) is computed but never actually used; a hardcoded `16.6` (ms) is always passed instead. Looking at what that value does inside `update()`:
```ts
const dd = delta*delta;
acceleration.x += wind / dd;      // ...
pos.x += vx + acceleration.x * dd; // = vx + (wind/dd)*dd = vx + wind
```
For the wind and gravity terms, dividing by `dd` and then multiplying by `dd` a few lines later **cancels out algebraically** — the hardcoded value has *no actual effect* on those forces regardless of what number you put there. So the delta-time plumbing looks like proper timestep-aware physics but functionally isn't, for those two terms.

Where it *does* matter: `Input.move()` applies the mouse-drag force directly via `applyForce()`, **outside** that divide/multiply pattern, so that force *does* get scaled by `dd` (i.e. by `16.6² ≈ 275`) when applied to position. That scaling is calibrated around the assumption of a fixed 16.6ms step.

**Why it matters:** Two real consequences: (1) since nothing in this simulation is actually normalized to wall-clock time, its evolution speed is tied to how often `requestAnimationFrame` fires — it will visibly run faster on a 120Hz display than a 60Hz one, since more update+solve steps happen per real second. (2) if someone "cleans up" the apparent dead code later and wires in the real `delta`, the mouse-interaction term's `dd` scaling would suddenly vary with actual frame timing — tiny/unresponsive on fast frames, potentially explosive after a dropped frame — reintroducing exactly the instability this hardcoding was very possibly added to paper over.
**Fix:** Pick one deliberate approach: either make the whole simulation genuinely delta-time-normalized (clamp `delta` to a sane range like `Math.min(delta, 32)` and remove the cancel-out divide/multiply so the intent is legible), or keep it as a fixed-step simulation on purpose and delete the unused `delta` calculation so the next person doesn't assume it's doing something it isn't. Either way, a comment explaining the mouse-force/dd coupling would save whoever touches this next a genuinely confusing debugging session.
**Priority:** Medium (not causing a visible bug today, but fragile and non-obvious — exactly the kind of thing that breaks when "simplified" later)

### 19. `cn()` exists but is used in one out of five shared components
**Files:** `src/components/ui/Eyebrow.tsx`, `LinkArrow.tsx`, `SectionTitle.tsx`, `TagRow.tsx` (raw template literals) vs. `Btn.tsx` (correctly uses `cn()`)
**Problem:** You have `tailwind-merge` wired up correctly in one place. Everywhere else, a consumer-supplied `className` is just string-concatenated onto the component's base classes.
**Why it matters:** Without `tailwind-merge`, if a caller passes a `className` that conflicts with a base class (e.g. trying to override `SectionTitle`'s font size), which one wins depends on CSS source order, not on which one appears "last" in the string — unpredictable, and the exact class of bug `cn()` exists to prevent.
**Fix:** Route all five components' className merging through `cn()` for consistency.
**Priority:** Medium

### 20. Active nav state is exact-match only
**File:** `src/utils/Navlink.tsx`, line 13: `const isActive = pathname === href;`
**Problem:** `/projects` only shows as active on the literal `/projects` URL — not on `/projects/guardiantrack` or any other project detail page. Same for `/services`.
**Why it matters:** A visitor reading a project case study has no nav indication they're still "in" the Projects section — a real, visible inconsistency on 11 of your 17 routes.
**Fix:** `const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));`
**Priority:** Medium

### 21. Missing `aria-current="page"`
**File:** `src/utils/Navlink.tsx`
**Problem:** The active link is indicated with color + an underline scale transform only — no `aria-current`. Your earlier static HTML version had this; it didn't carry over.
**Fix:** `aria-current={isActive ? "page" : undefined}` on the `Link`.
**Priority:** Medium

### 22. Mobile menu toggle missing `aria-expanded`/`aria-controls`
**File:** `src/components/nav/Navbar.tsx`, line 37
**Fix:** `aria-expanded={isOpen}` and `aria-controls="mobile-nav"` (with a matching `id` on the `motion.nav`).
**Priority:** Medium

### 23. Consultation panel has no dialog semantics
**File:** `src/components/consultation/ConsultPanel.tsx`
**Problem:** The slide-over behaves visually like a modal (scrim, focus expected to stay inside) but has no `role="dialog"`, no `aria-modal="true"`, no focus trap, and doesn't move focus in on open or back to the launcher on close.
**Why it matters:** Keyboard and screen-reader users can Tab straight through to content behind the scrim, and get no semantic announcement that a dialog opened at all.
**Fix:** Add the ARIA attributes, move focus to the close button (or first option) on open, and return focus to the launcher button on close. A small `useEffect` keyed on `isOpen` handles both.
**Priority:** Medium

### 24. Consultation options have no group semantics
**File:** `src/components/consultation/ConsultFlow.tsx`, lines 91–99
**Problem:** Each question's options render as a plain list of `<button>`s. A screen reader hears "button, button, button" with no indication these five are mutually-exclusive answers to one question.
**Fix:** Wrap in `role="radiogroup"` with `aria-labelledby` pointing at the question text, and mark each option `role="radio"` with `aria-checked`.
**Priority:** Medium

### 25. Two nested `<main>` landmarks on `/consultation`
**File:** `src/app/consultation/page.tsx`, line 8
**Problem:** `layout.tsx` already wraps `{children}` in `<main className="flex-1">`. This page's own top-level element is *also* `<main>`, so `/consultation` renders `<main><main>...`. Every other page correctly uses a `<>` fragment at the top level — this is the one exception.
**Why it matters:** `<main>` is a landmark meant to appear once per page; nested landmarks are invalid and break "skip to main content" / landmark-navigation behavior in screen readers.
**Fix:** Change the outer element in `consultation/page.tsx` to a fragment, same as every other page.
**Priority:** Medium

### 26. No established image pattern
**Files:** `next.config.ts`, whole `src/` tree
**Problem:** Zero `next/image` usage anywhere in the codebase right now — every project/service visual is a placeholder gradient `<div>`. That's fine today (nothing to optimize that doesn't exist), but `next.config.ts` is the untouched default with no `images.remotePatterns`/`domains` configured.
**Why it matters:** The moment real project screenshots go in — which will happen — there's no precedent for how they should load, and if they come from any external host (a CMS, a storage bucket), the build will fail on an unconfigured domain until someone hunts down this config.
**Fix:** Decide the image source now (local `public/` files vs. remote) and set up `next/image` + config accordingly for the first real image, so the pattern exists before it's needed six times over.
**Priority:** Medium

### 27. Home page previews duplicate the data layer instead of using it
**File:** `src/app/page.tsx`, services preview grid (~line 82) and projects preview (~line 191)
**Problem:** `src/data/projects.ts` and `src/data/services.ts` exist and are used correctly by the archive/index pages — but the home page's preview sections hardcode the same titles, descriptions, and links directly in JSX instead of importing and slicing from that data.
**Why it matters:** Two sources of truth for the same content. Update a project's title or a service's description in the data file, and the homepage preview silently goes stale until someone remembers to edit it separately.
**Fix:** `services.slice(0, 5)` / `projects.slice(0, 2)` and map, same pattern the archive pages already use correctly.
**Priority:** Medium

### 28. `LinkArrow` animates `gap`
**File:** `src/components/ui/LinkArrow.tsx`
**Problem:** `hover:gap-[13px]` animates the flex `gap` property via a CSS transition. `gap` isn't a compositable property — animating it triggers layout recalculation on every frame of the transition, unlike a `transform: translateX`.
**Why it matters:** Real but small — this is one short text link, transitioning briefly, on hover. Flagging it because it's the kind of thing worth knowing the *right* way to do, not because it's currently hurting you.
**Fix:** Animate a `translateX` on the arrow character instead of the container's `gap`, if you ever revisit this component.
**Priority:** Low–Medium

---

## LOW

### 29. Footer year is hardcoded
**File:** `src/components/layout/Footer.tsx`, line 35 — `<span>© 2026 dumbbasss studio</span>`
**Fix:** `© {new Date().getFullYear()} dumbbasss studio`
**Priority:** Low

### 30. Mixed line endings
**Files:** `src/app/font.ts`, `src/utils/Navlink.tsx` (CRLF; rest of the repo is LF)
**Fix:** Add a `.gitattributes` with `* text=auto eol=lf` and normalize.
**Priority:** Low

### 31. `Btn` doesn't forward extra props
**File:** `src/components/ui/Btn.tsx`
**Problem:** No `...rest` spread, so a consumer can't pass `target`, `rel`, or `aria-label` through. The `<button>` branch also doesn't set `type="button"`, which matters if this is ever used inside a `<form>` (defaults to `type="submit"` per the HTML spec).
**Priority:** Low

### 32. Inline hex colors in the hero SVG
**File:** `src/app/page.tsx`, lines 26–41 (`fill="#18140F"` × 5)
**Fix:** Reference `var(--ink)` instead, so the architectural silhouette stays in sync if the ink token ever changes.
**Priority:** Low

### 33. `routeSuggestion()` called twice per render
**File:** `src/components/consultation/ConsultFlow.tsx`, line 121
**Fix:** `const { href, label } = routeSuggestion();` once, use both.
**Priority:** Low

### 34. Stale README
**File:** `README.md`
**Problem:** Unmodified `create-next-app` boilerplate — still references the Geist font, which this project doesn't use. Meanwhile there's a genuinely useful 18-file `/agent` documentation folder that the README doesn't even point to.
**Priority:** Low

### 35. Unused default Next.js starter assets
**File:** `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
**Fix:** Delete — dead weight, easy to confuse with real assets later.
**Priority:** Low

### 36. `Particle.homeX` is set, never read
**File:** `src/utils/kinetic-type.ts`, line 25 & 37
**Priority:** Low

---

## Already good — keep as-is

- **Server/Client boundaries are mostly well-chosen.** `Footer`, `Eyebrow`, `SectionTitle`, and the data-driven list pages are correctly left as Server Components; interactivity is correctly isolated to the components that need it (`Navbar`, `ScrollReveal`, `ConsultPanel`, `KineticWord`). This is the right default posture for the App Router and most of the app follows it.
- **`generateStaticParams` is implemented correctly on both dynamic routes** — all 11 detail pages are properly pre-rendered at build time, not left to render on demand.
- **`generateMetadata` on `projects/[slug]` is genuinely well done** — correct OG type (`article`), Twitter card, real per-project copy. This is the template to copy for finding #4, not a rewrite.
- **`notFound()` is correctly wired on both dynamic routes** for invalid slugs.
- **The data layer (`projects.ts` / `services.ts`) is strongly typed and complete** — every entry conforms to its type, optional fields (`systemMap`, `nextProject`) are used correctly, and this is a real scalability improvement over hardcoding content into markup.
- **Cleanup discipline in `kinetic-type.ts` is correct** — `build()` cancels the previous `rafId`, unbinds the previous `Input`'s listeners, and clears the old canvas *before* constructing new ones. No listener or canvas accumulates across resizes or remounts. This is easy to get wrong when porting imperative canvas code into a component lifecycle, and it's handled properly here.
- **DPR is capped at 2** (`Math.min(window.devicePixelRatio || 1, 2)`) — avoids absurd canvas backing-store sizes on high-DPI phones.
- **`getImageData` is called once per mask build**, not per pixel — the pixel-sampling loop reads from an already-fetched typed array. Correctly efficient.
- **`ConsultFlow`'s `STEPS` array lives at module scope**, not recreated every render; state updates are immutable; the empty-`outcomes`-array case on the restaurant/growth services is correctly guarded with `.length > 0 &&` rather than rendering an awkward empty block.
- **The Back button uses `visibility: hidden`, not `opacity: 0`**, to hide itself on step one — correctly removes it from the tab order and the accessibility tree instead of leaving an invisible focusable button behind.
- **No `any` outside the animation engine.** I checked the whole tree — the data layer, every page, every UI component is cleanly typed. The TypeScript debt is real but contained to exactly one file's problem domain.
- **No leftover `console.log`, `debugger`, or `TODO`/`FIXME` comments anywhere.** Clean.
- **`metadataBase` is correctly set** in the root layout, so relative OG image URLs resolve properly once #1 is fixed.

---

## Scores

| Category | Score | Why |
|---|---|---|
| Performance | 6/10 | Solid foundation (code-split hero, capped DPR, clean cleanup logic) undermined by real hot-path cost in the one interactive-heavy component: unscoped global listener, no off-screen pause, no reduced-motion respect. |
| Scalability | 6/10 | Good typed data layer, but index-derived layout and no shared consultation state are the kind of thing that breaks the next time someone adds a page or a project. |
| Maintainability | 6.5/10 | Reasonable structure and naming throughout; dragged down by duplicated content sources, dead code (`resizeObs`, `homeX`), and inconsistent `cn()` adoption. |
| SEO | 4.5/10 | The two or three things that matter most for a marketing/portfolio site — unique per-page metadata, a working OG image, a sitemap — are the exact things missing or broken, despite the metadata *pattern* that does exist being well-executed. |
| Accessibility | 5.5/10 | No catastrophic failures, but a consistent pattern of dropped semantics versus the original design (aria-current, dialog roles, radiogroup, reduced-motion, expanded state). |
| TypeScript quality | 7/10 | Excellent everywhere except one file, where it's a real gap (14 `any`s in the most mathematically complex code in the project). |
| Production readiness | 5.5/10 | Not fundamentally broken, but the Critical-tier items (broken social previews, duplicate SEO metadata, an XSS-shaped pattern) are all things I'd want fixed before real users and real search traffic hit this. |

---

## Fix before shipping
1. Add the missing `/og-image.png` (#1)
2. Add `sitemap.ts` + `robots.ts` (#2)
3. Replace the `dangerouslySetInnerHTML` title split (#3)
4. Add `generateMetadata` to `services/[slug]` and the six static pages (#4)
5. Fix the `my-[16px_8px]` spacing bug sitewide (#11)
6. Decide and fix the consultation panel's inconsistent trigger behavior (#10)
7. Remove the `mounted` gate hiding the sitewide CTA (#9)

## Improve later
- IntersectionObserver-gated pause for the kinetic word's physics loop (#6) and proximity-gated pointermove (#5)
- Data-driven project archive layout instead of index-derived (#12)
- Type the kinetic engine properly (#13)
- Accessibility pass: dialog semantics, radiogroup, aria-current, aria-expanded (#21–25)
- `display: contents` reveal-animation fix on project pages (#8)
- Reduced-motion support in `ScrollReveal` (#7)
- Consolidate `cn()` usage (#19), font-loading trim (#14, #15)

## Already strong — don't touch
- Server/Client component boundaries
- `generateStaticParams` + `notFound()` on both dynamic routes
- The `projects.ts`/`services.ts` data layer shape
- Canvas/listener cleanup discipline in `kinetic-type.ts`
- Overall TypeScript hygiene outside the animation engine
- Commit hygiene (no debug leftovers)
