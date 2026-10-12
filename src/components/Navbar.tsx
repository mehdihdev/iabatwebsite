"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/building-project", label: "Building Project" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <nav className="sticky top-0 z-30 border-b border-line bg-cream">
      <div className="wrap flex items-center justify-between gap-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-ink hover:text-ink">
          <Image src="/iabat_mark_dark.png" alt="" width={410} height={653} className="h-10 w-auto" priority />
          <span className="text-[19px] leading-none font-semibold tracking-[0.18em]">IABAT</span>
        </Link>

        <div className="hidden items-center gap-7 text-[15px] font-medium md:flex">
          {NAV_ITEMS.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 transition-colors hover:text-brand ${
                  active ? "border-brand text-ink" : "border-transparent text-muted"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <Link href="/donate" className="rounded-md bg-brand px-5 py-[9px] font-semibold text-white hover:bg-brand-dark">
            Donate
          </Link>
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          <Link href="/donate" className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white">
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-line bg-white p-0"
          >
            <span className="block h-0.5 w-[18px] bg-ink" />
            <span className="block h-0.5 w-[18px] bg-ink" />
            <span className="block h-0.5 w-[18px] bg-ink" />
          </button>
        </div>
      </div>

      {/* Slides open by animating the row height from 0fr to 1fr */}
      <div
        inert={!menuOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col border-t border-line bg-cream px-5 pt-2 pb-4">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`border-b border-line-soft py-3.5 text-[17px] font-medium ${
                  pathname === n.href ? "text-ink" : "text-muted"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
