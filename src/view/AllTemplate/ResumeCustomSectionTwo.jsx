import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
const ResumeCustomSectionTwo = () => {
  const styleobj = {
    fontSize: '',
  };
  const pathname = window.location.pathname;
  const customSecton = useSelector(
    (store) => store.customSectionData.custSectionTwo
  );

  return (
    <>
      <div className="resume-section summay-box resume-extra-sec">
        <h1 className="resume-heading">{customSecton?.title}</h1>

        <div className="paragraph" style={styleobj}>
          {pathname === "/choose-template" ? (
            ""
          ) : customSecton?.title !== "" || customSecton?.description !== "" ? (
            <>
              <p> {ReactHtmlParser(customSecton?.description)}</p>
            </>
          ) : (
            customSecton?.title
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeCustomSectionTwo;
// // Motivated Sales Associate with 5 years of experience boosting sales
// //           and customer loyalty through individualized service. Resourceful
// //           expert at learning customer needs, directing to desirable merchandise
// //           and upselling to meet sales quotas. Committed to strengthening
// //           customer experiences with positivity and professionalism when
// //           answering requests and processing sales.
