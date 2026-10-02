import React from "react";
import HeadlineOfPage from "../features/privacy/HeadlineOfPage";
import ContainerOfContentOfPrivacy from "../features/privacy/ContainerOfContentOfPrivacy";

const Privacy = () => {
  //giving the title of the page
  document.title = "Privacy - ThinkTweet";

  return (
    <div>
      <HeadlineOfPage />
      <ContainerOfContentOfPrivacy />
    </div>
  );
};

export default Privacy;
