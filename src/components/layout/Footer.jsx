import React from 'react';
import { Link } from 'react-router-dom';
// import BoldLogo from '../../assets/bold.svg'
import { useTranslation } from 'react-i18next';
export const Footer = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="footer d-none">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <ul className="footer-links">
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://newcareerbusiness.com/terms-condition/"
                    >
                      {t('Terms and Conditions')}                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://newcareerbusiness.com/privacy-policy/"
                    >
                      {t('Privacy Policy')}                    </a>
                  </li>
                  <li>
                  <Link to="/accessibility">{t('Accessibility')}</Link>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://newcareerbusiness.com/contact-us/"
                    >
                        {t('Contact Us')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bootom border-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div>
                <p className="mb-0">{t('Powered by')} New Career Business</p>
                  <p className="mb-0 footer-logo bold text-blue">RB</p>
                </div>
              </div>
              <div className="col-sm-6">
                <p className="copyright-text text-right mb-0">
                ©{new Date().getUTCFullYear()} {t('New Career Business Limited. All rights reserved')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
