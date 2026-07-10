import React from "react";
import { PiWarningOctagonFill } from "react-icons/pi";

const Warning = ({warningText, isStripe}) => {
  return (
    <div className="border flex gap-3 justify-center py-2 px-4 bg-[#fffbeb] border-[#fde68a] font-serif max-lg:items-center">
      <PiWarningOctagonFill
        className="self-center animate-bounce"
        color="#f59e0b"
        size={25}
      />
      <div className="">
        <p className="text-[#b45309] text-base">
          <span className="font-semibold">Test Mode Active:</span>{" "}
          This system is running in a simulated <br className="lg:hidden"/> environment and no real money
          will be charged.
        </p>
        {true && (
          <p className="text-[#b45309] text-sm">
            Wanna grab a test card number?{" "}
            <a
              className="font-semibold underline hover:text-[#bb6321]"
              rel="noopener noreferrer nofollow"
              target="__blank"
              href="https://docs.stripe.com/testing#cards"
            >
              Click Here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Warning;
