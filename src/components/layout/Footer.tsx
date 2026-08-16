import Link from "next/link";
import { Mail } from "lucide-react";
import { FiInstagram, FiGithub } from "react-icons/fi";
import LinkArrow from "@/components/ui/LinkArrow";
import { EasterEggHint } from "@/components/layout/EasterEgg";

export default function Footer() {
  return (
    <footer className="border-t-[1px] border-[var(--line)] pt-[56px] pb-[40px]">
      <div className="wrap flex justify-between flex-wrap gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-[4px]">
            Studio
          </span>
          <Link
            href="/about"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            About
          </Link>
          <Link
            href="/process"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            Process
          </Link>
          <Link
            href="/contact"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-[4px]">
            Work
          </span>
          <Link
            href="/projects"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            Projects
          </Link>
          <Link
            href="/services"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            Services
          </Link>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-[4px]">
            Say hello
          </span>
          <a
            href="mailto:contact@example.com"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center"
          >
            <Mail size={14} className="mr-[8px] opacity-70" />{" "}
            contact@example.com
          </a>
          <a
            href="#"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center"
          >
            <FiInstagram size={14} className="mr-[8px] opacity-70" />{" "}
            @instagram_handle
          </a>
          <a
            href="#"
            className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center"
          >
            <FiGithub size={14} className="mr-[8px] opacity-70" /> github_handle
          </a>
          <div className="mt-[8px]">
            <LinkArrow href="/consultation">Start a consultation →</LinkArrow>
          </div>
        </div>
      </div>
      <div className="wrap mt-[46px] pt-[20px] border-t-[1px] border-[var(--line)] font-mono text-[11px] text-[var(--ink-faint)] flex justify-between flex-wrap gap-[10px]">
        <div className="flex items-center">
          <span className="footer-mark">
            © {new Date().getFullYear()} dumbbasss studio
          </span>
          <EasterEggHint />
        </div>
        <span>an unserious name, a serious studio</span>
      </div>
    </footer>
  );
}
