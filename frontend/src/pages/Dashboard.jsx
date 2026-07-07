import React from "react";
import Analytics from "../features/dashboard/Analytics";
import AnalyzeTweet from "../features/dashboard/AnalyzeTweet";
import Guide from "../features/dashboard/Guide";
import History from "../features/dashboard/History";

const Dashboard = () => {
  return (
    <div className="p-8 bg-[#f8fafc] max-lg:px-5 max-phone:px-3">
      <Analytics />
      <div className="grid grid-cols-3 grid-rows-[auto_2fr] mt-8 gap-5 max-lg:grid-cols-1">
        <AnalyzeTweet />
        <Guide />
        <History />
      </div>
    </div>
  );
};

export default Dashboard;
