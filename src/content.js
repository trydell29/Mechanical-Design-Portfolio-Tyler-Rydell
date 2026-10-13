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
  resume: "", // later: put resume.pdf in /public and set this to "/resume.pdf"
};

// The "About me" banner near the top of the page.
export const about = {
  photo: { src: "/images/headshot.jpg", alt: "Portrait of Tyler Rydell" },
  heading: "About me",
  paragraphs: [
    "I came to Bergen to play baseball and study physical therapy. I found engineering there instead and switched majors.",
    "Now I'm an Engineering Science student, president of Bergen Robotics (our VEX U team), and I work in the college makerspace. Most of what I build moves: robotic hands, animatronics, and the fixtures and enclosures that hold them together. I'm transferring as a mechanical engineering major in Fall 2027, with a PhD in robotics as the long-term goal.",
  ],
  facts: [
    ["Studying", "Engineering Science, AS"],
    ["GPA", "4.0"],
    ["Leadership", "President, Bergen Robotics"],
    ["Honors", "Winn School of Honors, Phi Theta Kappa"],
  ],
};

export const projects = [
  {
    id: "ara",
    title: "ARA: Low-Cost Anthropomorphic Robotic Arm",
    short: "ARA robotic arm",
    meta: [
      ["When", "Summer 2026"],
      ["Team", "6 people"],
      ["Role", "Design lead, owned all electronics"],
      ["Controller", "ESP32"],
    ],
    summary:
      "A tendon-driven robotic arm built as a proof of concept for an affordable alternative to commercial prosthetic hands, at about $300 per unit.",
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
      { x: 45, y: 29, lx: 12, ly: 6, label: "Lit push button" },
      { x: 66, y: 81, lx: 94, ly: 96, label: "Charging port" },
    ],
    notes: [],
    result: "",
    video: "",
    gallery: [],
  },
];
