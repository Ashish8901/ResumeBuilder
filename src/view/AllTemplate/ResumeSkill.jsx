import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useTranslation } from "react-i18next";
const ResumeSkill = ({preview}) => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const skills = localStorage.getItem("skillsInLocal");
  // const skillsFromServer = useSelector((store) => store.skillsData.Skills);
  const styleobj = {
    fontSize: "",
  };

  return (
    <>
      <div className="resume-section skill-list resume-skill">
        <h1
          className={`${
            preview === true ? "heading-resume" : "resume-heading"
          }`}
        >
          {t("Skills")}
        </h1>
        <div
          className={`${
            preview === true ? "paragraph1 skills" : "paragraph skills"
          }`}
          style={styleobj}
        >
          {skills ? (
            <>{ReactHtmlParser(skills)}</>
          ) : !skills ||
            skills === "" ||
            pathname === "/choose-template" ||
            skills === "<li>&nbsp;</li>" ? (
            <>
              <ul className="skill-list-content ">
                <li>{t("Store opening and closing")}</li>
                <li>{t("Sales expertise")}</li>
                <li>{t("Accurate Money Handling")}</li>
                <li>{t("Store Merchandising")}</li>
                <li>{t("Loss prevention")}</li>
                <li>{t("Product promotions")}</li>
                <li>{t("Guest Services")}</li>
                <li>{t("Point of Sale Systems")}</li>
              </ul>
            </>
          ) : (
            <>
              <>{ReactHtmlParser(skills)}</>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeSkill;
