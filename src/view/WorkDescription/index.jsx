import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import PreviewTips from '../../components/PreviewTips';
import ResumeContactPreview from '../../components/ResumeContactPreview';
import { useTranslation } from "react-i18next";
const WorkDescription = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="choose-template-section summary-box pt-4 bg-double pb-5">
        <div className="container">
          <div className="pd-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="">
                  <div className="editor-box mt-3 ">
                    <h1 className="page-title-big mb-4">
                      Beschreiben Sie Ihre &nbsp;
                      <span style={{ color: "var(--yellow)" }}>
                        Ausbildung&nbsp;
                      </span>
                    </h1>

                    <div className="mt-3">
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
                        // data={description}
                        // onChange={handleCkeditorState}
                        // onReady={(editor) => {}}
                        // onBlur={(event, editor) => {}}
                        // onFocus={(event, editor) => {}}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-10">
                  <div className="col-sm-6 col-3">
                    <button
                      // onClick={handleBack}
                      className="width-btn btn site-btn border-btn"
                    >
                      {t("Back")}
                    </button>
                  </div>
                  <div className="col-sm-6 col-9 text-right">
                    <button
                      className="btn site-btn bg-blue text-white"
                      type="button"
                      // onClick={saveSkills}
                    >
                      {localStorage.getItem("FinalResume") === "true"
                        ? `${"SAVE AND NEXT"}`
                        : `${"WEITER"}`}{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                {/* <PreviewTips /> */}
                <ResumeContactPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WorkDescription;