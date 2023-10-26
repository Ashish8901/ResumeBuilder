import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import {useDispatch} from 'react-redux';


import { changeLineSpacing } from '../../redux/features/fontSizeSlice'
const LineSapcingSlider = (props) => {
  let {setState,lineSpacing}=props;
  const dispatch = useDispatch();
  const [valueName, setValueName] = useState(0);
  const [value,setValue]=useState(true);

  const lineSpacingFunction =async (_, v) => {
    setValueName(v);
    // dispatch(changeLineSpacing(valueName))
  
  //  localStorage.setItem('lineSpacingSave', valueName);
   setState("true")
   setValue(false);
   localStorage.setItem("customFlag","true")
  
  };

useEffect(()=>
{
  setValueName(lineSpacing)
    // eslint-disable-next-line
},[])

useEffect(()=>
{
 if(value===false)
 {
  
  localStorage.setItem('lineSpacingSave', valueName);
  dispatch(changeLineSpacing(valueName))
 }
  // setState("true")
   props.onChange(valueName);
},[valueName,dispatch,props,value])


 
  return (
    <>
      <div className="font-slider">
        {/* <span className="font-size-value">{valueName}pt</span> */}
        <Slider
          // onChange={(_, v) => setValueName(v)}
          onChange={lineSpacingFunction}
          aria-label="Temperature"
          // defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
          id="linespacingslider"
          value={valueName}
        />
      </div>
    </>
  );
};

export default LineSapcingSlider;