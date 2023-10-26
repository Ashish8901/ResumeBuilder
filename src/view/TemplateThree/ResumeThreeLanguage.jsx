import React from 'react';
import { useSelector } from 'react-redux';
const ResumeThreeLanguage = () => {
  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
      <div className="language-box">
        <h1 className="resume-heading-third">Languages</h1>
        <p className="semi-bold mb-2">
          <span>Hindi</span> : Native Language
        </p>
        <div className="row">
          <div className="col-6">
            <p className="percent mb-1 ">
              <span>Hindi</span>
              <span>100</span>
            </p>
            <div className="percent-box">
              <div
                className="percent-clr"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              ></div>
              <div
                className="percent-clr"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              ></div>
              <div
                className="percent-clr"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              ></div>
              <div
                className="percent-clr"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              ></div>
              <div
                className="percent-clr"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              ></div>
              <div
                className="percent-clr"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              ></div>
            </div>
            <p className="percent">
              <span>Percentage</span>
            </p>
          </div>
          <div className="col-6">
            <p className="percent mb-1 ">
              <span>English</span>
              <span>100</span>
            </p>
            <div className="percent-box">
              <div
                className="percent-clr"
                style={{ background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor, }}
              ></div>
              <div
                className="percent-clr"
                style={{ background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor, }}
              ></div>
              <div
                className="percent-clr"
                style={{ background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor, }}
              ></div>
              <div
                className="percent-clr"
                style={{ background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor, }}
              ></div>
              <div
                className="percent-clr"
                style={{ background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor, }}
              ></div>
              <div
                className="percent-clr"
                style={{ background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor, }}
              ></div>
            </div>
            <p className="percent">
              <span>Percentage</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeThreeLanguage;
