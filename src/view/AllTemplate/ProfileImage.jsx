import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import getCroppedImg from "./cropImage";
import DummyImage from "../../assets/dummy-profile-pic.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import { getImage, UploadImage } from "../../redux/features/resumeSlice";
import { useTranslation } from "react-i18next";
const ProfileImage = ({ newTrue, setImagedata, onDataChange }) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [imgModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const templateId = localStorage.getItem("templateId");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      return e;
    }
  }, [croppedAreaPixels, rotation, selectedImage]);

  const imageChange = (e) => {
    console.log("Image Change");
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      // setImagedata(URL.createObjectURL(e.target.files[0]));
      onDataChange(e.target.files[0]);
      console.log(
        "      onDataChange(e.target.files[0])",
        onDataChange(e.target.files[0])
      );
      // onImageUpload(URL.createObjectURL(e.target.files[0]))
    }
  };

  const styles = {
    container: {
      display: "block",
    },
    // preview: {
    //   display: "flex",
    //   flexDirection: "column",
    // },
    image: {
      // maxWidth: "100%",
      // maxHeight: 320,
      verticalAlign: "middle",
      borderStyle: "none",
      objectFit: "cover",
      objectPosition: "top center",
      position: "absolute",
      zIndex: 2,
      backgroundColor: "#d7d7d8",
      left: "0",
      top: "0",
    },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
    dummyImg: {
      height: "160px",
      width: "160px",
      backgroundColor: "#d7d7d8",
      position: "relative",
      zIndex: 1,
    },
    templateBorder: {
      border: "8px solid var(--blue)",
    },
  };

  const resume_token = localStorage.getItem("resume_token");
  const dispatch = useDispatch();
  const imageData = useSelector((store) => store.resumeData.image);

  useEffect(() => {
    if (imageData) {
      dispatch(getImage(resume_token));
      setSelectedImage(imageData);
    }
  }, [imageData, resume_token, dispatch]);

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  useEffect(() => {
    if (selectedImage) {
      showCroppedImage();
    }
  });
  // useEffect(() => {
  //   setImagedata(selectedImage);
  // }, [selectedImage]);
  const uploadProfilePicture = () => {
    const formData = new FormData();
    let file = DataURIToBlob(croppedImage);
    formData.append("photo", file);
    setSelectedImage(null);
    formData.append("resume_token", resume_token);
    formData.append("resume_template_id", templateId);
    // setTimeout(() => {
    dispatch(UploadImage(formData));
    // }, 1000);
    setTimeout(() => {
      dispatch(getImage(resume_token));
    }, 1000);
    setRotation(0);
    setZoom(1);
    // onImageUpload(true)
  };

  // console.log("selected image",selectedImage)
  return (
    <>
      <div className="dummy-img-box" onClick={() => setModalOpen(!modalOpen)}>
        <div className="addNew ">
          <div style={styles.container} className="">
            <div style={styles.preview}>
              <div className="dummy-img" style={styles.dummyImg}>
                {!imageData && !selectedImage && (
                  <img
                    className="resume-profile-img dummy-box-img"
                    alt=""
                    src={DummyImage}
                  />
                )}
                {imageData ? (
                  <img
                    height={"100%"}
                    width={"100%"}
                    src={imageData}
                    style={styles.image}
                    alt="Thumb"
                    className="resume-profile-img"
                  />
                ) : selectedImage ? (
                  <img
                    height={"100%"}
                    width={"100%"}
                    src={selectedImage}
                    style={styles.image}
                    alt="Thumb"
                    className="resume-profile-img "
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <span
          className="btn site-btn border-btn upload-photo-btn w-100"
          onClick={() => setModalOpen(!modalOpen)}
        >
          {t("upload photo")}
        </span>
        {/* {selectedImage === "" && newTrue > 0 ? (
          <small className="text-danger">{t("Photo is required")}</small>    // image required message
        ) : (
          ""
        )} */}
      </div>
      {/* modal profile img */}
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog resume-pre-dialog profile-img-dialog"
      >
        <div className="pb-2 pb-2">
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
        <div className="modal-content pt-0">
          <div className="modal-body">
            <div className="container">
              <h3 className="mb-3">{t("Photo upload")}</h3>
              <div className="row">
                <div className="col-lg-6">
                  <div className="upload-img-input">
                    <span className="upload-img-link">
                      <input
                        accept="image/*"
                        type="file"
                        name="photo"
                        onChange={imageChange}
                        className="img-upload-input"
                      />
                      <i className="fa fa-camera" aria-hidden="true"></i>
                      <br />
                      <span className="text-blue uppercase underline">
                        {t("upload photo")}
                      </span>
                    </span>
                    {selectedImage ? (
                      <>
                        <div
                          className="img-container"
                          //  onMouseMove={showCroppedImage}
                        >
                          <Cropper
                            objectFit="contain"
                            image={selectedImage}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                          />
                        </div>
                      </>
                    ) : // <img
                    //   height={"100%"}
                    //   width={"100%"}
                    //   src={URL.createObjectURL(selectedImage)}
                    //   style={styles.image}
                    //   alt="Thumb"
                    //   className="resume-profile-img"
                    // />
                    imageData ? (
                      <img
                        height={"100%"}
                        width={"100%"}
                        src={imageData}
                        style={styles.image}
                        alt="Thumb"
                        className="resume-profile-img"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <Typography
                    variant="overline"
                    // classes={{ root: classes.sliderLabel }}
                  >
                    {t("Zoom")}
                  </Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    // classes={{ root: classes.slider }}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                  <Typography
                    variant="overline"
                    // classes={{ root: classes.sliderLabel }}
                  >
                    {t("Rotation")}
                  </Typography>
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    // classes={{ root: classes.slider }}
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="photo-tips-wrap">
                    <div>
                      <h3>
                        {t(
                          "Make sure to check the application requirements before adding a photo. Some employers won’t consider resume with photos."
                        )}
                      </h3>
                      <h3>{t("Want to add a photo?")}</h3>
                    </div>
                    <ul className="list-square px-0">
                      <li>
                        {t(
                          "Choose a recent color photo in a JPEG, PNG, or GIF format, that’s less than 10MB."
                        )}
                      </li>
                      <li>
                        {t(
                          "Crop your photo so it only shows your head and shoulders."
                        )}
                      </li>
                      <li>
                        {t(
                          "If you already uploaded a photo, uploading another will replace it."
                        )}
                      </li>
                    </ul>
                    <div className="row mt-4">
                      <div className="col-sm-12 text-right modal-image-btn">
                        <button
                          className="btn site-btn border-btn mr-2"
                          onClick={() => {
                            setModalOpen(!modalOpen);
                            if (imageData) {
                              setSelectedImage(imageData);
                            } else {
                              setSelectedImage(null);
                              onDataChange("");
                            }
                          }}
                        >
                          {t("Cancel")}
                        </button>
                        <button
                          onClick={() => {
                            uploadProfilePicture();
                            setModalOpen(!modalOpen);
                          }}
                          type="button"
                          className="btn site-btn bg-blue text-white"
                        >
                          {t("Save")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={imgModalOpen}
        className="modal-dialog resume-pre-dialog profile-img-dialog"
      >
        <div className="pb-2 pb-2">
          <span
            aria-hidden={true}
            onClick={() => {
              setImageModalOpen(!imgModalOpen);
            }}
            className="cursor-pointer close-btn"
          >
            <span className="close">&times;</span>
          </span>
        </div>
        <div className="modal-content pt-0">
          <div className="modal-body">
            <div className="container">
              <h3 className="mb-3">{t("Image Result")}</h3>
              <div className="row">
                <img src={croppedImage} alt="CropImage"></img>
              </div>
            </div>
            <button
              className="btn site-btn border-btn mr-2"
              onClick={() => setImageModalOpen(!imgModalOpen)}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileImage;
