import { useState, useEffect } from 'react';

import BrandLogo from "../../assets/newcareerbusiness__1__2.png";
import axios from 'axios';
//import the things that is required in more options

import {
  handleFacebookLogin,
  handleGoogleLogin,
  loginUser,
} from '../../redux/features/resumeSlice';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import ScreenLeft from '../../view/StepScreen/ScreenLeft';
import ScreenRight from '../../view/StepScreen/ScreenRight';

import FacebookLogin from 'react-facebook-login';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { Modal } from 'reactstrap';
import { toast } from 'react-toastify';
//-------
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
  email: yup.string().email().required().max(80),
  password: yup.string().required(),
});

const SignUpLogin = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const [pathname, setPathname] = useState('');
  const [enableHader, setEnableHader] = useState(false);
  //   let isStudent = localStorage.getItem('isStudent') || null;
  let finalResume = localStorage.getItem('FinalResume') || null;
  //adding two states when user clickc on more option
  const [modalOpen, setModalOpen] = useState(true);
  const [
    saveNext,
    // eslint-disable-next-line
    setSaveNext,
  ] = useState(true);
  const [newmodalOpen, setnewModalOpen] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [newemail, setnewEmail] = useState('');
  const [newPassword, setNewPassword] = useState({
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [forgotPasswordnewmodalOpen, forgotPasswordsetnewModalOpen] =
    useState(false);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/experience-level' ||
      pathname === '/select-country' ||
      pathname === '/choose-template' ||
      (pathname === '/resume' && finalResume === 'true') ||
      pathname === '/Work-summary' ||
      (pathname === '/work-expr-form' && finalResume === 'true') ||
      pathname === '/edu-summary' ||
      (pathname === '/edu-del' && finalResume === 'true') ||
      (pathname === '/add-skill' && finalResume === 'true') ||
      (pathname === '/lngg' && finalResume === 'true') ||
      pathname === '/final-resume'
    ) {
      setEnableHader(false);
    } else setEnableHader(true);
  }, [pathname, enableHader, finalResume]);

  //   const ExprData = useSelector((store) => store.workExprData.workExpr.jobsData);
  //   const eduData = useSelector(
  //     (store) => store.resumeData.degreeData.degreesData
  //   );
  //   const skillsData = useSelector((store) => store.skillsData.Skills);
  //   const summaryData = useSelector((store) => store.summaryData.Summary);
  //   const contactData = useSelector((store) => store.resumeData.heading.data);
  //adding more options states
  const loginDatas = useSelector((store) => store.resumeData); //get login status
  const loadingResponse = loginDatas?.loginData?.loading;
  //   const loginData = useSelector((store) => store.resumeData.loginData.data);

  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');

  //more options functionalities
  const facebookClick = () => {
    console.log('clicked');
  };
  const facebookLogin = (response) => {
    dispatch(handleFacebookLogin(response)).then((res) => {
      if (res?.payload?.status === 200) {
        toast.success('Login Successfully');
        // navigate("/customer");
        if (saveNext) {
          // if (!subscriptionPlan?.current_plan) {
          // navigate("/payment");
          // } else {
          navigate('/customer');
          // }
        } else {
          // navigate("/customer");
          setModalOpen(!modalOpen);
          // navigate("/customer");
        }
      } else {
        toast.error('Invalid Credentials');
        //   navigate("/");
      }
    });
  };
  //
  const handleLogin = (googleData) => {
    dispatch(handleGoogleLogin(googleData)).then((res) => {
      if (res?.payload?.status === 200) {
        toast.success('Login Successfully');
        if (saveNext) {
          // if (
          //   subscriptionPlan?.current_plan?.subscription_billing?.status === "2"
          // ) {
          // navigate("/payment");

          // else {
          navigate('/customer');
          // }
        } else {
          // navigate("/customer");
          setModalOpen(!modalOpen);
          // navigate("/customer");
        }
        // navigate("/customer");
      } else {
        toast.error('Invalid Credentials');
        //   navigate("/");
      }
    });
  };
  // const handleFailure = async (result) => {
  //   alert(result);
  // };
  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = async () => {
    await dispatch(
      loginUser({
        email: loginEmail,
        password: loginPassword,
      })
    )
      .then((res) => {
        if (res?.payload?.status === 200) {
          toast.success('Login Successfully');

          if (res?.payload?.subscription_status !== 1) {
            navigate('/payment');
          } else {
            navigate('/customer');
          }

          // navigate("/customer");
        } else {
          toast.error('Invalid Credentials');
        }
      })
      .catch((e) => {
        return e;
      });
  };

  const handleSubmits = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgot-password`,
        { email: newemail }
      );
      if (res.data.status === 200) {
        setValidEmail(true);
      } else {
        alert('email not exist');
      }

      setLoading(false);
    } catch (res) {
      console.log(res, 'err');
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setnewEmail(e.target.value);
  };
  ////////////////////// reset password //////////////////////////////
  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (newPassword.password !== newPassword.confirmPassword) {
        toast.error("confirm password doesn't match");
        return;
      } else {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/reset-password`, {
            password: newPassword.password,
            code: newPassword.code,
          })
          .then((res) => {
            setLoading(false);
          });
      }
    } catch (err) {
      setLoading(false);
      return err;
    }
  };
  const handleNewPassword = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };
  // useEffect(()=>
  // {
  //     setSaveNext(false);
  //                 setModalOpen(!modalOpen);

  // },[])

  return (
    <div>
      <div className="header border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="step-header pt-2 pb-2">
                <div className="brand-logo mt-1 mb-1">
                  <div>
                    <img src={BrandLogo} alt="" />
                  </div>
                </div>
                {/* {pathname==="/signup-login"&& */}
                <div className="more-opt">
                  <span
                    className="text-decoration cursor-pointer"
                    style={{ color: "var(--blue)" }}
                    onClick={() => {
                      //        setSaveNext(false);
                      setModalOpen(!modalOpen);
                    }}
                  >
                    SignIn
                    <i className="ml-2 fa fa-chevron-down" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="pd-container">
            <div className="row">
              <div className="col-lg-6">
                <ScreenLeft />
              </div>
              <div className="col-lg-6">
                <ScreenRight />
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  Log in your account
                </h2>
                <div className="social-wrapper">
                  <div className="btn-social" style={{ padding: "0px" }}>
                    <span className="mr-3">
                      <FacebookLogin
                        appId="776337413544959"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,user_friends,email"
                        onClick={facebookClick}
                        callback={facebookLogin}
                        icon="fa-facebook"
                      />
                    </span>
                  </div>

                  <div className="btn-social" style={{ padding: "0px" }}>
                    <span className="mr-3">
                      <GoogleLogin
                        className="kep-login-google metro"
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log In with google"
                        onSuccess={handleLogin}
                        // onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                      ></GoogleLogin>
                    </span>
                  </div>
                </div>
                <p className="optional-or ">
                  <span>OR</span>
                </p>
                <form
                  onSubmit={handleSubmit(login)}
                  className="f-14 social-connect-form"
                >
                  <div className="form-group">
                    <label className="">Email</label>
                    <input
                      name="loginEmail"
                      type="text"
                      className="form-control"
                      placeholder="test@mailinator.com"
                      value={loginEmail}
                      {...register("email", {
                        onChange: (e) => {
                          setloginEmail(e.target.value);
                        },
                      })}
                    />
                    <small className="text-danger">
                      {errors.email?.message}
                    </small>
                  </div>
                  <div className="form-group">
                    <label className="">Password</label>
                    <input
                      name="loginPassword"
                      type="password"
                      className="form-control"
                      placeholder=""
                      value={loginPassword}
                      {...register("password", {
                        onChange: (e) => {
                          setloginPassword(e.target.value);
                        },
                      })}
                    />
                    <small className="text-danger">
                      {errors?.password?.message}
                      {/* {errorMessage && (
                                <div className="error"> {errorMessage} </div>
                              )} */}
                    </small>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      {loadingResponse ? (
                        <Spinner animation="border" variant="warning" />
                      ) : (
                        <button
                          className="d-block btn site-btn bg-blue text-white"
                          type="submit"
                          value="Submit"
                        >
                          LOGIN
                        </button>
                      )}
                    </div>
                    <div className="col-sm-12 mb-4">
                      <span
                        to=""
                        className="d-block text-center  cursor-pointer"
                        style={{ color: "var(--blue)" }}
                        onClick={() => {
                          forgotPasswordsetnewModalOpen(
                            !forgotPasswordnewmodalOpen
                          );
                          setnewModalOpen(!newmodalOpen);
                          setModalOpen(!modalOpen);
                        }}
                      >
                        Forgot Password
                      </span>
                      <span
                        to=""
                        className="d-block text-center  cursor-pointer"
                        style={{ color: "var(--blue)" }}
                        onClick={() => {
                          navigate("/");
                          // forgotPasswordsetnewModalOpen(!modalOpen);
                          // setnewModalOpen(!newmodalOpen);
                          // setModalOpen(!modalOpen);
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

      {/* Forgot Password */}
      <Modal
        toggle={() =>
          forgotPasswordsetnewModalOpen(!forgotPasswordnewmodalOpen)
        }
        isOpen={forgotPasswordnewmodalOpen}
        className="modal-dialog more-opt-modal download-resume-dialog more-info-modal "
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              forgotPasswordsetnewModalOpen(!forgotPasswordnewmodalOpen);
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
                <h2 className="modal-title h4 mb-3 text-center">Enter Email</h2>
                <section className="pb-5">
                  <div className="container mt-5 pd-bottom">
                    <div className="row">
                      <div className="col-lg-12">
                        <Card className="">
                          <h4 className="mb-0 text-white p-2 bg-blue">
                            Forgot Password?
                          </h4>
                          <Card.Body>
                            <Card.Text>
                              {!validEmail ? (
                                <>
                                  <label>Enter Valid Email</label>
                                  <Form onSubmit={handleSubmits}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Control
                                        name="newemail"
                                        value={newemail}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Enter Email"
                                      />
                                    </Form.Group>
                                    {loading ? (
                                      <Spinner
                                        animation="border"
                                        variant="warning"
                                      />
                                    ) : (
                                      <Button type="submit" variant="primary">
                                        Submit
                                      </Button>
                                    )}
                                  </Form>
                                </>
                              ) : (
                                <>
                                  <h2>Reset Password</h2>
                                  <p>
                                    Please enter the OTP we've sent you on your
                                    registered email address for resetting your
                                    password.
                                  </p>
                                  <Form onSubmit={handleResetPassword}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Label>{/* OTP */}</Form.Label>
                                      <Form.Control
                                        name="code"
                                        value={newPassword.code}
                                        onChange={handleNewPassword}
                                        type="text"
                                        placeholder="Enter code"
                                      />

                                      <Form.Label>
                                        {/* New Password */}
                                      </Form.Label>
                                      <Form.Control
                                        name="password"
                                        value={newPassword.password}
                                        onChange={handleNewPassword}
                                        type="text"
                                        placeholder="Enter New Password"
                                      />

                                      <Form.Label>
                                        {/* Confirm Password */}
                                      </Form.Label>
                                      <Form.Control
                                        name="confirmPassword"
                                        value={newPassword.confirmPassword}
                                        onChange={handleNewPassword}
                                        type="text"
                                        placeholder="Enter Confirm Password"
                                      />
                                    </Form.Group>

                                    {loading ? (
                                      <Spinner
                                        animation="border"
                                        variant="warning"
                                      />
                                    ) : (
                                      <Button type="submit" variant="primary">
                                        Submit
                                      </Button>
                                    )}
                                  </Form>
                                </>
                              )}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpLogin;
