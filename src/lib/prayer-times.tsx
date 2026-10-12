"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DURHAM, TRIANGLE_LOCATIONS, type PrayerLocation } from "@/lib/locations";

// Prayer times come from aladhan.com using the Jafari (Shia Ithna Ashari) method.
// These parameters are carried over unchanged from the original site — do not edit
// them without checking with the IABAT board:
//   method=0 (Jafari), tune all zeros (no minute offsets).
// Only the coordinates change when a visitor picks another location. For the default
// (Durham) this produces exactly the original query:
//   latitude=35.9940&longitude=-78.8986&method=0&tune=0,0,0,0,0,0,0,0,0
const METHOD_PARAMS = "method=0&tune=0,0,0,0,0,0,0,0,0";

function queryFor(loc: PrayerLocation) {
  return `latitude=${loc.lat.toFixed(4)}&longitude=${loc.lng.toFixed(4)}&${METHOD_PARAMS}`;
}

const STORAGE_KEY = "iabat:prayer-location";

export const PRAYER_NAMES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
type PrayerName = (typeof PRAYER_NAMES)[number];
type Timings = Record<PrayerName, string>;

// `scope` ties fetched data to the location + timezone it was fetched for.
type DayData = { key: string; scope: string; timings: Timings; hijri: string; timezone: string };

type Parts = { y: number; mo: number; d: number; h: number; mi: number; s: number };

function browserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || DURHAM.tz!;
  } catch {
    return DURHAM.tz!;
  }
}

const formatters = new Map<string, Intl.DateTimeFormat>();
function partsIn(tz: string, ms: number): Parts {
  let f = formatters.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    formatters.set(tz, f);
  }
  const p: Record<string, number> = {};
  for (const { type, value } of f.formatToParts(new Date(ms))) {
    if (type !== "literal") p[type] = Number(value);
  }
  return { y: p.year, mo: p.month, d: p.day, h: p.hour, mi: p.minute, s: p.second };
}

// aladhan's dated endpoint takes DD-MM-YYYY.
function dateKey({ y, mo, d }: { y: number; mo: number; d: number }) {
  return `${String(d).padStart(2, "0")}-${String(mo).padStart(2, "0")}-${y}`;
}

function parseKey(key: string) {
  const [d, mo, y] = key.split("-").map(Number);
  return { y, mo, d };
}

function nextDayKey(key: string) {
  const { y, mo, d } = parseKey(key);
  const t = new Date(Date.UTC(y, mo - 1, d + 1));
  return dateKey({ y: t.getUTCFullYear(), mo: t.getUTCMonth() + 1, d: t.getUTCDate() });
}

// Converts a wall-clock time in `tz` to an absolute instant (handles DST).
function wallTimeToMs(tz: string, day: { y: number; mo: number; d: number }, hhmm: string) {
  const [h, mi] = hhmm.split(":").map(Number);
  const guess = Date.UTC(day.y, day.mo - 1, day.d, h, mi);
  const offsetAt = (ms: number) => {
    const p = partsIn(tz, ms);
    return Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s) - ms;
  };
  return guess - offsetAt(guess - offsetAt(guess));
}

