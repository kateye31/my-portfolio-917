const IMG = "/images/extracted";

export const RESUME = `${IMG}/katrina-adewale-resume.pdf`;
export const DRONE_PDF = `${IMG}/drone-report.pdf`;

export const links = {
  email: "katwale797@gmail.com",
  github: "https://github.com/kateye31",
  linkedin: "https://linkedin.com/in/katrina-adewale",
};

export const quotes = [
  { text: "-unless I am myself, I am nobody.", author: "Virginia Woolf" },
  { text: "she saw the world not always as it was, but as perhaps it could be.", author: "Cinderella" },
  { text: "Be like water.", author: "Bruce Lee" },
  { text: "We can drive it home with one headlight.", author: "The Wallflowers" },
];

export const profilePics = [`${IMG}/katrina-s-profile-picture.jpg`, `${IMG}/profile-cat-alt.jpg`];

export const projects = [
  {
    id: "genesis",
    icon: "genesis",
    label: "genesis ai",
    title: "Genesis AI",
    sub: "Reimagine Reality · Redefine Recovery",
    short: "A senior design project reimagining physical rehabilitation through immersive, AI-assisted mixed reality.",
    desc: "A senior design project exploring how immersive, AI-assisted mixed reality can make physical rehabilitation more engaging and effective - reimagining what recovery can look and feel like for patients.",
    tags: ["VR/AR", "AI", "Capstone"],
    media: `${IMG}/gif-genesis.gif`,
    featured: true,
  },
  {
    id: "drone",
    icon: "drone",
    label: "phantom wall",
    title: "Phantom Wall: The Drone Dilemma",
    sub: "Computer Vision · LiDAR Spoofing · Fluid Dynamics · Oak Ridge National Lab",
    short: "An Oak Ridge-sponsored drone collision-avoidance system built with Python/PyTorch and ROS 2.",
    desc: "Engineered a $15.8k non-kinetic drone neutralization system proposal sponsored by Oak Ridge National Laboratory. The Phantom Wall creates a hydro-projection of a fake wall onto a laminar water screen to exploit autonomous drone obstacle-avoidance sensors (LiDAR, VSLAM), triggering the stop-and-hover protocol and forcing a controlled descent as battery depletes to 10%. Includes a full web-based Three.js simulation, system architecture, real-time AI surface tracking (MIDAS), and annotated literature review.",
    tags: ["Computer Vision", "LiDAR", "Fluid Dynamics", "Three.js", "Python", "AI", "Oak Ridge NL"],
    youtube: "https://www.youtube.com/embed/_lH-aE0-N80",
    pdf: DRONE_PDF,
    featured: true,
  },
  {
    id: "parallel",
    icon: "parallel",
    label: "parallel computing",
    title: "Parallel Computing for Hospitals",
    sub: "R · Slurm · Bridges-2 Supercomputer · Linux",
    short: "Parallelized healthcare data processing on the Bridges-2 Supercomputer using 256+ CPU cores, cutting execution time by 85%+.",
    desc: "Parallelized healthcare data processing on the Bridges-2 Supercomputer using 256+ CPU cores, cutting execution time by 85%+. Implemented Slurm to automate resource allocation, optimizing memory usage by 35%, and used the R Parallel package to convert serial algorithms into parallel processes handling 10,000+ computations - all while maintaining 99.9% pipeline reliability on 2TB+ memory nodes.",
    tags: ["R", "Slurm", "Bridges-2", "Linux"],
    media: `${IMG}/gif-parallel.gif`,
    featured: true,
  },
  {
    id: "awspipeline",
    icon: "cloud",
    label: "cloud processor",
    title: "Cloud-Based Media Processor",
    sub: "AWS · Lambda · S3 · Rekognition · Serverless",
    short: "A simple AWS serverless pipeline using Lambda, S3, and Rekognition to process video uploads, generate thumbnails, and detect content. My first step into cloud computing - getting my foot in the AWS door. (Nov 2025)",
    desc: "A simple AWS serverless pipeline using Lambda, S3, and Rekognition to process video uploads, generate thumbnails, and detect content - inspired by Disney's media library management. Built in November 2025 as my first step into cloud computing and getting my foot in the AWS door.",
    tags: ["AWS", "Lambda", "S3", "Rekognition", "Serverless"],
    note: "no preview available unfortunately",
    featured: true,
  },
  {
    id: "foundationexam",
    icon: "book",
    label: "feprep gamified",
    title: "FEPrep Gamified",
    sub: "Ongoing · Dec 2025-Present · Study Tools",
    short: "A growing collection of mini-projects built to make studying for the Foundation Exam actually fun. Started December 2025 and still ongoing - turning dry exam topics into something interactive and gamified.",
    desc: "A growing collection of projects I built to make studying for the Foundation Exam actually fun. Started in December 2025 and still ongoing - each mini-project turns a dry exam topic into something interactive, gamified, or just more engaging than reading a textbook.",
    tags: ["Ongoing", "Gamification", "Study Tools", "Interactive", "Dec 2025-Present"],
    note: "ongoing project · no preview yet",
    featured: true,
  },
  {
    id: "leetfield",
    icon: "code",
    label: "leetfield",
    title: "LeetField",
    sub: "React · TypeScript · GSAP · Gemini API",
    short: "Full-stack gamified LeetCode-prep platform for Girls Who Code - 2,500+ problems and a Gemini-powered debugging tutor.",
    desc: "Led the full-stack integration of a Stardew Valley-esque, LeetCode-gamified platform for Girls Who Code, cutting user blockage time by ~40%. Built a modular frontend and backend accessing 2,500+ algorithmic problems, 15+ reusable components, and 5 protected routes with React Router, plus a Gemini-powered tutoring service delivering debugging feedback in under 500ms.",
    tags: ["React", "TypeScript", "GSAP", "Gemini API", "Vite"],
    media: `${IMG}/gif-leetfield.gif`,
    featured: true,
  },
  {
    id: "lawgic",
    icon: "scales",
    label: "lawgic",
    title: "Lawgic",
    sub: "Full-Stack AI Legal Assistant",
    short: "A full-stack AI legal assistant built at KnightHacks VIII, powered by the Gemini API with a React frontend.",
    desc: "Built a full-stack AI legal assistant that started as a 36-hour hackathon challenge at KnightHacks VIII. Securely integrated the Google Gemini API into a Python backend to drive all the AI features, with a React frontend giving lawyers a simple, concise interface to navigate tasks - including file upload, a human-in-the-middle review step, and email suggestions.",
    tags: ["Gemini API", "React", "Python", "Full-Stack", "Hackathon"],
    media: `${IMG}/gif-lawgic.gif`,
    featured: true,
  },
  {
    id: "lexer",
    icon: "code",
    label: "lexer",
    title: "C Implementation of a Lexical Scanner (Lexer)",
    sub: "C · Compilers · Lexical Analysis · UCF",
    short: "Developed with my project partner Jhanel: a complete lexical analyzer built from scratch in ANSI C - the first phase of a compiler front-end, reading a PL/0 source file and converting it into a stream of tokens, with full lexeme recognition, comment/whitespace handling, and single-pass error detection.",
    desc: "Built with my project partner Jhanel: a complete lexical analyzer (scanner) from scratch in ANSI C - the first essential phase of a compiler front-end, reading a PL/0 source file character by character and converting the stream of characters into a stream of tokens. The scanner parses and identifies every language lexeme, including reserved words (begin, if), identifiers, numbers, and special symbols (:=, <>), while correctly recognizing and ignoring whitespace, newlines, and multi-line block comments (/* ... */). It manages a lexeme table to store recognized tokens and their types, producing a clean token list for the next compiler phase (the parser), and integrates robust error detection that scans the entire program and reports all lexical errors in a single pass - including invalid symbols, numbers exceeding 5 digits, and identifiers longer than 11 characters.",
    tags: ["C", "Compilers", "Lexical Analysis", "State Machines", "File I/O", "Systems Programming"],
  },
  {
    id: "courseaudit",
    icon: "audit",
    label: "course audit",
    title: "Course Audit Tool",
    sub: "C · Automation · Data Parsing",
    short: "A C program that automates auditing university courses by parsing Excel sheets and verifying data against institutional listings.",
    desc: "A C program that automates auditing university courses by parsing Excel sheets and verifying data against institutional listings.",
    tags: ["C", "Automation", "Data Parsing"],
    featured: true,
  },
];

