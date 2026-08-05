import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";

const SummaryClaim = ({summary}) => {

  //getting the current data and time
  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString()
  return (
    <div className="mt-8 shadow-lg border p-4 rounded-lg bg-white border-[#d3d1f8] duration-250 hover:-translate-y-1 hover:shadow-xl">
      <h5 className="flex items-center gap-2 mb-4 text-base text-brand-primary">
        <IoDocumentText
          className="p-1.5 rounded-lg text-brand-tertionary bg-[#eef2ff]"
          size={28}
        />{" "}
        Summary
      </h5>
      <p className="text-[0.9rem] tracking-wide leading-6 text-brand-secondary mb-6 pb-6 border-b border-b-brand-fourth">
        {summary}
      </p>
      <div className="flex gap-6 max-phone:flex-col max-phone:gap-2">
        <p className="flex items-center gap-2 text-sm text-brand-secondary">
          <MdOutlineAccessTimeFilled /> Analyzed on {date} at {time}
        </p>
        <p className="flex items-center gap-2 text-sm text-brand-secondary">
          <FaCoins color="#f59e0b" />
          18 credits used
        </p>
      </div>
    </div>
  );
}

export default SummaryClaim