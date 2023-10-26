import React, { useEffect } from "react";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const ResumeWorkHisttory = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const FinalResume = localStorage.getItem("FinalResume");
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);
  const Edudata = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const isStudent = useSelector((store) => store.resumeData.studentCheck);

  const workdata = useSelector((store) => store.workExprData.workExpr.jobsData);
  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else if (Edudata?.length > 0 && isStudent === "Yes") {
      navigate("/edu-summary");
    } else {
      navigate("/resume");
    }
  };

  const handleNext = () => {
    if (workdata?.length > 0) {
      navigate("/Work-summary");
    } else {
      navigate("/work-expr-form");
    }
  };
  return (
    <>
      <section className="choose-template-section resume-contact-section pt-4 bg-green pb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="resume-content-pd">
                <h3 className=" text-white semi-bold">{t("Gut gemacht!")}</h3>
                <h2 className="heading text-white bold">
                  Jetzt können wir Ihre beruflichen Erfahrungen integrieren.
                </h2>

                {/* <div className="f-18 mb-2 text-white">
                  {t(
                    "We recommend filling out this section even if you don’t have a lot of work experience. Some experience you might consider: Part time jobs ( tutoring, babysitting, dog walking, etc.)"
                  )}
                </div>
                <ul className="work-tip-list f-18 text-white">
                  <li>
                    {t(
                      "Seasonal jobs (camp counselor, tour guide, gift wrapper)"
                    )}
                  </li>
                  <li>
                    {t("Internships or apprenticeships (paid or unpaid)")}
                  </li>
                  <li>{t("Work study jobs")}</li>
                  <li>{t("Unofficial work for family/neighbours/friends")}</li>
                  <li>{t("Work study jobs")}</li>
                  <li>{t("Volunteer activities")}</li>
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
                    onClick={handleNext}
                    className="btn site-btn bg-blue text-white"
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

export default ResumeWorkHisttory;