export const experience = [
  {
    group: "Industry Experience",
    note: "internships, shadows & incoming roles",
    items: [
      { img: "lockheed-martin-logo.png", logo: true, date: "Incoming 2026", title: "IIoT Solutions Engineer", org: "Lockheed Martin", desc: "Incoming role focused on investigating and reviewing digital transformation principles in support of IIoT (Industrial Internet of Things) and production manufacturing. Developing dashboard analytics UX for business area insights, and integrating solutions as part of an AWS Cloud solution set.", tags: ["IIoT", "AWS", "UX", "Digital Transformation", "Manufacturing"] },
      { img: "rf-smart.jpg", date: "Aug 2026", title: "Industry Shadow", org: "RF-Smart", desc: "Shadowed the team at RF-Smart in Jacksonville, sat in on a scrum meeting and toured their office as part of the Knight Shadow program.", tags: ["Agile", "Scrum", "Industry"] },
      { img: "ucf-transfer-connect.jpg", date: "2025 - now", title: "Software Engineer Intern", org: "UCF Transfer Connect", desc: "Automated Excel lookups across 40,000+ cells (+200% efficiency), cut data-inconsistency detection time 50%+ across 300+ files, and shipped a tool processing 3,000+ data points in seconds.", tags: ["Excel Automation", "Python", "Data Tools"] },
      { img: "spatial-analysis-lab.jpg", date: "Jan - May '26", title: "Data Science Research Intern", org: "Spatial Analysis Lab", desc: "Applied Python statistics and modeling to study how natural disasters affect resource availability; co-authored a research paper.", tags: ["Python", "Statistics", "Research"] },
      { img: "us-hunger-logo.png", logo: true, date: "Aug 2026", title: "Industry Shadow", org: "US Hunger", desc: "Shadowed the team at US Hunger in Orlando, getting a look at how the nonprofit runs its day-to-day operations as part of the Knight Shadow program.", tags: ["Nonprofit", "Operations", "Industry"] },
      { img: "metil-lab.png", date: "Dec '25 - Jan '26", title: "Software Development Research Intern", org: "METIL Lab", desc: "Engineered a $15.8k defense system proposal for autonomous drone-related collisions that impacts civilians, sponsored by the Oak Ridge National Laboratory, and implemented a pipeline using Python/PyTorch and ROS 2. Optimized AI-based computer vision and fluid mechanics to mitigate V-SLAM optical flow vulnerabilities, targeted a 99% collision-avoidance success rate in real-time simulations", tags: ["PyTorch", "ROS 2", "Computer Vision"] },
    ],
  },
  {
    group: "Hackathons & Competitions",
    note: "competing, leading & showing up",
    items: [
      { img: "horse-plinko-banner.jpg", date: "Sep 2026", title: "Horse Plinko Organizer", org: "Hack@UCF", desc: "Organized and ran the Horse Plinko Cybersecurity Challenge at Hack@UCF, coordinating the Blue Team competition logistics and event operations.", tags: ["Event Ops", "Cybersecurity", "Blue Team", "Hack@UCF"] },
      { img: "shellhacks-banner.gif", date: "Sep 25-27, 2026", title: "ShellHacks", org: "Florida International University · INIT FIU", desc: "Florida's largest hackathon at FIU - a 36-hour sprint bringing together 1,200+ hackers from across the globe. Sponsors include Google, Microsoft, Amazon, and Meta. Upcoming.", tags: ["1,200+ Attendees", "36-Hour Hackathon", "MLH"] },
      { img: "knight-hacks-ix.webp", date: "Oct 9-11, 2026", title: "Knight Hacks IX", org: "Knight Hacks · UCF", desc: "UCF's annual 36-hour hackathon drawing 700+ attendees from universities across Florida including FIU, UF, and USF. Sponsors included Geico, Morgan & Morgan, and Royal Bank of Canada.", tags: ["700+ Attendees", "36-Hour Hackathon", "UCF"] },
      { img: "siemens-energy-logo.png", logo: true, date: "2026", title: "HackSTEM Innovation Program", org: "Siemens Energy", desc: "A 16-week innovation program for Florida college students, taking participants from ideation through development to pitching - covering Florida's energy ecosystem, technology, business models, and communication. Grand prize includes a 1-year Siemens Energy Development Program.", tags: ["Energy Tech", "Innovation", "16 Weeks", "IIoT"] },
      { img: "bsides-jacksonville-2024.jpg", logo: true, logoBg: "#2b1d4a", date: "Nov 2025", title: "Guest Speaker Assistant & On-site Organizer", org: "BSides Jax", desc: "Ran logistics for 15+ volunteers and 250+ attendees, keeping 6+ speaker sessions at zero downtime across a 43,000 sq ft venue.", tags: ["Event Ops", "Logistics"] },
      { img: "knight-hacks-viii-banner.png", date: "Oct 24-26, 2025", title: "Knight Hacks VIII", org: "Knight Hacks · UCF", desc: "My first hackathon - and I ended up becoming the team leader. Jumped in, took charge, and built something under pressure alongside my team in a 24-hour sprint.", tags: ["Leadership", "Hackathon", "Team Lead"] },
      { img: "horse-plinko-banner-1.jpg", date: "Oct 2025", title: "Horse Plinko Cybersecurity Challenge", org: "Hack@UCF", desc: "Led a 4-person team in a 6-hour Blue Team cybersecurity challenge. Engineered Linux-based security defenses and mitigated 20+ hacking techniques.", tags: ["Linux", "SSH", "Blue Team", "Cybersecurity"] },
    ],
  },
  {
    group: "Conferences",
    note: "industry events & showcases",
    items: [
      { img: "i-itsec.jpg", date: "Dec 3-4, 2025", title: "Conference Attendee", org: "I/ITSEC", desc: "Attended I/ITSEC at the Orange County Convention Center, one of the biggest modeling, simulation and training events in the world. Tickets were provided by METIL Lab. I learned so much and got to network with people in the field.", tags: ["Networking", "M&S", "Defense Tech"] },
    ],
  },
].map((g) => ({ ...g, items: g.items.map((i) => ({ ...i, img: `${IMG}/${i.img}` })) }));

