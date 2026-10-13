import { useEffect, useRef, useState } from "react";
import { site, about, projects } from "./content.js";

// Adds "is-visible" to any [data-reveal] element once it scrolls into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Figure({ project, active, setActive }) {
  const { image, callouts } = project;
  return (
    <figure className={`figure ${image.wide ? "figure--wide" : ""}`} data-reveal>
      <div className="figure__stage">
        <img src={image.src} alt={image.alt} />
        <svg className="leaders" aria-hidden="true">
          {callouts.map((c, i) => {
            const lx = c.lx ?? c.x;
            const ly = c.ly ?? c.y;
            const isActive = active === i;
            return (
              <g key={i} className={isActive ? "is-active" : ""}>
                <line className="leaders__halo" pathLength="1" style={{ "--i": i }} x1={`${lx}%`} y1={`${ly}%`} x2={`${c.x}%`} y2={`${c.y}%`} />
                <line
                  className="leaders__line"
                  pathLength="1"
                  style={{ "--i": i }}
                  x1={`${lx}%`}
                  y1={`${ly}%`}
                  x2={`${c.x}%`}
                  y2={`${c.y}%`}
                />
              </g>
            );
          })}
        </svg>
        {callouts.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${active === i ? "is-active" : ""}`}
            style={{ left: `${c.lx ?? c.x}%`, top: `${c.ly ?? c.y}%`, "--i": i }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            aria-label={`${i + 1}: ${c.label}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </figure>
  );
}

function Project({ project }) {
  const [active, setActive] = useState(null);
  const extras = [
    ...(project.video ? [{ video: project.video }] : []),
    ...project.gallery,
  ];

  return (
    <section className="project" id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project__head" data-reveal>
        <h2 id={`${project.id}-title`}>{project.title}</h2>
        {project.status && <span className="status">{project.status}</span>}
      </div>

      <div className={`project__body ${project.image.wide ? "project__body--wide" : ""}`}>
        <Figure project={project} active={active} setActive={setActive} />

        <div className="project__text" data-reveal>
          <p className="summary">{project.summary}</p>

          <ol className="callouts" onMouseLeave={() => setActive(null)}>
            {project.callouts.map((c, i) => (
              <li
                key={i}
                className={active === i ? "is-active" : ""}
                onMouseEnter={() => setActive(i)}
              >
                <span className="callouts__num">{i + 1}</span>
                <span>{c.label}</span>
              </li>
            ))}
          </ol>

          {project.notes.length > 0 && (
            <ul className="notes">
              {project.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          {project.result && <p className="result">{project.result}</p>}

          <dl className="titleblock">
            {project.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {extras.length > 0 && (
        <div className="gallery" data-reveal>
          {extras.map((item, i) =>
            item.video ? (
              <figure key={i} className="gallery__item gallery__item--video">
                <video src={item.video} autoPlay muted loop playsInline controls />
              </figure>
            ) : (
              <figure key={i} className="gallery__item">
                <img src={item.src} alt={item.alt} loading="lazy" />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            )
          )}
        </div>
      )}
      {project.presentations?.length > 0 && (
        <div className="presented" data-reveal>
          <h3>Presented at</h3>
          <div className="presented__grid">
            {project.presentations.map((item) => (
              <figure key={item.src} className="presented__item">
                <img src={item.src} alt={item.alt} loading="lazy" />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="wrap about__inner" data-reveal>
        <img className="about__photo" src={about.photo.src} alt={about.photo.alt} />
        <div className="about__text">
          <h2 id="about-title">{about.heading}</h2>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="titleblock about__facts">
          {about.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  const links = [
    site.email && { href: `mailto:${site.email}`, label: "Email" },
    site.linkedin && { href: site.linkedin, label: "LinkedIn" },
    site.github && { href: site.github, label: "GitHub" },
    site.resume && { href: site.resume, label: "Resume" },
  ].filter(Boolean);

  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>

      <header className="hero">
        <div className="wrap">
          <h1 className="hero__name" data-reveal>{site.name}</h1>
          <nav className="hero__index" data-reveal aria-labelledby="project-list-title">
            <h2 id="project-list-title" className="hero__index-title">Projects</h2>
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`}>
                    <span className="hero__index-name">{p.short}</span>
                    <span className="hero__index-when">{p.meta.find(([k]) => k === "When")?.[1]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <About />

      <main id="work" className="wrap">
        {projects.map((p) => (
          <Project key={p.id} project={p} />
        ))}
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <p className="footer__lead">{site.footer}</p>
          <ul className="footer__links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
