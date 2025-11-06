import React from 'react';
import { FaFileAlt, FaFileSignature, FaFileContract } from 'react-icons/fa';

const TemplateSelector = ({ activeTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'default', label: 'Modern', icon: <FaFileAlt /> },
    { id: 'professional', label: 'Pro', icon: <FaFileSignature /> },
    { id: 'creative', label: 'Creative', icon: <FaFileContract /> }
  ];

  return (
    <div className="template-selector">
      {templates.map((template) => (
        <button
          key={template.id}
          className={`template-btn ${activeTemplate === template.id ? 'active' : ''}`}
          onClick={() => onTemplateChange(template.id)}
          title={`${template.label} Template`}
          aria-label={`Switch to ${template.label} template`}
        >
          <span className="template-icon">{template.icon}</span>
          <span className="template-label">{template.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
