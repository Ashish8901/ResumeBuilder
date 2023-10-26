import React, { useState, useEffect } from "react";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import PageSubHeading from "../../components/PageSubHeading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { arrExtSec } from "../../redux/features/extraSectionSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import PreviewTips from "../../components/PreviewTips";
const AddSection = () => {
  const { t } = useTranslation();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const [summaryData, setSummaryData] = useState(null);
  const [credential, setcredential] = useState(null);
  const [certification, setCertification] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [customSecOne, setCustomSecOne] = useState("");
  const [customSecTwo, setCustomSecTwo] = useState("");
  const [accomplishment, setAccomplishment] = useState(null);
  const [extraSectionArr, setExtraSectionArr] = useState([]);
  const summData = useSelector((store) => store.summaryData.Summary);
  const accompdata = useSelector(
    (store) => store.accomplishmentsData.accomplishment
  );
  const credData = useSelector((store) => store.affiliationsData.affiliation);
  const additionalData = useSelector(
    (store) => store.additionalInfoData.additionalInfo
  );
  const hobbiesData = useSelector((store) => store.hobbiesinfoData.HobbiesInfo);
  const cData = useSelector((store) => store.certificationData.certification);
  // eslint-disable-next-line
  const webLinkData = useSelector((store) => store.webLinksData.webLinks);
  localStorage.setItem("name_stateOne", customSecOne);
  localStorage.setItem("name_stateTwo", customSecTwo);
  console.log("summData", summData);
  // eslint-disable-next-line
  // const nativeLangData = useSelector(
  //   (store) => store.LanguageData.Language.nativeLang
  // );
  const customSectonOne = useSelector(
    (store) => store.customSectionData.custSectionOne
  );
  const customSectonTwo = useSelector(
    (store) => store.customSectionData.custSectionTwo
  );

  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);

  const handleAdditionalSection = () => {
    let path;
    localStorage.setItem("sectionHeadOne", customSecOne);
    localStorage.setItem("sectionHeadTwo", customSecTwo);
    if (!customSectonOne?.title && customSecOne) {
      path = "/cus-one";
    } else if (
      !customSectonTwo.title &&
      !customSectonTwo.description &&
      customSecTwo
    ) {
      path = "/cus-two";
    } else {
      path = "/signature";
    }
    navigate(path);
  };

  const handleChange = (e) => {
    let newArr = [...extraSectionArr];
    if (newArr?.includes(e.target.value)) {
      const indexOfValue = newArr?.indexOf(e.target.value);
      newArr?.splice(indexOfValue, 1);
      setExtraSectionArr(newArr);
    } else {
      newArr?.push(e.target.value);
      setExtraSectionArr(newArr);
    }
  };
  console.log("extraSectionArr", extraSectionArr);
  const extraSectionsList = [
    {
      id: 1,
      name: `${t("Summary")}`,
      value: "/add-summary",
      description: summaryData,
    },
    { id: 2, name: `${t("Hobbies")}`, value: "/hobbies", description: hobbies },
    {
      id: 3,
      name: `${t("Certifications")}`,
      value: "/cert",
      description: certification,
    },
    {
      id: 4,
      name: `${t("Credentials")}`,
      value: "/afil",
      description: credential,
    },
    {
      id: 5,
      name: `${t("Activities and Awards")}`,
      value: "/accm",
      description: accomplishment,
    },
    // {
    //   id: 6,
    //   name: `${t('Websites,Portfolios,Profiles')}`,
    //   value: '/alnk',
    //   description: null,
    // },
    {
      id: 7,
      name: `${t("Additional-Information")}`,
      value: "/addi",
      description: additionalInfo,
    },
  ];

  useEffect(() => {
    if (accompdata) setAccomplishment(accompdata);
    if (summData) setSummaryData(summData);
    if (credData) setcredential(credData);
    if (additionalData) setAdditionalInfo(additionalData);
    if (cData) setCertification(cData);
    if (hobbies) setHobbies(hobbiesData);
    // eslint-disable-next-line
  }, []);

  if (extraSectionArr.length > 0) {
    const filterArr = extraSectionsList.filter((val) => {
      return extraSectionArr.indexOf(val.value) !== -1;
    });
    const nameArr = filterArr.map((section) => section.name);
    dispatch(arrExtSec(nameArr));
  }
  // eslint-disable-next-line
  const handleCheck = () => {
    if (!check) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else {
      navigate("/lngg");
    }
  };

  return (
    <>
      <section className="choose-template-section resume-contact-section pt-4 bg-double pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <h1 className="page-title-big">
                    Gibt es noch etwas, das Sie ergänzen möchten, bevor Sie
                    Ihren &nbsp;
                    <span style={{ color: "var(--yellow)" }}>Lebenslauf</span>
                    &nbsp; abschließen?
                  </h1>
                  <p>
                    <PageSubHeading
                      subheading={t("These sections are optional.")}
                    />
                  </p>
                  <div className="add-section-list">
                    {!summData ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[0].name}
                          <input
                            value={extraSectionsList[0].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[0].value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ""
                    )}
                    {!hobbiesData ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[1].name}
                          <input
                            value={extraSectionsList[1].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[1]?.value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ""
                    )}
                    {!cData ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[2].name}
                          <input
                            value={extraSectionsList[2].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[2].value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ""
                    )}
                    {!credData ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[3].name}
                          <input
                            value={extraSectionsList[3].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[3].value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ""
                    )}

                    {!accompdata ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[4].name}
                          <input
                            value={extraSectionsList[4].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[4].value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ""
                    )}

                    {/* {!webLinkData?.link1 &&
                    !webLinkData?.link2 &&
                    !webLinkData?.link3 ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[5].name}
                          <input
                            value={extraSectionsList[5].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[5].value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ''
                    )} */}
                    {!additionalData ? (
                      <>
                        <label label className="custom-check-container">
                          {extraSectionsList[5].name}
                          <input
                            value={extraSectionsList[5].value}
                            type="checkbox"
                            defaultChecked={
                              extraSectionArr?.indexOf(
                                extraSectionsList[5].value
                              ) > -1
                            }
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mt-4">
                  <div className="custom-add-section-list">
                    <p className="mb-1 f-14">{t("Add Your Own")}</p>
                    <div className="check-vd-input w-100">
                      {/* {customSectonOne?.title && customSectonTwo?.title ? (
                        ""
                      ) : (
                        <label className="custom-check-container">
                          <input
                            onClick={handleCheck}
                            type="checkbox"
                            checked={
                              check
                                ? true
                                : !customSectonOne?.title
                                ? customSecOne
                                : customSecTwo
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                      )} */}

                      <div className="d-block w-100 mb-0 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`z.B. ${t("Hobbies")}`}
                          onChange={(e) => {
                            !customSectonOne?.title
                              ? setCustomSecOne(e.target.value)
                              : setCustomSecTwo(e.target.value);
                            if (e.target.value === "") {
                              setCheck(false);
                            } else {
                              setCheck(true);
                            }
                          }}
                          value={
                            !customSectonOne?.title
                              ? customSecOne
                              : customSecTwo
                          }
                          disabled={
                            customSectonOne?.title?.length > 0 &&
                            customSectonTwo?.title?.length > 0
                              ? true
                              : false
                          }
                        />
                        {customSectonOne?.title?.length > 0 &&
                          customSectonTwo?.title?.length > 0 && (
                            <span className="test-custom-text">
                              *{t("Only two custom sections allowed")}.
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-10">
                <div className="col-sm-6 col-6">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-6 text-right">
                  <button
                    onClick={() => {
                      if (extraSectionArr.length > 0) {
                        if (check) {
                          if (customSectonOne?.title) {
                            extraSectionArr.push("/cus-two");
                          } else {
                            extraSectionArr.push("/cus-one");
                          }
                        }

                        localStorage.setItem(
                          "extra_section_array",
                          JSON.stringify(extraSectionArr)
                        );

                        let root = extraSectionArr[0];
                        navigate(root);
                      } else {
                        handleAdditionalSection();
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {t("NEXT")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              {/* <PreviewTips /> */}
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddSection;
