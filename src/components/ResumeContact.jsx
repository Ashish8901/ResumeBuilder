import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addHeading } from '../redux/features/headingSlice';

const ResumeContact = () => {
  const dispatch = useDispatch();
  const initialHeadingState = {
    fname: '',
    lname: '',
    city: '',
    country: '',
    pincode: '',
    phone: '',
    email: '',
  };
  const [heading, setHeading] = useState(initialHeadingState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHeading({ ...heading, [name]: value });
  };
  const saveHeading = () => {
    const { fname, lname, city, country, pincode, phone, email } = heading;
    dispatch(addHeading({ fname, lname, city, country, pincode, phone, email }))
      .unwrap()
      .then((data) => {
        setHeading({
          id: data.id,
          fname: data.title,
          lname: data.lname,
          city: data.city,
          country: data.country,
          pincode: data.pincode,
          phone: data.phone,
          email: data.email,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <form className="resume-contact-form">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="fname"
                value={heading.fname}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. Saanvi"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Surname</label>
              <input
                type="text"
                name="lname"
                value={heading.lname}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. Patel"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={heading.city}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. New Delhi"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={heading.country}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. India"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>Pin Code</label>
              <input
                type="text"
                name="pincode"
                value={heading.pincode}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. 110034"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                value={heading.phone}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. +91 22 1234 5677"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={heading.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. saanvipatel@sample.in"
                required
              />
            </div>
          </div>
        </div>
  
      </form>
    </>
  );
};

export default ResumeContact;
