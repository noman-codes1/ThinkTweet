import React from "react";
import ComingCard from "./components/ComingCard";

const WhatsComing = () => {
  //'what's probably coming' card
  const cardData = [
    {
      id: 0,
      heading: "Phase 2: AI Enhancements",
      para: "Advanced tweet generation and emotional intelligence analysis.",
    },
    {
      id: 1,
      heading: "Phase 3: Analytics Hub",
      para: "Real-time performance tracking and audience growth insights.",
    },
    {
      id: 2,
      heading: "Phase 4: Collaboration",
      para: "Team workspaces and shared content calendars.",
    },
  ];

  return (
    // Section for rendering all the card with above data present
    <div>
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
