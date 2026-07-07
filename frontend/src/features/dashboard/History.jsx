import React from "react";
import { FaHistory } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";

//static variable
const stepText =
  "text-xs border py-1 px-2.5 flex items-center gap-1 rounded-lg bg-[#f8fafc] border-brand-fourth text-brand-secondary";
const stepNum = "text-brand-tertionary text-base font-mono";

const History = () => {
  return (
    <div className="border border-brand-fourth bg-white col-span-2 h-max rounded-lg max-lg:col-span-1 max-lg:row-start-2">
      <div className="flex px-6 py-4 border-b border-b-brand-fourth">
        <p className="flex items-center font-semibold gap-1.5 text-[0.9rem] text-brand-primary">
          <FaHistory className="text-brand-secondary" />
          Recent Analyses
        </p>
        <p className="ml-auto bg-[#f1f5f9] border-brand-fourth text-brand-secondary border px-3 font-mono py-0.5 text-sm rounded-2xl">
          0 results
        </p>
      </div>
      {true && (
        <div className="p-6 flex flex-col items-center h-100 justify-center max-md:h-120">
          {/* Icon */}
          <AiFillFolderOpen
            className="p-3 text-brand-tertionary rounded-3xl bg-[#eef2ff] mb-6"
            size={90}
          />

          {/* Dialog */}
          <h4 className="text-base font-semibold mb-2">No analyses yet</h4>
          <p className="text-[0.9rem] mx-30 text-center mb-6 max-lg:mx-45 max-sm:mx-20 max-phone:mx-3">
            Your recent analyses will appear here. Paste a link above to get
            started!
          </p>

          {/* Steps to follow */}
          <div className="flex items-center gap-4 max-md:flex-col">
            <p className={stepText}>
              <span className={stepNum}>1</span> Paste X/Twitter URL
            </p>
            <FaArrowRight className="text-brand-secondary max-md:hidden" size={14} />
            <p className={stepText}>
              <span className={stepNum}>2</span> Click Analyze
            </p>
            <FaArrowRight className="text-brand-secondary max-md:hidden" size={14} />
            <p className={stepText}>
              <span className={stepNum}>3</span> Get instant scores
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
