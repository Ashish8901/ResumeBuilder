import React, { useState } from "react";
// import ExpButton from "../../components/ExpButton";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import PageSubHeading from "../../components/PageSubHeading";
import { useDispatch } from "react-redux";
import {
  selectExperience,
  checkifstudent,
} from "../../redux/features/resumeSlice";
import { useTranslation } from "react-i18next";
const ExpScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //const resumeState = useSelector((store) => store.resumeData);

  const handleExp = (str) => {
    dispatch(selectExperience(str));

    if (str !== "0-3" || str !== "0") {
      dispatch(checkifstudent("No"));
    }
  };
  const handleStudent = (str) => {
    dispatch(checkifstudent(str));
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/choose-template`;

    navigate(path);
  };
  const [show, setShow] = useState(false);
  const onClick = () => setShow(true);
  return (
    <>
      <section className="exp-screen-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="exp-content-box">
                <div className="exp-content-inner">
                  <div style={{ position: "relative" }}>
                    <h1 className="heading">
                      {/* {t('How long have you been working?')} */}
                      {t("How much work experience do you have?")}
                      {/* <span className="info-text-box">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <span className="info-content-box">
                          {t(
                            "Include internships, unpaid jobs, and volunteer work."
                          )}
                        </span>
                      </span> */}
                    </h1>
                  </div>
                  {/* <PageSubHeading subheading={t("We'll find the best templates for your experience level.")} /> */}
                  <div className="mb-5">
                    <PageSubHeading subheading="Basierend auf Ihren Angaben können wir Ihnen die geeignetsten Inhalte für Ihren Lebenslauf empfehlen." />
                  </div>
                  <div className="exp-btn-group">
                    {/* <button
                      className="exp-level-btn"
                      type="button"
                      onClick={(e) => {
                        handleExp("0");
                        onClick();
                      }}
                    >
                     {t('No Experience')}
                    </button> */}
                    <button
                      className="exp-level-btn"
                      type="button"
                      onClick={(e) => {
                        handleExp("0-3");
                        onClick();
                      }}
                    >
                      {/* {t('Less than 3 years')}  */}
                      <p className="bold mb-0">erste</p>
                      <br />
                      <span>0–3 Jahre</span>
                      {/* {t("first")}
                      0-3 {t("years")} */}
                    </button>

                    {/* <button
                      className="exp-level-btn"
                      type="button"
                      onClick={(e) => {
                        handleExp("3-5");
                        setTimeout(() => {
                          routeChange();
                        }, 500);
                      }}
                    >
                      {t('first')}
                      0-3 {t('years')}
                    </button> */}

                    <button
                      className="exp-level-btn"
                      type="button"
                      onClick={(e) => {
                        handleExp("4-9");
                        setTimeout(() => {
                          routeChange();
                        }, 500);
                      }}
                    >
                      {/* {t('5-10 Years')} */}
                      {/* {t("perennial")}
                      4-9 {t("years")} */}
                      <p className="bold mb-0">mehrjährige</p>
                      <br />
                      <span> 4-9 Jahre</span>
                    </button>
                    <button
                      className="exp-level-btn"
                      type="button"
                      onClick={(e) => {
                        handleExp("10+");
                        setTimeout(() => {
                          routeChange();
                        }, 500);
                      }}
                    >
                      {/* {t("longtime")}
                      10+ {t("years")} */}
                      <p className="bold mb-0">langjährige</p>
                      <br />
                      <span> 10+ Jahre</span>
                    </button>
                  </div>
                </div>
              </div>
              {show ? (
                <div className="condition-box text-center">
                  <PageHeading headinglabel={t("Are you a student?")} />
                  <div className="exp-btn-group">
                    <button
                      className="exp-level-btn"
                      onClick={(e) => {
                        handleStudent("Yes");
                        setTimeout(() => {
                          routeChange();
                        }, 500);
                      }}
                    >
                      {t("Yes")}
                    </button>
                    <button
                      className="exp-level-btn"
                      onClick={(e) => {
                        handleStudent("No");
                        setTimeout(() => {
                          routeChange();
                        }, 500);
                      }}
                    >
                      {t("No")}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpScreen;
