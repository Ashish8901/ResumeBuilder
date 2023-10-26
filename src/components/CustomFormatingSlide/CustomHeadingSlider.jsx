import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';


import {useDispatch} from 'react-redux';


import { changeHeadingSize } from '../../redux/features/fontSizeSlice';
const CustomHeadingSlider = (props) => {
  let {setState,headingSize}=props;
  const [value,setValue]=useState(true);
  const dispatch = useDispatch();

  const [valueName, setValueName] = useState(10);
  const customHeadingFontFunction = async(_, v) => {
    setValueName(v);
    localStorage.setItem("customFlag","true")
   setState("true")
   setValue(false)
    // props.onChange(v);
  };
  useEffect(()=>
  {
    setValueName(headingSize)
      // eslint-disable-next-line
  },[])

useEffect(()=>
{
 
  if(value===false)
  {

   localStorage.setItem('customHeadingSizeSave', valueName);
   dispatch(changeHeadingSize(valueName));
  }
    props.onChange(valueName);
},[valueName,dispatch,value,props])
  return (
    <>
      <div className="font-slider">
        <span className="font-size-value">{valueName}pt</span>
        <Slider
          onChange={customHeadingFontFunction}
          aria-label="Temperature"
          defaultValue={0}
          valueLabelDisplay="auto"
          step={2}
          marks
          min={10}
          max={26}
          id="headingSlider"
          value={valueName}
        />
      </div>
    </>
  );
};

export default CustomHeadingSlider;