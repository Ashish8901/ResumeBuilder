import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { changeParagraphIndent } from "../../redux/features/fontSizeSlice";
import { useDispatch } from "react-redux";

const ParagraphIndentSlider = (props) => {
  let { setState, paragraphIndent } = props;
  const dispatch = useDispatch();
  const [valueName, setValueName] = useState(0);
  const [value, setValue] = useState(true);

  const paragraphFunction = async (_, v) => {
    setValueName(v);
    localStorage.setItem("customFlag","true")
    setState("true");
    setValue(false);
  };
  useEffect(() => {
    setValueName(paragraphIndent);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (value === false) {
      localStorage.setItem("paragraphIndentSizeSave", valueName);
      dispatch(changeParagraphIndent(valueName));
    }
    //   // setState("true")
    props.onChange(valueName);
  }, [valueName, value, props, dispatch]);

  return (
    <>
      <div className="font-slider">
        {/* <span className="font-size-value">{valueName}pt</span> */}
        <Slider
          onChange={paragraphFunction}
          aria-label="Temperature"
          // defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
          value={valueName}
        />
      </div>
    </>
  );
};

export default ParagraphIndentSlider;