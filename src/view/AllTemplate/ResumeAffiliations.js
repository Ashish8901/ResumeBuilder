import React from "react";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { useTranslation } from "react-i18next";

const ResumeAffiliations = ({ preview }) => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const accompHead = useSelector(
    (store) => store.extraSecArrData.extraSecArray
  );
  const affilData = useSelector((store) => store.affiliationsData.affiliation);

  return (
    <>
      <div className="resume-section resume-affi resumeAffiliation">
        {affilData && pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              Referenzen
            </h1>
            <div className={`${preview === true ? "paragraph1" : "paragraph"}`}>
              {ReactHtmlParser(affilData)}
            </div>
          </>
        ) : !affilData &&
          accompHead.includes(`${t("credentials")}`) &&
          pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Credentials")}
            </h1>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeAffiliations;
// {accompHead.includes("Affiliations") && pathname !== '/choose-template' ? (
//   <>
//       <h1 className="resume-heading">Affiliations</h1>
//       {affilData ? (
//           <>
//                {ReactHtmlParser(affilData)}
//           </>
//       ) : ""}
//   </>
// ) : ""}
