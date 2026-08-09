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
import { use } from "react";
import { AuthContext } from "./utils/AuthProvider";

const App = () => {
  //getting the route name
  const routeName = useLocation();

  //expected route
  const expectedRoute = [
    "/",
    "/dashboard",
    "/payment",
    "/documentation",
    "/disclaimer",
    "/privacy",
    "/about",
    "/signup",
    "/login",
  ];

  //get the value from the auth context
  const auth = use(AuthContext);

  return (
    <>
      {/* #tip: Use better structure to scale it well */}
      {expectedRoute.find((elem) => elem === routeName.pathname) ? (
        <div>
          <Navbar />
          <Sidebar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<BuyCredits />} />
            <Route path="/documentation" element={<ComingSoon />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          {auth.showLogoutPopup && <Logout />}
        </div>
      ) : (
        <div className="text-4xl p-2">404 Page Not Found</div>
      )}
    </>
  );
};

export default App;
