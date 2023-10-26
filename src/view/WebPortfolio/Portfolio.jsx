import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addWeblinks,
  deleteWebLinks,
  editWeblinks,
} from "../../redux/features/webLinksSlice";
import { Button } from "reactstrap";
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
// import PreviewTips from "../../components/PreviewTips";
import ResumeContactPreview from "../../components/ResumeContactPreview";
const Portfolio = () => {
  const { t } = useTranslation();
  const FinalResume = localStorage.getItem("FinalResume");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loaction = useLocation();
  const pathname = loaction.pathname;

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  // const [show, setShow] = useState(false);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const defaultValues = { link1, link2, link3 };

  const webLinksLocal = JSON.parse(
    localStorage.getItem("resume_meta_value_webLinks")
  );
  console.log("webLinksLocal :>> ", webLinksLocal);
  const webLinkResData = useSelector(
    (store) => store.webLinksData.weblinksResData
  );
  console.log("webLinkResData :>> ", webLinkResData, !FinalResume);

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
  console.log(link1, link2, link3);
  const handlePath = () => {
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
      navigate(route);
    }
    // dispatch(addWeblinks({ data: defaultValues }));
    if (webLinkResData?.id || localStorage.getItem("webLinksId")) {
      if (link1 === "" && link2 === "" && link3 === "") {
        dispatch(deleteWebLinks(webLinkResData?.id));
        navigate("/final-resume");
      } else if (link1 !== "" || link2 !== "" || link3 !== "") {
        dispatch(
          editWeblinks({
            data: defaultValues,
            id: webLinkResData?.id || localStorage.getItem("webLinksId"),
          })
        );
        navigate("/final-resume");
      }
    } else {
      if (
        (link1 !== "" || (link2 !== "" && link3 !== "")) &&
        webLinksLocal === null
      ) {
        dispatch(addWeblinks({ data: defaultValues }));
        if (FinalResume) {
          navigate("/final-resume");
        } else {
          navigate("/signature");
        }
      }
    }
  };
  const linksdata = useSelector((store) => store.webLinksData.webLinks);
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
    } else if (
      FinalResume &&
      (linksdata?.link1 !== "" ||
        linksdata?.link2 !== "" ||
        linksdata?.link3 !== "")
    ) {
      navigate("/final-resume");
    } else {
      route = "/add-section";
      navigate(route);
    }
  };

  const setLinksData = () => {
    if (webLinksLocal) {
      if (webLinksLocal.link1 === null) {
        setLink1("");
      } else {
        setLink1(webLinksLocal.link1);
      }
      if (webLinksLocal.link2 === null) {
        setLink2("");
      } else {
        setLink2(webLinksLocal.link2);
      }
      if (webLinksLocal.link3 === null) {
        setLink3("");
      } else {
        setLink3(webLinksLocal.link3);
      }

      // setLink1(webLinksLocal.link1);
      // setLink2(webLinksLocal.link2);
      // setLink3(webLinksLocal.link3);
    }
  };
  useEffect(() => {
    setLinksData();
    // eslint-disable-next-line
  }, []);

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
            {t("Fill it out or it will be deleted.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t("Keep Editing")}
          </Button>
          <Button onClick={handlePath} autoFocus>
            {t("Discard Section")}
          </Button>
        </DialogActions>
      </Dialog>
      <section className="choose-template-section pt-4 bg-double pb-5">
        <div className="container">
          {/* <PageHeading headinglabel={t("What do you want to link to?")} /> */}
          {/* <PageSubHeading
            subheading={t(
              "Add your website, portfolio or professional profiles."
            )}
          /> */}
          <div className="row">
            <div className="col-lg-6">
              <h1 className="page-title-big">
                Was &nbsp;
                <span style={{ color: "var(--yellow)" }}>möchten</span>&nbsp;Sie
                verlinken?
              </h1>
              <p>
                Fügen Sie Ihre Website, Ihr Portfolio oder Ihre beruflichen
                Profile hinzu.
              </p>
              <div className="portfolio-link mt-4">
                <div className="form-group mb-4">
                  <label>{t("Personal Link")} 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={link1}
                    onChange={(e) => setLink1(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>{t("Personal Link")} 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={link2}
                    onChange={(e) => setLink2(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>{t("Personal Link")} 3</label>
                  <input
                    type="text"
                    className="form-control"
                    value={link3}
                    onChange={(e) => setLink3(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-5">
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
                    onClick={() => {
                      if (
                        (!link1 && !link2 && !link3) ||
                        (link1 === null && link2 === null && link3 === null)
                      ) {
                        handleClickOpen();
                      } else {
                        handlePath();
                      }
                    }}
                  >
                    {t("NEXT")}
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
