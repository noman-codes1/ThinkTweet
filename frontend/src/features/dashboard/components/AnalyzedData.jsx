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

const AnalyzedData = ({ data }) => {
  //extracting the claim summary
  const userClaim = data?.finalClaims || data?.claims;

  //calculating the overall score
  // #tip: use "??" for better way because 0 is a falsy value and then bug will appear
  // although appearance 0 is here quite impossible.
  const overallScoreData =
    ((100 - data?.finalScores?.confirmationBias ||
      100 - data?.scores?.confirmation_bias) +
      (data?.finalScores?.evidenceStrength || data?.scores?.evidence_strength) +
      (100 - data?.finalScores?.generalizationRisk ||
      100 - data?.scores?.generalization_risk) +
      (data?.finalScores?.logicalConsistency ||
        data?.scores?.logical_consistency) +
      (data?.finalScores?.nuanceAndContext ||
        data?.scores?.nuance_and_context)) /
    5;

  //extracting the all the parameter score
  const paramterScore = {
    confirmationBias:
      data?.finalScores?.confirmationBias || data?.scores?.confirmation_bias,
    evidenceStrength:
      data?.finalScores?.evidenceStrength || data?.scores?.evidence_strength,
    generalizationRisk:
      data?.finalScores?.generalizationRisk ||
      data?.scores?.generalization_risk,
    logicalConsistency:
      data?.finalScores?.logicalConsistency ||
      data?.scores?.logical_consistency,
    nuanceAndContext:
      data?.finalScores?.nuanceAndContext || data?.scores?.nuance_and_context,
  };

  //extracting the strength of the claim
  const strengthArray = data?.finalStrength || data?.strength;

  //extracting the weakness of the claim
  const weaknessArray = data?.finalWeakness || data?.weakness;

  //extracting the naunces of the claim
  const nuancesArray = data?.finalNuances || data?.nuances;

  //extracting the summary claim
  const claimSummary = data?.finalSummary || data?.summary;
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
        <p className="italic font-base text-white">"{userClaim}"</p>
      </div>

      {/* Over all score */}
      <OverallScore
        overallScoreVal={overallScoreData}
        claimParameter={paramterScore}
      />

      {/* Explaining positive, negative and nuances to consider */}
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
          {strengthArray.map((elem) => {
            return (
              <Pointers
                key={strengthArray.indexOf(elem)}
                sIcon={true}
                dataOfPointers={elem}
              />
            );
          })}
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
          {weaknessArray.map((elem) => {
            return (
              <Pointers
                key={weaknessArray.indexOf(elem)}
                wIcon={true}
                dataOfPointers={elem}
              />
            );
          })}
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
          {nuancesArray.map((elem) => {
            return (
              <Pointers
                key={nuancesArray.indexOf(elem)}
                nIcon={true}
                dataOfPointers={elem}
              />
            );
          })}
        </div>
      </div>

      {/* Summary of the claim */}
      <SummaryClaim summary={claimSummary} />
    </div>
  );
};

export default AnalyzedData;
