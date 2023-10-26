import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../../assets/newcareerbusiness__1__2.png";
import FacebookIcon from "../../assets/facebook-icon.png";
import GoogleIcon from "../../assets/google-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/resumeSlice";
import { useTranslation } from "react-i18next";

const CustomerHeader = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const loginData = useSelector((store) => store.resumeData);

  const logoutUser = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");

    window.location.reload();
  };

  // const clearCacheData = () => {
  //   caches.keys().then((names) => {
  //     names.forEach((name) => {
  //       caches.delete(name);
  //     });
  //   });
  //   console.log("Complete Cache Cleared");
  // };

  return (
    <>
      <div className="header border-bottom customer-header">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <nav className="navbar navbar-expand-lg navbar-light brand-logo">
                <div className="navbar-brand">
                  <img src={BrandLogo} alt="" />
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav customer-res-link mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/customer">
                        {t("Resumes")}
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav ml-auto">
                    {/* <li className="nav-item nav-pd">
                      <Link className="nav-link" to="/">
                          <span>
                            <i className="fa fa-comments" aria-hidden="true"></i>
                          </span>
                        </Link>
                    </li> */}
                    {/* <li className="nav-item nav-pd notify-link">
                      <Link className="nav-link  " to="/">
                        <span>
                          <i className="fa fa-bell" aria-hidden="true"></i>
                        </span>
                      </Link>
                      <div className="notification">
                        <ul>
                          <li className="drop-heading">{t("notifications")}</li>
                          <li className="">
                            {t("You have no notifications at this time.")}
                          </li>
                        </ul>
                      </div>
                    </li> */}
                    <li className="nav-item user-link">
                      <div className="nav-link ">
                        <span>
                          <i
                            style={{ color: "var(--blue)" }}
                            className="fa fa-user"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="mr-2 ml-2">
                          {loginData?.loginData?.data?.userInfo?.first_name}
                        </span>
                        <span>
                          <i
                            style={{ fontSize: "14px" }}
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div className="user-info">
                        <ul>
                          <li className="">
                            <Link to="/customer-account">
                              <span className="mr-2">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                              </span>
                              {t("Settings")}
                            </Link>
                          </li>
                          <li className="">
                            <Link to="/order-history">
                              <span className="mr-2">
                                <i
                                  className="fa fa-history"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              {t("Order History")}
                            </Link>
                          </li>
                          <li className="cursor-pointer">
                            <span onClick={() => logoutUser()}>
                              <span className="mr-2">
                                <i
                                  className="fa fa-sign-in  "
                                  aria-hidden="true"
                                ></i>
                              </span>
                              {t("Logout")}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* <li className="nav-item user-link">
                      <Link
                        className="nav-link "
                        to=""
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        <span>
                          <i
                            style={{ color: "var(--blue)" }}
                            className="fa fa-sign-in"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="mr-2 ml-2">Sign In</span>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* login modal */}
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
            className="cursor-pointer close-btn"
          >
            <span className="close">&times;</span>
          </span>
        </div>
        <div className="modal-content ">
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-center signin-logo mb-4">
                  <img src={BrandLogo} alt="" />
                </div>
                <h2 className="modal-title h4 mb-3 text-center">
                  {t("Sign-in to Your Account")}
                </h2>
                <div className="social-wrapper">
                  <Link to="" className="btn-social">
                    <span className="mr-3">
                      <img alt="" src={FacebookIcon} />
                    </span>
                    {t("Sign in with Facebook")}
                  </Link>
                  <Link to="" className="btn-social">
                    <span className="mr-3">
                      <img alt="" src={GoogleIcon} />
                    </span>
                    {t("Sign in with Google")}
                  </Link>
                </div>
                <p className="optional-or ">
                  <span>{t("OR")}</span>
                </p>
                <form className="f-14 social-connect-form">
                  <div className="form-group">
                    <label className="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="test@mailinator.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <Link
                        to=""
                        className="d-block btn site-btn bg-blue text-white"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        {t("SAVE & NEXT")}
                      </Link>
                    </div>
                    <div className="col-sm-12 mb-4">
                      <Link
                        to=""
                        className="d-block text-center"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        {t("Already have an account?")}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomerHeader;
