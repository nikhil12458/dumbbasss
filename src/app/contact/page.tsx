import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Btn from "@/components/ui/Btn";

export default function Contact() {
  return (
    <>
      <section className="wrap py-[110px] pb-[90px] text-center">
        <ScrollReveal>
          <Eyebrow accent className="justify-center">— contact —</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(42px,8vw,96px)] leading-[1.05] max-w-[900px] mx-auto tracking-[-0.01em]">
            Say the word.
          </h1>
          <p className="section-lede mx-auto mt-[26px]">
            Two ways in — message us directly if you know what you need, or answer a few quick questions if you'd rather think out loud with us first.
          </p>
        </ScrollReveal>
      </section>

      <section className="wrap grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--line)] border border-[var(--line)] mb-[80px]">
        <ScrollReveal className="bg-[var(--paper)] p-[52px_44px] flex flex-col gap-[18px]">
          <Eyebrow className="mb-[6px]">— direct —</Eyebrow>
          <h2 className="font-display text-[24px] font-bold tracking-[-0.01em]">Already know what you need?</h2>
          <p className="text-[14.5px] text-[var(--ink-soft)] leading-[1.7] max-w-[36ch]">
            Send a note. A real person reads every message, usually within a day.
          </p>
          <Btn href="mailto:hello@dumbbasss.studio" variant="filled" className="self-start mt-[8px]">Email hello@dumbbasss.studio</Btn>
        </ScrollReveal>
        
        <ScrollReveal className="bg-[var(--paper)] p-[52px_44px] flex flex-col gap-[18px]">
          <Eyebrow className="mb-[6px]">— guided —</Eyebrow>
          <h2 className="font-display text-[24px] font-bold tracking-[-0.01em]">Thinking out loud?</h2>
          <p className="text-[14.5px] text-[var(--ink-soft)] leading-[1.7] max-w-[36ch]">
            Five short questions, no pressure — we'll point you in the right direction either way.
          </p>
          <Btn href="/consultation" className="self-start mt-[8px]">Start a consultation</Btn>
        </ScrollReveal>
      </section>

      <section className="flex justify-center gap-[60px] flex-wrap pb-[120px] text-center">
        <ScrollReveal className="contents">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-[10px]">Email</div>
            <a href="mailto:hello@dumbbasss.studio" className="font-display text-[19px] font-medium border-b border-[var(--line-strong)] pb-[4px] hover:border-[var(--ink)] transition-colors">
              hello@dumbbasss.studio
            </a>
          </div>
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-[10px]">Instagram</div>
            <a href="#" className="font-display text-[19px] font-medium border-b border-[var(--line-strong)] pb-[4px] hover:border-[var(--ink)] transition-colors">
              @dumbbasss.studio
            </a>
          </div>
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-faint)] mb-[10px]">Response time</div>
            <span className="font-display text-[19px] font-medium pb-[4px]">
              Usually within 24 hours
            </span>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
