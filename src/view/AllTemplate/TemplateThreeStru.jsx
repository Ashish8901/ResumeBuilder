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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { deleteAccomplishments } from "../../redux/features/accomplishmentsSlice";
import { useDispatch } from "react-redux";
import { deleteCertification } from "../../redux/features/certificationsSlice";
import { deleteAffiliation } from "../../redux/features/affiliationsSlice";
import { deleteWebLinks } from "../../redux/features/webLinksSlice";
import { deleteAdditionalInfo } from "../../redux/features/additionalInfoSlice";
import { deleteEducation } from "../../redux/features/resumeSlice";
import { deleteExprSection } from "../../redux/features/workExperienceSlice";
import { deleteSkills } from "../../redux/features/skillsSlice";
import { deleteSummSection } from "../../redux/features/summarySlice";
import { deleteLanguage } from "../../redux/features/LanguageSlice";
import ResumeCustomSectionOne from "./ResumeCustomSectionOne";
import ResumeCustomSectionTwo from "./ResumeCustomSectionTwo";
import { addSummary } from "../../redux/features/summarySlice";
import { addWeblinks } from "../../redux/features/webLinksSlice";
import { addCertification } from "../../redux/features/certificationsSlice";
import { addAccomplishment } from "../../redux/features/accomplishmentsSlice";
import { addAffiliation } from "../../redux/features/affiliationsSlice";

