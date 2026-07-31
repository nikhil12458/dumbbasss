import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`font-display font-bold text-[clamp(30px,4vw,50px)] leading-[1.08] tracking-[-0.01em] m-0 ${className}`}>
      {children}
    </h2>
  );
}
