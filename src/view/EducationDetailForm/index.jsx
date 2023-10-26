import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// import DescrptionSection from "../../components/DescrptionSection";
// import PageHeading from "../../components/PageHeading";
// import PageSubHeading from "../../components/PageSubHeading";
// import PreviewTips from "../../components/PreviewTips";
import {
  addEducation,
  editIndexData,
  getDegree,
  getEducation,
} from "../../redux/features/resumeSlice";
import { useTranslation } from "react-i18next";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const EducationDetailForm = ({ handleRemoval }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const resumeState = useSelector((store) => store.resumeData);
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const [SearchParams] = useSearchParams();
  const degreeObjectIndex = SearchParams.get("index");
  const dispatch = useDispatch();
  const resume_meta_value_education = JSON.parse(
    localStorage.getItem("resume_meta_value_education")
  );
  const Edudata = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );

  useEffect(() => {
    if (
      !FinalResume &&
      // !resume_meta_value_education?.meta_value &&
      !resume_meta_value_education?.meta_value?.length > 0
    ) {
      localStorage.setItem("en_pth", pathname);
    } else {
      let route = "/edu-summary";
      localStorage.setItem("en_pth", route);
    }
  }, [pathname, FinalResume, resume_meta_value_education?.meta_value?.length]);

  useEffect(() => {
    dispatch(getDegree());
  }, [dispatch]);

  let meta_value =
    JSON.parse(localStorage.getItem("resume_meta_value_education"))?.meta_value[
      degreeObjectIndex ? degreeObjectIndex : null
    ] || null;
  const [sname, setSname] = useState("");
  const [slname, setSLname] = useState("");
  const [sdegree, setSDegree] = useState("");
  const [pointer, setPointer] = useState("");
  const [fieldOStudy, setFieldOStudy] = useState("");
  // const [gMonth, setGMonth] = useState("");
  // eslint-disable-next-line
  const [gYear, setGYear] = useState("");
  const [sdescription, setSDescription] = useState("");
  const [studyStartMonth, setStudyStartMonth] = useState("");
  const [studyStartYear, setStudyStartYear] = useState("");
  const [studyEndMonth, setStudyEndMonth] = useState("");
  const [studyEndYear, setStudyEndYear] = useState("");
  const [check, setCheck] = useState(false);
  const [checkDesc, setCheckDesc] = useState(true);
  const skills = JSON.parse(
    localStorage.getItem("edu_summ_values")
  )?.educationDescription;
  const [description, setDescription] = useState("");
  const [lvalue, setLvalue] = useState([]);
  const defaultValues = {
    sname,
    slname,
    sdegree,
    pointer,
    fieldOStudy,
    sdescription,
    gYear,
    studyEndMonth,
    studyEndYear,
    studyStartMonth,
    studyStartYear,
    check,
    educationDescription: description,
  };

  localStorage.setItem("edu_summ_values", JSON.stringify(defaultValues));

  useEffect(() => {
    const getData = () => {
      setSname(meta_value?.sname);
      setSLname(meta_value?.slname);
      setSDegree(meta_value?.sdegree);
      setPointer(meta_value?.pointer);
      setFieldOStudy(meta_value?.fieldOStudy);
      setSDescription(meta_value?.sdescription);
      setStudyStartMonth(meta_value?.studyStartMonth);
      setStudyStartYear(meta_value?.studyStartYear);
      setStudyEndMonth(meta_value?.studyEndMonth);
      setStudyEndYear(meta_value?.studyEndYear);
      setCheck(meta_value?.check);
      setDescription(meta_value?.educationDescription);
    };
    if (meta_value) getData();
    // eslint-disable-next-line
  }, []);

  const resume_token = localStorage.getItem("resume_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (resume_token) {
      if (meta_value) {
        dispatch(getEducation({ meta_key: "education", resume_token }));
      }
    }
  }, [dispatch, meta_value, resume_token]);

  const handleCheck = (e) => {
    setCheck(!check);
    setStudyEndYear(null);
    setStudyEndMonth(null);
  };

  const saveEducation = (e) => {
    if (sname.length === 0) {
      return toast.error("Bitte füllen Sie die Felder aus");
    }
    dispatch(
      addEducation({
        data: {
          sname,
          slname,
          sdegree,
          fieldOStudy,
          pointer,
          sdescription,
          studyEndMonth,
          studyEndYear,
          studyStartMonth,
          studyStartYear,
          check,
          educationDescription: description,
        },
        resume_token,
      })
    );
    navigate("/edu-summary");
  };
  const editEducation = (degreeObjectIndex) => {
    if (sname.length === 0) {
      return toast.error("Please fill the fields");
    }
    dispatch(
      editIndexData({
        data: {
          sname,
          slname,
          sdegree,
          fieldOStudy,
          pointer,
          sdescription,
          studyEndMonth,
          studyEndYear,
          studyStartMonth,
          studyStartYear,
          check,
          educationDescription: description,
        },
        resume_token,
        degreeObjectIndex,
      })
    );
    navigate("/edu-summary");
  };
  const YEAR = [];
  for (let i = 1957; i <= 2032; i++) {
    YEAR.unshift(i);
  }

  const handleBack = () => {
    localStorage.removeItem("edu_summ_values");
    if (FinalResume || Edudata?.length > 0) {
      navigate("/edu-summary");
    } else {
      navigate("/resume-education");
    }
  };

  const skillsListing = useSelector(
    (store) => store.ListingsData.skillsListings.data
  );

  const handleME = () => {
    if (!description?.length && skills === "" && checkDesc) {
      setDescription("<ul><li></li></ul>");
      setCheckDesc(false);
    }
  };

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
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

  return (
    <>
      <section className=" choose-template-section bg-double pt-4 pb-5">
        <div className="container pt-1">
          <div className="row">
            <div className="col-lg-6 ">
              <h1 className="page-title-big mleft-3">
                Erzählen Sie uns alles über Ihre&nbsp;
                <span style={{ color: "var(--yellow)" }}>Ausbildung</span>
              </h1>
              <p className="mleft-3">
                Führen Sie alle relevanten Qualifikationen, Abschlüsse und Kurse
                auf.
              </p>
              {/* <PageHeading headinglabel={t("Tell us about your education")} />
              <PageSubHeading
                subheading={t(
                  "Include every school, even if you're still there or didn't graduate."
                )}
              /> */}
              <form className="resume-contact-form">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>BILDUNGSSTÄTTE</label>
                      <input
                        type="text"
                        name="sname"
                        value={sname}
                        onChange={(e) => setSname(e.target.value)}
                        className="form-control"
                        placeholder="Humboldt-Universität zu Berlin"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>STANDORT DER BILDUNGSSTÄTTE</label>
                      <input
                        type="text"
                        name="slname"
                        value={slname}
                        onChange={(e) => setSLname(e.target.value)}
                        className="form-control"
                        placeholder="Berlin"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>{t("Degree")}</label>
                      <input
                        type="text"
                        name="sdegree"
                        value={sdegree}
                        onChange={(e) => setSDegree(e.target.value)}
                        className="form-control"
                        placeholder="Abschluss"
                      />

                      {/* <div className="slect-box">
                        <span className="select-icon">
                          <i className="fa fa-caret-down"></i>
                        </span>
                        <select
                          className="form-control"
                          name="sdegree"
                          value={sdegree}
                          onChange={(e) => setSDegree(e.target.value)}
                        >
                          <option hidden>{t("Select")}</option>
                          {resumeState?.degreeList?.map((data) => {
                            return (
                              <option value={data.title} key={data.id}>
                                {data.title}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>NOTENDURCHSCHNITT</label>
                      <input
                        type="number"
                        name="pointer"
                        value={pointer}
                        onChange={(e) => setPointer(e.target.value)}
                        className="form-control"
                        placeholder="4.5"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-6"></div> */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>STUDIENFACH/BERUFSABSCHLUSS</label>
                      <input
                        type="text"
                        name="fieldOStudy"
                        value={fieldOStudy}
                        onChange={(e) => setFieldOStudy(e.target.value)}
                        className="form-control"
                        placeholder="Informationstechnologie"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6"></div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>STUDIENBEGINN</label>
                      <div className="date-picker-box date-flex">
                        <select
                          className="form-control"
                          name="studyStartMonth"
                          value={studyStartMonth}
                          onChange={(e) => setStudyStartMonth(e.target.value)}
                        >
                          <option hidden>{t("Month")}</option>
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
                        <select
                          className="form-control"
                          name="studyStartYear"
                          onChange={(e) => setStudyStartYear(e.target.value)}
                          value={studyStartYear}
                        >
                          <option hidden>{t("Year")}</option>
                          {YEAR?.map((data) => {
                            return (
                              <option key={data} value={data}>
                                {data}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>ABSCHLUSSDATUM</label>
                      <div className="date-picker-box date-flex">
                        <select
                          disabled={check}
                          className="form-control"
                          name="studyEndMonth"
                          value={studyEndMonth}
                          onChange={(e) => setStudyEndMonth(e.target.value)}
                        >
                          <option hidden>{t("Month")}</option>
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
                        <select
                          disabled={check}
                          className="form-control"
                          name="studyEndYear"
                          onChange={(e) => setStudyEndYear(e.target.value)}
                          value={studyEndYear}
                        >
                          <option hidden>{t("Year")}</option>
                          {YEAR?.map((data) => {
                            return (
                              <option key={data} value={data}>
                                {data}
                              </option>
                            );
                          })}
                        </select>
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
                </div>
              </form>
              <div>
                Ergänzen Sie weitere Kursleistungen, auf die Sie besonders stolz
                sind.
              </div>
              <div className="mt-3" onClick={handleME}>
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
              <div className="row mt-4">
                <div className="col-sm-6 col-6 mleft-3 ">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-6 text-right">
                  {/* <Link to="/edu-summary"> */}
                  <button
                    type="button"
                    className="btn site-btn bg-blue text-white"
                    onClick={() => {
                      localStorage.removeItem("edu_summ_values");
                      if (degreeObjectIndex || degreeObjectIndex === "null") {
                        editEducation(degreeObjectIndex);
                      } else {
                        saveEducation();
                      }
                    }}
                  >
                    {t("NEXT")}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              {/* <PreviewTips formData={defaultValues} /> */}
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationDetailForm;
