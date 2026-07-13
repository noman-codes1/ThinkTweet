import React from "react";
import LogFrom from "../features/login/LogFrom";
import Success from "../features/login/Success";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import MiniFooter from "../features/login/components/MiniFooter";

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
      <MiniFooter />
    </div>
  );
};

export default LogIn;