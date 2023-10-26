import React from 'react';
import ResumeThreeEducation from './ResumeThreeEducation';
import ResumeThreeLanguage from './ResumeThreeLanguage';
import ResumeThreeSkill from './ResumeThreeSkill';
import ResumeThreeSocialInfo from './ResumeThreeSocialInfo';
import ResumeThreeWorkHistory from './ResumeThreeWorkHistory';
import ReusmeThreeSummary from './ReusmeThreeSummary';
import { useSelector } from 'react-redux';
const TemplateThreeStructure = () => {
  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
      <div className="resume-template-box resume-sec-temp resume-third-temp">
        <table className="resume-table-third">
          <tbody>
            <tr>
              <td
                className="fade-bg resume-pd-sec"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                  width: "50%",
                }}
              >
                <div className="opacit-1">
                  <h1>First Name</h1>
                </div>
              </td>
              <td
                className="fade-bg resume-pd-sec"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                  width: "50%",
                }}
              >
                <div className="opacit-1">
                  <ResumeThreeSocialInfo />
                </div>
              </td>
            </tr>
            <tr>
              <td className="resume-pd-sec" style={{ width: "60%" }}>
                <ReusmeThreeSummary />
                <ResumeThreeWorkHistory />
                <ResumeThreeLanguage />
              </td>
              <td className="resume-pd-sec" style={{ width: "40%" }}>
                <div className="summay-box">
                  <ResumeThreeSkill />
                  <ResumeThreeEducation />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TemplateThreeStructure;
