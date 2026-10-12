"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { REVEAL_SELECTOR } from "@/lib/reveal";

// Fades content blocks up into place as they scroll into view (see lib/reveal.ts).
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-reveal")) return;
    (window as unknown as { __iabatReveal: boolean }).__iabatReveal = true;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // A data attribute, not a class: React rewrites className on re-render, which would
            // strip a class and hide the element again.
            e.target.setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );

    const observe = () => {
      // Observing an already-observed element is a no-op, so this is safe to re-run.
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.hasAttribute("data-revealed")) return;
        // Siblings cascade in one after another.
        const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.setProperty("--reveal-i", String(Math.min(index, 6)));
        io.observe(el);
      });
    };
    observe();

    // Pick up content rendered after navigation or streaming.
    const mo = new MutationObserver(observe);
    mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
