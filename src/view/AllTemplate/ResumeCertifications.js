import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';

const ResumeCertifications = ({preview}) => {
  const { t } = useTranslation() 
  const pathname = window.location.pathname;
  const accompHead = useSelector(
    (store) => store.extraSecArrData.extraSecArray
  );
  const cData = useSelector((store) => store.certificationData.certification);

  return (
    <>
      <div className="resume-section resume-cert resumeCertification">
        {cData && pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Certifications")}
            </h1>
            <div className={`${preview === true ? "paragraph1" : "paragraph"}`}>
              {ReactHtmlParser(cData)}
            </div>
          </>
        ) : !cData &&
          accompHead.includes(`${t("Certifications")}`) &&
          pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Certifications")}
            </h1>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeCertifications;
// {accompHead.includes("Certifications") && pathname !== '/choose-template' ? (
//   <>
//       <h1 className="resume-heading">Certifications</h1>
//       {cData ? (
//           <>
//                {ReactHtmlParser(cData)}
//           </>
//       ) : ""}
//   </>
// ) : ""}
