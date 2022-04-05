import React from 'react';
import "../styles/styles.css";

export default function FormTextArea() {
  return (
    <textarea className="form-text-area"
      maxRows={8}
      aria-label="maximum height"     
    />
  );
}
