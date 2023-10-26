import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionData } from "../../redux/features/subscriptionSlice";
import { useTranslation } from "react-i18next";

const Subscription = () => {
  const { t } = useTranslation();
  const currentSubscription = useSelector((store) => store.subscriptionData);
  const loginData = useSelector((store) => store.resumeData);
  const token = loginData?.loginData?.data?.token;
  console.log(currentSubscription);
  // const [currentSubscription, setcurrentSubscription] = useState({});
  // const [cancelSubscription,setcancelSubscription] = useState();

  //get All Subscription Plan
  // const getAllSubscriptionPlan = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/subscription-plan`,
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );
  //     setcurrentSubscription(res.data.data);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  //Cancel subscription
  const subscriptionCancel = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cancel-subscription`,
        {
          subscription_id: currentSubscription?.currentPlan?.gateway_payment_id,
        }
      );
      toast.info("Subscription Cancel Successfully");
      dispatch(subscriptionData(token));

      // getAllSubscriptionPlan();
    } catch (error) {
      return error;
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(subscriptionData(token));
      // getAllSubscriptionPlan();
    }
    // eslint-disable-next-line
    // }, [currentSubscription?.currentPlan?.subscription_billing?.status]);
  }, [dispatch, token]);

  return (
    <>
      <div className="subscription-box">
        <div className="contactus-container">
          <h2 className=" need-help">
            {t("Need help or want to change your subscription?")}
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
          <h2 className="">{t("Contact us 7 days a week")}</h2>
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
      <div className="mt-5">
        <h4 className="tab-title mb-4">{t("Subscription")}</h4>
        <div className="acc-setting">
          <ul className="account-info-list">
            <li>
              <span className="account-info-item">{t("Account ID")}:</span>
              <span className="account-info">
                {currentSubscription?.currentPlan?.subscription_billing
                  ?.status !== 1
                  ? `${t("Not Subscribed")}`
                  : currentSubscription?.currentPlan?.id}
              </span>
            </li>
            <li>
              <span className="account-info-item">
                {t("Subscription Type")}:
              </span>
              <span className="account-info">
                {currentSubscription?.currentPlan?.subscription_billing
                  ?.status !== 1
                  ? `${t("Not Subscribed")}`
                  : currentSubscription?.planDetails?.billing}
              </span>
            </li>
            <li>
              <span className="account-info-item">
                {t("Registration Date")}:
              </span>
              <span className="account-info">
                {currentSubscription?.currentPlan?.subscription_billing
                  ?.status !== 1
                  ? `${t("Not Subscribed")}`
                  : currentSubscription?.planDetails?.start_date}
              </span>
            </li>
            <li>
              {currentSubscription?.currentPlan?.subscription_billing
                ?.status === 1 &&
                currentSubscription?.currentPlan?.subscriptions?.title ===
                  "Jahresabonnement" && (
                  <Button
                    className="btn site-btn bg-blue text-white uppercase"
                    onClick={subscriptionCancel}
                  >
                    {t("Cancel Subscription")}
                  </Button>
                )}
            </li>
            <li>
              <p className="f-12">
                {t(
                  "For more information or changes to your subscription, email us at"
                )}{" "}
                &nbsp;
                <a
                  href="mailto:customerservice@resumebuilder.com"
                  className="email-address "
                >
                  customerservice@resumebuilder.com
                </a>
              </p>
            </li>
            <hr style={{ borderTop: "1px solid #cfcfcf" }}></hr>
          </ul>
          {currentSubscription?.currentPlan?.subscription_billing?.status ===
            1 &&
            currentSubscription?.planDetails && (
              <>
                <div className="billing-history">
                  <h6 className="tab-title mb-4 semi-bold">
                    {t("Subscription Deatils")}
                  </h6>
                  <Link
                    to={`/bill-history?id=${currentSubscription?.currentPlan?.gateway_payment_id}`}
                  >
                    {t("View Billing History")}
                  </Link>
                </div>
                <ul className="account-info-list">
                  <li>
                    <span className="account-info-item">Status:</span>
                    <span className="account-info">
                      {currentSubscription?.planDetails?.status}
                    </span>
                  </li>
                  <li>
                    <span className="account-info-item">{t("Product")}:</span>
                    <span className="account-info">{t("Resume Wizard")}</span>
                  </li>
                  <li>
                    <span className="account-info-item">{t("Billing")}:</span>
                    <span className="account-info">
                      {currentSubscription?.planDetails?.billing}
                    </span>
                  </li>
                  <li>
                    <span className="account-info-item">
                      {t("Billing Start Date")}:
                    </span>
                    <span className="account-info">
                      {" "}
                      {currentSubscription?.planDetails?.start_date}
                    </span>
                  </li>
                  <li>
                    <span className="account-info-item">
                      {t("Last Billed")}:
                    </span>
                    <span className="account-info">
                      {" "}
                      {currentSubscription?.planDetails?.start_date}
                    </span>
                  </li>
                  <li>
                    <span className="account-info-item">{t("Next Bill")}:</span>
                    <span className="account-info">
                      {" "}
                      {currentSubscription?.planDetails?.end_date}
                    </span>
                  </li>
                  {/* <li>
        <span className="account-info-item">
          Trail expiration date:
        </span>
        <span className="account-info">August 5, 2022</span>
      </li> */}
                  <br />
                </ul>
                <div className="billing-history">
                  <h6 className="tab-title mb-4 semi-bold">
                    {t("Billing Deatils")}
                  </h6>
                  <Link to="/payment">
                    <span
                      className="link cursor-pointer"
                      style={{ color: "var(--blue)" }}
                    >
                      {/* <i
                        className="fa fa-pencil edit-icon"
                        aria-hidden="true"
                      ></i> */}
                      {/* <span className="hidden-sm-down ml-2">edit</span> */}
                    </span>
                  </Link>
                </div>
                <ul className="account-info-list">
                  <li>
                    <span className="account-info-item">
                      {t("Credit card type")}:
                    </span>
                    <span className="account-info">
                      {" "}
                      {currentSubscription?.planDetails?.brand}
                    </span>
                  </li>
                  <li>
                    <span className="account-info-item">
                      {t("Last 4 digits")}:
                    </span>
                    <span className="account-info">
                      {" "}
                      {currentSubscription?.planDetails?.last4}
                    </span>
                  </li>
                  <li>
                    <span className="account-info-item">
                      {t("Expiration date")}:
                    </span>
                    <span className="account-info">
                      {" "}
                      {currentSubscription?.planDetails?.expiryMonth},{" "}
                      {currentSubscription?.planDetails?.expiryYear}
                    </span>
                  </li>
                </ul>
              </>
            )}

          <p className="mt-4">
            <Link
              className="btn site-btn bg-blue text-white uppercase"
              data-dismiss="modal"
              to="/payment"
            >
              {t("Upgrade to Full Access")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Subscription;
