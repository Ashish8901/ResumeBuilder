import React, {useState} from "react";
import { Modal } from "reactstrap";
import { Link } from "react-router-dom";
import BrandLogo from "../assets/resume-logo.png";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleIcon from "../assets/google-icon.png";
const CustomerHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="header border-bottom customer-header">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <nav className="navbar navbar-expand-lg navbar-light brand-logo">
                <Link className="navbar-brand" to="/">
                  <img src={BrandLogo} alt="" />
                </Link>
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
                      <Link className="nav-link" to="/">
                        Resumes
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item nav-pd">
                      <Link className="nav-link" to="/">
                        <span>
                          <i className="fa fa-comments" aria-hidden="true"></i>
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item nav-pd notify-link">
                      <Link className="nav-link  " to="/">
                        <span>
                          <i className="fa fa-bell" aria-hidden="true"></i>
                        </span>
                      </Link>
                      <div className="notification">
                        <ul>
                          <li className="drop-heading">notification</li>
                          <li className="">
                            You have no notifications at this time.
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item user-link">
                      <Link className="nav-link " to="">
                        <span>
                          <i
                            style={{ color: "var(--blue)" }}
                            className="fa fa-user"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="mr-2 ml-2">User</span>
                        <span>
                          <i
                            style={{ fontSize: "14px" }}
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </Link>
                      <div className="user-info">
                        <ul>
                          <li className="">
                            <Link to="/customer-account">
                              <span className="mr-2">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                              </span>
                              Settings
                            </Link>
                          </li>
                          <li className="">
                            <span className="mr-2">
                              <i
                                className="fa fa-sign-in"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Logout
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item user-link">
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
                    </li>
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
                  Sign-in to Your Account
                </h2>
                <div className="social-wrapper">
                  <Link to="" className="btn-social">
                    <span className="mr-3">
                      <img alt="" src={FacebookIcon} />
                    </span>
                    Sign in with Facebook
                  </Link>
                  <Link to="" className="btn-social">
                    <span className="mr-3">
                      <img alt="" src={GoogleIcon} />
                    </span>
                    Sign in with Google
                  </Link>
                </div>
                <p className="optional-or ">
                  <span>OR</span>
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
                        SAVE & NEXT
                      </Link>
                    </div>
                    <div className="col-sm-12 mb-4">
                      <Link
                        to=""
                        className="d-block text-center"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        Already have an account?
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
