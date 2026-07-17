import React from "react";
import SignUpForm from "../features/signup/SignUpForm";
import Mail from "../features/signup/Mail";
import { useState } from "react";
import { FaFeather } from "react-icons/fa6";
import MiniFooter from "../features/login/components/MiniFooter";
import { use } from "react";
import { AuthContext } from "../utils/AuthProvider";
import CustomError from "../components/CustomError";

const SignUp = () => {

  // THINGS TO DO IN PHASE II
  // 1. Write the error state in a non-technical way
  // 2. Improve the ux of 'try again' button

  //state to render the component dynamically
  const [hasSentMail, setHasSentMail] = useState(false);

  //getting the current value of auth context
  const auth = use(AuthContext)

  //returning the function 
  return auth.isAuthenticated ? (
    <CustomError content="403 Forbidden" />
  ) : (
    // overall component container
    <div className="bg-[#f8fafc] flex flex-col items-center py-25">
      {/* rendering only when 'Mail' will be loaded */}
      {hasSentMail && (
        <div className="flex items-center gap-2 mb-8 text-brand-primary font-semibold">
          <FaFeather
            className="p-2 rounded-md text-white bg-brand-tertionary"
            size={28}
          />
          ThinkTweet
        </div>
      )}

      {/* checking the decide what to render when */}
      {hasSentMail ? (
        <Mail />
      ) : (
        <SignUpForm setHasSentMailFunc={setHasSentMail} />
      )}

      {/* calling the mini footer created in login page */}
      <MiniFooter />
    </div>
  );
};

export default SignUp;
