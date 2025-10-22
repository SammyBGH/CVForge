// Placeholder PDF utility — actual PDF generation will be implemented server-side.
// For now this helps prepare a payload to send to the backend
export function buildPayload(cv) {
  return {
    filename: `${(cv.personalInfo.name || "resume").replace(/\s+/g, "_")}_CV.pdf`,
    cv
  };
}
