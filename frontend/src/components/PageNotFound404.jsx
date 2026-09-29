import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

//static css variable
const buttonCss =
  "py-3 px-6 flex items-center justify-center gap-1.5 rounded-lg border text-base";

const PageNotFound404 = () => {
  return (
    <div className="py-15 px-10 bg-[#eff1fb] flex flex-col items-center justify-center xl:h-screen max-lg:h-screen max-phone:h-auto max-phone:pt-35 max-phone:pb-55 max-phone:px-4">
      {/* Showing the error */}
      <div className="relative flex flex-col items-center justify-center">
        <p className="text-[15rem] leading-none text-[#e8eaf0] font-mono font-bold max-phone:text-[12rem]">
          404
        </p>
        <div className="absolute animate-slowBounce shadow-2xl size-50 bg-white rounded-xl flex flex-col items-center justify-center">
          <IoSearchSharp className="text-brand-tertionary" size={70} />
          <p className="text-xl mt-2 text-brand-secondary font-mono font-bold">
            Lost in Search?
          </p>
        </div>
      </div>

      {/* Showing what could have caused error */}
      <h1 className="text-4xl text-brand-primary mt-8 text-center font-bold">
        Oops! <span className="text-brand-tertionary">Page Not Found</span>
      </h1>
      <p className="text-center text-brand-secondary mt-3 mx-50 text-xl xl:mx-0 xl:w-xl max-lg:mx-0 max-lg:w-lg max-md:w-auto">
        Hey girly! our system couldn't find the page you're looking for. It might
        have been moved, deleted, or never existed in this timeline.
      </p>

      {/* Buttons to perform action */}
      <div className="mt-5 grid grid-cols-2 gap-4 max-lg:mt-8 max-phone:grid-cols-1 max-phone:w-[80%]">
        <NavLink
          to="/"
          className={twMerge(
            buttonCss,
            "bg-brand-primary text-white shadow-2xl",
          )}
        >
          <FaArrowLeft />
          Go to Home
        </NavLink>
        <a
          href="https://github.com/noman-codes1/ThinkTweet"
          target="blank"
          className={twMerge(
            buttonCss,
            "bg-white text-brand-primary border-brand-fourth shadow-lg",
          )}
        >
          <FaGithub className="text-brand-tertionary" />
          Visit Github
        </a>
      </div>

      {/* Other Info */}
      <div className="mt-15 bg-white border-brand-fourth flex items-center gap-1.5 border p-3 text-sm rounded-lg max-phone:px-2 max-phone:text-xs">
        <GoDotFill className="animate-pulse text-brand-tertionary" color="" />
        <p className="text-brand-secondary">
          Status: 404 Error encountered while processing path
        </p>
      </div>
    </div>
  );
};

export default PageNotFound404;
