import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import Dropdown from "./Dropdown";
import Signpad from "./Signpad";
import UploadSignImage from "./UploadSignImage";
import { useDispatch } from "react-redux";
import {
  addSignature,
  checkboxReducer,
  dateReducer,
  getSignature,
  imageSignReducer,
  locationReducer,
  padSignReducer,
  updateSignature,
} from "../../redux/features/signatureSlice";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const UploadSignature = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const signatureValues = useSelector((store) => store.signatureData);
  const [textSignature, setTextSignature] = useState({
    name: "",
    style: { fontStyle: "", fontFamily: "", color: "" },
  });
  const [styleObject, setStyleObject] = useState({
    size: "20px",
    align: "left",
    color: "black",
  });
  const [activeTab, setActiveTab] = useState(0);
  console.log("signatureStateData :>> ", signatureValues);
  const [padSign, setPadSign] = useState("");
  console.log("padSign", padSign);
  const [imageSign, setImageSign] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [location, setLocation] = useState(
    signatureValues.SignResponse.location || ""
  );
  const [contrastValue, setContrastValue] = useState(100);
  const [isChecked, setIsChecked] = useState(
    signatureValues.SignResponse.addDateAndPlace
      ? signatureValues.SignResponse.addDateAndPlace
      : false
  );
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
    // if (signatureValues?.SignResponse) {
    dispatch(getSignature());
    dispatch(checkboxReducer(isChecked));
    dispatch(locationReducer(location));

    // }
  }, [pathname, FinalResume, dispatch, isChecked, location]);

  const handleTabSelect = (index) => {
    setActiveTab(index);
    if (index === 0) {
      dispatch(padSignReducer(""));
      dispatch(imageSignReducer(""));
    }
    if (index === 1) {
      // dispatch(textReducer(''));
      dispatch(imageSignReducer(""));
    }
    if (index === 2) {
      // dispatch(textReducer(''));
      dispatch(padSignReducer(""));
    }
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    dispatch(checkboxReducer(event.target.checked));
  };

  const handleNext = () => {
    navigate("/final-resume");

    uploadSignature();
  };

  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else {
      navigate("/add-section");
    }
  };

  // Function to handle date change
  const handleDateChange = (event) => {
    const rawDate = event.target.value; // Get the raw date value from the input
    const parsedDate = new Date(rawDate); // Parse the raw date string to a Date object
    setDateValue(format(parsedDate, "yyyy-MM-dd"));
    const formattedDate = format(parsedDate, "MM/dd/yyyy"); // Format the date as "MM/dd/yyyy"
    setSelectedDate(formattedDate);
    dispatch(dateReducer(formattedDate)); // Update the selected date state
  };
  if (!selectedDate) {
    const formattedDate = format(new Date(), "MM/dd/yyyy"); // Format the date as "MM/dd/yyyy"
    dispatch(dateReducer(formattedDate));
    setSelectedDate(formattedDate); // Update the selected date state
    setDateValue(format(new Date(), "yyyy-MM-dd"));
  }
  ///////////////////upload-api//////////////////////

  const resume_token = localStorage.getItem("resume_token");
  const templateId = localStorage.getItem("templateId");
  const local_sign_data = {
    resume_token: resume_token,
    meta_key: "signature",
    resume_template_id: templateId,
    textSize: signatureValues.textsize,
    imageSize: signatureValues.imageSize,
    signSize: signatureValues.signSize,
    contrast: imageSign ? contrastValue : "",
    adjustment: signatureValues.alignment,
    color: signatureValues.color,
    addDateAndPlace: signatureValues.ischeck,
    date: signatureValues.date,
    location: signatureValues.location,
    text: signatureValues.text ? signatureValues.text : "",
    style: signatureValues.style ? signatureValues.style : "",
    sign: signatureValues.signdata ? signatureValues.signdata : "",
    upload: signatureValues.imagedata ? signatureValues.imagedata : "",
  };
  const uploadSignature = () => {
    const jsonFormData = {
      resume_token: resume_token,
      meta_key: "signature",
      resume_template_id: templateId,
      textSize: signatureValues.textsize,
      imageSize: signatureValues.imageSize,
      signSize: signatureValues.signSize,
      contrast: imageSign ? contrastValue : "",
      adjustment: signatureValues.alignment,
      color: signatureValues.color,
      addDateAndPlace: signatureValues.ischeck,
      date: signatureValues.date,
      location: signatureValues.location,
      text: signatureValues.text ? signatureValues.text : "",
      style: signatureValues.style ? signatureValues.style : "",
      sign: signatureValues.signdata ? signatureValues.signdata : "",
    upload: signatureValues.imagedata ? signatureValues.imagedata : "",
    };

    if (signatureValues.SignResponse.adjustment) {
      dispatch(updateSignature(jsonFormData));
    } else {
      dispatch(addSignature(jsonFormData));
    }
  };
  useEffect(() => {
    if (signatureValues.SignResponse.sign) {
      setActiveTab(1);
    } else if (signatureValues.SignResponse.upload) {
      setActiveTab(2);
    } else {
      setActiveTab(0);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    localStorage.setItem("local_sign_data", JSON.stringify(local_sign_data));
    // eslint-disable-next-line
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <section className="choose-template-section pt-4 bg-double pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="page-title-big">
                Laden Sie Ihre
                <br />
                <span style={{ color: "var(--yellow)" }}>Unterschrift</span>
                &nbsp;hoch
              </h1>
              <p>
                Wählen Sie unten eine Unterschriften-Option aus, um diese Ihrem
                Lebenslauf hinzuzufügen.
              </p>
              <div>
                <div className="tab-header mb-3 mt-4">
                  <button
                    className={activeTab === 0 ? "active" : ""}
                    onClick={() => handleTabSelect(0)}
                  >
                    Typ
                  </button>
                  <button
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => handleTabSelect(1)}
                  >
                    Unterschreiben
                  </button>
                  <button
                    className={activeTab === 2 ? "active" : ""}
                    onClick={() => handleTabSelect(2)}
                  >
                    Hochladen
                  </button>
                </div>
                <div className="tab-content">
                  <div className={activeTab === 0 ? "active" : "deactive"}>
                    <Dropdown
                      activeTab={activeTab}
                      setStyleObject={setStyleObject}
                      styleObject={styleObject}
                      textSignature={textSignature}
                      setTextSignature={setTextSignature}
                      setPadSign={setPadSign}
                      setImageSign={setImageSign}
                    />
                  </div>
                  <div className={activeTab === 1 ? "active" : "deactive"}>
                    <Signpad
                      activeTab={activeTab}
                      setStyleObject={setStyleObject}
                      styleObject={styleObject}
                      setTextSignature={setTextSignature}
                      setPadSign={setPadSign}
                      setImageSign={setImageSign}
                    />
                  </div>
                  <div className={activeTab === 2 ? "active" : "deactive"}>
                    <UploadSignImage
                      activeTab={activeTab}
                      setStyleObject={setStyleObject}
                      styleObject={styleObject}
                      setTextSignature={setTextSignature}
                      setPadSign={setPadSign}
                      setImageSign={setImageSign}
                      setContrastValue={setContrastValue}
                    />
                  </div>
                </div>
              </div>
              <div className="check-item-box mt-5">
                <label className="custom-check-container mb-2">
                  Datum und Ort hinzufügen
                  <input
                    type="checkbox"
                    defaultChecked={
                      signatureValues?.SignResponse.addDateAndPlace
                        ? signatureValues?.SignResponse.addDateAndPlace
                        : isChecked
                    }
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkmark"></span>
                </label>

                <div
                  className={`${
                    signatureValues?.SignResponse.addDateAndPlace
                      ? "enable-signature-field"
                      : isChecked
                      ? "enable-signature-field"
                      : "disable-signature-field"
                  }`}
                >
                  <form className="resume-contact-form">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>DATUM</label>
                          <input
                            type="date"
                            readOnly={
                              signatureValues?.SignResponse.addDateAndPlace
                                ? !signatureValues?.SignResponse.addDateAndPlace
                                : !isChecked
                            }
                            className="form-control"
                            placeholder="23.06.2023"
                            value={
                              selectedDate ? dateValue : signatureValues?.date
                            }
                            onChange={handleDateChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>ORT</label>
                          <input
                            type="text"
                            readOnly={
                              signatureValues?.SignResponse.addDateAndPlace
                                ? !signatureValues?.SignResponse.addDateAndPlace
                                : !isChecked
                            }
                            className="form-control"
                            placeholder="Berlin"
                            value={
                              location
                                ? location
                                : signatureValues?.location
                                ? signatureValues?.location
                                : signatureValues?.SignResponse.location
                            }
                            onChange={(e) => {
                              setLocation(e.target.value);
                              dispatch(locationReducer(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-sm-6 col-4">
                  <button
                    type="button"
                    className="btn site-btn bg-white text-black"
                    onClick={() => handleBack()}
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-8 text-right">
                  <button
                    className="btn site-btn bg-blue text-white"
                    type="button"
                    onClick={() => handleNext()}
                  >
                    {t("NEXT")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="upload-sign-preview ">
                <ResumeContactPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadSignature;
