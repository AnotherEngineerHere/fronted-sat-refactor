import React from 'react';
import "../styles/FormTextArea.css";

export default function FormTextArea() {
  return (
    <textarea className="form-text-area"
      maxRows={8}
      aria-label="maximum height"     
    />
  );
}
