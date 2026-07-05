import React from "react";
import { FaCoins } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";


const TotalCreditsCard = ({cred}) => {
  return (
    <div
      className={twMerge(
        "border border-[#e2e8f0] p-4 rounded-lg bg-white shadow-md hover:shadow-xl",
        cred < 18 && "border-[#fda4af]",
      )}
    >
      <div>
        <div className="flex mb-4">
          <FaCoins
            className={twMerge(
              "rounded-lg p-2 bg-[#eef2ff] text-brand-tertionary",
              cred < 18 && "bg-[#fff1f2] text-[#be123c]",
            )}
            size={30}
          />
          <p
            className={twMerge(
              "self-center text-brand-tertionary border-[#c7d2fe] bg-[#eef2ff] ml-auto text-xs border px-3 py-0.5 rounded-xl",
              cred < 18 && "bg-[#fff1f2] text-[#be123c] border-[#fecdd3]",
            )}
          >
            {cred < 18 ? "No Credit" : "Active"}
          </p>
        </div>
        <div>
          <h1
            className={twMerge(
              "text-5xl mb-2 text-brand-tertionary",
              cred < 18 && "text-[#be123c]",
            )}
          >
            {cred}
          </h1>
          <p className="text-[0.9rem] mb-4 text-brand-secondary">
            Available Credits
          </p>
        </div>
      </div>
      <div className="border-t border-[#e2e8f0] pt-4">
        <a
          className={twMerge(
            "flex bg-transparent text-brand-tertionary items-center gap-2 text-xs border py-1.5 px-3 w-max rounded-lg hover:bg-[#eef2ff]",
            cred < 18 && "text-white bg-[#be123c] hover:bg-[#de1446]",
          )}
          href=""
        >
          <FaPlus />
          {cred < 18 ? "Buy More Credits" : "Buy Credits"}
        </a>
      </div>
    </div>
  );
};

export default TotalCreditsCard;
