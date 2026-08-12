import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

type LinkArrowProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function LinkArrow({ href, children, className, ...rest }: LinkArrowProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "group inline-flex items-center font-mono text-[12.5px] tracking-[0.05em] uppercase text-[var(--ink)] border-b border-[var(--line-strong)] pb-[3px] py-[11px] -my-[11px] transition-all duration-300 ease-[var(--ease)] hover:border-[var(--ink)]",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
