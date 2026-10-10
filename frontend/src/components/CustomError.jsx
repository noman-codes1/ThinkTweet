import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFingerprint, FaLock, FaKey, FaUserShield } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoMdRefresh } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { FadeLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";

//static code
const buttonCss =
  "w-[70%] rounded-lg py-2.5 flex gap-2 items-center justify-center max-phone:w-full hover:cursor-pointer";

const CustomError = ({statusCode, errorName}) => {
  //using state
  const [showPageContent, setShowPageContent] = useState(false);

  //using the function for navigate
  const navigateNow = useNavigate(); // this runs the function instantly and returns a function

  //creating a promise so that page can scroll before reloading
  const scrollToTopNow = () =>{
    return new Promise((resolve) => {
      //defensive coding
      if (window.scrollY === 0) return resolve()

      //processing the scroll by adding the event listener so that it works
      window.addEventListener("scrollend", () =>{
        resolve()
      }, {once: true}) //third parameter makes sure that it only once and also to avoid memory leaks
      window.scrollTo({top:0, left:0, behavior: "smooth"})
    })
  }

  //function for refreshing the page
  const refreshPage = async () => {
    await scrollToTopNow()
    window.location.reload();
  };

  //getting the timer so that it remains persistent across renders
  const timer = useRef(); // we actually don't need here

  //running the timer for few seconds
  useEffect(() => {
    timer.current = setTimeout(() => {
      setShowPageContent(true);
    }, 2000);

    return () => clearTimeout(timer.current);
  }, []);

  return showPageContent ? (
    <div className="bg-[#f8fafc] py-15 px-10 flex flex-col items-center justify-center max-lg:h-screen max-md:h-auto max-phone:px-0">
      {/* Container Box */}
      <div className="border relative w-lg p-10 rounded-2xl mb-10 border-brand-fourth bg-white shadow-xl max-sm:w-md max-phone:w-[95%] max-phone:p-5">
        <p className="text-center uppercase my-5 text-brand-tertionary">Error Code</p>
        <h1 className="text-center mb-5 text-8xl font-bold font-mono text-brand-primary">
          {statusCode}
        </h1>
        <h2 className="text-center text-2xl font-bold mb-5 text-brand-primary">
          {errorName} <span className="text-brand-secondary">/</span>{" "}
          <span className="text-[#b91c1c]">Access Denied</span>
        </h2>
        <p className="text-center mx-13 mb-10  text-brand-secondary max-sm:mx-5 max-phone:mx-0">
          The security gateway has blocked this request. Your current signature
          doesn't match the required permissions for this sector.
        </p>

        {/* Button for user to take action */}
        <div className="flex gap-3 flex-col items-center">
          <button
            className={twMerge(
              buttonCss,
              "bg-brand-tertionary text-white hover:bg-brand-tertionary-hover",
            )}
            onClick={() => navigateNow(-1)}
          >
            <RiArrowGoBackFill />
            Return Back
          </button>
          <button
            className={twMerge(
              buttonCss,
              "border border-brand-fourth bg-white text-brand-primary shadow-lg hover:border-brand-tertionary hover:text-brand-tertionary",
            )}
            onClick={() => refreshPage()}
          >
            <IoMdRefresh />
            Refresh Page
          </button>
        </div>

        {/* Small Dialog */}
        <p className="mt-10 text-brand-secondary flex items-center gap-1 justify-self-center uppercase text-xs">
          <GoDotFill className="animate-pulse" color="#09a271" />
          ThinkTweet Security Protocol
        </p>

        {/* Fingerprint Icon */}
        <div className="absolute -top-7 bg-brand-primary p-4 flex justify-self-center rounded-2xl rotate-4">
          <FaFingerprint className="text-white" size={25} />
        </div>
      </div>

      {/* Few design Icons */}
      <div className="flex gap-5 text-[#cacccd]">
        <FaLock size={30} />
        <FaKey size={30} />
        <FaUserShield size={30} />
      </div>
    </div>
  ) : (
    <div className="h-screen bg-[#f8fafc] flex items-center justify-center">
      <FadeLoader height={20} width={10} color="#4f46e5" />
    </div>
  );
};

export default CustomError;