import React from "react";
import { MdError } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";

const ServerError = () => {
  return (
    <div>
      <div className="flex border p-4 gap-4 items-center mt-4 rounded-lg border-[#fda4af] bg-[#fff1f2] max-md:flex-col max-md:items-start">
        <MdError
          className="border p-1 rounded-lg text-[#f43f5e] bg-[#ffe4e6]"
          size={32}
        />
        <div>
          <h5 className="text-base text-[#be123c]">
            Sorry, we were unable to process the request. Please review the
            error below.
          </h5>
          <p className="text-sm text-[#e11d48] max-md:mt-4">
            <span className="text-[#be123c] font-semibold">Error: </span>URL is
            tampered
          </p>
        </div>
      </div>
      <p className="flex mt-2 text-xs gap-1 items-center text-[#e11d48]">
        <FaDotCircle /> Analysis aborted &mdash; no credits were deducted
      </p>
    </div>
  );
};

export default ServerError;
