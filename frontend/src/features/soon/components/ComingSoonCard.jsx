import React from "react";
import { FaHistory, FaLightbulb } from "react-icons/fa";
import { FaRegHourglassHalf, FaMicrochip, FaBookOpen } from "react-icons/fa6";
import { RiStackFill } from "react-icons/ri";

//static variable
const keywordsOfUpdate =
  "text-sm text-[#94a3b8] bg-[#f1f5f9] border-brand-fourth border rounded-lg py-1 px-2 font-mono";

const ComingSoonCard = ({id, name, detail, keyword }) => {
  return (
    <div className="w-full h-full border p-6 rounded-lg border-brand-fourth bg-white shadow-xl hover:outline-brand-tertionary hover:outline-1 hover:shadow-2xl">
      <div className="flex mb-6 items-center">
        <span className="bg-[#f1f5f9] text-brand-tertionary p-2.5 rounded-lg">
          {id === 1 && <FaHistory className="" size={19} />}
          {id === 2 && <FaBookOpen className="" size={19} />}
          {id === 3 && <FaLightbulb className="" size={19} />}
          {id === 4 && <RiStackFill className="" size={19} />}
          {id === 5 && <FaMicrochip className="" size={19} />}
        </span>
        <p className="ml-auto text-[#cb8855] bg-[#fffbed] border-[#fde78f] flex items-center gap-1 border rounded-4xl h-max py-1 px-3 text-xs">
          <FaRegHourglassHalf className="" size={10} />
          Coming Soon
        </p>
      </div>

      {/* Content to write */}
      <h5 className="text-lg font-semibold mb-2 text-brand-primary">{name}</h5>
      <p className="text-[0.9rem] text-brand-secondary">{detail}</p>
      <div className="border-t border-t-brand-fourth mt-7 pt-3 flex gap-3">
        <p className={keywordsOfUpdate}>{keyword[0]}</p>
        <p className={keywordsOfUpdate}>{keyword[1]}</p>
      </div>
    </div>
  );
};

export default ComingSoonCard;
