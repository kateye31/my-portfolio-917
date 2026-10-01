// Hand-drawn ink doodles. Paths are deliberately a little wobbly; the global
// #rough filter (see RoughFilter) adds pen jitter on top.

const ink = { stroke: "var(--ink)", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" };

export function RoughFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="2.6" />
      </filter>
    </svg>
  );
}

function Svg({ children, viewBox = "0 0 100 100", className = "", style, title }) {
  return (
    <svg viewBox={viewBox} className={`doodle ${className}`} style={style} role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true} aria-label={title}>
      <g filter="url(#rough)" fill="none">{children}</g>
    </svg>
  );
}

// fuzzy little soot sprite, spikes generated around a circle
function sootPath(r = 26, spikes = 34, cx = 50, cy = 52) {
  let d = "";
  for (let i = 0; i <= spikes * 2; i++) {
    const a = (i / (spikes * 2)) * Math.PI * 2;
    const rr = i % 2 ? r + 7 + ((i * 37) % 5) : r;
    d += `${i ? "L" : "M"}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }
  return d + "Z";
}
const SOOT = sootPath();

export function SootSprite({ className, style, holding }) {
  return (
    <Svg className={`soot ${className || ""}`} style={style} viewBox="0 0 100 110">
      <path d={SOOT} fill="var(--soot)" stroke="var(--soot)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="40" cy="48" r="9" fill="#fff" />
      <circle cx="60" cy="48" r="9" fill="#fff" />
      <circle className="pupil" cx="41" cy="49" r="3.4" fill="var(--soot)" />
      <circle className="pupil" cx="61" cy="49" r="3.4" fill="var(--soot)" />
      <path d="M38 88 l-4 14 M62 88 l4 14" {...ink} stroke="var(--soot)" />
      {holding === "star" && (
        <g transform="translate(66 64) rotate(12)">
          <path d="M0 -12 L3 -3 12 -2 5 4 7 13 0 8 -7 13 -5 4 -12 -2 -3 -3Z" fill="var(--butter)" {...ink} strokeWidth="1.6" />
        </g>
      )}
    </Svg>
  );
}

// konpeito / star candy
export function Star({ className, style, color = "var(--butter)" }) {
  return (
    <Svg className={className} style={style}>
      <path d="M50 12 C54 30 58 38 86 42 C62 52 60 58 66 86 C52 70 46 70 30 88 C38 60 34 54 12 44 C40 38 44 32 50 12Z"
        fill={color} {...ink} />
    </Svg>
  );
}

export function Sparkle({ className, style }) {
  return (
    <Svg className={className} style={style}>
      <path d="M50 10 C52 40 60 48 90 50 C60 52 52 60 50 90 C48 60 40 52 10 50 C40 48 48 40 50 10Z" fill="var(--pink)" {...ink} />
    </Svg>
  );
}

export function Cloud({ className, style }) {
  return (
    <Svg className={className} style={style} viewBox="0 0 160 90">
      <path d="M24 70 C6 70 6 46 26 46 C24 26 52 20 60 36 C66 14 104 12 108 38 C126 28 150 40 140 58 C156 62 150 76 134 74 C110 80 52 78 24 70Z"
        fill="#fff" {...ink} />
      <path d="M44 56 c8 4 16 4 24 0" {...ink} strokeWidth="1.6" opacity=".5" />
    </Svg>
  );
}

export function Leaf({ className, style, color = "var(--moss)" }) {
  return (
    <Svg className={className} style={style}>
      <path d="M18 82 C14 46 40 16 86 14 C84 56 58 84 18 82Z" fill={color} {...ink} />
      <path d="M18 82 C38 62 56 42 78 22 M40 62 l-4 -16 M52 50 l14 2 M58 40 l-2 -12" {...ink} strokeWidth="1.8" />
    </Svg>
  );
}

export function Acorn({ className, style }) {
  return (
    <Svg className={className} style={style}>
      <path d="M30 46 C28 72 40 88 50 90 C60 88 72 72 70 46Z" fill="var(--acorn)" {...ink} />
      <path d="M24 46 C24 30 76 30 76 46 C66 52 34 52 24 46Z" fill="var(--acorn-cap)" {...ink} />
      <path d="M50 34 C50 26 54 20 60 18" {...ink} />
      <path d="M36 42 l6 6 M50 40 l0 8 M64 42 l-6 6" {...ink} strokeWidth="1.4" />
    </Svg>
  );
}

export function Flower({ className, style, color = "var(--pink)" }) {
  return (
    <Svg className={className} style={style}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="50" cy="28" rx="13" ry="20" transform={`rotate(${r} 50 50)`} fill={color} {...ink} />
      ))}
      <circle cx="50" cy="50" r="10" fill="var(--butter)" {...ink} />
    </Svg>
  );
}

export function Heart({ className, style }) {
  return (
    <Svg className={className} style={style}>
      <path d="M50 84 C20 62 10 44 18 30 C26 16 44 18 50 34 C56 18 76 16 82 30 C90 46 78 62 50 84Z" fill="var(--pink)" {...ink} />
    </Svg>
  );
}

export function Squiggle({ className, style, color = "var(--pink)" }) {
  return (
    <svg viewBox="0 0 300 24" className={`squiggle ${className || ""}`} style={style} preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" className="draw" d="M4 14 C30 4 50 22 76 12 S120 4 146 14 S196 22 222 10 S270 6 296 14"
        fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function CurlyArrow({ className, style, flip }) {
  return (
    <Svg className={className} style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }} viewBox="0 0 120 80">
      <path pathLength="1" className="draw" d="M8 12 C30 6 52 14 54 32 C56 50 34 52 36 38 C38 24 70 30 82 52 C88 62 94 66 108 68" {...ink} />
      <path d="M96 58 L110 68 L94 74" {...ink} />
    </Svg>
  );
}

export function Circled({ children }) {
  return (
    <span className="circled">
      {children}
      <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" className="draw" d="M30 14 C80 2 170 6 190 34 C204 58 140 76 80 72 C20 68 0 48 10 30 C18 16 48 10 70 10"
          fill="none" stroke="var(--pink)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Tape({ className, style }) {
  return <span className={`tape ${className || ""}`} style={style} aria-hidden="true" />;
}

/* ---------- hobby + project icons, redrawn as ink sketches ---------- */

const icons = {
  tv: (
    <>
      <path d="M34 26 L46 10 M66 26 L54 10" {...ink} />
      <path d="M16 28 C14 26 84 24 86 28 C88 40 88 66 84 72 C70 76 30 76 16 72 C12 60 12 40 16 28Z" fill="var(--sky)" {...ink} />
      <path d="M24 36 C40 34 62 34 76 36 C78 46 78 56 76 64 C60 66 40 66 24 64 C22 54 22 44 24 36Z" fill="#fff" {...ink} strokeWidth="1.8" />
      <circle cx="44" cy="48" r="2" fill="var(--ink)" /><circle cx="56" cy="48" r="2" fill="var(--ink)" />
      <path d="M46 55 c2 2 6 2 8 0" {...ink} strokeWidth="1.6" />
      <path d="M38 76 l-4 8 M62 76 l4 8" {...ink} />
    </>
  ),
  radio: (
    <>
      <path d="M30 24 L48 8" {...ink} /><circle cx="48" cy="8" r="3" fill="var(--pink)" {...ink} strokeWidth="1.6" />
      <path d="M14 30 C12 24 86 22 88 30 C90 44 90 62 86 70 C64 74 34 74 14 70 C10 58 10 42 14 30Z" fill="var(--pink)" {...ink} />
      <circle cx="34" cy="50" r="12" fill="#fff" {...ink} />
      <path d="M28 44 c4 -2 8 0 12 4 M28 52 c4 2 8 2 12 -2" {...ink} strokeWidth="1.4" />
      <path d="M56 40 h22 v8 h-22z" fill="#fff" {...ink} strokeWidth="1.8" />
      <circle cx="60" cy="60" r="3.5" fill="var(--ink)" /><circle cx="73" cy="60" r="3.5" fill="var(--ink)" />
    </>
  ),
  marquee: (
    <>
      <path d="M12 34 L50 16 L88 34" fill="var(--butter)" {...ink} />
      <path d="M12 34 C30 32 70 32 88 34 C90 44 90 56 88 64 C64 66 36 66 12 64 C10 54 10 44 12 34Z" fill="var(--lilac)" {...ink} />
      <g className="bulbs">{[20, 30, 40, 50, 60, 70, 80].map((x) => <circle key={x} cx={x} cy="38" r="2.4" fill="var(--butter)" stroke="var(--ink)" strokeWidth="1" />)}</g>
      <path d="M22 48 c18 -2 38 2 56 0 M22 56 c18 2 38 -2 56 0" {...ink} strokeWidth="1.4" />
      <path d="M42 64 v16 h16 v-16" fill="#fff" {...ink} />
    </>
  ),
  globe: (
    <>
      <circle cx="50" cy="48" r="34" fill="var(--sky)" {...ink} />
      <path d="M26 30 C34 28 38 36 34 42 C30 48 36 56 30 60 M58 18 C54 26 62 30 66 28 C74 26 76 36 70 42 C64 48 70 58 78 58 M44 70 C50 66 58 70 56 78"
        fill="none" stroke="var(--moss)" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 82 v8 M36 92 c8 -3 20 -3 28 0" {...ink} />
      <path d="M62 30 c-2 -6 6 -8 6 -2 c0 4 -6 8 -6 8 c0 0 -6 -4 -6 -8 c0 -6 8 -4 6 2" fill="var(--pink)" {...ink} strokeWidth="1.4" />
    </>
  ),
  books: (
    <>
      <path d="M16 24 l16 -2 l4 58 l-16 2z" fill="var(--moss)" {...ink} />
      <path d="M36 16 h18 v64 h-18z" fill="var(--pink)" {...ink} />
      <path d="M56 22 l16 -2 l8 58 l-16 3z" fill="var(--sky)" {...ink} />
      <path d="M40 26 h10 M40 32 h10 M60 30 l10 -1" {...ink} strokeWidth="1.4" />
      <path d="M10 82 C30 80 70 80 90 82" {...ink} />
    </>
  ),
  genesis: (
    <>
      <path d="M14 42 C14 32 22 28 30 28 h40 c8 0 16 4 16 14 v10 c0 10 -8 14 -16 14 h-8 c-4 0 -6 -2 -8 -5 l-3 -4 c-2 -3 -6 -3 -8 0 l-3 4 c-2 3 -4 5 -8 5 h-8 c-8 0 -16 -4 -16 -14z" fill="var(--sky)" {...ink} />
      <circle cx="31" cy="47" r="9" fill="#fff" {...ink} /><circle cx="69" cy="47" r="9" fill="#fff" {...ink} />
      <path d="M8 42 h6 M86 42 h6" {...ink} />
    </>
  ),
  drone: (
    <>
      {[[24, 26], [76, 26], [24, 74], [76, 74]].map(([x, y]) => (
        <g key={`${x}${y}`}><ellipse cx={x} cy={y} rx="14" ry="5" fill="var(--lilac)" {...ink} strokeWidth="1.8" /><path d={`M${x} ${y} L50 50`} {...ink} /></g>
      ))}
      <circle cx="50" cy="50" r="10" fill="var(--butter)" {...ink} />
      <circle cx="50" cy="50" r="3" fill="var(--ink)" />
    </>
  ),
  parallel: (
    <>
      {[20, 41, 62].map((y) => (
        <g key={y}><path d={`M16 ${y} h68 v18 h-68z`} fill="var(--mint)" {...ink} /><circle cx="26" cy={y + 9} r="3" fill="var(--pink)" {...ink} strokeWidth="1.2" /><path d={`M38 ${y + 9} h36`} {...ink} strokeWidth="1.4" strokeDasharray="3 4" /></g>
      ))}
    </>
  ),
  cloud: (
    <>
      <path d="M26 64 C10 64 10 42 28 42 C28 24 54 20 60 36 C66 26 86 30 84 48 C96 50 94 66 80 64Z" fill="#fff" {...ink} />
      <circle cx="70" cy="72" r="12" fill="var(--mint)" {...ink} />
      <path d="M64 72 l4 4 l8 -8" {...ink} />
    </>
  ),
  book: (
    <>
      <path d="M50 26 C40 18 26 18 16 22 v52 c10 -4 24 -4 34 4 c10 -8 24 -8 34 -4 v-52 c-10 -4 -24 -4 -34 4z" fill="var(--butter)" {...ink} />
      <path d="M50 26 v52" {...ink} strokeWidth="1.6" />
      <path d="M68 34 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1z" fill="var(--pink)" {...ink} strokeWidth="1.4" />
    </>
  ),
  code: (
    <>
      <path d="M14 22 C30 20 70 20 86 22 C88 40 88 60 86 78 C70 80 30 80 14 78 C12 60 12 40 14 22Z" fill="var(--pink)" {...ink} />
      <path d="M34 40 l-10 10 l10 10 M66 40 l10 10 l-10 10 M58 36 l-16 30" {...ink} strokeWidth="3" />
    </>
  ),
  scales: (
    <>
      <path d="M50 18 v58 M24 30 h52" {...ink} />
      <path d="M24 30 L14 52 a10 8 0 0 0 20 0z M76 30 L66 52 a10 8 0 0 0 20 0z" fill="var(--lilac)" {...ink} />
      <path d="M36 82 h28" {...ink} strokeWidth="5" />
      <circle cx="50" cy="16" r="4" fill="var(--butter)" {...ink} />
    </>
  ),
  audit: (
    <>
      <path d="M20 14 C36 12 64 12 80 14 C82 40 82 66 80 86 C64 88 36 88 20 86 C18 62 18 38 20 14Z" fill="#fff" {...ink} />
      <path d="M30 30 h40 M30 42 h28 M30 54 h34" {...ink} strokeWidth="2" />
      <circle cx="66" cy="70" r="13" fill="var(--mint)" {...ink} />
      <path d="M60 70 l4 4 l8 -8" {...ink} />
    </>
  ),
  cap: (
    <>
      <path d="M50 26 L10 42 L50 58 L90 42Z" fill="var(--lilac)" {...ink} />
      <path d="M26 50 v16 c0 6 10 12 24 12 s24 -6 24 -12 v-16" fill="var(--sky)" {...ink} />
      <path d="M86 44 v22" {...ink} /><circle cx="86" cy="70" r="4" fill="var(--pink)" {...ink} strokeWidth="1.4" />
    </>
  ),
  trophy: (
    <>
      <path d="M34 20 h32 v22 c0 10 -8 16 -16 16 s-16 -6 -16 -16z" fill="var(--butter)" {...ink} />
      <path d="M34 26 h-8 c-4 0 -6 4 -4 10 c2 6 6 8 12 8 M66 26 h8 c4 0 6 4 4 10 c-2 6 -6 8 -12 8" {...ink} />
      <path d="M50 58 v10 M38 82 h24 l-4 -12 h-16z" fill="var(--pink)" {...ink} />
    </>
  ),
  notebook: (
    <>
      <path d="M50 26 C40 18 26 18 16 22 v52 c10 -4 24 -4 34 4 c10 -8 24 -8 34 -4 v-52 c-10 -4 -24 -4 -34 4z" fill="var(--mint)" {...ink} />
      <path d="M50 26 v52 M24 34 c8 -2 14 -1 20 2 M24 44 c8 -2 14 -1 20 2 M56 36 c6 -3 12 -3 20 -2 M56 46 c6 -3 12 -3 20 -2" {...ink} strokeWidth="1.6" />
    </>
  ),
};

export function Icon({ name, className, style }) {
  return <Svg className={`icon ${className || ""}`} style={style}>{icons[name]}</Svg>;
}
