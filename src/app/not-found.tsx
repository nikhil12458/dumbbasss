import dynamic from "next/dynamic";
import Btn from "@/components/ui/Btn";
import LinkArrow from "@/components/ui/LinkArrow";

const KineticWord = dynamic(() => import("@/components/animations/KineticWord"));

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-[20px] py-[80px]">
      <p className="font-mono text-[11.5px] tracking-[0.16em] uppercase text-[var(--ink-faint)] mb-[12px]">
        error 404 — an unserious problem, honestly
      </p>

      <div className="w-full max-w-[600px] h-[160px] md:h-[200px]">
        <KineticWord word="nowhere" spacing={7} />
      </div>

      <p className="mt-[26px] font-sans font-light text-[16px] leading-[1.6] text-[var(--ink-soft)] max-w-[420px]">
        that page doesn't exist. we checked twice, mostly because
        checking twice is kind of the whole pitch.
      </p>

      <div className="mt-[30px] flex gap-[26px] items-center flex-wrap justify-center">
        <Btn href="/" variant="filled">back to something real →</Btn>
        <LinkArrow href="/projects">see the stuff →</LinkArrow>
      </div>
    </section>
  );
}
