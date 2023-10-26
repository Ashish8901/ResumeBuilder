import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ResumeEducation from './ResumeEducation';
import ResumeLanguage from './ResumeLanguage';
import ResumeSkill from './ResumeSkill';
import ResumeSocialinfo from './ResumeSocialinfo';
import ResumeSummary from './ResumeSummary';
import ResumeWorkHistory from './ResumeWorkHistory';
import TitleName from './TitleName';
const TemplateTwoStru = ({ formData }) => {
  const templateColorState = useSelector((store) => store.templateColor);
  useEffect(() => {
    if (window.location.pathname === '/resume') {
      //  activestep[0].className="step active-link"
      let educationclass = document.getElementsByClassName('socail-info');
      educationclass.class = 'step activelink';
      educationclass[0].style.border = '1px solid red';
    }
    if (window.location.pathname === '/resume-education') {
      let educationclass = document.getElementsByClassName('educationclass');
      educationclass[0].style.border = '1px solid red';
    }
    if (window.location.pathname === '/expr') {
      let educationclass = document.getElementsByClassName(' work-history-box');
      educationclass[0].style.border = '1px solid red';
    }
    if (window.location.pathname === '/skill') {
      let educationclass = document.getElementsByClassName('skill-list');
      educationclass[0].style.border = '1px solid red';
    }
    if (window.location.pathname === '/summary') {
      let educationclass = document.getElementsByClassName('summay-box');
      educationclass[0].style.border = '1px solid red';
    }
  });
  return (
    <>
      <div className="resume-template-box resume-sec-temp">
        <table className="resume-table">
          <tbody>
            <tr>
              <td
                className="name-detail resume-pd-sec w-40"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                  color:
                    templateColorState.fontColor === null
                      ? templateColorState.fontColor
                      : templateColorState.fontColor,
                  marginBottom: '-2px',
                }}
              >
                <div>
                  <div className="opacit-1">
                    <div className="Name-heading mb-3">
                      <TitleName />
                    </div>
                    <ResumeSocialinfo />
                  </div>
                </div>
              </td>
              <td
                className="fade-bg resume-pd-sec"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              >
                <div>
                  <div className="opacit-1">
                    {/* <ResumeTwoSummary /> */}
                    <ResumeSummary />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="fade-bg resume-pd-sec"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              >
                <div className="opacit-1">
                  {/* <ResumeTwoSkill /> */}
                  <ResumeSkill />
                  {/* <ResumeTwoEducation /> */}
                  <ResumeEducation formData={formData} />
                </div>
              </td>
              <td className="resume-pd-sec">
                <ResumeWorkHistory />
                {/* <ResumeTwoWorkHistory /> */}
                {/* <ResumeTwoLanguge /> */}
                <ResumeLanguage />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TemplateTwoStru;
