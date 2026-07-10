import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";

const Dialog = () => {
  return (
    <div className="p-15 flex flex-col items-center max-md:px-5 max-phone:px-2">
      <p className="uppercase text-center bg-[#eef2ff] border-brand-fourth text-brand-tertionary flex items-center text-xs border py-1 px-3 w-max rounded-lg gap-2 mb-4">
        <BsLightningChargeFill />
        Credit Top-up
      </p>
      <h1 className="text-4xl text-center text-brand-primary font-bold mb-4 max-phone:mx-2">
        Top Up Your Credits
      </h1>
      <p className="text-base text-center text-brand-secondary tracking-wide mb-2">
        Choose a credit pack to run deep-dive AI tweet analyses.
      </p>
      <p className="text-base text-brand-secondary tracking-wide flex items-center gap-1 max-phone:text-sm">
        <FaCircleInfo size={12} color="#f59e0b" />
        <span className="font-mono text-brand-tertionary font-semibold">18 credits </span>are consumed per analysis.
      </p>
    </div>
  );
}

export default Dialog