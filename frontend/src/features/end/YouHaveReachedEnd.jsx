import React from "react";
import { NavLink } from "react-router-dom";
import { FaFlagCheckered, FaMapMarked, FaGithub } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { twMerge } from "tailwind-merge";

//static variable for css
const buttonCss =
  "flex border items-center justify-center gap-1.5 text-lg py-2.5 px-7 rounded-lg";

const YouHaveReachedEnd = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Basic information section */}
      <FaFlagCheckered className="border p-6 rounded-xl mb-6" size={100} />
      <h1 className="text-5xl font-bold mb-5 text-center ">
        You have reached the end <br className="lg:hidden max-md:hidden"/> of <span>Phase I</span>
      </h1>
      <p className="text-center mx-25 text-xl mb-10 max-lg:mx-15 max-md:mx-0">
        Stay tuned for the further development. We are working hard to bring you
        more powerful AI features and a seamless experience.
      </p>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:w-[60%] max-phone:w-[95%]">
        <NavLink className={buttonCss} to="/">
          <IoMdHome className="mb-0.5" size={21} />
          Back to Home
        </NavLink>
        <NavLink
          className={twMerge(buttonCss, "px-5 text-base")}
          to="/pipeline"
        >
          <FaMapMarked className="mb-0.5" size={15} />
          Read the Pipline
        </NavLink>
        <a
          className={buttonCss}
          href="https://github.com/noman-codes1/ThinkTweet"
          target="blank"
        >
          <FaGithub className="mb-0.5" size={18} />
          Github
        </a>
      </div>
    </div>
  );
};

export default YouHaveReachedEnd;
