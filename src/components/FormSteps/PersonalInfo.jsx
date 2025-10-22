import React, { useContext } from "react";
import { CVContext } from "../../context/CVContext";
import "../../styles/FormSteps.css";

export default function PersonalInfo() {
  const { cv, updateCv } = useContext(CVContext);

  const handle = (field, value) => {
    updateCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  return (
    <section className="form-block">
      <h3>Contact Information</h3>
      <div className="grid-2">
        <input value={cv.personalInfo.name} onChange={e => handle("name", e.target.value)} placeholder="Full name" />
        <input value={cv.personalInfo.email} onChange={e => handle("email", e.target.value)} placeholder="Professional email" />
        <input value={cv.personalInfo.phone} onChange={e => handle("phone", e.target.value)} placeholder="Phone (+233...)" />
        <input value={cv.personalInfo.location} onChange={e => handle("location", e.target.value)} placeholder="City, Country" />
        <input value={cv.personalInfo.linkedin} onChange={e => handle("linkedin", e.target.value)} placeholder="LinkedIn / Portfolio URL (optional)" />
      </div>
    </section>
  );
}
