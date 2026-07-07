import React from 'react'
import { FaLightbulb } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

const ProTip = () => {
  return (
    <div className="mt-6 rounded-lg p-4 bg-[#4c42dd]">
      <h4 className="flex items-center font-semibold text-white text-base gap-1 mb-3">
        <FaLightbulb color="#fde047" size={15} />
        Pro Tip
      </h4>
      <p className="text-sm text-[#c7d2fe] mb-4">
        Analyses on longer threads with cited sources tend to produce the most
        insightful breakdowns. Try a tweet with a bold claim first!
      </p>
      <p className="bg-[#5b52dc] flex items-center px-3 py-1.5 text-[#dedcf8] rounded-lg gap-1 text-sm">
        <IoStarSharp color="#fde047" /> 1 analyses uses{" "}
        <span className="text-white font-mono">18 credits</span>
      </p>
    </div>
  );
}

export default ProTip