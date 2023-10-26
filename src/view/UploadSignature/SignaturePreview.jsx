import React, { useEffect } from 'react';
import ResumeContactPreview from '../../components/ResumeContactPreview';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import PreviewTips from '../../components/PreviewTips';
const SignaturePreview = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem('FinalResume');
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem('en_pth', pathname);
    }
  }, [pathname, FinalResume]);
  return (
    <>
      <section className="choose-template-section resume-contact-section pt-4 bg-green pb-3">
        <div className="container text-white">
          <div className="row">
            <div className="col-lg-6">
              <div className="resume-content-pd">
                <h2 className=" text-white semi-bold">
                  Das kann sich sehen lassen!
                </h2>
                <h1 className="heading text-white bold">
                  Zu guter Letzt, wie möchten Sie Ihren Lebenslauf
                  unterschreiben?
                </h1>
              </div>
              <div className="row mt-10">
                <div className="col-sm-6 col-6">
                  <Link
                    to="/add-section"
                    className="btn site-btn border-btn btn-white"
                  >
                    {t('Back')}
                  </Link>
                </div>
                <div className="col-sm-6 col-6 text-right">
                  <Link to="/upload-signature" className="btn site-btn bg-blue text-white">
                    {t('NEXT')}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignaturePreview;
