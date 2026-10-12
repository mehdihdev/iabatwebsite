import { BUILDING_BUDGET } from "@/lib/site";

const FIGURES = [
  { label: "Total project budget", value: BUILDING_BUDGET.total, note: "Split into Phase I and Phase II" },
  { label: "Phase I budget", value: BUILDING_BUDGET.phaseOne, note: "Current phase requiring funding" },
  { label: "Land purchase", value: BUILDING_BUDGET.land, note: "3.2 acres in Durham — fully paid" },
];

// Real figures from the building project page, shown on the dark forest background.
export default function BudgetFigures({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-5">
      {FIGURES.map((f) => (
        <div key={f.label}>
          <dt className="mb-1 text-[13px] font-semibold tracking-[0.1em] text-gold uppercase">{f.label}</dt>
          <dd className={`m-0 font-serif leading-none font-semibold text-white ${size === "lg" ? "text-[44px]" : "text-[34px]"}`}>
            {f.value}
          </dd>
          <dd className="m-0 mt-1.5 text-sm text-sand">{f.note}</dd>
        </div>
      ))}
    </dl>
  );
}
