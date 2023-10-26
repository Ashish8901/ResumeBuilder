import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';

const ResumeHobbiesInfo = ({ preview }) => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const accompHead = useSelector(
    (store) => store.extraSecArrData.extraSecArray
  );
  const hobbiesData = useSelector((store) => store.hobbiesinfoData.HobbiesInfo);
  return (
    <>
      <div className="resume-section resume-addinfo">
        {hobbiesData && pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t(`Hobbies`)}
            </h1>
            <div className="paragraph">{ReactHtmlParser(hobbiesData)}</div>
          </>
        ) : !hobbiesData &&
          accompHead.includes(`${t("Hobbies")}`) &&
          pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Hobbies")}
            </h1>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeHobbiesInfo;
