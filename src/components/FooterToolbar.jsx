import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResumeSlider from './ResumeSlider';
const FooterToolbar = () => {
  const [resumeShow, setResumeShow] = useState(false);
  const [formatShow, setFormatShow] = useState(false);
  return (
    <>
      {resumeShow && (
        <div className="resume-slide-box">
          <p className="text-right pr-2">
            <span
              className="dropdown-close cursor-pointer"
              onClick={() => setResumeShow(!resumeShow)}
            >
              CLOSE<i className="fa fa-times ml-1"></i>
            </span>
          </p>
          <ResumeSlider />
        </div>
      )}
      {formatShow && (
        <div className="formating-box">
          formating
        </div>
      )}
      <div className="container">
        <div className="custom-row">
          <div className="custom-left-sec">
            <div className="custom-col template">
              <div
                className="drop-down-template pdc"
                onClick={() => setResumeShow(!resumeShow)}
              >
                <span>TEMPLATE</span>
                <span className="mob-hide">
                  Refined
                  <i className="ml-2 fa fa-chevron-down" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div>
              <div className="custom-col formate">
                <div
                  className="drop-down-template pdc"
                  onClick={() => setFormatShow(!formatShow)}
                >
                  <span>FORMATTING</span>
                  <span className="mob-hide">
                    Normal
                    <i
                      className="ml-2 fa fa-chevron-down"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="custom-col color">
              <div className="drop-down-template">
                <span>COLOR</span>
                <span className="mob-hide">
                  <label className="color-selector root-color mb-0">
                    <span
                      className="color-selector-radio"
                      style={{ backgroundColor: "var(--rootcolor)" }}
                    >
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>
                  </label>
                  <i className="ml-2 fa fa-chevron-down" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="custom-right-sec">
            <div className="custom-col next-btn">
              <div className="text-right">
                <Link to="" className="btn site-btn bg-blue text-white">
                  SAVE & NEXT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterToolbar;
