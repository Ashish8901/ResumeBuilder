import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {Link} from 'react-router-dom'
import BrandLogo from "../../assets/newcareerbusiness__1__2.png";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  // eslint-disable-next-line
  const [lang, setLang] = useState(localStorage.getItem("i18nextLng"));
  const [isActive, setActive] = useState("");
  const [pathname, setPathname] = useState("");
  const [enableHader, setEnableHader] = useState(false);
  let isStudent = localStorage.getItem("isStudent") || null;
  let finalResume = localStorage.getItem("FinalResume") || null;

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    localStorage.setItem("i18nextLng", "de");
    if (
      pathname === "/" ||
      pathname === "/experience-level" ||
      pathname === "/select-country" ||
      pathname === "/choose-template" ||
      (pathname === "/resume" && finalResume === "true") ||
      pathname === "/Work-summary" ||
      (pathname === "/work-expr-form" && finalResume === "true") ||
      pathname === "/edu-summary" ||
      (pathname === "/edu-del" && finalResume === "true") ||
      (pathname === "/add-skill" && finalResume === "true") ||
      pathname === "/summary" ||
      (pathname === "/lngg" && finalResume === "true") ||
      pathname === "/final-resume" ||
      pathname === "/accessibility"
    ) {
      setEnableHader(false);
    } else setEnableHader(true);
  }, [pathname, enableHader, finalResume]);

  useEffect(() => {
    if (pathname === "/resume") {
      setActive("heading");
    }
    if (pathname === "/work-expr-form" || pathname === "/expr") {
      setActive("work-history");
    }
    if (pathname === "/edu-del" || pathname === "/resume-education") {
      setActive("education");
    }
    if (pathname === "/add-skill" || pathname === "/skill") {
      setActive("skill");
    }
    if (pathname === "/summary" || pathname === "/lngg") {
      setActive("language");
    }
    if (pathname === "/add-section") {
      setActive("finalize");
    }
    // eslint-disable-next-line
  }, [pathname]);

  // const Expr = useSelector((store) => store.resumeData.experienceLevel);
  const ExprData = useSelector((store) => store.workExprData.workExpr.jobsData);
  const eduData = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const skillsData = useSelector((store) => store.skillsData.Skills);
  const LanguageData = useSelector((store) => store.LanguageData?.Language?.nativeLang);
  const contactData = useSelector((store) => store.resumeData.heading.data);
  // const handleClick = (e) => {
  //   console.log(`Language will change to =>`, e.target.value);
  //   i18next.changeLanguage(e.target.value);
  //   localStorage.setItem("i18nextLng", e.target.value);
  //   setLang(e.target.value);
  // };
  useEffect(() => {
    i18next.changeLanguage(localStorage.getItem("i18nextLng"));
  }, []);
  return (
    <div>
      <div className="header border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 pl-0 pr-0">
              <div className="step-header pt-2 pb-2">
                <div className="brand-logo mt-1 mb-1">
                  <div>
                    <img src={BrandLogo} alt="" />
                  </div>
                </div>
                {enableHader && isStudent === "No" ? (
                  <div className="step-numbering mt-1 mb-1">
                    <div className="progress-section">
                      <Link
                        to="/resume"
                        className={` ${
                          isActive === "heading" ? "step active-link" : "step "
                        }`}
                        onClick={() => {
                          setActive("heading");
                        }}
                        style={{
                          pointerEvents: `${!contactData?.email ? "none" : ""}`,
                        }}
                      >
                        <span className="step-text" id="CNTC">
                          <span className="step-nembering">1</span>

                          {t("Heading")}
                        </span>
                      </Link>
                      <Link
                        to="/Work-summary"
                        className={` ${
                          isActive === "work-history"
                            ? "step active-link"
                            : "step"
                        }`}
                        onClick={() => {
                          setActive("work-history");
                        }}
                        style={{
                          pointerEvents: `${
                            ExprData?.length > 0 ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="EXPR">
                          <span className="step-nembering">2</span>{" "}
                          {t("work-history")}
                        </span>
                      </Link>

                      <Link
                        to="/edu-summary"
                        className={` ${
                          isActive === "education" ? "step active-link" : "step"
                        }`}
                        onClick={() => {
                          setActive("education");
                        }}
                        style={{
                          pointerEvents: `${eduData?.length > 0 ? "" : "none"}`,
                        }}
                      >
                        <span className="step-text" id="EDUC">
                          <span className="step-nembering">3</span>{" "}
                          {t("education")}
                        </span>
                      </Link>

                      <Link
                        to="/add-skill"
                        className={` ${
                          isActive === "skill" ? "step active-link" : "step"
                        }`}
                        onClick={() => {
                          setActive("skill");
                        }}
                        style={{
                          pointerEvents: `${
                            skillsData?.length > 0 ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="HILT">
                          <span className="step-nembering">4</span>{" "}
                          {t("Skills")}
                        </span>
                      </Link>
                      <Link
                        to="/lngg"
                        className={` ${
                          isActive === "language" ? "step active-link" : "step"
                        }`}
                        onClick={() => {
                          setActive("language");
                        }}
                        style={{
                          pointerEvents: `${
                            finalResume === "true" ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="SUMM">
                          <span className="step-nembering">5</span>{" "}
                          {t("language")}
                        </span>
                      </Link>
                      <Link
                        to="/final-resume"
                        className={` ${
                          isActive === "finalize"
                            ? "step last-step active-link"
                            : "step last-step"
                        }`}
                        onClick={() => {
                          setActive("finalize");
                        }}
                        style={{
                          pointerEvents: `${
                            LanguageData?.length > 0 ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="FNLZ">
                          <span className="step-nembering">6</span>{" "}
                          {t("finalize")}
                        </span>
                      </Link>
                      {/* <LanguageDropdown val={lang} onChange={handleClick} /> */}
                    </div>
                  </div>
                ) : enableHader ? (
                  <div className="step-numbering mt-1 mb-1">
                    <div className="progress-section">
                      <Link
                        to="/resume"
                        className={` ${
                          isActive === "heading" ? "step active-link" : "step "
                        }`}
                        onClick={() => {
                          setActive("heading");
                        }}
                        style={{
                          pointerEvents: `${!contactData?.email ? "none" : ""}`,
                        }}
                      >
                        <span className="step-text" id="CNTC">
                          <span className="step-nembering">1</span>{" "}
                          {t("Heading")}
                        </span>
                      </Link>

                      <Link
                        to="/edu-summary"
                        className={` ${
                          isActive === "education" ? "step active-link" : "step"
                        }`}
                        onClick={() => {
                          setActive("education");
                        }}
                        style={{
                          pointerEvents: `${eduData?.length > 0 ? "" : "none"}`,
                        }}
                      >
                        <span className="step-text" id="EDUC">
                          <span className="step-nembering">2</span>{" "}
                          {t("education")}
                        </span>
                      </Link>
                      <Link
                        to="/Work-summary"
                        className={` ${
                          isActive === "work-history"
                            ? "step active-link"
                            : "step"
                        }`}
                        onClick={() => {
                          setActive("work-history");
                        }}
                        style={{
                          pointerEvents: `${
                            ExprData?.length > 0 ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="EXPR">
                          <span className="step-nembering">3</span>{" "}
                          {t("work-history")}
                        </span>
                      </Link>
                      <Link
                        to="/add-skill"
                        className={` ${
                          isActive === "skill" ? "step active-link" : "step"
                        }`}
                        onClick={() => {
                          setActive("skill");
                        }}
                        style={{
                          pointerEvents: `${
                            skillsData?.length > 0 ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="HILT">
                          <span className="step-nembering">4</span>{" "}
                          {t("skills")}
                        </span>
                      </Link>
                      <Link
                        to="/lngg"
                        className={` ${
                          isActive === "language" ? "step active-link" : "step"
                        }`}
                        onClick={() => {
                          setActive("language");
                        }}
                        style={{
                          pointerEvents: `${
                            LanguageData?.length ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="SUMM">
                          <span className="step-nembering">5</span>{" "}
                          {t("language")}
                        </span>
                      </Link>
                      <Link
                        to="/final-resume"
                        className={` ${
                          isActive === "finalize"
                            ? "step last-step active-link"
                            : "step last-step"
                        }`}
                        onClick={() => {
                          setActive("finalize");
                        }}
                        style={{
                          pointerEvents: `${
                            finalResume === "true" ? "" : "none"
                          }`,
                        }}
                      >
                        <span className="step-text" id="FNLZ">
                          <span className="step-nembering">6</span>{" "}
                          {t("finalize")}
                        </span>
                      </Link>
                      {/* <LanguageDropdown val={lang} onChange={handleClick} /> */}
                    </div>
                  </div>
                ) : pathname === "/" || pathname === "/final-resume" ? (
                  <>
                    {/* <LanguageDropdown val={lang} onChange={handleClick} /> */}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
