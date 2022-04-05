import React from "react";

const TitleBarSection = (props) => {
  return (
    <div
      style={{
        widh: "100%",
        height: 80,
        backgroundColor: "#ffffff",
        padding: "10px 50px",
        display: "flex",
        alignItems: "center",
        boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
      }}
    >
      <span
        style={{
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "19px",
          color: "#2764E3",
        }}
      >
        {props.title}
      </span>
    </div>
  );
};

export default TitleBarSection;
