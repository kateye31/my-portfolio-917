"use client";

import { useState } from "react";
import { projects } from "../data/content";
import { Icon } from "./Doodles";
import Modal from "./Modal";

function Media({ p, autoplay }) {
  if (p.youtube) {
    return (
      <div className="media">
        <iframe src={`${p.youtube}?rel=0${autoplay ? "&autoplay=1" : ""}`} title={p.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  if (p.media) return <div className="media"><img src={p.media} alt={`${p.title} demo`} loading="lazy" /></div>;
  return (
    <div className="media empty">
      <Icon name={p.icon} className="media-icon" />
      <span className="note">{p.note || "video coming soon"}</span>
    </div>
  );
}

export default function Projects() {
  const [detail, setDetail] = useState(null);
  const [all, setAll] = useState(false);
  const p = projects.find((x) => x.id === detail);

  const openDetail = (id) => {
    setAll(false);
    setDetail(id);
  };

  return (
    <>
      <div className="section-head">
        <h2 className="section-title" data-reveal>Things I&apos;ve built</h2>
        <button type="button" className="btn small" onClick={() => setAll(true)}>see all projects →</button>
      </div>

      <div className="project-grid" data-reveal>
        {projects.filter((x) => x.featured).map((x, i) => (
          <button key={x.id} type="button" className="project-card paper-card" style={{ "--tilt": `${[-1.5, 1, -0.5, 1.5][i % 4]}deg` }}
            onClick={() => openDetail(x.id)} aria-label={`View ${x.title}`}>
            <Icon name={x.icon} className="project-icon" />
            <span className="project-label">{x.label}</span>
            {x.media && <span className="project-peek"><img src={x.media} alt="" loading="lazy" /></span>}
          </button>
        ))}
      </div>

      <Modal open={all} onClose={() => setAll(false)} title="All projects" sub="everything I've built - click one for the full writeup + video" wide>
        <div className="all-projects">
          {projects.map((x) => (
            <div key={x.id} role="button" tabIndex={0} className="all-item" onClick={() => openDetail(x.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openDetail(x.id))}>
              <h4>{x.title}</h4>
              <Media p={x} />
              <p>{x.short}</p>
              <div className="tags">{x.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={!!p} onClose={() => setDetail(null)} title={p?.title} sub={p?.sub} wide>
        {p && (
          <>
            <Media p={p} autoplay />
            {p.pdf && (
              <div className="pdf-box">
                <p className="note">design document ↓</p>
                <iframe src={p.pdf} title={`${p.title} design document`} />
              </div>
            )}
            <p className="modal-note plain">{p.desc}</p>
            <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </>
        )}
      </Modal>
    </>
  );
}
