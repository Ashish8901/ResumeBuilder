import React from 'react';
import { useTranslation } from 'react-i18next';
import AccountSetting from './AccountSetting';
import CommunicationPreference from './CommunicationPreference';
import Subscription from './Subscription';

const AccountBody = () => {
  const {t} = useTranslation()
  return (
    <>
      <section className="choose-template-section customer-sec-body pt-4">
        <div className="container">
          <h2 className="text text-blue semi-bold mb-5">{t('MY ACCOUNT')}</h2>
          <div className="row">
            <div className="col-lg-3">
              <div
                className="nav flex-column nav-pills tab-list-content"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="active"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href="#v-pills-home"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  {t('General Account Settings')}
                </a>
                <a
                  className=""
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  {t('Subscription')}
                </a>
                <a
                  className=""
                  id="v-pills-messages-tab"
                  data-toggle="pill"
                  href="#v-pills-messages"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                  style={{
                    wordBreak: "break-word"
                  }}
                >
                  {t('Communication Preferences')}
                </a>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="account-content-box">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <AccountSetting />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <Subscription />  
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <CommunicationPreference />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountBody;
