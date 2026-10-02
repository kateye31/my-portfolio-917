"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { heroPhoto, profilePics, quotes } from "../data/content";
import { Circled, Cloud, CurlyArrow, Leaf, SootSprite, Sparkle, Squiggle, Star, Tape } from "./Doodles";

const SpiritScene = dynamic(() => import("./SpiritScene"), {
  ssr: false,
  loading: () => <div className="scene-loading note">summoning a spirit…</div>,
});

const GREETING = "hi, i'm katrina";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [pic, setPic] = useState(profilePics[0]);
  const [quote, setQuote] = useState(quotes[0]);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    // random cat/profile pic and quote on every visit
    setPic(profilePics[Math.random() < 0.5 ? 0 : 1]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(GREETING.slice(0, i));
      if (i >= GREETING.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hero" id="top">
      <Cloud className="float slow" style={{ position: "absolute", top: 78, left: "30%", width: 120 }} />
      <Cloud className="float" style={{ position: "absolute", top: 150, right: "6%", width: 100 }} />
      <Sparkle className="twinkle" style={{ position: "absolute", top: 120, left: "46%", width: 26 }} />

      <div className="hero-text">
        <div className="hero-top">
          <span className="sticker profile">
            <img src={pic} alt="Katrina's profile picture" />
          </span>
          <div className="quote-wrap">
            <button className="pill" type="button" onClick={() => setQuoteOpen((o) => !o)}>
              ❝ a favorite quote
            </button>
            {quoteOpen && (
              <div className="quote-pop paper-card">
                “{quote.text}”<span className="note"> - {quote.author}</span>
              </div>
            )}
          </div>
        </div>

        <h1 className="hello">
          {typed}
          <span className="caret" aria-hidden="true">{typed.length < GREETING.length ? "|" : ""}</span>
          <Squiggle className="hello-line" />
        </h1>

        <p className="intro-secret">
          I love <mark>animals</mark>, <mark>travelling</mark>, <mark>meeting new people</mark>, and making cool things together for good.
        </p>

        <h2 className="hero-title">
          <Circled>Software Engineer</Circled>, Leader, STEM Advocate, Creator, Designer, Author and Cat-lover.
        </h2>

        <p className="hero-tag">
          Currently I am a <b>Computer Science</b> and Intelligent Robotics Systems student at the <b>University of Central Florida</b>. I am an ambitious person, which is shown through my many organizations and experiences. I am a UCF STEM Ambassador and I am so excited to go advocate about STEM in Orlando. I will be an expert in my field and continue to help others achieve their STEM dreams. I love staying involved, meeting new people and travelling any chance I get to get a new perspective of the world. The world is so big, so why not explore it? 🙂 I included some of my favourite things so you can know who I am beyond just the code, and hey maybe we might share the same favs!
        </p>

        <div className="hero-cta">
          <a href="#work" className="btn">view projects</a>
          <a href="#contact" className="btn ghost">contact me</a>
        </div>
      </div>

      <div className="hero-art">
        <div className="scene">
          <SpiritScene />
        </div>
        <p className="note scene-note">
          <CurlyArrow className="scene-arrow" flip />
          psst, click him!
        </p>
        <SootSprite className="hop" style={{ position: "absolute", left: "6%", bottom: "14%", width: 56 }} holding="star" />
        <SootSprite className="hop delay" style={{ position: "absolute", left: "22%", bottom: "4%", width: 40 }} />
        <SootSprite className="hop delay2" style={{ position: "absolute", right: "4%", top: "30%", width: 34 }} />
        <Leaf className="sway" style={{ position: "absolute", top: "8%", left: "8%", width: 46 }} />
        <Star className="twinkle" style={{ position: "absolute", top: "14%", right: "12%", width: 30 }} />

        <figure className="polaroid hero-photo">
          <Tape />
          <img src={heroPhoto.src} alt={heroPhoto.alt} />
          <figcaption>me &amp; a new friend ♡</figcaption>
        </figure>
      </div>
    </header>
  );
}
