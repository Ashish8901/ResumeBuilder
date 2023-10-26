import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDegreeIndex } from '../../redux/features/resumeSlice';
// import React, {useState} from 'react'
// import Draggable from "react-draggable";
import { useTranslation } from 'react-i18next';
const ParaGroup = () => {
  const {t} = useTranslation()
  useSelector((store) => store.resumeData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteDegree = (index) => {
    let degree = JSON.parse(
      localStorage.getItem('resume_meta_value_education')
    );
    const degreesarr = degree.meta_value;
    let newArr = [...degreesarr];
    newArr.splice(index, 1);
    dispatch(deleteDegreeIndex(index));
    degree = { ...degree, meta_value: newArr };
    localStorage.setItem('resume_meta_value_education', JSON.stringify(degree));
  };
  const handleEdit = (index) => {
    navigate(`/edu-del?index=${index}`);
  };
  let x = 1;
  let degree =
    JSON.parse(localStorage.getItem('resume_meta_value_education')) || null;
  return (
    <>
      {degree?.meta_value?.map((data, index) => {
        return (
          <div className="paragroup-item" key={index}>
            <span className="para-count">{x++}</span>
            <p className="para-toolbar">
              {/* <Link to="/edu-del"> */}
              <button type="button" onClick={() => handleEdit(index)}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              {/* </Link> */}
              <button type="button" onClick={() => deleteDegree(index)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              {/* <button to="">
                <i className="fa fa-arrows" aria-hidden="true"></i>
              </button> */}
            </p>

            <div className="education-del-para">
              <p className="mb-0">
              <span className="edu-tag">{t('School Name')} : {data.sname}</span>
                <br />
                <span className="edu-tag">
                 {t('School Location')} : {data.slname}
                </span>
              </p>
            </div>

            <p className="pt-4">
              <Link
                className="des-link semi-bold"
                to={`/edu-del?index=${index}`}
              >
                <span>
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </span>
                &nbsp;{t('ADD A DESCRIPTION')}
              </Link>
            </p>
          </div>
        );
      })}
      <p>
        <Link
          className="btn semi-bold d-block uppercase dotted-btn"
          to="/edu-del"
        >
          {' '}
          <span>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </span>
          &nbsp;{t('Add Another Degree')}
        </Link>
      </p>
    </>
  );
};

export default ParaGroup;
