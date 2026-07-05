import React from "react";
import { FiPaperclip } from "react-icons/fi";
import AnalyzedData from "./components/AnalyzedData";
import { VscSearchSparkle } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";

const AnalyzeTweet = () => {
  //test data
  const isTweetAnalyzed = false;

  //defining the state
  const [userUrl, setUserUrl] = useState("");
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [err, setErr] = useState("");
  const [serverSuccess, setServerSuccess] = useState(false)

  //handling user inputted url
  const userInputUrlBox = (event) => {
    const val = event.target.value;

    //defensive coding
    setIsReadyToSend(false);
    setErr("");

    //validating the entered output
    if (val.length >= 15) {
      if (val.startsWith("https://x.com/")) {
        setIsReadyToSend(true);
      } else {
        setErr("Please enter X/Twitter url for smooth process");
      }
    } else {
      setErr("Not a valid url");
    }

    //not allowing to edit when the server has replied
    if(serverSuccess) {
        return
    }
    setUserUrl(val);
  };

  //talking to the server
  const talkServer = () => {
    //mocking the server reply
    if (serverSuccess === true) {
        setServerSuccess(false)
        setIsReadyToSend(false)
        setUserUrl("")
        return
    } else {
        // IN REAL WORLD.. THIS PART WILL BE DECIDED...
        //In a real world application, this part will be decided by server
        // WORKING HERE : 2 more state is left i.e. loading and error
        setServerSuccess(true)
    }
  };

  return (
    <div>
      {/* Tweet Analysis Box */}
      <div className="border border-brand-fourth bg-white w-2xl p-4 rounded-lg mt-8">
        <div className="flex">
          <div>
            <h2 className="text-brand-primary font-semibold text-lg mb-1">
              Analyze a Tweet
            </h2>
            <p className="text-brand-secondary text-[0.9rem] mb-4">
              Paste any public Twitter/X link and get an instant logical quality
              breakdown.
            </p>
          </div>
          {/* Will appear only if we got successful reply */}
          {serverSuccess && (
            <p className="text-xs ml-auto border h-max py-1 px-3 rounded-xl flex items-center gap-1 bg-[#ecfdf5] text-[#047857]">
              <FaCheckCircle />
              Analysis Complete
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3 items-center justify-center">
          <div
            className={twMerge(
              "border-brand-fourth bg-[#f8fafc] flex col-span-2 border py-2 px-3 rounded-lg items-center gap-2 focus-within:outline-brand-tertionary focus-within:outline-1 focus-within:shadow-lg",
              serverSuccess && "pointer-events-none"
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
              "bg-brand-tertionary text-sm h-full rounded-lg text-white duration-200 shadow-xl hover:cursor-pointer hover:text-shadow-brand-tertionary-hover hover:-translate-y-1",
              !isReadyToSend && "opacity-60 hover:cursor-not-allowed",
            )}
            disabled={!isReadyToSend}
            type="button"
            onClick={() => talkServer()}
          >
            {serverSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <MdOutlineRefresh /> Analyze New Tweet
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {" "}
                <VscSearchSparkle /> Analyze (18 credits)
              </span>
            )}
          </button>
        </div>
        {/* Inline Error */}
        {err && <p className="mt-2 text-sm text-[#e11d48]">{err}</p>}
      </div>

      {/* Show updated data */}
      {serverSuccess && <AnalyzedData />}
    </div>
  );
};

export default AnalyzeTweet;
