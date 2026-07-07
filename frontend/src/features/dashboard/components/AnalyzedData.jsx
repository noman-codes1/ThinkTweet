import React from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import OverallScore from "./OverallScore";
import Pointers from "./Pointers";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { twMerge } from "tailwind-merge";

import SummaryClaim from "./SummaryClaim";

//static variable
const strengthWeaknessNaunceContainer =
  "border bg-white p-4 pt-6 rounded-lg shadow-lg duration-450 hover:-translate-y-1 hover:shadow-xl";
const strWeaNauHeader =
  "text-brand-primary flex items-center gap-2 mb-4 text-base";
const strWeakNauIcon = "p-1.5 rounded-lg";

const AnalyzedData = () => {
  return (
    <div className="mt-6">
      {/* Claim Summary */}
      <div className="border shadow-lg mb-6 rounded-lg p-4 border-brand-fourth bg-linear-135 from-[#534de7] via-[#6366f1] to-[#7d87f7]">
        <h3 className="flex items-center text-[#c7d2fe] gap-2 mb-2 uppercase text-sm">
          <FaQuoteLeft
            className="p-1.5 rounded-lg bg-[#6b65ea]"
            color="white"
            size={25}
          />{" "}
          Claim Analyzed
        </h3>
        <p className="italic font-base text-white">
          "AI systems operating under regulated frameworks achieve significantly
          higher accuracy in diagnostic tasks — and peer-reviewed Stanford
          research across 12 independent studies conclusively supports this."
        </p>
      </div>

      {/* Over all score */}
      <OverallScore />

      {/* Explaining plus, minus and point to consider */}
      <div className="grid grid-cols-3 gap-4 mt-8 max-md:grid-cols-1">
        {/* Strength */}
        <div
          className={twMerge(
            strengthWeaknessNaunceContainer,
            "border-[#a7f3d0]",
          )}
        >
          <h4 className={strWeaNauHeader}>
            <FaThumbsUp
              className={twMerge(strWeakNauIcon, "text-[#059669] bg-[#d1fae5]")}
              size={27}
            />{" "}
            Strengths
          </h4>
          <Pointers sIcon={true} />
          <Pointers sIcon={true} />
        </div>

        {/* Weakness */}
        <div
          className={twMerge(
            strengthWeaknessNaunceContainer,
            "border-[#fecdd3]",
          )}
        >
          <h4 className={strWeaNauHeader}>
            <FaThumbsDown
              className={twMerge(strWeakNauIcon, "text-[#f43f5e] bg-[#ffe4e6]")}
              size={27}
            />
            Weakness
          </h4>
          <Pointers wIcon={true} />
          <Pointers wIcon={true} />
        </div>

        {/* Nuance */}
        <div
          className={twMerge(
            strengthWeaknessNaunceContainer,
            "border-[#e9d5ff]",
          )}
        >
          <h4 className={strWeaNauHeader}>
            <GiStack
              className={twMerge(strWeakNauIcon, "text-[#a855f7] bg-[#f3e8ff]")}
              size={27}
            />{" "}
            Naunces
          </h4>
          <Pointers nIcon={true} />
          <Pointers nIcon={true} />
          <Pointers nIcon={true} />
        </div>
      </div>

      {/* Summary of the claim */}
      <SummaryClaim />
    </div>
  );
};

export default AnalyzedData;
