import { useTranslation } from "react-i18next";
import React from "react";
import FlowIcon from "../../assets/work-flow.png";
import { useNavigate } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { getImage } from "../../redux/features/resumeSlice";
import { useDispatch } from "react-redux";
// import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const ScreenRight = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const localToken = localStorage.getItem("resume_token") || null;
  const en_pth = localStorage.getItem("en_pth");
  const FinalResume = localStorage.getItem("FinalResume");
  // const [confirmScreen, setConfirmScreen] = useState(false);
  const routeChange = () => {
    // if(localToken === null){
    //   // localStorage.setItem("resume_token", token);
    // }
    if (!FinalResume) {
      if (en_pth) navigate(en_pth);
      else {
        navigate("/experience-level");
        // navigate('/choose-template');
      }
    }
    if (FinalResume) {
      navigate("/final-resume");
    }
  };

  return (
    <>
      <div className="screen-right">
        <div className="right-box-screen">
          <div>
            <div className="flow-icon">
              <img alt="" src={FlowIcon} />
              <div className="mt-4">
                <Popover className="">
                  <Popover.Button
                    variant="secondary"
                    className="custm-btn home-btn"
                    // onClick={() => setConfirmScreen(true)}
                  >
                    {t("CREATE MY RESUME")}
                  </Popover.Button>
                  <Popover.Panel className="popup-body z-10">
                    <div className="grid grid-cols-2">
                      <p> Möchten Sie Ihren letzten Lebenslauf bearbeiten?</p>
                      <div>
                        <button
                          className="btn site-btn bg-blue text-white m-2"
                          onClick={() => routeChange()}
                        >
                          Ja
                        </button>
                        <button
                          className="btn site-btn border-btn m-2"
                          onClick={() => {
                            localStorage.clear();
                            dispatch(getImage(""));
                            navigate("/experience-level");
                          }}
                        >
                          Nein
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenRight;
