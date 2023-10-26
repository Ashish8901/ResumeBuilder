import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PageHeading from "../../components/PageHeading";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  addCustomSectionTwo,
  deleteCustomSectionTwo,
  editCustomSectionTwo,
  getSingleCustomSectionTwo,
} from "../../redux/features/customSectionSlice";
import { useTranslation } from "react-i18next";
// import PreviewTips from "../../components/PreviewTips";
import ResumeContactPreview from "../../components/ResumeContactPreview";
// import { arrExtSec } from '../../redux/features/extraSectionSlice';
const CustomSectionTwo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [SearchParams] = useSearchParams();
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const degreeObjectIndex = SearchParams.get("customSecToken");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const name = localStorage.getItem("name_stateTwo");
  const handleSectionName = () => {
    setSectionName(name);
  };
  const customDetailsTwo = useSelector(
    (store) => store.customSectionData.custSectionTwo
  );
  const singleSection = useSelector((store) => store.customSectionData.dataTwo);

  const setDescriptionData = () => {
    if (customDetailsTwo) {
      setSectionDescription(customDetailsTwo.description);
    }
  };

  useEffect(() => {
    setDescriptionData();
    if (customDetailsTwo.title) {
      dispatch(getSingleCustomSectionTwo(degreeObjectIndex));
    }
    // eslint-disable-next-line
  }, [dispatch, degreeObjectIndex]);

  const handleCkEditor = (event, editor) => {
    const data = editor.getData();
    setSectionDescription(data);
  };

  const handleCustomSection = () => {
    handleClose();

    if (!customDetailsTwo?.title && sectionDescription !== "") {
      dispatch(
        addCustomSectionTwo({
          data: {
            title: sectionName,
            description: sectionDescription,
          },
        })
      );
      navigate("/final-resume");
    } else if (
      customDetailsTwo?.description !== "" &&
      sectionDescription !== ""
    ) {
      dispatch(
        editCustomSectionTwo({
          id: localStorage.getItem("customSecTwoId"),
          data: {
            title: !sectionName ? singleSection?.title : sectionName,
            description: sectionDescription,
          },
        })
      );
      navigate("/final-resume");
    } else if (sectionDescription === "") {
      if (customDetailsTwo.description !== null) {
        dispatch(
          deleteCustomSectionTwo(localStorage.getItem("customSecTwoId"))
        );
        localStorage.removeItem("name_stateTwo");
        localStorage.removeItem("sectionHeadTwo");
        localStorage.removeItem("resume_meta_value_custom_sec_Two");
        localStorage.removeItem("customSecTwoId");
        navigate("/final-resume");
      }
    }
  };

  useEffect(() => {
    const setData = () => {
      if (customDetailsTwo?.title?.length > 0 && name === null) {
        setSectionDescription(customDetailsTwo?.description);
        setSectionName(customDetailsTwo?.title);
      } else {
        handleSectionName(name);
      }
    };
    setData();
    // eslint-disable-next-line
  }, [customDetailsTwo, degreeObjectIndex]);
  const FinalResume = localStorage.getItem("FinalResume");
  const handleBack = () => {
    if (FinalResume && customDetailsTwo?.description?.length > 0) {
      navigate("/final-resume");
    } else {
      navigate("/add-section");
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
          {"This section can't be empty."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill it out or it will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Keep Editing
          </Button>
          <Button onClick={handleCustomSection} autoFocus>
            Discard Section
          </Button>
        </DialogActions>
      </Dialog>
      <section className="choose-template-section pt-4 bg-double pb-5">
        <h1>
          {degreeObjectIndex === null
            ? ""
            : `${
                !sectionName
                  ? singleSection?.title?.toUpperCase()
                  : sectionName?.toUpperCase()
              }`}
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-5">
                <PageHeading
                  headinglabel={
                    degreeObjectIndex !== null
                      ? `${t("Showcase your")} ${
                          !sectionName ? singleSection?.title : sectionName
                        } ${t("to an employer")}`
                      : sectionName
                      ? `${t("Tell us about your")} ${
                          !sectionName ? singleSection?.title : sectionName
                        }`
                      : "Tell us about your Detail"
                  }
                />
              </div>
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
                data={sectionDescription ? sectionDescription : ""}
                onChange={handleCkEditor}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
              <div className="row mt-10">
                <div className="col-sm-6 col-4">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    Back
                  </button>
                </div>
                <div className="col-sm-6 col-8 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      if (sectionDescription) {
                        handleCustomSection();
                      } else {
                        handleClickOpen();
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {localStorage.getItem("FinalResume") === "true"
                      ? "SAVE AND NEXT"
                      : "NEXT"}
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

export default CustomSectionTwo;
