import React from "react";
import LogFrom from "../features/login/LogFrom";
import Success from "../features/login/Success";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import MiniFooter from "../features/login/components/MiniFooter";
import { use } from "react";
import { AuthContext } from "../utils/AuthProvider";
import CustomError from "../components/CustomError";

//Note : In iPadPro it doesn't work well

const LogIn = () => {
  //using state to render component according to the condtion
  const [isVerified, setIsVerified] = useState(false);
  const [recievedName, setRecievedName] = useState("");

  //getting the context to know the current data
  const auth = use(AuthContext);

  return auth.isAuthenticated ? (
    <CustomError content="403 Forbidden" />
  ) : (
    <div className="flex flex-col items-center py-20 bg-[#f8fafc]">
      <p className="border flex items-center gap-2 mb-5 text-xs rounded-sm py-2 px-3 bg-[#eeeffa] border-[#d8d8f7] text-brand-tertionary">
        <GoDotFill />
        Research & Analysis Platform
      </p>
      {isVerified ? (
        <Success username={recievedName} />
      ) : (
        <LogFrom
          setIsUserVerfied={setIsVerified}
          setUserVerifiedName={setRecievedName}
        />
      )}
      <MiniFooter />
    </div>
  );
};

export default LogIn;
