import React from "react";

type EyebrowProps = {
  accent?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({ accent = false, children, className = "" }: EyebrowProps) {
  const colorClass = accent ? "text-[var(--accent)]" : "text-[var(--ink-soft)]";
  const beforeClass = accent ? "before:bg-[var(--accent)]" : "before:bg-[var(--ink-faint)]";

  return (
    <span className={`inline-flex items-center gap-[10px] font-mono text-[11.5px] tracking-[0.16em] uppercase mb-[22px] before:content-[''] before:w-[22px] before:h-[1px] ${colorClass} ${beforeClass} ${className}`}>
      {children}
    </span>
  );
}
