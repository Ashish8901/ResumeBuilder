import React from 'react';
import { useTranslation } from 'react-i18next';
const ScreenLeft = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="left-box-screen">
        <div className="screen-left">
          <h1 className="heading">
            {t("just three")}
            <br /> <span className="text-warn">{t("simple")}</span> {t("steps")}
          </h1>
          <ul className="list-steps">
            <li>
              <span className="number">1</span>
              <p>
                {t(
                  "Select a template from our library of professional designs"
                )}
              </p>
            </li>
            <li>
              <span className="number">2</span>
              <p>
                {t(
                  "Build your resume with our industry-specific bullet points"
                )}
              </p>
            </li>
            <li>
              <span className="number">3</span>
              <p>
              {/* {t('Download your resume, print it out and get it ready to send!')} */}
              {t('Download the documents and start your application!')}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScreenLeft;
