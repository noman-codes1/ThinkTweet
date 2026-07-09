import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const LogSignPersonal = ({ isLoggedIn }) => {
  //finding the current desination
  const desination = useLocation();
  return (
    <div>
      {!isLoggedIn && (
        <div className="flex gap-2 items-center max-lg:grid max-lg:grid-cols-2 max-lg:mt-8 max-lg:mx-2">
          <NavLink
            to="/login"
            className={twMerge(
              "text-brand-secondary text-[0.92rem] hover:cursor-pointer hover:text-brand-primary max-lg:border py-2 max-lg:rounded-lg max-lg:text-center max-lg:border-brand-fourth",
              desination.pathname === "/login" && "pointer-events-none cursor-default",
            )}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={twMerge(
              "text-base border py-1.5 px-3 rounded-lg font-medium text-white bg-brand-tertionary hover:cursor-pointer hover:bg-brand-tertionary-hover max-lg:text-center max-lg:py-2",
              desination.pathname === "/signup" &&
                "pointer-events-none cursor-default",
            )}
          >
            Sign up
          </NavLink>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex gap-2 items-center max-lg:justify-center max-lg:mt-10">
          <span className="rounded-full h-8 w-8 text-xs flex items-center justify-center bg-brand-tertionary text-white max-lg:size-12 max-lg:text-base">
            AJ
          </span>
          <div>
            <p className="text-[0.9rem] text-brand-primary max-lg:text-lg">
              Alex Johnson
            </p>
            <button className="text-xs text-[#ef4444] hover:text-[#dc2626] hover:cursor-pointer hover:underline max-lg:text-sm">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogSignPersonal;
