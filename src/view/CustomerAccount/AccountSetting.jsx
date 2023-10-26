import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
const schema = yup
  .object()
  .shape({
    fname: yup.string().required('Vorname ist erforderlich.'),
    lname: yup.string().required('Nachname ist erforderlich.'),
    city: yup.string().required('Stadt ist erforderlich.'),
    country: yup.string().required('Ländername ist erforderlich.'),
    zipcode: yup.string().required('Postleitzahl ist erforderlich.'),
    phone: yup.string().required('Telefon-Nr. ist erforderlich.'),
  })
  .required();
const schemaSecond = yup
  .object()
  .shape({
    oldPassword: yup.string().required('Altes Passwort ist erforderlich.').min(6),
    newPassword: yup.string().required('Neues Passwort ist erforderlich.').min(6),
    confirmPassword: yup
      .string()
      .required('Passwort bestätigen ist erforderlich.')
      .min(6),
  })
  .required();
const AccountSetting = () => {
  const {t} = useTranslation();
  //applyin validation to the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(schemaSecond),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPass, setModalOpenPass] = useState(false);
  const [modalOpenAcc, setModalOpenAcc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current_password, setcurrent_password] = useState('');
  const [new_password, setnew_password] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const loginData = useSelector(
    (store) => store.resumeData.loginData.data.userInfo
  );

  const updateUserProfile = () => {
    setLoading(true);
    axios.post(
      `${process.env.REACT_APP_BASE_URL}/update-profile`,
      {
        first_name: fname,
        last_name: lname,
        city: city,
        country: country,
        zip_code: pincode,
        phone: phone,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    setLoading(false);
    setModalOpenAcc(!modalOpenAcc);
  };
  const clearState = () => {
    setcurrent_password({ current_password: '' });
    setnew_password({ new_password: '' });
    setconfirm_password({ confirm_password: '' });
  };

  // Get Profile-Info

  const getProfileInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/profile-info`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setFname(res.data.data.firstname);
      setLname(res.data.data.lastname);
      setCity(res.data.data.city);
      setCountry(res.data.data.country);
      setPincode(res.data.data.zip_code);
      setPhone(res.data.data.phone);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getProfileInfo();
    // eslint-disable-next-line
  }, []);

  //update password
  const token = localStorage.getItem('login_register_token');
  const Updatepassword = async () => {
    setLoading(true);
    try {
      if (new_password !== confirm_password) {
        toast.error('Password not match');
        setLoading(false);

        return;
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/update-password`,
          {
            current_password,
            new_password,
            confirm_password,
          },
          {
            headers: {
              'Content-Type': 'Application/json',
              Authorization: `${token}`,
            },
          }
        );
        toast.success(`${res.data.message}`);
        if (res.data.status === 200) {
        }
      }
      setLoading(false);
      clearState();
      setModalOpenPass(!modalOpenPass);
    } catch (error) {
      setLoading(false);
      console.log(error);

      if (error.response.data.status === 404) {
        toast.error(`${error.response.data.message}`);
      }
      setModalOpenPass(modalOpenPass);
    }
  };

  return (
    <>
      <h4 className="tab-title mb-4">{t('General Account Settings')}</h4>
      <div className="acc-setting">
        <ul className="account-info-list">
          {/* <li>
              <span className="account-info-item">Account ID:</span>
              <span className="account-info">354451707</span>
            </li> */}
          <li>
            <span className="account-info-item">Email ID:</span>
            <span className="account-info">{loginData && loginData.email}</span>
            {/* <span
                className="link cursor-pointer"
                onClick={() => setModalOpen(!modalOpen)}
                style={{ color: "var(--blue)" }}
              >
                <i className="fa fa-pencil edit-icon"></i>
                <span className="hidden-sm-down">edit</span>
              </span> */}
          </li>
          <li>
            <span className="account-info-item">{t('Password')}:</span>
            <span className="account-info">******</span>
            <span
              className="link cursor-pointer"
              onClick={() => setModalOpenPass(!modalOpenPass)}
              style={{ color: 'var(--blue)' }}
            >
              <i className="fa fa-pencil edit-icon"></i>
              <span className="hidden-sm-down">{t('Edit')}</span>
            </span>
          </li>
          <li>
            <span className="account-info-item">{t('Contact Info')}:</span>
            <p className="account-info">
              <div className="account-info-item">{t('CITY')} : </div>
              {city ? city : ' Update City'}
              <br />
              <span className="block-elem">
                <div className="account-info-item">{t('COUNTRY')} : </div>

                {country ? country : 'Update Country'}
              </span>
              <br />
              <span className="block-elem">
                <div className="account-info-item">{t('PHONE')} : </div>
                {phone ? phone : 'Update Number'}
              </span>
            </p>
            <span
              className="link cursor-pointer"
              onClick={() => setModalOpenAcc(!modalOpenAcc)}
              style={{ color: 'var(--blue)' }}
            >
              <i className="fa fa-pencil edit-icon"></i>
              <span className="hidden-sm-down">{t('Edit')}</span>
            </span>
          </li>
        </ul>
      </div>
      {/* customer email modal */}
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog more-info-modal account-email"
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
                <h2 className="modal-title h4 mb-3 text-blue">Account Email</h2>
                <p className="p mb-0">
                  <form className="f-14">
                    <div className="form-group">
                      <label>EDIT YOUR ACCOUNT EMAIL ADDRESS</label>
                      <input
                        type="eamil"
                        className="form-control"
                        placeholder="resume_builder@gmail.com"
                      />
                    </div>
                  </form>
                </p>
              </div>
            </div>
          </div>
          <div className="custom-modal-footer">
            <div className="row">
              <div className="col-sm-12 pd-0 text-center">
                <button
                  className="btn site-btn bg-blue text-white"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  saveeee
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* account password modal */}
      <Modal
        toggle={() => setModalOpenPass(!modalOpenPass)}
        isOpen={modalOpenPass}
        className="modal-dialog more-info-modal account-email"
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpenPass(!modalOpenPass);
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
                <h2 className="modal-title h4 mb-3 text-blue">{t('Password')}</h2>
                <p className="p mb-0">
                  <form
                    className="f-14"
                    onSubmit={handleSubmit1(Updatepassword)}
                  >
                    <div className="form-group">
                      <label>{t('CHANGE YOUR PASSWORD')}</label>
                      {/* <label>Old Password</label> */}

                      <input
                        name="current_password"
                        value={current_password}
                        type="password"
                        {...register1('oldPassword', {
                          onChange: (e) => {
                            setcurrent_password(e.target.value);
                          },
                        })}
                        className="form-control mb-3"
                        placeholder={t("Enter current password")}
                      />

                      <p className="mb-0">
                        <small className="text-danger">
                          {errors1.oldPassword?.message}
                        </small>
                      </p>
                      {/* <label>New password</label> */}
                      <input
                        name="new_password"
                        value={new_password}
                        type="password"
                        {...register1('newPassword', {
                          onChange: (e) => {
                            setnew_password(e.target.value);
                          },
                        })}
                        className="form-control mb-3"
                        placeholder={t("Enter new password")}
                      />
                      <p className="mb-0">
                        <small className="text-danger">
                          {errors1.newPassword?.message}
                        </small>
                      </p>
                      {/* <label>Confirm password</label> */}
                      <input
                        name="confirm_password"
                        value={confirm_password}
                        type="password"
                        {...register1('confirmPassword', {
                          onChange: (e) => {
                            setconfirm_password(e.target.value);
                          },
                        })}
                        className="form-control mb-3"
                        placeholder={t("Confirm new password")}
                      />
                      <small className="text-danger">
                        {errors1.confirmPassword?.message}
                      </small>
                    </div>
                    <div className="custom-modal-footer">
                      <div className="row">
                        <div className="col-sm-12 pd-0 text-center">
                          {loading ? (
                            <Spinner animation="border" variant="warning" />
                          ) : (
                            <Button
                              type="submit"
                              value="Submit"
                              className="btn site-btn bg-blue text-white"
                            >
                              {t('Save')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* account contact-info modal */}
      <Modal
        toggle={() => setModalOpenAcc(!modalOpenAcc)}
        isOpen={modalOpenAcc}
        className="modal-dialog download-resume-dialog more-info-modal "
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpenAcc(!modalOpenAcc);
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
                <h2 className="modal-title h4 mb-3 text-blue">{t('Contact Info')}</h2>
                <p className="p mb-0">
                  <form
                    className="f-14 customer-modal-edit"
                    onSubmit={handleSubmit(updateUserProfile)}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>{t('FIRST NAME')}</label>
                          <input
                            name="first_name"
                            value={fname}
                            {...register('fname', {
                              onChange: (e) => {
                                setFname(e.target.value);
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="Jackson"
                          />
                          <small className="text-danger">
                            {errors.fname?.message}
                          </small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>{t('LAST NAME')}</label>
                          <input
                            name="last_name"
                            value={lname}
                            {...register('lname', {
                              onChange: (e) => {
                                setLname(e.target.value);
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="Barrera"
                          />
                          <small className="text-danger">
                            {errors.lname?.message}
                          </small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>{t('CITY')}</label>
                          <input
                            name="city"
                            value={city}
                            {...register('city', {
                              onChange: (e) => {
                                setCity(e.target.value);
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="City Name"
                          />
                          <small className="text-danger">
                            {errors.city?.message}
                          </small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label> {t('COUNTRY')}</label>
                          <input
                            type="text"
                            name="country"
                            value={country}
                            {...register('country', {
                              onChange: (e) => {
                                setCountry(e.target.value);
                              },
                            })}
                            className="form-control"
                            placeholder="e.g. India"
                          />
                          <small className="text-danger">
                            {errors.country?.message}
                          </small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>{t('ZIP CODE')}</label>
                          <input
                            name="zip_code"
                            value={pincode}
                            {...register('zipcode', {
                              onChange: (e) => {
                                setPincode(e.target.value);
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="78799"
                          />
                          <small className="text-danger">
                            {errors.zipcode?.message}
                          </small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>{t('PHONE')}</label>
                          <input
                            name="phone"
                            value={phone}
                            {...register('phone', {
                              onChange: (e) => {
                                setPhone(e.target.value);
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="+ 1 (207) 158-5028"
                          />
                          <small className="text-danger">
                            {errors.phone?.message}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="custom-modal-footer">
                      <div className="row">
                        <div className="col-sm-6 col-6 pd-0"></div>
                        <div className="col-sm-6 col-6 pd-0 text-right">
                          {loading ? (
                            <Spinner animation="border" variant="warning" />
                          ) : (
                            <Button
                              className="btn site-btn bg-blue text-white"
                              // onClick={() => updateUserProfile()}
                              type="submit"
                              value="Submit"
                            >
                              {t('Save')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountSetting;
