import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

import { arrExtSec } from "../../redux/features/extraSectionSlice";
import { useTranslation } from "react-i18next";
// import PreviewTips from "../../components/PreviewTips";
import ResumeContactPreview from "../../components/ResumeContactPreview";
import {
  addHobbiesInfo,
  deleteHobbiesInfo,
  editHobbiesInfo,
} from "../../redux/features/hobbiesSlice";
const HobbiesInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const FinalResume = localStorage.getItem("FinalResume");
  const pathname = location.pathname;
  const [description, setDescription] = useState("");

  const [checkDesc, setCheckDesc] = useState(true);
  const skills = localStorage.getItem("resume_meta_value_hobbiesInfo");

  // const inputRef = useRef();
  // const [show, setShow] = useState(false);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const hobbiesInfoResData = useSelector(
    (store) => store.hobbiesinfoData?.hobbiesInfoResData
  );
  const hobbiesInfo = localStorage.getItem("resume_meta_value_hobbiesInfo");
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
    if (hobbiesInfo) {
      setDescription(hobbiesInfo);
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
    const filterName = nameArr.filter((ele) => ele !== "Hobbies");

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
    if (hobbiesInfo === null && description !== "") {
      if (FinalResume) {
        dispatch(addHobbiesInfo({ data: description }));
        dispatch(arrExtSec(filterName));
        navigate("/final-resume");
      } else {
        dispatch(addHobbiesInfo({ data: description }));
        dispatch(arrExtSec(filterName));
        navigate(route);
      }
    } else if (hobbiesInfo !== null && description !== "") {
      dispatch(
        editHobbiesInfo({
          data: description,
          id: hobbiesInfoResData?.id || localStorage.getItem("hobbiesInfoId"),
        })
      );
      dispatch(arrExtSec(filterName));
      navigate("/final-resume");
    } else if (description === "") {
      if (hobbiesInfo !== null) {
        dispatch(deleteHobbiesInfo(hobbiesInfoResData.id));
        dispatch(arrExtSec(filterName));
        navigate("/final-resume");
        return false;
      } else {
        dispatch(arrExtSec(filterName));
        navigate("/final-resume");
      }
    }
  };

  const hobbiesInfoData = useSelector(
    (store) => store.hobbiesInfoData?.HobbiesInfo
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
    } else if (FinalResume && hobbiesInfoData) {
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
              <PageHeading headinglabel={t("Hobbies")} />
              {/* <PageSubHeading
                subheading={t('Add anything else you want employers to know.')}
              /> */}
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

export default HobbiesInfo;
