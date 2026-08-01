import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";


type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  variant?: "outline" | "filled";
  children: React.ReactNode;
  className?: string;
};

export default function Btn({ href, variant = "outline", children, className, ...rest }: BtnProps) {
  const baseClasses = "btn-base";
  const variantClasses = variant === "filled" ? "btn-filled" : "btn-outline";
  const classes = cn(baseClasses, variantClasses, className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={rest.type || "button"} className={classes} {...(rest as any)}>
      {children}
    </button>
  );
}
