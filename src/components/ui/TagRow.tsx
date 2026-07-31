import React from "react";

type TagRowProps = {
  tags: string[];
  className?: string;
};

export default function TagRow({ tags, className = "" }: TagRowProps) {
  return (
    <div className={`flex flex-wrap gap-[8px] ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="font-mono text-[11px] tracking-[0.04em] border border-[var(--line-strong)] py-[5px] px-[10px] text-[var(--ink-soft)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
