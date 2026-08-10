import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

type BtnBaseProps = {
  variant?: "outline" | "filled";
  children: React.ReactNode;
  className?: string;
};

type BtnAsLink = BtnBaseProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

type BtnAsButton = BtnBaseProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type BtnProps = BtnAsLink | BtnAsButton;

export default function Btn(props: BtnProps) {
  const { variant = "outline", children, className, ...rest } = props;
  const baseClasses = "btn-base";
  const variantClasses = variant === "filled" ? "btn-filled" : "btn-outline";
  const classes = cn(baseClasses, variantClasses, className);

  if (props.href) {
    const { href, variant: _, ...linkRest } = rest as BtnAsLink;
    return (
      <Link href={props.href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { variant: _, ...buttonRest } = rest as BtnAsButton;
  return (
    <button type={buttonRest.type || "button"} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
