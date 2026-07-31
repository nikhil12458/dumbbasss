"use client";

import { NavLink } from "@/utils/Navlink";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-[200] bg-[rgba(237,231,216,0.82)] backdrop-blur-[10px] border-b-[1px] border-[var(--line)]">
      <div className="wrap h-[74px] flex items-center justify-between">
        <Link
          href={"/"}
          className="font-display font-bold text-[17px] tracking-[-0.01em] text-[var(--ink)] flex items-baseline gap-[2px]"
          onClick={closeMenu}
        >
          dumbbasss
          <sup className="text-[9px] text-[var(--ink-faint)] font-medium">™</sup>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-[34px]">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/process">Process</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[8px]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-[20px] h-[1px] bg-[var(--ink)] block"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-[20px] h-[1px] bg-[var(--ink)] block"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-[20px] h-[1px] bg-[var(--ink)] block"
          />
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="md:hidden absolute top-[74px] left-0 right-0 bg-[var(--paper)] px-[var(--gutter)] pb-[26px] pt-[10px] flex flex-col gap-[18px] border-b-[1px] border-[var(--line)] overflow-hidden"
          >
            <div onClick={closeMenu}><NavLink href="/">Home</NavLink></div>
            <div onClick={closeMenu}><NavLink href="/projects">Projects</NavLink></div>
            <div onClick={closeMenu}><NavLink href="/services">Services</NavLink></div>
            <div onClick={closeMenu}><NavLink href="/about">About</NavLink></div>
            <div onClick={closeMenu}><NavLink href="/process">Process</NavLink></div>
            <div onClick={closeMenu}><NavLink href="/contact">Contact</NavLink></div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
