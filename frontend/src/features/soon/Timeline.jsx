import React from "react";
import { GoDotFill } from "react-icons/go";
import { RxDividerVertical } from "react-icons/rx";

//static variable
const timelinePlanned =
  "flex self-center font-mono text-brand-primary justify-self-center text-2xl font-semibold mb-1";
const verticalLines = "w-0.2 border h-9 border-brand-fourth";
const timelinePlannedHeadline = "text-sm text-brand-secondary text-center";

const Timeline = () => {
  return (
    <div className="py-25 px-35 flex flex-col items-center max-lg:px-10 max-md:px-7 max-phone:px-4">
      <p className="flex bg-[#eef2ff] items-center gap-1 text-sm border border-[#c7d2fe] font-mono text-brand-tertionary px-4 py-1 rounded-4xl uppercase mb-8">
        <GoDotFill className="animate-pulse" /> Phase I &ndash; Completed
      </p>
      <h1 className="text-6xl text-brand-primary text-center font-semibold mx-10 mb-6 max-md:mx-0 max-phone:text-5xl">
        The Future of <span className="text-brand-tertionary">ThinkTweet</span>: Phase II
      </h1>
      <p className="text-center text-brand-secondary mx-10 text-xl mb-8 max-md:mx-0">
        We are actively <br className="sm:hidden"/> engineering next-generation capabilities to expand your
        analysis workspace. Here is a preview of the advanced features arriving
        in our next major release.
      </p>
      <div className="flex gap-10 items-center border-t border-t-brand-fourth pt-5 w-full justify-center max-phone:gap-7">
        <div>
          <span className={timelinePlanned}>4</span>
          <p className={timelinePlannedHeadline}>Features Planned</p>
        </div>
        <div className={verticalLines}></div>
        <div>
          <span className={timelinePlanned}>Q1</span>
          <p className={timelinePlannedHeadline}>Target Release</p>
        </div>
        <div className={verticalLines}></div>
        <div>
          <span className={timelinePlanned}>2027</span>
          <p className={timelinePlannedHeadline}>Roadmap Year</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
