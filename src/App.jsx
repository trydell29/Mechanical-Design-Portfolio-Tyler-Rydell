import { useEffect, useRef, useState } from "react";
import { site, about, projects, experience, leadership, awards, skills } from "./content.js";
import { Geo, Divider } from "./Geometry.jsx";

const GEO = {
  ara: ["flange", "geo--top"],
  head: ["linkage", "geo--bottom geo--sink"],
  lidar: ["compass", "geo--top geo--small"],
  resonance: ["pulleys", "geo--bottom geo--sink"],
};

// Feeds scroll progress into CSS: --page-p on <html> for the progress bar,
// and --p (0 to 1) on every [data-geo] element as it travels up the screen.
function useScrollVars() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--page-p", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      document.querySelectorAll("[data-geo]").forEach((el) => {
        if (reduce) {
          el.style.setProperty("--p", "1");
          return;
        }
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75 + r.height * 0.4)));
        el.style.setProperty("--p", p.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}

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

// Silent clip that plays while it's on screen and pauses when scrolled away.
// Muted is set on the element directly so browsers (iOS included) allow autoplay.
function ScrollVideo({ src, poster }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      disablePictureInPicture
      preload="metadata"
    />
  );
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
  const videos = (project.videos ?? []).map((v) => ({ video: v.src, poster: v.poster, caption: v.caption }));
  // With no extra renders, a single clip sits in the text column beside the main figure.
  const inlineVideo = project.gallery.length === 0 && videos.length === 1 ? videos[0] : null;
  const extras = [...(inlineVideo ? [] : videos), ...project.gallery];

  return (
    <section className="project" id={project.id} aria-labelledby={`${project.id}-title`}>
      {GEO[project.id] && <Geo kind={GEO[project.id][0]} className={GEO[project.id][1]} />}
      <div className="project__head" data-reveal>
        <h2 id={`${project.id}-title`}>
          <span className="wipe">{project.title}</span>
        </h2>
        {project.status && <span className="status">{project.status}</span>}
      </div>

      <div
        className={`project__body ${project.image.wide ? "project__body--wide" : ""} ${
          inlineVideo ? "project__body--inline-video" : ""
        }`}
      >
        <Figure project={project} active={active} setActive={setActive} />

        <div className="project__text" data-reveal>
          <p className="summary">{project.summary}</p>

          <ol className="callouts" onMouseLeave={() => setActive(null)}>
            {project.callouts.map((c, i) => (
              <li
                key={i}
                className={active === i ? "is-active" : ""}
                style={{ "--i": i }}
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

          {inlineVideo && (
            <figure className="inline-video">
              <ScrollVideo src={inlineVideo.video} poster={inlineVideo.poster} />
              {inlineVideo.caption && <figcaption>{inlineVideo.caption}</figcaption>}
            </figure>
          )}
        </div>
      </div>

      {extras.length > 0 && (
        <div
          className={`gallery ${
            project.videos?.length
              ? project.gallery.length
                ? "gallery--has-video"
                : "gallery--videos"
              : ""
          }`}
          data-reveal
        >
          {extras.map((item, i) =>
            item.video ? (
              <figure key={i} className="gallery__item gallery__item--video">
                <ScrollVideo src={item.video} poster={item.poster} />
                {item.caption && <figcaption>{item.caption}</figcaption>}
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
            {project.presentations.map((item, i) => (
              <figure key={item.src} className="presented__item" style={{ "--i": i }}>
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

function SectionHead({ id, children }) {
  return (
    <div className="project__head section__head" data-reveal>
      <h2 id={id}>
        <span className="wipe">{children}</span>
      </h2>
    </div>
  );
}

function Role({ role, i }) {
  return (
    <li className={`role ${role.bullets ? "role--major" : ""}`} style={{ "--i": i }}>
      <div className="role__top">
        <h4>{role.title}</h4>
        <span className="role__dates">{role.dates}</span>
      </div>
      {role.bullets && (
        <ul className="role__bullets">
          {role.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <Divider />
      <SectionHead id="experience-title">Experience</SectionHead>
      {experience.map((e) => (
        <div key={e.org} className="org" data-reveal>
          <div className="org__name">
            <h3>{e.org}</h3>
            <span>{e.place}</span>
          </div>
          <ol className="timeline">
            {e.roles.map((r, i) => (
              <Role key={r.title} role={r} i={i} />
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}

function Leadership() {
  return (
    <section className="section" id="leadership" aria-labelledby="leadership-title">
      <Divider />
      <SectionHead id="leadership-title">Leadership and awards</SectionHead>
      <div className="lead" data-reveal>
        <ol className="timeline">
          {leadership.map((r, i) => (
            <Role key={r.title} role={r} i={i} />
          ))}
        </ol>
        <div className="awards">
          <h3>Awards and honors</h3>
          <ul>
            {awards.map((a, i) => (
              <li key={a.title} style={{ "--i": i }}>
                <span className="awards__title">{a.title}</span>
                <span className="awards__meta">{[a.issuer, a.date].filter(Boolean).join(", ")}</span>
                {a.note && <span className="awards__note">{a.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Divider />
      <SectionHead id="skills-title">Skills</SectionHead>
      <div className="skills" data-reveal>
        {skills.map(([group, items], g) => (
          <div key={group} className="skills__group" style={{ "--i": g }}>
            <h3>{group}</h3>
            <ul>
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
            <div key={k} className={Array.isArray(v) ? "is-wide" : undefined}>
              <dt>{k}</dt>
              <dd>
                {Array.isArray(v) ? (
                  <ul className="facts__list">
                    {v.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  useScrollVars();
  const links = [
    site.email && { href: `mailto:${site.email}`, label: "Email" },
    site.linkedin && { href: site.linkedin, label: "LinkedIn" },
    site.github && { href: site.github, label: "GitHub" },
    site.resume && { href: site.resume, label: "Resume" },
  ].filter(Boolean);

  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>

      <div className="progress" aria-hidden="true" />

      <header className="hero">
        <Geo kind="compass" className="geo--hero" />
        <div className="wrap">
          <h1 className="hero__name" aria-label={site.name}>
            {site.name.split(" ").map((word, w) => (
              <span key={w} className="hero__word" aria-hidden="true">
                {word.split("").map((ch, i) => (
                  <span key={i} className="hero__char" style={{ "--i": w * 6 + i }}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <nav className="hero__index" aria-labelledby="project-list-title">
            <h2 id="project-list-title" className="hero__index-title">Projects</h2>
            <ul>
              {projects.map((p, i) => (
                <li key={p.id} style={{ "--i": i }}>
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
        {projects.map((p, i) => (
          <div key={p.id}>
            {i > 0 && <Divider />}
            <Project project={p} />
          </div>
        ))}
        <Experience />
        <Leadership />
        <Skills />
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <p className="footer__lead">{site.footer}</p>
          <ul className="footer__links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
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
