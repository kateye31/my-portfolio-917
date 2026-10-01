"use client";

import { useState } from "react";
import { favs } from "../data/content";
import { Icon } from "./Doodles";
import Modal from "./Modal";

export default function Favs() {
  const [open, setOpen] = useState(null);
  const fav = favs.find((f) => f.id === open);

  return (
    <>
      <div className="fav-row" data-reveal>
        {favs.map((f, i) => (
          <button key={f.id} type="button" className={`fav-btn fav-${f.id}`} style={{ "--tilt": `${(i % 2 ? 1 : -1) * (2 + i)}deg` }}
            onClick={() => setOpen(f.id)} aria-label={f.title}>
            <Icon name={f.id} />
            <span className="fav-label">{f.label}</span>
          </button>
        ))}
      </div>

      <Modal open={!!fav} onClose={() => setOpen(null)} title={fav?.title} sub={fav?.sub} wide={fav?.images.length > 0}>
        {fav?.images.length > 0 && (
          <div className="cover-grid">
            {fav.images.map((im, i) => (
              <div key={im.src} className="cover" style={{ "--r": `${((i * 7) % 5) - 2}deg` }}>
                <img src={im.src} alt={im.alt} loading="lazy" />
              </div>
            ))}
          </div>
        )}
        {fav?.text && <p className="modal-note">{fav.text}</p>}
      </Modal>
    </>
  );
}
