"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Tape } from "./Doodles";

export default function Modal({ open, onClose, title, sub, wide, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal paper-card ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <Tape className="tape-left" />
        <Tape className="tape-right" />
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h3 className="modal-title">{title}</h3>
        {sub && <p className="note modal-sub">{sub}</p>}
        {children}
      </div>
    </div>,
    document.body
  );
}
