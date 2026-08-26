import React from "react";

const Privacy = () => {
  //giving the title of the page
  document.title = "Privacy - ThinkTweet";

  return (
    <div className="h-screen bg-[#f1f3fb]">
      <h1 className="text-6xl mb-5">Privacy Policy</h1>
      <p>
        Note: This page is{" "}
        <span className="underline font-bold">in designing phase</span>. This
        will be developed soon.
      </p>
    </div>
  );
};

export default Privacy;
