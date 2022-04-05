import React from "react";
import TitleBarSection from "../../TitleBarSection/TitleBarSection";

const SectionNoTitle = (props) => {
  return (
    <div>
      <div style={{ padding: "50px" }}>{props.children}</div>
    </div>
  );
};
export default SectionNoTitle;
