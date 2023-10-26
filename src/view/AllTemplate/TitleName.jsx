import React from "react";
import { useSelector } from "react-redux";
const TitleName = ({ preview }) => {
  const pathname = window.location.pathname;
  const templateColorState = useSelector((store) => store.templateColor);
  const headingValues = JSON.parse(
    localStorage.getItem("resume_meta_value_heading")
  );
  return (
    <>
      <h1
        className={`${preview === true ? "title-name" : "name-title"}`}
        style={{
          color:
            templateColorState.onMouseEnterBgClor === null
              ? templateColorState.backgroundColor
              : templateColorState.onMouseEnterBgClor,
        }}
      >
        {headingValues === null || pathname === "/choose-template"
          ? "Paul Hilton"
          : !headingValues?.fname
          ? "Your Name"
          : headingValues?.fname && headingValues?.lname
          ? `${headingValues?.fname} ${headingValues?.lname}`
          : `${headingValues?.fname}`}
      </h1>
    </>
  );
};

export default TitleName;
