import Link from "next/link";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Btn from "@/components/ui/Btn";
import LinkArrow from "@/components/ui/LinkArrow";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";

const KineticWord = dynamic(() => import("@/components/animations/KineticWord"));

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[64px] pb-[40px] relative overflow-hidden">
        <div className="wrap grid grid-cols-1 md:grid-cols-[0.62fr_1.38fr] gap-0 items-stretch min-h-[640px]">
          <div
            className="hidden md:flex relative items-end pb-[36px]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 320 560"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[280px] opacity-90"
            >
              <rect x="46" y="330" width="4" height="150" fill="#18140F" />
              <rect x="150" y="300" width="4" height="180" fill="#18140F" />
              <rect x="256" y="330" width="4" height="150" fill="#18140F" />
              <rect
                x="70"
                y="360"
                width="150"
                height="80"
                fill="#18140F"
                opacity=".07"
              />
              <path
                d="M20,300 C90,280 230,280 300,300 L300,316 C230,298 90,298 20,316 Z"
                fill="#18140F"
              />
              <rect x="10" y="480" width="300" height="6" fill="#18140F" />
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center text-center px-[20px]">
            <p className="font-mono text-[11.5px] tracking-[0.16em] uppercase text-[var(--ink-faint)] mb-[2px]">
              an unserious name, a very serious studio
            </p>

            <ScrollReveal className="w-full max-w-[760px] h-[230px] md:h-[280px]">
              <KineticWord />
            </ScrollReveal>

            <p className="mt-[22px] font-sans font-light text-[17px] leading-[1.6] text-[var(--ink-soft)] max-w-[380px]">
              we make websites.
              <br />
              <strong className="text-[var(--ink)] font-medium">
                sometimes unnecessarily good ones.
              </strong>
            </p>
            <div className="mt-[30px] flex gap-[26px] items-center flex-wrap justify-center">
              <Btn
                href="/consultation"
                variant="filled"
              >
                start something →
              </Btn>
              <LinkArrow href="/projects">see the stuff →</LinkArrow>
            </div>
          </div>
        </div>
        <p className="absolute left-[var(--gutter)] bottom-[14px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-[var(--ink-faint)]">
          grab a letter — it doesn't mind
        </p>
      </section>

      {/* Services Preview */}
      <section className="py-[110px]">
        <ScrollReveal variant="up-strong" className="wrap">
          <Eyebrow accent>— what we do —</Eyebrow>
          <SectionTitle>Five ways in.</SectionTitle>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 mt-[56px] border-t border-[var(--line)]">
            <Link
              href="/services/websites"
              className="p-[30px_22px] border-b border-[var(--line)] sm:border-r transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)] md:border-r"
            >
              <span className="font-mono text-[11px] text-[var(--accent)]">
                01
              </span>
              <h3 className="text-[16px] my-[16px_8px] font-semibold font-sans">
                Websites
              </h3>
              <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                Designed and built, not templated.
              </p>
            </Link>

            <Link
              href="/services/software"
              className="p-[30px_22px] border-b border-[var(--line)] transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)] md:border-r"
            >
              <span className="font-mono text-[11px] text-[var(--accent)]">
                02
              </span>
              <h3 className="text-[16px] my-[16px_8px] font-semibold font-sans">
                Software systems
              </h3>
              <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                Tools your team actually opens.
              </p>
            </Link>

            <Link
              href="/services/ai"
              className="p-[30px_22px] border-b border-[var(--line)] sm:border-r transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)] md:border-r"
            >
              <span className="font-mono text-[11px] text-[var(--accent)]">
                03
              </span>
              <h3 className="text-[16px] my-[16px_8px] font-semibold font-sans">
                AI & automation
              </h3>
              <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                Practical, not performative.
              </p>
            </Link>

            <Link
              href="/services/restaurant"
              className="p-[30px_22px] border-b border-[var(--line)] transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)] md:border-r"
            >
              <span className="font-mono text-[11px] text-[var(--accent)]">
                04
              </span>
              <h3 className="text-[16px] my-[16px_8px] font-semibold font-sans">
                Restaurant systems
              </h3>
              <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                Menus, QR ordering, bookings.
              </p>
            </Link>

            <Link
              href="/services/growth"
              className="p-[30px_22px] border-b border-[var(--line)] transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)]"
            >
              <span className="font-mono text-[11px] text-[var(--accent)]">
                05
              </span>
              <h3 className="text-[16px] my-[16px_8px] font-semibold font-sans">
                Growth & SEO
              </h3>
              <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                Findable, not just pretty.
              </p>
            </Link>
          </ScrollReveal>
        </ScrollReveal>
      </section>

      {/* Dark Stats Section */}
      <section className="section-dark py-[110px]">
        <ScrollReveal variant="up-strong" className="wrap">
          <Eyebrow accent>— the deal —</Eyebrow>
          <p className="serif-italic text-[clamp(26px,3.6vw,44px)] leading-[1.5] max-w-[900px]">
            The name gets to be ridiculous.{" "}
            <span className="text-[var(--accent)]">The build does not.</span>
          </p>
          <div className="flex gap-[60px] mt-[56px] flex-wrap">
            <div>
              <div className="poster-title text-[40px]">40+</div>
              <span className="eyebrow mt-[10px]">screens shipped</span>
            </div>
            <div>
              <div className="poster-title text-[40px]">100%</div>
              <span className="eyebrow mt-[10px]">self-taught, built solo</span>
            </div>
            <div>
              <div className="poster-title text-[40px]">0</div>
              <span className="eyebrow mt-[10px]">ten-slide decks</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Projects Preview */}
      <section className="pt-0 pb-[120px] mt-[110px]">
        <div className="wrap">
          <Eyebrow>— selected work —</Eyebrow>
          <SectionTitle>A few recent ones.</SectionTitle>
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[26px] mt-[56px]">
            <Link
              href="/projects/guardiantrack"
              className="group relative border border-[var(--line-strong)] min-h-[340px] p-[28px] flex flex-col justify-end overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--paper-deep)] to-[var(--paper)] -z-10 transition-transform duration-500 ease-[var(--ease)] group-hover:scale-105"></div>
              <span className="relative font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-soft)]">
                Android · Full-stack
              </span>
              <h3 className="relative text-[26px] my-[12px_8px]">
                GuardianTrack
              </h3>
              <p className="relative text-[13.5px] text-[var(--ink-soft)] max-w-[34ch]">
                A three-tier anti-theft tracking system, built end to end.
              </p>
              <span className="link-arrow mt-[18px] self-start">
                View case →
              </span>
            </Link>

            <Link
              href="/projects/vastraa"
              className="group relative border border-[var(--line-strong)] min-h-[340px] p-[28px] flex flex-col justify-end overflow-hidden text-[var(--ink)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d9cba7] to-[#e5dabf] -z-10 transition-transform duration-500 ease-[var(--ease)] group-hover:scale-105"></div>
              <span className="relative font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-soft)]">
                Ecommerce · AI
              </span>
              <h3 className="relative text-[26px] my-[12px_8px]">Vastraa</h3>
              <p className="relative text-[13.5px] text-[var(--ink-soft)] max-w-[34ch]">
                A fashion marketplace with AI virtual try-on.
              </p>
              <span className="link-arrow mt-[18px] self-start">
                View case →
              </span>
            </Link>
          </ScrollReveal>
          <div className="mt-[40px]">
            <LinkArrow href="/projects">See the full archive →</LinkArrow>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-[120px] text-center border-t border-[var(--line)]">
        <ScrollReveal className="wrap">
          <Eyebrow accent className="justify-center">
            — start here —
          </Eyebrow>
          <h2 className="font-display font-bold text-[clamp(32px,5vw,58px)] leading-[1.1] max-w-[820px] mx-auto mb-[34px]">
            Tell us what you're building.
            <br />
            We'll tell you what it needs.
          </h2>
          <div className="flex gap-[20px] justify-center flex-wrap">
            <Btn href="/consultation" variant="filled">
              Start a consultation
            </Btn>
            <Btn href="/contact">Just say hello</Btn>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
