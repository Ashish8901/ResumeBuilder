import React from "react";
import { useTranslation } from "react-i18next";

const ResumeSocialinfo = ({ preview }) => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const headingValues = JSON.parse(
    localStorage.getItem("resume_meta_value_heading")
  );
  // console.log("preview",preview)

  const test = JSON.parse(localStorage.getItem("radActive"));

  return (
    <>
      <div className=" socail-info resume-social-info">
        <h1
          className={`${
            preview === true ? "heading-resume" : "resume-heading"
          }`}
        >
          {t("Contact")}
        </h1>
        <div
          className={`${preview === true ? "paragraph1" : "paragraph"}`}
          style={{ fontSize: "" }}
          id="socialInfo"
        >
          <p className="mb-1 ">
            <span className="resume-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
            </span>

            {headingValues === null && pathname === "/choose-template"
              ? "saanvipatel@sample.in"
              : headingValues?.email?.length === 0 || !headingValues?.email
              ? "saanvipatel@sample.in"
              : headingValues?.email}
          </p>
          <p className="mb-1">
            <span className="resume-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                fill="currentColor"
                className="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                />
              </svg>
            </span>
            {headingValues === null || pathname === "/choose-template"
              ? "+ 01 234 56789"
              : headingValues?.phone?.length === 0
              ? "+ 01 234 56789"
              : headingValues?.phone}
          </p>
          <p className="mb-1">
            <span className="resume-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                fill="currentColor"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
            </span>
            {headingValues === null || pathname === "/choose-template"
              ? "New Delhi"
              : !headingValues?.location &&
                !headingValues?.street &&
                !headingValues?.pincode
              ? ""
              : headingValues?.street?.length !== 0 &&
                headingValues?.location?.length !== 0 &&
                headingValues?.pincode?.length !== 0
              ? `${headingValues?.street}, ${headingValues?.pincode}, ${headingValues?.location}`
              : !headingValues?.street
              ? `, ${headingValues?.pincode}, ${headingValues?.location}`
              : !headingValues?.pincode
              ? `${headingValues?.street}, ${headingValues?.location}`
              : !headingValues?.location
              ? `${headingValues?.street}, ${headingValues?.pincode},`
              : ""}
          </p>

          {/* Extra options start here */}

          {test ? (
            <>
              <div className="extra-icons-social">
                {headingValues?.licence && (
                  <p className="mb-1">
                    <span className="resume-icon">
                      {" "}
                      <i className="fa fa-car" aria-hidden="true"></i>
                    </span>
                    {headingValues?.licence}
                  </p>
                )}{" "}
                {headingValues?.maritalStatus && (
                  <p className="mb-1">
                    <span className="resume-icon marital-icon">
                      <i
                        className="fa fa-circle-o-notch"
                        aria-hidden="true"
                      ></i>
                      {/* <img src="/marital1.png" alt="dsd" /> */}
                    </span>
                    {headingValues?.maritalStatus}
                  </p>
                )}
                {headingValues?.socialLink && (
                  <p className="mb-1">
                    <span className="resume-icon">
                      {" "}
                      <i
                        className="fa fa-share-square-o"
                        aria-hidden="true"
                      ></i>
                    </span>
                    {headingValues?.socialLink}
                  </p>
                )}
              </div>
            </>
          ) : (
            ""
          )}

          {/* Extra options end here */}
        </div>
      </div>
    </>
  );
};

export default ResumeSocialinfo;
