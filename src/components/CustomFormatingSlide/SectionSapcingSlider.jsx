import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { changeSectionSpacing } from "../../redux/features/fontSizeSlice";
import { useDispatch } from "react-redux";

const SectionSapcingSlider = (props) => {
  let { setState, sectionSpacing } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(true);
  const [valueName, setValueName] = useState(0);

  const customSectionSpacingFunction = async (_, v) => {
    setValueName(v);
    localStorage.setItem("customFlag","true")
    // dispatch( changeSectionSpacing(valueName))

    //  localStorage.setItem('sectionSpacingSave', valueName);
    setState("true");
    setValue(false);
    // props.onChange(v);
  };
  useEffect(() => {
    setValueName(sectionSpacing);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (value === false) {
      localStorage.setItem("sectionSpacingSave", valueName);
      dispatch(changeSectionSpacing(valueName));
    }
    props.onChange(valueName);
  }, [valueName, props, dispatch, value]);

  return (
    <>
      <div className="font-slider">
        {/* <span className="font-size-value">{valueName}pt</span> */}
        <Slider
          onChange={customSectionSpacingFunction}
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

export default SectionSapcingSlider;
