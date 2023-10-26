import React from 'react';
import { useSelector } from 'react-redux';
const ResumeFourSocialInfo = () => {
  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
      <div className="socail-info">
        <h1 className="resume-heading">Contact</h1>
        <p className="mb-1">
          <span className="resume-icon box">
            <i
              className="fa fa-envelope"
              style={{
                color:
                  templateColorState.onMouseEnterBgClor === null
                    ? templateColorState.backgroundColor
                    : templateColorState.onMouseEnterBgClor,
              }}
            ></i>
          </span>
          saanvipatel@sample.in
        </p>
        <p className="mb-1">
          <span className="resume-icon box">
            <i
              style={{
                color:
                  templateColorState.onMouseEnterBgClor === null
                    ? templateColorState.backgroundColor
                    : templateColorState.onMouseEnterBgClor,
              }}
              className="fa fa-phone"
              aria-hidden="true"
            ></i>
          </span>
          + 01 234 56789
        </p>
        <p className="mb-1">
          <span className="resume-icon box">
            <i
              style={{
                color:
                  templateColorState.onMouseEnterBgClor === null
                    ? templateColorState.backgroundColor
                    : templateColorState.onMouseEnterBgClor,
              }}
              className="fa fa-map-marker"
              aria-hidden="true"
            ></i>
          </span>
          New Delhi, India 110034
        </p>
      </div>
    </>
  );
};

export default ResumeFourSocialInfo;
