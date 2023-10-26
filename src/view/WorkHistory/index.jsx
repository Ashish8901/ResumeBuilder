// import PageHeading from "../../components/PageHeading";
// import PageSubHeading from "../../components/PageSubHeading";
// import PreviewTips from "../../components/PreviewTips";
import React, { useState, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkExpr,
  editJobData,
} from "../../redux/features/workExperienceSlice";
import { Modal } from "reactstrap";
import { useTranslation } from "react-i18next";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { SignalCellularNull } from "@material-ui/icons";
// import { isEmptyObject } from "jquery";
registerLocale("de", de);

const WorkHistoryForm = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const router = useNavigate();
  useSelector((store) => store.workExprData);
  const [SearchParams] = useSearchParams();
  const jobObjectIndex = SearchParams.get("index");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resume_token = localStorage.getItem("resume_token") || null;
  const resume_meta_value_workexpr = JSON.parse(
    localStorage.getItem("resume_meta_value_workexpr")
  );
  let meta_value =
    JSON.parse(localStorage.getItem("resume_meta_value_workexpr"))?.meta_value[
      jobObjectIndex ? jobObjectIndex : null
    ] || null;
  const [jobtitle, setJobtitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startPresent, setStartPresent] = useState(false);
  const [endPresent, setEndPresent] = useState(false);
  const [check, setCheck] = useState(false);
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const [startMonth, setstartMonth] = useState("");
  const [endMonth, setendMonth] = useState("");
  const [startYear, setstartYear] = useState(null);
  const [endYear, setendYear] = useState(null);
  const [sdate, setsdate] = useState(null);
  const [edate, setedate] = useState(null);
  const [isNextActive, setNextActive] = useState(false);
  const [isExperience, setExperience] = useState(true);
  const [description, setDescription] = useState("");
  const [lvalue, setLvalue] = useState([]);
  const [checkDesc, setCheckDesc] = useState(true);
  const newSkills = JSON.parse(
    localStorage.getItem("work_expr_values")
  )?.workDescription;
  const defaultValues = {
    jobtitle,
    employer,
    pincode,
    city,
    country,
    startMonth,
    startYear,
    endMonth,
    endYear,
    check,
    workDescription: description,
  };

  localStorage.setItem("work_expr_values", JSON.stringify(defaultValues));

  let years = [];
  for (let year = 1958; year <= currentYear; year++) {
    years.push(year);
  }
  years.reverse();

  useEffect(() => {
    if (sdate) {
      setStartPresent(true);
    }
    if (edate) {
      setEndPresent(true);
    }
  }, [sdate, edate]);

  const skillsListing = useSelector(
    (store) => store.ListingsData.skillsListings.data
  );

  const handleME = () => {
    if (!description?.length && newSkills === "" && checkDesc) {
      setDescription("<ul><li></li></ul>");
      setCheckDesc(false);
    }
  };

  const handleCkeditorState = (event, editor) => {
    const data = editor?.getData();
    setDescription(data);
    let arr = [...lvalue];
    let splArr = [];
    const skillLists = skillsListing.map((skill) => skill.description);
    for (let i of skillLists) {
      if (data.length === 0) {
        arr = [];
        setLvalue(arr);
      }
      if (!data.includes(i) && arr.includes(i)) {
        splArr.push(i);
        let filteredArr = arr.filter(function (val) {
          return splArr.indexOf(val) === -1;
        });

        setLvalue(filteredArr);
      } else {
        if (data.includes(i) && !arr.includes(i)) {
          arr.push(i);
          setLvalue(arr);
        }
      }
    }
  };

  const formatDate = (d) => {
    const formattedDate = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  const dateObj = (month, year) => {
    return formatDate(new Date(`${month} 1, ${year}`));
  };
  useEffect(() => {
    if (startMonth || startYear) {
      const x = dateObj(startMonth, startYear);
      setsdate(x);
    }
    if (endMonth || endYear) {
      const x = dateObj(endMonth, endYear);
      setedate(x);
    }
    // eslint-disable-next-line
  }, [startMonth, startYear, endMonth, endYear]);

  const getCurrentDate = () => {
    const year = today.getFullYear(); // Extract the year (2023)
    const month = today.getMonth(); // Extract the month (May) - Note: Months start from 0, so May is represented as 4
    // const day = today.getDate(); // Extract the day (15)
    return dateObj(month + 1, year);
  };

  //Check if start date is after current date
  const isStartDateAfterToday = (sdate) => {
    // today.setHours(23, 59, 59, 998)
    return new Date(sdate) > new Date(getCurrentDate());
  };

  //Check if start date is Greater than end date
  // eslint-disable-next-line
  const isStartDateGreater = (sdate, edate) => {
    const startDate = new Date(sdate);
    const endDate = new Date(edate);
    return startDate > endDate;
  };

  //Check if end date is after current date
  const isEndDateAfterToday = (edate) => {
    return new Date(edate) > new Date(getCurrentDate());
  };

  //Check if end date is Lower than start date
  const isEndDateLower = (sdate, edate) => {
    const startDate = new Date(sdate);
    const endDate = new Date(edate);
    return endDate < startDate;
  };

  useEffect(() => {
    if (!FinalResume && !resume_meta_value_workexpr?.meta_value?.length > 0) {
      localStorage.setItem("en_pth", pathname);
    } else {
      let route = "/work-Summary";
      localStorage.setItem("en_pth", route);
    }
  }, [pathname, FinalResume, resume_meta_value_workexpr?.meta_value?.length]);

  useEffect(() => {
    const getData = () => {
      setJobtitle(meta_value?.jobtitle);
      setEmployer(meta_value?.employer);
      setPincode(meta_value?.pincode);
      setCity(meta_value?.city);
      setCountry(meta_value?.country);
      setCheck(meta_value?.check);
      setDescription(meta_value?.workDescription);
      if (meta_value?.startMonth) {
        // console.log("PRESENT START =>", typeof meta_value?.start_date);
        // setStartDate(new Date(meta_value?.start_date));
        setstartMonth(meta_value?.startMonth);
      }
      if (meta_value?.startYear) {
        // console.log("PRESENT START =>", typeof meta_value?.start_date);
        setstartYear(meta_value?.startYear);
      }
      if (meta_value?.endMonth) {
        // console.log("PRESENT END =>", typeof meta_value?.end_date);
        setendMonth(meta_value?.endMonth);
      }
      if (meta_value?.endYear) {
        // console.log("PRESENT END =>", typeof meta_value?.end_date);
        setendYear(meta_value?.endYear);
      }
    };
    if (meta_value) getData();
    // eslint-disable-next-line
  }, []);

  const saveWorkExpr = () => {
    dispatch(
      addWorkExpr({
        data: {
          jobtitle,
          employer,
          city,
          country,
          pincode,
          // start_date: startDate,
          // end_date: endDate,
          startMonth,
          startYear,
          endMonth,
          endYear,
          check,
          workDescription: description,
        },
        resume_token,
      })
    )
      .then(() => {
        localStorage.removeItem("work_expr_values");
        router("/work-summary");
      })
      .catch((e) => {
        return e;
      });
  };
  const editJob = (jobObjectIndex) => {
    // const dataa = {
    //   jobtitle: jobtitle,
    //   employer: employer,
    //   city: city,
    //   country: country,
    //   pincode: pincode,
    //   // start_date: startDate,
    //   // end_date: endDate,
    //   startMonth: startMonth,
    //   startYear: startYear,
    //   endMonth: endMonth,
    //   endYear: endYear,
    //   check: check,
    //   workDescription: description,
    // };

    dispatch(
      editJobData({
        data: {
          jobtitle,
          employer,
          city,
          country,
          pincode,
          // start_date: startDate,
          // end_date: endDate,
          startMonth,
          startYear,
          endMonth,
          endYear,
          check,
          workDescription: description,
        },
        resume_token,
        jobObjectIndex,
      })
    );
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleCheck = (e) => {
    setCheck(!check);
    setedate(null);
    setendMonth(null);
    setendYear(null);
    setEndPresent(true);
  };

  const handleNext = () => {
    setNextActive(true);

    // no work experience
    if ((!jobtitle || !employer) && !sdate && !edate && !check) {
      setExperience(false);
      setModalOpen(!modalOpen);
      return;
    }

    if ((!jobtitle || !employer) && (startPresent || endPresent)) {
      setExperience(false);
      setModalOpen(!modalOpen);
      return;
    }

    if (
      isStartDateAfterToday(sdate) ||
      isEndDateAfterToday(edate) ||
      (isEndDateLower(sdate, edate) && !check)
    ) {
      return;
    }

    // if(!jobtitle && !employer && !sdate && !edate && !check ){

    // }

    // Start and end date doesn't exist but have job experience
    if (!sdate && !edate && !check && jobtitle && employer) {
      setExperience(true);
      setStartPresent(false);
      setEndPresent(false);
      return;
    }

    // Start date exist and end date doesn't exist/check not exist but have job experience
    if (sdate && !edate && !check && (jobtitle || employer)) {
      setExperience(true);
      setEndPresent(false);
      return;
    }

    // Start date doesn't exist and end date exist/end date doen't exist but currently working
    if (
      ((!sdate && edate && check) || (!sdate && !edate && check)) &&
      (jobtitle || employer)
    ) {
      setExperience(true);
      setStartPresent(false);
      return;
    }

    // Employer details doesn't exist but having start date or end date
    if (
      (!jobtitle || !employer) &&
      ((sdate && edate && !check) ||
        (sdate && !edate && check) ||
        (!sdate && edate && check))
    ) {
      setExperience(false);
      setModalOpen(!modalOpen);
      return;
    }

    if (jobObjectIndex) {
      localStorage.removeItem("work_expr_values");
      editJob(jobObjectIndex);
      router("/work-summary");
    } else if (!jobObjectIndex) {
      localStorage.removeItem("work_expr_values");
      saveWorkExpr();
      router("/work-Summary");
    }
  };

  const handleMonthChange = (event, start, end) => {
    if (start) {
      setstartMonth(event.target.value);
      return;
    }
    if (end) {
      setendMonth(event.target.value);
      return;
    }
  };

  const handleYearChange = (event, start, end) => {
    if (start) {
      setstartYear(parseInt(event.target.value));
      return;
    }
    if (end) {
      setendYear(parseInt(event.target.value));
      return;
    }
  };

  const eduData = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const skills = useSelector((store) => store.skillsData.Skills);
  const summary = useSelector((store) => store.summaryData.Summary);
  const isStudent = useSelector((store) => store.resumeData.studentCheck);
  const workData = useSelector((store) => store.workExprData.workExpr.jobsData);
  const handlePath = () => {
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
    } else if (!FinalResume && workData.length === 0 && eduData.length > 0) {
      navigate("/skill");
    } else if (!FinalResume && eduData.length === 0 && workData.length > 0) {
      navigate("/resume-education");
    }
  };
  const handleBack = () => {
    localStorage.removeItem("work_expr_values");
    if (FinalResume) {
      navigate("/Work-summary");
    } else if (!FinalResume && workData.length > 0) {
      navigate("/Work-summary");
    } else navigate("/expr");
  };

  return (
    <>
      <section className="choose-template-section resume-contact-section bg-double pt-4">
        <div className="container pt-1">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="page-title-big mleft-3">
                Super! Lassen Sie uns als nächstes Ihre
                <span style={{ color: "var(--yellow)" }}>
                  {" "}
                  Berufserfahrung&nbsp;
                </span>
                ausfüllen
              </h1>
              <p className="mleft-3">
                Lassen Sie uns mit Ihrer derzeitigen Anstellung beginnen.
                Darüber hinaus haben Sie auch die Möglichkeit, Praktika,
                ehrenamtliche Engagements oder andere relevante Aktivitäten
                einzubeziehen.
              </p>

              <form className="resume-contact-form">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label>{t("Job Title")}</label>
                      <input
                        type="text"
                        name="jobtitle"
                        value={jobtitle}
                        onChange={(e) => setJobtitle(e.target.value)}
                        className="form-control"
                        placeholder="z.B. Kassierer"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label>{t("Employer")}</label>
                      <input
                        type="text"
                        name="employer"
                        value={employer}
                        onChange={(e) => setEmployer(e.target.value)}
                        className="form-control"
                        placeholder="z.B. Daimler AG"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-6">
                    <div className="form-group">
                      <label>{t("City")}</label>
                      <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control"
                        placeholder="z.B. Berlin"
                      />
                    </div>
                  </div> */}
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label>{t("ort")}</label>
                      <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="form-control"
                        placeholder="z.B. Berlin"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-6">
                    <div className="form-group">
                      <label>{t("Pin Code")}</label>
                      <input
                        type="text"
                        name="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="form-control"
                        placeholder="z.B. 01067"
                      />
                    </div>
                  </div> */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>{t("Start Date")}</label>
                      <div className="date-picker-box date-flex">
                        {/* <span className="calendar-icon">
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </span> */}

                        <select
                          id="month-dropdown"
                          value={startMonth}
                          onChange={(e) => {
                            handleMonthChange(e, true, null);
                          }}
                        >
                          <option value="" disabled selected>
                            {t("Month")}
                          </option>
                          <option value="January">Januar</option>
                          <option value="February">Februar</option>
                          <option value="March">März</option>
                          <option value="April">April</option>
                          <option value="May">Mai</option>
                          <option value="June">Juni</option>
                          <option value="July">Juli</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">Oktober</option>
                          <option value="November">November</option>
                          <option value="December">Dezember</option>
                        </select>
                        {isNextActive && isStartDateAfterToday(sdate) && (
                          <span className="error-text" style={{ color: "red" }}>
                            {t("Your start date can't be after today's date.")}{" "}
                          </span>
                        )}
                        {isNextActive && isExperience && !startPresent && (
                          <span className="error-text" style={{ color: "red" }}>
                            {t("Your start date can't be empty.")}{" "}
                          </span>
                        )}
                        {/* {isStartDateGreater(sdate,edate) && (
                          <span style={{ color: "red" }}>
                            {t("Your start date can't be greater than end date.")}{" "}
                          </span>
                        )}  */}

                        <select
                          id="month-dropdown"
                          value={startYear}
                          onChange={(e) => {
                            handleYearChange(e, true, null);
                          }}
                        >
                          <option value="year" disabled selected>
                            {t("Year")}
                          </option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>

                        {/* <DatePicker
                          locale="de"
                          autoComplete="off"
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              setCheckAfter(false);
                              setStartDate(null);
                              setCheckBefore(false);
                            } else {
                              e.preventDefault();
                            } 
                          }}
                          className="form-control"
                          name="start_date"
                          dateFormat="MM/yyyy"
                          closeOnScroll={(e) => e.target === document}
                          selected={startDate ? new Date(startDate) : ""}
                          onChange={(date) => handleStartDate(date)}
                          placeholderText={t("Select")}
                          showMonthYearPicker
                          scrollableMonthYearDropdown
                        />
                        isStartDateAfterToday
            () && (
                          <span style={{ color: "red" }}>
                            {t("Your start date can't be after today's date.")}
                          </span>
                        )}
                        {startPresent && (
                          <span style={{ color: "red" }}>
                            {t("Your start date can't be empty.")}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mleft-3">
                    <div className="form-group">
                      <label>{t("End Date")}</label>
                      <div className="date-picker-box date-flex">
                        {/* <span className="calendar-icon">
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </span> */}

                        <select
                          id="month-dropdown"
                          value={endMonth}
                          onChange={(e) => {
                            handleMonthChange(e, null, true);
                          }}
                          disabled={check}
                        >
                          <option value="" disabled selected>
                            {t("Month")}
                          </option>
                          <option value="January">Januar</option>
                          <option value="February">Februar</option>
                          <option value="March">März</option>
                          <option value="April">April</option>
                          <option value="May">Mai</option>
                          <option value="June">Juni</option>
                          <option value="July">Juli</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">Oktober</option>
                          <option value="November">November</option>
                          <option value="December">Dezember</option>
                        </select>
                        {isNextActive && isEndDateAfterToday(edate) && (
                          <span className="error-text" style={{ color: "red" }}>
                            {t("Your end date can't be after current date.")}{" "}
                          </span>
                        )}
                        {isNextActive && isExperience && !endPresent && (
                          <span className="error-text" style={{ color: "red" }}>
                            {t("Your end date can't be empty.")}{" "}
                          </span>
                        )}
                        {isExperience &&
                          edate !== null &&
                          isEndDateLower(sdate, edate) && (
                            <span
                              className="error-text"
                              style={{ color: "red" }}
                            >
                              {t(
                                "Your end date can't be before the start date."
                              )}{" "}
                            </span>
                          )}

                        <select
                          id="month-dropdown"
                          value={endYear}
                          onChange={(e) => {
                            handleYearChange(e, null, true);
                          }}
                          disabled={check}
                        >
                          <option value="year" disabled selected>
                            {t("Year")}
                          </option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>

                        {/* 
                        <DatePicker
                          locale="de"
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              setCheckBefore(false);
                              setEndDate(null);
                            } else {
                              e.preventDefault();
                            }
                          }}
                          autoComplete="off"
                          className="form-control"
                          name="end_date"
                          dateFormat="MM/yyyy"
                          closeOnScroll={(e) => e.target === document}
                          selected={endDate ? new Date(endDate) : ""}
                          onChange={(date) => handleEndDate(date)}
                          placeholderText={t("Select")}
                          showMonthYearPicker
                          scrollableMonthYearDropdown
                          disabled={check}
                        />
                        isEndDateLower() && (
                          <span style={{ color: "red" }}>
                            {t("Your end date can't be before the start date.")}{" "}
                          </span>
                        )}
                        {endPresent && (
                          <span style={{ color: "red" }}>
                            {t("Your end date can't be empty.")}{" "}
                          </span>
                        )} */}
                      </div>
                    </div>
                    <div className="form-group">
                      <div>
                        <label className="custom-check-container">
                          Aktuell
                          <input
                            type="checkbox"
                            onChange={handleCheck}
                            checked={check}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-6"></div> */}
                  <div className="col-lg-12 mleft-3"></div>
                </div>
                <p>
                  <span
                    className="text-blue bold"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Zusdtzliche Felder ausblenden{" "}
                    <span className="collapse-icon">
                      <i className="fa fa-chevron-down"></i>
                    </span>
                  </span>
                </p>
                <div className="collapse " id="collapseExample">
                  <div className="mt-3" onClick={handleME}>
                    <label>Beschreibung und Erfolge</label>
                    <CKEditor
                      config={{
                        toolbar: [
                          "bold",
                          "italic",
                          "bulletedList",
                          "undo",
                          "redo",
                          "underline",
                        ],
                      }}
                      editor={ClassicEditor}
                      data={`${description?.length > 0 ? description : ""}`}
                      onChange={handleCkeditorState}
                      // onReady={(editor) => {}}
                      // onBlur={(event, editor) => {}}
                      // onFocus={(event, editor) => {}}
                    />
                  </div>
                </div>

                <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                  className="modal-dialog more-info-modal"
                >
                  <div className="modal-content ">
                    <div className="modal-header">
                      <button
                        className="close"
                        onClick={() => {
                          setModalOpen(!modalOpen);
                        }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <h2 className="modal-title h4 mb-3">
                            {t("More Information Needed")}
                          </h2>
                          <p className="p mb-0">
                            {t(
                              "Looks like you haven't entered any past work experience."
                            )}{" "}
                            {t(
                              "We recommend that you at least enter your past"
                            )}{" "}
                            <b>{t("Position")}</b> {t("and")}{" "}
                            <b>{t("Company")}</b>.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="custom-modal-footer">
                      <div className="row">
                        <div className="col-sm-8 pd-0">
                          <button
                            className="d-block btn site-btn border-btn text-inherit"
                            onClick={() => {
                              setModalOpen(!modalOpen);
                              handlePath();
                              localStorage.setItem("strWork", 0);
                              localStorage.removeItem("work_expr_values");
                            }}
                          >
                            {t("I don't have work experience")}
                          </button>
                        </div>
                        <div className="col-sm-4  pd-0">
                          <Link
                            to="/Work-summary"
                            className="d-block btn site-btn bg-blue text-white"
                            onClick={() => {
                              localStorage.removeItem("work_expr_values");

                              setModalOpen(!modalOpen);
                            }}
                          >
                            {t("OK")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </form>
              <div className="row mt-10 ">
                <div className="col-sm-6 col-6 mleft-3">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-6 text-right">
                  <span
                  // onClick={() => setModalOpen(!modalOpen)}
                  >
                    <button
                      type="button"
                      className="btn site-btn bg-blue text-white"
                      data-toggle="modal"
                      data-target="#moreinfoModal"
                      onClick={() => handleNext()}

                      // if (startDate && !endDate && !check) {
                      //   setEndPresent(true);
                      // } else if (!startDate && (endDate || check)) {
                      //   setStartPresent(true);
                      // } else if (
                      //   (!startDate && !endDate && !check) ||
                      //   (!checkAfter &&
                      //     !checkBefore &&
                      //     !startPresent &&
                      //     !endPresent)
                      // ) {
                      //   localStorage.removeItem("work_expr_values");
                      //   if (
                      //     defaultValues.jobtitle === "" ||
                      //     !defaultValues.employer
                      //   ) {
                      //     setModalOpen(!modalOpen);
                      //     return;
                      //   } else if (jobObjectIndex) {
                      //     localStorage.removeItem("work_expr_values");
                      //     editJob(jobObjectIndex);
                      //     router("/work-summary");
                      //   } else if (!jobObjectIndex) {
                      //     localStorage.removeItem("work_expr_values");
                      //     saveWorkExpr();
                      //     router("/work-Summary");
                      //   }
                      //   }

                      // onClick={() => {
                      //   localStorage.removeItem("work_expr_values");
                      //   if (defaultValues.jobtitle === "") {
                      //     setModalOpen(!modalOpen);
                      //     return;
                      //   }
                      //   if (jobObjectIndex || jobObjectIndex === "null") {
                      //     editJob(jobObjectIndex);
                      //     router("/work-Summary");
                      //   } else {
                      //     saveWorkExpr();
                      //     // router("/work-Summary");
                      //   }
                      // }}
                    >
                      {t("NEXT")}
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <PreviewTips exprData={defaultValues} /> */}
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkHistoryForm;
