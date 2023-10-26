import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import PreviewTips from "../../components/PreviewTips";
import RangeSlider from "../../components/RangeSlider";
import {
  addlanguage,
  getLanguage,
  getSearchlanguage,
} from "../../redux/features/LanguageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import { Listbox } from "@headlessui/react";
// import { Combobox } from "@headlessui/react";
import ResumeContactPreview from "../../components/ResumeContactPreview";
const Portfolio = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loaction = useLocation();
  const pathname = loaction.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const [nativeShow, setNativeShow] = useState(false);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0);
  const [
    // eslint-disable-next-line
    showText,
    setShowText,
  ] = useState(true);
  const [
    // eslint-disable-next-line
    Opa,
    setOpa,
  ] = useState(0);
  // eslint-disable-next-line
  const textFadeOutTimer = (e) => {
    switch (e.target.value) {
      case "0":
        setTime(0);
        break;
      case "20":
        setTime(2000);
        break;
      case "40":
        setTime(5000);
        break;
      case "70":
        setTime(7000);
        break;
      case "100":
        setTime(10000);
        break;
      default:
        setTime(0);
    }
  };

  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => {
        setShowText(false);
      }, time);
      return () => clearInterval(timeout);
    }
  }, [time]);

  const [langLevel, setLangLevel] = useState("A1");
  const [slideValue, setSlideValue] = useState(0);
  const LanguageData = useSelector((store) => store.LanguageData.LanguageArr);
  const [selectedIndex, setSelectedIndex] = useState(null);
  let [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
  const [inputNativeFields, setInputNativeFields] = useState(
    JSON.parse(localStorage.getItem("Nativefield")) || [
      {
        nativeLang: "",
      },
    ]
  );
  console.log("inputNativeFields", inputNativeFields);
  const [inputLanguageField, setInputLanguageField] = useState(
    JSON.parse(localStorage.getItem("Languagefield")) || [
      {
        language: "",
        level: langLevel ? langLevel : "A1",
        value: slideValue ? slideValue : 0,
      },
    ]
  );

  const inputRef = useRef();
  const inputRefPro = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLanguage());
  }, [dispatch]);

  const onChangeApp = (value) => {
    setSlideValue(value);
    setOpa(value / 100);

    if (value === 0) {
      setLangLevel("A1");
    } else if (value === 20) {
      setLangLevel("A2");
    } else if (value === 40) {
      setLangLevel("B1");
    } else if (value === 60) {
      setLangLevel("B2");
    } else if (value === 80) {
      setLangLevel("C1");
    } else if (value === 100) {
      setLangLevel("C2");
    }
  };

  const handleSlideValue = (slideValue, langLevel, index) => {
    selectedLanguageIndex = index;
    const arr = [...inputLanguageField];
    arr[selectedLanguageIndex].level = langLevel;
    arr[selectedLanguageIndex].value = slideValue;
    setInputLanguageField(arr);
  };
  const [searchText, setSearchText] = useState("");
  const [searchProText, setSearchProText] = useState("");

  const handleSearch = (index, e) => {
    const { name, value } = e.target;
    setSearchText(e.target.value);
    dispatch(getSearchlanguage(searchText));
    const list = [...inputNativeFields];
    list[index][name] = value;
    setInputNativeFields(list);
  };
  const searchlangData = useSelector(
    (store) => store.LanguageData.SearchLang.data
  );
  const handleLanguageSearch = (index, e) => {
    const { name, value } = e.target;
    setSearchProText(e.target.value);
    dispatch(getSearchlanguage(searchProText));
    const list = [...inputLanguageField];
    list[index][name] = value;
    setInputLanguageField(list);
    // const data = LanguageData.filter(
    //   (el) => el.name?.toLowerCase() === inputRef.current.value.toLowerCase()
    // );
  };

  const handleClick = (value, index) => {
    const arr = [...inputNativeFields];
    arr[selectedIndex].nativeLang = value;
    setInputNativeFields(arr);
    setNativeShow(false);
  };
  // const [langValue, setLangValue] = useState(null);
  const handleLanguageClick = (value) => {
    // setLangValue(value);
    const arr = [...inputLanguageField];
    arr[selectedLanguageIndex].language = value;
    setInputLanguageField(arr);
    // setShow(false);
  };

  const handleAddNative = (e) => {
    e.preventDefault();
    setInputNativeFields([
      ...inputNativeFields,
      {
        nativeLang: "",
      },
    ]);
    setSearchText("");
  };
  const handleAddLanguage = (e) => {
    e.preventDefault();
    setInputLanguageField([
      ...inputLanguageField,
      {
        language: "",
        level: "A1",
        value: 0,
      },
    ]);
    setSearchProText("");
  };

  const removeNativeInputFields = (index, e) => {
    const rows = [...inputNativeFields];
    rows.splice(index, 1);
    setInputNativeFields(rows);
  };

  const removeLanguageInputFields = (index, e) => {
    const rows = [...inputLanguageField];
    if (rows.length === 1) {
      rows[index]["language"] = "";
      rows[index]["level"] = "A1";
      rows[index]["value"] = 0;
      setInputLanguageField(rows);
      setLangLevel("A1");
      // setLangValue('');
    } else {
      rows.splice(index, 1);

      setInputLanguageField(rows);
    }
  };

  const resume_token = localStorage.getItem("resume_token");

  const saveLanguage = () => {
    // const pathArray = JSON.parse(localStorage.getItem("extra_section_array"));
    let route = "/add-section";
    // if (pathname !== pathArray[pathArray?.length - 1]) {
    //   for (let i = 0; i < pathArray?.length; i++) {
    //     if (pathArray[i] === pathname) {
    //       route = pathArray[i + 1];
    //     }
    //   }
    // } else {
    //   route = "/final-resume";
    // }
    if (resume_token) {
      dispatch(
        addlanguage({
          data: {
            Native: inputNativeFields,
            Languages: inputLanguageField,
          },
        })
      );
      navigate(route);
    }
  };

  useEffect(() => {
    localStorage.setItem("Languagefield", JSON.stringify(inputLanguageField));
    localStorage.setItem("Nativefield", JSON.stringify(inputNativeFields));
  }, [
    inputLanguageField,
    slideValue,
    langLevel,
    selectedLanguageIndex,
    inputNativeFields,
  ]);
  // localStorage.getItem()

  const languageData = useSelector((store) => store.LanguageData.Language);

  const handleBack = () => {
    let route = "";
    // const pathArray = JSON.parse(localStorage.getItem("extra_section_array"));
    // if (pathname !== pathArray[0]) {
    //   for (let i = 0; i < pathArray.length; i++) {
    //     if (pathArray[i] === pathname) {
    //       route = pathArray[i - 1];
    //       navigate(route);
    //     }
    //   }
    // }
    if (
      FinalResume &&
      (languageData?.nativeLang?.length > 0 ||
        languageData?.proLanguage?.length > 0)
    ) {
      navigate("/final-resume");
    } else {
      route = "/summary";
      navigate(route);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setNativeShow(false);
      }
      if (inputRefPro.current && !inputRefPro.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id) => {
    if (id === 1) {
      setNativeShow(!nativeShow);
    } else {
      setShow(!show);
    }
  };

  let x = 1;

  const langArr = LanguageData?.map((ele) => ele.name);
  return (
    <>
      <section
        className="choose-template-section pt-4 bg-double pb-5 language-screen"
        // onClick={() => {
        //   setNativeShow(false);
        //   setShow(false);
        // }}
      >
        <div className="container">
          <div className="row mb-5 pb-1">
            <div className="col-lg-6 pl-0">
              <h1 className="page-title-big">
                Welche &nbsp;
                <span style={{ color: "var(--yellow)" }}>Sprache</span>
                &nbsp;Sie?
              </h1>
              {/* <PageHeading headinglabel={t("Add your language skills")} /> */}
              <p>
                Fügen Sie Ihre Muttersprache sowie alle anderen Sprache hinzu,
                die Sie sprechen.
              </p>
              {/* <PageSubHeading
                subheading={t(
                  "Include your native language and additional languages you speak."
                )}
              /> */}

              <div className="row">
                <div className="col-lg-10">
                  <div className="portfolio-link  mt-4">
                    <form>
                      <label>{t("Native language")}</label>
                      <br />
                      <div>
                        <div className="row">
                          <div className="col-lg-10">
                            <div ref={inputRef}>
                              <div
                                className=" position mb-0"
                                style={{ marginBottom: "0px !important" }}
                              >
                                {inputNativeFields.map((data, index) => {
                                  return (
                                    <div key={index} className="langg-box-list">
                                      <div className="test search-test search-pd mb-0">
                                        <input
                                          className="search-input"
                                          type="text"
                                          autoComplete="off"
                                          // onFocus={() => setNativeShow(true)}
                                          placeholder={t("Select")}
                                          onChange={(e) =>
                                            handleSearch(index, e)
                                          }
                                          onClick={() => {
                                            setSelectedIndex(index);
                                            setShow(false);
                                            toggleDropdown(1);
                                          }}
                                          name="nativeLang"
                                          value={data.nativeLang}
                                        />

                                        <div className="col">
                                          {inputNativeFields.length !== 1 ? (
                                            <span
                                              className="btn btn-outline-danger"
                                              onClick={() =>
                                                removeNativeInputFields(index)
                                              }
                                            >
                                              <i
                                                className="fa fa-trash"
                                                aria-hidden="true"
                                              ></i>
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {nativeShow ? (
                                <div>
                                  <ul
                                    className="search-list language-search-list"
                                    // onClick={() => setNativeShow(!nativeShow)}
                                  >
                                    {!searchText
                                      ? LanguageData?.map((item, index) => {
                                          return (
                                            <li
                                              key={item.id}
                                              onClick={() =>
                                                handleClick(item.name, index)
                                              }
                                            >
                                              <p className="mb-0 head-suggested">
                                                {item.name}
                                              </p>
                                            </li>
                                          );
                                        })
                                      : searchlangData?.map((item, index) => {
                                          return (
                                            <li
                                              key={item.id}
                                              onClick={() =>
                                                handleClick(item.name, index)
                                              }
                                            >
                                              <p className="mb-0 head-suggested">
                                                {item.name}
                                              </p>
                                            </li>
                                          );
                                        })}
                                  </ul>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="add-lang-container mt-3">
                        <div className="add-other-language text-blue">
                          <button
                            className=" text-right text-blue"
                            disabled={
                              inputNativeFields[inputNativeFields?.length - 1][
                                "nativeLang"
                              ] === ""
                            }
                            onClick={handleAddNative}
                          >
                            <i className="fa fa-plus  mr-1"></i>{" "}
                            {t("Add another")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="portfolio-link mt-5">
                    <form>
                      <label>{t("Language")}</label>
                      <br />

                      <div className="form-group mb-0">
                        {inputLanguageField?.map((data, index) => {
                          // console.log("data",data)
                          return (
                            <>
                              {langArr?.includes(data.language) && (
                                <div className="active-slide">
                                  <div
                                    className="paragroup-item pd-custom mb-0"
                                    key={index}
                                  >
                                    <p className="para-toolbar">
                                      {inputLanguageField && (
                                        <span
                                          className="cursor-pointer text-white"
                                          onClick={() =>
                                            removeLanguageInputFields(index)
                                          }
                                        >
                                          <i
                                            className="fa fa-trash"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      )}

                                      {/* <button to="">
                                <i
                                  className="fa fa-arrows"
                                  aria-hidden="true"
                                ></i>
                              </button> */}
                                    </p>

                                    <div className="education-del-para">
                                      <div className="row">
                                        <div className="col-sm-12 langg-hd">
                                          <span className="mr-2 number-text">
                                            {x++}
                                          </span>
                                          <span className="bold mr-2 text-base">
                                            {data.language}
                                          </span>

                                          <span className="text-base">
                                            Selbsteinschätzung&nbsp;|&nbsp;
                                            <span>{data.level}</span>
                                          </span>
                                        </div>
                                        <div className="col-sm-12">
                                          <div
                                            className="proficency-range mt-4"
                                            onClick={() =>
                                              handleSlideValue(
                                                slideValue,
                                                langLevel,
                                                index
                                              )
                                            }
                                          >
                                            <RangeSlider
                                              onChange={onChangeApp}
                                              data={data.language}
                                              data2={data.value}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="row hide-row ">
                                <div className="col-lg-7 col-md-10 col-custom pr-2">
                                  <div ref={inputRefPro}>
                                    <div
                                      className="search-pd"
                                      key={index}
                                      style={{ display: "flex" }}
                                    >
                                      <input
                                        className="search-input"
                                        autoComplete="off"
                                        type="text"
                                        placeholder={t("Select")}
                                        onChange={(e) =>
                                          handleLanguageSearch(index, e)
                                        }
                                        onClick={() => {
                                          setSelectedLanguageIndex(index);
                                          setNativeShow(false);
                                          toggleDropdown(2);
                                        }}
                                        name="language"
                                        value={data.language}
                                        ref={inputRefPro}
                                      />
                                    </div>
                                    {show && (
                                      <div>
                                        <ul className="search-list language-search-list width-92">
                                          {!searchProText
                                            ? LanguageData?.map(
                                                (item, index) => {
                                                  return (
                                                    <li
                                                      key={item.id}
                                                      onClick={() =>
                                                        handleLanguageClick(
                                                          item.name,
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <p className="mb-0 head-suggested">
                                                        {item.name}
                                                      </p>
                                                    </li>
                                                  );
                                                }
                                              )
                                            : searchlangData?.map(
                                                (item, index) => {
                                                  return (
                                                    <li
                                                      key={item.id}
                                                      onClick={() =>
                                                        handleLanguageClick(
                                                          item.name,
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <p className="mb-0 head-suggested">
                                                        {item.name}
                                                      </p>
                                                    </li>
                                                  );
                                                }
                                              )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-12 pt-5">
                                  <div className="proficency-range mt-4">
                                    <RangeSlider onChange={onChangeApp} />
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="add-lang-container mt-3">
                            <div className="add-other-language text-blue">
                              <button
                                className=" text-left add-lngg-btn text-blue"
                                disabled={
                                  inputLanguageField[
                                    inputLanguageField?.length - 1
                                  ].language === ""
                                }
                                onClick={handleAddLanguage}
                              >
                                <i className="fa fa-plus  mr-2"></i>
                                {t("Add another")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row mt-10">
                <div className="col-sm-6 col-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn site-btn bg-white text-black"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-8 text-right">
                  <button
                    className="btn site-btn bg-blue text-white"
                    type="button"
                    onClick={saveLanguage}
                  >
                    {localStorage.getItem("FinalResume") === "true"
                      ? `${t("SAVE AND NEXT")}`
                      : `${t("NEXT")}`}
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
      </section>
    </>
  );
};

export default Portfolio;
