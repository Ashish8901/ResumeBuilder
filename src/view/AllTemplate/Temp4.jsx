import React from "react";
import { useSelector } from "react-redux";
import ResumeWorkHistory from "./ResumeWorkHistory";
import ResumeEducation from "./ResumeEducation";
import ResumeLanguage from "./ResumeLanguage";
import ResumeSkill from "./ResumeSkill";
import ResumeSocialinfo from "./ResumeSocialinfo";
import ResumeSummary from "./ResumeSummary";
import TitleName from "./TitleName";
import ResumeExtraSection from "./ResumeExtraSection";
const TemplateThreeStru = ({ formData }) => {
  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
      <div className="resume-template-box temp-3">
        <div>
          <div
            className="fade-bg top-fix-box"
            style={{
              background:
                templateColorState.onMouseEnterBgClor === null
                  ? templateColorState.backgroundColor
                  : templateColorState.onMouseEnterBgClor,
              color: "#000",
            }}
          >
            <div className="opacit-1">
              <TitleName />
              <ResumeSocialinfo />
            </div>
          </div>
          <div className="resume-content-three">
            <ResumeSummary />
            <ResumeSkill />
            <ResumeWorkHistory />
            <ResumeEducation formData={formData} />
             <ResumeLanguage />
             <ResumeExtraSection/>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateThreeStru;
