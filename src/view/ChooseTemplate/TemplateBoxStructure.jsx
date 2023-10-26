import React, { useEffect, useState } from "react";
// import TemplateOne from "../AllTemplate";
import { useSelector, useDispatch } from "react-redux";
import { changeTemplateColor } from "../../redux/features/colorSlice";
import TemplateThreeStru from "../AllTemplate/TemplateThreeStru";
import TemplateFourStru from "../AllTemplate/TemplateFourStru";
import { Link } from "react-router-dom";
import { changeTemplateId } from "../../redux/features/resumeSlice";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
// import Temp4 from '../AllTemplate/Temp4';
const TemplateBoxStructure = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const templateColorState = useSelector((store) => store.templateColor);
  const templateIdState = useSelector((store) => store.resumeData.template_id);
  //Function for changing color of templates
  useEffect(() => {
    if (templateIdState) {
      dispatch(changeTemplateId(""));
      localStorage.removeItem("templiD");
    }
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  const handleChange = (e) => {
    const payload = {
      backgroundColor: e.target.value,
      fontColor: "var(--white)",
      onMouseEnterBgClor: null,
      onMouseEnterFontColor: null,
      borderColor: e.target.value,
    };
    dispatch(changeTemplateColor(payload));
  };

  const [
    // eslint-disable-next-line
    tempid,
    setTempid,
  ] = useState("");
  //Function for getting template id's
  const handleTemplateId = (id, type) => {
    localStorage.setItem("templiD", id);

    setTempid(type);
    dispatch(changeTemplateId(type));
  };
  // eslint-disable-next-line
  const [isActive, setActive] = useState("");
  // eslint-disable-next-line
  const [ismouseEntr, setmouseEntr] = useState(false);
  // eslint-disable-next-line
  const [isId, setId] = useState(0);

  // const expValue = localStorage.getItem("selected_Exp");
  // const isStudent = localStorage.getItem("isStudent");
  const localToken = localStorage.getItem("resume_token") || null;

  const HandleSelectTemplate = () => {
    return (
      <>
        {/* <Link className="resume-select-btn cursor-pointer" to={`/resume`}>
    <button
      onClick={() => {
        if (!localToken) {
          localStorage.setItem("resume_token", uuidv4());
        }
      }}
      className="btn site-btn bg-blue text-white"
      disabled={!tempid}
    >
      {t('Choose Template')}
    </button>
  </Link> */}
      </>
    );
  };

  return (
    <>
      <section className="choose-template-section pt-4 template-section template-grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center">
                <div className="col-lg-8 mx-auto mb-4">
                  <h1 className="chosse-page-title">
                    Bitte treffen Sie eine Auswahl bezüglich des Designs für
                    Ihren neuen Lebenslauf.
                  </h1>
                  <h5>
                    Sie haben die Möglichkeit, später noch Anpassungen
                    vorzunehmen.
                  </h5>
                </div>
                <div className="template-color-code">
                  <h6 className="clr-head semi-bold inline-block uppercase">
                    {t("Color")}
                  </h6>
                  <div className="inline-block">
                    <ul className="inline-block resume-color-list">
                      <li className="color-item ">
                        <label
                          className="color-selector root-color"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--default-template)",
                              borderColor: "var(--default-template)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value="var(--default-template)"
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--rootcolor)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--dark-green)",
                              onMouseEnterFontColor: "var(--white)",
                              borderColor: "var(--dark-green)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--dark-green)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio root-color"
                            style={{ backgroundColor: "var(--dark-green)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--essential-ecru)",
                              onMouseEnterBgClor: "var(--essential-ecru)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--essential-ecru)"}
                            onClick={handleChange}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--essential-ecru)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--clever-blue)",
                              onMouseEnterBgClor: "var(--clever-blue)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: null,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--clever-blue)"}
                            onClick={handleChange}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--clever-blue)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--quality-azure)",
                              borderColor: "var(--quality-azure)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: null,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--quality-azure)"}
                            onClick={handleChange}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--quality-azure)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--delight-mint)",
                              onMouseEnterBgClor: "var(--delight-mint)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: null,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--delight-mint)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--delight-mint)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: "var(--standout-ruby)",
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--standout-ruby)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--standout-ruby)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--standout-ruby)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: "var(--savvy-salmon)",
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--savvy-salmon)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: null,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--savvy-salmon)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--savvy-salmon)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--optimistic-amber)",
                              onMouseEnterBgClor: "var(--optimistic-amber)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: null,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--optimistic-amber)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{
                              backgroundColor: "var(--optimistic-amber)",
                            }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-5 resume-box resume-preview-box">
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(8);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 8 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(8, "styleTempDBEight")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBEight">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(4);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 4 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(4, "styleTempDBSix")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBSix">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer "
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(5);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 5 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(5, "styleTempThree")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempThree">
                    <TemplateThreeStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(10);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 10 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(10, "styleTempDBTen")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBTen">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(11);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 11 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(11, "styleTempDBEleven")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBEleven">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(7);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 7 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(7, "styleTempDBSeven")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBSeven">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(12);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 12 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(12, "styleTempDBTwelve")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBTwelve">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(9);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 8 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(9, "styleTempDBNine")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempDBNine">
                    <TemplateFourStru />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(2);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 2 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(1, "styleTempOne")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempOne">
                    <TemplateThreeStru />
                    {/* <TemplateThree /> */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer "
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(3);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 3 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(2, "styleTempTwo")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempTwo">
                    <TemplateThreeStru />
                    {/* <TemplateThree /> */}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 mb-3 cursor-pointer "
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(6);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 6 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(6, "styleTempFour")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempFour">
                    <TemplateThreeStru />
                    {/* <TemplateThree /> */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer "
              // onMouseOver={() => {
              //   setmouseEntr(true);
              //   setId(7);
              // }}
              // onMouseLeave={() => setmouseEntr(false)}
            >
              {ismouseEntr && isId === 7 ? <HandleSelectTemplate /> : ""}
              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                  onClick={() => handleTemplateId(7, "styleTempFive")}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div>
                  <div className="resume-zoom styleTempFive">
                    <TemplateThreeStru />
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              className="col-lg-4 mb-3  cursor-pointer resume-home-temp"
              onMouseOver={() => {
                setmouseEntr(true);
                setId(1);
              }}
              onMouseLeave={() => setmouseEntr(false)}
              onClick={() => handleTemplateId("0")}
            >
              {ismouseEntr && isId === 1 ? <HandleSelectTemplate /> : ""}

              <div className="resume-temp">
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div className="resume-zoom">
                  <div>
                    <TemplateOne />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="footer-choose-btn">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-right">
                  <Link to={`/resume`}>
                    <button
                      className="btn site-btn mr-3 border-btn"
                      type="button"
                      onClick={() => handleTemplateId(1)}
                    >
                      {t("Choose Later")}
                    </button>
                  </Link>

                  this button will now show on hovering over template
                  <Link to={`/resume`}>
                    <button
                      onClick={() => {
                        if (!localToken) {
                          localStorage.setItem("resume_token", uuidv4());
                        }
                      }}
                      className="btn site-btn bg-blue text-white"
                      disabled={!tempid}
                    >
                      {t('Choose Template')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default TemplateBoxStructure;
