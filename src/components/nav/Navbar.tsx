import { NavLink } from "@/utils/Navlink";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-[200] bg-[rgba(237, 231, 216, 0.82)] backdrop-blur-[.8rem] border-b-[1px] border-[var(--line)] ">
      <div className="flex items-center justify-between py-[1.4rem] px-[9rem]">
        <Link
          href={"/"}
          className="font-display font-bold text-lg tracking-[-0.05rem] font-bold text-[var(--ink)] "
        >
          dumbbasss
        </Link>
        <nav className="flex items-center gap-[2.5rem] ">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/process">Process</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>  
      </div>
    </header>
  );
};

export default Navbar;
