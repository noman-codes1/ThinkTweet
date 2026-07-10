import React from "react";
import { FaCanadianMapleLeaf, FaFire, FaStar } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { SiStripe } from "react-icons/si";
import { twMerge } from "tailwind-merge";
import { BsLightningChargeFill } from "react-icons/bs";

//static variable
const cardContainer =
  "border w-full shadow-xl h-max p-6 rounded-lg bg-white border-brand-fourth duration-300 hover:-translate-y-2";
const pointers = "flex items-center gap-2 text-base text-brand-primary mb-1.5";
const packName = "flex items-center tracking-wide gap-2 text-xs uppercase mb-2";
const creditsCSS = "text-5xl text-brand-primary";

const PlanCard = ({id ,numOfCredits, isPrem, funcToTalkServer }) => {
  return (
    <div
      className={twMerge(
        cardContainer,
        numOfCredits === 360 &&
          "border-brand-tertionary relative py-8 border-2 shadow-2xl",
      )}
    >
      {/* {numOfCredits === 360 && (
        <p className="absolute -top-3.5 left-[32%] flex items-center gap-2 text-xs rounded-lg tracking-wide font-semibold uppercase bg-[#0ea5e9] text-white py-1.5 px-3">
          <FaStar color="#fde047" /> Most Popular
        </p>
      )} */}
      {numOfCredits === 90 && (
        <p className={twMerge(packName, "text-brand-secondary")}>
          <FaCanadianMapleLeaf color="#10b981" />
          Starter Pack
        </p>
      )}
      {numOfCredits === 360 && (
        <p className={twMerge(packName, "text-brand-tertionary")}>
          <FaFire color="#4f46e5" />
          Value Pack
        </p>
      )}
      {numOfCredits === 900 && (
        <p className={twMerge(packName, "text-brand-secondary")}>
          <BsLightningChargeFill color="#f59e0b" />
          Power Pack
        </p>
      )}
      <h5 className="text-xl font-semibold pb-5 border-b text-brand-primary border-b-brand-fourth">
        {numOfCredits === 90 ? (
          "Get started quickly"
        ) : (
          <span>
            {numOfCredits === 360 ? "Best bang for buck" : "For power users"}
          </span>
        )}
      </h5>
      <p className="mt-5 font-mono text-xl font-semibold mb-3 text-brand-secondary">
        <span
          className={twMerge(
            creditsCSS,
            numOfCredits === 360 && "text-brand-tertionary",
          )}
        >
          {numOfCredits === 90 ? (
            "90"
          ) : (
            <span>{numOfCredits === 360 ? "360" : "900"}</span>
          )}
        </span>{" "}
        credits
      </p>
      <p className="text-base font-semibold text-[#94a3b8] mb-3">
        <span className="text-3xl text-brand-primary">
          {numOfCredits === 90 ? (
            "$5"
          ) : (
            <span>{numOfCredits === 360 ? "$15" : "$35"}</span>
          )}
        </span>{" "}
        one-time
      </p>
      <p className="text-[#94a3b8] text-sm mb-12">
        Good for ~{numOfCredits / 18} deep-dive analyses.
      </p>
      <ul>
        <li className={pointers}>
          <IoMdCheckmark size={17} color="#10b981" />
          {numOfCredits} analysis credits
        </li>
        <li className={pointers}>
          <IoMdCheckmark size={17} color="#10b981" />
          Credits never expire
        </li>
        <li className={pointers}>
          <IoMdCheckmark size={17} color="#10b981" />
          Instant delivery
        </li>
        {isPrem && (
          <li className={pointers}>
            <IoMdCheckmark size={17} color="#10b981" />
            Priority support
          </li>
        )}
        {!isPrem && (
          <li className={pointers}>
            <IoMdCheckmark size={17} color="#10b981" />
            Only mail support
          </li>
        )}
      </ul>
      <button onClick={() => funcToTalkServer(id)} className="mt-8 flex items-center gap-2 w-full py-3 rounded-lg justify-center text-white duration-200 bg-brand-tertionary hover:cursor-pointer hover:bg-brand-tertionary hover:-translate-y-1">
        <SiStripe />
        Pay via Stripe
      </button>
    </div>
  );
};

export default PlanCard;
