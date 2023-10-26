import React, { useEffect } from "react";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import PreviewTips from '../../components/PreviewTips';
const SkillPreview = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const FinalResume = localStorage.getItem("FinalResume");
  const isStudent = useSelector((store) => store.resumeData.studentCheck);

  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);
  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else if (isStudent === "No") {
      navigate("/edu-summary");
    } else {
      navigate("/Work-summary");
    }
  };

  const handleNext = () => {
    navigate("/add-skill");
  };
  return (
    <>
      <section className="choose-template-section resume-contact-section pt-4 bg-green pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="resume-content-pd">
                <h2 className=" text-white semi-bold">{t("Klasse Job!")}</h2>
                <h1 className="heading text-white bold">
                  Jetzt können wir Ihre Fähigkeiten einfügen.
                </h1>
                {/* <h1 className="eduction-heading">
                  {t("Next, let’s take care of your")} &nbsp;
                  <span className="font-weight-normal">{t("skills")}</span>
                </h1> */}
                {/* <h2 className="tips-text mb-0">
                  {t("Here’s what you need to know:")}
                </h2>
                <div className="f-18 mb-0">
                  {t("Employers scan skills for relevant keywords.")}
                </div>
                <div className="f-18 mb-2">
                  {t("We’ll help you choose the best ones.")}
                </div> */}
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
                    to="/add-skill"
                    className="btn site-btn bg-blue text-white"
                  >
                    {t("NEXT")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              {/* <PreviewTips /> */}
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillPreview;
