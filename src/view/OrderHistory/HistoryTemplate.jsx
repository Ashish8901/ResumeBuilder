import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HistoryTemplate = () => {
  const { t } = useTranslation();
  const [orderHistory, setorderHistory] = useState([]);

  const loginData = useSelector((store) => store.resumeData);
  const token = loginData?.loginData?.data?.token;

  const getOrderHistory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order-history`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setorderHistory(res.data.data);
    } catch (error) {
      console.log('err:', error);
    }
  };

  useEffect(() => {
    getOrderHistory();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="choose-template-section customer-sec-body pt-4">
        <div className="container">
          <h2 className="text text-blue semi-bold">{t('Order History')}</h2>
          <div className="order-history-box">
            <table className="list-view-tesume" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>{t('User ID')}</th>
                  <th>{t('Subscription ID')}</th>
                  <th className="text-center">{t('Yearly/ Monthly')}</th>
                  <th className="text-right">{t('Payment Date')}</th>
                  <th className="text-right">{t('Status')}</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.length === 0 ? (
                  <>
                    <p>{t('No Orders Available')}</p>
                  </>
                ) : (
                  <>
                    {orderHistory?.map((item) => (
                      <tr>
                        <td>{item?.user_id}</td>
                        <td>{item?.subscription_id}</td>
                        <td className="text-center">
                          {item?.subscriptions.title}
                        </td>
                        <td className="text-right">
                          {new Date(item?.payment_date).toDateString()}
                        </td>
                        <td className="text-right">
                          {item?.status === 2 ? `${t('success')}` : `${t('pending')}`}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default HistoryTemplate;