export const orgs = [
  { img: `${IMG}/mission-stem-logo.jpg`, name: "UCF STEM Ambassador", roles: [["Ambassador", "2026"]] },
  { img: `${IMG}/t-learn-logo.png`, name: "T-LEARN Scholar", roles: [["Scholar", "2025"]] },
  { img: `${IMG}/knight-research-scholars-program-logo.png`, name: "Knight Research Scholar", roles: [["Research Scholar", "2025-2026"], ["Co-Author", "2026"]] },
  { img: `${IMG}/hack-ucf-logo.jpg`, name: "Hack@UCF", roles: [["Active Member", "2025-2026"], ["Blue-Team Competitor", "2025"], ["Organizer", "2026"]] },
  { img: `${IMG}/girls-who-code-logo.jpg`, name: "Girls Who Code", roles: [["Active Member", "2025-2026"], ["Full Stack Dev", "2025"]] },
  { img: `${IMG}/bsides-florida-logo.jpg`, name: "BSides Florida", roles: [["Volunteer", "2025-2026"], ["Organizer", "2025-2026"]] },
  { img: `${IMG}/weecs-logo.jpg`, name: "WEECS", bg: "#f0c0cc", roles: [["Active Member", "2025-2026"], ["Project Dev", "2026"]] },
  { img: "/images/knight_hacks_logo.jpg", name: "Knight Hacks", bg: "#0f0f17", roles: [["Hackathon Attendee", "2025-2026, ×3"]] },
  { img: `${IMG}/knight-shadow-logo.jpg`, name: "Knight Shadow", roles: [["Participant", "2026"]] },
];

