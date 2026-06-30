import React from "react";
import { FaRocket } from "react-icons/fa6";

const GettingStartedBtn = () => {
  return (
    <div>
      <a
        className="border-2 py-3 px-8 rounded-lg flex gap-2 items-center text-lg text-white bg-brand-tertionary duration-200 ease-out hover:-translate-y-1 hover:cursor-pointer"
        href=""
        onClick={(e) => e.preventDefault()}
      >
        <FaRocket size={16} /> Getting Started
      </a>
    </div>
  );
};

export default GettingStartedBtn;
