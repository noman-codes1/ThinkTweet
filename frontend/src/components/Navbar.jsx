import React from "react";
import CompanyLogoName from "./CompanyLogoName";
import Links from "./Links";
import LogSignPersonal from "./LogSignPersonal";

//static variable
const links =
  "text-brand-secondary py-1.5 px-3 rounded-lg text-[0.92rem] hover:cursor-pointer hover:bg-[#f6f6fe]";

const Navbar = () => {

  //test variable
  const isUserLoggedIn = false;

  return (
    <div className="flex items-center justify-around px-4 py-2 bg-white/70 sticky top-0 z-50 w-full backdrop-blur-xs border-b-brand-fourth max-lg:hidden">
      <CompanyLogoName />
      <Links isLoggedIn={isUserLoggedIn}/>
      <LogSignPersonal isLoggedIn={isUserLoggedIn}/>
    </div>
  );
};

export default Navbar;
