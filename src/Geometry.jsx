// Decorative drafting geometry. Each shape draws itself in as it scrolls
// into view: every stroke uses pathLength=1 and a delay (--d, 0 to 1), and
// the scroll handler in App.jsx feeds the element's progress in as --p.

const S = ({ d = 0, accent = false, ...rest }) => ({
  pathLength: 1,
  className: accent ? "g-accent" : undefined,
  style: { "--d": d },
  ...rest,
});

function Compass() {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const t = (i * 10 * Math.PI) / 180;
    const r1 = i % 3 === 0 ? 146 : 152;
    return (
      <line
        key={i}
        x1={200 + r1 * Math.cos(t)}
        y1={200 + r1 * Math.sin(t)}
        x2={200 + 160 * Math.cos(t)}
        y2={200 + 160 * Math.sin(t)}
        {...S({ d: 0.35 + i * 0.008 })}
      />
    );
  });
  return (
    <svg viewBox="0 0 400 400">
      <line x1="0" y1="200" x2="400" y2="200" {...S({ d: 0 })} />
      <line x1="200" y1="0" x2="200" y2="400" {...S({ d: 0.05 })} />
      <circle cx="200" cy="200" r="190" {...S({ d: 0.1 })} />
      <circle cx="200" cy="200" r="100" {...S({ d: 0.2 })} />
      <circle cx="200" cy="200" r="40" {...S({ d: 0.28 })} />
      <g className="g-spin">{ticks}</g>
      <path d="M 125 70 A 150 150 0 0 1 341 149" {...S({ d: 0.55, accent: true })} />
      <g className="g-orbit">
        <circle cx="300" cy="200" r="6" className="g-node g-node--accent" style={{ "--d": 0.7 }} />
      </g>
      <circle cx="200" cy="200" r="4" className="g-node" style={{ "--d": 0.3 }} />
    </svg>
  );
}

function Flange() {
  const holes = [
    [200, 82],
    [302.2, 141],
    [302.2, 259],
    [200, 318],
    [97.8, 259],
    [97.8, 141],
  ];
  return (
    <svg viewBox="0 0 400 400">
      <circle cx="200" cy="200" r="175" {...S({ d: 0 })} />
      <circle cx="200" cy="200" r="118" strokeDasharray="0.01 0.02" className="g-dash" style={{ "--d": 0.2 }} />
      <circle cx="200" cy="200" r="52" {...S({ d: 0.15 })} />
      <line x1="180" y1="200" x2="220" y2="200" {...S({ d: 0.25 })} />
      <line x1="200" y1="180" x2="200" y2="220" {...S({ d: 0.25 })} />
      {holes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="15" {...S({ d: 0.35 + i * 0.07, accent: i === 1 })} />
      ))}
    </svg>
  );
}

function Pulleys() {
  return (
    <svg viewBox="0 0 440 400">
      <circle cx="120" cy="210" r="80" {...S({ d: 0 })} />
      <circle cx="120" cy="210" r="22" {...S({ d: 0.1 })} />
      <circle cx="330" cy="170" r="42" {...S({ d: 0.15 })} />
      <circle cx="330" cy="170" r="10" {...S({ d: 0.22 })} />
      <path d="M119.2,130 L329.6,128" {...S({ d: 0.4, accent: true })} />
      <path d="M148.7,284.7 L345.1,209.2" {...S({ d: 0.5, accent: true })} />
      <line x1="120" y1="210" x2="330" y2="170" strokeDasharray="0.01 0.015" className="g-dash" style={{ "--d": 0.3 }} />
      <circle cx="120" cy="210" r="3.5" className="g-node" style={{ "--d": 0.3 }} />
      <circle cx="330" cy="170" r="3.5" className="g-node" style={{ "--d": 0.35 }} />
    </svg>
  );
}

function Linkage() {
  // A four-bar linkage: ground pivots A and D, crank AB, coupler BC, rocker CD.
  const A = [70, 310],
    B = [120, 190],
    C = [320, 140],
    D = [350, 310];
  const hatch = (x, y, dd) =>
    [0, 1, 2, 3, 4].map((k) => (
      <line key={k} x1={x - 22 + k * 10} y1={y + 16} x2={x - 30 + k * 10} y2={y + 26} {...S({ d: dd })} />
    ));
  return (
    <svg viewBox="0 0 420 360">
      <line x1={A[0] - 30} y1={A[1] + 16} x2={A[0] + 30} y2={A[1] + 16} {...S({ d: 0 })} />
      <line x1={D[0] - 30} y1={D[1] + 16} x2={D[0] + 30} y2={D[1] + 16} {...S({ d: 0.05 })} />
      {hatch(A[0], A[1], 0.08)}
      {hatch(D[0], D[1], 0.12)}
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} {...S({ d: 0.2 })} />
      <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} {...S({ d: 0.35, accent: true })} />
      <line x1={C[0]} y1={C[1]} x2={D[0]} y2={D[1]} {...S({ d: 0.5 })} />
      <circle cx={A[0]} cy={A[1]} r="68" strokeDasharray="0.01 0.02" className="g-dash" style={{ "--d": 0.55 }} />
      {[A, B, C, D].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" {...S({ d: 0.25 + i * 0.12 })} />
      ))}
      {[B, C].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className="g-node g-node--accent" style={{ "--d": 0.6 + i * 0.1 }} />
      ))}
    </svg>
  );
}

const SHAPES = { compass: Compass, flange: Flange, pulleys: Pulleys, linkage: Linkage };

export function Geo({ kind, className = "" }) {
  const Shape = SHAPES[kind];
  return (
    <div className={`geo ${className}`} data-geo aria-hidden="true">
      <Shape />
    </div>
  );
}

// A dimension-line style divider between projects.
export function Divider() {
  return (
    <div className="divider" data-geo aria-hidden="true">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none">
        <line x1="0" y1="20" x2="1000" y2="20" pathLength="1" style={{ "--d": 0 }} />
        <line x1="0" y1="8" x2="0" y2="32" pathLength="1" style={{ "--d": 0 }} />
        <line x1="1000" y1="8" x2="1000" y2="32" pathLength="1" style={{ "--d": 0.5 }} />
      </svg>
      <span className="divider__node" style={{ "--d": 0.25 }} />
    </div>
  );
}
