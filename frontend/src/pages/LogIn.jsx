import React from "react";
import LogFrom from "../features/login/LogFrom";
import Success from "../features/login/Success";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

//Note : In iPadPro it doesn't work well

const LogIn = () => {
  //using state
  const [isVerified, setIsVerified] = useState(false);
  const [recievedEmail, setRecievedEmail] = useState("");

  return (
    <div className="flex flex-col items-center py-20 bg-[#f8fafc]">
      <p className="border flex items-center gap-2 mb-5 text-xs rounded-sm py-2 px-3 bg-[#eeeffa] border-[#d8d8f7] text-brand-tertionary">
        <GoDotFill />
        Research & Analysis Platform
      </p>
      {isVerified ? (
        <Success useremail={recievedEmail} />
      ) : (
        <LogFrom
          setIsUserVerfied={setIsVerified}
          setUserVerifiedEmail={setRecievedEmail}
        />
      )}
      <div className="flex items-center gap-1 mt-7 text-xs text-[#b2bccc] max-phone:flex-col">
        <p>Secured by ThinkTweet's enterprise-grade infrastructure</p>
        <GoDotFill className="max-phone:hidden" size={4} />
        <div className="flex gap-1 items-center">
          <a
            className="hover:cursor-pointer hover:text-brand-secondary"
            onClick={(e) => e.preventDefault()}
            href="#"
          >
            Privacy
          </a>
          <GoDotFill size={4} />
          <a
            className="hover:cursor-pointer hover:text-brand-secondary"
            onClick={(e) => e.preventDefault()}
            href="#"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;