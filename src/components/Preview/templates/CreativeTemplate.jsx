import React from 'react';

const CreativeTemplate = ({ data = {} }) => {
  const { personalInfo = {}, summary, experience = [], education = [], skills = [], extras = {} } = data;
  const awards = (extras.awards || []).filter(Boolean);
  const certifications = (extras.certifications || []).filter(Boolean);
  const projects = (extras.projects || []).filter(Boolean);

  return (
    <div className="creative-cv">
      {/* Header Section */}
      <header className="creative-header">
        <div className="name-title">
          <h1>{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.title && <h2>{personalInfo.title}</h2>}
        </div>
        <div className="contact-info">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </header>

      {summary && (
        <section className="cv-section">
          <h4>Professional Summary</h4>
          <p className="cv-summary">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="cv-section">
          <h4>Experience</h4>
          {experience.map((e, idx) => (
            <div key={e.id || idx} className="cv-item">
              <div className="cv-item-head">
                <strong>{e.title || "Job Title"}</strong>
                <span className="muted">
                  {e.startDate || ''} {e.endDate ? `- ${e.endDate}` : ''}
                </span>
              </div>
              <div className="muted">
                {[e.company, e.location].filter(Boolean).join(" • ")}
              </div>
              {e.achievements?.length > 0 && (
                <ul>
                  {e.achievements.filter(Boolean).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="cv-section">
          <h4>Education</h4>
          {education.map((ed, i) => (
            <div key={ed.id || i} className="cv-item">
              <div className="cv-item-head">
                <strong>{ed.degree || "Degree / Cert"}</strong>
                <span className="muted">
                  {ed.startDate || ''} {ed.endDate ? `- ${ed.endDate}` : ''}
                </span>
              </div>
              <div className="muted">{ed.institution}</div>
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section className="cv-section">
          <h4>Skills</h4>
          <div className="skills-wrap">
            {skills.filter(Boolean).map((s, i) => (
              <span key={i} className="skill-pill">{s}</span>
            ))}
          </div>
        </section>
      )}

      {(awards.length > 0 || certifications.length > 0 || projects.length > 0) && (
        <section className="cv-section extras-section">
          <h4>Additional Information</h4>
          
          {awards.length > 0 && (
            <div className="extras-block">
              <strong>Awards</strong>
              <ul className="extras-list">
                {awards.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="extras-block">
              <strong>Certifications</strong>
              <ul className="extras-list">
                {certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {projects.length > 0 && (
            <div className="extras-block">
              <strong>Projects</strong>
              <ul className="extras-list">
                {projects.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
      
  );
};

// Set default props in case onPrint is not provided
CreativeTemplate.defaultProps = {
  onPrint: () => window.print()
};

export default CreativeTemplate;
