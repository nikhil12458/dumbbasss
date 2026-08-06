import Link from "next/link";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Btn from "@/components/ui/Btn";
import LinkArrow from "@/components/ui/LinkArrow";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import { Fraunces } from "next/font/google";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const KineticWord = dynamic(
  () => import("@/components/animations/KineticWord"),
);

export default function Home() {
  return (
    <div className={`${fraunces.variable} contents`}>
      {/* Hero */}
      <section className="pt-[64px] pb-[40px] relative overflow-hidden">
        <div className="wrap grid grid-cols-1 md:grid-cols-[0.62fr_1.38fr] gap-0 items-stretch min-h-[640px]">
          <div
            className="hidden md:flex relative items-end pb-[36px]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 420 560"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[380px] opacity-90"
            >
              {/* kasagi — top beam, wider and more torii-like */}
              <path
                d="M46 110
       L74 78
       L346 78
       L374 110
       L374 132
       L346 100
       L74 100
       L46 132
       Z"
                fill="var(--torii-red, #B24A2A)"
              />

              {/* shimaki — secondary beam beneath the kasagi */}
              <rect
                x="78"
                y="142"
                width="264"
                height="14"
                fill="var(--torii-dark, #2A221B)"
                opacity="0.95"
              />

              {/* gakuzuka — center post */}
              <rect
                x="202"
                y="156"
                width="16"
                height="34"
                fill="var(--torii-dark, #2A221B)"
              />

              {/* nuki — lower crossbeam */}
              <rect
                x="90"
                y="194"
                width="240"
                height="18"
                fill="var(--torii-dark, #2A221B)"
              />

              {/* hashira — pillars */}
              <rect
                x="104"
                y="212"
                width="18"
                height="264"
                fill="var(--torii-dark, #2A221B)"
              />
              <rect
                x="298"
                y="212"
                width="18"
                height="264"
                fill="var(--torii-dark, #2A221B)"
              />

              {/* accent caps at the base of pillars */}
              <rect
                x="98"
                y="466"
                width="30"
                height="16"
                fill="var(--torii-red, #B24A2A)"
              />
              <rect
                x="292"
                y="466"
                width="30"
                height="16"
                fill="var(--torii-red, #B24A2A)"
              />

              {/* stone footings */}
              <rect
                x="84"
                y="486"
                width="42"
                height="12"
                fill="var(--ink, #1C1712)"
                opacity="0.9"
              />
              <rect
                x="294"
                y="486"
                width="42"
                height="12"
                fill="var(--ink, #1C1712)"
                opacity="0.9"
              />

              {/* ground line */}
              <rect
                x="58"
                y="506"
                width="304"
                height="8"
                fill="var(--ink, #1C1712)"
                opacity="0.95"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center text-center px-[20px]">
            <p className="font-mono text-[11.5px] tracking-[0.16em] uppercase text-[var(--ink-faint)] mb-[2px]">
              an unserious name, a very serious studio
            </p>

            <ScrollReveal className="w-full max-w-[760px] h-[230px] md:h-[280px]">
              <KineticWord word="dumbbasss" spacing={8} />
            </ScrollReveal>

            <p className="mt-[22px] font-sans font-light text-[17px] leading-[1.6] text-[var(--ink-soft)] max-w-[380px]">
              we make websites.
              <br />
              <strong className="text-[var(--ink)] font-medium">
                sometimes unnecessarily good ones.
              </strong>
            </p>
            <div className="mt-[30px] flex gap-[26px] items-center flex-wrap justify-center">
              <Btn href="/consultation" variant="filled">
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
      <section className="pt-[60px] pb-[110px]">
        <ScrollReveal variant="up-strong" className="wrap">
          <Eyebrow accent>— what we do —</Eyebrow>
          <SectionTitle>Five ways in.</SectionTitle>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 mt-[56px] border-t border-[var(--line)]">
            {services.slice(0, 5).map((service, i) => (
              <Link
                key={i}
                href={`/services/${service.slug}`}
                className={`p-[30px_22px] border-b border-[var(--line)] transition-colors duration-300 ease-[var(--ease)] hover:bg-[var(--paper-deep)] ${i < 4 ? "md:border-r" : ""}`}
              >
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
      <section className="section-dark py-[110px]">
        <ScrollReveal variant="up-strong" className="wrap">
          <Eyebrow accent>— the deal —</Eyebrow>
          <p className="serif-italic text-[clamp(26px,3.6vw,44px)] leading-[1.5] max-w-[900px]">
            The name gets to be ridiculous.{" "}
            <span className="text-[var(--accent)]">The build does not.</span>
          </p>
          <div className="flex gap-[50px] mt-[64px] flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <div className="font-display font-bold text-[24px] md:text-[28px] leading-[1.2] mb-[12px]">
                No templates
              </div>
              <p className="text-[15px] opacity-80 leading-[1.6]">
                Because your competitors already bought them.
              </p>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-display font-bold text-[24px] md:text-[28px] leading-[1.2] mb-[12px]">
                No unnecessary meetings
              </div>
              <p className="text-[15px] opacity-80 leading-[1.6]">
                We'd rather build than schedule another call.
              </p>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-display font-bold text-[24px] md:text-[28px] leading-[1.2] mb-[12px]">
                No buzzwords
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
                className={`group relative border border-[var(--line-strong)] min-h-[340px] p-[28px] flex flex-col justify-end overflow-hidden ${i === 1 ? "text-[var(--ink)]" : ""}`}
              >
                {project.images && project.images.length > 0 && (
                  <div
                    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-500 ease-[var(--ease)] group-hover:opacity-100"
                    style={{ backgroundImage: `url(${project.images[0]})` }}
                  >
                    <div className="absolute inset-0 bg-[var(--paper)]/80 backdrop-blur-[2px]"></div>
                  </div>
                )}
                <div
                  className={`absolute inset-0 -z-10 transition-all duration-500 ease-[var(--ease)] group-hover:scale-105 ${project.images && project.images.length > 0 ? "group-hover:opacity-0" : ""} ${i === 0 ? "bg-gradient-to-br from-[var(--paper-deep)] to-[var(--paper)]" : "bg-gradient-to-br from-[#d9cba7] to-[#e5dabf]"}`}
                ></div>
                <div className="relative z-10">
                  <span
                    className={`font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-500 text-[var(--ink-soft)] ${project.images && project.images.length > 0 ? "group-hover:text-[var(--ink)]" : ""}`}
                  >
                    {project.meta.category}
                  </span>
                  <h3
                    className={`text-[26px] mt-[12px] mb-[8px] transition-colors duration-500 ${project.images && project.images.length > 0 ? "group-hover:text-[var(--accent)]" : ""}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-[13.5px] max-w-[34ch] transition-colors duration-500 text-[var(--ink-soft)] ${project.images && project.images.length > 0 ? "group-hover:text-[var(--ink)] font-medium" : ""}`}
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
    </div>
  );
}
