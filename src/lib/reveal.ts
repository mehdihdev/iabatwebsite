// Shared by the server layout (bootstrap script) and the RevealOnScroll client component.

// Content blocks that fade up into place as they scroll into view: the top-level
// blocks of each section in <main>, and each card inside a grid marked `data-stagger`.
// Keep in sync with the matching selectors in globals.css.
export const REVEAL_SELECTOR = [
  "main section > .wrap > :not([data-stagger])",
  "main section.wrap > :not([data-stagger])",
  "main [data-stagger] > *",
].join(",");

// Runs in <head> before first paint so revealed content never flashes. If the app
// fails to hydrate, the fallback timer removes the class and shows everything.
export const REVEAL_BOOTSTRAP = `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.classList.add("js-reveal");setTimeout(function(){if(!window.__iabatReveal)d.classList.remove("js-reveal")},2500)}catch(e){}})();`;
