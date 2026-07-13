import React from "react";
import SignUpForm from "../features/signup/SignUpForm";
import Mail from "../features/signup/Mail";
import { useState } from "react";
import { FaFeather } from "react-icons/fa6";
import MiniFooter from "../features/login/components/MiniFooter";

const SignUp = () => {
  const [hasSentMail, setHasSentMail] = useState(false);

  return (
    <div className="bg-[#f8fafc] flex flex-col items-center py-25">
      {hasSentMail && (
        <div className="flex items-center gap-2 mb-8 text-brand-primary font-semibold">
          <FaFeather className="p-2 rounded-md text-white bg-brand-tertionary" size={28}/>
          ThinkTweet
        </div>
      )}
      {hasSentMail ? <Mail /> : <SignUpForm setHasSentMailFunc={setHasSentMail} />}
      <MiniFooter />
    </div>
  );
};

export default SignUp;
