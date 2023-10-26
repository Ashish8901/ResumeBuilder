import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useDispatch } from "react-redux";
import {
  alignmentReducer,
  contrastReducer,
  imageSignReducer,
  imagesizeReducer,
} from "../../redux/features/signatureSlice";
import { useSelector } from "react-redux";

const UploadSignImage = ({
  setStyleObject,
  styleObject,

  setImageSign,
  setContrastValue,
}) => {
  const signatureData = useSelector(
    (store) => store.signatureData.SignResponse
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState(100);
  const [alignment, setAlignment] = useState(
    signatureData.adjustment ? signatureData.adjustment : "left"
  );
  const [textSize, setTextSize] = useState(100);
  const [imageData, setImageData] = useState(signatureData.upload || "");

  useEffect(() => {
    dispatch(imageSignReducer(imageData));
    dispatch(
      imagesizeReducer(
        signatureData.imageSize ? signatureData.imageSize : textSize
      )
    );
    // eslint-disable-next-line
  }, []);
  const handleChange = (newValue) => {
    setValue(newValue.target.value);
    dispatch(contrastReducer(newValue.target.value));
    setContrastValue(newValue.target.value);
  };
  const handleAlignmentChange = (newAlignment) => {
    setAlignment(newAlignment);
    dispatch(alignmentReducer(newAlignment));

    setStyleObject({ ...styleObject, align: newAlignment });
  };
  const increaseTextSize = () => {
    if (textSize < 140) {
      const newSize = textSize + 10;
      setTextSize(newSize > 140 ? 140 : newSize);
      dispatch(imagesizeReducer(`${newSize > 140 ? 140 : newSize}`));
      setStyleObject({
        ...styleObject,
        size: `${newSize > 140 ? 140 : newSize}`,
      });
    }
  };

  const decreaseTextSize = () => {
    if (textSize > 80) {
      const newSize = textSize - 10;
      setTextSize(newSize < 80 ? 80 : newSize);
      dispatch(imagesizeReducer(`${newSize < 80 ? 80 : newSize}`));
      setStyleObject({
        ...styleObject,
        size: `${newSize < 80 ? 80 : newSize}`,
      });
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageSign(URL.createObjectURL(file));
    setImageData(URL.createObjectURL(file));
    dispatch(imageSignReducer(URL.createObjectURL(file)));
  };
  return (
    <>
      {" "}
      <div className="upload-sign-box">
        <div className="form-group upload-wrap">
          <label className="fileInput">
            <input
              type="file"
              name="myImage2"
              accept=".png,.gif,.jpg"
              className="form-control"
              onChange={handleImageChange}
            />
            <div className="customFileInput">
              <span className="input-type"></span>
              <span id="uploadBtn" className="btn btn-upload btn-dark">
                BILD AUSWÄHLEN
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className="text-formater-box mt-4">
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">KONTRAST</label>
          </div>
          <div className="contrast-slider">
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <button className="font-formating-text">
                <i className="fa fa-minus"></i>
              </button>
              <Slider
                aria-label="Volume"
                value={value}
                onChange={handleChange}
                min={100}
                max={200}
              />
              <button className="font-formating-text">
                <i className="fa fa-plus"></i>
              </button>
            </Stack>
          </div>
        </div>
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">ANPASSUNG</label>
          </div>
          <div>
            <button
              className={
                alignment === "left"
                  ? "format-icon active-formate"
                  : "format-icon"
              }
              onClick={() => {
                handleAlignmentChange("left");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-text-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <button
              className={
                alignment === "center"
                  ? "format-icon active-formate"
                  : "format-icon"
              }
              onClick={() => {
                handleAlignmentChange("center");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-text-center"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <button
              className={
                alignment === "right"
                  ? "format-icon active-formate"
                  : "format-icon"
              }
              onClick={() => {
                handleAlignmentChange("right");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-text-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">GRÖSS</label>
          </div>
          <div className="font-formating">
            <button className="font-formating-text" onClick={decreaseTextSize}>
              -<i className="fa fa-font fa-xs" aria-hidden="true"></i>
            </button>
            <button className="font-formating-text" onClick={increaseTextSize}>
              +<i className="fa fa-font fa-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSignImage;
