gsap.registerPlugin(ScrollTrigger);

// pick a random cat photo for the profile picture
(function(){
  const imgEl = document.querySelector('#profilePic img');
  if(imgEl && Math.random() < 0.5){
    imgEl.src = 'images/extracted/profile-cat-alt.jpg';
  }
})();

// pick a random favorite quote, changes on every refresh - revealed via the quote button
(function(){
  const favQuotes = [
    { text: "-unless I am myself, I am nobody.", author: "Virginia Woolf" },
    { text: "she saw the world not always as it was, but as perhaps it could be.", author: "Cinderella" },
    { text: "Be like water.", author: "Bruce Lee" },
    { text: "We can drive it home with one headlight.", author: "The Wallflowers" }
  ];
  const popup = document.getElementById('quotePopup');
  const btn = document.getElementById('quoteBtn');
  if(!popup || !btn) return;
  const q = favQuotes[Math.floor(Math.random() * favQuotes.length)];
  popup.innerHTML = '"' + q.text + '"<span class="fq-author">- ' + q.author + '</span>';
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    popup.classList.toggle('open');
  });
  document.addEventListener('click', (e)=>{
    if(!popup.contains(e.target) && e.target !== btn) popup.classList.remove('open');
  });
})();

gsap.to('#caret', {opacity:0, duration:.5, repeat:-1, yoyo:true, ease:'steps(1)'});

function splitWords(el){
  const text = el.innerHTML;
  const parts = text.split(/(<span class="grad">|<\/span>)/);
  el.innerHTML = '';
  let inGrad = false;
  parts.forEach(p=>{
    if(p === '<span class="grad">'){ inGrad = true; return; }
    if(p === '</span>'){ inGrad = false; return; }
    p.split(' ').forEach((w,i,arr)=>{
      if(w==='') return;
      const wrap = document.createElement('span');
      wrap.style.display='inline-block'; wrap.style.overflow='hidden';
      const inner = document.createElement('span');
      inner.style.display='inline-block';
      inner.textContent = w + (i<arr.length-1?'\u00A0':'');
      if(inGrad) inner.classList.add('grad');
      wrap.appendChild(inner);
      el.appendChild(wrap);
      el.appendChild(document.createTextNode(' '));
    });
  });
  return el.querySelectorAll('span > span');
}
const words = splitWords(document.getElementById('heroTitle'));

const tl = gsap.timeline({paused:true, defaults:{ease:'power4.out'}});
tl.from('.quote-btn-wrap', {opacity:0, y:-10, duration:.55})
  .from('#profilePic', {opacity:0, scale:.5, duration:.6, ease:'back.out(1.8)'}, '-=.3')
  .from('.prompt-line', {opacity:0, x:-16, duration:.45}, '-=.25')
  .from(words, {yPercent:110, opacity:0, duration:.7, stagger:.025}, '-=.1')
  .from('#heroTag', {y:18, opacity:0, duration:.6}, '-=.35')
  .from('#heroCta a', {y:14, opacity:0, duration:.45, stagger:.08}, '-=.3')
  .from('.glow', {opacity:0, scale:.6, duration:1.2, stagger:.12}, '-=1');

gsap.to('#profilePic', {y:-8, duration:3.5, repeat:-1, yoyo:true, ease:'sine.inOut'});

// "hi, i'm katrina" types itself in place, right where it lives in the hero -
// everything else in the hero stays hidden (via the tl.from calls above) until typing finishes
(function(){
  const typedEl = document.getElementById('typedText');
  const cursorEl = document.getElementById('typeCursor');
  const secretEl = document.getElementById('introSecret');
  const fullText = "hi, i'm katrina";

  const cursorBlink = gsap.to(cursorEl, {opacity:0, duration:.5, repeat:-1, yoyo:true, ease:'steps(1)'});
  gsap.set(secretEl, {y:10});

  let i = 0;
  function typeNext(){
    if(i <= fullText.length){
      typedEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeNext, 46 + Math.random()*26);
    } else {
      // typing done - stop the blink and remove the cursor entirely
      cursorBlink.kill();
      gsap.to(cursorEl, {opacity:0, duration:.2, onComplete:()=>{ cursorEl.style.display = 'none'; }});
      gsap.to(secretEl, {opacity:1, y:0, duration:.5, delay:.2, ease:'power2.out',
        onComplete: ()=>{
          gsap.delayedCall(.6, ()=> tl.play());
        }
      });
    }
  }
  setTimeout(typeNext, 200);
})();
// fallback in case something above ever fails to fire
setTimeout(()=>{ if(!tl.isActive() && tl.progress() === 0) tl.play(); }, 4000);

// all projects modal
const modalOverlay = document.getElementById('modalOverlay');
const seeMoreBtn = document.getElementById('seeMoreBtn');
const modalClose = document.getElementById('modalClose');

