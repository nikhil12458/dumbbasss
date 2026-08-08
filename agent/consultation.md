# Consultation — Page, ConsultFlow & ConsultPanel

| Field | Value |
|-------|-------|
| **Paths** | `src/app/consultation/page.tsx`, `src/components/consultation/ConsultFlow.tsx`, `src/components/consultation/ConsultPanel.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page + Components |

---

## Consultation Page (`/consultation`)

A standalone page that renders the `ConsultFlow` wizard inside a bordered container. Includes a fallback email link at the bottom.

---

## ConsultFlow.tsx

A multi-step intake wizard with 5 questions, animated transitions, and a summary/routing screen. Uses semantic `role="radiogroup"` and `role="radio"` attributes for option selection.

### Steps

| # | Key | Question | Options |
|---|-----|----------|---------|
| 1 | `need` | What are you here to build? | A website, A software system, AI or automation, A business system, Not sure yet |
| 2 | `business` | What kind of business? | Restaurant/hospitality, Retail/ecommerce, Startup/SaaS, Personal brand, Something else |
| 3 | `help` | What do you need most? | Design, Development, SEO, A chatbot, AI integration, The whole build |
| 4 | `content` | Already have content? | Yes all, Some, Starting from scratch |
| 5 | `timeline` | Rough timeline? | ASAP, 1–2 months, Flexible |

### After completion
- Shows a summary of all answers
- Generates a `mailto:` link with the answers pre-filled in the email body
- Suggests the most relevant service page based on the first answer
- Progress bar across the top

### Animations
- `AnimatePresence` with `mode="wait"` for step transitions
- Slide-up on enter, slide-up-and-out on exit

---

## ConsultPanel.tsx

A floating "Start a project" button fixed to the bottom-right corner of every page. Clicking it opens a full-height slide-in panel from the right containing the `ConsultFlow` wizard.

### Features
- **Trigger button**: Fixed position, ink background, accent dot, hover lifts and changes color
- **Overlay**: Semi-transparent ink backdrop with blur
- **Panel**: Framer Motion slide-in from the right (`x: 100%` → `x: 0`). Uses `role="dialog"` and `aria-modal="true"`.
- **Close**: Click overlay, press Escape, or click "Close ✕"
- **Focus Management**: Wraps the panel in `<FocusTrap>` from `focus-trap-react` to prevent the user from tabbing out of the modal. Automatically focuses the close button when opened, and restores focus to the trigger button when closed.
- **Auto-hide**: Uses an IntersectionObserver to automatically fade and hide the button when the footer enters the viewport, preventing overlap.
