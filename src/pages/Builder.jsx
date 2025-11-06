import React, { useContext, useState, useRef, useEffect } from "react";
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

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
const PAYMENT_AMOUNT = 10; // 3.00 GHS in kobo (100 kobo = 1 GHS)

export default function Builder() {
  const { cv } = useContext(CVContext);
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const cvPreviewRef = useRef(null);

  // Check if user has already paid (you might want to implement server-side verification)
  useEffect(() => {
    // Check localStorage for payment status
    const paymentStatus = localStorage.getItem('cvBuilder_payment_status');
    if (paymentStatus === 'paid') {
      setHasPaid(true);
    }
  }, []);

  const handlePayment = () => {
    if (!user) {
      toast.error('Please sign in to make a payment');
      window.location.href = "/login";
      return;
    }

    setIsProcessingPayment(true);
    
    // Initialize Paystack
    const paystack = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email || 'user@example.com',
      amount: PAYMENT_AMOUNT * 100, // Convert to kobo
      currency: 'GHS',
      ref: 'CV_' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference
      onClose: function() {
        setIsProcessingPayment(false);
        toast.info('Payment was not completed');
      },
      callback: function(response) {
        // Verify payment on your server
        verifyPayment(response.reference);
      }
    });
    
    paystack.openIframe();
  };

  const verifyPayment = async (reference) => {
    try {
      // In a real app, you would verify this on your server
      // For now, we'll just simulate a successful verification
      // Replace this with an actual API call to your backend
      // const response = await fetch('/api/verify-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reference })
      // });
      // const data = await response.json();
      
      // For demo purposes, we'll assume payment is successful
      // In production, verify the payment status from your backend
      
      setHasPaid(true);
      localStorage.setItem('cvBuilder_payment_status', 'paid');
      toast.success('Payment successful! You can now download your CV.');
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast.error('Payment verification failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

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
      
      // Hide the template selector in the cloned element
      const templateSelector = element.querySelector('.template-selector');
      if (templateSelector) {
        templateSelector.style.display = 'none';
      }

      // Apply clean, print-safe styles to the CV preview
      const cvPreview = element.querySelector('.cv-preview');
      if (cvPreview) {
        cvPreview.style.padding = "0";
        cvPreview.style.margin = "0";
        cvPreview.style.boxSizing = "border-box";
        cvPreview.style.width = "210mm";
        cvPreview.style.background = "#ffffff";
        cvPreview.style.overflow = "visible";
      }

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
                onClick={hasPaid ? handleDownloadPDF : handlePayment}
                disabled={isGeneratingPdf || isProcessingPayment}
              >
                {isGeneratingPdf 
                  ? "Generating PDF..." 
                  : hasPaid 
                    ? "Download PDF" 
                    : `Pay GHS 3.00 to Unlock Download`}
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
