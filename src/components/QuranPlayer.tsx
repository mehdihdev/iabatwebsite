"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AUDIO_BASE, type Reciter, type Surah } from "@/lib/quran-audio";

type Size = { w: number; h: number };

const STORAGE_KEY = "iabat:quran-player";
const DEFAULT_RECITER_ID = 37; // AbdulBaset AbdulSamad [Murattal]

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.05-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function PauseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function SkipIcon({ direction, className = "" }: { direction: "prev" | "next"; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`${className} ${direction === "prev" ? "-scale-x-100" : ""}`}
    >
      <path d="M5 6.27v11.46a1 1 0 0 0 1.54.84L15 13.06V17a1 1 0 0 0 2 0V7a1 1 0 0 0-2 0v3.94L6.54 5.43A1 1 0 0 0 5 6.27Z" />
    </svg>
  );
}

function QuranIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 6.5C10.5 5.3 8.4 4.75 4 4.75v13.5c4.4 0 6.5.55 8 1.75m0-13.5c1.5-1.2 3.6-1.75 8-1.75v13.5c-4.4 0-6.5.55-8 1.75m0-13.5V20" />
    </svg>
  );
}

export default function QuranPlayer({ surahs, reciters }: { surahs: Surah[]; reciters: Reciter[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);
  const [surahId, setSurahId] = useState(1);
  const [reciterId, setReciterId] = useState(
    reciters.some((r) => r.id === DEFAULT_RECITER_ID) ? DEFAULT_RECITER_ID : reciters[0].id
  );
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // Whether a track change should start playing immediately (true after the visitor has pressed play).
  const autoplayRef = useRef(false);

  const surah = surahs.find((s) => s.id === surahId) ?? surahs[0];
  const reciter = reciters.find((r) => r.id === reciterId) ?? reciters[0];
  const src = `${AUDIO_BASE}${reciter.path}${String(surah.id).padStart(3, "0")}.mp3`;

  // Restore the visitor's last surah and reciter.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && surahs.some((s) => s.id === saved.surahId)) setSurahId(saved.surahId);
      if (saved && reciters.some((r) => r.id === saved.reciterId)) setReciterId(saved.reciterId);
    } catch {}
  }, [surahs, reciters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ surahId, reciterId }));
    } catch {}
  }, [surahId, reciterId]);

  // Load the new track whenever the surah or reciter changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setTime(0);
    setDuration(0);
    setError(false);
    if (autoplayRef.current) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [src]);

  // Measure both layers so the shell can animate between their exact sizes; re-measures
  // when content changes (e.g. launcher becomes the "now playing" pill) or the viewport resizes.
  const launcherRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<{ launcher: Size; panel: Size } | null>(null);
  useLayoutEffect(() => {
    const l = launcherRef.current;
    const p = panelRef.current;
    if (!l || !p) return;
    const measure = () =>
      setSizes({
        launcher: { w: l.offsetWidth, h: l.offsetHeight },
        panel: { w: p.offsetWidth, h: p.offsetHeight },
      });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(l);
    ro.observe(p);
    return () => ro.disconnect();
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      autoplayRef.current = true;
      setError(false);
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }

  function step(delta: number) {
    setSurahId((id) => Math.min(114, Math.max(1, id + delta)));
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration)) audio.currentTime = value;
  }

  const audio = (
    <audio
      ref={audioRef}
      src={src}
      preload="none"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onWaiting={() => setLoading(true)}
      onPlaying={() => setLoading(false)}
      onCanPlay={() => setLoading(false)}
      onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      onEnded={() => (surah.id < 114 ? step(1) : setPlaying(false))}
      onError={() => {
        setLoading(false);
        setPlaying(false);
        if (audioRef.current?.currentSrc) setError(true);
      }}
    />
  );

  // Launcher contents (the gold button, or a "now playing" pill once audio has started).
  const launcher = (
      <div
        ref={launcherRef}
        inert={open}
        className={`absolute right-0 bottom-0 w-max text-forest transition-opacity ${
          open ? "pointer-events-none opacity-0 duration-150" : "opacity-100 delay-150 duration-300"
        }`}
      >
        {playing || time > 0 ? (
          <div className="flex items-center gap-1 py-1.5 pr-1.5 pl-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="max-w-[44vw] cursor-pointer truncate text-left text-sm font-semibold sm:max-w-[200px]"
              aria-label="Open Quran player"
            >
              {surah.name}
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="ml-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-forest text-gold transition-transform hover:scale-105"
            >
              {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Listen to the Quran"
            className="flex h-14 cursor-pointer items-center gap-2 px-5 text-[15px] font-semibold transition-colors hover:bg-white/20"
          >
            <QuranIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Listen to the Quran</span>
          </button>
        )}
      </div>
  );

  // Full player contents.
  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Quran player"
      aria-hidden={!open}
      inert={!open}
      className={`absolute right-0 bottom-0 w-[calc(100vw-2rem)] p-4 text-parchment transition-opacity sm:w-[360px] sm:p-5 ${
        open ? "opacity-100 delay-150 duration-300" : "pointer-events-none opacity-0 duration-150"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 text-xs font-semibold tracking-[0.14em] text-gold uppercase">Listen to the Quran</p>
          <p className="m-0 mt-1 truncate font-serif text-2xl leading-tight font-semibold text-white">
            {surah.name}{" "}
            <span lang="ar" dir="rtl" className="font-arabic text-lg font-normal text-sand">
              {surah.arabic}
            </span>
          </p>
          <p className="m-0 truncate text-[13px] text-sand">{reciter.name}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Minimize player"
          className="-mt-1 -mr-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-sand hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <label className="sr-only" htmlFor="quran-surah">Surah</label>
        <select
          id="quran-surah"
          value={surah.id}
          onChange={(e) => setSurahId(Number(e.target.value))}
          className="w-full rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[15px] text-white"
        >
          {surahs.map((s) => (
            <option key={s.id} value={s.id} className="text-ink">
              {s.id}. {s.name} — {s.english}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="quran-reciter">Reciter</label>
        <select
          id="quran-reciter"
          value={reciter.id}
          onChange={(e) => setReciterId(Number(e.target.value))}
          className="w-full rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[15px] text-white"
        >
          {reciters.map((r) => (
            <option key={r.id} value={r.id} className="text-ink">
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={Math.min(time, duration || 0)}
        onChange={(e) => seek(Number(e.target.value))}
        disabled={!duration}
        aria-label="Seek"
        className="w-full cursor-pointer accent-gold disabled:cursor-default"
      />
      <div className="mb-3 flex justify-between text-xs text-sand tabular-nums">
        <span>{formatTime(time)}</span>
        <span>{duration ? formatTime(duration) : "--:--"}</span>
      </div>

      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={surah.id === 1}
          aria-label="Previous surah"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-sand hover:bg-white/10 hover:text-white disabled:cursor-default disabled:opacity-40"
        >
          <SkipIcon direction="prev" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gold text-forest hover:bg-gold-dark"
        >
          {loading && playing ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-forest border-t-transparent" />
          ) : playing ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="ml-0.5 h-6 w-6" />
          )}
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={surah.id === 114}
          aria-label="Next surah"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-sand hover:bg-white/10 hover:text-white disabled:cursor-default disabled:opacity-40"
        >
          <SkipIcon direction="next" className="h-5 w-5" />
        </button>
      </div>

      {error && (
        <p className="m-0 mt-3 text-center text-[13px] text-gold-light">
          This recitation couldn&apos;t be loaded. Try another reciter or surah.
        </p>
      )}
      <p className="m-0 mt-3 text-center text-[11px] text-sand/70">
        Audio from{" "}
        <a href="https://quranicaudio.com" className="underline hover:text-white">
          QuranicAudio.com
        </a>
      </p>
    </div>
  );

  // One shell morphs between the launcher's size and the panel's size (and from gold to
  // forest) while the two layers cross-fade inside it, anchored to the bottom-right corner.
  // Everything stays mounted so playback survives opening/minimizing.
  const target = sizes && (open ? sizes.panel : sizes.launcher);
  return (
    <>
      {audio}
      <div
        className={`fixed right-4 bottom-4 z-40 overflow-hidden border transition-[width,height,border-radius,background-color,border-color,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] sm:right-6 sm:bottom-6 ${
          open
            ? "border-gold/60 bg-forest shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_0_4px_rgba(201,185,138,0.15)]"
            : "border-forest/15 bg-gold shadow-[0_10px_28px_rgba(0,0,0,0.3)]"
        } ${target ? "opacity-100" : "opacity-0"}`}
        style={
          target
            ? {
                // +2 for the 1px border on each side
                width: target.w + 2,
                height: target.h + 2,
                borderRadius: open ? 16 : (target.h + 2) / 2,
              }
            : undefined
        }
      >
        {launcher}
        {panel}
      </div>
    </>
  );
}
