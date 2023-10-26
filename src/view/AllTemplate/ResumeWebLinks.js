import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ResumeWebLinks = ({preview}) => {
  const {t} = useTranslation();
  const pathname = window.location.pathname;
  const accompHead = useSelector(
    (store) => store.extraSecArrData.extraSecArray
  );
  const webLinkData = useSelector((store) => store.webLinksData.webLinks);

  return (
    <>
      <div className="resume-section resume-weblink resumeWeblinks">
        {(webLinkData?.link1 || webLinkData?.link2 || webLinkData?.link3) &&
        pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              Links
            </h1>
            <div className="paragraph">
              <ul
                className={`${preview === true ? "paragraph1" : "paragraph"}`}
              >
                {webLinkData?.link1 ? <li>{webLinkData?.link1}</li> : ""}
                {webLinkData?.link2 ? <li>{webLinkData?.link2}</li> : ""}
                {webLinkData?.link3 ? <li>{webLinkData?.link3}</li> : ""}
              </ul>
            </div>
          </>
        ) : !webLinkData?.link1 &&
          !webLinkData?.link2 &&
          !webLinkData?.link3 &&
          accompHead.includes(`${t("Websites,Portfolios,Profiles")}`) &&
          pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              Links
            </h1>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeWebLinks;
