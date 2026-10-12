import { PROGRAMS } from "@/lib/site";

export default function ProgramCards({ tone = "white" }: { tone?: "white" | "cream" }) {
  return (
    <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
      {PROGRAMS.map((p) => (
        <div
          key={p.title}
          className={`lift flex flex-col gap-2 rounded-xl border border-line p-5 sm:p-6 ${tone === "white" ? "bg-white" : "bg-cream"}`}
        >
          <p className="m-0 text-[13px] font-semibold tracking-[0.1em] text-brand uppercase">{p.when}</p>
          <h3 className="m-0 font-serif text-2xl font-semibold">{p.title}</h3>
          <p className="m-0 text-[15px] leading-[1.55] text-muted">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
