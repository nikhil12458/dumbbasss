"use client";

import { NavLink } from "@/utils/Navlink";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

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
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[8px]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
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
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="md:hidden absolute top-[74px] left-0 right-0 bg-[var(--paper)] px-[var(--gutter)] pb-[26px] pt-[10px] flex flex-col gap-[18px] border-b-[1px] border-[var(--line)] overflow-hidden"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <div key={href} onClick={closeMenu}>
                <NavLink href={href}>{label}</NavLink>
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
