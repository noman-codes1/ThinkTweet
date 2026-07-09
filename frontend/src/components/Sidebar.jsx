import React from "react";
import CompanyLogoName from "./CompanyLogoName";
import { GiHamburgerMenu } from "react-icons/gi";
import Links from "./Links";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import LogSignPersonal from "./LogSignPersonal";

const Sidebar = () => {
  //using state
  const [open, setOpen] = useState(false);

  //test variable
  const isUserLoggedIn = true

  return (
    <div className="lg:hidden p-4 flex items-center sticky top-0 bg-white/70 z-50 backdrop-blur-xs border-b-brand-fourth border-b">
      <CompanyLogoName />
      <GiHamburgerMenu
        onClick={() => setOpen(true)}
        className="ml-auto text-brand-primary"
        size={25}
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed bg-black/50 inset-0 z-200 h-screen"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-max bg-white py-10 w-80 ml-auto rounded-bl-4xl border border-brand-fourth shadow-2xl max-phone:w-full max-phone:rounded-br-4xl"
          >
            <ImCross
              onClick={() => setOpen(false)}
              className="mb-4 ml-auto mr-8"
              size={18}
            />
            <Links isLoggedIn={isUserLoggedIn} />
            <LogSignPersonal isLoggedIn={isUserLoggedIn} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
