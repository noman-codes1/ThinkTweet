import React from "react";
import AIDisclaimer from "./components/AIDisclaimer";
import PrivacyAndSecurity from "./components/PrivacyAndSecurity";
import OpenSourceNotes from "./components/OpenSourceNotes";
import { FaBrain } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

// writing the custom css for disclaimer
const container = "flex gap-3 border rounded-lg p-3 max-phone:border-none max-phone:p-0";
const heading =
  "uppercase tracking-wide font-bold mb-2 text-[95%] text-brand-primary";
const paraOne = "mb-2 text-base text-brand-secondary max-phone:tracking-wide";
const innerContainer = "border p-2 rounded-lg";
const highlightInPara = "font-semibold";

const DisclaimerPopup = ({ functionToCloseDisclaimer }) => {

  //saving the response of "I understand" to stop making it annoying
  const saveInLocalStorage = () =>{
    functionToCloseDisclaimer(false)
    localStorage.setItem("isClickedDisclaimerBefore", "true");
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-500 flex justify-center items-center">

      {/* #tip: figure out more about flex & flex-col results in creating a perfect container even though it's just a flex container*/}
      <div className="bg-white rounded-lg h-[90%] w-2xl flex flex-col max-xl:h-115 max-lg:h-180 max-md:w-md max-md:h-[80%] max-phone:w-[95%] max-phone:h-[85%]">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-6 border-b border-b-brand-fourth bg-[#fbfcfd] rounded-t-lg max-phone:p-3">
          <FaBrain
            className="p-2 border rounded-lg text-white bg-brand-tertionary"
            size={35}
          />
          <h1 className="text-lg text-brand-primary font-semibold">
            Welcome to ThinkTweet
          </h1>
          <p className="text-brand-secondary max-phone:hidden">(Please Read)</p>
        </div>

        {/* Components to call */}
        <div className="h-full overflow-y-scroll scrollbar-none p-4 bg-white">
          <AIDisclaimer
            containerAI={container}
            headingAI={heading}
            paraOneAI={paraOne}
            innerContainerAI={innerContainer}
            highlightParaAI={highlightInPara}
          />
          <PrivacyAndSecurity
            containerPS={container}
            headingPS={heading}
            paraOnePS={paraOne}
            innerContainerPS={innerContainer}
            highlightParaPS={highlightInPara}
          />
          <OpenSourceNotes
            containerOPS={container}
            headingOPS={heading}
            paraOneOPS={paraOne}
          />
        </div>

        {/* Buttons to take action */}
        <div className="border-t border-t-brand-fourth bg-[#fbfcfd] px-5 py-6 grid grid-cols-2 gap-4 rounded-b-lg max-phone:grid-cols-1 max-phone:p-3 max-phone:gap-2">
          <button
            onClick={() => saveInLocalStorage()}
            className="py-2.5 rounded-lg text-white bg-brand-tertionary hover:bg-brand-tertionary-hover hover:cursor-pointer"
          >
            I understand & accept
          </button>
          <a
            href="https://github.com/noman-codes1/ThinkTweet"
            target="blank"
            className="py-2.5 flex items-center justify-center gap-2 border rounded-lg border-brand-fourth bg-white hover:cursor-pointer hover:bg-[#f8fafc]"
          >
            <FaGithub />
            View Github Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
