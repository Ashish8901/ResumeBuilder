import React from 'react'
import { Link } from "react-router-dom";
import WriteIcon from "../../assets/write-icon.png";
const SelectResumeLeft = () => {
  return (
    <>
      <div className="resume-box-content create-resume inline-block">
        <Link to="/resume" className="">
          <p>
            <img alt="" src={WriteIcon} />
          </p>
          <p className="option-name">Create a New Resume</p>
          <div className="option-texts">
            We will help you create a resume
            <br /> step-by-step.
          </div>
        </Link>
      </div>
    </>
  );
}

export default SelectResumeLeft