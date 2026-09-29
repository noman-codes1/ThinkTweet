import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BuyCredits from "./pages/BuyCredits";
import ComingSoon from "./pages/ComingSoon";
import LogIn from "./pages/LogIn";
import ScrollToTop from "./utils/ScrollToTop";
import { useLocation } from "react-router-dom";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Logout from "./features/logout/Logout";
import { use, useState, useEffect } from "react";
import { AuthContext } from "./utils/AuthProvider";
import DisclaimerPopup from "./features/popup/DisclaimerPopup";
import End from "./pages/End";
import PageNotFound404 from "./components/PageNotFound404";

const App = () => {
  //getting the route name
  const routeName = useLocation();

  //expected route
  const expectedRoute = [
    "/",
    "/dashboard",
    "/payment",
    "/pipeline",
    "/disclaimer",
    "/privacy",
    // "/about",
    "/signup",
    "/login",
    "/end"
  ];

  //get the value from the auth context
  const auth = use(AuthContext);

  //showing disclaimer popup-up
  const [showDisclaimerPopup, setShowDisclaimerPopup] = useState(false);

  //using effect to check whether the disclaimer was previously shown or not
  useEffect(() => {
    if (localStorage.getItem("isClickedDisclaimerBefore") !== "true") {
      setShowDisclaimerPopup(true);
    }
  }, []);

  return (
    <>
      {/* #tip: Use better structure to scale it well */}
      {expectedRoute.find((elem) => elem === routeName.pathname) ? (
        <div>
          {showDisclaimerPopup && (
            <DisclaimerPopup
              functionToCloseDisclaimer={setShowDisclaimerPopup}
            />
          )}
          <Navbar />
          <Sidebar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<BuyCredits />} />
            <Route path="/pipeline" element={<ComingSoon />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/end" element={<End />} />
          </Routes>
          <Footer />
          {auth.showLogoutPopup && <Logout />}
        </div>
      ) : (
        // <div className="text-4xl p-2">404 Page Not Found</div>
        <PageNotFound404 />
      )}
    </>
  );
};

export default App;
