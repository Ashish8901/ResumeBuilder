import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const ResumeLanguage = ({ preview }) => {
  const { t } = useTranslation();
  const langHead = useSelector((store) => store.extraSecArrData.extraSecArray);
  const pathname = window.location.pathname;
  const langData = useSelector(
    (store) => store.LanguageData.Language.nativeLang
  );
  const langProData = useSelector(
    (store) => store.LanguageData.Language.proLanguage
  );

  const styleobj = {
    fontSize: '',
  };

  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
      {pathname === "/choose-template" ? (
        <>
          <div className="resume-section">
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Languages")}
            </h1>
            <div className="paregraph">
              <p className="semi-bold mb-2">
                <span>Hindi</span> : Native Language
              </p>
              <div className="row">
                <div className="col-6">
                  <p className="percent mb-1 ">
                    <span>Hindi</span>
                    <span>100</span>
                  </p>
                  <div className="percent-box">
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                  </div>
                  <p className="percent">
                    <span>Percentage</span>
                  </p>
                </div>
                <div className="col-6">
                  <p className="percent mb-1 ">
                    <span>English</span>
                    <span>100</span>
                  </p>
                  <div className="percent-box">
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                    <div
                      className="percent-clr"
                      style={{
                        background:
                          templateColorState.onMouseEnterBgClor === null
                            ? templateColorState.backgroundColor
                            : templateColorState.onMouseEnterBgClor,
                      }}
                    ></div>
                  </div>
                  <p className="percent">
                    <span>Percentage</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="resume-section language-box resume-langg">
        {langData[0]?.nativeLang && pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Languages")}
            </h1>
            <p className="paragraph semi-bold mb-2 ">
              <span>
                {langData?.map((language) => {
                  return (
                    <>
                      {language.nativeLang}
                      {language !== langData[langData.length - 1]
                        ? ","
                        : ""}{" "}
                    </>
                  );
                })}
              </span>{" "}
              : Múttersprache
            </p>
          </>
        ) : !langData.length > 0 &&
          langHead.includes(`${t("Languages")}`) &&
          pathname !== "/choose-template" ? (
          <>
            <h1
              className={`${
                preview === true ? "heading-resume" : "resume-heading"
              }`}
            >
              {t("Languages")}
            </h1>
          </>
        ) : (
          ""
        )}
        {langProData[0]?.language && pathname !== "/choose-template" ? (
          <div
            className={`${preview === true ? "paragraph1" : "paragraph"}`}
            style={styleobj}
          >
            <div className="row">
              <div className="col-6">
                {langProData?.map((pro) => {
                  return (
                    <>
                      <p className="percent mb-1  ">
                        <span>{pro.language}</span>
                        <span>{pro.level}</span>
                      </p>
                      <div className="percent-box">
                        <div
                          className="percent-clr slide-bg-clr"
                          style={{
                            background:
                              pro.value === 0 ||
                              pro.value === 20 ||
                              pro.value === 40 ||
                              pro.value === 60 ||
                              pro.value === 80 ||
                              pro.value === 100
                                ? templateColorState.onMouseEnterBgClor === null
                                  ? templateColorState.backgroundColor
                                  : templateColorState.onMouseEnterBgClor
                                : "#ccc",
                          }}
                        ></div>
                        <div
                          className="percent-clr slide-bg-clr"
                          style={{
                            background:
                              pro.value === 20 ||
                              pro.value === 40 ||
                              pro.value === 60 ||
                              pro.value === 80 ||
                              pro.value === 100
                                ? templateColorState.onMouseEnterBgClor === null
                                  ? templateColorState.backgroundColor
                                  : templateColorState.onMouseEnterBgClor
                                : "#ccc",
                          }}
                        ></div>
                        <div
                          className="percent-clr slide-bg-clr"
                          style={{
                            background:
                              pro.value === 40 ||
                              pro.value === 60 ||
                              pro.value === 80 ||
                              pro.value === 100
                                ? templateColorState.onMouseEnterBgClor === null
                                  ? templateColorState.backgroundColor
                                  : templateColorState.onMouseEnterBgClor
                                : "#ccc",
                          }}
                        ></div>
                        <div
                          className="percent-clr slide-bg-clr"
                          style={{
                            background:
                              pro.value === 60 ||
                              pro.value === 80 ||
                              pro.value === 100
                                ? templateColorState.onMouseEnterBgClor === null
                                  ? templateColorState.backgroundColor
                                  : templateColorState.onMouseEnterBgClor
                                : "#ccc",
                          }}
                        ></div>
                        <div
                          className="percent-clr slide-bg-clr"
                          style={{
                            background:
                              pro.value === 80 || pro.value === 100
                                ? templateColorState.onMouseEnterBgClor === null
                                  ? templateColorState.backgroundColor
                                  : templateColorState.onMouseEnterBgClor
                                : "#ccc",
                          }}
                        ></div>
                        <div
                          className="percent-clr slide-bg-clr"
                          style={{
                            background:
                              pro.value === 100
                                ? templateColorState.onMouseEnterBgClor === null
                                  ? templateColorState.backgroundColor
                                  : templateColorState.onMouseEnterBgClor
                                : "#ccc",
                          }}
                        ></div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResumeLanguage;
