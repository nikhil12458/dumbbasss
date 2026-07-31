import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[200] bg-[rgba(237, 231, 216, 0.82)] backdrop-blur-[.8rem] border-b-[1px] border-[var(--line)] ">
      <div className="flex items-center justify-center py-[.8rem] px-16">
        <Link href={"/"} className="font-display text-3xl font-bold text-[var(--ink)]">
          dumbbasss
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
