import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLocalData, pdfStateData } from "../../redux/features/localSlice";
import { getAllResumes } from "../../redux/features/localSlice";
import PageLoader from "../../components/PageLoader";
import { useTranslation } from "react-i18next";

const ListView = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(true);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  const loginData = useSelector((store) => store.resumeData);
  const token = loginData?.loginData?.data?.token;
  const Resumes = useSelector((store) => store.localResData.resumes);

  const [currentSubscription, setcurrentSubscription] = useState({});
  console.log("currentSubscription", currentSubscription);
  //get All Subscription Plan
  const getAllSubscriptionPlan = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subscription-plan`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setcurrentSubscription(res.data.data);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    if (token) {
      getAllSubscriptionPlan();
    }

    // eslint-disable-next-line
  }, [token]);
  const handleEdit = (token) => {
    dispatch(getLocalData(token)).then((res) => {
      navigate(`/final-resume?id=${token}`);
      window.location.reload();
    });
  };
  const handleDownload = (token) => {
    if (currentSubscription.current_plan) {
      handleEdit(token);
      dispatch(pdfStateData(true));
    } else {
      navigate("/payment");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllResumes(token));
      setLoader(false);
    }, 1000);
  }, [dispatch, token]);

  return (
    <>
      <table className="list-view-tesume" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>{t("Modified")}</th>
            <th>{t("Created")}</th>
            <th>{t("Resume Strength")}</th>
            <th className="text-center">{t("Actions")}</th>
          </tr>
        </thead>
        {Resumes === "" ? (
          <>
            <p>{t("No Resumes Available")}</p>
          </>
        ) : (
          <>
            <tbody>
              {loader ? (
                <>
                  <div
                    style={{
                      width: "10vw",
                      height: "10vw",
                      margin: "auto",
                      display: "block",
                      position: "fixed",
                      top: "50%",
                      left: "45%",
                      zIndex: "10000",
                    }}
                  >
                    <PageLoader />
                  </div>
                </>
              ) : (
                <>
                  {Resumes?.map((data) => {
                    return (
                      <>
                        <tr>
                          <td>{data && data.resume_name}</td>
                          <td>
                            {" "}
                            {new Date(
                              data && data.resume_details[0]?.created_at
                            ).toDateString()}
                          </td>
                          <td>
                            {" "}
                            {new Date(
                              data && data.resume_details[0]?.updated_at
                            ).toDateString()}
                          </td>
                          <td>
                            <span className="doc-Strength-label">
                              {t("Strength")}
                            </span>
                            <span className="doc-strength-value">
                              {data?.resume_strength}
                            </span>
                          </td>
                          <td className="text-right">
                            <div className="resume-list-tool ">
                              <div className="list-tool">
                                <Link to="/payment">
                                  <span>
                                    <i
                                      className="fa fa-check-circle-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <span>{t("Check")}</span>
                                </Link>
                              </div>
                              <div className="list-tool">
                                <span
                                  onClick={() => handleEdit(data?.resume_token)}
                                  className="cursor-pointer"
                                >
                                  <i
                                    className="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <span>{t("Edit")}</span>
                              </div>
                              <div className="list-tool">
                                <Link
                                // to={
                                //   currentSubscription?.plan_details
                                //     ? "/final-resume"
                                //     : "/payment"
                                // }
                                >
                                  <span
                                    onClick={() =>
                                      handleDownload(data?.resume_token)
                                    }
                                  >
                                    <i
                                      className="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <span>{t("Download")}</span>
                                </Link>
                              </div>
                              <div className="list-tool">
                                <Link to="/payment">
                                  <span>
                                    <i
                                      className="fa fa-print"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <span>{t("Print")}</span>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </>
              )}
            </tbody>
          </>
        )}
      </table>
    </>
  );
};

export default ListView;
