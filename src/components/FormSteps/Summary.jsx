import React, { useContext } from "react";
import { CVContext } from "../../context/CVContext";
import "../../styles/FormSteps.css";

export default function Summary() {
  const { cv, updateCv } = useContext(CVContext);

  return (
    <section className="form-block">
      <h3>Professional Summary</h3>
      <textarea
        value={cv.summary}
        onChange={(e) => updateCv(prev => ({ ...prev, summary: e.target.value }))}
        placeholder="Brief 2-3 line summary of experience and goals"
        rows={4}
      />
    </section>
  );
}
