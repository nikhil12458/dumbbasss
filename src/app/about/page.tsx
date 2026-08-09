import ScrollReveal from "@/components/animations/ScrollReveal";
import KineticWord from "@/components/animations/KineticWord";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import { Check, X } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Learn more about dumbbasss, a very serious studio, unseriously named.",
  openGraph: {
    title: "About | dumbbasss",
    description:
      "Learn more about dumbbasss, a very serious studio, unseriously named.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | dumbbasss",
    description:
      "Learn more about dumbbasss, a very serious studio, unseriously named.",
  },
};

export default function About() {
  return (
    <>
      <section className="wrap py-[80px] pb-[40px] max-w-[920px] mx-auto">
        <ScrollReveal>
          <Eyebrow accent>— about —</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(36px,6vw,64px)] leading-[1.12] tracking-[-0.01em]">
            The name is a joke.
            <br />
            The work is{" "}
            <em className="not-italic text-[var(--accent)]">not.</em>
          </h1>
        </ScrollReveal>
      </section>

      <div
        data-cursor="drag"
        data-cursor-label="Drag"
        className="my-[50px] mb-[90px] cursor-none"
      >
        <ScrollReveal className="w-full max-w-[640px] h-[150px] mx-auto">
          <KineticWord
            word="dumbbasss"
            widthFraction={0.9}
            windAmp={0.012}
            gravity={0.03}
            mouseStrength={1.1}
            spacing={4}
          />
        </ScrollReveal>
      </div>

      <section className="wrap py-[80px] border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-[0.42fr_1fr] gap-[20px] md:gap-[60px]">
        <ScrollReveal className="contents">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--ink-faint)] md:sticky md:top-[100px] self-start">
            Why the name
          </div>
          <div>
            <p className="font-serif italic text-[26px] md:text-[32px] leading-[1.4] text-[var(--ink)]">
              The name gets to be ridiculous.{" "}
              <span className="text-[var(--accent)]">The build does not.</span>
            </p>
            <p className="mt-[20px] text-[15px] leading-[1.75] text-[var(--ink-soft)] max-w-[54ch] font-light">
              Say <strong className="font-semibold">dumbbasss</strong> out loud in a client meeting and the room relaxes —
              nobody's performing seriousness at each other anymore. It filters
              out anyone who'd judge a studio by its logo, and it raises the bar
              on everything underneath it.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="wrap pb-[80px]">
        <ScrollReveal>
          <div className="w-full aspect-[16/9] md:aspect-[2.5/1] bg-[var(--surface-sunken)] rounded-xl overflow-hidden relative border border-[var(--line)]">
            <img src="/founder.png" alt="Founder" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
          </div>
        </ScrollReveal>
      </section>

      <section className="wrap py-[80px] border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-[0.42fr_1fr] gap-[20px] md:gap-[60px]">
        <ScrollReveal className="contents">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--ink-faint)] md:sticky md:top-[100px] self-start">
            Who this is for
          </div>
          <div>
            <p className="font-serif italic text-[26px] md:text-[32px] leading-[1.4] text-[var(--ink)]">
              Someone who explains a technical decision the way they'd explain it to a friend,{" "}
              <span className="text-[var(--accent)]">and then actually ships it.</span>
            </p>
            <p className="mt-[20px] text-[15px] leading-[1.75] text-[var(--ink-soft)] max-w-[54ch] font-light">
              Mostly people who are building something real and are tired of
              agencies that take six weeks to say what could've been said in a
              five-minute call. Founders, restaurant owners, small teams —
              people who'd rather see a working staging link than sit through
              another slide about "synergy."
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="wrap py-[80px] border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-2 gap-[60px]">
        <ScrollReveal>
          <Eyebrow>— good fit —</Eyebrow>
          <ul className="list-none m-0 mt-[20px] p-0 flex flex-col gap-0">
            <li className="py-[16px] border-b border-[var(--line)] text-[15px] text-[var(--ink-soft)] flex gap-[14px]">
              <span className="text-[var(--accent)] shrink-0 pt-[3px]">
                <Check size={16} strokeWidth={1.5} />
              </span>
              Founders who want a staging link, not a slide deck.
            </li>
            <li className="py-[16px] border-b border-[var(--line)] text-[15px] text-[var(--ink-soft)] flex gap-[14px]">
              <span className="text-[var(--accent)] shrink-0 pt-[3px]">
                <Check size={16} strokeWidth={1.5} />
              </span>
              Restaurants and small businesses ready to leave spreadsheets
              behind.
            </li>
            <li className="py-[16px] border-b border-[var(--line)] text-[15px] text-[var(--ink-soft)] flex gap-[14px]">
              <span className="text-[var(--accent)] shrink-0 pt-[3px]">
                <Check size={16} strokeWidth={1.5} />
              </span>
              Teams who'd rather over-communicate than get surprised at launch.
            </li>
          </ul>
        </ScrollReveal>
        <ScrollReveal>
          <Eyebrow>— not a great fit —</Eyebrow>
          <ul className="list-none m-0 mt-[20px] p-0 flex flex-col gap-0">
            <li className="py-[16px] border-b border-[var(--line)] text-[15px] text-[var(--ink-soft)] flex gap-[14px]">
              <span className="text-[var(--ink-faint)] shrink-0 pt-[3px]">
                <X size={16} strokeWidth={1.5} />
              </span>
              Anyone who needs twelve stakeholders to approve a button color.
            </li>
            <li className="py-[16px] border-b border-[var(--line)] text-[15px] text-[var(--ink-soft)] flex gap-[14px]">
              <span className="text-[var(--ink-faint)] shrink-0 pt-[3px]">
                <X size={16} strokeWidth={1.5} />
              </span>
              Projects where "AI" needs to appear in the pitch deck more than
              the product.
            </li>
            <li className="py-[16px] border-b border-[var(--line)] text-[15px] text-[var(--ink-soft)] flex gap-[14px]">
              <span className="text-[var(--ink-faint)] shrink-0 pt-[3px]">
                <X size={16} strokeWidth={1.5} />
              </span>
              Work that's really asking for a rebrand of an existing agency
              relationship.
            </li>
          </ul>
        </ScrollReveal>
      </section>

      <section className="wrap py-[80px] pb-[120px] border-t border-[var(--line)]">
        <ScrollReveal>
          <Eyebrow accent>— how we think —</Eyebrow>
          <SectionTitle>
            A studio of one, built like a team of ten.
          </SectionTitle>
          <p className="section-lede mt-[18px]">
            Self-taught, and stubborn about it — every stack here (Node, React,
            Kotlin, FastAPI, the AI pipeline underneath Vastraa) was learned by
            shipping it, not by taking a course about it first.
          </p>
          <div className="mt-[50px] flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr_1fr] gap-[8px] sm:gap-[24px] py-[26px] border-b border-t border-[var(--line)] items-baseline">
              <span className="font-mono text-[12px] text-[var(--ink-faint)]">
                01
              </span>
              <h3 className="text-[17px] font-sans font-semibold">
                Design before code
              </h3>
              <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.7]">
                Nothing gets built until it's been seen and approved as a design
                first.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr_1fr] gap-[8px] sm:gap-[24px] py-[26px] border-b border-[var(--line)] items-baseline">
              <span className="font-mono text-[12px] text-[var(--ink-faint)]">
                02
              </span>
              <h3 className="text-[17px] font-sans font-semibold">
                Staging link, always
              </h3>
              <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.7]">
                You get a working URL from week one — no black-box development.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr_1fr] gap-[8px] sm:gap-[24px] py-[26px] border-b border-[var(--line)] items-baseline">
              <span className="font-mono text-[12px] text-[var(--ink-faint)]">
                03
              </span>
              <h3 className="text-[17px] font-sans font-semibold">
                Plain-language technical calls
              </h3>
              <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.7]">
                Every decision is explained the way it'd be explained to a
                curious friend.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr_1fr] gap-[8px] sm:gap-[24px] py-[26px] border-b border-[var(--line)] items-baseline">
              <span className="font-mono text-[12px] text-[var(--ink-faint)]">
                04
              </span>
              <h3 className="text-[17px] font-sans font-semibold">
                Small scope, shipped properly
              </h3>
              <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.7]">
                Better to ship the real thing narrow than the wrong thing wide.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
