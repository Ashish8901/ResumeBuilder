import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ResumeWorkHistory from "./ResumeWorkHistory";
import ResumeEducation from "./ResumeEducation";
import ResumeLanguage from "./ResumeLanguage";
import ResumeSkill from "./ResumeSkill";
import ResumeSocialinfo from "./ResumeSocialinfo";
import ResumeSummary from "./ResumeSummary";
import TitleName from "./TitleName";
import {
  changeFontSize,
  changeHeadingSize,
  changeFontStyle,
  changeLineSpacing,
  changeSectionSpacing,
  changeParagraphSpacing,
  changeParagraphIndent,
} from "../../redux/features/previewFontSlice";
import {
  changeFontSize1,
  changeHeadingSize1,
  changeFontStyle1,
  changeLineSpacing1,
  changeSectionSpacing1,
  changeParagraphSpacing1,
  changeParagraphIndent1,
} from "../../redux/features/previewSectionSlice";
// import ResumeExtraSection from './ResumeExtraSection';
import ResumeAccomplishment from "./ResumeAccomplishment";
import ResumeAffiliations from "./ResumeAffiliations";
import ResumeAdditionalInfo from "./ResumeAdditionalInfo";
import ResumeWebLinks from "./ResumeWebLinks";
import ResumeCertifications from "./ResumeCertifications";
import { deleteAccomplishments } from "../../redux/features/accomplishmentsSlice";
import { useDispatch } from "react-redux";
import ResumeCustomSectionOne from "./ResumeCustomSectionOne";
import ResumeCustomSectionTwo from "./ResumeCustomSectionTwo";
import { addSummary } from "../../redux/features/summarySlice";
import { addWeblinks } from "../../redux/features/webLinksSlice";
import { addCertification } from "../../redux/features/certificationsSlice";
import { addAccomplishment } from "../../redux/features/accomplishmentsSlice";
import { addAffiliation } from "../../redux/features/affiliationsSlice";

