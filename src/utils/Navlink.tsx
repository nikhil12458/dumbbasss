"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`font-mono text-xs tracking-[0.005rem] uppercase relative pb-1
        ${isActive ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}
    >
      {children}

      <span
        className={`absolute left-0 bottom-0 h-px w-full origin-left bg-[var(--ink)] transition-transform duration-200
          ${isActive ? "scale-x-100" : "scale-x-0"}`}
      />
    </Link>
  );
}
