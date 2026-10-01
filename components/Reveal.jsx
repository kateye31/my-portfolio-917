"use client";

import { useEffect } from "react";

// adds .in-view to [data-reveal] elements once they reach the fold (drives the
// fade-up in globals.css). Checks on scroll rather than IntersectionObserver so
// jumping past a section via a nav link still reveals it.
export default function Reveal() {
  useEffect(() => {
    let pending = [...document.querySelectorAll("[data-reveal]")];
    let frame = 0;
    const check = () => {
      frame = 0;
      const fold = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > fold) return true;
        el.classList.add("in-view");
        return false;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
