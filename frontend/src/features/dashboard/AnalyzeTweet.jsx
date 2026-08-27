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
import { customFetch } from "../../utils/customFetch";
import { sleep } from "../../utils/sleep";
import { use } from "react";
import { DashboardContext } from "../../utils/DashboardProvider";

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
  const [serverReply, setServerReply] = useState();

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

  //getting the data from the context
  const dashboardContextValue = use(DashboardContext);

  //talking to the server
  const talkServer = async () => {
    //changing the state
    if (serverState === "success" || serverState === "error") {
      setServerState("idle");
      setIsReadyToSend(false);
      setUserUrl("");
      setServerReply()
      return;
    } else {
      //showing the loader
      setShowLoader(true);

      //defininig the body object to send to the server
      const bodyObject = {
        url: userUrl,
      };

      //contacting the server
      const serverObject = await customFetch("analyze", bodyObject);

      //pausing the code execution to make the loader feel real
      await sleep(4000);

      // #tip: Improve the code execution flow, and update the code
      // with better structure and minimal repeatation

      //checking the condition to work accordingly
      if (serverObject.statusCode === 401) {
        //contacting the server to get the refresh token
        const refreshObject = await customFetch("refresh");

        //checking the server response to work accordingly
        if (refreshObject.success) {
          //contacting the server again with fresh token
          const analyzeObject = await customFetch("analyze", bodyObject);

          //checking the server response again...
          if (analyzeObject.success) {
            //showing the result...
            setServerState("success");
            setServerReply(analyzeObject.message);

            //updating the analytics tab
            dashboardContextValue.setTotalAnalysis(
              dashboardContextValue.totalAnalysis + 1,
            );
            dashboardContextValue.setCredits(
              dashboardContextValue.credits - 18,
            );
          } else {
            //showing the error state
            setServerState("error");
            setServerReply(analyzeObject.message);
          }
        } else {
          //shwoing the error state
          setServerState("error");
          setServerReply(refreshObject.message);
        }
      } else if (serverObject.success) {
        //showing the data which recieved from the server
        setServerState("success");
        setServerReply(serverObject.message);

        //updating the analytics tab
        dashboardContextValue.setTotalAnalysis(
          dashboardContextValue.totalAnalysis + 1,
        );
        dashboardContextValue.setCredits(dashboardContextValue.credits - 18);
      } else {
        // showing the error
        setServerState("error");
        setServerReply(serverObject.message);
      }
    }

    //disabling the loader
    setShowLoader(false);
  };

  return (
    <div className="w-auto col-span-2 max-lg:col-span-1">
      {/* Tweet Analysis Box */}
      <div className="border border-brand-fourth bg-white p-4 rounded-lg">
        <div className="flex gap-2 max-md:grid">
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
              Analysis Done
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
            <p className="-mt-1.5 w-2xl text-sm text-[#e11d48] max-md:row-start-2 max-md:mb-2">
              {inlineErr}
            </p>
          )}
        </div>
      </div>

      {/* Loader State */}
      {showLoader && <Loader />}

      {/* Showing error if any error occured in the server */}
      {serverState === "error" && <ServerError errorMessage={serverReply} />}

      {/* Show analysis data */}
      {serverState === "success" && <AnalyzedData data={serverReply} />}
    </div>
  );
};

export default AnalyzeTweet;
