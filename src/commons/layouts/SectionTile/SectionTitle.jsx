import React from "react";
import TitleBarSection from "../../TitleBarSection/TitleBarSection";

const SectionTitle = (props) => {
  return (
    <div>
      <TitleBarSection title={props.title} />
      <div style={{ padding: "50px" }}>{props.children}</div>
    </div>
  );
};
export default SectionTitle;
