"use client";
import { usePrayerTimes } from "@/lib/prayer-times";

export default function TopBar() {
  const { hijriDate, gregorianDate, next, location, isDefaultLocation } = usePrayerTimes();
  // Name the place when it isn't the masjid, e.g. "Next in Cary:".
  const nextLabel = isDefaultLocation ? "Next" : `Next in ${location.label.split(",")[0]}`;

  return (
    <div className="bg-forest text-[13px] text-[#e9e4d8]">
      <div className="wrap flex min-h-[35px] flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-2">
        <span>
          {hijriDate ?? "…"} ·{" "}
          {gregorianDate ? (
            <>
              <span className="hidden sm:inline">{gregorianDate.long}</span>
              <span className="sm:hidden">{gregorianDate.short}</span>
            </>
          ) : (
            "…"
          )}
        </span>
        <span>{next ? `${nextLabel}: ${next.name} ${next.time} · in ${next.countdown}` : `${nextLabel}: …`}</span>
      </div>
    </div>
  );
}
