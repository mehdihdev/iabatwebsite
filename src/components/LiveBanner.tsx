"use client";
import { useEffect, useState } from "react";
import type { LiveStatus } from "@/lib/youtube";

const POLL_MS = 2 * 60 * 1000;

// Shows a banner above the date bar while the IABAT YouTube channel is streaming.
export default function LiveBanner() {
  const [status, setStatus] = useState<LiveStatus>({ live: false });

  useEffect(() => {
    let cancelled = false;
    const check = () => {
      if (document.visibilityState === "hidden") return;
      fetch("/api/live")
        .then((r) => (r.ok ? r.json() : { live: false }))
        .then((s: LiveStatus) => !cancelled && setStatus(s))
        .catch(() => {});
    };
    check();
    const timer = setInterval(check, POLL_MS);
    document.addEventListener("visibilitychange", check);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
    };
  }, []);

  const live = status.live ? status : null;

  return (
    // Slides open by animating the row height from 0fr to 1fr
    <div
      inert={!live}
      aria-hidden={!live}
      className={`grid bg-gold text-forest transition-[grid-template-rows] duration-500 ease-out ${
        live ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div className="wrap flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 py-2.5 text-center text-sm font-semibold">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c62828] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c62828]" />
            </span>
            We&apos;re live right now! Come watch our current program
          </span>
          {live && (
            <a
              href={live.url}
              target="_blank"
              rel="noopener"
              title={live.title}
              className="rounded-full bg-forest px-3.5 py-1 text-[13px] font-semibold text-white transition-colors hover:bg-brand hover:text-white"
            >
              Watch live →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
