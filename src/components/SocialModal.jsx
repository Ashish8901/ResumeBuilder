import React from 'react'
import { Link } from "react-router-dom";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleIcon from "../assets/google-icon.png";
const SocialModal = (props) => {
  return (
    <>
      <div
        className="modal fade"
        id="moreOptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="moreOptionModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-12">
                  <h2 className="modal-title h4 mb-3 text-center">
                    Create an account to get your resume
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
                          //   data-dismiss="modal"
                        >
                          SAVE & NEXT
                        </Link>
                      </div>
                      <div className="col-sm-12 mb-4">
                        <Link to="" className="d-block text-center">
                          Already have an account?
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialModal