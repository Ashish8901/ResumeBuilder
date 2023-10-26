import React from "react";
import { useSelector } from "react-redux";
// import FinalReusme from "../../assets/resume-3.png";
import TemplateOne from "../AllTemplate/index";
import TemplateFourStru from "../AllTemplate/TemplateFourStru";
import TemplateThreeStru from "../AllTemplate/TemplateThreeStru";
import TemplateTwoStru from "../AllTemplate/TemplateTwoStru";
const FinalResumeTemplate = ({ statefix, setStateFix }) => {
  // console.log("props",statefix,setStateFix);
  const templateIdState = useSelector((store) => store.resumeData.template_id);
  const templId = JSON.parse(localStorage.getItem("templiD"));
  return (
    <>
      {/* <img alt="" src={FinalReusme} /> */}
      {(function () {
        if (templId === 0) {
          return <TemplateOne statefix={statefix} setStateFix={setStateFix} />;
        } else if (templateIdState === "2") {
          return <TemplateTwoStru />;
        } else if (templateIdState === "styleTempOne" && templId === 1) {
          return (
            <TemplateThreeStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempTwo" && templId === 2) {
          // console.log("ndfsfdskmflmsdm")
          return (
            <TemplateThreeStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempThree" && templId === 5) {
          return (
            <TemplateThreeStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempFour" && templId === 6) {
          return (
            <TemplateThreeStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempFive" && templId === 7) {
          return (
            <TemplateThreeStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBSix" && templId === 4) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBSeven" && templId === 7) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBEight" && templId === 8) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBNine" && templId === 9) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBTen" && templId === 10) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBEleven" && templId === 11) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        } else if (templateIdState === "styleTempDBTwelve" && templId === 12) {
          return (
            <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />
          );
        }
      })()}
    </>
  );
};

export default FinalResumeTemplate;
