import Logo from "./components/Logo";
import siteConfig from "./siteConfig";

function MetaLink({ href, children }) {
  if (!href) return null;
  return (
    <a className="focus-ring" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

export default function App() {
  const telHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/\s+/g, "")}` : undefined;
  const mailHref = siteConfig.email ? `mailto:${siteConfig.email}` : undefined;

  return (
    <main className="container">
      {/* Hero */}
      <header className="hero">
        <Logo size={72} />
        <div>
          <h1>{siteConfig.name}</h1>
          <p className="role">{siteConfig.role}</p>

          {/* Contact / Meta */}
          <div className="meta">
            {siteConfig.location && <span>{siteConfig.location}</span>}
            <MetaLink href={mailHref}>{siteConfig.email}</MetaLink>
            <MetaLink href={telHref}>{siteConfig.phone}</MetaLink>
            <MetaLink href={siteConfig.linkedin}>LinkedIn</MetaLink>
            <MetaLink href={siteConfig.website}>Website</MetaLink>
          </div>

          {/* KPIs */}
          {Array.isArray(siteConfig.kpis) && siteConfig.kpis.length > 0 && (
            <div className="kpis">
              {siteConfig.kpis.map((k, i) => (
                <span className="kpi" key={i}>
                  <strong>{k.value}</strong>
                  <span>{k.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Profile Summary */}
      {Array.isArray(siteConfig.summary) && siteConfig.summary.length > 0 && (
        <section className="section">
          <h2>Profile</h2>
          <ul className="list">
            {siteConfig.summary.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Core Competencies */}
      <section className="section">
        <h2>Core Competencies</h2>

        <div className="grid-2">
          <div className="card">
            <h3>Skills</h3>
            <ul className="list">
              {siteConfig.skills?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>Tools</h3>
            <ul className="list">
              {siteConfig.tools?.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Languages</h3>
          <ul className="list">
            {siteConfig.languages?.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <h2>Experience</h2>
        <div>
          {siteConfig.experience?.map((exp, i) => (
            <div className="experience-item" key={i}>
              <div className="experience-meta">
                <h3>{exp.title}</h3>
                <span className="muted">— {exp.company}</span>
                <span className="period">{exp.period}</span>
              </div>
              <ul className="list">
                {exp.points?.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section">
        <h2>Education & Certifications</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Education</h3>
            <ul className="list">
              {siteConfig.education?.map((e, i) => (
                <li key={i}>
                  <strong>{e.title}</strong> — {e.org} ({e.period})
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Certifications</h3>
            <ul className="list">
              {siteConfig.certifications?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="hr" />

      <footer className="muted" style={{ marginTop: 8, fontSize: 14 }}>
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </footer>
    </main>
  );
}
