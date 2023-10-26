import React, {useState, useEffect} from "react";
import PageLoader from "../../components/PageLoader";
import ScreenLeft from "./ScreenLeft";
import ScreenRight from "./ScreenRight";


const StepStructure = () => {
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
     <div>
     </div>
      <section className="step-box home-screen">
         {loading ? (
      <div className="loader-box">
        <PageLoader />
      </div>
      ) : (
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
         )} 
      </section>
    </>
  );
};

export default StepStructure;
