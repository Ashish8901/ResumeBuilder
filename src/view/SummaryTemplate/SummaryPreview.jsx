import React, { useEffect } from "react";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import PreviewTips from '../../components/PreviewTips';
const SummaryPreview = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);
  return (
    <>
      <section className="choose-template-section resume-contact-section pt-4 bg-green pb-3">
        <div className="container text-white">
          <div className="row">
            <div className="col-lg-6">
              <div className="resume-content-pd">
                <h2 className=" text-white semi-bold">Super Ergebnis!</h2>
                <h1 className="heading text-white bold">
                  Nun, fügen Sie bitte Ihre Kenntnisse in Fremdsprachen hinzu.
                </h1>
                {/* <h2 className=" mb-3 bold ">{t("Klasse Job!")}</h2>
                <h1 className="heading text-white">
                  Lassen Sie uns nun Ihre Kompetenzen &nbsp;
                  <span style={{ color: "var(--yellow)" }}> hinzufügen</span>.
                </h1>

                <div className="f-18 mb-0">
                  {t(
                    "Your summary shows employers you’re right for their job."
                  )}
                </div>
                <div className="f-18 mb-2">
                  {t(
                    "We’ll help you write a great one with expert content you can customize."
                  )}
                </div> */}
              </div>
              <div className="row mt-10">
                <div className="col-sm-6 col-6">
                  <Link
                    to="/add-skill"
                    className="btn site-btn border-btn btn-white"
                  >
                    {t("Back")}
                  </Link>
                </div>
                <div className="col-sm-6 col-6 text-right">
                  <Link to="/lngg" className="btn site-btn bg-blue text-white">
                    {t("NEXT")}
                  </Link>
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

export default SummaryPreview;
