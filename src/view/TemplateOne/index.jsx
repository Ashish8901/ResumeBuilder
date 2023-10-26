import React from 'react';
// import ResumeOne from '../../assets/resume-4.png'
import TempaleOneStructure from './TempaleOneStructure';
const index = ({ temp_id }) => {
  return (
    <>
      <div className="">
        <TempaleOneStructure resume_template_id={temp_id} />
      </div>
    </>
  );
};

export default index;
