import React from "react";
import CompanyLogoName from "./CompanyLogoName";
import Links from "./Links";
import LogSignPersonal from "./LogSignPersonal";
import { use } from "react";
import { AuthContext } from "../utils/AuthProvider";

//static variable for css
const links =
  "text-brand-secondary py-1.5 px-3 rounded-lg text-[0.92rem] hover:cursor-pointer hover:bg-[#f6f6fe]";

const Navbar = () => {
  

  //getting the value through the context which is broadcasted by AuthContext
  const auth = use(AuthContext);
  
  return (
    <div className="flex items-center justify-around px-4 py-2 bg-white/70 sticky top-0 z-50 w-full backdrop-blur-xs border-b-brand-fourth max-lg:hidden">
      <CompanyLogoName />
      <Links isLoggedIn={auth.isAuthenticated} />
      <LogSignPersonal isLoggedIn={auth.isAuthenticated} />
    </div>
  );
};

export default Navbar;
