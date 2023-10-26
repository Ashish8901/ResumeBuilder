import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactSignatureCanvas from "react-signature-canvas";
import {
  alignmentReducer,
  colorReducer,
  padSignReducer,
  padSignsizeReducer,
} from "../../redux/features/signatureSlice";
import { useSelector } from "react-redux";

const Signpad = ({ setStyleObject, styleObject, setPadSign }) => {
  const dispatch = useDispatch();
  const signatureData = useSelector(
    (store) => store.signatureData.SignResponse
  );
  const signatureData1 = useSelector((store) => store.signatureData);
  console.log("signatureSignPad :>> ", signatureData1);
  console.log("signatureSignPadRes :>> ", signatureData);

  const [sign, setSign] = useState("");
  const [signUrl, setSignUrl] = useState(signatureData.sign || "");

  const [colour, setColour] = useState("black");
  const [alignment, setAlignment] = useState(
    signatureData.adjustment ? signatureData.adjustment : "left"
  );
  const [textSize, setTextSize] = useState(140);
  function EndSign() {
    setSignUrl(sign.getSignaturePad().toDataURL("image/png"));
    setPadSign(sign.getSignaturePad().toDataURL("image/png"));
    dispatch(padSignReducer(sign.getSignaturePad().toDataURL("image/png")));
  }

  const handleClear = () => {
    if (sign) {
      sign?.clear();
      dispatch(padSignReducer(""));
    }
  };
  useEffect(() => {
    dispatch(padSignReducer(signUrl));
    dispatch(
      padSignsizeReducer(
        signatureData.signSize ? signatureData.signSize : textSize
      )
    );
    // eslint-disable-next-line
  }, [signUrl, signatureData, dispatch]);
  // useEffect(() => {
  //   handleClear();
  //   // eslint-disable-next-line
  // }, [activeTab, sign]);
  const increaseTextSize = () => {
    if (textSize < 164) {
      console.log("first");
      const newSize = textSize + 6;
      setTextSize(newSize > 164 ? 164 : newSize);
      dispatch(padSignsizeReducer(`${newSize > 164 ? 164 : newSize}`));
      setStyleObject({
        ...styleObject,
        size: `${newSize > 164 ? 164 : newSize}`,
      });
    }
  };

  const decreaseTextSize = () => {
    if (textSize > 116) {
      const newSize = textSize - 6;
      setTextSize(newSize < 116 ? 116 : newSize);
      dispatch(padSignsizeReducer(`${newSize < 116 ? 116 : newSize}`));
      setStyleObject({
        ...styleObject,
        size: `${newSize < 116 ? 116 : newSize}`,
      });
    }
  };
  const handleAlignmentChange = (newAlignment) => {
    setAlignment(newAlignment);
    dispatch(alignmentReducer(newAlignment));

    setStyleObject({ ...styleObject, align: newAlignment });
  };

  const handleColourChange = (value) => {
    // console.log('sign', sign);
    // sign?.getSignaturePad()?._data?.forEach((item) => {
    //   item?.forEach((element) => {
    //     console.log('value', value);
    //     element['color'] = value;
    //   });
    // });
    // console.log('sign', sign);
    // console.log('data', sign.getSignaturePad());
    // setSign(sign);
    if (value === "black") {
      setColour("black");
      dispatch(colorReducer("black"));

      setStyleObject({ ...styleObject, color: "black" });
    } else if (value === "blue") {
      setColour("blue");
      dispatch(colorReducer("blue"));
      setStyleObject({ ...styleObject, color: "blue" });
    }
  };

  useEffect(() => {
    if (sign) {
      sign.fromDataURL(signatureData.sign, {
        height: 100,
        width: 300,
      });
    }
    // eslint-disable-next-line
  }, [sign]);

  return (
    <>
      <div className="resume-contact-form">
        <label className="mb-0">Unterschrift eingeben</label>
      </div>
      <div className="border bg-white p-2 sign-draw">
        <ReactSignatureCanvas
          penColor={colour ? colour : "black"}
          ref={(data) => {
            setSign(data);
          }}
          onEnd={() => EndSign()}
          canvasProps={{
            width: 420,
            height: 105,
            className: "sigCanvas",
          }}
          from
        />
        <button className="p-0" onClick={handleClear}>
          <i className="fa fa-eraser" aria-hidden="true"></i>
          Löschen
        </button>
      </div>
      <div className="text-formater-box mt-4">
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
            <label className="mb-0">KONTRAST</label>
          </div>
          <ul className="uploadsign-color-list inline-block resume-color-list pl-0">
            <li className="color-item">
              <label className="color-selector">
                <input
                  className="color-input"
                  type="radio"
                  name="radio-color"
                  onChange={() => handleColourChange("black")}
                />
                <span
                  className="color-selector-radio root-color"
                  style={{
                    backgroundColor: "var(--success-steel)",
                  }}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </label>
            </li>
            <li className="color-item">
              <label className="color-selector">
                <input
                  className="color-input"
                  type="radio"
                  name="radio-color"
                  onChange={() => handleColourChange("blue")}
                />

                <span
                  className="color-selector-radio"
                  style={{
                    backgroundColor: "var(--navy-blue)",
                  }}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">GRÖSS</label>
          </div>

          <div className="font-formating">
            <button className="font-formating-text" onClick={decreaseTextSize}>
              -<i className="fa fa-font fa-xs" aria-hidden="true"></i>
            </button>
            <button
              className="font-formating-text"
              onClick={() => increaseTextSize()}
            >
              +<i className="fa fa-font fa-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signpad;
