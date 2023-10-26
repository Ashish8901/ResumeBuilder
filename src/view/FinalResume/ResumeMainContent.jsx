import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import FinalResumeTemplate from "./FinalResumeTemplate";
import FacebookIcon from "../../assets/facebook-icon.png";
import GoogleIcon from "../../assets/google-icon.png";
import { useDispatch } from "react-redux";
import { addUser, loginUser } from "../../redux/features/resumeSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

const ResumeMainContent = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // eslint-disable-next-line
  const [loginFacebook, setLogin] = useState(false);
  // eslint-disable-next-line
  const [data, setData] = useState({});
  // eslint-disable-next-line
  const [picture, setPicture] = useState("");

  const [text, setText] = useState("Resume_Text");
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newmodalOpen, setnewModalOpen] = useState(false);
  const name = JSON.parse(localStorage.getItem("resume_meta_value_heading"));

  const registerUser = async () => {
    await dispatch(
      addUser({
        first_name: name.fname,
        last_name: name.lname,
        email: Email,
        password: Password,
      })
    ).catch((e) => {
      console.log(e);
    });
  };

  //login user

  const login = async () => {
    await dispatch(
      loginUser({
        email: loginEmail,
        password: loginPassword,
      })
    ).catch((e) => {
      console.log(e);
    });
  };

  const [LoginData, setLoginData] = useState(
    localStorage.getItem("sociallogin")
      ? JSON.parse(localStorage.getItem("sociallogin"))
      : null
  );

  const handleFailure = async (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    const data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/login`,
      JSON.stringify({
        social_id: googleData.profileObj.googleId,
        login_token: googleData.tokenId,
        name: googleData.profileObj.name,
        email: googleData.profileObj.email,
        mode: "google",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoginData(data);
    localStorage.setItem("login_register_token", data.data.token);
    navigate("/customer");
  };

  //facebook login
  const responseFacebook = (response) => {
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ["profile", "email"],
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handle = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="main-resume">
     
        <div className="top-bar">
         
          <div className="editable-text-box">
            <span>
              {hide && (
                <>
                  <i className="mr-1 fa fa-pencil "></i>[
                  <span
                    className="cursor-pointer editable-text"
                    onClick={() => {
                      setShow(!show);
                      setHide(!hide);
                    }}
                  >
                    &nbsp;{text}&nbsp;
                  </span>
                  ]
                </>
              )}
              {show && (
                <div className="edit-baox">
                  <input
                    className="change-editable-text"
                    onChange={handle}
                  ></input>
                  <button
                    className="ml-2 check-btn"
                    onClick={() => {
                      setShow(!show);
                      setHide(!hide);
                    }}
                  >
                    <i className="fa fa-check" aria-hidden="true" />
                  </button>
                  <Link
                    to=""
                    className="ml-2 uppercase f-14"
                    onClick={() => {
                      setShow(!show);
                      setHide(!hide);
                    }}
                  >
                    cancel
                  </Link>
                </div>
              )}
            </span>
          </div>
          <div className="more-opt test">
            <span
              className="text-decoration cursor-pointer"
              // style={{ color: "var(--blue)" }}
              onClick={() => setModalOpen(!modalOpen)}
            >
              More Options
              <i className="ml-2 fa fa-chevron-down" aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="final-resume-box mt-4">
         
            <FinalResumeTemplate ref={ref} />
         
        </div>
      </div>
      {/* more-option modal */}
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
                      name="Email"
                      type="text"
                      className="form-control"
                      placeholder="test@mailinator.com"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="">Password</label>
                    <input
                      name="Password"
                      type="password"
                      className="form-control"
                      placeholder=""
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <Link
                        onClick={() => {
                          registerUser();
                          // setModalOpen(!modalOpen);
                        }}
                        to=""
                        className="d-block btn site-btn bg-blue text-white"
                      >
                        SAVE & NEXT
                      </Link>
                    </div>
                    <div className="col-sm-12 mb-4">
                      <span
                        to=""
                        className="d-block text-center  cursor-pointer"
                        //  className="text-decoration cursor-pointer"
                        style={{ color: "var(--blue)" }}
                        onClick={() => {
                          setnewModalOpen(!newmodalOpen);
                          setModalOpen(!modalOpen);
                        }}
                      >
                        Already have an account?
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/*login modal*/}
      <Modal
        toggle={() => setnewModalOpen(!newmodalOpen)}
        isOpen={newmodalOpen}
        className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              setnewModalOpen(!newmodalOpen);
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
                <h2 className="modal-title h4 mb-3 text-center">
                  Log in your account
                </h2>
                <div className="social-wrapper">
                  <div className="btn-social">
                    <span className="mr-3">
                      <FacebookLogin
                        appId="551898933267518"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        icon="fa-facebook"
                      />
                    </span>

                    <span className="mr-3">
                      hello
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log In with google"
                        onSuccess={handleLogin}
                        // onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                      ></GoogleLogin>
                    </span>
                  </div>

                  {/* <Link to="" className="btn-social">
                    <span className="mr-3">
                      <img alt="" src={FacebookIcon} />
                    </span>
                    Sign in with Facebook
                  </Link> */}
                  {/* <Link to="" className="btn-social">
                    <span className="mr-3">
                      <img alt="" src={GoogleIcon} />
                    </span>
                    Sign in with Google
                  </Link> */}
                </div>
                <p className="optional-or ">
                  <span>OR</span>
                </p>
                <form className="f-14 social-connect-form">
                  <div className="form-group">
                    <label className="">Email</label>
                    <input
                      name="loginEmail"
                      type="text"
                      className="form-control"
                      placeholder="test@mailinator.com"
                      value={loginEmail}
                      onChange={(e) => setloginEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="">Password</label>
                    <input
                      name="loginPassword"
                      type="password"
                      className="form-control"
                      placeholder=""
                      value={loginPassword}
                      onChange={(e) => setloginPassword(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <Link
                        onClick={() => {
                          login();
                          //  handleCloseModal()
                        }}
                        to="/customer"
                        className="d-block btn site-btn bg-blue text-white"
                        // data-dismiss="modal"
                      >
                        LOGIN
                      </Link>
                    </div>
                    <div className="col-sm-12 mb-4">
                      <span
                        to=""
                        className="d-block text-center  cursor-pointer"
                        //  className="text-decoration cursor-pointer"
                        style={{ color: "var(--blue)" }}
                        onClick={() => {
                          setModalOpen(!modalOpen);
                          setnewModalOpen(!newmodalOpen);
                        }}
                      >
                        Not registered?
                      </span>
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
});

export default ResumeMainContent;
