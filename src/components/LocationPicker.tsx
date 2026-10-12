"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePrayerTimes } from "@/lib/prayer-times";
import { DURHAM, TRIANGLE_LOCATIONS } from "@/lib/locations";

const CLOSE_MS = 180;

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

// "Not in Durham?" link + the location picker dialog it opens.
export default function LocationPicker() {
  const { location, setLocation, locateMe, locateStatus } = usePrayerTimes();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The trigger sits inside a <p>, so the dialog is portaled to <body> (after mount).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => clearTimeout(closeTimer.current);
  }, []);

  function open() {
    clearTimeout(closeTimer.current);
    setClosing(false);
    dialogRef.current?.showModal();
  }

  // Play the exit animation, then actually close.
  function close() {
    if (!dialogRef.current?.open) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      dialogRef.current?.close();
      setClosing(false);
    }, CLOSE_MS);
  }

  async function handleLocate() {
    if (await locateMe()) close();
  }

  const locating = locateStatus.state === "locating";

  return (
    <>
      <button type="button" onClick={open} className="text-link cursor-pointer underline-offset-2 hover:underline">
        Not in {location.label.split(",")[0]}?
      </button>

      {mounted &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby="location-picker-title"
            data-closing={closing || undefined}
            onCancel={(e) => {
              e.preventDefault();
              close();
            }}
            onClick={(e) => {
              // Clicks on the backdrop land on the <dialog> element itself.
              if (e.target === e.currentTarget) close();
            }}
            className="location-dialog m-auto w-[min(520px,calc(100vw-2rem))] max-w-none rounded-2xl border border-line bg-cream p-0 text-ink shadow-[0_24px_60px_rgba(18,45,35,0.3)]"
          >
            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 id="location-picker-title" className="m-0 font-serif text-[28px] leading-tight font-semibold">
                    Choose your location
                  </h2>
                  <p className="m-0 mt-1.5 text-[15px] leading-relaxed text-muted">
                    Prayer times use the same Jafari — Ithna Ashari method.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="-mt-1 -mr-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-line hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={handleLocate}
                disabled={locating}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-80"
              >
                {locating ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                ) : (
                  <PinIcon className="h-5 w-5" />
                )}
                {locating ? "Finding your location…" : "Locate me"}
              </button>
              <p className="m-0 mt-2 text-center text-[13px] text-muted" role="status">
                {locateStatus.state === "error" ? (
                  <span className="text-[#a33]">{locateStatus.message}</span>
                ) : location.id === "geo" ? (
                  <>Currently using your location: {location.label}</>
                ) : null}
              </p>

              <div className="my-5 flex items-center gap-3 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">
                <span className="h-px flex-1 bg-line" />
                Or pick a Triangle city
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TRIANGLE_LOCATIONS.map((loc) => {
                  const active = location.id === loc.id;
                  const name = loc.label.replace(", NC", "");
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setLocation(loc);
                        close();
                      }}
                      className={`cursor-pointer rounded-lg border px-3 py-2.5 text-left text-[15px] font-medium transition-colors ${
                        active
                          ? "border-brand bg-brand text-white"
                          : "border-line bg-white text-ink hover:border-brand hover:text-brand"
                      }`}
                    >
                      {name}
                      {loc.id === DURHAM.id && (
                        <span className={`block text-xs font-normal ${active ? "text-brand-tint" : "text-muted"}`}>
                          IABAT Center
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </>
  );
}
