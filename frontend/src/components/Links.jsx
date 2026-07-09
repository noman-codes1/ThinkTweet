import React from "react";
import { twMerge } from "tailwind-merge";
import { useLocation, NavLink } from "react-router-dom";

//static variable
const links =
  "text-brand-secondary py-1.5 px-3 rounded-lg text-[0.92rem] hover:cursor-pointer hover:bg-[#f6f6fe] max-lg:w-max";

const Links = ({ isLoggedIn }) => {
  //array for the the page navigation
  const navArray = [
    { id: 1, path: "/", pageName: "Home" },
    { id: 2, path: "/dashboard", pageName: "Dashboard" },
    { id: 3, path: "/history", pageName: "History" },
    { id: 4, path: "/documentation", pageName: "Documentation" },
    { id: 5, path: "/disclaimer", pageName: "Disclaimer" },
    { id: 6, path: "/privacy", pageName: "Privacy" },
    { id: 7, path: "/about", pageName: "About" },
  ];

  //finding the current route of the rendered element
  const routePathName = useLocation();

  return (
    <div className="flex gap-1 max-lg:flex-col max-lg:items-center max-lg:gap-5">
      {navArray.map((elem) => {
        if (isLoggedIn) {
          if (elem.id === 1) return null;
        } else {
          if (elem.id === 2 || elem.id === 3) return null;
        }
        return (
          <NavLink
            key={elem.id}
            to={elem.path}
            className={twMerge(
              links,
              routePathName.pathname === elem.path &&
                "pointer-events-none text-brand-tertionary cursor-default bg-[#f6f6fe]",
            )}
          >
            {elem.pageName}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Links;
