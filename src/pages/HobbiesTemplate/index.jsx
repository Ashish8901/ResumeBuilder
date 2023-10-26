import React from "react";
import HobbiesTemplate from '../../view/HobbiesTemplate/HobbiesInfo';

const index = ({handleRemoval}) => {
  return (
    <>
      <HobbiesTemplate handleRemoval={handleRemoval} />
    </>
  );
};

export default index;