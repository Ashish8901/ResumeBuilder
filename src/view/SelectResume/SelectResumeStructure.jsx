import React from "react";
import PageHeading from "../../components/PageHeading";
import SelectResumeLeft from "./SelectResumeLeft";
import {Link} from 'react-router-dom'
const SelectresumeStructure = () => {
  return (
    <>
      <section className="choose-template-section pt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center">
                <PageHeading headinglabel="How do you want to build your resume?" />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="build-resume-box">
                <SelectResumeLeft />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-6 col-6">
              <Link to="/choose-template" className="btn site-btn border-btn">
                Back
              </Link>
            </div>
            <div className="col-sm-6 col-6 text-right">
              <Link to="/resume" className="btn site-btn bg-blue text-white">
                Next
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectresumeStructure;
