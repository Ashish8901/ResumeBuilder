import React, { useEffect, useState } from "react";
// import PageHeading from '../../components/PageHeading';
// import PageSubHeading from '../../components/PageSubHeading';
import ResumeContactPreview from "../../components/ResumeContactPreview";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeading, addHeading } from "../../redux/features/resumeSlice";
import ProfileImage from "../AllTemplate/ProfileImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
const schema = yup.object().shape({
  email: yup.string().email().required("E-Mail ist erforderlich.").max(35),
  fname: yup
    .string()
    .required("Vorname ist erforderlich.")
    .trim("First name cannot include whitespaces.")
    .max(34)
    .strict(true),

  lname: yup
    .string()
    .required("Nachname muss erforderlich sein")
    .trim("Der Vorname darf keine Leerzeichen enthalten.")
    .max(34)
    .strict(true),

  // image: yup
  // .mixed()
  // .test("fileFormat", "Nur JPG, PNG oder GIF Dateien erlaubt", (value) => {
  //   if (!value) return true; // allow empty values
  //   const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
  //   return supportedFormats.includes(value.type);
  // })
  // .required("Foto ist erforderlich"),
  // image: yup.string().required('Foto muss erforderlich sein').max(4).strict(true)

  // image: yup.boolean().when('image', {
  //   is: true,
  //   then: yup.boolean().oneOf([true], 'Foto muss erforderlich sein'),
  //   otherwise: yup.boolean().oneOf([true], 'Foto muss erforderlich sein')
  // })
  // image: yup.boolean().required('Foto muss erforderlich sein')
});
const ResumeContactStruture = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const tempId = useSelector((store) => store.resumeData.template_id);
  const navigate = useNavigate();
  const isStudent = useSelector((store) => store.resumeData.studentCheck);
  const Expr = useSelector((store) => store.resumeData.experienceLevel);
  const Imageee = useSelector((store) => store.resumeData.image);
  let meta_value = useSelector((store) => store.resumeData.heading.data);
  console.log("Imageee", Imageee);
  // eslint-disable-next-line

  const [fname, setFname] = useState("" || meta_value?.fname);
  const [lname, setLname] = useState("" || meta_value?.lname);
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [location, setLocation] = useState("");
  const [birthDatePlace, setBirthDatePlace] = useState("");
  const [email, setEmail] = useState("" || meta_value?.email);
  const [licence, setLicence] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [newTrue, setNewTrue] = useState(0);

  const [picturedata, setPicturedata] = useState("");
  const [checkImage, setCheckImage] = useState(false);
  const [imageExist, setImageExist] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const defaultHeadingValues = {
    fname,
    lname,
    phone,
    pincode,
    street,
    location,
    birthDatePlace,
    email,
    licence,
    maritalStatus,
    socialLink,
  };
  localStorage.setItem(
    "resume_meta_value_heading",
    JSON.stringify(defaultHeadingValues)
  );
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);

  useEffect(() => {
    const getData = () => {
      setFname(meta_value?.fname);
      setLname(meta_value?.lname);
      setPhone(meta_value?.phone);
      setPincode(meta_value?.pincode);
      setStreet(meta_value?.street);
      setLocation(meta_value?.location);
      setBirthDatePlace(meta_value?.birthDatePlace);
      setEmail(meta_value?.email);
      setLicence(meta_value?.licence);
      setMaritalStatus(meta_value?.maritalStatus);
      setSocialLink(meta_value?.socialLink);
    };
    if (meta_value) getData();
    // eslint-disable-next-line
  }, []);

  const resume_token = localStorage.getItem("resume_token");

  useEffect(() => {
    if (resume_token) {
      if (meta_value !== null) {
        dispatch(getHeading({ meta_key: "heading", resume_token }));
      }
    }
    let imageExistt = Imageee ? true : false;
    setImageExist(imageExistt);
  }, [dispatch, meta_value, resume_token, Imageee]);

  const saveHeading = () => {
    dispatch(addHeading(defaultHeadingValues))
      .then((res) => {
        calcPerc();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkallfields = () => {
    if (imageExist || picturedata.name) {
      setCheckImage(true);
    }
  };
  useEffect(() => {
    checkallfields();
    // eslint-disable-next-line
  }, [picturedata, imageExist]);
  const templId = JSON.parse(localStorage.getItem("templiD"));
  const handleClick = () => {
    if (
       
      // checkImage &&     // validation for image mandatory
      templId === 4 ||
      templId === 0 ||
      tempId === "styleTempOne" ||
      tempId === "styleTempDBSeven" ||
      tempId === "styleTempDBEight" ||
      tempId === "styleTempDBNine" ||
      tempId === "styleTempDBTen" ||
      tempId === "styleTempDBEleven" ||
      tempId === "styleTempDBTwelve" ||
      tempId === "styleTempThree" ||
      tempId === "styleTempFour" ||
      tempId === "styleTempFive"
    ) {
      saveHeading();

      if (localStorage.getItem("FinalResume") === "true") {
        navigate("/final-resume");
      } else if (isStudent === "Yes" && (Expr === "0" || Expr === "0-3")) {
        navigate("/resume-education");
      } else {
        navigate("/expr");
      }
    } else if (
      tempId === "1" ||
      tempId === "3" ||
      tempId === "styleTempTwo" ||
      templId === 0
    ) {
      saveHeading();

      if (localStorage.getItem("FinalResume") === "true") {
        navigate("/final-resume");
      } else if (isStudent === "Yes" && (Expr === "0" || Expr === "0-3")) {
        navigate("/resume-education");
      } else {
        navigate("/expr");
      }
    }
  };

  const handleBack = () => {
    FinalResume ? navigate("/final-resume") : navigate("/choose-template");
  };
  const [validationState, setValidationState] = useState(true);
  const [surnameValidate, setSurnameValidate] = useState(true);

  //Function for calculating the percentage
  const calcPerc = () => {
    let perc = 20;
    if (!street && !location && !pincode) {
      perc -= 7;
    } else if (!location && !pincode) {
      perc -= 5;
    } else if (!street && !pincode) {
      perc -= 5;
    } else if (!street && !location) {
      perc -= 5;
    } else if (!street || !location || !pincode) {
      perc -= 2;
    }
    localStorage.setItem("strHead", perc);
  };

  // useEffect(() => {
  //   console.log("IS IMAGE  useEffect",isImage)
  //   localStorage.getItem("image")
  //   if(isImage){
  //   return  {...register('image', "true")
  //   }
  //   }
  //   else{
  //     return  {...register('image', "falseee" )
  //   }
  //   }

  //     // return  {...register('image', isImage)

  // }, [isImage])
  const [isActive, setIsActive] = useState(
    JSON.parse(localStorage.getItem("radActive")) || false
  );

  const handleClick1 = (event) => {
    // 👇️ toggle isActive state on click
    setIsActive((current) => !current);
  };
  localStorage.setItem("radActive", isActive);
  return (
    <>
      <section className="choose-template-section resume-contact-section bg-double pt-4 pb-5 resume-form-page">
        <div className="container pt-1">
          {/* <form> */}
          {/* <div className="row">
            <div className="col-sm-12 pd-6">
              <div className="mb-4">
              
                <PageHeading
                  headinglabel={t("Tell us a little more about yourself")}
                />

            
                <PageSubHeading
                  subheading={t(
                    "Tell us who you are, how employers can get in touch with you and what your job is."
                  )}
                />
              </div>
            </div>
          </div> */}
          {/* without image */}
          <div className="row">
            <div className="col-lg-6 custom-col-7">
              <h1 className="page-title-big mleft-3">
                Erzählen Sie uns ein bisschen{" "}
                <span style={{ color: "var(--yellow)" }}> mehr über sich</span>
              </h1>
              {/* <p className="mleft-3">
                Verraten Sie uns, wer Sie sind, wie Arbeitgeber mit Ihnen in
                Kontakt treten können und was Ihr Beruf ist.
              </p> */}
              <div className="resume-contact-form profile-img-resume-contact">
                <div></div>
                {(function () {
                  if (
                    tempId === "styleTempDBSix" ||
                    tempId === "styleTempDBSeven" ||
                    tempId === "styleTempDBEight" ||
                    tempId === "styleTempDBNine" ||
                    tempId === "styleTempDBTen" ||
                    tempId === "styleTempDBEleven" ||
                    tempId === "styleTempDBTwelve" ||
                    tempId === "styleTempOne" ||
                    tempId === "styleTempThree" ||
                    tempId === "styleTempFour" ||
                    tempId === "styleTempFive"
                  ) {
                    return (
                      <div>
                        <div className="profile-img-box">
                          <ProfileImage
                            newTrue={newTrue}
                            onDataChange={(newData) => {
                              setPicturedata(newData);
                            }}
                          />
                        </div>
                        {!checkImage ? (
                          ""
                        ) : !checkImage ? (
                          <small className="text-danger">
                            {t("Photo is required")}
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div style={{ display: "none" }}>
                        <div className="profile-img-box">
                          <ProfileImage />
                          <small className="text-danger">
                            {errors.image?.message}
                          </small>
                        </div>
                      </div>
                    );
                  }
                })()}
                <div>
                  <div className="row">
                    <div className="col-lg-12">
                      <p className="f-16">
                        Verraten Sie uns, wer Sie sind, wie Arbeitgeber mit
                        Ihnen in Kontakt treten können.
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>{t("Name")}</label>
                        <input
                          type="text"
                          name="fname"
                          value={fname}
                          {...register("fname", {
                            onChange: (e) => {
                              if (validationState) {
                                setFname(e.target.value.split(" ")[0]);
                              } else {
                                setFname(e.target.value);
                                setValidationState(true);
                              }
                            },
                          })}
                          onKeyPress={(e) => {
                            setValidationState(false);
                          }}
                          className="form-control"
                          placeholder="z.B. Maria"
                        />
                        <small className="text-danger">
                          {errors.fname?.message}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>{t("Surname")}</label>
                        <input
                          type="text"
                          name="lname"
                          value={lname}
                          {...register("lname", {
                            onChange: (e) => {
                              if (surnameValidate) {
                                setLname(e.target.value.split(" ")[0]);
                              } else {
                                setLname(e.target.value);
                                setSurnameValidate(true);
                              }
                            },
                          })}
                          onKeyPress={(e) => {
                            setSurnameValidate(false);
                          }}
                          className="form-control"
                          placeholder="z.B. SCHAFER"
                        />
                        <small className="text-danger">
                          {errors.lname?.message}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>GEBURTSDATUM UND GEBURTSORT</label>
                        <input
                          type="text"
                          name="birthDatePlace"
                          value={birthDatePlace}
                          onChange={(e) =>
                            setBirthDatePlace(
                              ([e.target.name] = e.target.value)
                            )
                          }
                          className="form-control"
                          placeholder="01.01.1985 in Berlin"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label> {t("STREET AND HOUSE NUMBER")}</label>
                        <input
                          type="text"
                          name="street"
                          value={street}
                          onChange={(e) =>
                            setStreet(([e.target.name] = e.target.value))
                          }
                          className="form-control"
                          placeholder="Lützowpl. 17"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row resume-contact-form">
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label>{t("Pin Code")}</label>
                    <input
                      type="zip"
                      id="zip"
                      name="pincode"
                      value={pincode}
                      onChange={(e) =>
                        setPincode(([e.target.name] = e.target.value))
                      }
                      className="form-control"
                      placeholder="z.B. 01067"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>{t("ort")}</label>
                    <input
                      type="text"
                      name="location"
                      value={location}
                      onChange={(e) =>
                        setLocation(([e.target.name] = e.target.value))
                      }
                      className="form-control"
                      placeholder="z.B. Berlin"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>{t("Phone")}</label>
                    <input
                      type="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) =>
                        setPhone(([e.target.name] = e.target.value))
                      }
                      className="form-control"
                      placeholder="z.B.  +49 30 901820"
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label>{t("Email")}</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      {...register("email", {
                        onChange: (e) => {
                          setEmail(e.target.value);
                        },
                      })}
                      className="form-control"
                      placeholder="z.B. mariaSCHAFER@example.com"
                    />
                    <small className="text-danger">
                      {errors.email?.message}
                    </small>
                  </div>
                </div>
                <div className="col-lg-12 pd-6 pt-3 pb-3">
                  <div className="d-flex align-items-center gap-1">
                    <button
                      className={
                        isActive
                          ? "toggle-btn-form switch mb-0 active"
                          : "toggle-btn-form switch mb-0 deactive"
                      }
                      onClick={handleClick1}
                    >
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </button>
                    <div>
                      <p className="semi-bold mb-0">
                        {" "}
                        Weitere Optionen Anzeigen
                      </p>
                      <p className="mb-0">
                        (Dinge Wie Führerschein, Familienstand, Soziale
                        Netzwerke)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  isActive
                    ? "row resume-contact-form show"
                    : "row resume-contact-form hide"
                }
              >
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label>FÜHRERSCHEIN</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Klasse B"
                      name="licence"
                      value={licence}
                      onChange={(e) =>
                        setLicence(([e.target.name] = e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label>FAMILIENSTAND</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ledig"
                      name="maritalStatus"
                      value={maritalStatus}
                      onChange={(e) =>
                        setMaritalStatus(([e.target.name] = e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label>SOZIALE NETZWERKE LINK</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Xing / Linkedin"
                      name="socialLink"
                      value={socialLink}
                      onChange={(e) =>
                        setSocialLink(([e.target.name] = e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5 ">
                <div className="col-sm-6 col-3 mleft-3">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    {t("Back")}{" "}
                  </button>
                </div>
                <div className="col-sm-6 col-9 text-right">
                  <button
                    onClick={() => {
                      handleSubmit(handleClick)();
                      setNewTrue(newTrue + 1);
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {localStorage.getItem("FinalResume") === "true"
                      ? `${t("SAVE AND NEXT")}`
                      : isStudent === "Yes" && (Expr === "0" || Expr === "0-3")
                      ? `${t("Further")}`
                      : `${t("Further")}`}{" "}
                  </button>
                  {/* <button
                onClick={handleSubmit(handleClick)}
                className="btn site-btn bg-blue text-white"
              >
                {localStorage.getItem('FinalResume') === 'true'
                  ? `${t('SAVE AND NEXT')}`
                  : isStudent === 'Yes' && (Expr === '0' || Expr === '0-3')
                  ? `${t('EDUCATION')}`
                  : `${t('NEXT : WORK HISTORY')}`}{' '}
              </button> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 custom-col-5">
              <ResumeContactPreview />
            </div>
          </div>
          {/* with image template */}

          {/* </form> */}
        </div>
      </section>
    </>
  );
};

export default ResumeContactStruture;
