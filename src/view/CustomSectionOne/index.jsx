import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import {
  addCustomSectionOne,
  deleteCustomSectionOne,
  editCustomSectionOne,
  getSingleCustomSectionOne,
} from "../../redux/features/customSectionSlice";
import { Button } from "reactstrap";
// import PreviewTips from "../../components/PreviewTips";
import ResumeContactPreview from "../../components/ResumeContactPreview";

const CustomSectionOne = () => {
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
  const name = localStorage.getItem("name_stateOne");

  const handleSectionName = () => {
    setSectionName(name);
  };

  const customDetailsOne = useSelector(
    (store) => store.customSectionData.custSectionOne
  );
  const singleSection = useSelector((store) => store.customSectionData.dataOne);

  const setDescriptionData = () => {
    if (customDetailsOne) {
      setSectionDescription(customDetailsOne?.description);
    }
  };
  useEffect(() => {
    setDescriptionData();
    if (customDetailsOne.title) {
      dispatch(getSingleCustomSectionOne(degreeObjectIndex));
    }
    // eslint-disable-next-line
  }, [dispatch, degreeObjectIndex]);

  const handleCkEditor = (event, editor) => {
    const data = editor.getData();
    setSectionDescription(data);
  };

  const handleCustomSection = () => {
    handleClose();
    if (!customDetailsOne?.title && sectionDescription !== "") {
      if (FinalResume) {
        dispatch(
          addCustomSectionOne({
            data: {
              title: sectionName,
              description: sectionDescription,
            },
          })
        );

        navigate("/final-resume");
      } else {
        dispatch(
          addCustomSectionOne({
            data: {
              title: sectionName,
              description: sectionDescription,
            },
          })
        );

        navigate("/signature");
      }
    } else if (
      customDetailsOne?.description !== "" &&
      sectionDescription !== ""
    ) {
      dispatch(
        editCustomSectionOne({
          id: localStorage.getItem("customSecOneId"),
          data: {
            title: !sectionName ? singleSection?.title : sectionName,
            description: sectionDescription,
          },
        })
      );

      navigate("/final-resume");
    } else if (sectionDescription === "") {
      if (customDetailsOne.description !== null) {
        dispatch(
          deleteCustomSectionOne(localStorage.getItem("customSecOneId"))
        );
        localStorage.removeItem("name_stateOne");
        localStorage.removeItem("sectionHeadOne");
        localStorage.removeItem("resume_meta_value_custom_sec_One");
        localStorage.removeItem("customSecOneId");

        navigate("/final-resume");
      }
    }
  };

  useEffect(() => {
    const setData = () => {
      if (customDetailsOne?.title?.length > 0 && name === null) {
        setSectionDescription(customDetailsOne?.description);
        setSectionName(customDetailsOne?.title);
      } else {
        handleSectionName(name);
      }
    };
    setData();
    // eslint-disable-next-line
  }, [customDetailsOne, degreeObjectIndex]);
  const FinalResume = localStorage.getItem("FinalResume");

  const handleBack = () => {
    if (FinalResume && customDetailsOne?.description?.length > 0) {
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
          {t("This section can't be empty.")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Fill it out or it will be deleted.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t("Keep Editing")}
          </Button>
          <Button onClick={handleCustomSection} autoFocus>
            {t("Discard Section")}
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
                  <button onClick={handleBack} className="btn site-btn ">
                    {t("Back")}
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

export default CustomSectionOne;
