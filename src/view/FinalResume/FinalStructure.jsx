import React, { useEffect, useRef, useState } from "react";
import ResumeSidebar from "./ResumeSidebar";
import { Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import FinalResumeTemplate from "./FinalResumeTemplate";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/PageLoader";
import { getTemplates } from "../../redux/features/fontSizeSlice";
import {
  addUser,
  handleFacebookLogin,
  handleGoogleLogin,
  loginUser,
} from "../../redux/features/resumeSlice";
import { changeTemplateColor } from "../../redux/features/colorSlice";
import TemplateIcon from "../../assets/template-icon.svg";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import ResumeSlider from "../../components/ResumeSlider";
import CustomFontSlider from "../../components/CustomFormatingSlide/CustomFontSlider";
import CustomHeadingSlider from "../../components/CustomFormatingSlide/CustomHeadingSlider";
import SectionSapcingSlider from "../../components/CustomFormatingSlide/SectionSapcingSlider";
import ParagraphSapcingSlider from "../../components/CustomFormatingSlide/ParagraphSapcingSlider";
import LineSapcingSlider from "../../components/CustomFormatingSlide/LineSapcingSlider";
import ParagraphIndentSlider from "../../components/CustomFormatingSlide/ParagraphIndentSlider";
import axios from "axios";
import { saveCustomStyle } from "../../redux/features/colorSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import {
  changeFontSize,
  changeHeadingSize,
  changeFontStyle,
  changeLineSpacing,
  changeSectionSpacing,
  changeParagraphSpacing,
  changeParagraphIndent,
} from "../../redux/features/fontSizeSlice";
import { toast } from "react-toastify";
import { saveLocalData } from "../../redux/features/localSlice";
import { useTranslation } from "react-i18next";
// import { PDFExport } from "@progress/kendo-react-pdf";
const schema = yup.object().shape({
  email: yup.string().email().required("E-Mail ist ein Pflichtfeld.").max(80),
  password: yup.string().required("Passwort ist ein Pflichtfeld."),
});
const schema1 = yup.object().shape({
  email1: yup.string().email().required("E-Mail ist ein Pflichtfeld.").max(80),
  password1: yup.string().required("Passwort ist ein Pflichtfeld."),
});

