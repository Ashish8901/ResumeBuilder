import React from "react";
import { UncontrolledCollapse } from "reactstrap";
import CaretBlue from "../../assets/blue-caret.png";
// import {Link} from 'react-router-dom'
import LanguageDropdown from "../../components/Language-dropdown";
import {useTranslation} from "react-i18next"
import i18next from "i18next"
const AccessTemplate = () => {
  const { t } = useTranslation();
  const handleClick = (e)=>{
    // console.log(`Language will change to =>`, e.target.value);
    i18next.changeLanguage(e.target.value);
  }
  return (
    <section className="choose-template-section accessbility-page">
      <div className="access-top-sec " id="blade-0">
        <h1 className="text-center mb-0">
        {t('Resume Builder is Accessible to All')}
        </h1>
        <LanguageDropdown onChange={handleClick}/>
      </div>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-md-4 mb-5">
            <div className="sticky-top left-aligned">
              <div className="cursor-pointer border table-top" id="toggler">
                <h4 className="mb-0">
                  Table of Contents
                  <span className="icon-img">
                    <img src={CaretBlue} alt="" />
                  </span>
                </h4>
              </div>
              <UncontrolledCollapse toggler="#toggler" defaultOpen={true}>
                <div className="border table-content">
                  <ul>
                    <li>
                      <a rel="noreferrer" href="#blade-0">
                        Resume Builder is Accessible to All
                      </a>
                    </li>
                    <li>
                      <a href="#blade-1">
                        Screen Reader and Browser Combinations
                      </a>
                    </li>
                    <li>
                      <a href="#blade-2">Telephone Services</a>
                    </li>
                    <li>
                      <a href="#blade-3"> Email us</a>
                    </li>
                  </ul>
                </div>
              </UncontrolledCollapse>
            </div>
          </div>
          <div className="col-md-8">
            <div className="pb-50">
              <div className="mb-4">
                Just as we at Resume Builder are dedicated to giving you the
                resources, knowledge and expert advice you need to land the job
                you want, we’re also committed to making&nbsp;
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://newcareerbusiness.com/"
                >
                  Resume Builder
                </a>
                &nbsp;accessible to all its visitors, including those with
                visual and/or other disabilities. We’ve taken steps to ensure
                that those who solely use a keyboard for navigation, require
                accommodations for vision-related needs, or use assistive
                technologies such as screen readers can easily interact with the
                content and applications on&nbsp;
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://newcareerbusiness.com/"
                >
                  &nbsp;Resume Builder
                </a>
                .
              </div>
              <div>
                We’ve been guided in these efforts by federal regulations
                related to the Rehabilitation Act that are designed to make
                websites more accessible, as well as the Website Content
                Accessibility Guidelines (WCAG) provided by the World Wide Web
                Consortium. Currently, this site contains some{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize&versions=2.0&levels=aa%2Caaa"
                >
                  WCAG Level A compliant
                </a>
                pages, and we’re working diligently to get it fully upgraded to
                an AA level of compliance.
              </div>
            </div>
            <hr />
            <div className="pt-50 pb-50" id="blade-1">
              <div className="editor-content">
                <h2 className="mb-4">Screen Reader and Browser Combinations</h2>
                <p className="mb-4">
                  <strong>
                    To improve your experience with this site, we recommend
                    these screen reader and browser combinations:
                  </strong>
                </p>
                <ul className="access-list">
                  <li>For Windows users: NVDA and Chrome or Edge</li>
                  <li>For Mac users: VoiceOver and Safari</li>
                  <li>
                    For mobile users: VoiceOver for the iPhone and TalkBack for
                    Android devices
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="pt-50 pb-50" id="blade-2">
              <div className="editor-content">
                <h2 className="mb-4">Telephone Services</h2>
                <p>
                  <strong>Need more assistance? </strong>We provide fully
                  accessible 24/7 telephone service with a trained customer
                  service representative. Call us directly at (866) 599-7946 for
                  support. You may also reach out to us by email at
                  customerservice@resumebuilder.com.
                </p>
              </div>
            </div>
            <hr />
            <div className="pt-50" id="blade-3">
              <h2 className="mb-4">Email Us</h2>
              <form className="access-from">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="semi-bold">Name</label>
                      <input placeholder="Type your name" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="semi-bold">Email Address</label>

                      <input
                        placeholder="Type your email address"
                        type="email"
                      />
                    </div>
                    <div className="form-group">
                      <label className="semi-bold">Questions or Comments</label>

                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Type your email address"
                        type="email"
                      />
                    </div>
                    <div className="mt-5">
                      <button
                        type="button"
                        className="access-sub btn site-btn bg-blue text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessTemplate;