// Same 12-hour conversion as the original site.
export function to12Hour(time24: string) {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

async function fetchDay(loc: PrayerLocation, key: string, scope: string): Promise<DayData> {
  const res = await fetch(`https://api.aladhan.com/v1/timings/${key}?${queryFor(loc)}`);
  if (!res.ok) throw new Error(`aladhan responded ${res.status}`);
  const { data } = await res.json();
  const h = data.date.hijri;
  const timings = Object.fromEntries(PRAYER_NAMES.map((n) => [n, data.timings[n]])) as Timings;
  return { key, scope, timings, hijri: `${h.day} ${h.month.en} ${h.year} AH`, timezone: data.meta.timezone };
}

function isValidLocation(v: unknown): v is PrayerLocation {
  const l = v as PrayerLocation;
  return (
    !!l &&
    typeof l.id === "string" &&
    typeof l.label === "string" &&
    Number.isFinite(l.lat) &&
    Number.isFinite(l.lng) &&
    Math.abs(l.lat) <= 90 &&
    Math.abs(l.lng) <= 180 &&
    (l.tz === null || typeof l.tz === "string")
  );
}

type LocateStatus = { state: "idle" | "locating" } | { state: "error"; message: string };

type PrayerState = {
  status: "loading" | "ready" | "error";
  prayers: { name: PrayerName; time: string; isNext: boolean }[];
  next: { name: PrayerName; time: string; countdown: string } | null;
  hijriDate: string | null;
  gregorianDate: { long: string; short: string } | null;
  retry: () => void;
  location: PrayerLocation;
  isDefaultLocation: boolean;
  setLocation: (loc: PrayerLocation) => void;
  locateMe: () => Promise<boolean>;
  locateStatus: LocateStatus;
};

const PrayerContext = createContext<PrayerState | null>(null);

export function PrayerTimesProvider({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState<number | null>(null);
  const [location, setLocationState] = useState<PrayerLocation>(DURHAM);
  const [today, setToday] = useState<DayData | null>(null);
  const [tomorrow, setTomorrow] = useState<DayData | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [locateStatus, setLocateStatus] = useState<LocateStatus>({ state: "idle" });

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Restore a previously chosen location (Durham otherwise).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (isValidLocation(saved)) {
        // Listed cities always use the current list's coordinates; a city that has since
        // been removed from the list falls back to Durham.
        const listed = TRIANGLE_LOCATIONS.find((l) => l.id === saved.id);
        if (listed) setLocationState(listed);
        else if (saved.id === "geo") setLocationState(saved);
      }
    } catch {}
  }, []);

  const setLocation = useCallback((loc: PrayerLocation) => {
    setLocationState(loc);
    setLocateStatus({ state: "idle" });
    try {
      if (loc.id === DURHAM.id) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    } catch {}
  }, []);

  const tz = location.tz ?? browserTimezone();
  const scope = `${location.lat.toFixed(4)},${location.lng.toFixed(4)}|${tz}`;
  const todayKey = now === null ? null : dateKey(partsIn(tz, now));

  // Fetch today's and tomorrow's times; re-runs when the location changes or the date
  // rolls over there, so a tab left open overnight stays correct.
  useEffect(() => {
    if (!todayKey) return;
    let cancelled = false;
    setError(false);
    fetchDay(location, todayKey, scope)
      .then((d) => {
        if (cancelled) return;
        // A geolocated position's timezone is a guess (the browser's) until aladhan reports it.
        if (d.timezone && d.timezone !== tz && location.tz === null) {
          setLocation({ ...location, tz: d.timezone });
          return;
        }
        setToday(d);
      })
      .catch((e) => {
        console.error("Error fetching prayer times:", e);
        if (!cancelled) setError(true);
      });
    // Tomorrow is only needed for the "next prayer" countdown after Isha.
    fetchDay(location, nextDayKey(todayKey), scope)
      .then((d) => !cancelled && setTomorrow(d))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `scope` captures location + tz
  }, [todayKey, scope, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  const locateMe = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setLocateStatus({ state: "error", message: "Your browser doesn't support location. Please choose a city instead." });
      return false;
    }
    setLocateStatus({ state: "locating" });
    let pos: GeolocationPosition;
    try {
      pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 15000, maximumAge: 10 * 60 * 1000 })
      );
    } catch (e) {
      const code = (e as GeolocationPositionError)?.code;
      setLocateStatus({
        state: "error",
        message:
          code === 1
            ? "Location access was blocked. Allow it in your browser settings, or choose a city instead."
            : "We couldn't find your location. Please try again or choose a city instead.",
      });
      return false;
    }
    const lat = Number(pos.coords.latitude.toFixed(4));
    const lng = Number(pos.coords.longitude.toFixed(4));
    let label = "Your location";
    try {
      const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      if (typeof data.label === "string" && data.label) label = data.label;
    } catch {}
    setLocation({ id: "geo", label, lat, lng, tz: null });
    return true;
  }, [setLocation]);

  const current = today && today.key === todayKey && today.scope === scope ? today : null;
  let next: PrayerState["next"] = null;
  let nextIdx = -1;

  if (current && now !== null) {
    const day = parseKey(current.key);
    nextIdx = PRAYER_NAMES.findIndex((n) => wallTimeToMs(tz, day, current.timings[n]) > now);
    let target: number | null = null;
    let nextTime: string | null = null;
    if (nextIdx >= 0) {
      nextTime = current.timings[PRAYER_NAMES[nextIdx]];
      target = wallTimeToMs(tz, day, nextTime);
    } else if (tomorrow && tomorrow.scope === scope && tomorrow.key === nextDayKey(current.key)) {
      nextTime = tomorrow.timings.Fajr;
      target = wallTimeToMs(tz, parseKey(tomorrow.key), nextTime);
    }
    if (target !== null && nextTime !== null) {
      const diff = Math.max(0, target - now);
      const hh = Math.floor(diff / 3600000);
      const mm = Math.floor((diff % 3600000) / 60000);
      next = {
        name: nextIdx >= 0 ? PRAYER_NAMES[nextIdx] : "Fajr",
        time: to12Hour(nextTime),
        countdown: hh > 0 ? `${hh}h ${mm}m` : `${mm} min`,
      };
    }
  }

  const value: PrayerState = {
    status: current ? "ready" : error ? "error" : "loading",
    prayers: PRAYER_NAMES.map((name, i) => ({
      name,
      time: current ? to12Hour(current.timings[name]) : "…",
      isNext: i === nextIdx,
    })),
    next,
    hijriDate: current?.hijri ?? null,
    gregorianDate:
      now === null
        ? null
        : {
            long: new Date(now).toLocaleDateString("en-US", {
              timeZone: tz,
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            short: new Date(now).toLocaleDateString("en-US", {
              timeZone: tz,
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          },
    retry,
    location,
    isDefaultLocation: location.id === DURHAM.id,
    setLocation,
    locateMe,
    locateStatus,
  };

  return <PrayerContext.Provider value={value}>{children}</PrayerContext.Provider>;
}

export function usePrayerTimes() {
  const ctx = useContext(PrayerContext);
  if (!ctx) throw new Error("usePrayerTimes must be used inside PrayerTimesProvider");
  return ctx;
}
