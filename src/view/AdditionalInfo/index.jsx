import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PageHeading from "../../components/PageHeading";
import PageSubHeading from "../../components/PageSubHeading";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Button } from "reactstrap";
import {
  addAdditionalInfo,
  deleteAdditionalInfo,
  editAdditionalInfo,
} from "../../redux/features/additionalInfoSlice";
import { arrExtSec } from "../../redux/features/extraSectionSlice";
import { useTranslation } from "react-i18next";
// import PreviewTips from "../../components/PreviewTips";
import ResumeContactPreview from "../../components/ResumeContactPreview";
const AdditionalInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const FinalResume = localStorage.getItem("FinalResume");
  const pathname = location.pathname;
  const [description, setDescription] = useState("");

  const [checkDesc, setCheckDesc] = useState(true);
  const skills = localStorage.getItem("resume_meta_value_additionalInfo");

  // const inputRef = useRef();
  // const [show, setShow] = useState(false);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const addInfoResData = useSelector(
    (store) => store.additionalInfoData.additionalInfoResData
  );
  const additionalInfo = localStorage.getItem(
    "resume_meta_value_additionalInfo"
  );
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const setDescriptionData = () => {
    if (additionalInfo) {
      setDescription(additionalInfo);
    }
  };

  const handleME = () => {
    if (!description?.length && skills === null && checkDesc) {
      setDescription("<ul><li></li></ul>");
      setCheckDesc(false);
    }
  };

  const handleCkEditor = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  useEffect(() => {
    setDescriptionData();

    // eslint-disable-next-line
  }, []);

  const handlePath = () => {
    const nameArr = JSON.parse(localStorage.getItem("ext_name_arr"));
    const filterName = nameArr.filter(
      (ele) => ele !== "Additional-Information"
    );

    handleClose();
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
    if (additionalInfo === null && description !== "") {
      if (FinalResume) {
        dispatch(addAdditionalInfo({ data: description }));
        dispatch(arrExtSec(filterName));
        navigate("/final-resume");
      } else {
        dispatch(addAdditionalInfo({ data: description }));
        dispatch(arrExtSec(filterName));
        navigate(route);
      }
    } else if (additionalInfo !== null && description !== "") {
      dispatch(
        editAdditionalInfo({
          data: description,
          id: addInfoResData?.id || localStorage.getItem("additionalInfoId"),
        })
      );
      dispatch(arrExtSec(filterName));
      navigate("/final-resume");
    } else if (description === "") {
      if (additionalInfo !== null) {
        dispatch(deleteAdditionalInfo(addInfoResData.id));
        dispatch(arrExtSec(filterName));
        navigate("/final-resume");
      } else {
        dispatch(arrExtSec(filterName));
        navigate("/final-resume");
      }
    }
  };

  const addInfoData = useSelector(
    (store) => store.additionalInfoData.additionalInfo
  );
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
    } else if (FinalResume && addInfoData) {
      navigate("/final-resume");
    } else {
      route = "/add-section";
      navigate(route);
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {t("This section can't be empty.")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Fill it out or it will be deleted.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            className="btn site-btn border-btn"
          >
            {t("Keep Editing")}
          </Button>
          <Button
            onClick={handlePath}
            autoFocus
            className="btn site-btn bg-blue text-white"
          >
            {t("Discard Section")}
          </Button>
        </DialogActions>
      </Dialog>
      <section className="choose-template-section pt-4 bg-double pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <PageHeading headinglabel={t("Additional-Information")} />
              <PageSubHeading
                subheading={t("Add anything else you want employers to know.")}
              />
              <div className="row">
                <div className="col-sm-12 pt-4 pb-4" onClick={handleME}>
                  <CKEditor
                    config={{
                      toolbar: [
                        "bold",
                        "italic",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                        "heading",
                      ],
                    }}
                    editor={ClassicEditor}
                    data={description}
                    onChange={handleCkEditor}
                  />
                </div>
              </div>
              <div className="row mt-10">
                <div className="col-sm-6 col-4">
                  {/* <Link to="/add-section" className="btn site-btn border-btn">
                Back
              </Link> */}
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn site-btn bg-white text-black"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-8 text-right">
                  {/* <Link to="/final-resume"> */}
                  <button
                    type="button"
                    onClick={() => {
                      if (description) {
                        handlePath();
                      } else {
                        handleClickOpen();
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {localStorage.getItem("FinalResume") === "true"
                      ? `${t("SAVE AND NEXT")}`
                      : `${t("NEXT")}`}
                  </button>
                  {/* </Link> */}
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

export default AdditionalInfo;