export const skills = [
  ["languages", "C, C++, CSS, HTML5, Java, JavaScript, LaTeX, PowerShell, Python, R, TypeScript"],
  ["frameworks", "React, Next.js, Node.js, Tailwind, PyTorch, AWS, Three.js"],
  ["concepts", "AI/ML, Computer Vision, Parallel Computing, CI/CD"],
  ["interpersonal", "Leadership, Communication, Adaptable, Teamwork, Time Management, Active Collaboration"],
];

export const education = {
  degrees: [
    { name: "B.S. Computer Science", school: "University of Central Florida", when: "2025 - Dec 2027 (Expected)" },
    { name: "A.S. Computer Science", school: "Florida Atlantic University", when: "2022 - 2024" },
  ],
  degreeTags: ["Florida Bright Futures Scholar", "2022-Present"],
  awards: [
    { name: "Knight Research Scholar", meta: "University of Central Florida · Sep 2026" },
    { name: "T-LEARN Scholar", meta: "University of Central Florida · May 2026" },
    { name: "Dean's List", meta: "Florida Atlantic University · Dec 2024" },
    { name: "AI for Work and Life", meta: "Univ. of North Florida · Nov 2025", id: "a68e780849824b38b236c71514fb1496" },
  ],
  coursework: [
    "Entrepreneurship for Defense",
    "Data Structures & Algorithms I",
    "Data Structures & Algorithms II",
    "Object-Oriented Programming",
    "Robot Vision",
    "Cyber Defense Analysis",
    "Managing IT Integration",
  ],
};

