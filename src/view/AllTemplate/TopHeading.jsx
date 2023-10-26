import React from 'react';
import { useSelector } from 'react-redux';
const TopHeading = ({preview}) => {
  const pathname = window.location.pathname;

  const headingValues = JSON.parse(
    localStorage.getItem('resume_meta_value_heading')
  );
  const templateColorState = useSelector((store) => store.templateColor);

  return (
    <>
      <div
        className="top-heading slide-bg-clr"
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
        <div className="top-icon name-title">FN</div>
  
        <div className={`${preview===true?'title-name':'name-title'}`}>
          {headingValues === null || pathname === '/choose-template'
            ? 'First Name'
            : headingValues?.fname?.length === 0 || !headingValues?.fname
            ? 'First Name'
            : `${headingValues?.fname}`}
        </div>
      </div>
    </>
  );
};

export default TopHeading;
