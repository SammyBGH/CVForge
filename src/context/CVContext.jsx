import React, { createContext, useState } from "react";

export const CVContext = createContext(null);

const initialCV = {
  personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "" },
  summary: "",
  experience: [
    {
      id: "exp-1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      achievements: [""]
    }
  ],
  education: [
    { id: "edu-1", institution: "", degree: "", startDate: "", endDate: "" }
  ],
  skills: [""],
  extras: { awards: [""], certifications: [""], projects: [""] },
  template: "ClassicProfessional"
};

export function CVProvider({ children }) {
  const [cv, setCv] = useState(initialCV);

  const updateCv = (updater) => {
    setCv((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      return next;
    });
  };

  const resetCv = () => setCv(initialCV);

  return (
    <CVContext.Provider value={{ cv, setCv, updateCv, resetCv }}>
      {children}
    </CVContext.Provider>
  );
}
