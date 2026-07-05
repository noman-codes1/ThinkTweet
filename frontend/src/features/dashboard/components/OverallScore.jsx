import React from 'react'
import { FaShieldAlt } from "react-icons/fa";
import { GiBrainLeak } from "react-icons/gi";
import { BiSolidError } from "react-icons/bi";
import { PiAlienFill } from "react-icons/pi";
import { RiStackFill } from "react-icons/ri";

//static variable
const overallParamContainer =
  "text-sm border w-auto flex items-center gap-2 justify-center py-1.5 px-2 text-center rounded-lg border-brand-fourth bg-[#f8fafc] text-brand-secondary";
const overallParamScoreSpan = "text-brand-primary font-semibold";

const OverallScore = () => {
  return (
    <div className="border border-brand-fourth bg-white rounded-lg p-4 flex gap-10">
      <div className="self-center">
        <div className="relative w-25 h-25 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-24 absolute w-24">
            {/* TRY TO UNDERSTAND THIS CONCEPT MORE */}
            <circle
              cx={50}
              cy={50}
              r={40}
              stroke="#e2e8f0"
              strokeWidth={10}
              fill="transparent"
            />
            <circle
              cx="50" //it's the centre basically pin pointing
              cy="50"
              r="40"
              stroke="#4f46e5"
              strokeWidth={10}
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={55.3}
              strokeLinecap="round"
            />
          </svg>
          <p className="">
            <span className="text-brand-primary block text-center -mb-2 text-xl self-center">
              78
            </span>
            <span className="text-brand-secondary text-sm">/100</span>
          </p>
        </div>
        <p className="bg-[#eef2ff] text-center mt-2 py-1 px-4 w-max flex justify-self-center border text-xs rounded-xl border-brand-fourth text-brand-tertionary">
          Strong
        </p>
      </div>
      <div>
        <div className="flex gap-2 mb-4">
          <p className="text-4xl self-center text-brand-primary">78</p>
          <div>
            <p className="text-sm text-brand-tertionary">
              Overall Quality Score
            </p>
            <p className="text-xs text-brand-secondary tracking-wide">
              Composite across 5 parameters
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <p className={overallParamContainer}>
            <FaShieldAlt className="text-[#10b981]" /> Evidence Strength:{" "}
            <span className={overallParamScoreSpan}>91</span>
          </p>
          <p className={overallParamContainer}>
            <GiBrainLeak className="text-[#3b82f6]" /> Logical Consistency:{" "}
            <span className={overallParamScoreSpan}>84</span>
          </p>
          <p className={overallParamContainer}>
            <BiSolidError className="text-[#fb923c]" /> Generalization Risk:{" "}
            <span className={overallParamScoreSpan}>62</span>
          </p>
          <p className={overallParamContainer}>
            <PiAlienFill className="text-[#f43f5e]" /> Confirmation Bias:{" "}
            <span className={overallParamScoreSpan}>71</span>
          </p>
          <p className={overallParamContainer}>
            <RiStackFill className="text-[#a855f7]" /> Nuance & Context:{" "}
            <span className={overallParamScoreSpan}>68</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverallScore