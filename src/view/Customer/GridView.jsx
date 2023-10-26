import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllResumes, getLocalData } from '../../redux/features/localSlice';
import ResumeImg from '../../assets/resume-2.png';
import { useTranslation } from 'react-i18next';

const GridView = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginData = useSelector((store) => store.resumeData);
  const token = loginData?.loginData?.data?.token;
  const Resumes = useSelector((store) => store.localResData.resumes);
  const currentDate = new Date();
  // eslint-disable-next-line
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllResumes(token));
    }, 1000);

    // eslint-disable-next-line
  }, [token, dispatch]);
  const handleEdit = (token) => {
    dispatch(getLocalData(token)).then((res) => {
      navigate(`/final-resume?id=${token}`);
      window.location.reload();
    });
  };
  return (
    <>
      <div className="row">
        {Resumes === '' ? (
          <>
            <p>{t('No Resumes Available')}</p>
          </>
        ) : (
          <>
            {Resumes.map((item) => {
              return (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="feature-thumbnail ">
                    <img className="thumb-img" src={ResumeImg} alt="" />

                    <div className="feature-thumb-bottom">
                      <div className="resume-info-container ">
                        <h6>{item && item.resume_name}</h6>
                        <div className="resume-info">
                          <div>
                            <span>
                              {t('Modified')}:{' '}
                              {new Date(
                                item && item.resume_details[0]?.updated_at
                              ).toDateString()}
                            </span>
                            <br />
                            <span>
                              {t('Created')}:{' '}
                              {new Date(
                                item && item.resume_details[0]?.created_at
                              ).toDateString()}
                            </span>
                          </div>
                          <div className="text-center">
                            <Link to="/payment">
                              <span className="doc-Strength-label">
                                {t('Strength')}
                              </span>
                              <span className="doc-strength-value">
                                {item?.resume_strength}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="thumbnail-links">
                        <div className="resume-list-tool grid-tool">
                          <div className="list-tool">
                            <Link to="/payment">
                              <span>
                                <i
                                  className="fa fa-check-circle-o"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <span>{t('Check')}</span>
                            </Link>
                          </div>
                          <div className="list-tool">
                            <span
                              onClick={() => handleEdit(item?.resume_token)}
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span>{t('Edit')}</span>
                          </div>
                          <div className="list-tool">
                            <Link to="/customer">
                              <span>
                                <i
                                  className="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <span>Download</span>
                            </Link>
                          </div>
                          <div className="list-tool">
                            <Link to="/payment">
                              <span>
                                <i
                                  className="fa fa-print"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <span>{t('Print')}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default GridView;
