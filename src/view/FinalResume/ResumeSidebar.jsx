import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import { pdfStateData } from "../../redux/features/localSlice";
import { useDispatch } from "react-redux";

const ResumeSidebar = ({
  setSaveNext,
  setExample,
  resumeName,
  setModalOpen: setOpen,
  modalOpen: open,
  setStateFix,
  setnewModalOpen,
  newmodalOpen,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [includeField, setNotIncludefield] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const loginDatas = useSelector((store) => store.resumeData);
  const userProfile = loginDatas?.loginData?.data;
  const sectionOne = useSelector(
    (store) => store.customSectionData.custSectionOne
  );
  const sectionTwo = useSelector(
    (store) => store.customSectionData.custSectionTwo
  );
  const accompdata = useSelector(
    (store) => store.accomplishmentsData.accomplishment
  );
  const hobbiesData = useSelector((store) => store.hobbiesinfoData.HobbiesInfo);

  const cData = useSelector((store) => store.certificationData.certification);
  const additionalData = useSelector(
    (store) => store.additionalInfoData.additionalInfo
  );
  const affilData = useSelector((store) => store.affiliationsData.affiliation);

  const langData = useSelector(
    (store) => store.LanguageData.Language.nativeLang
  );
  const langProData = useSelector(
    (store) => store.LanguageData.Language.proLanguage
  );
  const webLinkData = useSelector((store) => store.webLinksData.webLinks);
  //-----take option value for pdf download--------------------------

  const [Value, setValue] = useState({
    option: "",
  });
  const handleChange = (e) => {
    setValue({
      ...Value,
      [e.target.name]: e.target.value,
    });
  };
  //-----------for resumeName--------------------
  const [nameR, setName] = useState(resumeName);
  useEffect(() => {
    setName(resumeName);
  }, [resumeName]);

  setExample(nameR);

  // console.log(":Value", Value);
  //------- Download onClick------
  // console.log("PDF", pdf);
  // const main = () => {
  //   if (!userProfile) {
  //     setOpen(
  //       loginDatas?.loginData?.data?.token ? navigate("/payment") : !open
  //     );
  //   } else if (Value.option === "1") {
  //     // console.log("NO  IT");

  //     if (pdf.PDF.current) {
  //       // console.log("HAS IT");
  //       pdf.PDF.current.save();
  //     }
  //   } else if (Value.option === "3") {
  //   } else {
  //     const element = document.createElement("a");
  //     const file = new Blob([document.getElementById("input").innerText], {
  //       type: "text/plain;charset=utf-8",
  //     });
  //     element.href = URL.createObjectURL(file);
  //     element.download = `${nameR}`;
  //     document.body.appendChild(element);
  //     element.click();
  //   }
  // };

  const handleNavigate = (data) => {
    let newPathArr = [];
    if (data === "ResumeLanguage") {
      navigate("/lngg");
    } else if (data === "ResumeSkill") {
      navigate("/add-skill");
    } else if (data === "ResumeEducation") {
      navigate("/edu-summary");
    } else if (data === "ResumeWorkHistory") {
      navigate("/Work-summary");
      // } else if (data === "ResumeLanguage") {
      //   newPathArr.push("/lngg");
      //   localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      //   navigate("/lngg");
    } else if (data === "ResumeAccomplishment") {
      newPathArr.push("/accm");
      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      navigate("/accm");
    } else if (data === "ResumeAffiliations") {
      newPathArr.push("/afil");
      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      navigate("/afil");
    } else if (data === "ResumeAdditionalInfo") {
      newPathArr.push("/addi");
      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      navigate("/addi");
    } else if (data === "ResumeWebLinks") {
      newPathArr.push("/alnk");
      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      navigate("/alnk");
    } else if (data === "ResumeCertifications") {
      newPathArr.push("/cert");
      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      navigate("/cert");
    } else if (data === "ResumeSocialinfo") {
      navigate("/resume");
    } else if (data === "ResumeHobbiesInfo") {
      navigate("/hobbies");
    } else if (data === "ResumeCustomSectionOne") {
      navigate("/cus-one");
    } else if (data === "ResumeCustomSectionTwo") {
      navigate("/cus-two");
    }
  };

  const func1 = () => {
    setNotIncludefield(true);
    setStateFix(true);

    let scripttag = document.createElement("script");
    let scriptttag1 = document.createElement("script");
    scriptttag1.setAttribute(
      "src",
      "https://cdn.tiny.cloud/1/mssrjr89ebsdm1y8kyavbky8el8cfbhj100tullfsbvh16az/tinymce/6/tinymce.min.js"
    );
    scriptttag1.setAttribute("referrerpolicy", "origin");
    scriptttag1.setAttribute("id", "scriptId1");
    scripttag.setAttribute("id", "scriptId");
    scripttag.innerHTML = `tinymce.init({
       browser_spellcheck : true,
      selector: '#myeditablediv',
     plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink checklist lists  media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker',
       tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      branding: false,
    toolbar:false,
    menubar:false,
     inline:true
     });`;
    // scripttag.innerHTML = `tinymce.init({

    //   browser_spellcheck : true,
    //   selector: '#myeditablediv',
    //   plugins: ' tinymcespellchecker',
    //   branding: false,
    //   // toolbar: "spellchecker",
    // toolbar:false,
    // menubar:false,
    //  inline:true
    // });`;

    document.body.appendChild(scriptttag1);
    document.body.appendChild(scripttag);
    scriptttag1.async = true;
    scripttag.async = true;
  };

  return (
    <>
      <div className="final-resume-sidebar">
        <div className="sidebar-link">
          <Link to="" onClick={func1} className="check-link">
            <i className=" fas fa-spell-check" />
            {t("Spell Check")}
          </Link>
          <h1 className="sidebar-title">
            {t("RESUME")} {t("SECTIONS")}
          </h1>
          <div className="resume-section-link">
            <Link to="/resume" className="resume-link">
              <i className=" fa fa-file-text-o" aria-hidden="true" />
              <span className="resume-icon-text">{t("Heading")}</span>
            </Link>
            {localStorage.getItem("resume_meta_value_summary") !== null && (
              <Link to="/add-summary" className="resume-link">
                <i className=" fa fa-bars" aria-hidden="true" />
                <span className="resume-icon-text">
                  {t("Professional Summary")}
                </span>
              </Link>
            )}
            <Link to="/add-skill" className="resume-link">
              <i className=" fa fa-list-ol" aria-hidden="true" />
              <span className="resume-icon-text">{t("Skills")}</span>
            </Link>
            <Link to="/Work-summary" className="resume-link">
              <i className=" fa fa-users" aria-hidden="true" />
              <span className="resume-icon-text">{t("Work History")}</span>
            </Link>
            <Link to="/edu-summary" className="resume-link">
              <i className=" fa fa-graduation-cap" aria-hidden="true" />
              <span className="resume-icon-text">{t("Education")}</span>
            </Link>

            {accompdata ? (
              <>
                <div onClick={() => handleNavigate("ResumeAccomplishment")}>
                  <Link to={`/accm`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">
                      {t("Accomplishments")}
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {affilData ? (
              <>
                <div onClick={() => handleNavigate("ResumeAffiliations")}>
                  <Link to={`/afil`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">
                      {t("Affiliations")}
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {cData ? (
              <>
                <div onClick={() => handleNavigate("ResumeCertifications")}>
                  <Link to={`/cert`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">
                      {t("Certifications")}
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {additionalData ? (
              <>
                <div onClick={() => handleNavigate("ResumeAdditionalInfo")}>
                  <Link to={`/addi`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">
                      {t("Additional-Information")}
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {langData[0]?.nativeLang || langProData[0]?.language ? (
              <>
                <div onClick={() => handleNavigate("ResumeLanguage")}>
                  <Link to={`/lngg`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">{t("Languages")}</span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {webLinkData?.link1 || webLinkData?.link2 || webLinkData?.link3 ? (
              <>
                <div onClick={() => handleNavigate("ResumeWebLinks")}>
                  <Link to={`/alnk`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">Links</span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}

            {hobbiesData ? (
              <>
                <div onClick={() => handleNavigate("ResumeHobbiesInfo")}>
                  <Link to={`/hobbies`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">Hobbies</span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {sectionOne?.title?.length > 0 ? (
              <>
                <div onClick={() => handleNavigate("ResumeCustomSectionOne")}>
                  <Link to={`/cus-one`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">{sectionOne.title}</span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {sectionTwo?.title?.length > 0 ? (
              <>
                <div onClick={() => handleNavigate("ResumeCustomSectionTwo")}>
                  <Link to={`/cus-two`} className="resume-link">
                    <i className=" fa fa-pencil" aria-hidden="true" />
                    <span className="resume-icon-text">{sectionTwo.title}</span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            <Link to="/upload-signature" className="resume-link">
              <i className=" fa fa-pencil" aria-hidden="true" />
              <span className="resume-icon-text">Unterschrift</span>
            </Link>
            <Link to="/add-section" className="list-sepration">
              <i className="mr-2 fa fa-plus" aria-hidden="true" />
              <span className="resume-icon-text">{t("Add a section")}</span>
            </Link>

            <Link
              className="list-sepration sepration-bar"
              onClick={() => {
                setModalOpen(!modalOpen);

                setSaveNext(true);
              }}
            >
              <i className="mr-2 fa fa-download" aria-hidden="true" />
              <span className="resume-icon-text">{t("Download")}</span>
            </Link>
            {/* <button className="list-sepration sepration-bar">
              <i className="mr-2 fa fa-download" aria-hidden="true" />
              <span
                className="resume-icon-text"
                onClick={() => {
                  // setPdfState(true);
                  userProfile
                    ? setPdfState(true)
                    : setnewModalOpen(!newmodalOpen);
                }}
              >
                {t("Print")}
              </span>
            </button> */}
            {/* <Link to="" className="list-sepration">
              <i className="mr-2 fa fa-file" aria-hidden="true" />
              <span className="resume-icon-text">
                A4 (8.27” x 11.69”){" "}
                <i className="mr-2 fa fa-chevron-down" aria-hidden="true" />
              </span>
            </Link> */}
          </div>
        </div>
      </div>
      {/* download resume modal */}
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog download-resume-dialog more-info-modal "
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
            className="cursor-pointer close-btn"
          >
            <span className="close">&times;</span>
          </span>
        </div>
        <div className="modal-content ">
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="modal-title h4 mb-3">
                  {t("Download resume as")}
                </h2>
                <p className="p mb-0">
                  <form className="f-14">
                    <div className="download-choice mb-4">
                      <label className="custom-radio-container">
                        Adobe PDF (.pdf)
                        <input
                          type="radio"
                          name="option"
                          value="1"
                          onChange={handleChange}
                        />
                        <span className="checkmark-radio"></span>
                      </label>
                      {/* <label className="custom-radio-container">
                        MS Word Document (.docx)
                        <input
                          type="radio"
                          name="option"
                          value="2"
                          onChange={handleChange}
                        />
                        <span className="checkmark-radio"></span>
                      </label> */}
                      <label className="custom-radio-container">
                        {t("Plain Text")} (.txt)
                        <input
                          type="radio"
                          name="option"
                          value="2"
                          onChange={handleChange}
                        />
                        <span className="checkmark-radio"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="semi-bold ">{t("Resume name")}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Dahlia_Delacruz_Resume"
                        name="resumeName"
                        value={
                          nameR ? nameR : localStorage.getItem("resumeName")
                        }
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </form>
                  <p className="form-control-tip">
                    {t("Tip: Don't use numbers when naming your file.")}
                  </p>
                </p>
              </div>
            </div>
          </div>
          <div className="custom-modal-footer">
            <div className="row">
              <div className="col-sm-6 pd-0">
                <Link
                  to=""
                  className="d-block btn site-btn border-btn"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  {t("Cancel")}
                </Link>
              </div>
              <div className="col-sm-6 pd-0">
                <span onClick={() => setModalOpen(!modalOpen)}>
                  {/* {!userProfile ? ():( */}
                  <button
                    className="d-block w-100 btn site-btn bg-blue text-white"
                    onClick={() => {
                      !userProfile?.userInfo
                        ? setOpen(true)
                        : dispatch(pdfStateData(true));
                    }}
                  >
                    {t("Download")}
                  </button>
                  {/* ) } */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResumeSidebar;