import { addSkills } from "../../redux/features/skillsSlice";
import {
  deleteCustomSectionOne,
  deleteCustomSectionTwo,
} from "../../redux/features/customSectionSlice";
import ResumeHobbiesInfo from "./ResumeHobbiesInfo";
import { deleteHobbiesInfo } from "../../redux/features/hobbiesSlice";
import UploadSignBox from "./UploadSignBox";
import ProfileImage from "../AllTemplate/ProfileImage";
import { deleteSignature } from "../../redux/features/signatureSlice";
const TemplateThreeStru = ({ formData, preview, statefix, setStateFix }) => {
  // eslint-disable-next-line
  const [templateId, setTemplateId] = useState(null);
  // eslint-disable-next-line
  const [tempStyle, setTempStyle] = useState("");
  const templId = JSON.parse(localStorage.getItem("templiD"));

  useEffect(() => {
    if (templId === 1) {
      setTempStyle("styleTempOne");
    } else if (templId === 2) {
      setTempStyle("styleTempTwo");
    } else if (templId === 5) {
      setTempStyle("styleTempThree");
    } else if (templId === 6) {
      setTempStyle("styleTempFour");
    } else if (templId === 7) {
      setTempStyle("styleTempFive");
    } else {
      setTempStyle("");
    }
    // eslint-disable-next-line
  }, [templId]);
  // eslint-disable-next-line
  const templateIdState = useSelector((store) => store.resumeData.template_id);
  // eslint-disable-next-line
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
  const signatureResData = useSelector((store) => store.signatureData);

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
    {
      id: 16,
      name: <UploadSignBox />,
      // display: showhobb,
    },
  ];
  const templateColorState = useSelector((store) => store.templateColor);
  const [project, setProject] = useState(Arr);

  const reorder = (project, startIndex, endIndex) => {
    const result = Array.from(project);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const handleOnDragEnd = (result) => {
    setProject(reorder(project, result.source.index, result.destination.index));
  };
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
  const navigate = useNavigate();
  const handleNavigate = (data) => {
    console.log(data);
    let newPathArr = [];

    if (data === 1) {
      navigate("/lngg");
    } else if (data === 3) {
      navigate("/add-skill");
    } else if (data === 2) {
      navigate("/edu-summary");
    } else if (data === 4) {
      navigate("/Work-summary");
    } else if (data === 5) {
      newPathArr.push("/lngg");

      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));

      navigate("/lngg");
    } else if (data === 7) {
      newPathArr.push("/accm");

      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));

      navigate("/accm");
    } else if (data === 9) {
      newPathArr.push("/afil");

      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));

      navigate("/afil");
    } else if (data === 11) {
      newPathArr.push("/addi");

      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));

      navigate("/addi");
    } else if (data === 10) {
      newPathArr.push("/alnk");

      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));

      navigate("/alnk");
    } else if (data === 8) {
      newPathArr.push("/cert");

      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));

      navigate("/cert");
    } else if (data === 13) {
      navigate(
        `/cus-one?customSecToken=${localStorage.getItem("customSecOneId")}`
      );
    } else if (data === 14) {
      navigate(
        `/cus-two?customSecToken=${localStorage.getItem("customSecTwoId")}`
      );
    } else if (data === 15) {
      newPathArr.push("/hobbies");
      localStorage.setItem("extra_section_array", JSON.stringify(newPathArr));
      navigate("/hobbies");
    } else if (data === 16) {
      navigate("/upload-signature");
    }
  };

  //delete function

  const handleClick = (id) => {
    if (id === 1) {
      let resumeSumary = document.getElementsByClassName("resume-sumary");
      resumeSumary[0].style.display = "none";
      setShowSumm("true");
      dispatch(deleteSummSection());
      localStorage.removeItem("resume_meta_value_summary");
      localStorage.removeItem("summaryInLocal");
      localStorage.removeItem("summaryArray");
    }
    if (id === 2) {
      let resumeSumary = document.getElementsByClassName("resume-education");
      resumeSumary[0].style.display = "none";
      setShowEdu("true");
      dispatch(deleteEducation());
      localStorage.removeItem("resume_meta_value_education");

      setShowEdu("true");
    }
    if (id === 3) {
      let resumeSumary = document.getElementsByClassName("resume-skill");
      resumeSumary[0].style.display = "none";
      setShowSkill("true");
      dispatch(deleteSkills());
      localStorage.removeItem(" ");
      localStorage.removeItem("skillsInLocal");
    }
    if (id === 4) {
      let resumeSumary = document.getElementsByClassName("resume-workhistory");
      resumeSumary[0].style.display = "none";
      setShowExpr("true");
      dispatch(deleteExprSection());
      localStorage.removeItem("resume_meta_value_workexpr");
      setShowExpr("true");
    }
    if (id === 5) {
      let resumeSumary = document.getElementsByClassName("resume-langg");
      resumeSumary[0].style.display = "none";
      setShowLang("true");
      dispatch(deleteLanguage(JSON.parse(localStorage.getItem("languageId"))));
      localStorage.removeItem("Nativefield");
      localStorage.removeItem("Languagefield");
      localStorage.removeItem("languageId");
      localStorage.removeItem("ext_name_arr");
      setShowLang("true");
    }
    if (id === 13) {
      let resumeSumary = document.getElementsByClassName(
        "resume-extra-sec-one"
      );
      resumeSumary[0].style.display = "none";
      setShowCustomSecOne("true");
      dispatch(deleteCustomSectionOne(localStorage.getItem("customSecOneId")));
      localStorage.removeItem("name_stateOne");
      localStorage.removeItem("sectionHeadOne");
      localStorage.removeItem("resume_meta_value_custom_sec_One");
      localStorage.removeItem("customSecOneId");
    }
    if (id === 14) {
      let resumeSumary = document.getElementsByClassName("resume-extra-sec");
      resumeSumary[0].style.display = "none";
      setShowCustomSecTwo("true");
      dispatch(deleteCustomSectionTwo(localStorage.getItem("customSecTwoId")));
      localStorage.removeItem("name_stateTwo");
      localStorage.removeItem("sectionHeadTwo");
      localStorage.removeItem("resume_meta_value_custom_sec_Two");
      localStorage.removeItem("customSecTwoId");
    }
    if (id === 7) {
      let resumeSumary = document.getElementsByClassName("resume-accomplish");
      resumeSumary[0].style.display = "none";
      setShowAccomp("true");
      dispatch(
        deleteAccomplishments(
          JSON.parse(localStorage.getItem("accomplishmentId"))
        )
      );
      setShowAccomp("true");
      localStorage.removeItem("resume_meta_value_accomplishment");
      localStorage.removeItem("accomplishmentId");
      localStorage.removeItem("ext_name_arr");
    }
    if (id === 8) {
      let resumeSumary = document.getElementsByClassName("resume-cert");
      resumeSumary[0].style.display = "none";
      setShowCerti("true");
      dispatch(
        deleteCertification(JSON.parse(localStorage.getItem("certificationId")))
      );
      setShowCerti("true");
      localStorage.removeItem("resume_meta_value_certification");
      localStorage.removeItem("certificationId");
      localStorage.removeItem("ext_name_arr");
    }
    if (id === 9) {
      let resumeSumary = document.getElementsByClassName("resume-affi");
      resumeSumary[0].style.display = "none";
      setShowAffil("true");
      dispatch(
        deleteAffiliation(JSON.parse(localStorage.getItem("affiliationId")))
      );
      setShowAffil("true");
      localStorage.removeItem("resume_meta_value_affiliation");
      localStorage.removeItem("affiliationId");
      localStorage.removeItem("ext_name_arr");
    }
    if (id === 10) {
      let resumeSumary = document.getElementsByClassName("resume-weblink");
      resumeSumary[0].style.display = "none";
      setShowLinks("true");
      dispatch(deleteWebLinks(JSON.parse(localStorage.getItem("webLinksId"))));
      setShowLinks("true");
      localStorage.removeItem("resume_meta_value_webLinks");
      localStorage.removeItem("webLinksId");
      localStorage.removeItem("ext_name_arr");
    }
    if (id === 11) {
      let resumeSumary = document.getElementsByClassName("resume-addinfo");
      resumeSumary[0].style.display = "none";
      setShowAddInfo("true");
      dispatch(
        deleteAdditionalInfo(
          JSON.parse(localStorage.getItem("additionalInfoId"))
        )
      );
      setShowAddInfo("true");
      localStorage.removeItem("resume_meta_value_additionalInfo");
      localStorage.removeItem("additionalInfoId");
      localStorage.removeItem("ext_name_arr");
    }
    if (id === 15) {
      let resumeSumary = document.getElementsByClassName("resume-addinfo");
      resumeSumary[0].style.display = "none";
      setShowhobb("true");
      dispatch(
        deleteHobbiesInfo(JSON.parse(localStorage.getItem("hobbiesInfoId")))
      );
      setShowhobb("true");
      localStorage.removeItem("resume_meta_value_hobbiesInfo");
      localStorage.removeItem("hobbiesInfoId");
      localStorage.removeItem("ext_name_arr");
    }
    if (id === 16) {
      let resumeSumary = document.getElementsByClassName(
        "pt-4 pr-3 signature-col"
      );
      resumeSumary[0].style.display = "none";
      dispatch(deleteSignature());
      localStorage.removeItem("local_sign_data");
      localStorage.removeItem("resume_meta_value_signature");
    }
  };
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false; // If the arrays have different lengths, they are not equal.
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false; // If any elements differ, the arrays are not equal.
      }
    }

    return true; // The arrays are equal.
  }
  useEffect(() => {
    if (!arraysAreEqual(project, Arr)) {
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
      <div className={`${tempStyle}`}>
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

          {pathname !== "/final-resume" ? (
            <>
              {/* <div className="parent-col"> */}
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
                      <div
                        className="profile-img-box"
                        style={{ display: "none" }}
                      >
                        <ProfileImage />
                      </div>
                      <div>
                        <div className="info-name" style={{ display: "none" }}>
                          <TitleName preview={preview} />
                        </div>
                        <ResumeSocialinfo
                          preview={preview}
                          className="hd-white"
                        />
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
                {signatureResData.text ? (
                  <div className="pt-4 pr-3 signature-col">
                    <UploadSignBox preview={preview} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <div className="preview-inner" id="myeditablediv">
              <div className="resume-content-three resume-content-box resume-content-one">
                <div className="parent-col">
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
                      <div
                        className="profile-img-box"
                        style={{ display: "none" }}
                      >
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
                          <div
                            className="profile-img-box"
                            style={{ display: "none" }}
                          >
                            <ProfileImage />
                          </div>
                          <div>
                            <div
                              className="info-name"
                              style={{ display: "none" }}
                            >
                              <TitleName preview={preview} />
                            </div>
                            <ResumeSocialinfo
                              preview={preview}
                              className="hd-white"
                            />
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
                  {/* <div
                    className="slide-bg-clr top-fix-box"
                    style={{
                      background:
                        templateColorState.onMouseEnterBgClor === null
                          ? templateColorState.backgroundColor
                          : templateColorState.onMouseEnterBgClor,
                      color: "#fff",
                    }}
                  >
                    <div className="opacit-1">
                      <TitleName preview={preview} />
                      <ResumeSocialinfo preview={preview} />
                    </div>
                  </div> */}
                </div>
                <div className="parent-col new-line">
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="list">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {project &&
                            project.map(({ id, name, display }, index) => (
                              <Draggable
                                draggableId={id.toString()}
                                key={id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    {display === "false" &&
                                    (pathname !== "/final-resume" ||
                                      pathname !== "/choose-template") ? (
                                      <div className="final-temp-icon">
                                        <div className="format-icon format-left">
                                          <button
                                            onClick={() => handleNavigate(id)}
                                          >
                                            <i
                                              className="fa fa-pencil "
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleClick(id)}
                                          >
                                            <i
                                              className="fa fa-trash "
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        </div>
                                        {name}
                                        <div className="format-icon format-right">
                                          <button>
                                            <i
                                              className="fa fa-arrows "
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div className="pt-4 pr-3 signature-col">
                    <div className="final-temp-icon">
                      <div className="format-icon format-left">
                        <button onClick={() => handleNavigate(16)}>
                          <i className="fa fa-pencil " aria-hidden="true"></i>
                        </button>
                        <button type="button" onClick={() => handleClick(16)}>
                          <i className="fa fa-trash " aria-hidden="true"></i>
                        </button>
                      </div>
                      <UploadSignBox preview={preview} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateThreeStru;
