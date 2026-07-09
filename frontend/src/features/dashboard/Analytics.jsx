import React from "react";
import { FaInfoCircle, FaArrowUp } from "react-icons/fa";
import TotalAnalysisCard from "./components/TotalAnalysisCard";
import TotalCreditsCard from "./components/TotalCreditsCard";
import BillingCard from "./components/BillingCard";
import { FaCircleExclamation } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const Analytics = () => {
  //test variable
  const newUser = true;
  const username = "Rohani";
  const credits = 44;
  const totalAnal = 24;
  const purchaseData = {
    date: "June 15, 2026",
    credits: "200",
    amount: "$299"
  }

  return (
    <div className="w-full">
      {/* Welcoming...*/}
      <div className="flex mb-8 max-lg:grid max-lg:grid-cols-3 max-lg:gap-2 max-md:grid-cols-1 max-md:gap-4">
        <div className="max-lg:col-span-2 max-md:col-span-1">
          <h1 className="text-3xl font-bold text-brand-primary">
            Hi, {username} 👋
          </h1>
          <div className="text-[0.9rem] tracking-wider text-brand-secondary max-phone:mt-1">
            {newUser ? (
              <p>
                Welcome to ThinkTweet! You're all set to start analyzing tweets
                for logical quality.
              </p>
            ) : (
              <p>
                Welcome back! You have{" "}
                <span
                  className={twMerge(
                    "text-brand-tertionary font-semibold",
                    credits < 18 && "text-[#be123c]",
                  )}
                >
                  {credits} credits
                </span>{" "}
                available &mdash;{" "}
                {credits < 18
                  ? " top up to continue analyzing tweets."
                  : "keep analyzing and sharpening your critical thinking."}
              </p>
            )}
          </div>
        </div>
        {newUser && (
          <p className="border border-brand-tertionary text-brand-secondary bg-[#eef2ff] rounded-lg p-2 text-xs ml-auto flex items-center h-max gap-1 max-lg:p-1.5 max-sm:p-2 max-sm:ml-0 max-sm:w-max">
            <FaInfoCircle
              className="self-center text-brand-tertionary"
              size={13}
            />
            You have{" "}
            <span className="text-brand-tertionary">
              {credits} free credits
            </span>{" "}
            to get started
          </p>
        )}
        {credits < 18 && (
          <p className="flex gap-2 text-xs items-center ml-auto border rounded-lg h-max p-2 border-[#fecdd3] bg-[#fff1f2] text-[#be123c] max-sm:ml-0 max-sm:w-max">
            <FaCircleExclamation />
            Insufficient Credits &middot; <span>Buy More</span>
          </p>
        )}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        <TotalAnalysisCard anal={totalAnal} newUsr={newUser} />
        <TotalCreditsCard cred={credits} />
        <BillingCard purData={purchaseData} />
      </div>
    </div>
  );
};

export default Analytics;
