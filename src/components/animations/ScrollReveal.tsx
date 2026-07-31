"use client";

import React from "react";
import { motion } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  variant?: "up" | "up-strong";
  className?: string;
};

export default function ScrollReveal({ children, variant = "up", className = "" }: ScrollRevealProps) {
  const yOffset = variant === "up-strong" ? 46 : 16;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
