import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";


type BtnProps = {
  href?: string;
  variant?: "outline" | "filled";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Btn({ href, variant = "outline", children, className = "", onClick }: BtnProps) {
  const baseClasses = "btn-base";
  const variantClasses = variant === "filled" ? "btn-filled" : "btn-outline";
  const classes = cn(baseClasses, variantClasses, className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
