import { useEffect, useState } from "react";
import AvatarToken from "./components/AvatarToken";
import Icon from "./components/Icon";
import siteConfig from "./siteConfig";

function getInitialLang() {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en" || saved === "de") return saved;
  }
  if (typeof navigator !== "undefined") {
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("de")) return "de";
    if (nav.startsWith("en")) return "en";
  }
  return "fr";
}

function LanguageToggle({ value, onChange, labels }) {
  const aria = labels?.toggleLabel || (value === "fr" ? "Langue" : "Language");
  return (
    <div
      aria-label={aria}
      role="group"
      style={{
        display: "inline-flex",
        border: "1px solid var(--color-neutral-200)",
        borderRadius: 999,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "var(--shadow-1)",
      }}
    >
      {["fr", "en", "de"].map((l) => {
        const active = value === l;
        return (
          <button
            key={l}
            type="button"
            className="focus-ring"
            onClick={() => onChange(l)}
            style={{
              padding: "6px 12px",
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              background: active ? "var(--color-accent)" : "transparent",
              color: active ? "#fff" : "var(--color-primary)",
              cursor: "pointer",
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function MetaLink({ href, children }) {
  if (!href) return null;
  const external = /^https?:\/\//i.test(href);
  return (
    <a
      className="focus-ring"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang());
  const [showOther, setShowOther] = useState(false);
  const t = siteConfig[lang];

  const fileBaseName = (siteConfig[lang]?.name || "CV")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_");

  function handleExportPDF() {
    // Uses print styles to produce a clean PDF
    window.print();
  }

  async function handleDownloadPDF() {
    const node = document.querySelector("main");
    if (!node || !window.html2pdf) return;

    // Apply export layout to preserve ratios and column proportions
    document.body.classList.add("export-pdf");
    node.classList.add("export-pdf");

    // Hide toolbar/buttons during capture
    const toolbars = document.querySelectorAll(".toolbar");
    const prevDisplays = [];
    toolbars.forEach((el) => {
      prevDisplays.push(el.style.display);
      el.style.display = "none";
    });

    try {
      const opt = {
        filename: `${fileBaseName}.pdf`,
        // Use millimeters for precise A4 sizing and margins
        margin: 10, // mm
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          backgroundColor: null
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: [".content-card", ".experience-item"] },
      };

      await window.html2pdf().from(node).set(opt).save();
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      // Restore toolbar visibility and remove export layout
      toolbars.forEach((el, i) => {
        el.style.display = prevDisplays[i] || "";
      });
      document.body.classList.remove("export-pdf");
      node.classList.remove("export-pdf");
    }
  }

  function handleExportWord() {
    try {
      const node = document.querySelector("main");
      if (!node) return;
      const clone = node.cloneNode(true);

      // Remove toolbar/buttons from export
      clone.querySelectorAll(".toolbar").forEach((el) => el.remove());

      // Ensure image sources are absolute
      clone.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src");
        if (src) {
          const abs = new URL(src, document.baseURI).href;
          img.setAttribute("src", abs);
        }
      });

      const styles = `
body { font-family: Arial, sans-serif; color: #0F172A; }
h1 { font-size: 28px; margin: 0 0 8px; }
h2 { font-size: 20px; margin: 24px 0 8px; }
h3 { font-size: 16px; margin: 12px 0 4px; }
.muted, .small-muted { color: #475569; }
.list, .bullets { padding-left: 18px; }
.section-title { text-transform: uppercase; font-size: 14px; letter-spacing: .08em; font-weight: 700; margin: 16px 0 6px; }
.section-rule { height: 1px; background: #E2E8F0; margin: 8px 0 16px; }
.experience-item { border-bottom: 1px solid #E2E8F0; padding: 10px 0; }
.experience-item:last-child { border-bottom: 0; }
.content-card { border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; }
.grid-2 { display: block; }
img { max-width: 100%; height: auto; }
      `.trim();

      const html =
        `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${document.title}</title>
<base href="${document.baseURI}">
<style>${styles}</style>
</head>
<body>` +
        clone.outerHTML +
        `</body></html>`;

      const blob = new Blob(["\ufeff", html], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileBaseName}.doc`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    } catch (err) {
      console.error("Word export failed", err);
    }
  }

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  // Sync document title and meta description
  useEffect(() => {
    const name = siteConfig[lang]?.name;
    const role = siteConfig[lang]?.role;
    if (name) {
      document.title = lang === "fr" ? `${name} — CV` : `${name} — CV / Portfolio`;
    }
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      const desc =
        lang === "fr"
          ? `${name || ""} — CV. ${role || ""}`
          : lang === "de"
          ? `${name || ""} — Lebenslauf / Portfolio. ${role || ""}`
          : `${name || ""} — CV / Portfolio. ${role || ""}`;
      meta.setAttribute("content", desc.trim());
    }
  }, [lang]);

  const telHref = t?.phone ? `tel:${t.phone.replace(/\s+/g, "")}` : undefined;
  const mailHref = t?.email ? `mailto:${t.email}` : undefined;
  const address = Array.isArray(t?.addressLines) && t.addressLines.length > 0
    ? t.addressLines.join(", ")
    : undefined;

  // Social icons from public/ (use BASE_URL-safe concatenation to avoid new URL() base error)
  // Hardcode project base for GitHub Pages to avoid missing prefix issues
  const linkedinIcon = "/moncv-portfolio/Linkedin.png";
  const pdfIcon = "/moncv-portfolio/pdf.png";
  const wordIcon = "/moncv-portfolio/word.png";

  // Company logos from public/ (GitHub Pages project base)
  const logoBase = "/moncv-portfolio/";
  const companyLogos = {
    "TEVEA RF Consulting": `${logoBase}tevearfconsulting_logo.png`,
    "Directskills": `${logoBase}directskills_logo.jpeg`,
    "Lowendalmasaï": `${logoBase}ayming_logo.jpeg`,
    "Trelleborg Sealing Solutions France": `${logoBase}trelleborg.jpeg`,
  };

  return (
    <main className="container">
      {/* Toolbar moved next to avatar in the sidebar */}

      {/* Two-column layout */}
      <div className="layout">
        {/* Sidebar (left) */}
        <aside className="sidebar">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AvatarToken
              size={128}
              photo={siteConfig.photo}
              initials={siteConfig.initials}
              title={t?.name || "Portrait"}
            />
          </div>
          <div className="lang-toggle" style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <LanguageToggle value={lang} onChange={setLang} labels={t?.ui} />
          </div>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <div style={{ fontFamily: "var(--font-title)", fontWeight: 800, fontSize: 18 }}>
              {t?.name}
            </div>
            <div className="small-muted">{t?.role}</div>
          </div>
          

          <div className="divider" />

          <h4>{t?.ui?.contact || (lang === "fr" ? "Coordonnées" : "Contact")}</h4>
          <ul className="contact-list">
            {t?.phone && (
              <li className="contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <Icon name="phone" size={14} />
                </span>
                <MetaLink href={telHref}>{t.phone}</MetaLink>
              </li>
            )}
            {t?.email && (
              <li className="contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <Icon name="mail" size={14} />
                </span>
                <MetaLink href={mailHref}>{t.email}</MetaLink>
              </li>
            )}
            {(address || t?.location) && (
              <li className="contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <Icon name="map" size={14} />
                </span>
                <span>
                  {[address, t?.location]
                    .filter(Boolean)
                    .join(address && t?.location ? ", " : "")}
                </span>
              </li>
            )}
            {t?.nationality && (
              <li className="contact-item small-muted">
                <span className="contact-icon" aria-hidden="true">
                  <Icon name="flag" size={14} />
                </span>
                <span>
                  {lang === "fr" ? "Nationalité: " : "Nationality: "}
                  {t.nationality}
                </span>
              </li>
            )}
          </ul>

          {Array.isArray(siteConfig.references) && siteConfig.references.length > 0 && (
            <>
              <div className="divider" />
              <h4>{lang === "fr" ? "Références" : "References"}</h4>
              <ul className="contact-list references-list">
                {siteConfig.references.map((r, i) => {
                  const tel = r.phone ? `tel:${r.phone.replace(/\s+/g, "")}` : undefined;
                  const mail = r.email ? `mailto:${r.email}` : undefined;
                  return (
                    <li key={i}>
                      <div className="contact-item">
                        <strong>{r.name}</strong>
                      </div>
                      {r.company && (
                        <div className="contact-item small-muted">
                          {companyLogos[r.company] ? (
                            <img
                              className="experience-logo"
                              src={companyLogos[r.company]}
                              alt={`${r.company} logo`}
                            />
                          ) : null}
                          <span>{r.company}</span>
                        </div>
                      )}
                      {r.phone && (
                        <div className="contact-item">
                          <span className="contact-icon" aria-hidden="true">
                            <Icon name="phone" size={14} />
                          </span>
                          <MetaLink href={tel}>{r.phone}</MetaLink>
                        </div>
                      )}
                      {r.email && (
                        <div className="contact-item">
                          <span className="contact-icon" aria-hidden="true">
                            <Icon name="mail" size={14} />
                          </span>
                          <MetaLink href={mail}>{r.email}</MetaLink>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <div className="divider" />
          <div
            className="toolbar"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            {siteConfig.links?.linkedin && (
              <a
                className="focus-ring"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                style={{
                  border: "1px solid var(--color-neutral-200)",
                  background: "#fff",
                  padding: "6px 10px",
                  borderRadius: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img src={linkedinIcon} alt="" style={{ width: 20, height: 20, display: "block" }} />
              </a>
            )}

            <button
              type="button"
              className="focus-ring"
              onClick={handleDownloadPDF}
              title={
                lang === "fr"
                  ? "Télécharger en PDF"
                  : lang === "de"
                  ? "Als PDF herunterladen"
                  : "Download PDF"
              }
              aria-label="Download PDF"
              style={{
                border: "1px solid var(--color-neutral-200)",
                background: "#fff",
                padding: "6px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <img src={pdfIcon} alt="" style={{ width: 20, height: 20, display: "block" }} />
            </button>

            <button
              type="button"
              className="focus-ring"
              onClick={handleExportPDF}
              title={lang === "fr" ? "Imprimer" : lang === "de" ? "Drucken" : "Print"}
              aria-label="Print"
              style={{
                border: "1px solid var(--color-neutral-200)",
                background: "#fff",
                padding: "6px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <Icon name="printer" size={20} />
            </button>

            <button
              type="button"
              className="focus-ring"
              onClick={handleExportWord}
              title={lang === "fr" ? "Exporter en Word" : lang === "de" ? "Als Word exportieren" : "Export as Word"}
              aria-label="Export Word"
              style={{
                border: "1px solid var(--color-neutral-200)",
                background: "#fff",
                padding: "6px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <img src={wordIcon} alt="" style={{ width: 20, height: 20, display: "block" }} />
            </button>
          </div>
          <div className="divider" />
          <footer className="small-muted" style={{ marginTop: 8, fontSize: 12, textAlign: "center" }}>
            © {new Date().getFullYear()} {t?.name}. All rights reserved.
          </footer>
        </aside>

        {/* Content (right) */}
        <section className="content-mobile-offset">
          {/* Header band */}
          <div className="header-band">
            <h1>{t?.name}</h1>
            <div className="role">{t?.role}</div>
          </div>

          {/* Profile */}
          {Array.isArray(t?.summary) && t.summary.length > 0 && (
            <div className="section">
              <div className="section-title">
                {t.ui?.profile || (lang === "fr" ? "Profil" : "Profile")}
              </div>
              <div className="section-rule" />
              <div className="content-card">
                <ul className="bullets">
                  {t.summary.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Experience */}
          {Array.isArray(t?.experience) && t.experience.length > 0 && (
            <div className="section">
              <div className="section-title">
                {t.ui?.experience || (lang === "fr" ? "Expérience" : "Experience")}
              </div>
              <div className="section-rule" />
              <div className="content-card">
                {t.experience.map((exp, i) => (
                  <div className="experience-item" key={i}>
                    <div className="experience-meta">
                      {companyLogos[exp.company] && (
                        <img
                          className="experience-logo"
                          src={companyLogos[exp.company]}
                          alt={`${exp.company} logo`}
                        />
                      )}
                      <h3>{exp.title}</h3>
                      <span className="muted">— {exp.company}</span>
                      {exp.period && <span className="period">{exp.period}</span>}
                    </div>
                    {Array.isArray(exp.points) && (
                      <ul className="list">
                        {exp.points.map((p, j) => (
                          <li key={j}>{p}</li>
                        ))}
                      </ul>
                    )}
                    {exp.about && (
                      <p className="muted" style={{ marginTop: 8 }}>
                        {exp.about}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Experiences (collapsible) */}
          {Array.isArray(t?.otherExperience) && t.otherExperience.length > 0 && (
            <div className="section">
              <div className="section-title">
                {t.ui?.other || (lang === "fr" ? "Autres expériences" : "Other experiences")}
              </div>
              <div className="section-rule" />
              <div className="content-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="muted">
                    {showOther
                      ? lang === "fr" ? "Réduire" : "Collapse"
                      : lang === "fr" ? "Déployer" : "Expand"}
                  </div>
                  <button
                    type="button"
                    className="focus-ring"
                    aria-expanded={showOther ? "true" : "false"}
                    aria-controls="other-exp"
                    onClick={() => setShowOther((v) => !v)}
                    style={{
                      border: "1px solid var(--color-neutral-200)",
                      borderRadius: 8,
                      background: "#fff",
                      padding: "2px 10px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    title={
                      showOther
                        ? (lang === "fr" ? "Réduire" : "Collapse")
                        : (lang === "fr" ? "Déployer" : "Expand")
                    }
                  >
                    {showOther ? "−" : "+"}
                  </button>
                </div>
                {showOther && (
                  <div id="other-exp" style={{ marginTop: 12 }}>
                    {t.otherExperience.map((exp, i) => (
                      <div className="experience-item" key={i}>
                    <div className="experience-meta">
                      {companyLogos[exp.company] && (
                        <img
                          className="experience-logo"
                          src={companyLogos[exp.company]}
                          alt={`${exp.company} logo`}
                        />
                      )}
                      <h3>{exp.title}</h3>
                      <span className="muted">— {exp.company}</span>
                      {exp.period && <span className="period">{exp.period}</span>}
                    </div>
                        {Array.isArray(exp.points) && (
                          <ul className="list">
                            {exp.points.map((p, j) => (
                              <li key={j}>{p}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Core Competencies */}
          {Array.isArray(t?.competencies) && t.competencies.length > 0 && (
            <div className="section">
              <div className="section-title">
                {t.ui?.competencies ||
                  (lang === "fr" ? "Compétences clés" : "Core Competencies")}
              </div>
              <div className="section-rule" />
              <div className="grid-2">
                {(() => {
                  const items = t.competencies;
                  const mid = Math.ceil(items.length / 2);
                  const col1 = items.slice(0, mid);
                  const col2 = items.slice(mid);
                  return (
                    <>
                      <div className="content-card">
                        <ul className="list">
                          {col1.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="content-card">
                        <ul className="list">
                          {col2.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Education */}
          {Array.isArray(t?.education) && t.education.length > 0 && (
            <div className="section">
              <div className="section-title">
                {t.ui?.education || (lang === "fr" ? "Formations" : "Education")}
              </div>
              <div className="section-rule" />
              <div className="content-card">
                <ul className="list">
                  {t.education.map((e, i) => (
                    <li key={i}>
                      <strong>{e.title}</strong>
                      {e.detail ? <> — {e.detail}</> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Languages & Interests */}
          {(Array.isArray(t?.languages) && t.languages.length > 0) ||
          (Array.isArray(t?.interests) && t.interests.length > 0) ? (
            <div className="section">
              <div className="grid-2">
                {Array.isArray(t?.languages) && t.languages.length > 0 && (
                  <div className="content-card">
                    <h3 style={{ marginTop: 0 }}>
                      {t.ui?.languages || (lang === "fr" ? "Langues" : "Languages")}
                    </h3>
                    <ul className="list">
                      {t.languages.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(t?.interests) && t.interests.length > 0 && (
                  <div className="content-card">
                    <h3 style={{ marginTop: 0 }}>
                      {t.ui?.interests ||
                        (lang === "fr" ? "Centres d’intérêt" : "Interests")}
                    </h3>
                    <ul className="list">
                      {t.interests.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : null}

        </section>
      </div>
    </main>
  );
}
