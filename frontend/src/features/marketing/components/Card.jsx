import React from "react";
import {twMerge } from "tailwind-merge"

const Card = ({ index, iconBox, titleColor, title, descr }) => {
  return (
    <div
      className={twMerge(
        "border-2 w-auto rounded-xl bg-white border-[#e2e8f0] p-6 hover:-translate-y-1.5 duration-500 hover:cursor-pointer hover:border-brand-tertionary max-md:col-span-1", index === 5 && "col-span-2" 
      )}
    >
      <div className="flex gap-x-4">
        {iconBox}
        <div className="mb-4">
          <p
            className={`uppercase text-sm tracking-wider font-medium ${titleColor}`}
          >
            Parameter {index}
          </p>
          <p className="mt-1 font-bold text-base text-brand-primary">{title}</p>
        </div>
      </div>
      <p className="text-brand-secondary text-sm tracking-wide">{descr}</p>
    </div>
  );
};

export default Card;
