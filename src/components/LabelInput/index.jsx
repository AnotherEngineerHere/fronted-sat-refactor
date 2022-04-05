import React from "react";
import { primaryColor } from "../../commons/constants/StylesConstants";

const LabelInput = (props) => {
  const { nameInput, labelText } = props;
  return (
    <div style={{ marginBottom: 5 }}>
      <label htmlFor={nameInput}>
        <span style={{ color: primaryColor }}>{labelText}</span>
      </label>
    </div>
  );
};

export default LabelInput;
