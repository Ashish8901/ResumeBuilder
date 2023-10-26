import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

const ResumeWorkHistory = ({ exprData, preview }) => {
  const { t } = useTranslation();
  const styleobj = {
    fontSize: '',
  };
  const [SearchParams] = useSearchParams();
  const degreeObjectIndex = SearchParams.get('index');

  const pathname = window.location.pathname;
  const resumeWorkExprState = useSelector(
    (store) => store.workExprData.workExpr.jobsData
  );
  // console.log("ACT WORK =>", resumeWorkExprState);
  const localExprValues = JSON.parse(localStorage.getItem('work_expr_values'));
  // console.log("localExprValues =>", localExprValues);

  //Function for converting a month name--------
  const getMonthName = (month, year) => {
    if (month && year && month !== '' && year !== 'year') {
      return new Date(`${year} ${month}`).toLocaleString('default', {
        month: `2-digit`,
      });
    } else {
      return '';
    }
  };
  // eslint-disable-next-line
  const getYearNum = (month, year) => {
    if (month && year) {
      return new Date(`${year} ${month}`).getFullYear();
    }
  };

  return (
    <>
      <div
        className="resume-section work-history-box resume-workhistory"
        id="workHistory"
      >
        <h1
          className={`${
            preview === true ? "heading-resume" : "resume-heading"
          }`}
        >
          Berufserfahrung
        </h1>
        <div
          className={`${preview === true ? "paragraph1" : "paragraph"}`}
          style={styleobj}
        >
          {resumeWorkExprState?.length !== 0 ? (
            <>
              {resumeWorkExprState?.map((experience, index) => {
                return (
                  <>
                    {index === parseInt(degreeObjectIndex) &&
                    pathname !== "/choose-template" ? (
                      <div key={index}>
                        <p className=" mb-0 ">
                          {experience === null ||
                          pathname === "/choose-template"
                            ? "Software developer"
                            : // eslint-disable-next-line
                            (experience?.jobtitle &&
                                // eslint-disable-next-line
                                experience?.jobtitle ===
                                  // eslint-disable-next-line
                                  localExprValues?.jobtitle) ||
                              pathname.includes("edu-del")
                            ? experience?.jobtitle
                            : localExprValues?.jobtitle}
                        </p>
                        <p className=" mb-0">
                          {experience === null ||
                          pathname === "/choose-template"
                            ? "H & M Retail Sales Associate"
                            : // eslint-disable-next-line
                            (experience?.employer &&
                                // eslint-disable-next-line
                                experience?.employer ===
                                  // eslint-disable-next-line
                                  localExprValues?.employer) ||
                              pathname.includes("edu-del")
                            ? experience?.employer
                            : localExprValues?.employer}
                        </p>
                        <p className="mb-0">
                          {experience === null ||
                          pathname === "/choose-template"
                            ? "New Delhi, India"
                            : (experience?.country &&
                                // eslint-disable-next-line

                                experience?.country ===
                                  // eslint-disable-next-line
                                  localExprValues?.country) ||
                              pathname.includes("edu-del")
                            ? `${experience?.country}`
                            : `${localExprValues?.country} `}
                        </p>
                        <p className="Date mb-0 ">
                          {experience === null ||
                          pathname === "/choose-template"
                            ? "05/2016 - Current"
                            : !localExprValues?.startMonth &&
                              !localExprValues?.startYear &&
                              !localExprValues?.endMonth &&
                              !localExprValues?.endYear &&
                              !localExprValues?.check
                            ? ``
                            : localExprValues?.startMonth &&
                              localExprValues?.startYear &&
                              localExprValues?.endMonth &&
                              localExprValues?.endYear &&
                              !localExprValues?.check
                            ? `${getMonthName(
                                localExprValues?.startMonth,
                                localExprValues?.startYear
                              )}/
                                ${localExprValues?.startYear}
                               - ${getMonthName(
                                 localExprValues?.endMonth,
                                 localExprValues?.endYear
                               )} ${localExprValues?.endYear}`
                            : localExprValues?.startMonth &&
                              localExprValues?.startYear &&
                              !localExprValues?.endMonth &&
                              !localExprValues?.endMonth &&
                              localExprValues?.check
                            ? `${getMonthName(
                                localExprValues?.startMonth,
                                localExprValues?.startYear
                              )}/
                              ${localExprValues?.startYear} - Current`
                            : !localExprValues?.startMonth &&
                              !localExprValues?.startYear &&
                              !localExprValues?.endMonth &&
                              !localExprValues?.endYear &&
                              localExprValues?.check
                            ? ` - Current`
                            : (localExprValues?.startMonth &&
                                localExprValues?.startYear &&
                                !localExprValues?.endMonth &&
                                !localExprValues?.endYear) ||
                              !localExprValues?.check
                            ? `${getMonthName(
                                localExprValues?.startMonth,
                                localExprValues?.startYear
                              )}/
                            ${localExprValues?.startYear} - `
                            : !localExprValues?.startMonth &&
                              !localExprValues?.startYear &&
                              localExprValues?.endMonth &&
                              localExprValues?.endYear &&
                              !localExprValues?.check &&
                              `${getMonthName(
                                localExprValues?.endMonth,
                                localExprValues?.endYear
                              )}/
                          ${localExprValues?.endYear}`}
                        </p>

                        {localExprValues?.workDescription ||
                        localExprValues?.workDescription !== "" ? (
                          <>
                            {" "}
                            {ReactHtmlParser(localExprValues?.workDescription)}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <>
                        <div key={index}>
                          <p className=" mb-0">
                            {experience === null ||
                            pathname === "/choose-template"
                              ? ""
                              : experience?.jobtitle?.length === 0
                              ? ""
                              : `${experience?.jobtitle}`}
                          </p>

                          <p className="mb-0">
                            {experience === null ||
                            pathname === "/choose-template"
                              ? ""
                              : experience?.employer?.length === 0
                              ? ""
                              : experience?.employer}
                          </p>
                          <p className="mb-0 ">
                            {experience === null ||
                            pathname === "/choose-template"
                              ? ""
                              : experience?.country?.length === 0
                              ? ""
                              : `${experience?.country}`}
                          </p>
                          <p className="mb-0">
                            {experience === null ||
                            pathname === "/choose-template"
                              ? "May 2016 - Current"
                              : experience?.startMonth === null &&
                                experience?.startYear === null &&
                                experience?.endYear === null &&
                                experience?.endMonth === null &&
                                !experience?.check
                              ? "sasas"
                              : experience?.startMonth &&
                                experience?.startYear &&
                                experience?.endYear &&
                                experience?.endMonth &&
                                !experience?.check
                              ? `${getMonthName(
                                  experience?.startMonth,
                                  experience?.startYear
                                )}/${experience?.startYear} - ${getMonthName(
                                  experience?.endMonth,
                                  experience?.endYear
                                )}/${experience?.endYear}`
                              : experience?.startMonth &&
                                experience?.startYear &&
                                !experience?.endYear &&
                                !experience?.endMonth &&
                                experience?.check
                              ? `${getMonthName(
                                  experience?.startMonth,
                                  experience?.startYear
                                )}/${experience?.startYear} - Current`
                              : ``}
                          </p>
                          {experience?.workDescription ||
                          experience?.workDescription !== "" ? (
                            <> {ReactHtmlParser(experience?.workDescription)}</>
                          ) : (
                            ""
                          )}
                          <br />
                        </div>
                      </>
                    )}
                  </>
                );
              })}
              {/* New  */}
              {!degreeObjectIndex && (
                <div>
                  <p className=" mb-0">
                    {pathname === "/choose-template"
                      ? ""
                      : localExprValues?.jobtitle?.length === 0
                      ? ""
                      : localExprValues?.jobtitle}
                  </p>

                  <p className="mb-0">
                    {pathname === "/choose-template"
                      ? ""
                      : localExprValues?.employer?.length === 0
                      ? ""
                      : localExprValues?.employer}
                  </p>
                  <p className="mb-0 ">
                    {pathname === "/choose-template"
                      ? ""
                      : !localExprValues?.country
                      ? ""
                      : `${localExprValues?.country}`}
                  </p>
                  <p className="mb-0">
                    {pathname === "/choose-template"
                      ? ""
                      : !localExprValues?.startMonth &&
                        !localExprValues?.startYear &&
                        !localExprValues?.endMonth &&
                        !localExprValues?.endYear &&
                        !localExprValues?.check
                      ? ""
                      : localExprValues?.startMonth &&
                        localExprValues?.startYear &&
                        !localExprValues?.endMonth &&
                        !localExprValues?.endYear &&
                        !localExprValues?.check
                      ? `${getMonthName(
                          localExprValues?.startMonth,
                          localExprValues?.startYear
                        )}/${localExprValues?.startYear}`
                      : !localExprValues?.startMonth &&
                        !localExprValues?.startYear &&
                        localExprValues?.endMonth &&
                        localExprValues?.endYear &&
                        !localExprValues?.check
                      ? ` - ${getMonthName(
                          localExprValues?.endMonth,
                          localExprValues?.endYear
                        )}/${localExprValues?.endYear}`
                      : localExprValues?.startMonth &&
                        localExprValues?.startYear &&
                        localExprValues?.endMonth &&
                        localExprValues?.endYear &&
                        !localExprValues?.check
                      ? `${getMonthName(
                          localExprValues?.startMonth,
                          localExprValues?.startYear
                        )} ${localExprValues?.startYear} - ${getMonthName(
                          localExprValues?.endMonth,
                          localExprValues?.endYear
                        )}/${localExprValues?.endYear}`
                      : localExprValues?.startMonth &&
                        localExprValues?.startYear &&
                        !localExprValues?.endMonth &&
                        !localExprValues?.endYear &&
                        localExprValues?.check
                      ? `${getMonthName(
                          localExprValues?.startMonth,
                          localExprValues?.startYear
                        )}/${localExprValues?.startYear} - Current`
                      : !localExprValues?.startMonth &&
                        !localExprValues?.startYear &&
                        !localExprValues?.endMonth &&
                        !localExprValues?.endYear &&
                        localExprValues?.check
                      ? "Current"
                      : ""}
                  </p>
                  {localExprValues?.workDescription ||
                  localExprValues?.workDescription !== "" ? (
                    <> {ReactHtmlParser(localExprValues?.workDescription)}</>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <p className=" mb-0 ">
                {localExprValues?.jobtitle && pathname !== "/choose_template"
                  ? `${localExprValues?.jobtitle}`
                  : "H & M Retail Sales Associate"}{" "}
              </p>
              <p className="mb-0">
                {localExprValues?.employer && pathname !== "/choose-template"
                  ? `${localExprValues?.employer}`
                  : "XYZ_name"}
              </p>
              <p className="city-name mb-0">
                {localExprValues?.country && pathname !== "/choose_template"
                  ? `${localExprValues?.country}`
                  : "Germany"}
              </p>
              <p className="Date mb-0">
                {!localExprValues?.startMonth &&
                !localExprValues?.startYear &&
                !localExprValues?.endYear &&
                !localExprValues?.endMonth &&
                !localExprValues?.check
                  ? ``
                  : !localExprValues?.startMonth &&
                    !localExprValues?.startYear &&
                    localExprValues?.endYear &&
                    localExprValues?.endMonth &&
                    !localExprValues?.check
                  ? ` - ${getMonthName(
                      localExprValues?.endMonth,
                      localExprValues?.endYear
                    )}/${localExprValues?.endYear}`
                  : localExprValues?.startMonth &&
                    localExprValues?.startYear &&
                    !localExprValues?.endYear &&
                    !localExprValues?.endMonth &&
                    localExprValues?.check
                  ? `${getMonthName(
                      localExprValues?.startMonth,
                      localExprValues?.startYear
                    )}/${localExprValues?.startYear} - Current`
                  : localExprValues?.startMonth &&
                    localExprValues?.startYear &&
                    localExprValues?.endYear &&
                    localExprValues?.endMonth &&
                    !localExprValues?.check
                  ? `${getMonthName(
                      localExprValues?.startMonth,
                      localExprValues?.startYear
                    )}/${localExprValues?.startYear} - ${getMonthName(
                      localExprValues?.endMonth,
                      localExprValues?.endYear
                    )}/${localExprValues?.endYear}`
                  : !localExprValues?.startMonth &&
                    !localExprValues?.startYear &&
                    !localExprValues?.endYear &&
                    !localExprValues?.endMonth &&
                    localExprValues?.check
                  ? `Current`
                  : localExprValues?.startMonth &&
                    localExprValues?.startYear &&
                    !localExprValues?.endYear &&
                    !localExprValues?.endMonth &&
                    !localExprValues?.check
                  ? `${getMonthName(
                      localExprValues?.startMonth,
                      localExprValues?.startYear
                    )}/${localExprValues?.startYear} - `
                  : ``}
              </p>
              {localExprValues?.workDescription ||
              localExprValues?.workDescription !== "" ? (
                <> {ReactHtmlParser(localExprValues?.workDescription)}</>
              ) : (
                ""
              )}
              {localExprValues?.jobtitle && pathname !== "/choose-template" ? (
                ""
              ) : (
                <ul>
                  <li>
                    {t(
                      "Effectively upsold products by introducing accessories and other add-ons, tmkc ₹3000 to average monthly tmkcs."
                    )}
                  </li>
                  <li>
                    {t(
                      "Generated tmkc awareness and positive product impressions to increase sales 22%."
                    )}
                  </li>
                  <li>
                    {t(
                      "Used consultative tmkc approach to understand customer needs and recommend relevant offerings."
                    )}
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeWorkHistory;
