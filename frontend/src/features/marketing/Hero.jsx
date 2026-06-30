import React from "react";
import GettingStartedBtn from "./components/GettingStartedBtn";
import { GiAcid } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import YoutubeVid from "./components/YoutubeVid";

const Hero = () => {
  return (
    <div className="w-full py-25 max-phone:py-15 flex flex-col items-center bg-linear-135 from-[#eef0fb] via-[#f4f5fb] to-white">
      {/* Wrting the banner for marketinig */}
      <p className="bg-[#e4e4f9] text-brand-tertionary p-1 rounded-2xl flex gap-1 text-sm px-2.5 tracking-wider mb-7">
        <GiAcid size={16} /> AI-Powered Tweet Intelligence
      </p>
      <h1 className="text-brand-primary text-6xl font-bold mx-70 text-center mb-6 max-xl:mr-50 max-xl:ml-50 max-lg:mx-20 max-md:mx-10 max-phone:mx-5 max-phone:text-5xl">
        Deep-Dive AI Tweet{" "}
        <span className="text-brand-tertionary">Analysis in Seconds</span>
      </h1>
      <p className="text-xl text-center text-brand-secondary mx-70 mb-4 max-xl:mx-50 max-lg:mx-15 max-md:mx-5">
        ThinkTweet is an AI-powered platform that breaks down the underlying
        logic, biases, and nuances of tweets across{" "}
        <span className="text-[#334155] font-semibold">5 core parameters</span>.
      </p>

      {/* Disclaimer */}
      <div className="mb-8 p-3 border-2 rounded-lg mx-80 bg-[#fffbeb] border-[#fde68a] max-xl:mx-60 max-lg:mx-30 max-md:mx-5">
        {/* <FaInfoCircle
          className="mt-0.5 justify-self-end text-[#f59e0b]"
          size={18}
        /> */}
        <p className=" text-[#b45309] text-center text-base">
          Currently, our platform operates and analyzes exclusively within the{" "}
          <span className="font-bold">Gender Domain</span>.
        </p>
      </div>

      {/* Buttons for the cta and yt */}
      <div className="flex gap-4 items-center mb-12 max-phone:flex-col">
        <GettingStartedBtn />
        <a
          className="font-medium flex items-center gap-1 text-brand-primary hover:text-brand-tertionary"
          href=""
          onClick={(e) => e.preventDefault()}
        >
          See how it works
          <FaArrowDownLong className="" size={12} />
        </a>
      </div>

      {/* Youtube video to be shown */}
      <YoutubeVid id="eFDZOoVB2Ek" />
    </div>
  );
};

export default Hero;
