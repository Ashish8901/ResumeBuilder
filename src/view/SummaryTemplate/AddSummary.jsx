import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import PreviewTips from "../../components/PreviewTips";
import PageHeading from "../../components/PageHeading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector, useDispatch } from "react-redux";
import { getSummmarySubCategories } from "../../redux/features/subCategorySlice";
// import { getSummaryListings } from '../../redux/features/descriptionListingSlice';
import { addSummary } from "../../redux/features/summarySlice";
// import { getPopularSubCategories } from '../../redux/features/popularJobTitleSlice';
// import { SyncLoader } from 'react-spinners';
import { useTranslation } from "react-i18next";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { arrExtSec } from "../../redux/features/extraSectionSlice";
const AddSummary = ({ handleRemoval }) => {
  const { t } = useTranslation();
  // let [time, setTime] = useState(1);

  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  // const [show, setShow] = useState(false);
  const [
    lvalue,
    // eslint-disable-next-line
    setLvalue,
  ] = useState([]);
  const [description, setDescription] = useState("<p></p>");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [skLoader, setSkLoader] = useState(true);

  // const summaryarray = useSelector(
  //   (store) => store.summaryData?.Summary?.resume?.meta_value
  // );
  localStorage.setItem("summaryInLocal", description);

  // let jobData =
  //   JSON.parse(localStorage.getItem('resume_meta_value_workexpr'))
  //     ?.meta_value[0] || null;
  // const [searchText, setSearchText] = useState(jobData?.jobtitle);

  // const subCatState = useSelector((store) => store.subCategoryData);

  // const SummaryListingData = useSelector(
  //   (store) => store.ListingsData.summaryListings.data
  // );

  // const getTime = () => {
  //   setInterval(() => {
  //     if (time <= 5) {
  //       setTime(time++);
  //     }
  //   }, 1000);
  // };
  // useEffect(() => {
  //   getTime();
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   if (SummaryListingData?.length > 0) {
  //     setTimeout(() => {
  //       setSkLoader(false);
  //     }, 200);
  //   }
  // }, [SummaryListingData]);

  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);
  // const handleSearch = (e) => {
  //   setSearchText(e.target.value);
  //   dispatch(getSummmarySubCategories(inputRef.current.value));
  // };

  // const handleClick = (id, value) => {
  //   setSearchText(value);
  //   dispatch(getSummaryListings(id));
  //   dispatch(getPopularSubCategories({ title: value, id: 5 }));
  // };
  // const handleChange = (e) => {
  //   let str = '';
  //   let descriptionString = str.concat(...description);
  //   let indexOfTag = descriptionString.indexOf('</p>');

  //   // let position = indexOfTag - 1;
  //   let newArr = [...lvalue];
  //   if (newArr.includes(e.target.value)) {
  //     newArr = [...lvalue];
  //     const indexOfValue = newArr.indexOf(e.target.value);
  //     newArr.splice(indexOfValue, 1);
  //     const replacedString = descriptionString.replace(`${e.target.value}`, '');
  //     // const updatedString = handleRemoval(e.target.value, descriptionString);
  //     setLvalue(newArr);
  //     setDescription(replacedString);
  //   } else {
  //     newArr.push(e.target.value);
  //     setLvalue(newArr);
  //     let splitStr = descriptionString.split('');
  //     // if (!descriptionString.includes(`<li>&nbsp;</li>`)) {
  //     splitStr.splice(indexOfTag, 0, e.target.value);
  //     let joinedStr = splitStr.join('');
  //     setDescription(joinedStr);
  //     // } else {
  //     //   const replaceNBSP = descriptionString.replace('&nbsp;', e.target.value);
  //     //   setDescription(replaceNBSP);
  //     // }
  //   }
  // };

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
    // let arr = [...lvalue];
    // let splArr = [];
    // const skillLists = SummaryListingData.map((skill) => skill.description);
    // for (let i of skillLists) {
    //   if (data.length === 0) {
    //     arr = [];
    //     setLvalue(arr);
    //   }
    //   if (!data.includes(i) && arr.includes(i)) {
    //     splArr.push(i);
    //     let filteredArr = arr.filter(function (val) {
    //       return splArr.indexOf(val) === -1;
    //     });

    //     setLvalue(filteredArr);
    //   } else {
    //     if (data.includes(i) && !arr.includes(i)) {
    //       arr.push(i);
    //       setLvalue(arr);
    //     }
    //   }
    // }
  };
  const resume_token = localStorage.getItem("resume_token") || null;
  // const searchTerm = jobData?.jobtitle;
  // useEffect(() => {
  //   const newArr =
  //     subCatState?.SummarySubCategories?.data?.filter(
  //       (el) => el.title.toLowerCase() === searchTerm?.toLowerCase()
  //     ) || [];
  //   if (newArr?.length > 0) {
  //     dispatch(getSummaryListings(newArr[0]?.id));
  //   }
  // }, [dispatch, subCatState?.SummarySubCategories?.data, searchTerm]);

  const setDescriptionData = () => {
    const summary = localStorage.getItem("resume_meta_value_summary");

    // const summaryArr = JSON.parse(localStorage.getItem('summaryArray'));
    // if (summaryArr?.length > 0) {
    //   setLvalue(summaryArr);
    // }
    if (summary) {
      setDescription(summary);
    }
  };

  useEffect(() => {
    setDescriptionData();

    if (resume_token) {
      dispatch(getSummmarySubCategories());
      // dispatch(getSummary(resume_token));
    }
  }, [dispatch, resume_token]);

  const summary = localStorage.getItem("resume_meta_value_summary");
  const summaryFromServer = useSelector((store) => store.summaryData.Summary);
  console.log("summary", summary);
  console.log("description", description);
  /////////////////////////////////////////////////////////////////////////////
  const saveSummary = () => {
    calcSummaryPerc();

    const nameArr = JSON.parse(localStorage.getItem("ext_name_arr"));
    const filterName = nameArr.filter((ele) => ele !== "Summary");
    let route = "";
    const pathArray = JSON.parse(localStorage.getItem("extra_section_array"));
    if (pathname !== pathArray[pathArray.length - 1]) {
      for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i] === pathname) {
          route = pathArray[i + 1];
        }
      }
    } else {
      route = "/signature";
    }
    ///////////////////////////////////////////////////////////////////////////////
    if (summary === null && description !== "") {
      // console.log("description",description)
      dispatch(
        addSummary({ data: description ? description : "", resume_token })
      );

      localStorage.setItem("summaryArray", JSON.stringify(lvalue));
      dispatch(arrExtSec(filterName));
      navigate(route);
    }
    /////////////////////////////////////////////////////////////////
    else if (summary !== null && description !== "") {
      dispatch(
        addSummary({ data: description ? description : "", resume_token })
      );
      localStorage.setItem("summaryArray", JSON.stringify(lvalue));

      dispatch(arrExtSec(filterName));
      navigate(route);
    }
    /////////////////////////////////////////////////////////////
    else if (description === "") {
      if (summary !== null) {
        localStorage.removeItem("resume_meta_value_summary");
        localStorage.removeItem("summaryInLocal");
        localStorage.setItem("summaryArray", JSON.stringify(lvalue));

        dispatch(arrExtSec(filterName));
        navigate(route);
      } else {
        dispatch(arrExtSec(filterName));
        navigate(route);
      }
    }

    /////////////////////////////////////////////////////////////////
    if (description !== "<p></p>") {
      calcSummaryPerc();
      // console.log("description in professional summary",description)
      localStorage.setItem("summaryArray", JSON.stringify(lvalue));
      dispatch(
        addSummary({ data: description ? description : "", resume_token })
      );
      if (localStorage.getItem("FinalResume") === "true") {
        navigate("/final-resume");
      } else {
        navigate(route);
      }
    } else {
      localStorage.removeItem("resume_meta_value_summary");
      localStorage.removeItem("summaryInLocal");
      localStorage.setItem("summaryArray", JSON.stringify(lvalue));
      if (localStorage.getItem("FinalResume") === "true") {
        navigate("/final-resume");
      } else {
        navigate("/signature");
      }
    }
  };
  const handleBack = () => {
    let route = "";
    const pathArray = JSON.parse(localStorage.getItem("extra_section_array"));
    if (pathname !== pathArray[0]) {
      for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i] === pathname) {
          route = pathArray[i - 1];
          navigate(route);
        }
      }
    } else if (FinalResume && summaryFromServer) {
      navigate("/final-resume");
    } else {
      route = "/add-section";
      navigate(route);
    }
  };

  const calcSummaryPerc = () => {
    let perc = 0;
    if (description === "<p></p>") {
      perc = 0;
    } else {
      if (description.length <= 14 && description.length >= 7) {
        perc += 12;
      } else if (description.length === 0 || description === " ") {
        perc = 0;
      } else {
        perc += 20;
      }
    }
    localStorage.setItem("summStr", perc);
  };

  return (
    <>
      <section className="choose-template-section summary-box pt-4 bg-double pb-5">
        <div className="container">
          <div className="pd-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="">
                  <div className="editor-box mt-3">
                    <PageHeading
                      headinglabel={t("Briefly tell us about your background")}
                    />

                    <div className="mt-3">
                      <p>Dieser Bereich ist optional</p>
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
                        data={description}
                        onChange={handleCkeditorState}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                    </div>
                  </div>
                  {/*  <div className="">
                    <div className="skill-list-box-outer">
                      <div className="p-4">
                        <p className="mb-3 bold">
                          {t('Search by job title for pre-written examples')}
                        </p>
                        <form>
                          <div className="form-group custom-search-box">
                            <input
                              className="search-input"
                              autoComplete="off"
                              onFocus={() => setShow(true)}
                              type="text"
                              placeholder="Title, industry, keyword"
                              name="search"
                              onChange={handleSearch}
                              value={searchText}
                              ref={inputRef}
                            />
                            <button type="submit" className="search-btn">
                              <i className="fa fa-search"></i>
                            </button>
                          </div>
                          {show && (
                            <div>
                              <ul
                                className="search-list searchlist-skill"
                                onClick={() => setShow(!show)}
                              >
                                <li>
                                  <p className="mb-0 head-suggested">
                                    {t('Suggested searches')}
                                  </p>
                                </li>
                                {subCatState?.SummarySubCategories?.data?.map(
                                  (data) => {
                                    return (
                                      <>
                                        {' '}
                                        <hr
                                          style={{
                                            marginTop: '0.4rem',
                                            marginBottom: '0.4rem',
                                            width: '95%',
                                          }}
                                        />
                                        <li
                                          onClick={() =>
                                            handleClick(data.id, data.title)
                                          }
                                          key={data.id}
                                        >
                                          <p className="mb-0">
                                            <span className="seacrch-icon">
                                              <i className="fa fa-search"></i>
                                            </span>
                                            {data.title}
                                          </p>
                                        </li>
                                      </>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          )}
                        </form>
                      </div>
                      <div className="fiter-search">
                        {/* <div className="fiter-search-left">
                        <div className="search-key-box">
                          <p>{t("Popular Job Titles")}</p>
                          <ul className="search-key-list">
                            {subCategoriesData?.length > 0
                              ? subCategoriesData?.map((data) => {
                                  return (
                                    <li>
                                      <div className="key-icon">
                                        <i className=" fa fa-search"></i>
                                      </div>
                                      <div
                                        onClick={() =>
                                          handlePopularJobTitle(
                                            data.id,
                                            data.title
                                          )
                                        }
                                      >
                                        {data.title}
                                      </div>
                                    </li>
                                  );
                                })
                              : `${t("NO DATA FOUND")}`}
                          </ul>
                        </div>
                      </div> 
                        <div className="fiter-search-right">
                          <div className="list-editor skill-list-editor">
                            <div className="skill-list-box">
                              {skLoader ? (
                                <div className="sync-loader no-data">
                                  {time !== 5 ? (
                                    <SyncLoader
                                      style={{
                                        margin: 'auto',
                                        display: 'block',
                                        zIndex: '10000',
                                      }}
                                      color="var(--blue)"
                                    />
                                  ) : (
                                    `${t('No data found for this job profile')}`
                                  )}
                                </div>
                              ) : (
                                <>
                                  <ul>
                                    {SummaryListingData?.map((listing) => {
                                      return (
                                        <li
                                          className="list-editor-item"
                                          key={listing.id}
                                        >
                                          <div className="item-left">
                                            <button
                                              style={{
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                color: ' #fff',
                                                whiteSpace: 'nowrap',
                                              }}
                                            >
                                              {!description.includes(
                                                listing.description
                                              )
                                                ? '+'
                                                : '-'}
                                            </button>
                                            <input
                                              className="item-right"
                                              type="checkbox"
                                              checked={
                                                lvalue.indexOf(
                                                  listing.description
                                                ) > -1
                                              }
                                              value={listing.description}
                                              onChange={handleChange}
                                            />
                                          </div>
                                          <div>
                                            <div className="item-right">
                                              <p className="mb-0">
                                                {listing.description}&nbsp;
                                                <span
                                                  style={{
                                                    color: 'var(--blue)',
                                                  }}
                                                >
                                                  [subject]
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    })}
                                    {/* <div className="add-rmv-btn">
                                  <button>add</button>
                                </div>
                                <div className="add-text">
                                  Enthusiastic{' '}
                                  <span style={{ color: 'var(--blue)' }}>
                                    [Job Title]
                                  </span>{' '}
                                  eager to contribute to team success through
                                  hard work, attention to detail and excellent
                                  organizational skills. Clear understanding of
                                  [Task] and training in{' '}
                                  <span style={{ color: 'var(--blue)' }}>
                                    [Skill]
                                  </span>
                                  . Motivated to learn, grow and excel in{' '}
                                  <span style={{ color: 'var(--blue)' }}>
                                    [Industry]
                                  </span>
                                  .
                                </div>
                              </li> 
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="row mt-5">
                    <div className="col-sm-4 col-2">
                      <button
                        onClick={handleBack}
                        className="width-btn btn site-btn border-btn"
                      >
                        {t("Back")}
                      </button>
                    </div>
                    <div className="col-sm-8 col-10 text-right">
                      {/* <Link > */}
                      <button
                        type="button"
                        className="btn site-btn bg-blue text-white ml-2"
                        onClick={saveSummary}
                      >
                        {localStorage.getItem("FinalResume") === "true"
                          ? `${t("SAVE AND NEXT")}`
                          : `${t("NEXT")}`}
                      </button>
                      {/* </Link> */}
                    </div>
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
};

export default AddSummary;
