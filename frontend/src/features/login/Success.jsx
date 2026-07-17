import React from "react";
import {
  FaCircleCheck,
  FaRegCircleUser,
  FaShieldHalved,
} from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import MiniHeader from "./components/MiniHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { AuthContext } from "../../utils/AuthProvider";

const Success = ({ useremail }) => {
  //using a state
  const [countDown, setCountDown] = useState(10);

  //taking the value from navigation
  const navigateNow = useNavigate();

  //using effect to count down the timer
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  //navigating the user
  useEffect(() => {
    if (countDown <= 1) {
      navigateNow("/dashboard", {replace: true})
    }
  }, [countDown]);

  //gettin the auth context value and updating the user to authenticated
  const auth = use(AuthContext)
  auth.setIsAuthenticated(true)

  return (
    <div className="border w-md px-11 py-10 rounded-lg bg-white shadow-xl border-brand-fourth max-phone:w-[92%] max-phone:px-6 max-phone:py-8">
      <MiniHeader />
      <hr className="my-10 text-brand-fourth" />
      <FaCircleCheck className="flex justify-self-center mb-8 border-2 size-25 p-5 animate-pulse rounded-full text-[#09a472] bg-[#d7f3ea] border-[#c4eee0]" />
      <h2 className="text-center text-brand-primary text-2xl font-semibold mb-2">
        You're Logged In
      </h2>
      <p className="text-center mx-5 mb-10 text-brand-secondary">
        Identity verified. Preparing your research workspace — you'll be
        redirected momentarily.
      </p>
      <div className="flex border py-2.5 px-5 rounded-lg mb-5 bg-[#f8fafc] border-brand-fourth max-phone:p-2">
        <p className="flex items-center text-sm gap-1 text-[#475569]">
          <FaRegCircleUser className="text-brand-secondary" />
          {useremail.length >= 15 ? useremail.slice(0, 16) + "..." : useremail}
        </p>
        <p className="flex items-center ml-auto text-xs gap-1 uppercase text-[#10b981]">
          <FaShieldHalved />
          Verified
        </p>
      </div>
      <p className="flex justify-self-center items-center gap-1 text-sm text-brand-secondary">
        <MdOutlineTimer />
        Redirecting to dashboard in{" "}
        <span className="text-[#475569] font-mono font-semibold">
          {countDown}s
        </span>
      </p>
    </div>
  );
};

export default Success;
