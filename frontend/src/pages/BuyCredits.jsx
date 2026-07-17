import React from "react";
import Dialog from "../features/credits/Dialog";
import Plan from "../features/credits/Plan";
import Warning from "../components/Warning";
import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa6";
import { PulseLoader } from "react-spinners";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { LuMail } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { twMerge } from "tailwind-merge";
import CustomError from "../components/CustomError";
import { use } from "react";
import { AuthContext } from "../utils/AuthProvider";

//static variable
const retrySupportButton =
  "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[0.9rem] border duration-200 ease-in hover:-translate-y-0.5 hover:cursor-pointer max-lg:py-2";

const BuyCredits = () => {
  //using state to show the loader
  const [showLoader, setShowLoader] = useState(false);
  const [err, setErr] = useState("");

  //helper function to show the loader for few seconds
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  //function to talk to the server
  const talkServerForStripe = async (planId) => {
    setShowLoader(true);
    await sleep(5000);
    setShowLoader(false);

    //considering error occured
    if (true) {
      setErr(
        "We were unable to process your payment. Please check your card details and try again. If the issue persists, contact our support team.",
      );
    }
  };

  //forcing the user to move above page so that they can see the error
  useEffect(() => {
    if (err) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [err]);

  //checking whehter the verified user is logged in or not
  const auth = use(AuthContext);

  return auth.isAuthenticated ? (
    <div className={twMerge("bg-[#f8fafc]", err && "pt-15")}>
      {/* <Warning /> */}
      {showLoader && (
        <div className="fixed z-100 inset-0 bg-[#f8fafc]/60 backdrop-blur-xs pointer-events-auto">
          <div className="w-max ml-auto mt-12 mr-45 shadow-2xl p-2.5 px-4 rounded-lg flex items-center gap-3 bg-white max-lg:mr-30 max-md:mr-10 max-phone:mr-0 max-phone:ml-0 max-phone:justify-self-center max-phone:px-3">
            <FaLock
              className="bg-[#eef2ff] text-brand-tertionary p-2 rounded-lg"
              size={30}
            />
            <div>
              <h5 className="font-semibold text-base -mb-1 text-brand-primary">
                Redirecting to Stripe
              </h5>
              <p className="text-sm text-brand-secondary">
                Establishing secure connection
              </p>
            </div>
            <PulseLoader className="ml-5" color="#4f46e5" size={8} />
          </div>
        </div>
      )}
      {err && (
        <div className="flex border rounded-lg bg-[#fef2f2] border-[#fecaca] shadow-xl items-center justify-center justify-self-center gap-4 py-4 px-8 w-max max-lg:px-4 max-md:flex-col max-md:items-start max-md:w-[90%] max-md:p-6">
          <IoMdCloseCircle
            className="p-3 size-13 border-[#fecaca] bg-[#fee2e2] animate-pulse rounded-full border max-md:mb-2"
            size={40}
            color="#ef4444"
          />
          <div>
            <div className="flex items-center mb-1 max-md:flex-col max-md:items-start max-md:mb-4">
              <h5 className="text-base font-semibold mr-3 text-[#b91c1c] max-md:mb-1.5">
                Transaction Failed
              </h5>
              <p className="flex items-center gap-1 bg-white uppercase text-[#f87171] border text-xs rounded-2xl py-0.5 px-3">
                <GoDotFill color="#ef4444" />
                Err_payment_declined
              </p>
            </div>
            <p className="text-sm w-lg tracking-wide text-brand-secondary max-lg:w-md max-md:w-full">
              We were unable to process your payment. Please check your card
              details and try again. If the issue persists, contact our support
              team.
            </p>
          </div>
          <div className="flex gap-2.5 ml-4 max-lg:flex-col max-md:ml-0 max-md:w-full max-md:mt-2">
            <button
              onClick={() => setErr("")}
              className={twMerge(
                retrySupportButton,
                "bg-[#ef4444] text-white hover:bg-[#b91c1c] max-lg:justify-center",
              )}
            >
              <MdOutlineRefresh />
              Try Again
            </button>
            <a
              href=""
              className={twMerge(
                retrySupportButton,
                "bg-white border-brand-fourth text-brand-secondary hover:text-[#ef4444] hover:border-[#ef4444] max-lg:justify-center",
              )}
            >
              <LuMail />
              Contact Support
            </a>
          </div>
        </div>
      )}

      {/* Components will mounts... */}
      <Dialog />
      <Plan funcToTalkServer={talkServerForStripe} />
    </div>
  ) : (
    <CustomError content="401 Unauthorized" />
  );
};

export default BuyCredits;
