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

const App = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<BuyCredits />} />
        <Route path="/documentation" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
