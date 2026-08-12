import Link from "next/link";
import dynamic from "next/dynamic";
import ToriiGate from "@/components/animations/ToriiGate";
import Parallax from "@/components/animations/Parallax";
import HeroLandscape from "@/components/HeroLandscape";
import DealLandscape from "@/components/DealLandscape";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Btn from "@/components/ui/Btn";
import LinkArrow from "@/components/ui/LinkArrow";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import { fraunces } from "@/app/font";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import AnimatedNumber from "@/components/animations/AnimatedNumber";
import Magnetic from "@/components/animations/Magnetic";
import { getServiceIcon } from "@/components/icons/ServiceIcons";

const KineticWord = dynamic(
  () => import("@/components/animations/KineticWord"),
);

export default function Home() {
  return (
    <div className={`${fraunces.variable} contents`}>
      {/* Hero */}
      <section className="pt-[24px] sm:pt-[64px] pb-[40px] relative overflow-hidden bg-paper">
        <div className="texture-layer" aria-hidden="true" />
        <HeroLandscape />
        <div className="relative z-10 wrap grid grid-cols-1 md:grid-cols-[0.62fr_1.38fr] gap-0 items-stretch min-h-[460px] md:min-h-[640px]">
          <div className="hidden md:block relative" aria-hidden="true">
            <Parallax
              offset={100}
              startScroll="start start"
              endScroll="end start"
              className="absolute inset-x-0 bottom-8 md:bottom-12 flex justify-center md:-translate-x-32"
            >
              <ToriiGate />
            </Parallax>
          </div>
          <div className="flex flex-col justify-center items-center text-center px-[20px]">
            <p className="font-mono text-[11.5px] tracking-[0.16em] uppercase text-[var(--ink-faint)] mb-[2px]">
              an unserious name, a very serious studio
            </p>

            <ScrollReveal className="w-full max-w-[760px] h-[190px] sm:h-[230px] md:h-[280px]">
              <div
                data-cursor="drag"
                data-cursor-label="Drag"
                className="h-full w-full cursor-none"
              >
                <KineticWord word="dumbbasss" spacing={8} />
              </div>
            </ScrollReveal>

            <p className="mt-[22px] font-sans font-light text-[17px] leading-[1.6] text-[var(--ink-soft)] max-w-[380px]">
              we make websites.
              <br />
              <strong className="text-[var(--ink)] font-medium">
                sometimes unnecessarily good ones.
              </strong>
            </p>
            <div className="mt-[30px] flex gap-[26px] items-center flex-wrap justify-center">
              <Magnetic>
                <Btn href="/consultation" variant="filled" data-cursor="button">
                  start something →
                </Btn>
              </Magnetic>
              <LinkArrow href="/projects" data-cursor="link">
                see the stuff →
              </LinkArrow>
            </div>
          </div>
        </div>
        <p className="absolute left-[var(--gutter)] right-[140px] sm:right-auto bottom-[70px] sm:bottom-[14px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-[var(--ink-faint)]">
          grab a letter — it doesn't mind
        </p>
      </section>

      {/* Services Preview */}
      <section className="pt-[60px] pb-[110px]">
        <ScrollReveal variant="up-strong" className="wrap">
          <Eyebrow accent>— what we do —</Eyebrow>
          <SectionTitle>Five ways in.</SectionTitle>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 mt-[56px] border-t border-[var(--line)]">
            {services.slice(0, 5).map((service, i) => (
              <Link
                key={i}
                href={`/services/${service.slug}`}
                data-cursor="view"
                data-cursor-label="EXPLORE"
                className={`group p-[30px_22px] border-b border-[var(--line)] transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)] ${i < 4 ? "md:border-r" : ""}`}
              >
                <div className="text-[var(--ink-faint)] transition-colors duration-300 group-hover:text-[var(--accent)] mb-[12px]">
                  {getServiceIcon(service.slug)}
                </div>
                <span className="font-mono text-[11px] text-[var(--accent)]">
                  {service.index}
                </span>
                <h3 className="text-[16px] mt-[16px] mb-[8px] font-semibold font-sans">
                  {service.title}
                </h3>
                <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                  {service.shortDesc}
                </p>
              </Link>
            ))}
          </ScrollReveal>
        </ScrollReveal>
      </section>

      {/* Dark Stats Section */}
      <section className="section-dark py-[110px] relative overflow-hidden">
        <DealLandscape />
        <ScrollReveal variant="up-strong" className="relative z-10 wrap">
          <Eyebrow accent>— the deal —</Eyebrow>
          <p className="serif-italic text-[clamp(26px,3.6vw,44px)] leading-[1.5] max-w-[900px]">
            The name gets to be ridiculous.{" "}
            <span className="text-[var(--accent)]">The build does not.</span>
          </p>
          <div className="flex gap-[50px] mt-[64px] flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <div className="font-display font-bold text-[24px] md:text-[28px] leading-[1.2] mb-[12px]">
                <AnimatedNumber value="0" /> templates
              </div>
              <p className="text-[15px] opacity-80 leading-[1.6]">
                Because your competitors already bought them.
              </p>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-display font-bold text-[24px] md:text-[28px] leading-[1.2] mb-[12px]">
                <AnimatedNumber value="0" /> unnecessary meetings
              </div>
              <p className="text-[15px] opacity-80 leading-[1.6]">
                We'd rather build than schedule another call.
              </p>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-display font-bold text-[24px] md:text-[28px] leading-[1.2] mb-[12px]">
                <AnimatedNumber value="0" /> buzzwords
              </div>
              <p className="text-[15px] opacity-80 leading-[1.6]">
                If AI, automation, or custom software won't help, we'll tell
                you.
              </p>
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
            {projects.slice(0, 2).map((project, i) => (
              <Link
                key={i}
                href={`/projects/${project.slug}`}
                data-cursor="view"
                data-cursor-label="View case"
                className={`group relative z-10 border border-[var(--line-strong)] min-h-[340px] p-[28px] flex flex-col justify-end overflow-hidden ${i === 1 ? "text-[var(--ink)]" : ""}`}
              >
                {/* Solid base background to block AmbientGrid from bleeding through */}
                <div className="absolute inset-0 -z-30 bg-[var(--paper)]"></div>
                {project.images && project.images.length > 0 && (
                  <div
                    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-0 scale-105 transition-all duration-700 ease-[var(--ease)] group-hover:scale-100 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${project.images[0]})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                )}
                <div
                  className={`absolute inset-0 -z-10 transition-all duration-500 ease-[var(--ease)] ${project.images && project.images.length > 0 ? "group-hover:opacity-0" : ""} ${i === 0 ? "bg-gradient-to-br from-[var(--paper-deep)] to-[var(--paper)]" : "bg-gradient-to-br from-[#d9cba7] to-[#e5dabf]"}`}
                ></div>
                <div className="relative z-10">
                  <span
                    className={`font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-500 text-[var(--ink-soft)] ${project.images && project.images.length > 0 ? "group-hover:text-[var(--paper)]/70" : ""}`}
                  >
                    {project.meta.category}
                  </span>
                  <h3
                    className={`text-[26px] mt-[12px] mb-[8px] transition-colors duration-500 ${project.images && project.images.length > 0 ? "group-hover:text-[var(--paper)]" : ""}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-[13.5px] max-w-[34ch] transition-colors duration-500 text-[var(--ink-soft)] ${project.images && project.images.length > 0 ? "group-hover:text-[var(--paper)]/90 font-medium" : ""}`}
                  >
                    {project.context}
                  </p>
                  <span
                    className={`link-arrow mt-[18px] self-start inline-block transition-colors duration-500 ${project.images && project.images.length > 0 ? "group-hover:text-[var(--accent)]" : ""}`}
                  >
                    View case →
                  </span>
                </div>
              </Link>
            ))}
          </ScrollReveal>
          <div className="mt-[40px]">
            <LinkArrow href="/projects" data-cursor="link">
              See the full archive →
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <Faq />

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
            <Magnetic>
              <Btn href="/consultation" variant="filled" data-cursor="button">
                Start a consultation
              </Btn>
            </Magnetic>
            <Magnetic>
              <Btn href="/contact" data-cursor="button">
                Just say hello
              </Btn>
            </Magnetic>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
