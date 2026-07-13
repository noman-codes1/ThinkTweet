import React from "react";
import { FaCheck } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { PiTimer } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Mail = () => {
  //using the state
  const [count, setCount] = useState(15);

  //getting the function to navigate
  const navigateNow = useNavigate();

  //starting the timer when the component is mounting
  useEffect(() => {

    //moving the scroll to the top.. so that user can see updated component
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    //starting the timer
    const timerId = setInterval(() => {
      setCount((currentCountInMemory) => currentCountInMemory - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  //sending the user to the home page when is matched
  useEffect(() => {
    if (count <= 1) {
      navigateNow("/", { replace: true });
    }
  }, [count])
  

  return (
    <div className="border w-md py-11 px-12 rounded-lg border-brand-fourth bg-white shadow-xl max-phone:w-[92%] max-phone:px-4 max-phone:py-9">
      <FaCheck className="size-22 border-4 p-6 rounded-full flex justify-self-center mb-5 bg-[#dcfce7] border-[#bbf7d0] text-brand-primary" />
      <h2 className="text-2xl font-semibold text-center mb-5 text-brand-primary">
        Check Your Inbox
      </h2>
      <p className="text-center mb-8 text-brand-secondary max-phone:mx-3">
        You received an email. Go and verify your account to start using
        ThinkTweet.
      </p>
      <p className="flex items-center justify-center gap-2 text-sm border py-2.5 rounded-md mb-8 border-brand-fourth text-brand-secondary bg-[#f8fafc] max-phone:w-max max-phone:justify-self-center max-phone:px-4">
        <LuMail className="max-phone:hidden"/>
        Check your spam folder if you don't see it
      </p>
      <hr className="mb-8 text-brand-fourth" />
      <p className="flex items-center justify-center gap-1 text-sm text-brand-secondary">
        <PiTimer />
        Auto-redirecting to home in{" "}
        <span className="text-[#475569] font-semibold font-mono">{count}s</span>
      </p>
    </div>
  );
};

export default Mail;
