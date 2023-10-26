import React, { useEffect, useState } from "react";
import Header from "./Header";
import Pages from "../../pages";
import { Footer } from "./Footer";
import CustomerHeader from "./CustomerHeader";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const Main = () => {
  // eslint-disable-next-line
  const [isActive, setActive] = useState("");
  let location = useLocation();
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  const loginData = useSelector((store) => store.resumeData);
  return (
    <>
      {(pathname === "/customer" ||
        pathname === "/customer-account" ||
        pathname === "/bill-history" ||
        pathname === "/order-history" ||
        pathname === "/payment") &&
      loginData?.loginData?.data?.token ? (
        <>
          <CustomerHeader />
          <Pages isActive={isActive} />
          {pathname === "/order-history" ? "" : <Footer />}
        </>
      ) : pathname === "/signup-login" ? (
        <>
          {/* <Header setActive={setActive} isActive={isActive} /> */}

          <Pages isActive={isActive} />
          <Footer />
        </>
      ) : pathname === "/final-resume" ? (
        <>
          <div className="fixed-header">
            <Header setActive={setActive} isActive={isActive} />
          </div>
          <Pages isActive={isActive} />
          {/* <Footer /> */}
        </>
      ) : (
        <>
          <Header setActive={setActive} isActive={isActive} />
          <Pages isActive={isActive} />
          {/* {pathname !== "/" ? "" : <Footer />} */}
          {pathname !== "/" ? "" : ""}
        </>
      )}
    </>
  );
};

export default Main;
