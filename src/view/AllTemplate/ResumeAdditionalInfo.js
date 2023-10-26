import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';

const ResumeAdditionalInfo = ({preview}) => {
  const {t} = useTranslation()
  const pathname = window.location.pathname;
  const accompHead = useSelector(
    (store) => store.extraSecArrData.extraSecArray
  );
  const additionalData = useSelector(
    (store) => store.additionalInfoData.additionalInfo
  );

  return (
    <>
      <div className="resume-section resume-addinfo">
        {additionalData && pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t(`Additional-Information`)}
            </h1>
            {ReactHtmlParser(additionalData)}
          </>
        ) : !additionalData &&
          accompHead.includes(`${t("Additional-Information")}`) &&
          pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Additional-Information")}
            </h1>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeAdditionalInfo;
