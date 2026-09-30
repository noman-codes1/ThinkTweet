import React from "react";
import { GoDotFill } from "react-icons/go";

const Headline = () => {
  return (
    <div>
      {/* Header of page */}
      <h1 className="font-bold text-brand-primary text-4xl text-center mb-3 max-phone:text-start">
        Disclaimer & Limitations of Liability
      </h1>
      <p className="text-lg text-brand-secondary px-20 text-center max-md:px-0 max-phone:text-start">
        Effective Date: Sept 30, 2026 <br className="hidden max-phone:block" />{" "}
        <span className="max-phone:hidden">• </span>
        <span className="italic max-phone:font-bold">
          Please read these terms carefully before utilizing our AI-driven
          analysis tools.
        </span>
      </p>

      {/* Small horizontal line */}
      <div className="h-1 w-30 mt-8 mb-10 rounded-xl bg-brand-fourth flex justify-self-center"></div>
    </div>
  );
};

export default Headline;
