import React from "react";
import ComingCard from "./components/ComingCard";

const WhatsComing = () => {
  //'what's probably coming' card
  const cardData = [
    {
      id: 0,
      heading: "Phase II (a): AI Enhancements",
      para: "RAG analysis with model selection optimized for deep reasoning.",
    },
    {
      id: 1,
      heading: "Phase II (b): Documentation",
      para: "Read our detailed infrastructure build and security protocols.",
    },
    {
      id: 2,
      heading: "Phase II (c): Subscription",
      para: "Subscription-based option for users preferring recurring billing.",
    },
  ];

  return (
    // Section for rendering all the card with above data present
    <div className="mt-20 grid grid-cols-3 gap-6 justify-self-center w-[90%] max-lg:w-full max-lg:gap-4 max-md:grid-cols-2 max-md:gap-6 max-phone:grid-cols-1 max-phone:w-[95%]">
      {cardData.map((elem) => {
        return (
          <ComingCard
            key={elem.id}
            id={elem.id}
            head={elem.heading}
            content={elem.para}
          />
        );
      })}
    </div>
  );
};

export default WhatsComing;
