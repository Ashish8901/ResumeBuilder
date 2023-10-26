import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import TemplateOne from "../view/AllTemplate/index";
import TemplateFourStru from "../view/AllTemplate/TemplateFourStru";
import TemplateThreeStru from "../view/AllTemplate/TemplateThreeStru";
// import TemplateTwoStru from "../view/AllTemplate/TemplateTwoStru";
// import { useTranslation } from "react-i18next";
const ResumeContactPreview = () => {
  // const {t} = useTranslation()
  const [modalOpen, setModalOpen] = useState(false);
  const templId = JSON.parse(localStorage.getItem("templiD"));

  const templateIdState = useSelector((store) => store.resumeData.template_id);
  const [preview, setPreview] = useState(false);
  return (
    <>
      <div className="resume-preview text-right py-5 pl-5 ">
        <div className="resume-zoom pl-3 preview-box">
          {(function () {
            if (templId === 0) {
              return <TemplateOne />;
            } else if (templateIdState === "styleTempOne" && templId === 1) {
              return <TemplateThreeStru />;
            } else if (templateIdState === "styleTempTwo" && templId === 2) {
              return <TemplateThreeStru />;
            } else if (templateIdState === "styleTempDBSix" && templId === 4) {
              return <TemplateFourStru />;
            } else if (
              templateIdState === "styleTempDBSeven" &&
              templId === 7
            ) {
              return <TemplateFourStru />;
            } else if (
              templateIdState === "styleTempDBEight" &&
              templId === 8
            ) {
              return <TemplateFourStru />;
            } else if (templateIdState === "styleTempDBNine" && templId === 9) {
              return <TemplateFourStru />;
            } else if (templateIdState === "styleTempDBTen" && templId === 10) {
              return <TemplateFourStru />;
            } else if (
              templateIdState === "styleTempDBEleven" &&
              templId === 11
            ) {
              return <TemplateFourStru />;
            } else if (
              templateIdState === "styleTempDBTwelve" &&
              templId === 12
            ) {
              return <TemplateFourStru />;
            } else if (templateIdState === "styleTempThree" && templId === 5) {
              return <TemplateThreeStru />;
            } else if (templateIdState === "styleTempFour" && templId === 6) {
              return <TemplateThreeStru />;
            } else if (templateIdState === "styleTempFive" && templId === 7) {
              return <TemplateThreeStru />;
            }
          })()}
        </div>
      </div>
      {/* <div className="pre-btn text-center mt-4 pl-5">
        <button
          className="prev-btn uppercase"
          onClick={() => {setModalOpen(!modalOpen)
          setPreview(true)
          }}
        >
          <span className="mr-2">
            <i className="fa fa-eye" aria-hidden="true"></i>
          </span>
        
          {t("Preview")}
        </button>
      </div> */}

      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog resume-pre-dialog"
      >
        <div className="top-fix-bar">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpen(!modalOpen);
              setPreview(false);
            }}
            className="cursor-pointer close-btn"
          >
            <span className="close">&times;</span>
          </span>
        </div>
        <div className="modal-content ">
          <div className="modal-body">
            {(function () {
              if (templateIdState === "1") {
                return (
                  <TemplateOne preview={preview} setPreview={setPreview} />
                );
              } else if (templateIdState === "styleTempOne" && templId === 1) {
                return (
                  <TemplateThreeStru
                    preview={preview}
                    setPreview={setPreview}
                  />
                );
              } else if (templateIdState === "styleTempTwo" && templId === 2) {
                return (
                  <TemplateThreeStru
                    preview={preview}
                    setPreview={setPreview}
                  />
                );
              } else if (
                templateIdState === "styleTempDBSix" &&
                templId === 4
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (
                templateIdState === "styleTempDBSeven" &&
                templId === 7
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (
                templateIdState === "styleTempDBEight" &&
                templId === 8
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (
                templateIdState === "styleTempDBNine" &&
                templId === 9
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (
                templateIdState === "styleTempDBTen" &&
                templId === 10
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (
                templateIdState === "styleTempDBEleven" &&
                templId === 11
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (
                templateIdState === "styleTempDBTwelve" &&
                templId === 12
              ) {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              } else if (templateIdState === "5") {
                return (
                  <TemplateThreeStru
                    preview={preview}
                    setPreview={setPreview}
                  />
                );
              } else if (templateIdState === "6") {
                return (
                  <TemplateThreeStru
                    preview={preview}
                    setPreview={setPreview}
                  />
                );
              } else if (templateIdState === "7") {
                return (
                  <TemplateThreeStru
                    preview={preview}
                    setPreview={setPreview}
                  />
                );
              }
            })()}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResumeContactPreview;
