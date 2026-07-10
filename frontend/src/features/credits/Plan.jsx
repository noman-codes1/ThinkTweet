import React from "react";
import PlanCard from "./components/PlanCard";
import { FaLock, FaShieldHalved } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";

//static variable
const fourTag =
  "flex items-center gap-2 text-sm text-brand-secondary justify-center";

const Plan = ({ funcToTalkServer }) => {
  //writing the custom plan
  const customPlan = [
    {
      id: "4g78qs",
      credits: 90,
      isPremium: false,
    },
    {
      id: "5g56qs",
      credits: 360,
      isPremium: true,
    },
    {
      id: "6g564d8qs",
      credits: 900,
      isPremium: true,
    },
  ];

  return (
    <div className="px-12 pb-40 max-lg:px-4 max-lg:pb-25">
      <div className="grid grid-cols-3 gap-5 items-center mb-10 max-lg:gap-3 max-md:grid-cols-1 max-md:gap-5">
        {customPlan.map((elem) => {
          return (
            <PlanCard
              key={elem.id}
              id={elem.id}
              numOfCredits={elem.credits}
              isPrem={elem.isPremium}
              funcToTalkServer={funcToTalkServer}
            />
          );
        })}
      </div>
      <div className="flex gap-8 items-center justify-center max-lg:flex-col max-lg:gap-4">
        <p className={fourTag}>
          <FaLock />
          Secured by Stripe
        </p>
        <RxDividerVertical className="hidden" color="#e2e8f0" size={20} />
        <p className={fourTag}>
          <FaShieldHalved />
          256-bit SSL encryption
        </p>
        <RxDividerVertical className="hidden" color="#e2e8f0" size={20} />
        <p className={fourTag}>
          <IoMdRefresh />
          Credits added instantly
        </p>
        <RxDividerVertical className="hidden" color="#e2e8f0" size={20} />
        <p className={fourTag}>
          <IoMail />
          Receipt emailed automatically
        </p>
      </div>
    </div>
  );
};

export default Plan;
