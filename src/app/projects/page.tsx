import { projects } from "@/data/projects";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import TagRow from "@/components/ui/TagRow";
import LinkArrow from "@/components/ui/LinkArrow";

export const metadata = {
  title: "Projects | dumbbasss",
  description: "Our work and projects.",
};

export default function ProjectsArchive() {
  return (
    <>
      <section className="py-[70px] pb-[90px] wrap">
        <Eyebrow accent>— archive —</Eyebrow>
        <h1 className="font-display font-bold text-[clamp(40px,7vw,86px)] leading-[1.05] max-w-[900px]">
          Work, in the order<br />it actually happened.
        </h1>
        <p className="section-lede mt-[26px] max-w-[520px]">
          Six projects, six different problems. No two builds looked the same going in, and none of them look the same coming out.
        </p>
        <p className="font-mono text-[12px] text-[var(--ink-faint)] mt-[40px] tracking-[0.08em] uppercase">
          01 — 06 · updated 2026
        </p>
      </section>

      <section className="pb-[130px] wrap">
        {projects.map((proj, i) => {
          let layoutClass = "";
          let visualClass = "";
          let textClass = "";

          if (proj.layout === "wide") {
            layoutClass = "grid-cols-1";
            visualClass = "aspect-[21/8]";
          } else {
            const isReverse = proj.layout === "reverse";
            layoutClass = "grid-cols-1 md:grid-cols-2 items-center";
            if (isReverse) {
              visualClass = "aspect-[4/3] order-0 md:order-2";
              textClass = "order-0 md:order-1";
            } else {
              visualClass = "aspect-[4/3]";
            }
          }

          return (
            <ScrollReveal key={proj.slug}>
              <article className={`border-t border-[var(--line)] py-[64px] grid gap-[40px] ${layoutClass} ${i === projects.length - 1 ? 'border-b border-[var(--line)]' : ''}`}>
                <div className={`relative bg-gradient-to-br from-[var(--paper-deep)] to-[var(--paper)] border border-[var(--line)] overflow-hidden ${visualClass}`}>
                  <div className="absolute inset-0 opacity-60 bg-[repeating-linear-gradient(90deg,var(--line)_0_1px,transparent_1px_46px)]"></div>
                </div>
                <div className={`${textClass}`}>
                  <span className="font-mono text-[12px] text-[var(--accent)] mb-[14px] block">{proj.index}</span>
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--ink-soft)] mb-[16px] block">{proj.category}</span>
                  <h2 className="font-display font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.01em] mb-[16px]">{proj.title}</h2>
                  <p className="text-[15.5px] text-[var(--ink-soft)] leading-[1.75] max-w-[52ch] mb-[22px]">{proj.context}</p>
                  <TagRow tags={proj.tags} className="mt-[4px]" />
                  <div className="mt-[20px] inline-flex">
                    <LinkArrow href={`/projects/${proj.slug}`}>View full case →</LinkArrow>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </section>
    </>
  );
}
