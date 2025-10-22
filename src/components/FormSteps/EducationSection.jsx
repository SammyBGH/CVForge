import React, { useContext } from "react";
import { CVContext } from "../../context/CVContext";
import { v4 as uuid } from "uuid";
import "../../styles/FormSteps.css";

export default function EducationSection() {
  const { cv, updateCv } = useContext(CVContext);

  const addEdu = () => {
    const newEdu = { id: uuid(), institution: "", degree: "", startDate: "", endDate: "" };
    updateCv(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEdu = (id) => {
    updateCv(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const setField = (id, field, val) => {
    updateCv(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: val } : e)
    }));
  };

  return (
    <section className="form-block">
      <h3>Education</h3>
      {cv.education.map((edu) => (
        <div className="repeat-block" key={edu.id}>
          <div className="repeat-head">
            <div className="repeat-title">Education</div>
            <button className="remove-btn" onClick={() => removeEdu(edu.id)}>Remove</button>
          </div>

          <input placeholder="Institution" value={edu.institution} onChange={e => setField(edu.id, "institution", e.target.value)} />
          <input placeholder="Degree / Certificate" value={edu.degree} onChange={e => setField(edu.id, "degree", e.target.value)} />
          <div className="grid-2">
            <input placeholder="Start Date" value={edu.startDate} onChange={e => setField(edu.id, "startDate", e.target.value)} />
            <input placeholder="End Date" value={edu.endDate} onChange={e => setField(edu.id, "endDate", e.target.value)} />
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addEdu}>+ Add Education</button>
    </section>
  );
}
