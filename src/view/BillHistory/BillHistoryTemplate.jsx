import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getBillHistory } from "../../redux/features/subscriptionSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BillHistoryTemplate = () => {
  const {t} = useTranslation();
  const [SearchParams] = useSearchParams();
  const sub_id = SearchParams.get("id");
  const dispatch = useDispatch();
  const loginData = useSelector((store) => store.resumeData);
  const token = loginData?.loginData?.data?.token;
  const BillHistory = useSelector(
    (store) => store.subscriptionData.billHistory
  );
  useEffect(() => {
    if (token) {
      dispatch(
        getBillHistory(
          sub_id
        )
      );
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <section className="choose-template-section customer-sec-body pt-4">
        <div className="container">
          <h2 className="text text-blue semi-bold text-center pt-5 pb-5">
            {t('Bill History')}
          </h2>
          <div className="order-history-box">
            <table className="list-view-tesume" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>{t('Billing Date')}</th>
                  <th>{t('Description')}</th>
                  <th className="text-center">{t('Service Period')}</th>
                  <th className="text-right">{t('Payment Method')}</th>
                </tr>
              </thead>
              <tbody>
                {BillHistory.length === 0 ? (
                  <>
                    <p>{t('No Bill History Available')}</p>
                  </>
                ) : (
                  <>
                    {BillHistory?.map((item) => (
                      <tr>
                        <td className="text-blue">{item?.start_date}</td>
                        <td>{item?.description}</td>
                        <td className="text-center">{item?.interval}</td>
                        <td className="text-right">
                          {item.brand} {item.last4}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            <p>
              <strong>{t('Note')}:</strong> {t('we only show up to 1 year of billing history')}
            </p>
          </div>
          <div className="subscription-box mt-5">
            <div className="contactus-container">
              <h2 className=" need-help">
                {t('Need help or want to change your subscription?')}
              </h2>
              <p className="contact-number">1-800-652-8430</p>
              <a
                href="mailto:customerservice@resumebuilder.com"
                className="email-address "
              >
                customerservice@resumebuilder.com
              </a>
            </div>
            <div className="contactus-info">
              <h2 className="">{t('Contact us 7 days a week')}</h2>
              <p className="days-info">
                <strong>Monday-Friday:</strong> 8am to 8pm (Central),
              </p>
              <p className="days-info">
                <strong>Saturday:</strong> 8am to 5pm (Central),
              </p>
              <p className="days-info">
                <strong>Sunday:</strong> 10am to 6pm (Central)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BillHistoryTemplate;
