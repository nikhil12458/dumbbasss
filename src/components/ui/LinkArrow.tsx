import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

type LinkArrowProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function LinkArrow({ href, children, className }: LinkArrowProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "group inline-flex items-center font-mono text-[12.5px] tracking-[0.05em] uppercase text-[var(--ink)] border-b border-[var(--line-strong)] pb-[3px] transition-all duration-300 ease-[var(--ease)] hover:border-[var(--ink)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
