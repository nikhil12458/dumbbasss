import { services } from "@/data/services";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Btn from "@/components/ui/Btn";
import LinkArrow from "@/components/ui/LinkArrow";

export const metadata = {
  title: "Services | dumbbasss",
  description: "Our services. Everything from layout to launch.",
};

export default function ServicesOverview() {
  return (
    <>
      <section className="wrap py-[70px] pb-[60px] flex justify-between items-end gap-[30px] flex-wrap">
        <ScrollReveal>
          <Eyebrow accent>— services —</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(38px,6vw,70px)] leading-[1.05] max-w-[640px]">
            Five categories. No maze.
          </h1>
          <p className="section-lede mt-[20px]">
            Everything we do lives in one of these. Pick the one closest to your problem — we'll sort the rest out together.
          </p>
        </ScrollReveal>
        <ScrollReveal className="border border-[var(--line-strong)] p-[26px_28px] max-w-[300px] flex flex-col gap-[14px]">
          <h4 className="font-display text-[16px] font-bold">Not sure where you fit?</h4>
          <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
            Answer five short questions and we'll point you to the right place — no sales pitch attached.
          </p>
          <Btn href="/consultation" variant="filled" className="justify-center">What do you need? →</Btn>
        </ScrollReveal>
      </section>

      <section className="wrap border-t border-[var(--line)]">
        {services.map((svc) => (
          <ScrollReveal key={svc.slug} className="py-[56px] border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-[0.8fr_2fr] gap-[40px]">
            <div className="flex flex-col gap-[14px]">
              <span className="font-mono text-[12px] text-[var(--accent)]">{svc.index}</span>
              <h2 className="font-display font-bold text-[clamp(24px,2.6vw,34px)] leading-[1.08] tracking-[-0.01em]">
                <Link href={`/services/${svc.slug}`} className="hover:text-[var(--accent)] transition-colors">{svc.title}</Link>
              </h2>
              <div className="mt-[6px]">
                <LinkArrow href={`/services/${svc.slug}`}>Full details →</LinkArrow>
              </div>
              <p className="text-[14px] text-[var(--ink-soft)] max-w-[32ch] leading-[1.7]">{svc.shortDesc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[var(--line)] border border-[var(--line)] content-start">
              {svc.subItems.map((item, i) => (
                <div key={i} className="bg-[var(--paper)] p-[20px_22px]">
                  <h4 className="font-sans text-[15px] font-semibold mb-[6px]">{item.title}</h4>
                  <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="py-[110px] text-center">
        <ScrollReveal className="wrap">
          <Eyebrow accent className="justify-center">— still not sure —</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,44px)] leading-[1.08] tracking-[-0.01em] max-w-[680px] mx-auto mb-[30px]">
            Most projects touch more than one category. That's normal — let's talk it through.
          </h2>
          <Btn href="/consultation" variant="filled">Start a consultation</Btn>
        </ScrollReveal>
      </section>
    </>
  );
}
