// All site text lives in this file. Edit freely; the layout updates on its own.
//
// Images and videos go in /public/images and are referenced as "/images/<file>".
// To add a video: drop the .mp4 into /public/images and set `video` below.
// To add photos: add entries to `gallery` ({ src, alt, caption }).
// Callouts: x/y is the feature the arrow points at, lx/ly is where the numbered
// circle sits. All are percentages of the main image (can go below 0 or above 100
// to sit outside the part).

export const site = {
  name: "Tyler Rydell",
  email: "trydell29@gmail.com",
  linkedin: "https://www.linkedin.com/in/tylerrydell",
  github: "https://github.com/trydell29",
  footer: "Seeking mechanical engineering internship opportunities for summer 2027.",
  resume: "", // later: put resume.pdf in /public and set this to "/resume.pdf"
};

// The "About me" section near the top of the page.
export const about = {
  photo: { src: "/images/headshot.jpg", alt: "Portrait of Tyler Rydell" },
  heading: "About me",
  paragraphs: [
    "I'm an Engineering Science student at Bergen Community College with a 4.0 GPA, transferring as a mechanical engineering major in Fall 2027. I design and build electromechanical systems: tendon-driven robotic hands, animatronics, precision fixtures, and the electronics that run them.",
    "I came to Bergen to play baseball and study physical therapy, and found engineering instead. Since then I've led the design of a low-cost prosthetic arm that took first place out of 42 teams and went on to the Northeast Robotics Colloquium at Princeton, and built prototypes as an engineering intern at Flores Engineering. Today I teach soldering and 3D printing at Bergen's STEM Research Center and lead Bergen Robotics, our VEX U team.",
    "Long term, I'm working toward a PhD in robotics.",
  ],
  facts: [
    ["Education", "A.S. Engineering Science, Bergen CC, 2027"],
    ["GPA", "4.0 / 4.0"],
    ["Leadership", "President, Bergen Robotics and STEAM Academics Association"],
    ["Honors", "Winn School of Honors, Phi Theta Kappa, 2x Dean's List"],
  ],
};

// Work and research history, newest first. Roles without bullets show as one line.
export const experience = [
  {
    org: "STEM Research Center, Bergen Community College",
    place: "Paramus, NJ",
    roles: [
      {
        title: "Research Volunteer, Bergen Anthropomorphic Robotic Arm Assessment (BARAA)",
        dates: "Sep 2026 – Present",
        bullets: [
          "Building a classification benchmark for the mechanical ability of humanoid and prosthetic arms, presented at the Northeast Robotics Colloquium (NERC) 2026 at Princeton",
        ],
      },
      { title: "Research Volunteer, 10-Meter Drop Tower", dates: "Sep 2026 – Present" },
      { title: "STEM Student Worker", dates: "Sep 2026 – Present" },
      { title: "3D Printing Instructor", dates: "Aug 2026 – Present" },
      {
        title: "Soldering Instructor",
        dates: "Apr 2026 – Present",
        bullets: ["Teach soldering technique to students across skill levels in the campus workshop"],
      },
      {
        title: "Summer Research Intern",
        dates: "May 2026 – Aug 2026",
        bullets: [
          "Delivered a prosthetic arm proof-of-concept prototype and research poster with a six-member team",
          "Won first place at the STEM Research Center poster competition against 41 other teams across multiple institutions",
          "Owned embedded C++ firmware, circuit design, and most of the mechanical design while coordinating sub-teams to hit deadlines",
        ],
      },
      { title: "Research Volunteer, Anthropomorphic Robotic Arm", dates: "Oct 2025 – May 2026" },
    ],
  },
  {
    org: "Flores Engineering",
    place: "Kearny, NJ",
    roles: [
      {
        title: "Prototype Engineer / Lab Technician (Internship)",
        dates: "Jul 2026 – Sep 2026",
        bullets: [
          "Designed and iterated mechanical parts in Fusion 360, then fabricated and assembled prototypes in the shop",
          "Operated and maintained FDM and SLA 3D printers and a 3-axis CNC machine for in-shop fabrication",
          "Developed internal tooling and structured multi-variant BOMs to streamline inventory and part sourcing (project details under NDA)",
        ],
      },
    ],
  },
];

