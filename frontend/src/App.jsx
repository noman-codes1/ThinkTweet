import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </>
  );
};

export default App;
