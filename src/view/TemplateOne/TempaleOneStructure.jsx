import React from 'react';
import ResumeEducation from './ResumeEducation';
import ResumeLanguage from './ResumeLanguage';
import ResumeSkill from './ResumeSkill';
import ResumeSocialinfo from './ResumeSocialinfo';
import ResumeSummary from './ResumeSummary';
import ResumeWorkHistory from './ResumeWorkHistory';
import { useSelector } from 'react-redux';
const TempaleOneStructure = () => {
  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
      <div className="resume-template-box">
        <div className="row">
          <div className="col-sm-12">
            <table className="resume-one-table" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td colSpan={2} style={{ width: '100%' }}>
                    <div
                      className="top-heading"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                        color:
                          templateColorState.fontColor === null
                            ? templateColorState.fontColor
                            : templateColorState.fontColor,
                      }}
                    >
                      <div className="top-icon">FA</div>
                      <div className="name-here">First Name</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    className="pt-5"
                    style={{ width: '60%', paddingRight: '30px' }}
                  >
                    <ResumeSummary />
                    <hr style={{ borderTop: '2px solid rgba(0,0,0,.1)' }}></hr>
                    <ResumeWorkHistory />
                    <hr style={{ borderTop: '2px solid rgba(0,0,0,.1)' }}></hr>
                    <ResumeLanguage />
                  </td>
                  <td
                    className="clr-dark"
                    style={{
                      width: '40%',
                      backgroundColor: 'var(--resume-bg)',
                      height: '100%',
                      padding: '20px',
                    }}
                  >
                    <div className="pt-4" style={{}}>
                      <ResumeSocialinfo />
                      <hr
                        style={{ borderTop: '2px solid rgba(0,0,0,.1)' }}
                      ></hr>
                      <ResumeSkill />
                      <hr
                        style={{ borderTop: '2px solid rgba(0,0,0,.1)' }}
                      ></hr>
                      <ResumeEducation />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempaleOneStructure;
