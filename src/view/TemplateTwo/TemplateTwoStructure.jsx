import React from 'react';
import ResumeTwoEducation from './ResumeTwoEducation';
import ResumeTwoLanguge from './ResumeTwoLanguge';
import ResumeTwoSkill from './ResumeTwoSkill';
import ResumeTwoSocialInfo from './ResumeTwoSocialInfo';
import ResumeTwoSummary from './ResumeTwoSummary';
import ResumeTwoWorkHistory from './ResumeTwoWorkHistory';
import { useSelector } from 'react-redux';

const TemplateTwoStructure = () => {
  const templateColorState = useSelector((store) => store.templateColor);
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
                  marginBottom: "-2px",
                }}
              >
                <div>
                  <div className="opacit-1">
                    <div className="Name-heading">
                      <h1>
                        Your <br />
                        Name
                      </h1>
                    </div>
                    <ResumeTwoSocialInfo />
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
                    <ResumeTwoSummary />
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
                  <ResumeTwoSkill />
                  <ResumeTwoEducation />
                </div>
              </td>
              <td className="resume-pd-sec">
                <ResumeTwoWorkHistory />
                <ResumeTwoLanguge />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TemplateTwoStructure;
