import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import TemplateOne from "../view/AllTemplate/index";
import TemplateFourStru from "../view/AllTemplate/TemplateFourStru";
import TemplateThreeStru from "../view/AllTemplate/TemplateThreeStru";
import TemplateTwoStru from "../view/AllTemplate/TemplateTwoStru";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { SSRProvider } from 'react-bootstrap';
const PreviewTips = ({ formData, exprData }) => {
  const { t } = useTranslation();
  const [tipTitle, setTipTitle] = useState({
    titleTip:
      "The gatekeeper sorting resumes that come in is not always the direct hiring manger, so keep your resume language at a middle school level. This ensures that everyone in the  hiring process can easily digest it.",
    listTip1:
      "Highlight 6-8 skills that are most relevant to your desired job.",
    listTip2:
      "If you don’t have much experience, consider listing soft skills like 'Fast learner', 'Highly dependable' or 'Excellent attention to detail'.",
    listTip3:
      "Use short bulleted phrases – 3 words or less. No need to use a period (.) at the end.",
    listTip4:
      "Not sure which skills to include? Emphasize the skills that are required in the job description.",
    listTip5: "",
    listTip6: "",
  });
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pathname, setPathName] = useState("");
  const location = useLocation();
  const templateIdState = useSelector((store) => store.resumeData.template_id);
  const tipsSection = () => {
    if (pathname === "/edu-del") {
      setTipTitle({
        titleTip: `${t(
          "Ageism in the workforce still exists. If your degree is over ten years old, consider removing the date."
        )}`,
        listTip1: `${t(
          "List the schools you've attended and any degrees you've earned, starting with your most recent."
        )}`,
        listTip2: `${t("List high school only if you didn't go to college.")}`,
        listTip3: `${t(
          "Coursework is optional. List relevant courses if you don't have much work experience."
        )}`,
        listTip4: `${t(
          "Certifications and training programs should be included in a separate section."
        )}`,
        listTip5: "",
        listTip6: "",
      });

      //      = `
      // <div className="modal-tip-body"><h2 className="h5 title-tip">Expert Insights</h2><p>Ageism in the workforce still exists. If your degree is over ten years old, consider removing the date.</p><ul className="list-tips"><li>List the schools you've attended and any degrees you've earned, starting with your most recent.</li><li>List high school only if you didn't go to college.</li><li>Coursework is optional. List relevant courses if you don't have much work experience.</li><li>Certifications and training programs should be included in a separate section.</li></ul></div>

      // `
    } else if (pathname === "/work-expr-form") {
      setTipTitle({
        titleTip: `${t(
          "Hiring managers will scan this information looking for career progression, i.e.- how long you've stayed in each job, your growth and promotions, whether you've worked for similar companies and whether you have gaps in employment."
        )}`,
        listTip1: `${t(
          "Enter basic information about your previous jobs so employers can see where you've worked."
        )}`,
        listTip2: `${t(
          "Don't abbreviate job titles. Using your full title looks more professional and is easier for managers to understand."
        )}`,
        listTip3: `${t(
          "Include start and end dates for each position. Leaving off dates will make employers think you're hiding something."
        )}`,
        listTip4: `${t(
          "Can't remember your exact start date or job title? Don't worry - enter your best guess and come back to edit it later, once you've confirmed the information."
        )}`,
        listTip5: "",
        listTip6: "",
      });
    } else if (pathname === "/add-summary") {
      setTipTitle({
        titleTip: `${t(
          "The gatekeeper sorting resumes that come in is not always the direct hiring manger, so keep your resume language at a middle school level. This ensures that everyone in the  hiring process can easily digest it."
        )}`,
        listTip1: `${t(
          "Highlight 6-8 skills that are most relevant to your desired job."
        )}`,
        listTip2: `${t(
          "If you don’t have much experience, consider listing soft skills like 'Fast learner', 'Highly dependable' or 'Excellent attention to detail'."
        )}`,
        listTip3: `${t(
          "Use short bulleted phrases – 3 words or less. No need to use a period (.) at the end."
        )}`,
        listTip4: `${t(
          "Not sure which skills to include? Emphasize the skills that are required in the job description."
        )}`,
        listTip5: "",
        listTip6: "",
      });
    } else if (pathname === "/add-skill") {
      setTipTitle({
        titleTip: `${t(
          "The gatekeeper sorting resumes that come in is not always the direct hiring manger, so keep your resume language at a middle school level. This ensures that everyone in the  hiring process can easily digest it."
        )}`,
        listTip1: `${t(
          "Highlight 6-8 skills that are most relevant to your desired job."
        )}`,
        listTip2: `${t(
          "If you don’t have much experience, consider listing soft skills like 'Fast learner', 'Highly dependable' or 'Excellent attention to detail'."
        )}`,
        listTip3: `${t(
          "Use short bulleted phrases – 3 words or less. No need to use a period (.) at the end."
        )}`,
        listTip4: `${t(
          "Not sure which skills to include? Emphasize the skills that are required in the job description."
        )}`,
        listTip5: "",
        listTip6: "",
      });
    } else if (pathname === "/lngg") {
      setTipTitle({
        titleTip: `${t(
          "When you list languages on your resume, you'll want to include your proficiency level too."
        )}`,
        listTip1: `${t(
          "A1 Beginner: Can communicate on simple and rehearsed subjects, like ordering in a restaurant."
        )}`,
        listTip2: `${t(
          "A2 Elementary: Can have brief social exchanges on familiar and routine subjects that have been rehearsed."
        )}`,
        listTip3: `${t(
          "B1 Intermediate: Can have slightly more complex conversations and speak in the past and present tenses."
        )}`,
        listTip4: `${t(
          "B2 Upper-intermediate: Can communicate confidently on many subjects in professional and academic settings."
        )}`,
        listTip5: `${t(
          "C1 Advanced: Has a strong command of language and communicates in most settings with ease."
        )}`,
        listTip6: `${t(
          "C2 Proficient: Comfortable with most subjects and communicates like a native speaker."
        )}`,
      });
    }
  };
  const [
    preview,
    // eslint-disable-next-line
    setPreview,
  ] = useState(false);
  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div className="pre-btn text-right">
        {/* <span
          className="prev-tips-btn uppercase cursor-pointer"
          onClick={() => {
            setModalOpen(!modalOpen);
            setPreview(true);
          }}
        >
          <span className="mr-2">
            <i className="fa fa-eye" aria-hidden="true"></i>
          </span>

          {t("Preview")}
        </span> */}
        <div className="popover-box">
          <span
            className="prev-tips-btn bar-left uppercase cursor-pointer"
            onClick={() => {
              setShow(!show);
              tipsSection();
            }}
          >
            <span className="mr-2">
              <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            </span>
            {t("Tips")}
          </span>
          {show && (
            <div className="popover-box-inner">
              <p className="close-tips">
                <span
                  className="cursor-pointer"
                  aria-hidden="true"
                  onClick={() => setShow(!show)}
                >
                  &times;
                </span>
              </p>
              <div>
                <div className="modal-tip-content">
                  <div className="modal-tip-body">
                    <h2 className="h5 title-tip uppercase ">
                      {t("Expert Insights")}
                    </h2>
                    <p>{tipTitle.titleTip}</p>
                    <ul className="list-tips">
                      <li>{tipTitle.listTip1}</li>
                      <li>{tipTitle.listTip2}</li>
                      <li>{tipTitle.listTip3}</li>
                      <li>{tipTitle.listTip4}</li>
                      {pathname === "/lngg" && (
                        <>
                          <li>{tipTitle.listTip5}</li>
                          <li>{tipTitle.listTip6}</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* tips */}

        {/* modal */}
        <Modal
          toggle={() => setModalOpen(!modalOpen)}
          isOpen={modalOpen}
          className="modal-dialog resume-pre-dialog"
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
              {(function () {
                if (templateIdState === "1") {
                  return (
                    <TemplateOne
                      formData={formData}
                      exprData={exprData}
                      preview={preview}
                    />
                  );
                } else if (templateIdState === "2") {
                  return (
                    <TemplateTwoStru
                      formData={formData}
                      exprData={exprData}
                      preview={preview}
                    />
                  );
                } else if (templateIdState === "3") {
                  return (
                    <TemplateThreeStru
                      formData={formData}
                      exprData={exprData}
                      preview={preview}
                    />
                  );
                } else if (templateIdState === "4") {
                  return (
                    <TemplateFourStru
                      formData={formData}
                      exprData={exprData}
                      preview={preview}
                    />
                  );
                }
              })()}
              {/* <TemplateOne formData = {formData} /> */}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default PreviewTips;
