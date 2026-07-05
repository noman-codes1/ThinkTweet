import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";

const TotalAnalysisCard = ({ anal, newUsr }) => {
  return (
    <div className="border border-[#e2e8f0] p-4 rounded-lg bg-white shadow-md hover:shadow-xl">
      <div>
        <div className="flex mb-4">
          <VscGraphLine
            className="rounded-lg p-2 bg-[#f1f5f9] text-brand-secondary"
            size={30}
          />
          <p className="self-center ml-auto text-xs border px-3 p-0.5 rounded-xl bg-[#f1f5f9] border-[#e2e8f0] text-brand-secondary">
            All time
          </p>
        </div>
        <h1 className="text-5xl mb-2 text-brand-primary">{anal}</h1>
        <p className="text-[0.9rem] mb-4 text-brand-secondary">
          Total Analyses Run
        </p>
      </div>
      <div className="border-t border-[#e2e8f0] pt-4 text-xs">
        <p className="flex items-center gap-1 text-brand-secondary">
          <FaArrowUp color="#10b981" size={11} />
          {!newUsr ? (
            <span>Trending up. Do your next analysis</span>
          ) : (
            <span>Start your first analysis below</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TotalAnalysisCard;
