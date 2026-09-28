import React from "react";
import { FaMagic } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { MdAttachMoney } from "react-icons/md";
import { twMerge } from "tailwind-merge";

//static variable for css
const iconCss = "p-2.5 rounded-lg bg-[#eef2ff] text-brand-tertionary";

const ComingCard = ({ id, head, content }) => {
  return (
    <div
      className={twMerge(
        "border rounded-lg p-5 max-lg:p-4 border-brand-fourth bg-white shadow-xs hover:shadow-md",
        id === 2 && "max-md:col-span-2 max-phone:col-span-1",
      )}
    >
      {id === 0 ? (
        <FaMagic className={iconCss} size={33} />
      ) : (
        <span>
          {id === 1 ? (
            <SiGoogledocs className={iconCss} size={33} />
          ) : (
            <MdAttachMoney className={twMerge(iconCss, "p-1.5")} size={33} />
          )}
        </span>
      )}
      <h2 className="mt-3 font-bold text-base text-brand-primary">{head}</h2>
      <p className="mt-1.5 text-[0.95rem] text-brand-secondary">{content}</p>
    </div>
  );
};

export default ComingCard;
