import React from 'react'

const ResumeSocialinfo = () => {
  return (
    <>
      <div className="socail-info">
        <p className="mb-1">
          <span className="resume-icon">
            <i className="fa fa-envelope"></i>
          </span>
          saanvipatel@sample.in
        </p>
        <p className="mb-1">
          <span className="resume-icon">
            <i className="fa fa-phone" aria-hidden="true"></i>
          </span>
          + 01 234 56789
        </p>
        <p className="mb-1">
          <span className="resume-icon">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
          </span>
          New Delhi, India 110034
        </p>
      </div>
    </>
  );
}

export default ResumeSocialinfo