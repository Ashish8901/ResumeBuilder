import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const ResumeSummary = ({ preview }) => {
  const { t } = useTranslation();
  const summary = localStorage.getItem("summaryInLocal");
  const summaryFromServer = useSelector((store) => store.summaryData.Summary);
  const styleobj = {
    fontSize: "",
  };
  return (
    <>
      <div className="resume-section summay-box resume-sumary">
        <h1
          className={`${
            preview === true ? "heading-resume" : "resume-heading"
          }`}
        >
          {t("Professional Summary")}
        </h1>
        <div className=" singlecolumn professionSummary">
          <div
            className={`${preview === true ? "paragraph1" : "paragraph"}`}
            style={styleobj}
          >
            {summaryFromServer && summary === summaryFromServer ? (
              // summaryFromServer !== null ||
              <>{ReactHtmlParser(summaryFromServer)}</>
            ) : summary && summary !== "<p></p>" ? (
              <>{ReactHtmlParser(summary)}</>
            ) : (
              <>
                {t(
                  "Motivated7 Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales."
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeSummary;
