"use client";
import { usePrayerTimes } from "@/lib/prayer-times";
import { ORG_NAME } from "@/lib/site";
import LocationPicker from "@/components/LocationPicker";

export default function PrayerTimesHero() {
  const { prayers, next, status, retry, location } = usePrayerTimes();

  return (
    <section id="prayer-times" className="bg-hatch scroll-mt-20 border-b border-line">
      <div className="wrap pt-[clamp(36px,6vw,56px)] pb-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div>
            <p className="eyebrow">{ORG_NAME}</p>
            <h1 className="m-0 font-serif text-[clamp(38px,6vw,52px)] leading-[1.05] font-semibold">
              <span lang="ar" dir="rtl" className="inline-block font-quran text-[1.05em] leading-[1.35] font-normal">
                السَّلَامُ عَلَيْكُمْ
              </span>
              <br />
              Welcome to IABAT
            </h1>
          </div>
          <div>
            <p className="mb-1 text-[13px] tracking-[0.1em] text-muted uppercase">Next prayer</p>
            <p className="m-0 font-serif text-[34px] leading-[1.1] font-semibold text-brand">
              {next ? `${next.name} · ${next.time}` : "…"}
            </p>
            <p className="mt-1 text-[15px] text-muted">{next ? `in ${next.countdown}` : " "}</p>
          </div>
        </div>

        <div data-stagger className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
          {prayers.map((p) => (
            <div
              key={p.name}
              className={`rounded-[10px] border px-1.5 transition-colors duration-500 py-4 text-center sm:px-3 sm:py-[18px] ${
                p.isNext ? "border-brand bg-brand" : "border-line bg-white"
              }`}
            >
              <p
                className={`mb-1.5 text-[13px] font-semibold tracking-[0.08em] uppercase ${
                  p.isNext ? "text-brand-tint" : "text-muted"
                }`}
              >
                {p.name}
              </p>
              <p
                className={`m-0 text-[17px] font-semibold whitespace-nowrap sm:text-xl ${
                  p.isNext ? "text-white" : "text-ink"
                }`}
              >
                {p.time}
              </p>
            </div>
          ))}
        </div>

        {status === "error" ? (
          <p className="mt-3.5 text-[13px] text-muted">
            Prayer times couldn&apos;t be loaded right now.{" "}
            <button type="button" onClick={retry} className="text-link cursor-pointer">
              Try again
            </button>
          </p>
        ) : (
          <p className="mt-3.5 text-[13px] text-muted">
            Times calculated for {location.label} using the Jafari — Ithna Ashari method. <LocationPicker />
          </p>
        )}
      </div>
    </section>
  );
}