import { addSkills } from "../../redux/features/skillsSlice";
import ResumeHobbiesInfo from "./ResumeHobbiesInfo";
import ProfileImage from "./ProfileImage";
const TemplateThreeStruSlider = ({
  formData,
  preview,
  statefix,
  setStateFix,
}) => {
  let customFlag = localStorage.getItem("customFlag");
  const [showSumm, setShowSumm] = useState("false");
  const [showSkill, setShowSkill] = useState("false");
  const [showEdu, setShowEdu] = useState("false");
  const [showExpr, setShowExpr] = useState("false");
  const [showCustomSecOne, setShowCustomSecOne] = useState("true");
  const [showCustomSecTwo, setShowCustomSecTwo] = useState("true");
  const [showAccomp, setShowAccomp] = useState("true");
  const [showCerti, setShowCerti] = useState("true");
  const [showAffil, setShowAffil] = useState("true");
  const [showLinks, setShowLinks] = useState("true");
  const [showAddInfo, setShowAddInfo] = useState("true");
  const [showLang, setShowLang] = useState("true");
  const [showhobb, setShowhobb] = useState("true");
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  const SummaryData = useSelector((store) => store.summaryData.Summary);
  useEffect(() => {
    if (!SummaryData && pathname === "/final-resume") {
      setShowSumm("true");
    } else {
      setShowSumm("false");
    }
  }, [SummaryData, pathname]);
  ////////////////////////////////////////////////////////////////////////////////////
  const skillsArray = useSelector((store) => store.skillsData?.Skills);
  useEffect(() => {
    if (!skillsArray && pathname === "/final-resume") {
      setShowSkill("true");
    } else {
      setShowSkill("false");
    }
  }, [skillsArray, pathname]);
  ////////////////////////////////////////////////////////////////////////////////////
  const eduData = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  useEffect(() => {
    if (eduData.length === 0 && pathname === "/final-resume") {
      setShowEdu("true");
    } else {
      setShowEdu("false");
    }
  }, [eduData, pathname]);
  ///////////////////////////////////////////////////////////////////////////////////
  const ExprData = useSelector((store) => store.workExprData.workExpr.jobsData);
  useEffect(() => {
    if (ExprData.length === 0 && pathname === "/final-resume") {
      setShowExpr("true");
    } else {
      setShowExpr("false");
    }
  }, [ExprData, pathname]);
  //////////////////////////////////////////////////////////////////////////////////

  const custsectionOne = useSelector(
    (store) => store.customSectionData.custSectionOne
  );
  const name_stateOne = localStorage.getItem("name_stateOne");

  useEffect(() => {
    if (name_stateOne || custsectionOne?.title) {
      setShowCustomSecOne("false");
    }
    if (!custsectionOne?.title && pathname === "/final-resume") {
      setShowCustomSecOne("true");
    }
  }, [name_stateOne, custsectionOne, pathname]);
  /////////////////////////////////////////////////////////////////////////////////////////
  const custsectionTwo = useSelector(
    (store) => store.customSectionData.custSectionTwo
  );

  const name_stateTwo = localStorage.getItem("name_stateTwo");

  useEffect(() => {
    if (name_stateTwo || custsectionTwo?.title) {
      setShowCustomSecTwo("false");
    }
    if (!custsectionTwo?.title && pathname === "/final-resume") {
      setShowCustomSecTwo("true");
    }
  }, [name_stateTwo, custsectionTwo, pathname]);
  ////////////////////////////////////////////////////////////////////////////////////////

  const accompdata = useSelector(
    (store) => store.accomplishmentsData.accomplishment
  );
  const accdata = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Accomplishments"
  );
  useEffect(() => {
    if (accdata?.length > 0 || accompdata?.length > 0) {
      setShowAccomp("false");
    }
    if (!accompdata && pathname === "/final-resume") {
      setShowAccomp("true");
    }
  }, [accdata, accompdata, pathname]);

  ///////////////////////////////////////////////////////////////////////////////////////////
  const cerResData = useSelector(
    (store) => store.certificationData.certification
  );
  const certdata = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Certifications"
  );

  useEffect(() => {
    if (certdata?.length > 0 || cerResData?.length > 0) {
      setShowCerti("false");
    }
    if (!cerResData && pathname === "/final-resume") {
      setShowCerti("true");
    }
  }, [certdata, cerResData, pathname]);
  ///////////////////////////////////////////////////////////////////////////////////////////

  const affData = useSelector((store) => store.affiliationsData.affiliation);
  const affilData = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Affiliations"
  );
  useEffect(() => {
    if (affilData?.length > 0 || affData?.length > 0) {
      setShowAffil("false");
    }
    if (!affData && pathname === "/final-resume") {
      setShowAffil("true");
    }
  }, [affilData, affData, pathname]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  const linksdata = useSelector((store) => store.webLinksData.webLinks);
  const linksData = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Websites,Portfolios,Profiles"
  );
  useEffect(() => {
    if (linksData || linksdata?.link1 || linksdata?.link2 || linksdata?.link3) {
      setShowLinks("false");
    }
    if (!linksdata && pathname === "/final-resume") {
      setShowLinks("true");
    }
  }, [linksData, linksdata, pathname]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  const addinfo = useSelector(
    (store) => store.additionalInfoData.additionalInfo
  );
  const addInfoData = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Additional-Information"
  );
  useEffect(() => {
    if (addInfoData || addinfo > 0) {
      setShowAddInfo("false");
    }
    if (!addinfo && pathname === "/final-resume") {
      setShowAddInfo("true");
    }
  }, [addInfoData, addinfo, pathname]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  const hobbinfo = useSelector((store) => store.hobbiesinfoData.HobbiesInfo);
  const hobbInfoData = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Hobbys"
  );
  useEffect(() => {
    if (hobbInfoData?.length > 0 || hobbinfo?.length > 0) {
      setShowhobb("false");
    }
    if (!hobbinfo && pathname === "/final-resume") {
      setShowhobb("true");
    }
  }, [hobbInfoData, hobbinfo, pathname]);
  //////////////////////////////////////////////////////////////////////////////////////////
  const langdata = useSelector((store) => store.LanguageData.Language);
  // console.log('langdata', langdata);
  const langData = JSON.parse(localStorage.getItem("ext_name_arr"))?.filter(
    (item) => item === "Languages"
  );
  // console.log('langData', langData);

  useEffect(() => {
    if (
      // langData?.length > 0 ||
      langdata?.nativeLang[0]?.nativeLang ||
      langdata?.proLanguage[0]?.language
    ) {
      setShowLang("false");
    }
    if (
      (langdata?.nativeLang[0]?.nativeLang === "" ||
        !langdata?.proLanguage[0]?.language === "") &&
      pathname === "/final-resume"
    ) {
      setShowLang("true");
    }
  }, [langdata?.nativeLang, langdata?.proLanguage, pathname, langData]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  // const signatureResData = useSelector((store) => store.signatureData);

  // console.log("signatureTEmpResData", signatureResData);
  //////////////////////////////////////////////////////////////////////////////////////////
  const Arr = [
    { id: "15", content: <ProfileImage /> },
    {
      id: 1,
      name: <ResumeSummary />,
      display: showSumm,
    },
    {
      id: 2,
      name: <ResumeEducation formData={formData} />,
      display: showEdu,
    },

    {
      id: 3,
      name: <ResumeSkill />,
      display: showSkill,
    },
    {
      id: 4,
      name: <ResumeWorkHistory />,
      display: showExpr,
    },
    {
      id: 5,
      name: <ResumeLanguage />,
      display: showLang,
    },

    {
      id: 7,
      name: <ResumeAccomplishment />,
      display: showAccomp,
    },
    {
      id: 8,
      name: <ResumeCertifications />,
      display: showCerti,
    },
    {
      id: 9,
      name: <ResumeAffiliations />,
      display: showAffil,
    },
    {
      id: 10,
      name: <ResumeWebLinks />,
      display: showLinks,
    },
    {
      id: 11,
      name: <ResumeAdditionalInfo />,
      display: showAddInfo,
    },
    {
      id: 13,
      name: <ResumeCustomSectionOne />,
      display: showCustomSecOne,
    },
    {
      id: 14,
      name: <ResumeCustomSectionTwo />,
      display: showCustomSecTwo,
    },
    {
      id: 15,
      name: <ResumeHobbiesInfo />,
      display: showhobb,
    },
  ];
  const templateColorState = useSelector((store) => store.templateColor);
  const [project, setProject] = useState(Arr);
  let user = useSelector((store) => store.fontsize);
  const cancelFunction = () => {
    setStateFix(false);
  };
  let description = `<ul>`;
  let summaryData = `<p>`;
  let accomplishment = `<ul>`;
  let affiliation = `<ul>`;
  let certification = `<ul>`;
  let resumelinks = {};
  const saveFunction = () => {
    //skill section
    if (localStorage.getItem("resume_meta_value_skills") !== null) {
      let skills = document.getElementsByClassName("skills");
      description = skills[0].innerHTML;
      dispatch(addSkills({ data: description, resume_token }));
    }
    //summary section
    if (localStorage.getItem("resume_meta_value_summary") !== null) {
      let professionSummary =
        document.getElementsByClassName("professionSummary");

      summaryData = `${summaryData} ${professionSummary[0].innerText} </p>`;

      dispatch(addSummary({ data: summaryData, resume_token }));
    }
    //Accomplishment
    if (localStorage.getItem("resume_meta_value_accomplishment") !== null) {
      let resumeAccomplishment = document.getElementsByClassName(
        "resumeAccomplishment"
      );
      let resumeAccom = resumeAccomplishment[0]
        .getElementsByTagName("ul")[0]
        .innerText.split(/\r?\n/);
      for (let i = 0; i < resumeAccom.length; i++) {
        accomplishment =
          accomplishment +
          `<li>${
            resumeAccomplishment[0]
              .getElementsByTagName("ul")[0]
              .innerText.split(/\r?\n/)[i]
          }</li>`;
      }
      accomplishment = accomplishment + `</ul>`;
      dispatch(addAccomplishment({ data: accomplishment }));
    }
    //Affiliations
    if (localStorage.getItem("resume_meta_value_affiliation") !== null) {
      let resumeAffiliation =
        document.getElementsByClassName("resumeAffiliation");
      let resumeAff = resumeAffiliation[0]
        .getElementsByTagName("ul")[0]
        .innerText.split(/\r?\n/);
      for (let i = 0; i < resumeAff.length; i++) {
        affiliation =
          affiliation +
          `<li>${
            resumeAffiliation[0]
              .getElementsByTagName("ul")[0]
              .innerText.split(/\r?\n/)[i]
          }</li>`;
      }
      affiliation = affiliation + `</ul>`;
      dispatch(addAffiliation({ data: affiliation }));
    }
    //Certification
    if (localStorage.getItem("resume_meta_value_certification") !== null) {
      let resumeCertification = document.getElementsByClassName(
        "resumeCertification"
      );
      let resumeCertific = resumeCertification[0]
        .getElementsByTagName("ul")[0]
        .innerText.split(/\r?\n/);
      for (let i = 0; i < resumeCertific.length; i++) {
        certification =
          certification +
          `<li>${
            resumeCertification[0]
              .getElementsByTagName("ul")[0]
              .innerText.split(/\r?\n/)[i]
          }</li>`;
      }
      certification = certification + `</ul>`;
      dispatch(addCertification({ data: certification }));
    }
    //Links
    if (localStorage.getItem("resume_meta_value_webLinks") !== null) {
      let resumeWeblinks = document.getElementsByClassName("resumeWeblinks");
      let resumeWeb = resumeWeblinks[0]
        .getElementsByTagName("ul")[0]
        .innerText.split(/\r?\n/);

      for (let i = 0; i < resumeWeb.length; i++) {
        resumelinks[`links${i}`] = resumeWeb[i];
      }

      dispatch(addWeblinks({ data: resumelinks }));
    }
    setStateFix(false);
  };
  useEffect(() => {
    if (
      pathname !== "/final-resume" &&
      pathname !== "/choose-template" &&
      preview !== true &&
      customFlag === "true"
    ) {
      let fontSize = user.fontSize;
      let lineSpacing = user.lineSpacing;
      let headingSize = user.headingSize;
      let sectionSpacing = user.sectionSpacing;
      let paragraphSpacing = user.paragraphSpacing;
      dispatch(changeSectionSpacing(sectionSpacing - 5));
      dispatch(changeFontSize(fontSize - 6));
      dispatch(changeLineSpacing(lineSpacing - 11));
      dispatch(changeHeadingSize(headingSize - 8));
      dispatch(changeParagraphIndent(user.paragraphIndentSize));
      dispatch(changeParagraphSpacing(paragraphSpacing - 5));
      dispatch(changeFontStyle(user.fontStyle));
    }
    if (
      pathname !== "/final-resume" &&
      pathname !== "/choose-template" &&
      preview !== true &&
      customFlag === "false"
    ) {
      let pageFontSize = JSON.parse(localStorage.getItem("pageSize"));
      let fontStyle = localStorage.getItem("fontStyle");
      if (pageFontSize.titleFontSize === "50") {
        // dispatch(changeSectionSpacing(5));
        dispatch(changeFontSize(3));
        dispatch(changeLineSpacing(-9));
        dispatch(changeHeadingSize(9));
        // dispatch(changeParagraphIndent(5));
        // dispatch(changeParagraphSpacing(5));
        dispatch(changeFontStyle(fontStyle));
      } else if (pageFontSize.titleFontSize === "34") {
        dispatch(changeSectionSpacing(0));
        dispatch(changeFontSize(1.5));
        dispatch(changeLineSpacing(-15));
        dispatch(changeHeadingSize(7));
        // dispatch(changeParagraphIndent(5));
        dispatch(changeParagraphSpacing(0));
        dispatch(changeFontStyle(fontStyle));
      } else if (pageFontSize.titleFontSize === "40") {
        // dispatch(changeSectionSpacing(5));
        dispatch(changeFontSize(2));
        dispatch(changeLineSpacing(-10));
        dispatch(changeHeadingSize(8));
        // dispatch(changeParagraphIndent(5));
        // dispatch(changeParagraphSpacing(5));
        dispatch(changeFontStyle(fontStyle));
      }
    }
    if (
      pathname !== "/final-resume" &&
      pathname !== "/choose-template" &&
      preview === true &&
      customFlag === "false"
    ) {
      let pageFontSize = JSON.parse(localStorage.getItem("pageSize"));
      let fontStyle = localStorage.getItem("fontStyle");
      if (pageFontSize.titleFontSize === "50") {
        dispatch(changeSectionSpacing1(pageFontSize.paragraphMarginBottom));
        dispatch(changeFontSize1(pageFontSize.paragraphFontSize));
        dispatch(changeLineSpacing1(pageFontSize.paragraphLineHeight));
        dispatch(changeHeadingSize1(pageFontSize.headingFontSize));
        dispatch(changeParagraphIndent1(pageFontSize.paragraphMarginLeft));
        dispatch(changeParagraphSpacing1(pageFontSize.paragraphMarginTop));
        dispatch(changeFontStyle1(fontStyle));
      } else if (pageFontSize.titleFontSize === "34") {
        dispatch(changeSectionSpacing1(pageFontSize.paragraphMarginBottom));
        dispatch(changeFontSize1(pageFontSize.paragraphFontSize));
        dispatch(changeLineSpacing1(pageFontSize.paragraphLineHeight));
        dispatch(changeHeadingSize1(pageFontSize.headingFontSize));
        dispatch(changeParagraphIndent1(pageFontSize.paragraphMarginLeft));
        dispatch(changeParagraphSpacing1(pageFontSize.paragraphMarginTop));
        dispatch(changeFontStyle1(fontStyle));
      } else if (pageFontSize.titleFontSize === "40") {
        dispatch(changeSectionSpacing1(pageFontSize.paragraphMarginBottom));
        dispatch(changeFontSize1(pageFontSize.paragraphFontSize));
        dispatch(changeLineSpacing1(pageFontSize.paragraphLineHeight));
        dispatch(changeHeadingSize1(pageFontSize.headingFontSize));
        dispatch(changeParagraphIndent1(pageFontSize.paragraphMarginLeft));
        dispatch(changeParagraphSpacing1(pageFontSize.paragraphMarginTop));
        dispatch(changeFontStyle1(fontStyle));
      }
    }

    if (
      pathname !== "/final-resume" &&
      pathname !== "/choose-template" &&
      preview === true &&
      customFlag === "true"
    ) {
      let fontSize = user.fontSize;
      let lineSpacing = user.lineSpacing;
      let headingSize = user.headingSize;
      let sectionSpacing = user.sectionSpacing;
      let paragraphSpacing = user.paragraphSpacing;
      dispatch(changeSectionSpacing1(sectionSpacing));
      dispatch(changeFontSize1(fontSize));
      dispatch(changeLineSpacing1(lineSpacing));
      dispatch(changeHeadingSize1(headingSize));
      dispatch(changeParagraphIndent1(user.paragraphIndentSize));
      dispatch(changeParagraphSpacing1(paragraphSpacing));
      dispatch(changeFontStyle1(user.fontStyle));
    }

    if (pathname === "/resume") {
      let educationclass = document.getElementsByClassName("socail-info");

      educationclass[0].style.border = "5px solid transparent";
      educationclass[0].style.boxShadow = "0px 0px 0px 2px #FFA500 ";
      // educationclass[0].style.backgroundColor = "rgba(255,164,0,0.1)";
    }
    if (pathname === "/resume-education") {
      let educationclass = document.getElementsByClassName("educationclass");

      educationclass[0].style.border = "5px solid transparent";
      educationclass[0].style.boxShadow = "0px 0px 0px 2px #FFA500 ";
    }
    if (pathname === "/expr") {
      let educationclass = document.getElementsByClassName(" work-history-box");

      educationclass[0].style.border = "5px solid transparent";
      educationclass[0].style.boxShadow = "0px 0px 0px 2px #FFA500 ";
    }
    if (pathname === "/skill") {
      let educationclass = document.getElementsByClassName("skill-list");

      educationclass[0].style.border = "5px solid transparent";
      educationclass[0].style.boxShadow = "0px 0px 0px 2px #FFA500 ";
    }
    if (pathname === "/summary") {
      let educationclass = document.getElementsByClassName("summay-box");

      educationclass[0].style.border = "5px solid transparent";
      educationclass[0].style.boxShadow = "0px 0px 0px 2px #FFA500 ";
    }
  });

  useEffect(() => {
    if ([...project] !== Arr) {
      setProject(Arr);
    }
    // eslint-disable-next-line
  }, [
    showSumm,
    showSkill,
    showEdu,
    showExpr,
    showCustomSecOne,
    showCustomSecTwo,
    showAccomp,
    deleteAccomplishments,
    showCerti,
    accompdata,
    showAffil,
    showhobb,
    showLinks,
    showAddInfo,
    showLang,
  ]);
  const resume_token = localStorage.getItem("resume_token");
  return (
    <>
      <div>
        <div className="resume-template-box temp-3">
          <div className="row " id="input1">
            {statefix && (
              <>
                <div className="col-9 col-alert-spellcheck">
                  We've highlighted your spelling errors below.Click on each
                  highlighted word to change text.
                  <br />
                  "Once you're done Click"
                  <span className="text-emphasis"> 'Save' button</span>
                  "to apply changes"
                </div>
                <div className="text-right col-3 btn-wrap">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={cancelFunction}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={saveFunction}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
          <div
            className="mb-3 py-2 px-4 name-bg"
            style={{
              display: "none",
              background:
                templateColorState.onMouseEnterBgClor === null
                  ? templateColorState.backgroundColor
                  : templateColorState.onMouseEnterBgClor,
              color:
                templateColorState.fontColor === null
                  ? templateColorState.fontColor
                  : templateColorState.fontColor,
            }}
          >
            <TitleName preview={preview} />
          </div>
          <div
            className="mb-3 py-2 styled-bg"
            style={{
              background:
                templateColorState.onMouseEnterBgClor === null
                  ? templateColorState.backgroundColor
                  : templateColorState.onMouseEnterBgClor,
              color:
                templateColorState.fontColor === null
                  ? templateColorState.fontColor
                  : templateColorState.fontColor,
            }}
          ></div>
          <div
            className="slide-bg-clr top-fix-box"
            style={{
              background:
                templateColorState.onMouseEnterBgClor === null
                  ? templateColorState.backgroundColor
                  : templateColorState.onMouseEnterBgClor,
              color:
                templateColorState.fontColor === null
                  ? templateColorState.fontColor
                  : templateColorState.fontColor,
            }}
          >
            <div className="opacit-1">
              <div className="profile-img-box" style={{ display: "none" }}>
                <ProfileImage />
              </div>
              <div className="contact-info-box">
                <TitleName preview={preview} />
                <div
                  className="mb-1 border-bg"
                  style={{
                    background:
                      templateColorState.onMouseEnterBgClor === null
                        ? templateColorState.backgroundColor
                        : templateColorState.onMouseEnterBgClor,
                    color:
                      templateColorState.fontColor === null
                        ? templateColorState.fontColor
                        : templateColorState.fontColor,
                  }}
                ></div>
                <div
                  className="mb-3 border-bg"
                  style={{
                    background:
                      templateColorState.onMouseEnterBgClor === null
                        ? templateColorState.backgroundColor
                        : templateColorState.onMouseEnterBgClor,
                    color:
                      templateColorState.fontColor === null
                        ? templateColorState.fontColor
                        : templateColorState.fontColor,
                  }}
                ></div>
                <div className="profile-content">
                  <div className="profile-img-box" style={{ display: "none" }}>
                    <ProfileImage />
                  </div>
                  <div>
                    <div className="info-name" style={{ display: "none" }}>
                      <TitleName preview={preview} />
                    </div>
                    <ResumeSocialinfo preview={preview} className="hd-white" />
                  </div>
                </div>

                <div
                  className="mb-1 border-bg"
                  style={{
                    background:
                      templateColorState.onMouseEnterBgClor === null
                        ? templateColorState.backgroundColor
                        : templateColorState.onMouseEnterBgClor,
                    color:
                      templateColorState.fontColor === null
                        ? templateColorState.fontColor
                        : templateColorState.fontColor,
                  }}
                ></div>
                <div
                  className="mb-3 border-bg"
                  style={{
                    background:
                      templateColorState.onMouseEnterBgClor === null
                        ? templateColorState.backgroundColor
                        : templateColorState.onMouseEnterBgClor,
                    color:
                      templateColorState.fontColor === null
                        ? templateColorState.fontColor
                        : templateColorState.fontColor,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="parent-col pt-4 pr-3 pl-3">
            <ResumeSkill preview={preview} />
            <ResumeEducation preview={preview} />
            <ResumeSummary className="" preview={preview} />

            <ResumeWorkHistory preview={preview} />
            {accompdata || accdata ? (
              <ResumeAccomplishment preview={preview} />
            ) : (
              ""
            )}
            {affData || affilData ? (
              <ResumeAffiliations preview={preview} />
            ) : (
              ""
            )}
            {cerResData || certdata ? (
              <ResumeCertifications preview={preview} />
            ) : (
              ""
            )}
            {addinfo || addInfoData ? (
              <ResumeAdditionalInfo preview={preview} />
            ) : (
              ""
            )}
            {hobbinfo || hobbInfoData ? (
              <ResumeHobbiesInfo preview={preview} />
            ) : (
              ""
            )}
            {langdata?.nativeLang?.length > 0 ||
            langdata.proLanguage?.length > 0 ||
            langData ? (
              <ResumeLanguage preview={preview} />
            ) : (
              ""
            )}
            {linksdata?.link1 !== "" ||
            linksdata?.link2 !== "" ||
            linksdata?.link3 !== "" ||
            linksData ? (
              <ResumeWebLinks preview={preview} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateThreeStruSlider;
