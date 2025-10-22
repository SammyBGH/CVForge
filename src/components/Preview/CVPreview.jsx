import React from "react";
import "../../styles/Preview.css";

export default function CVPreview({ data }) {
  const { personalInfo = {}, summary, experience = [], education = [], skills = [], extras = {} } = data || {};
  const awards = (extras.awards || []).filter(Boolean);
  const certifications = (extras.certifications || []).filter(Boolean);
  const projects = (extras.projects || []).filter(Boolean);

  return (
    <div className="cv-preview">
      <header className="cv-head">
        <div className="cv-name">{personalInfo.name || "Your Name"}</div>
        <div className="cv-contact">
          {personalInfo.email || "email@example.com"} • {personalInfo.phone || "+233 ..."} • {personalInfo.location || "City, Country"}
        </div>
      </header>

      {summary && (
        <section className="cv-section">
          <h4>Professional Summary</h4>
          <p className="cv-summary">{summary}</p>
        </section>
      )}

      <section className="cv-section">
        <h4>Experience</h4>
        {experience.map((e, idx) => (
          <div key={e.id || idx} className="cv-item">
            <div className="cv-item-head">
              <strong>{e.title || "Job Title"}</strong>
              <span className="muted">{(e.startDate || "") + (e.endDate ? ` - ${e.endDate}` : "")}</span>
            </div>
            <div className="muted">{[e.company, e.location].filter(Boolean).join(" • ")}</div>
            {Array.isArray(e.achievements) && e.achievements.filter(Boolean).length > 0 && (
              <ul>
                {e.achievements.filter(Boolean).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h4>Education</h4>
        {education.map((ed, i) => (
          <div key={ed.id || i} className="cv-item">
            <div className="cv-item-head">
              <strong>{ed.degree || "Degree / Cert"}</strong>
              <span className="muted">{(ed.startDate || "") + (ed.endDate ? ` - ${ed.endDate}` : "")}</span>
            </div>
            <div className="muted">{ed.institution}</div>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h4>Skills</h4>
        <div className="skills-wrap">
          {skills.filter(Boolean).map((s, i) => (
            <span key={i} className="skill-pill">{s}</span>
          ))}
        </div>
      </section>

      <section className="cv-section extras-section">
        {(awards.length > 0 || certifications.length > 0 || projects.length > 0) && (
          <h4>Additional Information</h4>
        )}

        {awards.length > 0 && (
          <div className="extras-block extras-awards">
            <strong>Awards</strong>
            <ul className="extras-list">
              {awards.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="extras-block extras-certs">
            <strong>Certifications</strong>
            <ul className="extras-list">
              {certifications.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        )}

        {projects.length > 0 && (
          <div className="extras-block extras-projects-block">
            <strong>Projects</strong>
            <div className="extras-projects">
              {projects.map((p, i) => (
                <div key={i} className="project-item">
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
