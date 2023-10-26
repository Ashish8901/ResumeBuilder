import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

import { changeFontSize } from "../../redux/features/fontSizeSlice";
import { useDispatch } from "react-redux";

const CustomFontSlider = (props) => {
  const [valueName, setValueName] = useState(8);
  let { setState, fontSize } = props;
  const [value, setValue] = useState(true);
  // console.log("fontSize",fontSize)

  const dispatch = useDispatch();

  const customFontFunction = (_, v) => {
    setValueName(v);

    // dispatch( changeFontSize(valueName))
    setState("true");
    // localStorage.setItem('customFontSizeSave', valueName);
    //  setState("true")
    setValue(false);
    localStorage.setItem("customFlag","true")
    props.onChange(v);
  };
  useEffect(() => {
    setValueName(fontSize);
      // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (value === false) {
      localStorage.setItem("customFontSizeSave", valueName);
      dispatch(changeFontSize(valueName));
    }

    props.onChange(valueName);
  }, [valueName, dispatch, props, value]);

  return (
    <>
      <div className="font-slider">
        <span className="font-size-value">{valueName}pt</span>
        <Slider
          onChange={customFontFunction}
          aria-label="Temperature"
          defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={8}
          max={14}
          id="slider"
          value={valueName}
        />
      </div>
      {/* onChange= {(_, v) => setValueName(v)} */}
    </>
  );
};

export default CustomFontSlider;