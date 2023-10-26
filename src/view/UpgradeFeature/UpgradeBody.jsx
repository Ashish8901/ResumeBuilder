import axios from "axios";
import React, { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// eslint-disable-next-line
import { Modal, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
import DummyResume from "../../assets/payment-box.png";
import PayBottom from "../../assets/pay-bottom.png";
import KeyIcon from "../../assets/key-icon.png";
import CardIcon from "../../assets/card-icon.png";
import EventIcon from "@material-ui/icons/Event";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./Payment.css";
const UpgradeBody = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [PaymentToken, setPaymentToken] = useState();
  const [subscriptionPlan, setsubscriptionPlan] = useState();
  const [subscriptionId, setsubscriptionId] = useState();
  // eslint-disable-next-line
  const [StripeKeys, setStripeKeys] = useState();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const loginData = useSelector((store) => store.resumeData);
  const usertoken = loginData?.loginData?.data?.token;
  //get stripe key
  const getStripeKeys = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/stripe-keys`,
        {
          headers: {
            Authorization: `${usertoken}`,
          },
        }
      );
      setStripeKeys(res.data.secret_key);
    } catch (error) {
      return error;
    }
  };
  //get All Subscription Plan
  const getAllSubscriptionPlan = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subscription-plan`,
        {
          headers: {
            Authorization: `${usertoken}`,
          },
        }
      );
      console.log(res.data, "fdfdf");
      setsubscriptionPlan(res.data.data.subscription_plan);
    } catch (error) {
      return error;
    }
  };
  console.log("subscriptionPlan :>> ", subscriptionPlan);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);

    const { error, token } = await stripe.createToken(cardElement);
    if (!error) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/stripe-payment`,
          {
            stripeToken: token.id,
            subscription_id: subscriptionId,
          },
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `${usertoken}`,
            },
          }
        )
        .then((resp) => {
          <Spinner animation="border" variant="warning" />;

          if (resp.status === 200) {
            toast.success(`${t("Transaction Successful")}`);
            setLoading(false);
            navigate("/customer-account");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.status === 404) {
            toast.error(`${t("Payment Failed")}`);
          }
        });
      setModalOpen(!modalOpen);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSubscriptionPlan();
    getStripeKeys();
    // confirmPayment()
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section
        className={
          modalOpen
            ? "choose-template-section customer-sec-body pt-4 overlay"
            : "choose-template-section customer-sec-body pt-4"
        }
      >
        <div className="container">
          <h1 className=" sell-main-heading text-center">
            Sofortigen Zugriff auf alle Funktionen
          </h1>
          <p className="text-center">Ihr Lebenslauf ist fertig! </p>
          <div className="payment-box">
            <div className="payment-container">
              <div className="plan-box right-section">
                <img src={DummyResume} alt="" />
              </div>
              <div className="plan-box left-section middle-section bg-change">
                <div className="access-price-wrapper">
                  {/* <p className="">
                    {subscriptionPlan && subscriptionPlan[1]?.type} <br></br>
                    <span className="skuLabel">
                      {subscriptionPlan && subscriptionPlan[1]?.title}
                    </span>
                  </p> */}
                  <div className="h2">
                    <span>
                      <span
                        style={{ color: "var(--dark)" }}
                        className="dollar left-currency-symbol currency-INR"
                      >
                        <i className="fa fa-eur" aria-hidden="true"></i>
                      </span>
                      &nbsp;
                      <span
                        className="priceVal semi-bold"
                        style={{ color: "var(--dark)" }}
                      >
                        {subscriptionPlan && subscriptionPlan[1]?.price}&nbsp;
                        <sub
                          style={{ color: "var(--light-dark)" }}
                          className="text-sm"
                        >
                          7 Tage voller Zugang
                        </sub>
                      </span>
                      {/* <sup className="cent">.00</sup> */}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-2"> INBEGRIFFEN</p>
                  <ul className="price-list">
                    <li>
                      <span className="list-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-copy"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"
                          />
                        </svg>
                      </span>
                      20+ anpassbare Vorlagen
                    </li>
                    <li>
                      <span className="list-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-files"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                        </svg>
                      </span>
                      Unbegrenzte Lebensläufe und Anschreiben
                    </li>
                    <li>
                      <span className="list-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-link"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                          <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                        </svg>
                      </span>
                      Einfach online teilen
                    </li>
                    <li>
                      <span className="list-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-list-ul"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                          />
                        </svg>
                      </span>
                      Vorformulierte Vorschläge
                    </li>
                  </ul>
                </div>
                <p
                  className="text-left text-xs"
                  style={{ color: "var(--light-dark)" }}
                >
                  Nach 7 Tagen wird Ihr Abonnement automatisch für einen Preis
                  von 29,95€ verlängert und danach alle 4 Wochen in Rechnung
                  gestellt. Sie können Ihr Abo jederzeit einfach kündigen.
                </p>
                <div>
                  <button
                    className="w-full btn site-btn bg-blue text-white"
                    onClick={() => {
                      setModalOpen(!modalOpen);
                      setsubscriptionId(2);
                    }}
                  >
                    weiter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pay-img">
        <div className="container">
          <div className="bottom-img-pay">
            <img alt="" src={PayBottom} />
          </div>
        </div>
      </section>

      {/* stripe payment modal  */}

      <div className={modalOpen ? "side-content sidebaropen" : "side-content"}>
        <div className="header-hd">
          <span
            className="cursor-pointer times-icon"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <i className="fa fa-times"></i>
          </span>
          <h1>Konto</h1>
        </div>
        <form className="paymentForm" onSubmit={handleSubmit}>
          <h6 className="bold">Aktiviere deine Mitgliedschaft</h6>
          <div className="price-box mb-4 mt-2">
            <span className="text-gray-400">
              <span className="text-4xl">€&nbsp;1.95</span> für 7 Tage
            </span>
            {/* <p className="text-gray-500 text-center mt-3 text-sm">
              Danach €&nbsp;29.95 / Monat (automatische Verlängerung)
            </p> */}
          </div>
          <div className="row mb-2">
            <div className="col-lg-12">
              <label>Kartennummer </label>
              <div className="flex-div">
                {/* <CreditCardIcon /> */}
                <span className="card-icon">
                  <img src={CardIcon} alt="" />
                </span>
                <CardNumberElement className="paymentInput" />
              </div>
            </div>
            <div className="col-lg-6">
              <label>Ablaufdatum</label>
              <div className="flex-div">
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
            </div>
            <div className="col-lg-6">
              <label>Sicherheitscode</label>
              <div className="flex-div">
                <span className="key-icon">
                  <img src={KeyIcon} alt="" />
                </span>
                {/* <VpnKeyIcon /> */}
                <CardCvcElement className="paymentInput" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <input
              className="pay-btn w-full btn site-btn bg-blue text-white"
              type="submit"
              value="weiter"
              // value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              // ref={payBtn}
              // className="paymentFormBtn"
            />
          </div>
          <p
            className="des-text text-left text-sm"
            style={{ color: "var(--light-dark)" }}
          >
            Mit Ihrem Klick auf "senden" akzeptieren Sie die
            Datenschutzerklärung und Allgemeinen Geschäftsbedingen von BI
            Marketing Management Est.
          </p>
        </form>
      </div>
    </>
  );
};

export default UpgradeBody;
