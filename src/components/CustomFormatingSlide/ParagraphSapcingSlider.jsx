import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { changeParagraphSpacing} from '../../redux/features/fontSizeSlice'
import {useDispatch} from 'react-redux';


const ParagraphSapcingSlider = (props) => {
  let {setState,paragraphSpacing}=props;
  const dispatch=useDispatch();
  const [value,setValue]=useState(true);
  const [valueName, setValueName] = useState(0);

  const customParagraphSpacingFunction =async (_, v) => {
    setValueName(v);
    // dispatch( changeParagraphSpacing(valueName))
    
  //  localStorage.setItem('paragraphSpacingSave', valueName);
  localStorage.setItem("customFlag","true")
   setState("true")
   setValue(false);
  //   // localStorage.setItem('paragraphSpacing', valueName);
    // props.onChange(v);
  };

  useEffect(()=>
  {
    setValueName(paragraphSpacing)
      // eslint-disable-next-line
  },[])
  useEffect(()=>
{
 if(value===false)
 {
  
  localStorage.setItem('paragraphSpacingSave', valueName);
    dispatch( changeParagraphSpacing(valueName))
 }
   props.onChange(valueName);
},[valueName,props,dispatch,value])
  return (
    <>
      <div className="font-slider">
        {/* <span className="font-size-value">{valueName}pt</span> */}
        <Slider
          onChange={customParagraphSpacingFunction}
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

export default ParagraphSapcingSlider;