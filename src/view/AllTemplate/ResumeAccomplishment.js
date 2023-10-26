import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';

const ResumeAccomplishment = ({preview}) => {
  const {t} = useTranslation();
  const pathname = window.location.pathname;
  const accompHead = useSelector(
    (store) => store.extraSecArrData.extraSecArray
  );

  const accompdata = useSelector(
    (store) => store.accomplishmentsData.accomplishment
  );

  return (
    <>
      <div className="resume-section resume-accomplish resumeAccomplishment ">
        {accompdata && pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Accomplishments")}
            </h1>
            <div className={`${preview === true ? "paragraph1" : "paragraph"}`}>
              {ReactHtmlParser(accompdata)}
            </div>
          </>
        ) : !accompdata &&
          accompHead.includes(`${t("Accomplishments")}`) &&
          pathname !== "/choose-template" ? (
          <h1
            className={`${
              preview === true ? "heading-resume" : "resume-heading"
            }`}
          >
            {t("Accomplishments")}
          </h1>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeAccomplishment;
// {accompdata && pathname !== "/choose-template" ? (
//   <>
//     <h1 className="resume-heading">Accomplishments</h1>
//     <p>{ReactHtmlParser(accompdata)}</p>
//   </>
// ) : !accompdata &&
//   !accompHead.includes("Accomplishments") &&
//   pathname !== "/choose-template" ?
//   ""
// : !accompHead.includes("Accomplishments") &&
//   pathname !== "/choose-template" ? (
//     ""
// ) : (
//    <h1 className="resume-heading">Accomplishmentss</h1>
// )}