function openModal(){
  if(!modalOverlay) return;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  gsap.fromTo(modalOverlay.querySelector('.modal-box'), {y:18, opacity:0}, {y:0, opacity:1, duration:.25, ease:'power3.out'});
  modalOverlay.querySelectorAll('video').forEach(v=>{ v.play().catch(()=>{}); });
}
function closeModal(){
  if(!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
if(seeMoreBtn) seeMoreBtn.addEventListener('click', openModal);
if(modalClose) modalClose.addEventListener('click', closeModal);
if(modalOverlay) modalOverlay.addEventListener('click', (e)=>{ if(e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

// project detail modal - shared by the main-page cards and the "all projects" list
const PROJECT_GIFS = {
  'parallel': 'images/extracted/gif-parallel.gif',
  'leetfield': 'images/extracted/gif-leetfield.gif',
  'lawgic': 'images/extracted/gif-lawgic.gif',
  'genesis': 'images/extracted/gif-genesis.gif'
};
document.querySelectorAll('img[data-gif]').forEach(function(im){ var k = im.getAttribute('data-gif'); if (PROJECT_GIFS[k]) im.src = PROJECT_GIFS[k]; });
// badge previews (data-gif-badge) - same store, but badge has no gif for course audit so preview stays hidden
document.querySelectorAll('img[data-gif-badge]').forEach(function(im){ var k = im.getAttribute('data-gif-badge'); if (PROJECT_GIFS[k]) im.src = PROJECT_GIFS[k]; });
const DRONE_PDF = "images/extracted/drone-report.pdf";
const projectsData = {
  parallel: {
    title: 'Parallel Computing for Hospitals',
    sub: '// R · Slurm · Bridges-2 Supercomputer · Linux',
    desc: "Parallelized healthcare data processing on the Bridges-2 Supercomputer using 256+ CPU cores, cutting execution time by 85%+. Implemented Slurm to automate resource allocation, optimizing memory usage by 35%, and used the R Parallel package to convert serial algorithms into parallel processes handling 10,000+ computations - all while maintaining 99.9% pipeline reliability on 2TB+ memory nodes.",
    tags: ['R','Slurm','Bridges-2','Linux'],
    video: PROJECT_GIFS['parallel']
  },
  leetfield: {
    title: 'LeetField',
    sub: '// React · TypeScript · GSAP · Gemini API',
    desc: "Led the full-stack integration of a Stardew Valley-esque, LeetCode-gamified platform for Girls Who Code, cutting user blockage time by ~40%. Built a modular frontend and backend accessing 2,500+ algorithmic problems, 15+ reusable components, and 5 protected routes with React Router, plus a Gemini-powered tutoring service delivering debugging feedback in under 500ms.",
    tags: ['React','TypeScript','GSAP','Gemini API','Vite'],
    video: PROJECT_GIFS['leetfield']
  },
  drone: {
    title: 'Phantom Wall: The Drone Dilemma',
    sub: '// Computer Vision · LiDAR Spoofing · Fluid Dynamics · Oak Ridge National Lab',
    desc: "Engineered a $15.8k non-kinetic drone neutralization system proposal sponsored by Oak Ridge National Laboratory. The Phantom Wall creates a hydro-projection of a fake wall onto a laminar water screen to exploit autonomous drone obstacle-avoidance sensors (LiDAR, VSLAM), triggering the stop-and-hover protocol and forcing a controlled descent as battery depletes to 10%. Includes a full web-based Three.js simulation, system architecture, real-time AI surface tracking (MIDAS), and annotated literature review.",
    tags: ['Computer Vision','LiDAR','Fluid Dynamics','Three.js','Python','AI','Oak Ridge NL'],
    video: 'https://www.youtube.com/embed/_lH-aE0-N80',
    youtube: true,
    pdf: true
  },
  genesis: {
    title: 'Genesis AI',
    sub: '// Reimagine Reality · Redefine Recovery',
    desc: "A senior design project exploring how immersive, AI-assisted mixed reality can make physical rehabilitation more engaging and effective - reimagining what recovery can look and feel like for patients.",
    tags: ['VR/AR', 'AI', 'Capstone'],
    video: PROJECT_GIFS['genesis']
  },
  lawgic: {
    title: 'Lawgic',
    sub: '// Full-Stack AI Legal Assistant',
    desc: "Built a full-stack AI legal assistant that started as a 36-hour hackathon challenge at KnightHacks VIII. Securely integrated the Google Gemini API into a Python backend to drive all the AI features, with a React frontend giving lawyers a simple, concise interface to navigate tasks - including file upload, a human-in-the-middle review step, and email suggestions.",
    tags: ['Gemini API', 'React', 'Python', 'Full-Stack', 'Hackathon'],
    video: PROJECT_GIFS['lawgic']
  },
  courseaudit: {
    title: 'Course Audit Tool',
    sub: '// C · Automation · Data Parsing',
    desc: "A C program that automates auditing university courses by parsing Excel sheets and verifying data against institutional listings.",
    tags: ['C', 'Automation', 'Data Parsing'],
    video: null
  },
  lexer: {
    title: 'C Implementation of a Lexical Scanner (Lexer)',
    sub: '// C · Compilers · Lexical Analysis · UCF',
    desc: "Built with my project partner Jhanel: a complete lexical analyzer (scanner) from scratch in ANSI C - the first essential phase of a compiler front-end, reading a PL/0 source file character by character and converting the stream of characters into a stream of tokens. The scanner parses and identifies every language lexeme, including reserved words (begin, if), identifiers, numbers, and special symbols (:=, <>), while correctly recognizing and ignoring whitespace, newlines, and multi-line block comments (/* ... */). It manages a lexeme table to store recognized tokens and their types, producing a clean token list for the next compiler phase (the parser), and integrates robust error detection that scans the entire program and reports all lexical errors in a single pass - including invalid symbols, numbers exceeding 5 digits, and identifiers longer than 11 characters.",
    tags: ['C', 'Compilers', 'Lexical Analysis', 'State Machines', 'File I/O', 'Systems Programming'],
    video: null
  },
  awspipeline: {
    title: 'Cloud-Based Media Processor',
    sub: '// AWS · Lambda · S3 · Rekognition · Serverless',
    desc: "A simple AWS serverless pipeline using Lambda, S3, and Rekognition to process video uploads, generate thumbnails, and detect content - inspired by Disney's media library management. Built in November 2025 as my first step into cloud computing and getting my foot in the AWS door.",
    tags: ['AWS', 'Lambda', 'S3', 'Rekognition', 'Serverless'],
    video: null
  },
  foundationexam: {
    title: 'FEPrep Gamified',
    sub: '// Ongoing · Dec 2025-Present · Study Tools',
    desc: "A growing collection of projects I built to make studying for the Foundation Exam actually fun. Started in December 2025 and still ongoing - each mini-project turns a dry exam topic into something interactive, gamified, or just more engaging than reading a textbook.",
    tags: ['Ongoing', 'Gamification', 'Study Tools', 'Interactive', 'Dec 2025-Present'],
    video: null
  }
};

// Convert embedded data-URI videos to Blob URLs. Large base64 data URIs are
// unreliable for video elements in some browsers (WebKit especially can silently
// fail to decode them) even though the same technique works fine for images.
// Blob URLs sidestep that entirely.
function dataURItoBlobURL(dataURI){
  var commaIdx = dataURI.indexOf(',');
  var meta = dataURI.slice(5, commaIdx);
  var mime = meta.split(';')[0] || 'video/mp4';
  var byteString = atob(dataURI.slice(commaIdx + 1));
  var bytes = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) bytes[i] = byteString.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], {type: mime}));
}
// pre-convert project video data so every future use (modal, hover preview) gets a Blob URL
Object.keys(projectsData).forEach(function(key){
  var p = projectsData[key];
  if (p.video && p.video.indexOf('data:video') === 0) {
    try { p.video = dataURItoBlobURL(p.video); } catch(e) {}
  }
});
// convert any video elements already sitting in the page with a raw data: URI
document.querySelectorAll('video[src^="data:"]').forEach(function(v){
  try { v.src = dataURItoBlobURL(v.getAttribute('src')); } catch(e) {}
});

const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalClose = document.getElementById('projectModalClose');
const projTitleEl = document.getElementById('projTitle');
const projSubEl = document.getElementById('projSub');
const projDescEl = document.getElementById('projDesc');
const projTagsEl = document.getElementById('projTags');
const projVideoBox = document.getElementById('projVideoBox');

function openProjectModal(id){
  const data = projectsData[id];
  if(!data || !projTitleEl || !projVideoBox || !projectModalOverlay) return;
  closeModal();
  projTitleEl.textContent = data.title;
  if(projSubEl) projSubEl.textContent = data.sub;
  if(projDescEl) projDescEl.textContent = data.desc;
  if(projTagsEl) projTagsEl.innerHTML = data.tags.map(t => '<span>' + t + '</span>').join('');
  const projPdfBox = document.getElementById('projPdfBox');
  const projPdfFrame = document.getElementById('projPdfFrame');
  if(data.video){
    projVideoBox.classList.add('has-media');
    if(data.youtube){
      projVideoBox.innerHTML = '<iframe src="' + data.video + '?autoplay=1&rel=0" style="width:100%;height:100%;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    } else if(data.video.indexOf('data:image/gif') === 0 || /\.gif($|\?)/i.test(data.video)){
      projVideoBox.innerHTML = '<img src="' + data.video + '" alt="' + data.title + ' demo" style="width:100%;height:100%;object-fit:cover;display:block;">';
    } else {
      projVideoBox.innerHTML = '<video autoplay loop muted playsinline src="' + data.video + '"></video>';
    }
  } else {
    projVideoBox.classList.remove('has-media');
    projVideoBox.innerHTML = '<div class="play-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div><span>video coming soon</span>';
  }
  if(data.pdf && projPdfBox && projPdfFrame){
    projPdfBox.style.display = 'block';
    projPdfFrame.src = DRONE_PDF;
  } else if(projPdfBox){
    projPdfBox.style.display = 'none';
    if(projPdfFrame) projPdfFrame.src = '';
  }
  projectModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  gsap.fromTo(projectModalOverlay.querySelector('.modal-box'), {y:18, opacity:0}, {y:0, opacity:1, duration:.25, ease:'power3.out'});
  const projVid = projVideoBox.querySelector('video');
  if(projVid) projVid.play().catch(()=>{});
}
function closeProjectModal(){
  if(!projectModalOverlay) return;
  projectModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-project]').forEach(el=>{
  el.addEventListener('click', ()=> openProjectModal(el.dataset.project));
  el.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openProjectModal(el.dataset.project); } });
});
if(projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
if(projectModalOverlay) projectModalOverlay.addEventListener('click', (e)=>{ if(e.target === projectModalOverlay) closeProjectModal(); });

// generic simple-modal wiring for the hobby trio (tv / radio / marquee)
function wireSimpleModal(triggerId, overlayId, closeId){
  const trigger = document.getElementById(triggerId);
  const overlay = document.getElementById(overlayId);
  const closeBtn = document.getElementById(closeId);
  if(!trigger || !overlay || !closeBtn) return;
  function open(){
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlay.querySelector('.modal-box'), {y:18, opacity:0}, {y:0, opacity:1, duration:.25, ease:'power3.out'});
    const cards = overlay.querySelectorAll('.hobby-card, .collage-tile, .album-sq, .book-item');
    if(cards.length) gsap.fromTo(cards, {y:12, opacity:0}, {y:0, opacity:1, duration:.25, stagger:.035, delay:.04, ease:'power3.out'});
  }
  function close(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
}
wireSimpleModal('tvBtn', 'showsModalOverlay', 'showsModalClose');
wireSimpleModal('radioBtn', 'songsModalOverlay', 'songsModalClose');
wireSimpleModal('marqueeBtn', 'musicalsModalOverlay', 'musicalsModalClose');
wireSimpleModal('globeBtn', 'globeModalOverlay', 'globeModalClose');
wireSimpleModal('booksBtn', 'booksModalOverlay', 'booksModalClose');

const resumeBtn = document.getElementById('resumeBtn');
if(resumeBtn) resumeBtn.addEventListener('click', (e)=> e.preventDefault());
wireSimpleModal('resumeBtn', 'resumeModalOverlay', 'resumeModalClose');


// broadway sign lights up on hover
const marqueeBtn = document.getElementById('marqueeBtn');
const marqueeBulbs = document.querySelectorAll('#marqueeBulbs circle');
if(marqueeBtn && marqueeBulbs.length){
  gsap.set(marqueeBulbs, {opacity:.35});
  marqueeBtn.addEventListener('mouseenter', ()=>{
    gsap.to(marqueeBulbs, {opacity:1, duration:.25, stagger:.05, ease:'power1.out'});
  });
  marqueeBtn.addEventListener('mouseleave', ()=>{
    gsap.to(marqueeBulbs, {opacity:.35, duration:.4, stagger:.03});
  });
}

gsap.to('.glow', {y:'+=40', duration:9, repeat:-1, yoyo:true, ease:'sine.inOut', stagger:1});

gsap.utils.toArray('.reveal').forEach((el)=>{
  gsap.from(el, {
    y:50, opacity:0, duration:.8, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 88%', toggleActions:'play none none reverse' }
  });
});

gsap.utils.toArray('.org-card').forEach((el,i)=>{
  gsap.from(el, {
    y:24, opacity:0, duration:.4, delay:i*.03, ease:'power3.out',
    scrollTrigger:{ trigger:'.orgs-grid', start:'top 88%' }
  });
});

document.querySelectorAll('.proj').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    gsap.to(card, {rotateX: y*-4, rotateY: x*4, duration:.4, ease:'power2.out', transformPerspective:800});
  });
  card.addEventListener('mouseleave', ()=>{
    gsap.to(card, {rotateX:0, rotateY:0, duration:.5, ease:'power2.out'});
  });
});
