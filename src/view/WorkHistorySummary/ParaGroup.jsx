import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteJobIndex } from "../../redux/features/workExperienceSlice";
// import React, {useState} from 'react'
// import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
const ParaGroup = () => {
  let job = useSelector((store) => store.workExprData?.workExpr?.jobsData);
  const { t } = useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteJob = (index) => {
    let job = JSON.parse(localStorage.getItem("resume_meta_value_workexpr"));
    const jobsarr = job.meta_value;

    let newArr = [...jobsarr];
    newArr.splice(index, 1);
    dispatch(deleteJobIndex(index));
    job = { ...job, meta_value: newArr };
    localStorage.setItem("resume_meta_value_workexpr", JSON.stringify(job));
  };
  const handleEdit = (index) => {
    navigate(`/work-expr-form?index=${index}`);
  };
  let x = 1;

  return (
    <>
      {job?.map((data, index) => {
        return (
          <div className="paragroup-item pb-3" key={index}>
            <span className="para-count">{x++}</span>
            <p className="para-toolbar">
              <button type="button" onClick={() => handleEdit(index)}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>

              <button type="button" onClick={() => deleteJob(index)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              {/* <button to="">
                <i className="fa fa-arrows" aria-hidden="true"></i>
              </button> */}
            </p>

            <div className="education-del-para">
              <p className="mb-0">
              <span className="edu-tag">{t('Employer')} : {data?.employer}</span>
                <br />
                <span className="edu-tag">
                {t('Work Place Location')} : {data?.country}
                </span>
              </p>
            </div>
          </div>
        );
      })}
      <p>
        <Link
          className="btn semi-bold d-block uppercase dotted-btn"
          to="/work-expr-form"
        >
          {" "}
          <span>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </span>
          &nbsp;{t('ADD Another Experience')}
        </Link>
      </p>
    </>
  );
};

export default ParaGroup;
