import React from "react";
import { FaRocket } from "react-icons/fa6";
import { use } from "react";
import { AuthContext } from "../../../utils/AuthProvider";
import { NavLink } from "react-router-dom";

const GettingStartedBtn = () => {
  //getting the context
  const authValues = use(AuthContext);
  return (
    <div>
      <NavLink
        className="border-2 py-3 px-8 rounded-lg flex gap-2 items-center text-lg text-white bg-brand-tertionary duration-200 ease-out hover:-translate-y-1 hover:cursor-pointer"
        to={authValues.isAuthenticated ? "/dashboard" : "/login"}
      >
        <FaRocket size={16} />{" "}
        {authValues.isAuthenticated ? "Go to Dashboard" : "Getting Started"}
      </NavLink>
    </div>
  );
};

export default GettingStartedBtn;