const FinalStructure = () => {
  const { t } = useTranslation();
  const [SearchParams] = useSearchParams();

  const [statefix, setStateFix] = useState(false);
  const resumepdfState = useSelector((store) => store.localResData.pdfState); //get login status
  const degreeObjectIndex = SearchParams.get("id");
  const [loader, setLoader] = useState(true);
  const resume_token = localStorage.getItem("resume_token");
  const loginDatas = useSelector((store) => store.resumeData); //get login status
  const loadingResponse = loginDatas?.loginData?.loading;
  const loginData = useSelector((store) => store.resumeData.loginData.data);
  const [state, setState] = useState("true");
  const pathname = window.location.pathname;
  const [hovercolor, setHoverColor] = useState("");
  const FinalResume = localStorage.getItem("FinalResume");
  const PDF = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (degreeObjectIndex) {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, [loader, degreeObjectIndex]);

  useEffect(() => {
    if (FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume, navigate]);

  const [colorSetting, setColorSetting] = useState("");

  const [
    // eslint-disable-next-line
    text,
    setText,
  ] = useState("Resume_Text");
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saveNext, setSaveNext] = useState(false);
  const [newmodalOpen, setnewModalOpen] = useState(false);
  const [forgotPasswordnewmodalOpen, forgotPasswordsetnewModalOpen] =
    useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [newemail, setnewEmail] = useState("");
  const [newPassword, setNewPassword] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  let [value, setValue] = useState("Normal");
  const resumeHeading = useSelector((store) => store.resumeData.heading.data);
  const [resumeName, setResumeName] = useState(
    resumeHeading?.fname + "_" + resumeHeading?.lname + "_Resume" || ""
  );

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(schema1),
  });
  const [style, setStyle] = useState("cont");
  const [resumeShow, setResumeShow] = useState(false);
  const [colorShow, setColorShow] = useState();
  // eslint-disable-next-line
  const [formatShow, setFormatShow] = useState(false);
  const [showCustomFormat, setShowCustomFormat] = useState(false);

  //color
  let finaltempcolor = localStorage.getItem("bGColor");
  if (finaltempcolor === null) {
    finaltempcolor = "var(--default-template)";
  }
  const [color, setColor] = useState({
    changeColor: finaltempcolor,
  });
  const colorFunction = (e) => {
    setColor({ ...color, [e.target.name]: e.target.value });
  };

  let font = localStorage.getItem("fontStyle");
  if (!font) {
    font = "Montserrat, sans-serif !important";
  }
  const [fontFamily, setFontFamily] = useState({
    fontfamily: font,
  });
  const fontFamilyFunction = (e) => {
    setFontFamily({ ...fontFamily, [e.target.name]: e.target.value });
    localStorage.setItem("customFlag", "true");
  };
  const templateColorState1 = useSelector(
    (store) => store.resumeData.template_id
  );

  useEffect(() => {
    // setFontStyle(fontFamily.fontfamily);
    dispatch(changeFontStyle(fontFamily.fontfamily));
    localStorage.setItem("fontStyleSave", fontFamily.fontfamily);
  }, [fontFamily.fontfamily, dispatch]);

  const [
    // eslint-disable-next-line
    example,
    setExample,
  ] = useState("");
  let props = {
    setExample: setExample,
    pdf: { PDF },
  };
  const [fontSize, setFontSize] = useState("");
  const [headingSize, setHeadingSize] = useState("");
  const [sectionSpacing, setSectionSpacing] = useState("");
  const [paragraphSpacing, setParagraphSpacing] = useState("");
  const [lineSpacing, setLineSpacing] = useState("");
  const [paragraphIndent, setParagraphIndent] = useState("");
  const onChangeFont = (val) => {
    setFontSize(val);
  };
  const onChangeHeadingSize = (val) => {
    setHeadingSize(val);
  };
  const onChangeSectionSpacing = (val) => {
    setSectionSpacing(val);
  };
  const onChangeParagraphSpacing = (val) => {
    setParagraphSpacing(val);
  };
  const onChangeLineSpacing = (val) => {
    setLineSpacing(val);
  };
  const onChangeParagraphIndent = (val) => {
    setParagraphIndent(val);
  };
  //page Formatting
  let [pageSize, setPageSize] = useState({
    titleFontSize: "",
    paragraphFontSize: "",
    headingFontSize: "",
    paragraphLineHeight: "",
    paragraphMarginLeft: "",
    paragraphMarginTop: "",
    paragraphMarginBottom: "",
  });
  const normalPageFunction = () => {
    setValue("Normal");
    localStorage.setItem("customFlag", "false");
    let title = document.getElementsByClassName("name-title");
    let paragraph = document.getElementsByClassName("paragraph");
    let heading = document.getElementsByClassName("resume-heading");
    for (let i = 0; i < title.length || i < paragraph.length; i++) {
      if (i < title.length) {
        title[i].style.fontSize = "41px";
      }
      if (i < paragraph.length) {
        paragraph[i].style.fontSize = "16px";
      }
    }

    for (let i = 0; i < heading.length; i++) {
      if (i < heading.length) {
        heading[i].style.fontSize = "22px";
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      if (i < paragraph.length) {
        paragraph[i].style.lineHeight = "24px";
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginLeft = "0px";
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginTop = "10px";
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginBottom = "10px";
    }
    setPageSize({
      titleFontSize: "40",
      paragraphFontSize: "11",
      headingFontSize: "18",
      paragraphLineHeight: "2",
      paragraphMarginLeft: "0.5",
      paragraphMarginTop: "0.5",
      paragraphMarginBottom: "0.5",
    });

    setState("false");
  };
  //if click on small
  const smallPageFunction = () => {
    setValue("Small");
    localStorage.setItem("customFlag", "false");
    let title = document.getElementsByClassName("name-title");
    let paragraph = document.getElementsByClassName("paragraph");
    let heading = document.getElementsByClassName("resume-heading");
    for (let i = 0; i < title.length || i < paragraph.length; i++) {
      if (i < title.length) {
        title[i].style.fontSize = "39px";
      }
      if (i < paragraph.length) {
        paragraph[i].style.fontSize = "14px";
      }
    }

    for (let i = 0; i < heading.length; i++) {
      if (i < heading.length) {
        heading[i].style.fontSize = "18px";
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      if (i < paragraph.length) {
        paragraph[i].style.lineHeight = "18px";
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginLeft = "0px";
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginTop = "10px";
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginBottom = "10px";
    }

    setPageSize({
      titleFontSize: "34",
      paragraphFontSize: "9",
      headingFontSize: "14",
      paragraphLineHeight: "-4",
      paragraphMarginLeft: "0.5",
      paragraphMarginTop: "0.5",
      paragraphMarginBottom: "0.5",
    });

    // localStorage.setItem('pageSize', JSON.stringify(pageSize));
    setState("false");
  };

  useEffect(() => {
    let payload = {
      backgroundColor: hovercolor,
      fontColor: "var(--white)",
      onMouseEnterBgClor: null,
      onMouseEnterFontColor: null,
    };
    dispatch(changeTemplateColor(payload));
  }, [dispatch, hovercolor]);
  //if click on large
  const largePageFunction = () => {
    setValue("Large");
    localStorage.setItem("customFlag", "false");
    let title = document.getElementsByClassName("name-title");
    let paragraph = document.getElementsByClassName("paragraph");
    let heading = document.getElementsByClassName("resume-heading");
    for (let i = 0; i < title.length || i < paragraph.length; i++) {
      if (i < title.length) {
        title[i].style.fontSize = "43px";
      }
      if (i < paragraph.length) {
        paragraph[i].style.fontSize = "18px";
      }
    }

    for (let i = 0; i < heading.length; i++) {
      if (i < heading.length) {
        heading[i].style.fontSize = "28px";
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      if (i < paragraph.length) {
        paragraph[i].style.lineHeight = "30px";
      }
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginLeft = "0px";
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginTop = "10px";
    }

    for (let i = 0; i < paragraph.length; i++) {
      paragraph[i].style.marginBottom = "10px";
    }
    setPageSize({
      titleFontSize: "50",
      paragraphFontSize: "13",
      headingFontSize: "24",
      paragraphLineHeight: "8",
      paragraphMarginLeft: "0.5",
      paragraphMarginTop: "0.5",
      paragraphMarginBottom: "0.5",
    });
    setState("false");
  };
  let templateId = useSelector((store) => store.resumeData.template_id);

  // Send local storage data to the server-
  const setResLocal = () => {
    const local = localStorage;
    const resume_strength = calculateStrength();
    localStorage.setItem("resume_strength", resume_strength);
    // console.log("RESUME STR ", resume_strength);
    const locObj = {};
    for (let key in local) {
      if (
        key !== "login_register_token" &&
        key !== "clear" &&
        key !== "removeItem" &&
        key !== "key" &&
        key !== "getItem" &&
        key !== "setItem" &&
        key !== "length" &&
        key !== "en_pth" &&
        key !== "name_stateTwo" &&
        key !== "name_stateOne"
      ) {
        if (
          key === "summaryArray" ||
          key === "extra_section_array" ||
          key === "skillsArr" ||
          key === "ext_name_arr" ||
          key === "CertiArr" ||
          key === "pageSize" ||
          key === "resume_meta_value_heading" ||
          key === "resume_meta_value_workexpr" ||
          key === "resume_meta_value_custom_sec_Two" ||
          key === "resume_meta_value_education" ||
          key === "resume_meta_value_custom_sec_One" ||
          key === "AccomplishArr" ||
          key === "AffilArr" ||
          key === "Languagefield" ||
          key === "Nativefield" ||
          key === "resume_meta_value_webLinks"
        ) {
          locObj[key] = JSON.parse(local[key]);
        } else {
          locObj[key] = local[key];
        }

        // console.log("LOC", locObj);
      }
    }
    dispatch(saveLocalData(locObj)).then((res) => {
      // console.log("dispatchkbad");
      for (let key in local) {
        if (key !== "login_register_token" && key !== "login_data") {
          // console.log("remove vala");

          local.removeItem(key);
        }
      }
    });
  };
  const addCustomStyle = () => {
    try {
      if (state === "true") {
        dispatch(
          saveCustomStyle({
            data: {
              fontSize: localStorage.getItem("customFontSizeSave") || "11",
              headingSize:
                localStorage.getItem("customHeadingSizeSave") || "18",
              sectionSpacing: localStorage.getItem("sectionSpacingSave") || "1",
              paragraphSpacing:
                localStorage.getItem("paragraphSpacingSave") || "0",
              lineSpacing: localStorage.getItem("lineSpacingSave") || "2",
              paragraphIndent:
                localStorage.getItem("paragraphIndentSizeSave") || "0",
              fontStyle:
                localStorage.getItem("fontStyleSave") ||
                "Montserrat, sans-serif !important",
              pageFontSize: {
                headingFontSize: null,
                paragraphFontSize: null,
                paragraphLineHeight: null,
                paragraphMarginBottom: null,
                paragraphMarginLeft: null,
                paragraphMarginTop: null,
                titleFontSize: null,
              },
            },
            id: templateId,
          })
        );
      } else {
        dispatch(
          saveCustomStyle({
            data: {
              fontSize: localStorage.getItem("customFontSizeSave") || "11",
              headingSize:
                localStorage.getItem("customHeadingSizeSave") || "18",
              sectionSpacing: localStorage.getItem("sectionSpacingSave") || "1",
              paragraphSpacing:
                localStorage.getItem("paragraphSpacingSave") || "0",
              lineSpacing: localStorage.getItem("lineSpacingSave") || "2",
              paragraphIndent: localStorage.getItem("FsaveSave") || "0",
              fontStyle:
                localStorage.getItem("fontStyleSave") ||
                "Montserrat, sans-serif !important",

              pageFontSize: JSON.parse(localStorage.getItem("pageSize")),
            },
            id: templateId,
          })
        );
      }
      if (localStorage.getItem("login_register_token")) {
        setResLocal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let finaltempcolors = localStorage.getItem("bGColor");
    if (finaltempcolors) {
      let payload = {
        backgroundColor: finaltempcolors,
        fontColor: "var(--white)",
        onMouseEnterBgClor: null,
        onMouseEnterFontColor: null,
      };
      dispatch(changeTemplateColor(payload));
      setColorSetting(payload.backgroundColor);
    } else {
      let payload = {
        backgroundColor: "var(--default-template)",
        fontColor: "var(--white)",
        onMouseEnterBgClor: null,
        onMouseEnterFontColor: null,
      };
      dispatch(changeTemplateColor(payload));
      setColorSetting("var(--white)");
    }
  }, [dispatch]);
  useEffect(() => {
    let payload = {
      backgroundColor: color.changeColor,
      fontColor: "var(--white)",
      onMouseEnterBgClor: null,
      onMouseEnterFontColor: null,
    };
    dispatch(changeTemplateColor(payload));

    if (color.changeColor === "var(--default-template)") {
      setColorSetting("var(--white)");
    } else {
      setColorSetting(color.changeColor);
    }
  }, [dispatch, color.changeColor]);

  useEffect(() => {
    // eslint-disable-next-line
    {
      dispatch(getTemplates(templateColorState1))
        .then((res) => {
          // console.log("res", res);
          let paragraphMarginBottom =
            res.payload.resume_style.pageFontSize.paragraphMarginBottom;
          let paragraphFontSize =
            res.payload.resume_style.pageFontSize.paragraphFontSize;
          let headingFontSize =
            res.payload.resume_style.pageFontSize.headingFontSize;
          let paragraphLineHeight =
            res.payload.resume_style.pageFontSize.paragraphLineHeight;
          let paragraphMarginLeft =
            res.payload.resume_style.pageFontSize.paragraphMarginLeft;
          let paragraphMarginTop =
            res.payload.resume_style.pageFontSize.paragraphMarginTop;
          //fixing fontSize
          let fontSize = res.payload.resume_style.fontSize;
          let sectionSpacing = res.payload.resume_style.sectionSpacing;
          let headingSize = res.payload.resume_style.headingSize;
          let lineSpacing = res.payload.resume_style.lineSpacing;
          let paragraphIndent = res.payload.resume_style.paragraphIndent;
          let paragraphSpacing = res.payload.resume_style.paragraphSpacing;
          if (paragraphMarginBottom) {
            dispatch(changeSectionSpacing(paragraphMarginBottom));
            dispatch(changeFontSize(paragraphFontSize));
            dispatch(changeHeadingSize(headingFontSize));
            dispatch(changeLineSpacing(paragraphLineHeight));
            dispatch(changeParagraphIndent(paragraphMarginLeft));
            dispatch(changeParagraphSpacing(paragraphMarginTop));
            dispatch(changeFontStyle("Montserrat, sans-serif !important"));
            setFontSize(fontSize);
            setHeadingSize(headingSize);
            setSectionSpacing(sectionSpacing);
            setParagraphSpacing(paragraphSpacing);
            setLineSpacing(lineSpacing);
            setParagraphIndent(paragraphIndent);
            setFontFamily({ ...fontFamily, fontfamily: "Montserrat" });

            if (headingFontSize === "24") {
              setValue("Large");
            }
            if (headingFontSize === "18") {
              setValue("Normal");
            }
            if (headingFontSize === "14") {
              setValue("Small");
            }
          } else {
            let sectionSpacing = res.payload.resume_style.sectionSpacing;
            let headingSize = res.payload.resume_style.headingSize;
            let lineSpacing = res.payload.resume_style.lineSpacing;
            let paragraphIndent = res.payload.resume_style.paragraphIndent;
            let paragraphSpacing = res.payload.resume_style.paragraphSpacing;
            let fontSize = res.payload.resume_style.fontSize;
            let fontStyleSave = res.payload.resume_style.fontStyle;
            dispatch(changeSectionSpacing(sectionSpacing));
            dispatch(changeFontSize(fontSize));
            dispatch(changeLineSpacing(lineSpacing));
            dispatch(changeHeadingSize(headingSize));
            dispatch(changeParagraphIndent(paragraphIndent));
            dispatch(changeParagraphSpacing(paragraphSpacing));
            dispatch(changeFontStyle(fontStyleSave));

            setFontSize(fontSize);
            setHeadingSize(headingSize);
            setSectionSpacing(sectionSpacing);
            setParagraphSpacing(paragraphSpacing);
            setLineSpacing(lineSpacing);
            setParagraphIndent(paragraphIndent);
            setFontFamily({ ...fontFamily, fontfamily: fontStyleSave });
          }
        })
        .catch((err) => {
          let fontStyle =
            localStorage.getItem("fontStyle") ||
            "Montserrat, sans-serif !important";
          let customFontSize = localStorage.getItem("customFontSize") || "11";
          let customHeadingSize =
            localStorage.getItem("customHeadingSize") || "18";
          let paragraphIndentSize =
            localStorage.getItem("paragraphIndentSize") || "0";
          let paragraphSpacing =
            localStorage.getItem("paragraphSpacing") || "0";
          let lineSpacing = localStorage.getItem("lineSpacing") || "2";
          let sectionSpacing = localStorage.getItem("sectionSpacing") || "1";
          dispatch(changeSectionSpacing(sectionSpacing));
          dispatch(changeFontSize(customFontSize));
          dispatch(changeLineSpacing(lineSpacing));
          dispatch(changeHeadingSize(customHeadingSize));
          dispatch(changeParagraphIndent(paragraphIndentSize));
          dispatch(changeParagraphSpacing(paragraphSpacing));
          dispatch(changeFontStyle(fontStyle));

          setFontSize(customFontSize);
          setHeadingSize(customHeadingSize);
          setSectionSpacing(sectionSpacing);
          setParagraphSpacing(paragraphSpacing);
          setLineSpacing(lineSpacing);
          setParagraphIndent(paragraphIndentSize);
          setFontFamily({ ...fontFamily, fontfamily: fontStyle });
        });
    }
    // eslint-disable-next-line
  }, [dispatch, loader, degreeObjectIndex]);

  //////////////// Forgot password ///////////////////
  const handleSubmits = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgot-password`,
        { email: newemail }
      );
      if (res.data.status === 200) {
        setValidEmail(true);
      } else {
        alert("email not exist");
      }

      setLoading(false);
    } catch (res) {
      console.log(res, "err");
      setLoading(false);
    }
  };

  ////////////////////// reset password //////////////////////////////
  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (newPassword.password !== newPassword.confirmPassword) {
        toast.error("confirm password doesn't match");
        return;
      } else {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/reset-password`, {
            password: newPassword.password,
            code: newPassword.code,
          })
          .then((res) => {
            setLoading(false);
            // toast.success("Password changed successfully");
            // navigate("/");
          });
      }
    } catch (err) {
      setLoading(false);
      return err;

      // if (err.response) {
      //   toast.error(err.response.data.error);
      // }
    }
  };

  const handleChange = (e) => {
    setnewEmail(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  ///////////////////////////Register USer////////////////////////////////////////////////
  const name = JSON.parse(localStorage.getItem("resume_meta_value_heading"));

  const facebookClick = () => {
    console.log("clicked");
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const calculateStrength = () => {
    const headStr = localStorage.getItem("strHead");
    const workStr = localStorage.getItem("strWork");
    const eduStr = localStorage.getItem("strEdu");
    const skillStr = localStorage.getItem("skiStr");
    const summStr = localStorage.getItem("summStr");

    const resume_strength =
      parseInt(headStr) +
      parseInt(workStr) +
      parseInt(eduStr) +
      parseInt(skillStr) +
      parseInt(summStr);
    return resume_strength;
  };

  ///////////////////////////////////////////////////////////////////////////////////

  //register user

  const registerUser = () => {
    dispatch(
      addUser({
        first_name: name.fname,
        last_name: name.lname,
        email: Email,
        password: Password,
      })
    )
      .then((res) => {
        if (res?.payload?.message) {
          toast.success(res.payload.message);
          if (saveNext) {
            setResLocal();
            navigate("/payment");
          } else {
            setModalOpen(!modalOpen);
          }
        } else if (res?.payload?.error?.email[0]) {
          toast.error(res.payload.error.email[0]);
        }
      })
      .catch((e) => {
        return e;
      });
  };
  //login user
  const login = async () => {
    await dispatch(
      loginUser({
        email: loginEmail,
        password: loginPassword,
      })
    )
      .then((res) => {
        if (res?.payload?.status === 200) {
          toast.success("Login Successfully");
          if (saveNext) {
            setResLocal();
            if (res?.payload?.subscription_status !== 1) {
              navigate("/payment");
            } else {
              navigate("/customer");
            }
          } else {
            setnewModalOpen(!newmodalOpen);
          }
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFailure = async (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
    dispatch(handleGoogleLogin(googleData)).then((res) => {
      // console.log(res);
      if (res?.payload?.status === 200) {
        toast.success("Login Successfully");

        if (saveNext) {
          setResLocal();
          if (res?.payload?.subscription_status !== 1) {
            navigate("/payment");
          } else {
            navigate("/customer");
          }
        } else {
          setModalOpen(!modalOpen);
        }
      } else {
        toast.error("Invalid Credentials");
      }
    });
  };

  const facebookLogin = (response) => {
    dispatch(handleFacebookLogin(response)).then((res) => {
      if (res?.payload?.status === 200) {
        toast.success("Login Successfully");

        if (saveNext) {
          setResLocal();
          if (res?.payload?.subscription_status !== 1) {
            navigate("/payment");
          } else {
            navigate("/customer");
          }
        } else {
          setModalOpen(!modalOpen);
        }
      } else {
        toast.error("Invalid Credentials");
      }
    });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ["profile", "email"],
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handle = (e) => {
    setText(e.target.value);
  };
  //apply useEffect when value changes
  useEffect(() => {
    if (localStorage.getItem("resume_token")) {
      localStorage.setItem("FinalResume", true);
      localStorage.setItem("Resume_Name", resumeName);
      localStorage.setItem("bGColor", color.changeColor);
      localStorage.setItem("pageSize", JSON.stringify(pageSize));
    }
  }, [value, pageSize, color.changeColor, resumeName]);
  const printableDivRef = useRef(null);

  const handlePrint = () => {
    let printContents = printableDivRef?.current?.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  const handleAfterPrint = () => {
    window.location.replace(`/final-resume?id=${resume_token}`); // Reload the window after printing
  };

  if (typeof window !== "undefined") {
    window.onafterprint = handleAfterPrint; // Set the onafterprint event handler
  }

  useEffect(() => {
    if (resumepdfState === true) {
      setTimeout(() => {
        handlePrint();
      }, 6000);
    }
  }, [resumepdfState]);

  return (
    <>
      {loader ? (
        <>
          <div className="loader-box">
            <PageLoader />
          </div>
        </>
      ) : (
        <>
          {/* <button onClick={setResLocal}>DAta</button> */}
          <section
            className="choose-template-section resume-contact-section final-resume-container bg-green"
            onClick={() => {
              setShowCustomFormat(false);
              setResumeShow(false);
              setFormatShow(false);
              setColorShow(false);
            }}
          >
            <div className="container pt-5 text-white">
              <div className="row">
                <div className="col-lg-9 mpd-5">
                  {/* <ResumeMainContent ref={componentref} /> */}
                  <div className="main-resume dummu">
                    <div className="top-bar">
                      <div className="editable-text-box">
                        <span>
                          {hide && (
                            <>
                              <i className="mr-1 fa fa-pencil "></i>[
                              <span
                                className="cursor-pointer editable-text"
                                onClick={() => {
                                  setShow(!show);
                                  setHide(!hide);
                                }}
                              >
                                &nbsp;{localStorage.getItem("Resume_Name")}
                                &nbsp;
                              </span>
                              ]
                            </>
                          )}
                          {show && (
                            <div className="edit-baox">
                              <input
                                className="change-editable-text"
                                onClick={handle}
                                name="resume_name"
                                placeholder="Example_Resume"
                                value={resumeName}
                                onChange={(e) => setResumeName(e.target.value)}
                              ></input>
                              <button
                                className="ml-2 check-btn"
                                onClick={() => {
                                  setShow(!show);
                                  setHide(!hide);
                                }}
                              >
                                <i className="fa fa-check" aria-hidden="true" />
                              </button>
                              <Link
                                to=""
                                className="ml-2 uppercase f-14"
                                onClick={() => {
                                  setShow(!show);
                                  setHide(!hide);
                                }}
                              >
                                {t("CANCEL")}
                              </Link>
                            </div>
                          )}
                        </span>
                      </div>

                      {loginData?.token ? (
                        ""
                      ) : (
                        <div className="more-opt">
                          <span
                            className="text-decoration cursor-pointer"
                            // style={{ color: "var(--blue)" }}
                            onClick={() => {
                              setSaveNext(false);
                              setModalOpen(!modalOpen);
                            }}
                          >
                            {t("More Options")}
                            <i
                              className="ml-2 fa fa-chevron-down"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="final-resume-box mt-4">
                      <div className={style} id="input">
                        {/* <PDFExport
                          ref={PDF}
                          paperSize="A4"
                          margin="0.5cm"
                          fileName={`${example}`}
                          keepTogether="div p h"
                          scale={0.5}
                        > */}
                        <div id="printablediv" ref={printableDivRef}>
                          <FinalResumeTemplate
                            setStateFix={setStateFix}
                            statefix={statefix}
                          />
                        </div>
                        {/* </PDFExport> */}
                      </div>
                    </div>
                  </div>
                  {/* more-option modal */}
                  <Modal
                    toggle={() => setModalOpen(!modalOpen)}
                    isOpen={modalOpen}
                    className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
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
                        <div className="row">
                          <div className="col-sm-12">
                            <h2 className="modal-title h4 mb-3 text-center">
                              {t("Create an account to get your resume")}
                            </h2>
                            <div className="social-wrapper">
                              <div
                                className="btn-social"
                                style={{ padding: "0px" }}
                              >
                                <span className="mr-3">
                                  <FacebookLogin
                                    appId="776337413544959"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    scope="public_profile,user_friends,email"
                                    onClick={facebookClick}
                                    callback={facebookLogin}
                                    icon="fa-facebook"
                                  />
                                </span>
                              </div>
                              <div
                                className="btn-social"
                                style={{ padding: "0px" }}
                              >
                                <span className="mr-3">
                                  <GoogleLogin
                                    className="kep-login-google metro"
                                    clientId={
                                      process.env.REACT_APP_GOOGLE_CLIENT_ID
                                    }
                                    buttonText={t("Log In with google")}
                                    onSuccess={handleLogin}
                                    // onFailure={handleFailure}
                                    cookiePolicy={"single_host_origin"}
                                  ></GoogleLogin>
                                </span>
                              </div>
                            </div>
                            <p className="optional-or ">
                              <span>{t("OR")}</span>
                            </p>
                            <form
                              onSubmit={handleSubmit1(registerUser)}
                              className="f-14 social-connect-form"
                            >
                              <div className="form-group">
                                <label className="">Email</label>
                                <input
                                  name="Email"
                                  type="text"
                                  className="form-control"
                                  placeholder="test@mailinator.com"
                                  value={Email}
                                  {...register1("email1", {
                                    onChange: (e) => {
                                      setEmail(e.target.value);
                                    },
                                  })}
                                />
                                <small className="text-danger">
                                  {errors1.email1?.message}
                                </small>
                              </div>
                              <div className="form-group">
                                <label className="">Password</label>
                                <input
                                  name="Password"
                                  type="password"
                                  className="form-control"
                                  placeholder=""
                                  value={Password}
                                  {...register1("password1", {
                                    onChange: (e) => {
                                      setPassword(e.target.value);
                                    },
                                  })}
                                />
                                <small className="text-danger">
                                  {errors1.password1?.message}
                                </small>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 mb-3">
                                  <button
                                    className="d-block btn site-btn bg-blue text-white"
                                    type="submit"
                                    value="Submit"
                                  >
                                    {/* <Link
                                onClick={() => {
                                  registerUser();
                                  // setModalOpen(!modalOpen);
                                }}
                                to="/customer"
                                className="d-block btn site-btn bg-blue text-white"
                              > */}
                                    {t("SAVE & NEXT")}
                                  </button>
                                  {/* </Link> */}
                                </div>
                                <div className="col-sm-12 mb-4">
                                  <span
                                    to=""
                                    className="d-block text-center  cursor-pointer"
                                    //  className="text-decoration cursor-pointer"
                                    style={{ color: "var(--blue)" }}
                                    onClick={() => {
                                      setnewModalOpen(!newmodalOpen);
                                      setModalOpen(!modalOpen);
                                    }}
                                  >
                                    {t("Already have an account?")}
                                  </span>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>

                  {/*login modal*/}
                  <Modal
                    toggle={() => setnewModalOpen(!newmodalOpen)}
                    isOpen={newmodalOpen}
                    className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
                  >
                    <div className="pb-2 pb-4">
                      <span
                        aria-hidden={true}
                        onClick={() => {
                          setnewModalOpen(!newmodalOpen);
                        }}
                        className="cursor-pointer close-btn"
                      >
                        <span className="close">&times;</span>
                      </span>
                    </div>
                    <div className="modal-content ">
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-sm-12">
                            <h2 className="modal-title h4 mb-3 text-center">
                              {t("Log in your account")}
                            </h2>
                            <div className="social-wrapper">
                              <div
                                className="btn-social"
                                style={{ padding: "0px" }}
                              >
                                <span className="mr-3">
                                  <FacebookLogin
                                    appId="776337413544959"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    scope="public_profile,user_friends,email"
                                    onClick={facebookClick}
                                    callback={facebookLogin}
                                    icon="fa-facebook"
                                  />
                                </span>
                              </div>

                              <div
                                className="btn-social"
                                style={{ padding: "0px" }}
                              >
                                <span className="mr-3">
                                  <GoogleLogin
                                    className="kep-login-google metro"
                                    clientId={
                                      process.env.REACT_APP_GOOGLE_CLIENT_ID
                                    }
                                    buttonText={t("Log In with google")}
                                    onSuccess={handleLogin}
                                    onFailure={handleFailure}
                                    cookiePolicy={"single_host_origin"}
                                  ></GoogleLogin>
                                </span>
                              </div>
                            </div>
                            <p className="optional-or ">
                              <span>{t("OR")}</span>
                            </p>
                            <form
                              onSubmit={handleSubmit(login)}
                              className="f-14 social-connect-form"
                            >
                              <div className="form-group">
                                <label className="">Email</label>
                                <input
                                  name="loginEmail"
                                  type="text"
                                  className="form-control"
                                  placeholder="test@mailinator.com"
                                  value={loginEmail}
                                  {...register("email", {
                                    onChange: (e) => {
                                      setloginEmail(e.target.value);
                                    },
                                  })}
                                />
                                <small className="text-danger">
                                  {errors.email?.message}
                                </small>
                              </div>
                              <div className="form-group">
                                <label className="">Password</label>
                                <input
                                  name="loginPassword"
                                  type="password"
                                  className="form-control"
                                  placeholder=""
                                  value={loginPassword}
                                  {...register("password", {
                                    onChange: (e) => {
                                      setloginPassword(e.target.value);
                                    },
                                  })}
                                />
                                <small className="text-danger">
                                  {errors?.password?.message}
                                  {/* {errorMessage && (
                                <div className="error"> {errorMessage} </div>
                              )} */}
                                </small>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 mb-3">
                                  {loadingResponse ? (
                                    <Spinner
                                      animation="border"
                                      variant="warning"
                                    />
                                  ) : (
                                    <button
                                      className="d-block btn site-btn bg-blue text-white"
                                      type="submit"
                                      value="Submit"
                                    >
                                      {t("LOGIN")}
                                    </button>
                                  )}
                                </div>
                                <div className="col-sm-12 mb-4">
                                  <span
                                    to=""
                                    className="d-block text-center  cursor-pointer"
                                    style={{ color: "var(--blue)" }}
                                    onClick={() => {
                                      setModalOpen(!modalOpen);
                                      setnewModalOpen(!newmodalOpen);
                                    }}
                                  >
                                    {t("Not registered?")}
                                  </span>
                                  <span
                                    to=""
                                    className="d-block text-center  cursor-pointer"
                                    style={{ color: "var(--blue)" }}
                                    onClick={() => {
                                      forgotPasswordsetnewModalOpen(!modalOpen);
                                      setnewModalOpen(!newmodalOpen);
                                    }}
                                  >
                                    {t("Forgot Password")}
                                  </span>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                  {/* Forgot Password */}
                  <Modal
                    toggle={() => forgotPasswordsetnewModalOpen(!newmodalOpen)}
                    isOpen={forgotPasswordnewmodalOpen}
                    className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
                  >
                    <div className="pb-2 pb-4">
                      <span
                        aria-hidden={true}
                        onClick={() => {
                          forgotPasswordsetnewModalOpen(
                            !forgotPasswordnewmodalOpen
                          );
                        }}
                        className="cursor-pointer close-btn"
                      >
                        <span className="close">&times;</span>
                      </span>
                    </div>
                    <div className="modal-content ">
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-sm-12">
                            <h2 className="modal-title h4 mb-3 text-center">
                              Enter Email
                            </h2>
                            <section className="pb-5">
                              <div className="container mt-5 pd-bottom">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <Card className="">
                                      <h4 className="mb-0 text-white p-2 bg-blue">
                                        {t("Forgot Password")}?
                                      </h4>
                                      <Card.Body>
                                        <Card.Text>
                                          {!validEmail ? (
                                            <>
                                              <label>
                                                {t("Enter Valid Email")}
                                              </label>
                                              <Form onSubmit={handleSubmits}>
                                                <Form.Group
                                                  className="mb-3"
                                                  controlId="exampleForm.ControlInput1"
                                                >
                                                  <Form.Control
                                                    name="newemail"
                                                    value={newemail}
                                                    onChange={handleChange}
                                                    type="email"
                                                    placeholder="Enter Email"
                                                  />
                                                </Form.Group>
                                                {loading ? (
                                                  <Spinner
                                                    animation="border"
                                                    variant="warning"
                                                  />
                                                ) : (
                                                  <Button
                                                    type="submit"
                                                    variant="primary"
                                                  >
                                                    {t("Submit")}
                                                  </Button>
                                                )}
                                              </Form>
                                            </>
                                          ) : (
                                            <>
                                              <h2>{t("Reset Password")}</h2>
                                              <p>
                                                {t(
                                                  "Please enter the OTP we've sent you on your registered email address for resetting your password."
                                                )}
                                              </p>
                                              <Form
                                                onSubmit={handleResetPassword}
                                              >
                                                <Form.Group
                                                  className="mb-3"
                                                  controlId="exampleForm.ControlInput1"
                                                >
                                                  <Form.Label>
                                                    {/* OTP */}
                                                  </Form.Label>
                                                  <Form.Control
                                                    name="code"
                                                    value={newPassword.code}
                                                    onChange={handleNewPassword}
                                                    type="text"
                                                    placeholder="Enter code"
                                                  />

                                                  <Form.Label>
                                                    {/* New Password */}
                                                  </Form.Label>
                                                  <Form.Control
                                                    name="password"
                                                    value={newPassword.password}
                                                    onChange={handleNewPassword}
                                                    type="text"
                                                    placeholder="Enter New Password"
                                                  />

                                                  <Form.Label>
                                                    {/* Confirm Password */}
                                                  </Form.Label>
                                                  <Form.Control
                                                    name="confirmPassword"
                                                    value={
                                                      newPassword.confirmPassword
                                                    }
                                                    onChange={handleNewPassword}
                                                    type="text"
                                                    placeholder="Enter Confirm Password"
                                                  />
                                                </Form.Group>

                                                {loading ? (
                                                  <Spinner
                                                    animation="border"
                                                    variant="warning"
                                                  />
                                                ) : (
                                                  <Button
                                                    type="submit"
                                                    variant="primary"
                                                  >
                                                    {t("Submit")}
                                                  </Button>
                                                )}
                                              </Form>
                                            </>
                                          )}
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div className="col-lg-3 col-md-3">
                  <ResumeSidebar
                    {...props}
                    resumeName={resumeName}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setnewModalOpen={setnewModalOpen}
                    newmodalOpen={newmodalOpen}
                    setSaveNext={setSaveNext}
                    setStateFix={setStateFix}
                    statefix={statefix}
                    // setPdfState={setPdfState}
                  />
                </div>
              </div>
            </div>
          </section>
          {/* footer-toolbar */}
          {/* footer-toolbar */}

          <div className="bottom-fix-toolbar csutom-format-box">
            <div className="container">
              <div className="custom-row">
                <div className="custom-left-sec">
                  <div className="custom-col template">
                    <div
                      className={
                        resumeShow
                          ? "drop-down-template pdc resume-icon-box"
                          : "drop-down-template pdc "
                      }
                      onClick={() => {
                        setResumeShow(!resumeShow);
                        setShowCustomFormat(false);
                        setFormatShow(false);
                        setColorShow(false);
                      }}
                    >
                      <p className="mb-1 bold">VORLAGE</p>
                      <p className="img-icon template-icon mb-0">
                        <img src={TemplateIcon} alt="" />
                      </p>
                      {/* <span className="mob-hide">
                        {localStorage.getItem("templateId")}
                        <i
                          className="ml-2 fa fa-chevron-down"
                          aria-hidden="true"
                        ></i>
                      </span> */}
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    {colorShow && (
                      <div className="formating-box color-formatting">
                        <ul className="inline-block resume-color-list">
                          <li className="color-item ">
                            <label className="color-selector root-color">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--default-template)"
                                onClick={colorFunction}
                              />
                              <span
                                className="color-selector-radio"
                                style={{ backgroundColor: "var(--rootcolor)" }}
                                onClick={colorFunction}
                                onMouseEnter={() => {
                                  setHoverColor("var(--default-template)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--default-template)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--dark-green)"
                                onClick={colorFunction}
                              />
                              <span
                                className="color-selector-radio root-color"
                                style={{
                                  backgroundColor: "var(--dark-green)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--dark-green)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--dark-green)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--essential-ecru)"
                                onClick={colorFunction}
                              />

                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--essential-ecru)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--essential-ecru)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--essential-ecru)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--clever-blue)"
                                onClick={colorFunction}
                              />

                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--clever-blue)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--clever-blue)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--clever-blue)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--quality-azure)"
                                onClick={colorFunction}
                              />

                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--quality-azure)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--quality-azure)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--quality-azure)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--delight-mint)"
                                onClick={colorFunction}
                              />
                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--delight-mint)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--delight-mint)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--delight-mint)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--standout-ruby)"
                                onClick={colorFunction}
                              />
                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--standout-ruby)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--standout-ruby)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--standout-ruby)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--savvy-salmon)"
                                onClick={colorFunction}
                              />
                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--savvy-salmon)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--savvy-salmon)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--savvy-salmon)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </label>
                          </li>
                          <li className="color-item">
                            <label className="color-selector">
                              <input
                                className="color-input"
                                type="radio"
                                name="changeColor"
                                value="var(--optimistic-amber)"
                                onClick={colorFunction}
                              />
                              <span
                                className="color-selector-radio"
                                style={{
                                  backgroundColor: "var(--optimistic-amber)",
                                }}
                                onMouseEnter={() => {
                                  setHoverColor("var(--optimistic-amber)");
                                }}
                              >
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                  onMouseEnter={() => {
                                    setHoverColor("var(--optimistic-amber)");
                                  }}
                                  onMouseOut={() => {
                                    setHoverColor(color.changeColor);
                                  }}
                                ></i>
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="custom-col color">
                    <div
                      className="drop-down-template"
                      onClick={() => {
                        //  setShowCustomFormat(!showCustomFormat);
                        setColorShow(!colorShow);
                        setShowCustomFormat(false);
                        // setResumeShow(false);
                        setFormatShow(false);
                      }}
                    >
                      <p className="mb-1 bold">
                        FARBE <span className="more-color-dropdown"></span>
                      </p>

                      <span className="mob-hide">
                        <label className=" color-selector root-color mb-0">
                          <span
                            className="selectedColor color-selector-radio"
                            style={{
                              backgroundColor: colorSetting,
                              border: `2px solid ${colorSetting}`,
                            }}
                          ></span>
                        </label>
                      </span>
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <div className="formating-box"></div>
                    <div className="custom-col formate">
                      <div
                        className="drop-down-template pdc format-section"
                        // onClick={() => {
                        //    setShowCustomFormat(!showCustomFormat);
                        //   setFormatShow(!formatShow);
                        //   setShowCustomFormat(false);
                        //   setResumeShow(false);
                        //   setColorShow(false);
                        // }}
                      >
                        <p className="mb-1 bold">
                          <span>{t("FORMATTING")}</span>&nbsp;
                          <span className="mob-hide">
                            {t(value)}

                            <i
                              className="ml-2 fa fa-chevron-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </p>

                        <div className="formating-box-inner">
                          <div
                            className="format-sm cursor-pointer"
                            onClick={() => {
                              smallPageFunction();
                              setStyle("smallfont");
                              setValue("Small");
                            }}
                          >
                            <i className=" fa fa-bars" aria-hidden="true" />
                            <br />
                            {t("Small")}
                          </div>
                          <div
                            className="format-normal cursor-pointer"
                            onClick={() => {
                              normalPageFunction();
                              setStyle("normalfont");
                              setValue("Normal");
                            }}
                          >
                            <i className=" fa fa-bars" aria-hidden="true" />
                            <br />
                            Normal
                          </div>
                          <div
                            className="format-large cursor-pointer"
                            onClick={() => {
                              largePageFunction();
                              setStyle("largefont");
                              setValue("Large");
                            }}
                          >
                            <i className=" fa fa-bars" aria-hidden="true" />
                            <br />
                            {t("Large")}
                          </div>

                          <div
                            className="format-custom cursor-pointer"
                            onClick={() => {
                              setShowCustomFormat(!showCustomFormat);

                              // setFormatShow(!formatShow);
                              setValue("Custom");
                            }}
                          >
                            <i className=" fa fa-cogs" aria-hidden="true" />
                            <br />
                            {t("Custom")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="custom-right-sec">
                  <div className="custom-col next-btn">
                    <div className="text-right">
                      <button
                        className="btn site-btn bg-blue text-white"
                        onClick={() => {
                          addCustomStyle();
                          setSaveNext(true);

                          loginData?.token
                            ? navigate("/customer")
                            : setModalOpen(!modalOpen);
                        }}
                      >
                        {t("SAVE & NEXT")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              resumeShow
                ? "resume-slide-box scroll-resume-box active"
                : "resume-slide-box scroll-resume-box "
            }
          >
            <p className="text-right pr-2">
              <span
                className="dropdown-close cursor-pointer"
                onClick={() => setResumeShow(!resumeShow)}
              >
                {t("CLOSE")}
                <i className="fa fa-times ml-1"></i>
              </span>
            </p>
            <ResumeSlider />
          </div>
          <div
            className={
              showCustomFormat
                ? "resume-slide-box  active"
                : "  resume-slide-box "
            }
          >
            <p className="text-right pr-2">
              <span
                className="dropdown-close cursor-pointer"
                onClick={() => {
                  setShowCustomFormat(!showCustomFormat);
                  // setHideFormat(!hideFormat);
                }}
              >
                {t("CLOSE")}
                <i className="fa fa-times ml-1"></i>
              </span>
            </p>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">{t("Font Size")}</div>
                    </div>
                    <div className="col-lg-12">
                      <CustomFontSlider
                        onChange={onChangeFont}
                        state={state}
                        fontSize={fontSize}
                        setState={setState}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">{t("Heading Size")}</div>
                    </div>
                    <div className="col-lg-12">
                      <CustomHeadingSlider
                        onChange={onChangeHeadingSize}
                        state={state}
                        headingSize={headingSize}
                        setState={setState}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">{t("Section Spacing")}</div>
                    </div>
                    <div className="col-lg-12">
                      <SectionSapcingSlider
                        onChange={onChangeSectionSpacing}
                        state={state}
                        sectionSpacing={sectionSpacing}
                        setState={setState}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">
                        {t("Paragraph Spacing")}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <ParagraphSapcingSlider
                        onChange={onChangeParagraphSpacing}
                        state={state}
                        setState={setState}
                        paragraphSpacing={paragraphSpacing}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">{t("Line Spacing")}</div>
                    </div>
                    <div className="col-lg-12">
                      <LineSapcingSlider
                        onChange={onChangeLineSpacing}
                        state={state}
                        lineSpacing={lineSpacing}
                        setState={setState}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">{t("Font Style")}</div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-0">
                        <select
                          className="form-control"
                          name="fontfamily"
                          value={fontFamily.fontfamily}
                          onChange={fontFamilyFunction}
                          id="font-family-selection"
                        >
                          <option
                            name="fontfamily"
                            value="Montserrat"
                            onChange={fontFamilyFunction}
                          >
                            Montserrat
                          </option>
                          <option
                            name="fontfamily"
                            value="Times New Roman"
                            onChange={fontFamilyFunction}
                          >
                            Times New Roman
                          </option>
                          <option
                            name="fontfamily"
                            value="Source Sans Pro"
                            onChange={fontFamilyFunction}
                          >
                            Source Sans Pro
                          </option>
                          <option
                            name="fontfamily"
                            value="Nunito sans"
                            onChange={fontFamilyFunction}
                          >
                            Nunito sans-serif
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="slider-title">
                        {t("Paragraph Indent")}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <ParagraphIndentSlider
                        onChange={onChangeParagraphIndent}
                        paragraphIndent={paragraphIndent}
                        state={state}
                        setState={setState}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FinalStructure;
