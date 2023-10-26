import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ParaGroup from './ParaGroup';
import { useTranslation } from 'react-i18next';
// import PreviewTips from '../../components/PreviewTips';
import ResumeContactPreview from '../../components/ResumeContactPreview';
const EduSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem('FinalResume');
  const workData = useSelector((store) => store.workExprData.workExpr.jobsData);
  const eduData = useSelector(
    (store) => store.resumeData.degreeData.degreesData
  );
  const skills = useSelector((store) => store.skillsData.Skills);
  const summary = useSelector((store) => store.summaryData.Summary);
  const isStudent = useSelector((store) => store.resumeData.studentCheck);
  let degree = JSON.parse(localStorage.getItem('resume_meta_value_education'));
  const handleNext = () => {
    calcEduPerc();
    if (FinalResume) {
      navigate('/final-resume');
    } else if (
      !FinalResume &&
      workData.length === 0 &&
      eduData.length > 0 &&
      isStudent === 'No'
    ) {
      navigate('/skill ');
    } else if (!FinalResume && workData.length === 0) {
      navigate('/expr ');
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      !summary &&
      !skills &&
      isStudent === 'Yes'
    ) {
      navigate('/expr');
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      !skills
    ) {
      navigate('/skill');
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      !summary &&
      skills &&
      isStudent === 'Yes'
    ) {
      navigate('/expr');
    } else if (
      !FinalResume &&
      workData.length > 0 &&
      eduData.length > 0 &&
      skills &&
      !summary
    ) {
      navigate('/skill');
    } else if (!FinalResume && workData.length > 0 && eduData.length > 0) {
      navigate('/expr');
    } else if (!FinalResume && eduData.length === 0 && workData.length > 0) {
      navigate('/resume-education');
    }
  };
  useEffect(() => {
    if (!FinalResume && degree?.meta_value?.length > 0) {
      localStorage.setItem('en_pth', pathname);
    } else {
      let route = '/edu-del';
      localStorage.setItem('en_pth', route);
    }
  }, [pathname, degree, FinalResume]);

  const handleBack = () => {
    FinalResume ? navigate('/final-resume') : navigate('/resume-education');
  };

  const calcEduPerc = () => {
    let perc = 0;
    if (eduData.length > 0) {
      perc = 20;
    } else {
      perc = 0;
    }
    localStorage.setItem('strEdu', perc);
  };
  return (
    <>
      <section className="pt-4 choose-template-section bg-double pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="page-title-big mleft-3 mb-3">
                Ausbildung&nbsp;
                {/* <span style={{ color: "var(--yellow)" }}> prüfen</span> */}
              </h1>

              <ParaGroup />
              <div className="row mt-10 edu-summ-btn">
                <div className="col-sm-6 col-2">
                  <button
                    onClick={handleBack}
                    className="btn site-btn border-btn"
                  >
                    {t('Back')}
                  </button>
                </div>
                <div className="col-sm-6 col-10 text-right wrk-hst-btn">
                  <button
                    onClick={handleNext}
                    className="btn site-btn bg-blue text-white"
                  >
                    {FinalResume
                      ? `${t('SAVE AND NEXT')}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        !summary &&
                        !skills &&
                        isStudent === 'Yes'
                      ? `${t('Further')}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        !summary &&
                        skills &&
                        isStudent === 'Yes'
                      ? `${t('Further')}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        !skills
                      ? `${t('NEXT')}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0 &&
                        skills &&
                        !summary
                      ? `${t('NEXT')}`
                      : !FinalResume &&
                        eduData.length === 0 &&
                        workData.length > 0
                      ? `${t('Further')}`
                      : !FinalResume &&
                        workData.length > 0 &&
                        eduData.length > 0
                      ? `${t('Further')}`
                      : !FinalResume &&
                        workData.length === 0 &&
                        eduData.length > 0 &&
                        isStudent === 'No'
                      ? `${t('NEXT')}`
                      : !FinalResume && workData.length === 0
                      ? `${t('Further')}`
                      : `${t('NEXT')}`}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <PreviewTips /> */}
              <ResumeContactPreview />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-3"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EduSummary;
