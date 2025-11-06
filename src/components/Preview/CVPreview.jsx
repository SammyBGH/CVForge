import React, { useState, useRef, useEffect } from "react";
import "../../styles/Preview.css";
import TemplateSelector from "./TemplateSelector";
import DefaultTemplate from "./templates/DefaultTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

const CVPreview = ({ data = {} }) => {
  const [currentTemplate, setCurrentTemplate] = useState('default');
  const cvPreviewRef = useRef(null);
  
  const handlePrint = () => {
    // Get the CV preview HTML
    const printContent = document.getElementById('cv-print-content').innerHTML;
    
    // Create a new window for printing
    const printWindow = window.open('', '', 'width=800,height=900');
    
    // Write the print content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - Print</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
          <style>
            @page { margin: 0; padding: 0; }
            body { 
              margin: 0; 
              padding: 0; 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .cv-print-page {
              width: 210mm;
              min-height: 297mm;
              padding: 15mm;
              margin: 0 auto;
              box-sizing: border-box;
              position: relative;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 0; 
              }
              .cv-print-page {
                padding: 0;
                margin: 0;
                width: 100%;
                min-height: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="cv-print-page">
            ${printContent}
          </div>
          <script>
            // Close the print window after printing or if user cancels
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 100);
              }, 200);
              
              // Also close if user cancels print
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };
  
  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      default:
        return <DefaultTemplate data={data} />;
    }
  };

  return (
    <div className="cv-preview-container">
      <div className="preview-controls">
        <TemplateSelector 
          activeTemplate={currentTemplate}
          onTemplateChange={setCurrentTemplate}
        />
      </div>
      
      <div 
        id="cv-print-content"
        ref={cvPreviewRef}
        className={`cv-preview ${currentTemplate}-template`}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default CVPreview;