const albumFiles = [
  ["eternal-sunshine-album-cover.jpg", "Eternal Sunshine"],
  ["all-i-want-is-you-album-cover.jpg", "All I Want Is You"],
  ["doo-wops-hooligans-album-cover.jpg", "Doo-Wops & Hooligans"],
  ["hit-me-hard-and-soft-album-cover.jpg", "Hit Me Hard and Soft"],
  ["never-for-ever-album-cover.jpg", "Never for Ever"],
  ["parachutes-album-cover.jpg", "Parachutes"],
  ["am-album-cover.jpg", "AM"],
  ["californication-album-cover.jpg", "Californication"],
  ["the-eminem-show-album-cover.jpg", "The Eminem Show"],
  ["anti-album-cover.jpg", "ANTI"],
  ["the-lumineers-album-cover.jpg", "The Lumineers"],
  ["the-best-of-sade-album-cover.jpg", "The Best of Sade"],
  ["uprising-album-cover.jpg", "Uprising"],
  ["hatful-of-hollow-album-cover.jpg", "Hatful of Hollow"],
  ["did-you-know-that-there-s-a-tunnel-under.jpg", "Did You Know That There's a Tunnel Under Ocean Blvd"],
  ["ok-computer-album-cover.jpg", "OK Computer"],
  ["the-stranger-album-cover.jpg", "The Stranger"],
  ["third-eye-blind-album-cover.jpg", "Third Eye Blind"],
  ["songs-about-jane-album-cover.jpg", "Songs About Jane"],
  ["in-between-dreams-album-cover.jpg", "In Between Dreams"],
  ["demon-days-album-cover.jpg", "Demon Days"],
  ["stankonia-album-cover.jpg", "Stankonia"],
  ...[
    "album-cover.jpg", "album-cover.png", "album-cover-1.png", "album-cover-1.jpg", "album-cover-2.png",
    "album-cover-2.jpg", "album-cover-3.jpg", "album-cover-3.png", "album-cover-4.png", "album-cover-4.jpg",
    "album-cover-5.jpg", "album-cover-6.jpg", "album-cover-7.jpg", "album-cover-8.jpg", "album-cover-9.jpg",
    "album-cover-5.png", "album-cover.webp", "album-cover-6.png", "album-cover-10.jpg", "album-cover-11.jpg",
    "album-cover-12.jpg", "album-cover-13.jpg", "album-cover-14.jpg", "album-cover-15.jpg", "album-cover-16.jpg",
    "album-cover-17.jpg", "album-cover-7.png", "album-cover-18.jpg", "album-cover-19.jpg", "album-cover-20.jpg",
    "album-cover-21.jpg", "album-cover-22.jpg",
  ].map((f) => [f, "album cover"]),
];

