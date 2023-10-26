import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridView from './GridView';
import ListView from './ListView';
const CustomerBody = () => {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const loginData = useSelector(
    (store) => store.resumeData.loginData.data.token
  );
  useEffect(() => {
    if (!loginData) {
      navigate('/final-resume');
    }
  }, [loginData, navigate]);
  const handleNewResume = () => {
    navigate('/');
    window.location.reload();
  };
  return (
    <>
      <section className="choose-template-section customer-sec-body pt-4">
        <div className="container">
          <h2 className="text text-blue semi-bold">{t('My Resume')}</h2>
          <div className="resume-view-list">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <span className="mr-3">{t('view')}:</span>
                <a
                  className="nav-item nav-link active"
                  id="nav-list-tab"
                  data-toggle="tab"
                  href="#nav-list"
                  role="tab"
                  aria-controls="nav-list"
                  aria-selected="true"
                >
                  <i className="fa fa-list-ul" aria-hidden="true"></i>
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-grid-tab"
                  data-toggle="tab"
                  href="#nav-grid"
                  role="tab"
                  aria-controls="nav-grid"
                  aria-selected="false"
                >
                  <i className="fa fa-th" aria-hidden="true"></i>
                </a>
                <div
                  onClick={handleNewResume}
                  className="create-resume-link btn ml-3 "
                >
                  {t('Create New Resume')}
                </div>
              </div>
            </nav>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-list"
              role="tabpanel"
              aria-labelledby="nav-list-tab"
            >
              <div className="custom-table-responsive">
                <ListView />
              </div>
            </div>
            <div
              className="tab-pane fade "
              id="nav-grid"
              role="tabpanel"
              aria-labelledby="nav-grid-tab"
            >
              <div>
                <GridView />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerBody;
