import React from "react";
// import ResumeOne from '../../assets/resume-4.png'
import TempaleOneStructure from './TempaleOneStructure';
const index = ({ temp_id, formData , exprData,city,preview ,customFlag,statefix, setStateFix }) => {

  return (
    <>
      <div className="">
        <TempaleOneStructure statefix={statefix} setStateFix={setStateFix} resume_template_id={temp_id} formData={formData} preview={preview}  exprData={exprData} city={city}/>
      </div>
    </>
  );
};


export default index;
