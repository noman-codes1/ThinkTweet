import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { FaFeather } from "react-icons/fa";

const Pointers = ({sIcon, wIcon, nIcon}) => {
  return (
    <div className="flex gap-2 mb-4">
      <div className="mt-1.5">
        {sIcon && <FaCheckCircle className="text-[#10b981]" size={16}/>}
        {wIcon && <IoCloseCircle className="text-[#f43f5e]" size={20}/>}
        {nIcon && <FaFeather className="text-[#a855f7]" size={18}/>}
      </div>
      <p className="text-sm text-brand-secondary">
        The claim grounds itself in 12 independent, peer-reviewed studies — a
        statistically robust and hard-to-dismiss evidentiary base that elevates
        its credibility significantly.
      </p>
    </div>
  );
};

export default Pointers;
