"use client";

import { useEffect, useRef, useState } from "react";
import { RESUME } from "../data/content";

const navLinks = [
  ["#hobbies", "my_favs"],
  ["#work", "work"],
  ["#experience", "experience"],
  ["#organizations", "organizations"],
  ["#skills", "skills"],
  ["#education", "education"],
  ["#contact", "contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !navRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  return (
    <nav className={`nav ${open ? "open" : ""}`} ref={navRef}>
      <a href="#top" className="brand" onClick={() => setOpen(false)}>katrina<span>✿</span></a>

      <div className="nav-right">
        <a href={RESUME} target="_blank" rel="noopener" className="nav-resume">resume</a>
        <span className="nav-sep" aria-hidden="true">·</span>
        <ul id="nav-links" className="nav-links">
          {navLinks.map(([href, label]) => (
            <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
          ))}
        </ul>
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path className="l1" d="M9 13 C16 11 24 14 31 12" />
            <path className="l2" d="M9 20 C16 21 24 19 31 20" />
            <path className="l3" d="M9 27 C16 28 24 26 31 28" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