export const leadership = [
  {
    title: "President, Bergen Robotics (VEX U)",
    dates: "May 2026 – Present",
    bullets: [
      "Promoted to team lead by the coach after contributing to programming and CAD on the team's VEX U robot through a VEX Worlds run",
      "Coordinate design and programming sub-teams across deadlines and design constraints, keeping a stable shared codebase through robot iterations",
    ],
  },
  {
    title: "President, STEAM Academics Association",
    dates: "Dec 2025 – Present",
    bullets: [
      "Refocused the club on STEM learning beyond the classroom and on supporting students' paths into four-year programs",
      "Connected a fellow student with an NJIT admissions counselor and fee waiver; the student was admitted to Computer Science and enrolled in Fall 2026",
    ],
  },
];

export const awards = [
  "First Place, STEM Research Center Poster Competition (42 teams)",
  "Leadership Award, Office of Student Life",
  "Dean's List and Honors List, twice each",
  "Phi Theta Kappa Scholar",
];

export const skills = [
  ["Design and CAD", ["Onshape", "Fusion 360", "Mechanical design and iteration", "Additive manufacturing"]],
  ["Fabrication", ["FDM and SLA 3D printing", "3-axis CNC", "Soldering", "Mechanical assembly", "Hand tools"]],
  ["Electronics", ["Circuit prototyping", "Servos, steppers and drivers", "ESP32 and Arduino", "Power distribution"]],
  ["Languages", ["C/C++", "Python"]],
];

