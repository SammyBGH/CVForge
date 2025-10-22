import React, { useContext, useState, useRef } from "react";
import "../styles/Builder.css";
import { CVContext } from "../context/CVContext";
import { useAuth } from "../context/AuthContext";
import PersonalInfo from "../components/FormSteps/PersonalInfo";
import Summary from "../components/FormSteps/Summary";
import ExperienceSection from "../components/FormSteps/ExperienceSection";
import EducationSection from "../components/FormSteps/EducationSection";
import SkillsSection from "../components/FormSteps/SkillsSection";
import ExtrasSection from "../components/FormSteps/ExtrasSection";
import CVPreview from "../components/Preview/CVPreview";
import { toast } from "react-toastify";

export default function Builder() {
  const { cv } = useContext(CVContext);
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const cvPreviewRef = useRef(null);

  const handleSaveCV = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ cvData: cv }),
      });

      if (!response.ok) {
        throw new Error("Failed to save CV");
      }

      toast.success("CV saved successfully!");
    } catch (error) {
      console.error("Error saving CV:", error);
      toast.error("Failed to save CV. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!cvPreviewRef.current) return;

    setIsGeneratingPdf(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [5, 8, 5, 8], // tighter margins (top, right, bottom, left)
        filename: `${
          cv.personalInfo?.name?.trim() || "CV"
        }_${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: null, // avoid white overlay issues
          logging: false,
          letterRendering: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      // Clone the preview node
      const element = cvPreviewRef.current.cloneNode(true);

      // Apply clean, print-safe styles
      element.style.padding = "0";
      element.style.margin = "0";
      element.style.boxSizing = "border-box";
      element.style.width = "190mm"; // fit content inside A4 minus margins
      element.style.background = "#ffffff";
      element.style.overflow = "visible";

      // Create temporary container
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "0";
      tempDiv.appendChild(element);
      document.body.appendChild(tempDiv);

      // Generate and save PDF
      await html2pdf().set(opt).from(element).save();

      // Cleanup
      document.body.removeChild(tempDiv);

      toast.success("CV downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="builder-page">
      <div className="builder-inner">
        <div className="builder-form">
          <h2 className="section-title">Build your CV</h2>
          <PersonalInfo />
          <Summary />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ExtrasSection />
        </div>

        <aside className="builder-preview">
          <div className="preview-wrap">
            <div ref={cvPreviewRef} className="cv-preview-container">
              <CVPreview data={cv} />
            </div>

            <div className="preview-actions">
              <button
                className="btn-primary"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? "Generating PDF..." : "Download PDF"}
              </button>

              <button
                className="btn-ghost"
                onClick={handleSaveCV}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : `Save${!user ? " (Sign in)" : ""}`}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
