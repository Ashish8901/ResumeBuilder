import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const CommunicationPreference = () => {
  const {t} = useTranslation()
  return (
    <>
      <div>
        <h4 className="tab-title mb-4">{t('Communication Preferences')}</h4>
        <h6 className="h6 pt-1 semi-bold">
          {t('Select which emails you would like to receive')}:
        </h6>
        <form className="pt-3 communication-check-list">
          <div className="form-group">
            <div>
              <label className="custom-check-container">
                {t('Insider Tips & Tricks')}
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <label className="custom-check-container">
                {t('Job Search Organizer Alerts & Job Alerts')}
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <label className="custom-check-container">
                {t('New Features & Announcements')}
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <label className="custom-check-container">
                {t('Market Research')}
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <label className="custom-check-container">
                {t('Unsubscribe from all NewCareer emails')}
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          <p className="mt-4">
            <Link
              className="width-btn btn site-btn bg-blue text-white uppercase"
              data-dismiss="modal"
              to="/customer-account"
            >
              {t('Save Changes')}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default CommunicationPreference;
