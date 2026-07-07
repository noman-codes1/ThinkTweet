import React from "react";
import { FiPaperclip } from "react-icons/fi";
import AnalyzedData from "./components/AnalyzedData";
import { VscSearchSparkle } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import Loader from "./components/Loader";
import ServerError from "./components/ServerError";
import { IoCloseCircle } from "react-icons/io5";

//static variable
const infoBox =
  "text-xs ml-auto border h-max py-1 px-3 rounded-xl flex items-center gap-1 max-md:mb-4 max-md:w-max max-md:row-start-1 max-md:ml-0";

const AnalyzeTweet = () => {
  //test data
  const isTweetAnalyzed = false;

  //defining the state
  const [userUrl, setUserUrl] = useState("");
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [inlineErr, setInlineErr] = useState("");
  const [serverState, setServerState] = useState("idle");
  const [showLoader, setShowLoader] = useState(false);

  //handling user inputted url
  const userInputUrlBox = (event) => {
    const val = event.target.value;

    //defensive coding
    setIsReadyToSend(false);
    setInlineErr("");

    //validating the entered output
    if (val.length >= 15) {
      if (val.startsWith("https://x.com/")) {
        setIsReadyToSend(true);
      } else {
        setInlineErr("Please enter X/Twitter url for smooth process");
      }
    } else {
      setInlineErr("Not a valid url");
    }

    //not allowing to edit when the server has replied
    if (serverState === "success" || serverState === "error" || showLoader) {
      return;
    }
    setUserUrl(val);
  };

  //helper function for set timeout since settimeout will return the
  //id instantly and then it will be passed normally...
  const sleep = (ms) => {
    return new Promise((resolveNow) => {
      setTimeout(resolveNow, ms); //resolveNow is just the parameter name... you can write anything
    });
  };

  //talking to the server
  const talkServer = async () => {
    //mocking the server reply
    if (serverState === "success" || serverState === "error") {
      setServerState("idle");
      setIsReadyToSend(false);
      setUserUrl("");
      return;
    } else {
      //In a real world application, this part will be decided by server
      setShowLoader(true);
      await sleep(10000);
      setServerState("error");
      setShowLoader(false);
    }
  };

  return (
    <div className="w-auto col-span-2 max-lg:col-span-1">
      {/* Tweet Analysis Box */}
      <div className="border border-brand-fourth bg-white p-4 rounded-lg">
        <div className="flex max-md:grid">
          <div>
            <h2 className="text-brand-primary font-semibold text-lg mb-1">
              Analyze a Tweet
            </h2>
            <p className="text-brand-secondary text-[0.9rem] mb-4 max-md:mb-6">
              Paste any public Twitter/X link and get an instant logical quality
              breakdown
            </p>
          </div>
          {/* Will appear only if we got successful reply */}
          {serverState === "success" && (
            <p className={twMerge(infoBox, "bg-[#ecfdf5] text-[#047857]")}>
              <FaCheckCircle />
              Analysis Complete
            </p>
          )}
          {serverState === "error" && (
            <p className={twMerge(infoBox, "bg-[#fff1f2] text-[#f43f5e]")}>
              <IoCloseCircle size={15} />
              Analysis failed
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3 items-center justify-center max-md:grid-cols-1 max-md:gap-2">
          <div
            className={twMerge(
              "border-brand-fourth bg-[#f8fafc] flex col-span-2 border p-3 rounded-lg items-center gap-2 focus-within:outline-brand-tertionary focus-within:outline-1 focus-within:shadow-lg max-md:col-span-1",
              serverState === "success" && "pointer-events-none",
              serverState === "error" && "pointer-events-none",
              showLoader && "pointer-events-none",
            )}
          >
            <FiPaperclip className="text-brand-secondary" size={16} />
            <input
              className="text-brand-primary text-sm w-full focus:outline-none"
              type="text"
              placeholder="Paste Twitter/X link here..."
              value={userUrl}
              onChange={(e) => userInputUrlBox(e)}
            />
          </div>
          <button
            className={twMerge(
              "bg-brand-tertionary text-sm h-full rounded-lg text-white duration-200 shadow-xl hover:cursor-pointer hover:text-shadow-brand-tertionary-hover hover:-translate-y-1 max-md:py-3 max-md:px-4 max-md:mt-1 max-md:w-max max-phone:w-full",
              !isReadyToSend && "opacity-60 hover:cursor-not-allowed",
              showLoader && "opacity-60 hover:cursor-not-allowed",
            )}
            disabled={!isReadyToSend || showLoader}
            type="button"
            onClick={() => talkServer()}
          >
            {serverState === "idle" ? (
              <span className="flex items-center justify-center gap-2">
                {" "}
                <VscSearchSparkle /> Analyze (18 credits)
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <MdOutlineRefresh />{" "}
                {serverState === "success"
                  ? "Analyze New Tweet"
                  : "Retry Again"}
                {/* If you get confused try to understand the flow, you will get it, my love */}
              </span>
            )}
          </button>
          {/* Inline Error */}
          {inlineErr && (
            <p className="-mt-1.5 text-sm text-[#e11d48] max-md:row-start-2 max-md:mb-2">
              {inlineErr}
            </p>
          )}
        </div>
      </div>

      {/* Loader State */}
      {showLoader && <Loader />}

      {/* Showing error if any error occured in the server */}
      {serverState === "error" && <ServerError />}

      {/* Show updated data */}
      {serverState === "success" && <AnalyzedData />}
    </div>
  );
};

export default AnalyzeTweet;
