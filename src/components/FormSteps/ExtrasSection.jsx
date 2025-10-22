import React, { useContext } from "react";
import { CVContext } from "../../context/CVContext";
import "../../styles/FormSteps.css";

function Repeater({ items, onChange, onAdd, onRemove, placeholder }) {
  return (
    <div className="extras-list">
      {items.map((it, i) => (
        <div className="skill-row" key={i}>
          <input value={it} onChange={(e) => onChange(i, e.target.value)} placeholder={placeholder} />
          <button className="small-remove" onClick={() => onRemove(i)}>✕</button>
        </div>
      ))}
      <button className="btn-add" onClick={onAdd}>+ Add</button>
    </div>
  );
}

export default function ExtrasSection() {
  const { cv, updateCv } = useContext(CVContext);

  const updateArray = (key, idx, val) => {
    updateCv(prev => ({ ...prev, extras: { ...prev.extras, [key]: prev.extras[key].map((v,i) => i===idx?val:v) } }));
  };

  const addTo = (key) => updateCv(prev => ({ ...prev, extras: { ...prev.extras, [key]: [...prev.extras[key], ""] } }));
  const removeFrom = (key, idx) => updateCv(prev => ({ ...prev, extras: { ...prev.extras, [key]: prev.extras[key].filter((_,i) => i!==idx) } }));

  return (
    <section className="form-block">
      <h3>Extras (optional)</h3>

      <div className="extras-group">
        <label>Awards</label>
        <Repeater
          items={cv.extras.awards}
          onChange={(i, val) => updateArray("awards", i, val)}
          onAdd={() => addTo("awards")}
          onRemove={(i) => removeFrom("awards", i)}
          placeholder="Award name & year"
        />
      </div>

      <div className="extras-group">
        <label>Certifications</label>
        <Repeater
          items={cv.extras.certifications}
          onChange={(i, val) => updateArray("certifications", i, val)}
          onAdd={() => addTo("certifications")}
          onRemove={(i) => removeFrom("certifications", i)}
          placeholder="Certification (e.g. AWS Certified)"/>
      </div>

      <div className="extras-group">
        <label>Projects</label>
        <Repeater
          items={cv.extras.projects}
          onChange={(i, val) => updateArray("projects", i, val)}
          onAdd={() => addTo("projects")}
          onRemove={(i) => removeFrom("projects", i)}
          placeholder="Project name • short description" />
      </div>
    </section>
  );
}
