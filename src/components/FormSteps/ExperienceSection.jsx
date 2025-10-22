import React, { useContext } from "react";
import { CVContext } from "../../context/CVContext";
import { v4 as uuid } from "uuid";
import "../../styles/FormSteps.css";

export default function ExperienceSection() {
  const { cv, updateCv } = useContext(CVContext);

  const addExperience = () => {
    const newExp = { id: uuid(), title: "", company: "", location: "", startDate: "", endDate: "", achievements: [""] };
    updateCv(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id) => {
    updateCv(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const setField = (id, field, val) => {
    updateCv(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: val } : e)
    }));
  };

  const setAchievement = (expId, idx, val) => {
    updateCv(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId ? { ...e, achievements: e.achievements.map((a,i) => i===idx?val:a) } : e)
    }));
  };

  const addAchievement = (expId) => {
    updateCv(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId ? { ...e, achievements: [...e.achievements, ""] } : e)
    }));
  };

  const removeAchievement = (expId, idx) => {
    updateCv(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId ? { ...e, achievements: e.achievements.filter((_,i) => i!==idx) } : e)
    }));
  };

  return (
    <section className="form-block">
      <h3>Work Experience</h3>
      {cv.experience.map((exp) => (
        <div key={exp.id} className="repeat-block">
          <div className="repeat-head">
            <div className="repeat-title">Experience</div>
            <button className="remove-btn" onClick={() => removeExperience(exp.id)}>Remove</button>
          </div>

          <input placeholder="Job title" value={exp.title} onChange={e => setField(exp.id, "title", e.target.value)} />
          <input placeholder="Company" value={exp.company} onChange={e => setField(exp.id, "company", e.target.value)} />
          <div className="grid-2">
            <input placeholder="Location" value={exp.location} onChange={e => setField(exp.id, "location", e.target.value)} />
            <input placeholder="Start - End (e.g. 2021 - Present)" value={`${exp.startDate}${exp.endDate ? ' - ' + exp.endDate : ''}`} onChange={e => {
              // simple split: attempt to set start/end from combined input
              const val = e.target.value;
              const parts = val.split(" - ");
              setField(exp.id, "startDate", parts[0] ?? "");
              setField(exp.id, "endDate", parts[1] ?? "");
            }} />
          </div>

          <div className="achievements">
            <label>Achievements / responsibilities</label>
            {exp.achievements.map((a, idx) => (
              <div key={idx} className="ach-item">
                <input value={a} onChange={(e) => setAchievement(exp.id, idx, e.target.value)} placeholder="Describe an achievement or responsibility" />
                <button className="small-remove" onClick={() => removeAchievement(exp.id, idx)}>✕</button>
              </div>
            ))}
            <button className="add-small" onClick={() => addAchievement(exp.id)}>+ Add bullet</button>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addExperience}>+ Add Experience</button>
    </section>
  );
}
