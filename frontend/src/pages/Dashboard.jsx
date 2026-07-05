import React from "react";
import Analytics from "../features/dashboard/Analytics";
import AnalyzeTweet from "../features/dashboard/AnalyzeTweet";

const Dashboard = () => {
  return (
    <div className="p-8">
      <Analytics />
      <div className="">
        <AnalyzeTweet />
      </div>
    </div>
  );
};

export default Dashboard;
