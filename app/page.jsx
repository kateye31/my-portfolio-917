import Favs from "../components/Favs";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Projects from "../components/Projects";
import Reveal from "../components/Reveal";
import VisitCounter from "../components/VisitCounter";
import { Acorn, CurlyArrow, Flower, Heart, Icon, Leaf, RoughFilter, SootSprite, Sparkle, Squiggle, Star, Tape } from "../components/Doodles";
import { education, experience, links, orgs, RESUME, skills } from "../data/content";

function Label({ children }) {
  return <p className="label note">{children}</p>;
}

function Experience() {
  return experience.map((g) => (
    <div key={g.group} className="exp-group">
      <h3 className="group-title" data-reveal>{g.group} <span className="note">- {g.note}</span></h3>
      <div className="exp-grid">
        {g.items.map((e, i) => (
          <article key={`${e.org}-${e.title}-${e.date}`} className="exp-card paper-card" data-reveal style={{ "--tilt": `${[-1, 0.8, -0.4, 1.2][i % 4]}deg` }}>
            <div className={`exp-img ${e.logo ? "logo" : ""}`} style={e.logoBg ? { background: e.logoBg } : undefined}>
              <Tape />
              <img src={e.img} alt={e.org} loading="lazy" />
            </div>
            <p className="note exp-date">{e.date}</p>
            <h4>{e.title}</h4>
            <p className="exp-org">{e.org}</p>
            <p className="exp-desc">{e.desc}</p>
            <div className="tags">{e.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </div>
  ));
}

export default function Home() {
  return (
    <>
      <RoughFilter />
      <Reveal />
      <Nav />
      <main>
        <Hero />

        <section id="hobbies">
          <Label>my_favs</Label>
          <h2 className="section-title" data-reveal>A few of my favorite things</h2>
          <p className="section-sub">If I&apos;m not coding, I&apos;m listening to music, dancing, or cooking for my friends.</p>
          <CurlyArrow className="favs-arrow" />
          <p className="note favs-hint">tap one to peek inside!</p>
          <Favs />
          <Acorn className="sway" style={{ position: "absolute", right: "8%", top: 70, width: 40 }} />
        </section>

        <section id="work">
          <Label>selected_projects</Label>
          <Projects />
          <SootSprite className="hop" style={{ position: "absolute", right: "3%", bottom: 10, width: 48 }} holding="star" />
        </section>

        <section id="experience">
          <Label>work_history</Label>
          <h2 className="section-title" data-reveal>Experience</h2>
          <Leaf className="sway" style={{ position: "absolute", right: "5%", top: 60, width: 56 }} />
          <Experience />
        </section>

        <section id="organizations">
          <Label>involvement</Label>
          <h2 className="section-title" data-reveal>Organizations</h2>
          <Flower className="spin-slow" style={{ position: "absolute", left: "3%", top: 40, width: 44 }} />
          <div className="org-grid" data-reveal>
            {orgs.map((o, i) => (
              <div key={o.name} className="org" style={{ "--tilt": `${((i * 5) % 7) - 3}deg` }}>
                <div className="org-pic polaroid" style={o.bg ? { background: o.bg } : undefined}>
                  <img src={o.img} alt={`${o.name} logo`} loading="lazy" />
                </div>
                <p className="org-name">{o.name}</p>
                {o.roles.map(([r, y]) => <p key={r} className="org-role">{r} <span className="note">({y})</span></p>)}
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <Label>stack</Label>
          <h2 className="section-title" data-reveal>Skills</h2>
          <div className="skills-note paper-card lined" data-reveal>
            <Tape className="tape-left" />
            {skills.map(([k, v]) => (
              <p key={k}><span className="skill-key">{k}:</span> {v}</p>
            ))}
            <Star className="twinkle" style={{ position: "absolute", right: -14, bottom: -14, width: 40 }} />
          </div>
        </section>

        <section id="education">
          <Label>background</Label>
          <h2 className="section-title" data-reveal>Education &amp; Awards</h2>
          <div className="edu-grid">
            <div className="edu-col" data-reveal>
              <p className="note edu-head">degree</p>
              <Icon name="cap" className="edu-icon" />
              {education.degrees.map((d) => (
                <div key={d.name} className="edu-item">
                  <h4>{d.name}</h4>
                  <p className="edu-school">{d.school}</p>
                  <p className="note">{d.when}</p>
                </div>
              ))}
              <div className="tags center">{education.degreeTags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
            <div className="edu-col" data-reveal>
              <p className="note edu-head">awards &amp; certs</p>
              <Icon name="trophy" className="edu-icon" />
              {education.awards.map((a) => (
                <div key={a.name} className="edu-item">
                  <h4>{a.name}</h4>
                  <p className="note">{a.meta}</p>
                  {a.id && <p className="note tiny">ID: {a.id}</p>}
                </div>
              ))}
            </div>
            <div className="edu-col" data-reveal>
              <p className="note edu-head">relevant coursework</p>
              <Icon name="notebook" className="edu-icon" />
              <div className="tags center">{education.coursework.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <Label>get_in_touch</Label>
        <h2 className="contact-title" data-reveal>let&apos;s connect <Heart className="inline-heart" /></h2>
        <Squiggle className="contact-line" color="var(--moss)" />
        <a href={`mailto:${links.email}`} className="btn big">{links.email}</a>
        <p className="fine">
          <a href={links.github} target="_blank" rel="noopener">github</a> ·{" "}
          <a href={links.linkedin} target="_blank" rel="noopener">linkedin</a> ·{" "}
          <a href={RESUME} target="_blank" rel="noopener">resume.pdf</a>
        </p>
        <div className="footer-parade" aria-hidden="true">
          <SootSprite className="hop" style={{ width: 38 }} />
          <SootSprite className="hop delay" style={{ width: 30 }} holding="star" />
          <SootSprite className="hop delay2" style={{ width: 42 }} />
          <Sparkle className="twinkle" style={{ width: 22 }} />
          <SootSprite className="hop delay" style={{ width: 28 }} />
        </div>
        <VisitCounter />
        <p className="note tiny">drawn &amp; coded with love · forest spirit is fan art</p>
      </footer>
    </>
  );
}
