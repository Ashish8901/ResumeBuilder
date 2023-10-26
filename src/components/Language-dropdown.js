import React from "react";

const LanguageDropdown = (props) => {
  return (
    <>
      <select
        value={props.val}
        onChange={props.onChange}
        style={{
          padding: "6px",
          color: "#007bff",
          borderRadius: "3px",
          border: "1px solid",
          background: "#fff",
        }}
      >
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
    </>
  );
};

export default LanguageDropdown;
