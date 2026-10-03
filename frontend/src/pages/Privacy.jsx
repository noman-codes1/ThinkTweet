import React from "react";
import HeadlineOfPage from "../features/privacy/HeadlineOfPage";
import ContainerOfContentOfPrivacy from "../features/privacy/ContainerOfContentOfPrivacy";

const Privacy = () => {
  //giving the title of the page
  document.title = "Privacy - ThinkTweet";

  return (
    <div className="py-15 px-15 bg-[#f8fafc] xl:px-20 max-md:px-10 max-phone:px-5">
      <HeadlineOfPage />
      <ContainerOfContentOfPrivacy />
    </div>
  );
};

export default Privacy;