export const projects = [
  {
    id: "ara",
    title: "Low-Cost Humanoid Arm",
    short: "Humanoid arm",
    meta: [
      ["When", "Oct 2025 – Aug 2026"],
      ["Team", "6 people"],
      ["Role", "Lead: firmware, circuits, most mechanical design"],
      ["Controller", "ESP32"],
    ],
    summary:
      "A 12-DOF tendon-driven prosthetic arm, built as a proof of concept for an affordable alternative to commercial myoelectric hands at under $300 per unit.",
    image: { src: "/images/ara-full-arm.png", alt: "CAD render of the full ARA arm, red elbow joint, black forearm and hand", wide: true },
    callouts: [
      { x: 15, y: 62, lx: 24, ly: 128, label: "2-DOF elbow driven by custom 64:1 and 4:1 planetary gearboxes" },
      { x: 66, y: 52, lx: 58, ly: 128, label: "1-DOF servo wrist" },
      { x: 82, y: 43, lx: 74, ly: -28, label: "Direct-drive finger splay servos" },
      { x: 93, y: 18, lx: 98, ly: -28, label: "Tendon-driven fingers, fully 3D printed in PLA and PETG-CF" },
    ],
    notes: [
      "ESP32 control portal with manual, preset, and camera-based hand tracking modes",
    ],
    result:
      "First place out of 42 teams at a multi-institution STEM research poster competition. Presented the follow-up benchmark (BARAA) at the Northeast Robotics Colloquium at Princeton.",
    video: "", // e.g. "/images/ara-demo.mp4"
    gallery: [
      { src: "/images/ara-hand.png", alt: "CAD render of the ARA hand", caption: "Hand" },
      { src: "/images/ara-elbow.png", alt: "CAD render of the ARA elbow joint", caption: "Elbow joint" },
    ],
    // Photos from talks and poster sessions, shown under "Presented at".
    presentations: [
      {
        src: "/images/nerc-princeton.jpg",
        alt: "Tyler standing next to the BARAA research poster at the Northeast Robotics Colloquium",
        title: "Northeast Robotics Colloquium (NERC), Princeton University",
        caption: "October 2026. Presented BARAA, our benchmark for the mechanical ability of humanoid and prosthetic arms, with this arm as the first reference design.",
      },
      {
        src: "/images/bergen-poster-competition.jpg",
        alt: "Tyler next to the research poster and the working arm at the Bergen STEM poster competition",
        title: "Bergen STEM research poster competition",
        caption: "August 2026. First place out of 42 teams, with the working arm on display.",
      },
    ],
  },
  {
    id: "head",
    title: "Animatronic Head",
    short: "Animatronic head",
    meta: [
      ["When", "August 2026"],
      ["Team", "Solo"],
      ["Role", "Design, build, code"],
      ["Controller", "Arduino Uno R4"],
    ],
    summary:
      "A personal build to explore expressive motion: a 2-DOF neck and 2-DOF eyes driven by servo linkages, controllable by joystick or running autonomously.",
    image: { src: "/images/animatronic-head.png", alt: "CAD render of the animatronic head with two eyeballs on a servo-driven neck" },
    callouts: [
      { x: 16, y: 24, lx: -6, ly: 6, label: "2-DOF eyes in spherical housings" },
      { x: 52, y: 55, lx: 86, ly: 54, label: "Neck pivot" },
      { x: 30, y: 74, lx: -6, ly: 66, label: "Base servos drive the neck through pushrods" },
    ],
    notes: [],
    result: "",
    video: "", // e.g. "/images/head-demo.mp4"
    gallery: [],
  },
  {
    id: "lidar",
    title: "LiDAR Alignment Mount",
    short: "LiDAR alignment mount",
    meta: [
      ["When", "September 2026"],
      ["Team", "Solo design within Dr. Joseph Sivo's research team"],
      ["Role", "Mechanical and electrical design"],
      ["Controller", "Arduino Nano"],
    ],
    summary:
      "A precision mount for a LiDAR module used to measure the velocity and acceleration of falling objects and extract their drag coefficients.",
    image: { src: "/images/lidar-mount.png", alt: "CAD render of the LiDAR mount with alignment posts, push buttons and spring-loaded base" },
    callouts: [
      { x: 32, y: 8, lx: 12, ly: 6, label: "Alignment laser in a collimation-screw housing" },
      { x: 52, y: 10, lx: 70, ly: -5, label: "LiDAR module" },
      { x: 30, y: 39, lx: 8, ly: 30, label: "Panel-mount push buttons" },
      { x: 75, y: 46, lx: 95, ly: 34, label: "Micro USB port" },
      { x: 19, y: 54, lx: 5, ly: 76, label: "Spring-loaded mounting screws for a second stage of fine alignment" },
    ],
    notes: [
      "Integrated enclosure houses the electronics, with a panel-mount barrel jack for power",
    ],
    result: "",
    video: "",
    gallery: [
      // { src: "/images/lidar-photo.jpg", alt: "Built LiDAR mount", caption: "As built" },
    ],
  },
  {
    id: "resonance",
    title: "Resonance Finder",
    short: "Resonance finder",
    status: "In progress",
    meta: [
      ["When", "Fall 2026"],
      ["Team", "Solo honors project"],
      ["Advisor", "Dr. Neel Haldolaarachchige"],
      ["Controller", "ESP32-C3"],
    ],
    summary:
      "A self-contained, rechargeable wireless device for sound wave labs. It reads microphone data on a microcontroller and sends it to a student's iPhone to detect resonance states.",
    image: { src: "/images/resonance-finder.png", alt: "CAD render of the Resonance Finder enclosure with a lit push button" },
    callouts: [
      { x: 39.6, y: 22.2, lx: 10, ly: 4, label: "Microphone, mounted flush in the lid" },
      { x: 86.3, y: 35.7, lx: 104, ly: 22, label: "Hex screws hold the removable lid for access to the electronics" },
      { x: 73.3, y: 56, lx: 104, ly: 48, label: "USB-C port for charging and programming" },
      { x: 74.7, y: 71.3, lx: 104, ly: 80, label: "Power switch" },
    ],
    notes: [],
    result: "",
    video: "",
    gallery: [],
  },
];
