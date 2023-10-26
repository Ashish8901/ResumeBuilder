import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const ResumeEducation = ({ formData, preview }) => {
  const { t } = useTranslation();
  const styleobj = {
    fontSize: '',
  };
  const [SearchParams] = useSearchParams();
  const degreeObjectIndex = SearchParams.get('index');

  const [indexOfDegree, setIndexOfDegree] = useState('');

  const pathname = window.location.pathname;

  const resumeDegreeState = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const localEduValues = JSON.parse(localStorage.getItem('edu_summ_values'));
  const handleIndex = (id) => {
    setIndexOfDegree(id);
  };
  useEffect(() => {
    if (degreeObjectIndex !== null) {
      handleIndex(degreeObjectIndex);
    }
  }, [degreeObjectIndex]);

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

  return (
    <>
      <div className="resume-section educationclass resume-education">
        <h1
          className={`${
            preview === true ? "heading-resume" : "resume-heading"
          }`}
        >
          {t("Education")}
        </h1>
        <div className=" education-list ">
          <div
            className={`${preview === true ? "paragraph1" : "paragraph"}`}
            style={styleobj}
          >
            {resumeDegreeState?.length !== 0 ? (
              <>
                {resumeDegreeState?.map((degree, index) => {
                  return (
                    <>
                      {index === parseInt(indexOfDegree) &&
                      pathname !== "/choose-template" ? (
                        <>
                          <div>
                            <p className="mb-0 " key={index}>
                              {degree === null ||
                              pathname === "/choose-template"
                                ? "June 2016"
                                : // eslint-disable-next-line
                                // (degree?.gMonth &&
                                //     // eslint-disable-next-line
                                //     degree?.gMonth ===
                                //       localEduValues?.gMonth) ||
                                //   pathname?.includes("work-expr-form")
                                !localEduValues?.studyStartMonth &&
                                  !localEduValues?.studyStartYear &&
                                  !localEduValues?.studyEndMonth &&
                                  !localEduValues?.studyEndYear &&
                                  !localEduValues?.check
                                ? // eslint-disable-next-line
                                  ``
                                : localEduValues?.studyStartMonth &&
                                  localEduValues?.studyStartYear &&
                                  localEduValues?.studyEndMonth &&
                                  localEduValues?.studyEndYear &&
                                  !localEduValues?.check
                                ? `${getMonthName(
                                    localEduValues?.studyStartMonth,
                                    localEduValues?.studyStartYear
                                  )}/${
                                    localEduValues?.studyStartYear
                                  } - ${getMonthName(
                                    localEduValues?.studyEndMonth,
                                    localEduValues?.studyEndYear
                                  )}/${localEduValues?.studyEndYear}`
                                : localEduValues?.studyStartMonth &&
                                  localEduValues?.studyStartYear &&
                                  !localEduValues?.studyEndMonth &&
                                  !localEduValues?.studyEndYear &&
                                  localEduValues?.check
                                ? `${getMonthName(
                                    localEduValues?.studyStartMonth,
                                    localEduValues?.studyStartYear
                                  )}/${
                                    localEduValues?.studyStartYear
                                  } - Current`
                                : !localEduValues?.studyStartMonth &&
                                  !localEduValues?.studyStartYear &&
                                  !localEduValues?.studyEndMonth &&
                                  !localEduValues?.studyEndYear &&
                                  localEduValues?.check
                                ? ` - Current`
                                : localEduValues?.studyStartMonth &&
                                  localEduValues?.studyStartYear &&
                                  !localEduValues?.studyEndMonth &&
                                  !localEduValues?.studyEndYear &&
                                  !localEduValues?.check
                                ? `${getMonthName(
                                    localEduValues?.studyStartMonth,
                                    localEduValues?.studyStartYear
                                  )}/${localEduValues?.studyStartYear} - `
                                : !localEduValues?.studyStartMonth &&
                                  !localEduValues?.studyStartYear &&
                                  localEduValues?.studyEndMonth &&
                                  localEduValues?.studyEndYear &&
                                  !localEduValues?.check &&
                                  ` - ${getMonthName(
                                    localEduValues?.studyEndMonth,
                                    localEduValues?.studyEndYear
                                  )}/${localEduValues?.studyEndYear}`}
                            </p>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? "Field Of Study"
                                : // eslint-disable-next-line
                                (degree?.degree &&
                                    // eslint-disable-next-line
                                    degree?.degree ===
                                      localEduValues?.sdegree) ||
                                  pathname?.includes("work-expr-form")
                                ? `${degree?.sdegree} ${degree?.fieldOStudy}`
                                : `${localEduValues?.sdegree} : ${localEduValues?.fieldOStudy}`}
                            </p>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? "New Delhi, India"
                                : // eslint-disable-next-line
                                (degree?.sname &&
                                    // eslint-disable-next-line
                                    degree?.sname === localEduValues?.sname) ||
                                  pathname?.includes("work-expr-form")
                                ? `${degree?.sname} ${degree?.slname}`
                                : `${localEduValues?.sname},${localEduValues?.slname} `}
                            </p>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? ""
                                : // eslint-disable-next-line
                                (degree?.sdescription &&
                                    degree?.sdescription ===
                                      // eslint-disable-next-line
                                      localEduValues?.sdescription) ||
                                  pathname?.includes("work-expr-form")
                                ? ReactHtmlParser(degree?.sdescription)
                                : ReactHtmlParser(localEduValues?.sdescription)}
                            </p>
                            <p className="mb-0">
                              {degree === null ||
                              pathname === "/choose-template" ? (
                                "sasa"
                              ) : localEduValues?.pointer ? (
                                <>
                                  <b>NOTENDURCHSCHNITT :</b>
                                  {localEduValues?.pointer}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                            <p className="mb-0 ">
                              {localEduValues?.educationDescription ||
                              localEduValues?.educationDescription !== "" ? (
                                <>
                                  {" "}
                                  {ReactHtmlParser(
                                    localEduValues?.educationDescription
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? "June 2016"
                                : !degree?.studyStartMonth &&
                                  !degree?.studyStartYear &&
                                  !degree?.studyEndMonth &&
                                  !degree?.studyEndYear &&
                                  !degree?.check
                                ? `Month Year`
                                : degree?.studyStartMonth &&
                                  degree?.studyStartYear &&
                                  degree?.studyEndMonth &&
                                  degree?.studyEndYear &&
                                  !degree?.check
                                ? `${getMonthName(
                                    degree?.studyStartMonth,
                                    degree?.studyStartYear
                                  )}/${degree?.studyStartYear} - ${getMonthName(
                                    degree?.studyEndMonth,
                                    degree?.studyEndYear
                                  )}/${degree?.studyEndYear}`
                                : degree?.studyStartMonth &&
                                  degree?.studyStartYear &&
                                  !degree?.studyEndMonth &&
                                  !degree?.studyEndYear &&
                                  degree?.check
                                ? `${getMonthName(
                                    degree?.studyStartMonth,
                                    degree?.studyStartYear
                                  )}/${degree?.studyStartYear} - Current`
                                : ``}
                            </p>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? "Field Of Study"
                                : degree?.fieldOStudy?.length === 0
                                ? "Field Of Study"
                                : `${degree?.sdegree} : ${degree?.fieldOStudy}`}
                            </p>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? "New Delhi, India"
                                : degree?.slname?.length === 0
                                ? "New Delhi, India"
                                : `${degree?.sname},${degree?.slname} `}
                            </p>
                            <p className="mb-0 ">
                              {degree === null ||
                              pathname === "/choose-template"
                                ? ""
                                : degree?.sdescription?.length === 0
                                ? ""
                                : ReactHtmlParser(degree?.sdescription)}
                            </p>
                            <p className="mb-0">
                              {degree === null ||
                              pathname === "/choose-template" ? (
                                "sasa"
                              ) : degree?.pointer ? (
                                <>
                                  <b>NOTENDURCHSCHNITT :</b>
                                  {degree?.pointer}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                            <p className="mb-0 ">
                              {degree?.educationDescription ||
                              degree?.educationDescription !== "" ? (
                                <>
                                  {" "}
                                  {ReactHtmlParser(
                                    degree?.educationDescription
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </>
                      )}

                      <br />
                    </>
                  );
                  // }
                })}
                {!degreeObjectIndex && localEduValues && (
                  <div>
                    <p className="mb-0 ">
                      {pathname === "/choose-template"
                        ? ""
                        : localEduValues?.gMonth?.length === 0
                        ? ""
                        : `${localEduValues?.gMonth}, ${localEduValues?.gYear}`}
                    </p>
                    <p className="mb-0 ">
                      {pathname === "/choose-template"
                        ? ""
                        : !localEduValues?.sdegree
                        ? ""
                        : `${localEduValues?.sdegree} : ${localEduValues?.fieldOStudy}`}
                    </p>
                    <p className="mb-0 ">
                      {pathname === "/choose-template"
                        ? ""
                        : localEduValues?.sname?.length === 0
                        ? ""
                        : `${localEduValues?.sname},${localEduValues?.slname} `}
                    </p>
                    <p className="mb-0 ">
                      {pathname === "/choose-template"
                        ? ""
                        : localEduValues?.sdescription?.length === 0
                        ? ""
                        : ReactHtmlParser(localEduValues?.sdescription)}
                    </p>
                    <p>
                      {pathname === "/choose-template" ? (
                        ""
                      ) : localEduValues?.pointer ? (
                        <>
                          <b>NOTENDURCHSCHNITT :</b> {localEduValues?.pointer}
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                    <p className="mb-0 ">
                      {localEduValues?.educationDescription ||
                      localEduValues?.educationDescription !== "" ? (
                        <>
                          {" "}
                          {ReactHtmlParser(
                            localEduValues?.educationDescription
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mb-0 ">
                  {!localEduValues?.studyStartMonth &&
                  !localEduValues?.studyStartYear &&
                  !localEduValues?.studyEndMonth &&
                  !localEduValues?.studyEndYear &&
                  !localEduValues?.check
                    ? ``
                    : localEduValues?.studyStartMonth &&
                      localEduValues?.studyStartYear &&
                      !localEduValues?.studyEndMonth &&
                      !localEduValues?.studyEndYear &&
                      !localEduValues?.check
                    ? `${getMonthName(
                        localEduValues?.studyStartMonth,
                        localEduValues?.studyStartYear
                      )}/ ${localEduValues?.studyStartYear} - `
                    : !localEduValues?.studyStartMonth &&
                      !localEduValues?.studyStartYear &&
                      localEduValues?.studyEndMonth &&
                      localEduValues?.studyEndYear &&
                      !localEduValues?.check
                    ? ` - ${getMonthName(
                        localEduValues?.studyEndMonth,
                        localEduValues?.studyEndYear
                      )}/${localEduValues?.studyEndYear}`
                    : localEduValues?.studyStartMonth &&
                      localEduValues?.studyStartYear &&
                      !localEduValues?.studyEndMonth &&
                      !localEduValues?.studyEndYear &&
                      localEduValues?.check
                    ? `${getMonthName(
                        localEduValues?.studyStartMonth,
                        localEduValues?.studyStartYear
                      )}/${localEduValues?.studyStartYear} - Current`
                    : localEduValues?.studyStartMonth &&
                      localEduValues?.studyStartYear &&
                      localEduValues?.studyEndMonth &&
                      localEduValues?.studyEndYear &&
                      !localEduValues?.check
                    ? `${getMonthName(
                        localEduValues?.studyStartMonth,
                        localEduValues?.studyStartYear
                      )}/${localEduValues?.studyStartYear} - ${getMonthName(
                        localEduValues?.studyEndMonth,
                        localEduValues?.studyEndYear
                      )}/${localEduValues?.studyEndYear}`
                    : ""}
                </p>
                <p className="mb-0 ">
                  {localEduValues?.sdegree
                    ? `${localEduValues?.sdegree} : ${localEduValues?.fieldOStudy}`
                    : "Degree : Field Of Study"}
                </p>
                <p className="mb-0 ">
                  <strong>
                    {localEduValues?.sname
                      ? `${localEduValues?.sname},${localEduValues?.slname}`
                      : "School Name, City"}
                  </strong>
                </p>
                <p className="mb-0 ">
                  {!localEduValues?.sdescription
                    ? ``
                    : ReactHtmlParser(localEduValues?.sdescription)}
                </p>
                <p>
                  {localEduValues?.pointer ? (
                    <>
                      <b>NOTENDURCHSCHNITT :</b> {localEduValues?.pointer}
                    </>
                  ) : (
                    ""
                  )}
                </p>
                <p className="mb-0 ">
                  {localEduValues?.educationDescription ||
                  localEduValues?.educationDescription !== "" ? (
                    <>
                      {" "}
                      {ReactHtmlParser(localEduValues?.educationDescription)}
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeEducation;
