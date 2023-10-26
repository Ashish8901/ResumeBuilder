import React, { useEffect } from "react";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const ResumeEduction = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const Edudata = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const workdata = useSelector((store) => store.workExprData.workExpr.jobsData);
  const isStudent = useSelector((store) => store.resumeData.studentCheck);
  const handleStudentcheck = () => {
    if (Edudata.length > 0) {
      navigate("/edu-summary");
    } else {
      navigate("/edu-del");
    }
  };
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);
  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else if (workdata.length === 0 && isStudent === "No") {
      navigate("/Work-summary");
    } else if (workdata.length > 0 && isStudent === "Yes") {
      navigate("/resume");
    } else if (workdata.length > 0) {
      navigate("/Work-summary");
    } else {
      navigate("/resume");
    }
  };
  return (
    <>
      <section className="choose-template-section resume-contact-section pt-4 bg-green pb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="resume-content-pd">
                {/* <h2 className=" text-white semi-bold">{t("Klasse Job!")}</h2>
                <h1 className="heading text-white bold">
                  Lassen Sie uns nun Ihre Kompetenzen hinzufügen.
                </h1> */}
                <h2 className=" text-white semi-bold">
                  Gute Arbeit! &nbsp;
                  {/* <span style={{ color: "var(--yellow)" }}>Ausbildung</span> */}
                </h2>

                <h1 className="heading text-white bold">
                  Lassen Sie uns nun Ihre Ausbildung hinzufügen.
                  {/* {t("Here’s what you need to know:")} */}
                </h1>
                {/* <ul className="tips-list text-white">
                  <li>{t("Employers quickly scan the education section.")}</li>
                  <li>
                    {t(
                      "We’ll take care of the formatting so it’s easy to find."
                    )}
                  </li>
                </ul> */}
              </div>
              <div className="row mt-10">
                <div className="col-sm-6 col-6">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn btn-white"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-6 text-right">
                  <button
                    className="btn site-btn bg-blue text-white"
                    type="button"
                    onClick={handleStudentcheck}
                  >
                    {t("NEXT")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResumeEduction;
