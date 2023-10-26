import React, { useState } from 'react';
import ChooseTemplateButton from './ChooseTemplateButton';

const ResumeTemplateFinal = () => {
  const [color, setColor] = useState("var(--default-template)");
  const [textColor, setTextColor] = useState('#fff');
  return (
    <>
      <section className="choose-template-section pt-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center">
                <h1 className="chosse-page-title">
                  Choose from our&nbsp;<strong>best templates</strong>&nbsp;for
                  &nbsp;<strong>Student</strong>
                </h1>
                <div className="template-color-code">
                  <h6 className="clr-head semi-bold inline-block uppercase">
                    Color
                  </h6>
                  <div className="inline-block">
                    <ul className="inline-block resume-color-list">
                      <li className="color-item ">
                        <label
                          className="color-selector root-color"
                          onClick={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                          onMouseEnter={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--default-template)"}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--rootcolor)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onClick={() => {
                            setColor("var(--dark-green)");
                            setTextColor("var(--white)");
                          }}
                          onMouseEnter={() => {
                            setColor("var(--dark-green)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--dark-green)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--dark-green)"}
                          />
                          <span
                            className="color-selector-radio root-color"
                            style={{ backgroundColor: "var(--dark-green)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onClick={() => {
                            setColor("var(--essential-ecru)");
                            setTextColor("var(--white)");
                          }}
                          onMouseEnter={() => {
                            setColor("var(--essential-ecru)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--essential-ecru)"}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--essential-ecru)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onClick={() => {
                            setColor("var(--clever-blue)");
                            setTextColor("var(--white)");
                          }}
                          onMouseEnter={() => {
                            setColor("var(--clever-blue)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--clever-blue)"}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--clever-blue)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onClick={() => {
                            setColor("var(--quality-azure)");
                            setTextColor("var(--white)");
                          }}
                          onMouseEnter={() => {
                            setColor("var(--quality-azure)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--quality-azure)"}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--quality-azure)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onClick={() => {
                            setColor("var(--delight-mint)");
                            setTextColor("var(--white)");
                          }}
                          onMouseEnter={() => {
                            setColor("var(--delight-mint)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--delight-mint)"}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--delight-mint)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            setColor("var(--standout-ruby)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                          onClick={() => {
                            setColor("var(--standout-ruby)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--standout-ruby)"}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--standout-ruby)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            setColor("var(--savvy-salmon)");
                            setTextColor("var(--white)");
                          }}
                          onClick={() => {
                            setColor("var(--standout-ruby)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--savvy-salmon)"}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--savvy-salmon)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            setColor("var(--optimistic-amber)");
                            setTextColor("var(--white)");
                          }}
                          onClick={() => {
                            setColor("var(--optimistic-amber)");
                            setTextColor("var(--white)");
                          }}
                          onMouseLeave={() => {
                            setColor("var(--default-template)");
                            setTextColor("var(--white)");
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--optimistic-amber)"}
                          />
                          <span
                            className="color-selector-radio"
                            style={{
                              backgroundColor: "var(--optimistic-amber)",
                            }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-5 resume-box">
            {/* template-one */}
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="resume-template-box">
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      className="resume-one-table"
                      style={{ width: "100%" }}
                    >
                      <tr>
                        <td colSpan={2} style={{ width: "100%" }}>
                          <div
                            className="top-heading"
                            style={{ background: color, color: textColor }}
                          >
                            <div className="top-icon">FA</div>
                            <div className="name-here">First Name</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="pt-5"
                          style={{ width: "60%", paddingRight: "30px" }}
                        >
                          <div className="summay-box">
                            <h1 className="resume-heading">
                              Professional Summary
                            </h1>
                            <div className="singlecolumn">
                              Motivated Sales Associate with 5 years of
                              experience boosting sales and customer loyalty
                              through individualized service. Resourceful expert
                              at learning customer needs, directing to desirable
                              merchandise and upselling to meet sales quotas.
                              Committed to strengthening customer experiences
                              with positivity and professionalism when answering
                              requests and processing sales.
                            </div>
                          </div>
                          <hr
                            style={{ borderTop: "2px solid rgba(0,0,0,.1)" }}
                          ></hr>
                          <div className="work-history-box">
                            <h1 className="resume-heading">Work History</h1>
                            <p className="semi-bold mb-0">
                              H & M Retail Sales Associate
                            </p>
                            <p className="city-name mb-0">New Delhi, India</p>
                            <p className="Date mb-0">May 2016 - Current</p>
                            <ul>
                              <li>
                                Effectively upsold products by introducing
                                accessories and other add-ons, adding ₹3000 to
                                average monthly sales.
                              </li>
                              <li>
                                Generated brand awareness and positive product
                                impressions to increase sales 22%.
                              </li>
                              <li>
                                Used consultative sales approach to understand
                                customer needs and recommend relevant offerings.
                              </li>
                            </ul>
                          </div>
                          <hr
                            style={{ borderTop: "2px solid rgba(0,0,0,.1)" }}
                          ></hr>
                          <div className="language-box">
                            <h1 className="resume-heading">Languages</h1>
                            <p className="semi-bold mb-2">
                              <span>Hindi</span> : Native Language
                            </p>
                            <div className="row">
                              <div className="col-6">
                                <p className="percent mb-1 ">
                                  <span>Hindi</span>
                                  <span>100</span>
                                </p>
                                <div className="percent-box">
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                </div>
                                <p className="percent">
                                  <span>Percentage</span>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="percent mb-1 ">
                                  <span>English</span>
                                  <span>100</span>
                                </p>
                                <div className="percent-box">
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                  <div
                                    className="percent-clr"
                                    style={{ background: color }}
                                  ></div>
                                </div>
                                <p className="percent">
                                  <span>Percentage</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="clr-dark"
                          style={{
                            width: "40%",
                            backgroundColor: "var(--resume-bg)",
                            height: "100%",
                            padding: "20px",
                          }}
                        >
                          <div className="pt-4" style={{}}>
                            <div className="socail-info">
                              <p className="mb-1">
                                <span className="resume-icon">
                                  <i className="fa fa-envelope"></i>
                                </span>
                                saanvipatel@sample.in
                              </p>
                              <p className="mb-1">
                                <span className="resume-icon">
                                  <i
                                    className="fa fa-phone"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                + 01 234 56789
                              </p>
                              <p className="mb-1">
                                <span className="resume-icon">
                                  <i
                                    className="fa fa-map-marker"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                New Delhi, India 110034
                              </p>
                            </div>
                            <hr
                              style={{ borderTop: "2px solid rgba(0,0,0,.1)" }}
                            ></hr>
                            <div className="skill-list">
                              {" "}
                              <h1 className="resume-heading">Skills</h1>
                              <ul>
                                <li>Store opening and closing</li>
                                <li>Sales expertise</li>
                                <li>Accurate Money Handling</li>
                                <li>Store Merchandising</li>
                                <li>Loss prevention</li>
                                <li>Product promotions</li>
                                <li>Guest Services</li>
                                <li>Point of Sale Systems</li>
                              </ul>
                            </div>
                            <hr
                              style={{ borderTop: "2px solid rgba(0,0,0,.1)" }}
                            ></hr>
                            <div className="skill-list">
                              <h1 className="resume-heading">Education</h1>
                              <p className="mb-0">June 2016</p>
                              <p className="mb-0">School Of English</p>
                              <p className="mb-0">New Delhi, India</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* template-two */}
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="resume-template-box resume-sec-temp">
                <table className="resume-table">
                  <tr>
                    <td
                      className="name-detail resume-pd-sec w-40"
                      style={{
                        background: color,
                        color: textColor,
                        marginBottom: "-2px",
                      }}
                    >
                      <div>
                        <div className="opacit-1">
                          <div className="Name-heading">
                            <h1>
                              Your <br />
                              Name
                            </h1>
                          </div>
                          <div className="socail-info">
                            <p className="mb-1">
                              <span className="resume-icon">
                                <i
                                  className="fa fa-envelope"
                                  style={{
                                    color: color,
                                  }}
                                ></i>
                              </span>
                              saanvipatel@sample.in
                            </p>
                            <p className="mb-1">
                              <span className="resume-icon">
                                <i
                                  style={{
                                    color: color,
                                  }}
                                  className="fa fa-phone"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              + 01 234 56789
                            </p>
                            <p className="mb-1">
                              <span className="resume-icon">
                                <i
                                  style={{
                                    color: color,
                                  }}
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              New Delhi, India 110034
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className="fade-bg resume-pd-sec"
                      style={{ background: color }}
                    >
                      <div>
                        <div className="opacit-1">
                          <div className="summay-box">
                            <h1 className="resume-heading">
                              Professional Summary
                            </h1>
                            <div className="singlecolumn">
                              Motivated Sales Associate with 5 years of
                              experience boosting sales and customer loyalty
                              through individualized service. Resourceful expert
                              at learning customer needs, directing to desirable
                              merchandise and upselling to meet sales quotas.
                              Committed to strengthening customer experiences
                              with positivity and professionalism when answering
                              requests and processing sales.
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fade-bg resume-pd-sec"
                      style={{ background: color }}
                    >
                      <div className="opacit-1">
                        <div className="skill-list">
                          <h1 className="resume-heading">Skills</h1>
                          <ul>
                            <li>Store opening and closing</li>
                            <li>Sales expertise</li>
                            <li>Accurate Money Handling</li>
                            <li>Store Merchandising</li>
                            <li>Loss prevention</li>
                            <li>Product promotions</li>
                            <li>Guest Services</li>
                            <li>Point of Sale Systems</li>
                          </ul>
                        </div>
                        <div className="education-detail">
                          <h1 className="resume-heading">Education</h1>
                          <p className="mb-0">June 2016</p>
                          <p className="mb-0">School Of English</p>
                          <p className="mb-0">New Delhi, India</p>
                        </div>
                      </div>
                    </td>
                    <td className="resume-pd-sec">
                      <div className="work-history-box mb-5">
                        <h1 className="resume-heading">Work History</h1>
                        <p className="semi-bold mb-0">
                          H & M Retail Sales Associate
                        </p>
                        <p className="city-name mb-0">New Delhi, India</p>
                        <p className="Date mb-0">May 2016 - Current</p>
                        <ul>
                          <li>
                            Effectively upsold products by introducing
                            accessories and other add-ons, adding ₹3000 to
                            average monthly sales.
                          </li>
                          <li>
                            Generated brand awareness and positive product
                            impressions to increase sales 22%.
                          </li>
                          <li>
                            Used consultative sales approach to understand
                            customer needs and recommend relevant offerings.
                          </li>
                        </ul>
                      </div>
                      <div className="language-box">
                        <h1 className="resume-heading">Languages</h1>
                        <p className="semi-bold mb-2">
                          <span>Hindi</span> : Native Language
                        </p>
                        <div className="row">
                          <div className="col-6">
                            <p className="percent mb-1 ">
                              <span>Hindi</span>
                              <span>100</span>
                            </p>
                            <div className="percent-box">
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                            </div>
                            <p className="percent">
                              <span>Percentage</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="percent mb-1 ">
                              <span>English</span>
                              <span>100</span>
                            </p>
                            <div className="percent-box">
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                            </div>
                            <p className="percent">
                              <span>Percentage</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            {/* template-three */}
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="resume-template-box resume-sec-temp resume-third-temp">
                <table className="resume-table-third">
                  <tr>
                    <td
                      className="fade-bg resume-pd-sec"
                      style={{ background: color, width: "50%" }}
                    >
                      <div className="opacit-1">
                        <h1>First Name</h1>
                      </div>
                    </td>
                    <td
                      className="fade-bg resume-pd-sec"
                      style={{ background: color, width: "50%" }}
                    >
                      <div className="opacit-1 social-info-third">
                        <p>
                          <strong>Email :</strong> saanvipatel@sample.in
                        </p>
                        <p>
                          <strong>Contact :</strong> + 01 234 56789
                        </p>
                        <p>
                          <strong>Address :</strong> New Delhi, India 110034
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="resume-pd-sec" style={{ width: "60%" }}>
                      <div
                        className="summay-box"
                        style={{ marginBottom: "40px" }}
                      >
                        <h1 className="resume-heading-third">
                          Professional Summary
                        </h1>
                        <div className="singlecolumn">
                          Motivated Sales Associate with 5 years of experience
                          boosting sales and customer loyalty through
                          individualized service. Resourceful expert at learning
                          customer needs, directing to desirable merchandise and
                          upselling to meet sales quotas. Committed to
                          strengthening customer experiences with positivity and
                          professionalism when answering requests and processing
                          sales.
                        </div>
                      </div>
                      <div className="work-history-box mb-5">
                        <h1 className="resume-heading-third">Work History</h1>
                        <p className="semi-bold mb-0">
                          H & M Retail Sales Associate
                        </p>
                        <p className="city-name mb-0">New Delhi, India</p>
                        <p className="Date mb-0">May 2016 - Current</p>
                        <ul>
                          <li>
                            Effectively upsold products by introducing
                            accessories and other add-ons, adding ₹3000 to
                            average monthly sales.
                          </li>
                          <li>
                            Generated brand awareness and positive product
                            impressions to increase sales 22%.
                          </li>
                          <li>
                            Used consultative sales approach to understand
                            customer needs and recommend relevant offerings.
                          </li>
                        </ul>
                      </div>
                      <div className="language-box">
                        <h1 className="resume-heading-third">Languages</h1>
                        <p className="semi-bold mb-2">
                          <span>Hindi</span> : Native Language
                        </p>
                        <div className="row">
                          <div className="col-6">
                            <p className="percent mb-1 ">
                              <span>Hindi</span>
                              <span>100</span>
                            </p>
                            <div className="percent-box">
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                            </div>
                            <p className="percent">
                              <span>Percentage</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="percent mb-1 ">
                              <span>English</span>
                              <span>100</span>
                            </p>
                            <div className="percent-box">
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                              <div
                                className="percent-clr"
                                style={{ background: color }}
                              ></div>
                            </div>
                            <p className="percent">
                              <span>Percentage</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="resume-pd-sec" style={{ width: "40%" }}>
                      <div className="summay-box">
                        <div
                          className="skill-list"
                          style={{ marginBottom: "40px" }}
                        >
                          <h1 className="resume-heading-third">Skills</h1>
                          <ul>
                            <li>Store opening and closing</li>
                            <li>Sales expertise</li>
                            <li>Accurate Money Handling</li>
                            <li>Store Merchandising</li>
                            <li>Loss prevention</li>
                            <li>Product promotions</li>
                            <li>Guest Services</li>
                            <li>Point of Sale Systems</li>
                          </ul>
                        </div>
                        <div className="education-detail">
                          <h1 className="resume-heading-third">Education</h1>
                          <p className="mb-0">June 2016</p>
                          <p className="mb-0">School Of English</p>
                          <p className="mb-0">New Delhi, India</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ChooseTemplateButton />
      </section>
    </>
  );
};

export default ResumeTemplateFinal;
