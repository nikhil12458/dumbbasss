type SectionDividerProps = {
  className?: string;
};

/**
 * A thin rule broken by a small torii-echo glyph — the same two-pillar/
 * beam silhouette as the hero gate, reduced to its simplest form. Meant to
 * replace plain `border-t` dividers between major sections on pages that
 * currently have zero illustration (Projects, Services, Process, Contact).
 *
 * This is deliberately the ONLY new decorative motif being introduced —
 * the point is one device recurring across pages, not several competing
 * ones. Don't add a second "fun" divider shape elsewhere; reuse this one.
 *
 * Usage: drop between <section> blocks in place of a bare hairline.
 *   <SectionDivider />
 */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`wrap flex items-center gap-[18px] py-[6px] ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-[var(--line)]" />
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
        <path
          d="M2 5 L6 2 L22 2 L26 5"
          stroke="var(--ink-faint)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="7" y1="4" x2="7" y2="14" stroke="var(--ink-faint)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="21" y1="4" x2="21" y2="14" stroke="var(--ink-faint)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <div className="flex-1 h-px bg-[var(--line)]" />
    </div>
  );
}
