import React from "react";

const HeadlineOfPage = () => {
  return (
    <div>
      <h1 className="text-4xl text-brand-primary font-bold mb-4 text-center max-phone:text-start">
        Privacy Policy & Terms of Service
      </h1>
      <p className="text-center text-brand-secondary text-xl mx-15 xl:mx-35 max-lg:mx-0 max-phone:text-start max-phone:italic max-phone:font-bold max-phone:font-mono">
        Last Updated: Oct 02, 2026{" "}
        <span className="max-phone:hidden">•</span>{" "}
        <br className="hidden max-phone:block" />
        <span className="max-phone:not-italic max-phone:font-normal max-phone:font-[sans-serif]">
          We believe in complete transparency, which is why our code is
          open-source and our policies are combined into a single, easy-to-read
          document.
        </span>
      </p>

      {/* Border Line */}
      <div className="my-15 h-0.5 w-full bg-brand-fourth rounded-xl"></div>
    </div>
  );
};

export default HeadlineOfPage;
