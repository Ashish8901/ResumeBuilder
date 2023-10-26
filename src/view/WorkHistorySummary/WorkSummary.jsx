import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ParaGroup from "./ParaGroup";
import { useTranslation } from "react-i18next";
import ResumeContactPreview from "../../components/ResumeContactPreview";
// import PreviewTips from "../../components/PreviewTips";
const EduSummary = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const navigate = useNavigate();
  const workData = useSelector((store) => store.workExprData.workExpr.jobsData);
  const eduData = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const skills = useSelector((store) => store.skillsData.Skills);
  const summary = useSelector((store) => store.summaryData.Summary);
  const isStudent = useSelector((store) => store.resumeData.studentCheck);
  // const handleNext = () => {
  //   if (localStorage.getItem("FinalResume") === "true") {
  //     navigate("/final-resume");
  //   } else if (educationData.length <= 0) {
  //     navigate("/resume-education");
  //   } else {
  //     navigate("/skill");
  //   }
  // };

  const handleNext = () => {
    calcWorkPerc();
    if (FinalResume) {
      navigate("/final-resume");
    } else if (!FinalResume && eduData.length === 0) {
      navigate("/resume-education ");
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      !summary &&
      !skills &&
      isStudent === "No"
    ) {
      navigate("/resume-education");
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      !skills
    ) {
      navigate("/skill");
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      !summary &&
      skills &&
      isStudent === "No"
    ) {
      navigate("/resume-education");
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      skills &&
      !summary
    ) {
      navigate("/skill");
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      skills &&
      summary
    ) {
      navigate("/skill");
    } else if (!FinalResume && workData.length > 0 && eduData.length > 0) {
      navigate("/resume-education");
    } else if (!FinalResume && eduData.length === 0 && workData.length > 0) {
      navigate("/resume-education");
    }
  };

  useEffect(() => {
    if (!FinalResume && !workData.length > 0) {
      let route = "/work-expr-form";
      localStorage.setItem("en_pth", route);
    } else {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, workData, FinalResume]);

  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else {
      navigate("/expr");
    }
  };

  const calcWorkPerc = () => {
    let perc = 0;
    if (workData.length > 0) {
      perc = 20;
    } else {
      perc = 0;
    }
    localStorage.setItem("strWork", perc);
  };
  return (
    <>
      <section className="pt-4 choose-template-section bg-double pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="page-title-big mleft-3">
                Berufserfahrung prüfen
                {/* <span style={{ color: "var(--yellow)" }}> Arbeitsverlaufs</span> */}
              </h1>
              <ParaGroup />
              <div className="row mt-10 edu-summ-btn">
                <div className="col-sm-6 col-2">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-10 text-right wrk-hst-btn">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn site-btn bg-blue text-white"
                  >
                    {FinalResume
                      ? `${t("SAVE AND NEXT")}`
                      : !FinalResume && workData.length === 0
                      ? `${t("Further")}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        !summary &&
                        !skills &&
                        isStudent === "No"
                      ? `${t("Further")}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        !skills
                      ? `${t("NEXT")}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        !summary &&
                        skills &&
                        isStudent === "No"
                      ? `${t("Further")}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        skills &&
                        !summary
                      ? `${t("NEXT")}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        skills &&
                        summary
                      ? `${t("NEXT")}`
                      : !FinalResume &&
                        eduData.length === 0 &&
                        workData.length > 0
                      ? `${t("Further")}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0
                      ? `${t("Further")}`
                      : "NEXT"}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <PreviewTips /> */}
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EduSummary;
