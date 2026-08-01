import React from "react";
import { cn } from "@/utils/cn";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn("font-display font-bold text-[clamp(30px,4vw,50px)] leading-[1.08] tracking-[-0.01em] m-0", className)}>
      {children}
    </h2>
  );
}
