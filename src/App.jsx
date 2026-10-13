import { useState } from "react";
import { site, projects } from "./content.js";

function Figure({ project, active, setActive }) {
  const { image, callouts } = project;
  return (
    <figure className={`figure ${image.wide ? "figure--wide" : ""}`}>
      <div className="figure__stage">
        <img src={image.src} alt={image.alt} />
        {callouts.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${active === i ? "is-active" : ""}`}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
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
      <div className="project__head">
        <h2 id={`${project.id}-title`}>{project.title}</h2>
        {project.status && <span className="status">{project.status}</span>}
      </div>

      <div className={`project__body ${project.image.wide ? "project__body--wide" : ""}`}>
        <Figure project={project} active={active} setActive={setActive} />

        <div className="project__text">
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
        <div className="gallery">
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
    </section>
  );
}

export default function App() {
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
          <h1 className="hero__name">{site.name}</h1>
          <p className="hero__tagline">{site.tagline}</p>
          <nav className="hero__index" aria-label="Projects">
            {projects.map((p) => (
              <a key={p.id} href={`#${p.id}`}>
                {p.short}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="work" className="wrap">
        {projects.map((p) => (
          <Project key={p.id} project={p} />
        ))}
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <p className="footer__lead">Looking for a summer 2027 engineering internship.</p>
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