const showFiles = [
  "show.webp", "show.jpg", "show-1.jpg", "show-1.webp", "show-2.webp", "show.avif", "show-1.avif",
  "show-3.webp", "show-2.jpg", "show-3.jpg", "show-4.jpg", "show-4.webp", "show-5.webp", "show-2.avif",
];

const bookFiles = [
  "book-cover.jpg", "book-cover-1.jpg", "book-cover-2.jpg", "book-cover-3.jpg", "book-cover-4.jpg", "book-cover-5.jpg",
  "book-cover-6.jpg", "book-cover-7.jpg", "book-cover-8.jpg", "book-cover.webp", "book-cover-9.jpg",
];

export const favs = [
  {
    id: "tv",
    label: "the tv",
    title: "What I've been watching",
    sub: "my favourite shows & movies",
    images: showFiles.map((f) => ({ src: `${IMG}/${f}`, alt: "show" })),
  },
  {
    id: "radio",
    label: "the radio",
    title: "What's on the radio",
    sub: "my fav albums - you recognize any :>? Let me know!",
    images: albumFiles.map(([f, a]) => ({ src: `${IMG}/${f}`, alt: `${a} album cover` })),
  },
  {
    id: "marquee",
    label: "showtime",
    title: "Front row seats",
    sub: "my favorite musicals",
    images: [
      ["wicked-poster.jpg", "Wicked"],
      ["hadestown-poster.jpg", "Hadestown"],
      ["beetlejuice-poster.jpg", "Beetlejuice"],
      ["hamilton-poster.jpg", "Hamilton"],
      ["maybe-happy-ending-poster.jpg", "Maybe Happy Ending"],
    ].map(([f, a]) => ({ src: `${IMG}/${f}`, alt: `${a} poster` })),
    text: "I love watching musicals. I have seen Wicked, The Lion King, and Maybe Happy Ending in person in New York City. I have also participated in a high school play in my school's Mamma Mia, it was so fun. I took theater for 3 years and even won the Drama Award in middle school. So I love acting - definitely. I even made some homemade videos as a kid and I still do today. I think all my years in the theater industry contribute to who I am and my confidence. I love getting to know new people and just really having fun doing the simple things in life.",
  },
  {
    id: "globe",
    label: "the globe",
    title: "Passport stamps",
    sub: "coming soon",
    images: [],
    text: "Coming soon - travel blog from my past trips to Spain, Hawaii, California, NYC, Maine, and more :>.",
  },
  {
    id: "books",
    label: "the shelf",
    title: "What's on my shelf",
    sub: "my favs and some current reads",
    images: bookFiles.map((f) => ({ src: `${IMG}/${f}`, alt: "book cover" })),
  },
];

export const heroPhoto = { src: `${IMG}/katrina-holding-a-capuchin-monkey-in-fro.jpg`, alt: "Katrina holding a capuchin monkey in front of a pink building" };
