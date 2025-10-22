import React, { useContext } from "react";
import { CVContext } from "../../context/CVContext";
import "../../styles/FormSteps.css";

export default function SkillsSection() {
  const { cv, updateCv } = useContext(CVContext);

  const addSkill = () => updateCv(prev => ({ ...prev, skills: [...prev.skills, ""] }));
  const setSkill = (i, val) => updateCv(prev => ({ ...prev, skills: prev.skills.map((s, idx) => idx===i?val:s) }));
  const removeSkill = (i) => updateCv(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx!==i) }));

  return (
    <section className="form-block">
      <h3>Skills</h3>
      {cv.skills.map((s, idx) => (
        <div className="skill-row" key={idx}>
          <input value={s} onChange={e => setSkill(idx, e.target.value)} placeholder="Skill (e.g. JavaScript)" />
          <button className="small-remove" onClick={() => removeSkill(idx)}>✕</button>
        </div>
      ))}
      <button className="btn-add" onClick={addSkill}>+ Add Skill</button>
    </section>
  );
}
