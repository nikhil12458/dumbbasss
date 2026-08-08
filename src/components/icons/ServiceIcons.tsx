// Same visual grammar as SectionDivider: 1.4px stroke, var(--ink-faint),
// rounded caps, no fill. One consistent hand, five marks.

export const WebsiteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="4" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <line x1="2" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="5" cy="6" r="0.6" fill="currentColor" />
  </svg>
);

export const SoftwareIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M7 6 L2 11 L7 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 6 L20 11 L15 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AiIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
    <line x1="11" y1="2" x2="11" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="11" y1="16" x2="11" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="2" y1="11" x2="6" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const BusinessSystemsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
    <rect x="12" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
    <rect x="3" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
    <rect x="12" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const GrowthIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M2 18 L8 11 L12 14 L20 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 4 L20 4 L20 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
